# Message Flow

Complete flow from user message to execution result.

## Overview

```
User Message
    │
    ▼
Parse & Validate
    │
    ▼
Detect Skill ─────── Low Confidence ──► Show Options
    │                                        │
    │ High Confidence                        │
    ▼                                        ▼
Confirm Skill? ◄──── User Selection ─────────┘
    │
    │ Direct Execute
    ▼
Queue Execution
    │
    ▼
Send "Working..." Message
    │
    ▼
Inngest Executes Skill
    │
    ▼
Callback Updates Message
    │
    ▼
Request Feedback
```

## Message Handler

### apps/telegram-bot/src/handlers/message.ts

```typescript
import { bot } from '../bot'
import { api } from '../api-client'
import { requireAuth } from '../middleware/auth'

// Handle natural language messages
bot.on('message:text', requireAuth(), async (ctx) => {
  const message = ctx.message.text

  // Skip if it's a command
  if (message.startsWith('/')) return

  // Step 1: Detect skill
  const detection = await api.post('/skills/detect', {
    message,
    headers: { 'X-User-Id': ctx.session.userId },
  })

  const { skill, confidence, alternatives, extracted } = detection.data

  // Step 2: Check confidence
  if (confidence >= 0.7) {
    // High confidence - execute directly
    await executeSkill(ctx, skill, message, extracted)
  } else {
    // Low confidence - show options
    await showSkillOptions(ctx, skill, alternatives, message)
  }
})

/**
 * Execute skill directly
 */
async function executeSkill(
  ctx: any,
  skillName: string,
  userMessage: string,
  extracted: { clientSlug?: string; outputType?: string }
) {
  // Send "working" message
  const workingMsg = await ctx.reply(
    `⚙️ **${formatSkillName(skillName)}**\n\nWorking on your request...`,
    { parse_mode: 'Markdown' }
  )

  // Store for later update
  ctx.session.currentRun = {
    messageId: workingMsg.message_id,
    runId: null,
  }

  // Queue execution
  const run = await api.post('/runs', {
    skillName,
    message: userMessage,
    clientSlug: extracted.clientSlug,
    options: {
      outputType: extracted.outputType,
      telegramMessageId: workingMsg.message_id,
      telegramChatId: ctx.chat.id,
    },
    headers: { 'X-User-Id': ctx.session.userId },
  })

  ctx.session.currentRun.runId = run.data.runId
}

/**
 * Show skill selection options
 */
async function showSkillOptions(
  ctx: any,
  topSkill: string,
  alternatives: Array<{ skill: string; confidence: number }>,
  originalMessage: string
) {
  const options = [
    { skill: topSkill, label: 'Best match' },
    ...alternatives.slice(0, 3),
  ]

  const keyboard = options.map(opt => [{
    text: `${formatSkillName(opt.skill)}${opt.label ? ` (${opt.label})` : ''}`,
    callback_data: `execute:${opt.skill}:${encodeMessage(originalMessage)}`,
  }])

  // Add "none of these" option
  keyboard.push([{
    text: 'None of these',
    callback_data: 'skills:browse',
  }])

  await ctx.reply(
    "I'm not sure which skill to use. Please select:",
    {
      reply_markup: { inline_keyboard: keyboard },
      reply_to_message_id: ctx.message.message_id,
    }
  )
}

function formatSkillName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function encodeMessage(message: string): string {
  // Truncate and encode for callback_data (64 byte limit)
  return Buffer.from(message.slice(0, 40)).toString('base64')
}
```

## Callback Handler for Skill Selection

```typescript
// apps/telegram-bot/src/handlers/callbacks.ts
import { bot } from '../bot'

// Handle skill selection
bot.callbackQuery(/^execute:(.+):(.+)$/, async (ctx) => {
  const [, skillName, encodedMessage] = ctx.match!
  const originalMessage = Buffer.from(encodedMessage, 'base64').toString()

  // Remove the selection message
  await ctx.deleteMessage()

  // Execute the skill
  const workingMsg = await ctx.reply(
    `⚙️ **${formatSkillName(skillName)}**\n\nWorking on your request...`,
    { parse_mode: 'Markdown' }
  )

  ctx.session.currentRun = {
    messageId: workingMsg.message_id,
    runId: null,
  }

  const run = await api.post('/runs', {
    skillName,
    message: originalMessage,
    options: {
      telegramMessageId: workingMsg.message_id,
      telegramChatId: ctx.chat!.id,
    },
    headers: { 'X-User-Id': ctx.session.userId },
  })

  ctx.session.currentRun.runId = run.data.runId

  await ctx.answerCallbackQuery('Starting execution...')
})
```

## Webhook for Execution Completion

When Inngest completes execution, it notifies the bot:

```typescript
// apps/api/src/routes/webhooks/telegram-callback.ts
import { Hono } from 'hono'
import { bot } from '@marketing-agent/telegram-bot'
import { getOutput, getDownloadUrl } from '@marketing-agent/storage'

const app = new Hono()

app.post('/completion', async (c) => {
  const { runId, outputId, chatId, messageId, status, error } = await c.req.json()

  if (status === 'completed') {
    // Get output preview
    const output = await db.query.outputs.findFirst({
      where: eq(outputs.id, outputId),
    })

    // Generate download URL
    const downloadUrl = await getDownloadUrl(output!.s3Key)

    // Update message
    await bot.api.editMessageText(
      chatId,
      messageId,
      `✓ **Done!**\n\n${output!.preview?.slice(0, 500)}...\n\n[Download full output](${downloadUrl})`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📥 Download', url: downloadUrl },
            ],
            [
              { text: '⭐ Rate', callback_data: `feedback:start:${outputId}` },
              { text: '🔄 Retry', callback_data: `retry:${runId}` },
            ],
          ],
        },
      }
    )
  } else if (status === 'failed') {
    await bot.api.editMessageText(
      chatId,
      messageId,
      `✗ **Failed**\n\n${error || 'Unknown error'}\n\nPlease try again or contact support.`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔄 Retry', callback_data: `retry:${runId}` }],
          ],
        },
      }
    )
  }

  return c.json({ ok: true })
})

export default app
```

## Progress Updates (Optional)

For long-running skills, send progress updates:

```typescript
// In Inngest function
async function sendProgressUpdate(
  chatId: number,
  messageId: number,
  progress: string
) {
  await bot.api.editMessageText(
    chatId,
    messageId,
    `⚙️ **Working...**\n\n${progress}`,
    { parse_mode: 'Markdown' }
  )
}

// Usage in skill execution
await step.run('research', async () => {
  await sendProgressUpdate(chatId, messageId, 'Researching competitors...')
  // ... do research
})

await step.run('writing', async () => {
  await sendProgressUpdate(chatId, messageId, 'Writing content...')
  // ... write content
})
```

## Error Handling in Flow

```typescript
// Handle API errors gracefully
async function safeExecute(ctx: any, skillName: string, message: string) {
  try {
    await executeSkill(ctx, skillName, message, {})
  } catch (error) {
    console.error('Execution failed:', error)

    if (error.response?.status === 429) {
      await ctx.reply(
        'You\'ve reached the rate limit. Please wait a moment and try again.',
        { reply_to_message_id: ctx.message.message_id }
      )
    } else if (error.response?.status === 401) {
      await ctx.reply(
        'Your session has expired. Please /link your account again.',
        { reply_to_message_id: ctx.message.message_id }
      )
    } else {
      await ctx.reply(
        'Sorry, something went wrong. Please try again.',
        { reply_to_message_id: ctx.message.message_id }
      )
    }
  }
}
```

## Message Formatting

```typescript
// apps/telegram-bot/src/utils/format.ts

export function formatOutput(output: any): string {
  let text = ''

  // Title
  if (output.title) {
    text += `**${output.title}**\n\n`
  }

  // Preview (truncated)
  const preview = output.preview || output.content?.slice(0, 500)
  if (preview) {
    text += preview
    if (preview.length >= 500) {
      text += '...'
    }
  }

  return text
}

export function formatSkillInfo(skill: any): string {
  return `**${formatSkillName(skill.name)}**\n\n${skill.description}\n\n_Keywords: ${skill.triggerKeywords.slice(0, 5).join(', ')}_`
}

export function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1')
}
```

## Conversation State Management

```typescript
// apps/telegram-bot/src/middleware/conversation.ts

interface ConversationState {
  step: 'idle' | 'awaiting_client' | 'awaiting_details' | 'awaiting_feedback'
  skill?: string
  context?: Record<string, any>
}

// For multi-turn conversations
bot.use(async (ctx, next) => {
  const state = ctx.session.conversationState || { step: 'idle' }

  if (state.step === 'awaiting_client') {
    // User is providing client name
    const clientName = ctx.message?.text
    if (clientName) {
      state.context!.clientSlug = slugify(clientName)
      await executeWithContext(ctx, state.skill!, state.context!)
      ctx.session.conversationState = { step: 'idle' }
      return
    }
  }

  return next()
})
```
