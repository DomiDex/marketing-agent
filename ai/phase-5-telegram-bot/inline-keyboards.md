# Inline Keyboards

Button layouts and callback handlers for interactive UI.

## Overview

Inline keyboards provide interactive buttons in Telegram messages for:
- Skill selection
- Feedback collection
- Pagination
- Confirmations

## Keyboard Builders

### apps/telegram-bot/src/keyboards/index.ts

```typescript
import { InlineKeyboard } from 'grammy'

/**
 * Build skill selection keyboard
 */
export function skillSelectionKeyboard(
  options: Array<{ skill: string; confidence?: number }>,
  originalMessage: string
): InlineKeyboard {
  const kb = new InlineKeyboard()

  for (const opt of options) {
    const label = formatSkillName(opt.skill)
    const confidence = opt.confidence
      ? ` (${Math.round(opt.confidence * 100)}%)`
      : ''

    const encodedMsg = encodeCallback(originalMessage)
    kb.text(`${label}${confidence}`, `execute:${opt.skill}:${encodedMsg}`).row()
  }

  kb.text('Browse all skills', 'skills:browse').row()
  kb.text('Cancel', 'cancel')

  return kb
}

/**
 * Build skill category keyboard
 */
export function skillCategoryKeyboard(
  categories: Record<string, number>
): InlineKeyboard {
  const kb = new InlineKeyboard()

  for (const [category, count] of Object.entries(categories)) {
    kb.text(`${category} (${count})`, `skills:category:${encodeURIComponent(category)}`).row()
  }

  return kb
}

/**
 * Build skills list keyboard with pagination
 */
export function skillsListKeyboard(
  skills: Array<{ name: string; description: string }>,
  page: number,
  totalPages: number,
  category?: string
): InlineKeyboard {
  const kb = new InlineKeyboard()

  // Skill buttons
  for (const skill of skills) {
    kb.text(formatSkillName(skill.name), `skill:info:${skill.name}`).row()
  }

  // Pagination
  const navRow: Array<{ text: string; data: string }> = []

  if (page > 0) {
    navRow.push({
      text: '◀ Previous',
      data: `skills:page:${page - 1}:${category || ''}`,
    })
  }

  if (page < totalPages - 1) {
    navRow.push({
      text: 'Next ▶',
      data: `skills:page:${page + 1}:${category || ''}`,
    })
  }

  if (navRow.length > 0) {
    for (const btn of navRow) {
      kb.text(btn.text, btn.data)
    }
    kb.row()
  }

  // Back button
  if (category) {
    kb.text('◀ Back to categories', 'skills:browse')
  }

  return kb
}

/**
 * Build feedback rating keyboard
 */
export function feedbackRatingKeyboard(outputId: string): InlineKeyboard {
  return new InlineKeyboard()
    .text('1 ⭐', `feedback:rate:1:${outputId}`)
    .text('2 ⭐', `feedback:rate:2:${outputId}`)
    .text('3 ⭐', `feedback:rate:3:${outputId}`)
    .text('4 ⭐', `feedback:rate:4:${outputId}`)
    .text('5 ⭐', `feedback:rate:5:${outputId}`)
    .row()
    .text('Skip', `feedback:skip:${outputId}`)
}

/**
 * Build output actions keyboard
 */
export function outputActionsKeyboard(
  outputId: string,
  downloadUrl: string,
  runId: string
): InlineKeyboard {
  return new InlineKeyboard()
    .url('📥 Download', downloadUrl)
    .row()
    .text('⭐ Rate this', `feedback:start:${outputId}`)
    .text('🔄 Retry', `retry:${runId}`)
}

/**
 * Build confirmation keyboard
 */
export function confirmationKeyboard(
  action: string,
  payload: string
): InlineKeyboard {
  return new InlineKeyboard()
    .text('✓ Yes', `confirm:${action}:${payload}`)
    .text('✗ No', 'cancel')
}

// Helpers
function formatSkillName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function encodeCallback(data: string): string {
  // Telegram callback_data has 64 byte limit
  const truncated = data.slice(0, 40)
  return Buffer.from(truncated).toString('base64url')
}
```

## Callback Handlers

### apps/telegram-bot/src/handlers/callbacks/skills.ts

```typescript
import { bot } from '../../bot'
import { api } from '../../api-client'
import {
  skillCategoryKeyboard,
  skillsListKeyboard,
} from '../../keyboards'

const SKILLS_PER_PAGE = 8

// Browse skills (show categories)
bot.callbackQuery('skills:browse', async (ctx) => {
  const skills = await api.get('/skills')

  const categories = {
    'Copywriting': skills.data.skills.filter(s =>
      ['copywriting', 'copy-editing', 'blog-strategy'].includes(s.name)
    ).length,
    'CRO & Optimization': skills.data.skills.filter(s =>
      s.name.includes('cro') || s.name.includes('form')
    ).length,
    // ... other categories
  }

  await ctx.editMessageText(
    '**Browse Skills**\n\nSelect a category:',
    {
      parse_mode: 'Markdown',
      reply_markup: skillCategoryKeyboard(categories),
    }
  )
  await ctx.answerCallbackQuery()
})

// Show skills in category
bot.callbackQuery(/^skills:category:(.+)$/, async (ctx) => {
  const category = decodeURIComponent(ctx.match![1])

  const skills = await api.get('/skills')
  const filtered = filterByCategory(skills.data.skills, category)

  const page = 0
  const totalPages = Math.ceil(filtered.length / SKILLS_PER_PAGE)
  const pageSkills = filtered.slice(0, SKILLS_PER_PAGE)

  await ctx.editMessageText(
    `**${category}**\n\nSelect a skill to learn more:`,
    {
      parse_mode: 'Markdown',
      reply_markup: skillsListKeyboard(pageSkills, page, totalPages, category),
    }
  )
  await ctx.answerCallbackQuery()
})

// Paginate skills
bot.callbackQuery(/^skills:page:(\d+):(.*)$/, async (ctx) => {
  const page = parseInt(ctx.match![1])
  const category = ctx.match![2] || undefined

  const skills = await api.get('/skills')
  const filtered = category
    ? filterByCategory(skills.data.skills, category)
    : skills.data.skills

  const totalPages = Math.ceil(filtered.length / SKILLS_PER_PAGE)
  const pageSkills = filtered.slice(
    page * SKILLS_PER_PAGE,
    (page + 1) * SKILLS_PER_PAGE
  )

  await ctx.editMessageText(
    category
      ? `**${category}** (Page ${page + 1}/${totalPages})`
      : `**All Skills** (Page ${page + 1}/${totalPages})`,
    {
      parse_mode: 'Markdown',
      reply_markup: skillsListKeyboard(pageSkills, page, totalPages, category),
    }
  )
  await ctx.answerCallbackQuery()
})

// Show skill info
bot.callbackQuery(/^skill:info:(.+)$/, async (ctx) => {
  const skillName = ctx.match![1]

  const skill = await api.get(`/skills/${skillName}`)

  const text = `
**${formatSkillName(skill.data.name)}**

${skill.data.description}

**Keywords:** ${skill.data.triggerKeywords.slice(0, 5).join(', ')}

**Related:** ${skill.data.relatedSkills?.join(', ') || 'None'}
  `.trim()

  await ctx.editMessageText(text, {
    parse_mode: 'Markdown',
    reply_markup: new InlineKeyboard()
      .text(`Use ${formatSkillName(skillName)}`, `skill:use:${skillName}`)
      .row()
      .text('◀ Back', 'skills:browse'),
  })
  await ctx.answerCallbackQuery()
})

// Use skill (prompt for message)
bot.callbackQuery(/^skill:use:(.+)$/, async (ctx) => {
  const skillName = ctx.match![1]

  await ctx.editMessageText(
    `**${formatSkillName(skillName)}**\n\nPlease describe what you need:\n\n_(Just reply to this message)_`,
    { parse_mode: 'Markdown' }
  )

  // Set session state to capture next message
  ctx.session.pendingSkill = skillName

  await ctx.answerCallbackQuery()
})

function filterByCategory(skills: any[], category: string): any[] {
  // Category filtering logic
  const categoryMap: Record<string, string[]> = {
    'Copywriting': ['copywriting', 'copy-editing', 'blog-strategy'],
    'CRO & Optimization': ['page-cro', 'signup-flow-cro', 'form-cro', 'popup-cro', 'onboarding-cro', 'paywall-upgrade-cro'],
    // ... other mappings
  }

  const skillNames = categoryMap[category] || []
  return skills.filter(s => skillNames.includes(s.name))
}
```

### apps/telegram-bot/src/handlers/callbacks/feedback.ts

```typescript
import { bot } from '../../bot'
import { api } from '../../api-client'

// Start feedback flow
bot.callbackQuery(/^feedback:start:(.+)$/, async (ctx) => {
  const outputId = ctx.match![1]

  await ctx.editMessageReplyMarkup({
    reply_markup: feedbackRatingKeyboard(outputId),
  })
  await ctx.answerCallbackQuery('How would you rate this output?')
})

// Handle rating
bot.callbackQuery(/^feedback:rate:(\d):(.+)$/, async (ctx) => {
  const rating = parseInt(ctx.match![1])
  const outputId = ctx.match![2]

  // Store rating
  ctx.session.pendingFeedback = {
    outputId,
    overallScore: rating,
  }

  // Ask for follow-up based on rating
  if (rating < 4) {
    await ctx.editMessageText(
      `You rated this ${rating}/5.\n\nWhat could be improved? _(Reply to this message or tap Skip)_`,
      {
        reply_markup: new InlineKeyboard()
          .text('Skip', `feedback:submit:${outputId}`),
      }
    )
  } else {
    await ctx.editMessageText(
      `You rated this ${rating}/5.\n\nWhat worked well? _(Reply to this message or tap Skip)_`,
      {
        reply_markup: new InlineKeyboard()
          .text('Skip', `feedback:submit:${outputId}`),
      }
    )
  }

  await ctx.answerCallbackQuery()
})

// Skip feedback
bot.callbackQuery(/^feedback:skip:(.+)$/, async (ctx) => {
  await ctx.editMessageText('No problem! Let me know if you need anything else.')
  await ctx.answerCallbackQuery()
})

// Submit feedback
bot.callbackQuery(/^feedback:submit:(.+)$/, async (ctx) => {
  const outputId = ctx.match![1]
  const pending = ctx.session.pendingFeedback

  if (pending) {
    await api.post('/feedback', {
      outputId: pending.outputId,
      overallScore: pending.overallScore,
      whatWorkedWell: pending.whatWorkedWell,
      issues: pending.issues || [],
      source: 'telegram',
    })
  }

  await ctx.editMessageText('Thanks for your feedback! It helps improve future outputs.')
  ctx.session.pendingFeedback = undefined
  await ctx.answerCallbackQuery('Feedback submitted!')
})
```

### apps/telegram-bot/src/handlers/callbacks/actions.ts

```typescript
import { bot } from '../../bot'
import { api } from '../../api-client'

// Retry failed run
bot.callbackQuery(/^retry:(.+)$/, async (ctx) => {
  const runId = ctx.match![1]

  // Get original run details
  const run = await api.get(`/runs/${runId}`)

  // Create new run with same parameters
  const newRun = await api.post('/runs', {
    skillName: run.data.skill,
    message: run.data.userMessage,
    clientId: run.data.clientId,
  })

  await ctx.editMessageText(
    `⚙️ **Retrying...**\n\nNew run started.`,
    { parse_mode: 'Markdown' }
  )

  ctx.session.currentRun = {
    runId: newRun.data.runId,
    messageId: ctx.callbackQuery.message!.message_id,
  }

  await ctx.answerCallbackQuery('Retry started!')
})

// Cancel action
bot.callbackQuery('cancel', async (ctx) => {
  await ctx.editMessageText('Cancelled.')
  await ctx.answerCallbackQuery()
})

// Confirm action
bot.callbackQuery(/^confirm:(.+):(.+)$/, async (ctx) => {
  const action = ctx.match![1]
  const payload = ctx.match![2]

  switch (action) {
    case 'delete':
      // Handle delete confirmation
      break
    case 'execute':
      // Handle execution confirmation
      break
  }

  await ctx.answerCallbackQuery()
})
```

## Callback Data Format

Due to Telegram's 64-byte limit on callback_data:

```
Format: action:subaction:params

Examples:
- skills:browse
- skills:category:CRO
- skills:page:2:CRO
- skill:info:copywriting
- skill:use:copywriting
- execute:copywriting:base64encodedmsg
- feedback:rate:4:outputid
- retry:runid
- confirm:delete:outputid
```

## Button Layout Guidelines

1. **Primary action first** - Most important button at top
2. **Max 8 buttons** - Don't overwhelm users
3. **Clear labels** - Short, action-oriented text
4. **Consistent patterns** - Same actions in same positions
5. **Escape hatch** - Always provide Cancel/Back option
