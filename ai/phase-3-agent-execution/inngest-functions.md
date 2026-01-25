# Inngest Functions

Background job definitions for reliable skill execution.

## Overview

Inngest provides reliable background job processing with built-in retries, throttling, and monitoring.

## Inngest Client Setup

### packages/inngest-functions/src/client.ts

```typescript
import { Inngest } from 'inngest'

// Create Inngest client
export const inngest = new Inngest({
  id: 'marketing-agent',
  eventKey: process.env.INNGEST_EVENT_KEY,
})

// Define event types
export interface Events {
  'skill.execute': {
    data: {
      runId: string
      skillName: string
      userMessage: string
      userId: string
      clientId?: string
      options?: Record<string, unknown>
    }
  }
  'skill.execute.completed': {
    data: {
      runId: string
      outputId: string
      s3Key: string
    }
  }
  'skill.execute.failed': {
    data: {
      runId: string
      error: string
      retryable: boolean
    }
  }
  'feedback.process': {
    data: {
      feedbackId: string
      skillName: string
    }
  }
}
```

## Skill Execution Function

### packages/inngest-functions/src/skill-execute.ts

```typescript
import { inngest } from './client'
import { executeSkill } from '@marketing-agent/agent-executor'
import { saveOutput } from '@marketing-agent/storage'
import { db, runs, outputs, clients, eq } from '@marketing-agent/db'

export const skillExecuteFunction = inngest.createFunction(
  {
    id: 'skill-execute',
    retries: 3,
    throttle: {
      limit: 10,     // Max 10 concurrent per user
      period: '1m',
      key: 'event.data.userId',
    },
    onFailure: async ({ event, error }) => {
      // Update run status on final failure
      await db.update(runs)
        .set({
          status: 'failed',
          errorMessage: error.message,
          completedAt: new Date(),
        })
        .where(eq(runs.id, event.data.runId))

      // Send failure event
      await inngest.send({
        name: 'skill.execute.failed',
        data: {
          runId: event.data.runId,
          error: error.message,
          retryable: false,
        },
      })
    },
  },
  { event: 'skill.execute' },
  async ({ event, step }) => {
    const { runId, skillName, userMessage, userId, clientId, options } = event.data

    // Step 1: Mark run as running
    await step.run('update-status-running', async () => {
      await db.update(runs)
        .set({
          status: 'running',
          startedAt: new Date(),
        })
        .where(eq(runs.id, runId))
    })

    // Step 2: Get client slug if clientId provided
    const clientSlug = await step.run('get-client-slug', async () => {
      if (!clientId) return undefined

      const client = await db.query.clients.findFirst({
        where: eq(clients.id, clientId),
        columns: { slug: true },
      })

      return client?.slug
    })

    // Step 3: Execute skill
    const result = await step.run('execute-skill', async () => {
      return await executeSkill({
        skillName,
        userMessage,
        clientSlug,
        options,
      })
    })

    // Step 4: Handle result
    if (!result.success) {
      // Check if retryable
      if (result.error?.includes('Rate limit') || result.error?.includes('overloaded')) {
        throw new Error(result.error) // Will retry
      }

      // Non-retryable error
      await step.run('update-status-failed', async () => {
        await db.update(runs)
          .set({
            status: 'failed',
            errorMessage: result.error,
            tokensInput: result.tokensInput,
            tokensOutput: result.tokensOutput,
            completedAt: new Date(),
          })
          .where(eq(runs.id, runId))
      })

      return { success: false, error: result.error }
    }

    // Step 5: Save output to S3
    const s3Key = await step.run('save-output', async () => {
      const date = new Date().toISOString().split('T')[0]
      const fileName = clientSlug
        ? `${clientSlug}-${skillName}-${date}.md`
        : `output-${skillName}-${date}.md`

      return await saveOutput(
        skillName,
        clientSlug,
        'output',
        result.output!
      )
    })

    // Step 6: Create output record
    const outputId = await step.run('create-output-record', async () => {
      const preview = result.output!.slice(0, 500)

      const [output] = await db.insert(outputs).values({
        runId,
        s3Key,
        format: 'markdown',
        title: `${skillName} output`,
        preview,
        sizeBytes: Buffer.byteLength(result.output!, 'utf8'),
      }).returning({ id: outputs.id })

      return output.id
    })

    // Step 7: Update run as completed
    await step.run('update-status-completed', async () => {
      await db.update(runs)
        .set({
          status: 'completed',
          tokensInput: result.tokensInput,
          tokensOutput: result.tokensOutput,
          completedAt: new Date(),
        })
        .where(eq(runs.id, runId))
    })

    // Step 8: Send completion event
    await step.run('send-completion-event', async () => {
      await inngest.send({
        name: 'skill.execute.completed',
        data: {
          runId,
          outputId,
          s3Key,
        },
      })
    })

    return {
      success: true,
      outputId,
      s3Key,
      tokensUsed: result.tokensInput + result.tokensOutput,
    }
  }
)
```

## Feedback Processing Function

### packages/inngest-functions/src/feedback-process.ts

```typescript
import { inngest } from './client'
import { db, feedback, outputs, runs, skills, eq } from '@marketing-agent/db'

export const feedbackProcessFunction = inngest.createFunction(
  {
    id: 'feedback-process',
    retries: 2,
  },
  { event: 'feedback.process' },
  async ({ event, step }) => {
    const { feedbackId, skillName } = event.data

    // Step 1: Load feedback with related data
    const feedbackData = await step.run('load-feedback', async () => {
      const entry = await db.query.feedback.findFirst({
        where: eq(feedback.id, feedbackId),
      })

      return entry
    })

    if (!feedbackData) {
      return { success: false, error: 'Feedback not found' }
    }

    // Step 2: Update skill metrics (if we had a metrics table)
    await step.run('update-metrics', async () => {
      // In a real implementation, aggregate metrics
      // For now, log for analysis
      console.log(`Feedback received for ${skillName}:`, {
        overallScore: feedbackData.overallScore,
        accuracyScore: feedbackData.accuracyScore,
        qualityScore: feedbackData.qualityScore,
        issues: feedbackData.issues,
      })
    })

    // Step 3: Check if skill needs attention
    await step.run('check-skill-health', async () => {
      // Get recent feedback for this skill
      const recentFeedback = await db.query.feedback.findMany({
        limit: 10,
        orderBy: (f, { desc }) => desc(f.createdAt),
        // Would need to join through outputs → runs → skills
        // Simplified for documentation
      })

      const avgScore = recentFeedback.reduce(
        (sum, f) => sum + f.overallScore,
        0
      ) / recentFeedback.length

      if (avgScore < 3) {
        console.warn(`Skill ${skillName} has low average score: ${avgScore}`)
        // Could trigger an alert or notification
      }
    })

    return { success: true }
  }
)
```

## Notification Function

Handle completion notifications to different channels:

### packages/inngest-functions/src/notify-completion.ts

```typescript
import { inngest } from './client'
import { db, runs, users, userChannels, eq } from '@marketing-agent/db'

export const notifyCompletionFunction = inngest.createFunction(
  {
    id: 'notify-completion',
    retries: 3,
  },
  { event: 'skill.execute.completed' },
  async ({ event, step }) => {
    const { runId, outputId, s3Key } = event.data

    // Step 1: Get run and user info
    const runData = await step.run('get-run-data', async () => {
      const run = await db.query.runs.findFirst({
        where: eq(runs.id, runId),
        with: {
          user: true,
        },
      })

      return run
    })

    if (!runData) return { success: false }

    // Step 2: Get user's channels
    const channels = await step.run('get-user-channels', async () => {
      return await db.query.userChannels.findMany({
        where: eq(userChannels.userId, runData.userId),
      })
    })

    // Step 3: Send notifications to each channel
    for (const channel of channels) {
      await step.run(`notify-${channel.channel}`, async () => {
        switch (channel.channel) {
          case 'telegram':
            await notifyTelegram(channel.channelUserId, {
              runId,
              outputId,
              s3Key,
              skillName: runData.skill,
            })
            break
          // Add other channels as needed
        }
      })
    }

    return { success: true }
  }
)

async function notifyTelegram(
  telegramUserId: string,
  data: { runId: string; outputId: string; s3Key: string; skillName: string }
) {
  // Would call Telegram Bot API to send message
  // This would be implemented in the telegram-bot package
  console.log(`Notifying Telegram user ${telegramUserId}:`, data)
}
```

## Export All Functions

### packages/inngest-functions/src/index.ts

```typescript
import { inngest } from './client'
import { skillExecuteFunction } from './skill-execute'
import { feedbackProcessFunction } from './feedback-process'
import { notifyCompletionFunction } from './notify-completion'

// Export client for API integration
export { inngest }

// Export all functions for Inngest serve
export const functions = [
  skillExecuteFunction,
  feedbackProcessFunction,
  notifyCompletionFunction,
]
```

## API Integration

### apps/api/src/index.ts

```typescript
import { Hono } from 'hono'
import { serve } from 'inngest/hono'
import { inngest, functions } from '@marketing-agent/inngest-functions'

const app = new Hono()

// Inngest endpoint
app.on(['GET', 'PUT', 'POST'], '/api/inngest', serve({
  client: inngest,
  functions,
}))

export default app
```

### Triggering Execution

```typescript
// apps/api/src/routes/runs.ts
import { inngest } from '@marketing-agent/inngest-functions'

app.post('/', async (c) => {
  const { skillName, message, clientId, options } = c.req.valid('json')
  const userId = c.get('userId')

  // Create run record
  const [run] = await db.insert(runs).values({
    userId,
    skillId: skill.id,
    clientId,
    status: 'queued',
    userMessage: message,
  }).returning()

  // Send to Inngest
  await inngest.send({
    name: 'skill.execute',
    data: {
      runId: run.id,
      skillName,
      userMessage: message,
      userId,
      clientId,
      options,
    },
  })

  return c.json({
    success: true,
    data: {
      runId: run.id,
      status: 'queued',
    },
  })
})
```

## Inngest Dashboard

Access at http://localhost:8288 to:

- View function executions
- Monitor retries and failures
- Debug step-by-step execution
- See event history

## Configuration Options

```typescript
// Function configuration options
{
  id: 'skill-execute',

  // Retry configuration
  retries: 3,                    // Max retries on failure

  // Throttling
  throttle: {
    limit: 10,                   // Max concurrent
    period: '1m',                // Per time window
    key: 'event.data.userId',    // Throttle key
  },

  // Rate limiting
  rateLimit: {
    limit: 100,
    period: '1h',
    key: 'event.data.userId',
  },

  // Timeouts
  timeouts: {
    start: '5m',                 // Max time to start
    finish: '10m',               // Max time to complete
  },

  // Batching (for bulk operations)
  batchEvents: {
    maxSize: 10,
    timeout: '5s',
  },

  // Failure handling
  onFailure: async ({ event, error }) => {
    // Handle final failure
  },
}
```

## Monitoring and Alerts

```typescript
// packages/inngest-functions/src/monitoring.ts

export const monitoringFunction = inngest.createFunction(
  {
    id: 'monitor-executions',
    retries: 1,
  },
  { cron: '*/5 * * * *' }, // Every 5 minutes
  async ({ step }) => {
    // Check for stuck runs
    const stuckRuns = await step.run('check-stuck-runs', async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

      return await db.query.runs.findMany({
        where: and(
          eq(runs.status, 'running'),
          lt(runs.startedAt, fiveMinutesAgo)
        ),
      })
    })

    if (stuckRuns.length > 0) {
      await step.run('alert-stuck-runs', async () => {
        console.error(`Found ${stuckRuns.length} stuck runs:`, stuckRuns.map(r => r.id))
        // Send alert (Slack, email, etc.)
      })
    }

    return { stuckRuns: stuckRuns.length }
  }
)
```
