# Bot Commands

All Telegram bot commands and their handlers.

## Setup

### apps/telegram-bot/src/bot.ts

```typescript
import { Bot, Context, session } from 'grammy'
import type { SessionData } from './types'

// Create bot instance
const bot = new Bot<Context & { session: SessionData }>(
  process.env.TELEGRAM_BOT_TOKEN!
)

// Add session middleware
bot.use(session({
  initial: (): SessionData => ({
    linked: false,
    userId: undefined,
    currentRun: undefined,
    awaitingFeedback: undefined,
  }),
}))

export { bot }
```

### Session Types

```typescript
// apps/telegram-bot/src/types.ts

export interface SessionData {
  linked: boolean
  userId?: string
  currentRun?: {
    runId: string
    messageId: number
  }
  awaitingFeedback?: {
    outputId: string
    messageId: number
  }
}
```

## Command Handlers

### /start

Welcome new users and prompt for account linking.

```typescript
// apps/telegram-bot/src/commands/start.ts
import { bot } from '../bot'

bot.command('start', async (ctx) => {
  const welcomeMessage = `
**Welcome to Marketing Agent!**

I help you create marketing content using specialized skills.

**Quick Start:**
1. Get an API key from [dashboard link]
2. Link your account: /link YOUR_API_KEY
3. Ask me anything, like:
   - "Write homepage copy for my SaaS"
   - "Audit my landing page"
   - "Create an email sequence"

**Commands:**
/help - See all commands
/skills - Browse available skills
/status - Check your recent runs
/history - View past outputs

Need help? Just ask!
  `.trim()

  await ctx.reply(welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Browse Skills', callback_data: 'skills:browse' }],
        [{ text: 'Get API Key', url: 'https://marketing-agent.app/dashboard' }],
      ],
    },
  })
})
```

### /link

Link Telegram account to API key.

```typescript
// apps/telegram-bot/src/commands/link.ts
import { bot } from '../bot'
import { linkTelegramUser } from '@marketing-agent/db'

bot.command('link', async (ctx) => {
  const args = ctx.message?.text?.split(' ')
  const apiKey = args?.[1]

  if (!apiKey) {
    return ctx.reply(
      'Please provide your API key:\n\n`/link YOUR_API_KEY`\n\nGet your key from the dashboard.',
      { parse_mode: 'Markdown' }
    )
  }

  // Attempt to link
  const telegramUserId = String(ctx.from?.id)
  const telegramUsername = ctx.from?.username

  const result = await linkTelegramUser(telegramUserId, telegramUsername, apiKey)

  if (result.success) {
    ctx.session.linked = true
    ctx.session.userId = result.userId

    await ctx.reply(
      '✓ Account linked successfully!\n\nYou can now use all skills. Try asking me something like:\n\n"Write homepage copy for my startup"',
      { parse_mode: 'Markdown' }
    )
  } else {
    await ctx.reply(
      `Failed to link account: ${result.error}\n\nPlease check your API key and try again.`
    )
  }
})
```

### /help

Show available commands.

```typescript
// apps/telegram-bot/src/commands/help.ts
import { bot } from '../bot'

bot.command('help', async (ctx) => {
  const helpMessage = `
**Marketing Agent Commands**

**Account**
/start - Welcome message
/link <key> - Link your API key
/status - Check run status

**Skills**
/skills - Browse all skills
/history - View past outputs
/feedback - Submit detailed feedback

**Or just ask naturally:**
- "Write copy for my homepage"
- "Create an onboarding email sequence"
- "Audit my pricing page"

**Skill Categories:**
• Copywriting & Content
• CRO & Optimization
• Email & Sequences
• SEO & Technical
• Strategy & Planning

Type /skills to explore all 37 skills.
  `.trim()

  await ctx.reply(helpMessage, { parse_mode: 'Markdown' })
})
```

### /skills

Interactive skill browser.

```typescript
// apps/telegram-bot/src/commands/skills.ts
import { bot } from '../bot'
import { api } from '../api-client'

const SKILLS_PER_PAGE = 8

bot.command('skills', async (ctx) => {
  const skills = await api.get('/skills')

  const categories = categorizeSkills(skills.data.skills)
  const keyboard = buildCategoryKeyboard(categories)

  await ctx.reply(
    '**Browse Skills**\n\nSelect a category to see available skills:',
    {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard },
    }
  )
})

function categorizeSkills(skills: any[]) {
  const categories: Record<string, any[]> = {
    'Copywriting': [],
    'CRO & Optimization': [],
    'Email & Sequences': [],
    'SEO & Technical': [],
    'Strategy & Planning': [],
    'Research & Analysis': [],
  }

  for (const skill of skills) {
    if (['copywriting', 'copy-editing', 'blog-strategy'].includes(skill.name)) {
      categories['Copywriting'].push(skill)
    } else if (skill.name.includes('cro') || skill.name.includes('form') || skill.name.includes('popup')) {
      categories['CRO & Optimization'].push(skill)
    } else if (['email-sequence', 'social-content', 'video-script'].includes(skill.name)) {
      categories['Email & Sequences'].push(skill)
    } else if (['seo-audit', 'schema-markup', 'programmatic-seo'].includes(skill.name)) {
      categories['SEO & Technical'].push(skill)
    } else if (['positioning', 'pricing-strategy', 'launch-strategy'].includes(skill.name)) {
      categories['Strategy & Planning'].push(skill)
    } else {
      categories['Research & Analysis'].push(skill)
    }
  }

  return categories
}

function buildCategoryKeyboard(categories: Record<string, any[]>) {
  return Object.entries(categories).map(([name, skills]) => [{
    text: `${name} (${skills.length})`,
    callback_data: `skills:category:${encodeURIComponent(name)}`,
  }])
}
```

### /status

Check status of recent runs.

```typescript
// apps/telegram-bot/src/commands/status.ts
import { bot } from '../bot'
import { api } from '../api-client'

bot.command('status', async (ctx) => {
  if (!ctx.session.linked) {
    return ctx.reply('Please link your account first: /link YOUR_API_KEY')
  }

  const runs = await api.get('/runs', {
    params: { limit: 5 },
    headers: { 'X-User-Id': ctx.session.userId },
  })

  if (runs.data.runs.length === 0) {
    return ctx.reply('No recent runs found. Try asking me to do something!')
  }

  const runList = runs.data.runs.map((run: any) => {
    const status = statusEmoji(run.status)
    const skill = run.skill
    const time = formatRelativeTime(run.queuedAt)
    return `${status} **${skill}** - ${time}`
  }).join('\n')

  await ctx.reply(
    `**Recent Runs**\n\n${runList}`,
    { parse_mode: 'Markdown' }
  )
})

function statusEmoji(status: string): string {
  const emojis: Record<string, string> = {
    queued: '⏳',
    running: '⚙️',
    completed: '✓',
    failed: '✗',
  }
  return emojis[status] || '?'
}

function formatRelativeTime(date: string): string {
  const now = Date.now()
  const then = new Date(date).getTime()
  const diff = now - then

  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}
```

### /history

View past outputs.

```typescript
// apps/telegram-bot/src/commands/history.ts
import { bot } from '../bot'
import { api } from '../api-client'

bot.command('history', async (ctx) => {
  if (!ctx.session.linked) {
    return ctx.reply('Please link your account first: /link YOUR_API_KEY')
  }

  const outputs = await api.get('/outputs', {
    params: { limit: 10 },
    headers: { 'X-User-Id': ctx.session.userId },
  })

  if (outputs.data.outputs.length === 0) {
    return ctx.reply('No outputs yet. Ask me to create something!')
  }

  const outputList = outputs.data.outputs.map((output: any, i: number) => {
    const title = output.title || `${output.skill} output`
    const date = new Date(output.createdAt).toLocaleDateString()
    return `${i + 1}. **${title}**\n   ${date}`
  }).join('\n\n')

  const keyboard = outputs.data.outputs.slice(0, 5).map((output: any) => [{
    text: output.title?.slice(0, 30) || output.skill,
    callback_data: `output:view:${output.id}`,
  }])

  await ctx.reply(
    `**Recent Outputs**\n\n${outputList}`,
    {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard },
    }
  )
})
```

### /feedback

Submit detailed feedback for an output.

```typescript
// apps/telegram-bot/src/commands/feedback.ts
import { bot } from '../bot'

bot.command('feedback', async (ctx) => {
  const args = ctx.message?.text?.split(' ')
  const outputId = args?.[1]

  if (!outputId) {
    return ctx.reply(
      'To submit feedback, provide the output ID:\n\n`/feedback OUTPUT_ID`\n\nOr tap the feedback button after receiving an output.',
      { parse_mode: 'Markdown' }
    )
  }

  // Start feedback flow
  ctx.session.awaitingFeedback = {
    outputId,
    messageId: ctx.message!.message_id,
  }

  await ctx.reply(
    '**Feedback for Output**\n\nPlease rate this output:',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1 ⭐', callback_data: `feedback:rate:1:${outputId}` },
            { text: '2 ⭐', callback_data: `feedback:rate:2:${outputId}` },
            { text: '3 ⭐', callback_data: `feedback:rate:3:${outputId}` },
            { text: '4 ⭐', callback_data: `feedback:rate:4:${outputId}` },
            { text: '5 ⭐', callback_data: `feedback:rate:5:${outputId}` },
          ],
          [{ text: 'Skip', callback_data: `feedback:skip:${outputId}` }],
        ],
      },
    }
  )
})
```

## Registering Commands with BotFather

Set up command menu in Telegram:

```
/setcommands

start - Get started with Marketing Agent
link - Link your API key
help - View all commands
skills - Browse available skills
status - Check recent run status
history - View past outputs
feedback - Submit feedback
```

## Error Handling

```typescript
// apps/telegram-bot/src/middleware/error.ts
import { bot } from '../bot'

bot.catch((err) => {
  const ctx = err.ctx
  console.error(`Error while handling update ${ctx.update.update_id}:`, err.error)

  // Notify user
  ctx.reply(
    'Sorry, something went wrong. Please try again or contact support.',
    { reply_to_message_id: ctx.message?.message_id }
  ).catch(() => {})
})
```

## Authentication Middleware

```typescript
// apps/telegram-bot/src/middleware/auth.ts
import { Composer } from 'grammy'
import { getUserByTelegram } from '@marketing-agent/db'

export const authMiddleware = new Composer()

// Load user session on every update
authMiddleware.use(async (ctx, next) => {
  if (!ctx.from) return next()

  const telegramUserId = String(ctx.from.id)
  const user = await getUserByTelegram(telegramUserId)

  if (user) {
    ctx.session.linked = true
    ctx.session.userId = user.id
  }

  return next()
})

// Guard for commands that require linking
export function requireAuth() {
  return new Composer().use(async (ctx, next) => {
    if (!ctx.session.linked) {
      await ctx.reply(
        'Please link your account first:\n\n`/link YOUR_API_KEY`\n\nGet your key from the dashboard.',
        { parse_mode: 'Markdown' }
      )
      return
    }
    return next()
  })
}
```
