# Feedback Collection

Collecting user feedback via Telegram.

## Overview

After each skill execution, we collect feedback to:
1. Understand output quality
2. Identify skill improvements
3. Track user satisfaction

## Feedback Flow

```
Output Delivered
      │
      ▼
Rating Buttons: [1] [2] [3] [4] [5] [Skip]
      │
      ▼
If rating < 4 ──────────────────────────────┐
      │                                      │
      ▼                                      ▼
"What could be improved?"         "What worked well?"
      │                                      │
      └──────────────┬───────────────────────┘
                     │
                     ▼
              Submit Feedback
```

## Implementation

### Quick Rating

After every output, show rating buttons:

```typescript
// apps/telegram-bot/src/feedback/rating.ts

export async function requestFeedback(
  ctx: any,
  outputId: string,
  messageId: number
) {
  // Edit message to add feedback buttons
  await ctx.api.editMessageReplyMarkup(
    ctx.chat.id,
    messageId,
    {
      inline_keyboard: [
        [
          { text: '1', callback_data: `fb:${outputId}:1` },
          { text: '2', callback_data: `fb:${outputId}:2` },
          { text: '3', callback_data: `fb:${outputId}:3` },
          { text: '4', callback_data: `fb:${outputId}:4` },
          { text: '5', callback_data: `fb:${outputId}:5` },
        ],
        [
          { text: 'Skip feedback', callback_data: `fb:${outputId}:skip` },
        ],
      ],
    }
  )
}
```

### Rating Handler

```typescript
// apps/telegram-bot/src/handlers/callbacks/feedback.ts

bot.callbackQuery(/^fb:([^:]+):(\d|skip)$/, async (ctx) => {
  const outputId = ctx.match![1]
  const value = ctx.match![2]

  if (value === 'skip') {
    // Remove buttons
    await ctx.editMessageReplyMarkup({ reply_markup: undefined })
    await ctx.answerCallbackQuery('No problem!')
    return
  }

  const rating = parseInt(value)

  // Store partial feedback
  ctx.session.pendingFeedback = {
    outputId,
    overallScore: rating,
    startedAt: Date.now(),
  }

  // Ask follow-up question
  if (rating <= 3) {
    await ctx.editMessageText(
      ctx.callbackQuery.message!.text + '\n\n' +
      `You rated this ${rating}/5. What could be improved?\n\n` +
      '_Reply to this message or tap Done_',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Done', callback_data: `fb:${outputId}:done` }],
          ],
        },
      }
    )
  } else {
    // High rating - optional feedback
    await ctx.editMessageText(
      ctx.callbackQuery.message!.text + '\n\n' +
      `Thanks for the ${rating}/5 rating! Anything that worked especially well?\n\n` +
      '_Reply to this message or tap Done_',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Done', callback_data: `fb:${outputId}:done` }],
          ],
        },
      }
    )
  }

  await ctx.answerCallbackQuery()
})
```

### Capture Text Feedback

```typescript
// apps/telegram-bot/src/handlers/feedback-text.ts

// Handle text replies for feedback
bot.on('message:text', async (ctx, next) => {
  const pending = ctx.session.pendingFeedback

  // Check if we're expecting feedback
  if (!pending) {
    return next()
  }

  // Check if feedback hasn't timed out (5 minutes)
  if (Date.now() - pending.startedAt > 5 * 60 * 1000) {
    ctx.session.pendingFeedback = undefined
    return next()
  }

  const feedbackText = ctx.message.text

  // Categorize feedback
  if (pending.overallScore <= 3) {
    pending.issues = [{
      description: feedbackText,
      severity: pending.overallScore <= 2 ? 'high' : 'medium',
    }]
  } else {
    pending.whatWorkedWell = feedbackText
  }

  // Submit feedback
  await submitFeedback(ctx, pending)

  await ctx.reply(
    'Thanks for the detailed feedback! This helps improve future outputs.',
    { reply_to_message_id: ctx.message.message_id }
  )

  ctx.session.pendingFeedback = undefined
})
```

### Submit Feedback

```typescript
// apps/telegram-bot/src/feedback/submit.ts

interface PendingFeedback {
  outputId: string
  overallScore: number
  whatWorkedWell?: string
  issues?: Array<{ description: string; severity: string }>
  startedAt: number
}

export async function submitFeedback(ctx: any, feedback: PendingFeedback) {
  try {
    await api.post('/feedback', {
      outputId: feedback.outputId,
      overallScore: feedback.overallScore,
      whatWorkedWell: feedback.whatWorkedWell,
      issues: feedback.issues || [],
      source: 'telegram',
      metadata: {
        telegramUserId: ctx.from?.id,
        collectionDuration: Date.now() - feedback.startedAt,
      },
    }, {
      headers: { 'X-User-Id': ctx.session.userId },
    })
  } catch (error) {
    console.error('Failed to submit feedback:', error)
    // Don't fail silently - feedback is important
    throw error
  }
}
```

### Done Button Handler

```typescript
bot.callbackQuery(/^fb:([^:]+):done$/, async (ctx) => {
  const outputId = ctx.match![1]
  const pending = ctx.session.pendingFeedback

  if (pending && pending.outputId === outputId) {
    await submitFeedback(ctx, pending)
  }

  // Clean up message
  await ctx.editMessageReplyMarkup({ reply_markup: undefined })
  await ctx.answerCallbackQuery('Feedback submitted!')

  ctx.session.pendingFeedback = undefined
})
```

## Detailed Feedback Command

For users who want to provide comprehensive feedback:

```typescript
// apps/telegram-bot/src/commands/detailed-feedback.ts

bot.command('feedback', async (ctx) => {
  // Get recent outputs
  const outputs = await api.get('/outputs', {
    params: { limit: 5 },
    headers: { 'X-User-Id': ctx.session.userId },
  })

  if (outputs.data.outputs.length === 0) {
    return ctx.reply('No recent outputs to provide feedback on.')
  }

  // Show output selection
  await ctx.reply(
    '**Detailed Feedback**\n\nSelect an output to review:',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: outputs.data.outputs.map((output: any) => [{
          text: output.title?.slice(0, 30) || output.skill,
          callback_data: `dfb:select:${output.id}`,
        }]),
      },
    }
  )
})

// Detailed feedback flow
bot.callbackQuery(/^dfb:select:(.+)$/, async (ctx) => {
  const outputId = ctx.match![1]

  // Start detailed feedback conversation
  ctx.session.detailedFeedback = {
    outputId,
    step: 'accuracy',
    scores: {},
  }

  await ctx.editMessageText(
    '**Detailed Feedback**\n\n' +
    '1/4: How accurate was the output? (Did it understand your request?)',
    {
      parse_mode: 'Markdown',
      reply_markup: ratingRow('accuracy', outputId),
    }
  )
  await ctx.answerCallbackQuery()
})

bot.callbackQuery(/^dfb:(\w+):(\d):(.+)$/, async (ctx) => {
  const dimension = ctx.match![1]
  const score = parseInt(ctx.match![2])
  const outputId = ctx.match![3]

  const feedback = ctx.session.detailedFeedback
  if (!feedback) return

  feedback.scores[dimension] = score

  // Move to next step
  const steps = ['accuracy', 'quality', 'usefulness', 'overall']
  const currentIndex = steps.indexOf(dimension)
  const nextStep = steps[currentIndex + 1]

  if (nextStep) {
    feedback.step = nextStep

    const prompts: Record<string, string> = {
      quality: '2/4: How well-crafted was the output?',
      usefulness: '3/4: How ready-to-use was the output?',
      overall: '4/4: What\'s your overall rating?',
    }

    await ctx.editMessageText(
      `**Detailed Feedback**\n\n${prompts[nextStep]}`,
      {
        parse_mode: 'Markdown',
        reply_markup: ratingRow(nextStep, outputId),
      }
    )
  } else {
    // All scores collected - submit
    await api.post('/feedback', {
      outputId,
      accuracyScore: feedback.scores.accuracy,
      qualityScore: feedback.scores.quality,
      usefulnessScore: feedback.scores.usefulness,
      overallScore: feedback.scores.overall,
      source: 'telegram',
    }, {
      headers: { 'X-User-Id': ctx.session.userId },
    })

    await ctx.editMessageText(
      'Thanks for the detailed feedback! Your input helps improve the agent.',
      { parse_mode: 'Markdown' }
    )

    ctx.session.detailedFeedback = undefined
  }

  await ctx.answerCallbackQuery()
})

function ratingRow(dimension: string, outputId: string) {
  return {
    inline_keyboard: [[
      { text: '1', callback_data: `dfb:${dimension}:1:${outputId}` },
      { text: '2', callback_data: `dfb:${dimension}:2:${outputId}` },
      { text: '3', callback_data: `dfb:${dimension}:3:${outputId}` },
      { text: '4', callback_data: `dfb:${dimension}:4:${outputId}` },
      { text: '5', callback_data: `dfb:${dimension}:5:${outputId}` },
    ]],
  }
}
```

## Feedback Reminders

Prompt for feedback if user hasn't rated recent outputs:

```typescript
// Periodic check for unrated outputs
async function checkPendingFeedback(ctx: any) {
  const unratedOutputs = await api.get('/outputs', {
    params: { unrated: true, limit: 1 },
    headers: { 'X-User-Id': ctx.session.userId },
  })

  if (unratedOutputs.data.outputs.length > 0) {
    const output = unratedOutputs.data.outputs[0]

    await ctx.reply(
      `How was the **${output.skill}** output from ${formatDate(output.createdAt)}?\n\n` +
      'Quick rating helps improve future outputs:',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '1', callback_data: `fb:${output.id}:1` },
              { text: '2', callback_data: `fb:${output.id}:2` },
              { text: '3', callback_data: `fb:${output.id}:3` },
              { text: '4', callback_data: `fb:${output.id}:4` },
              { text: '5', callback_data: `fb:${output.id}:5` },
            ],
            [{ text: 'Skip', callback_data: `fb:${output.id}:skip` }],
          ],
        },
      }
    )
  }
}
```

## Feedback Analytics

Track feedback collection rates:

```typescript
// Metrics
interface FeedbackMetrics {
  totalOutputs: number
  feedbackReceived: number
  averageScore: number
  responseRate: number
  detailedFeedbackCount: number
}

async function getFeedbackMetrics(userId: string): Promise<FeedbackMetrics> {
  // Query database for metrics
  // Return aggregated stats
}
```
