# Phase 5: Telegram Bot

First client channel implementation.

## Overview

This phase implements a Telegram bot that allows users to interact with the Marketing Agent via chat messages.

## Goals

1. Set up Telegram bot with webhook
2. Implement all bot commands
3. Build message flow for skill execution
4. Add inline keyboards for skill selection
5. Implement feedback collection

## Prerequisites

- Phase 1-4 complete
- Telegram bot token from @BotFather
- Public URL for webhook (ngrok for local dev)

## Documents

| Document | Purpose |
|----------|---------|
| [bot-commands.md](./bot-commands.md) | All bot commands and handlers |
| [message-flow.md](./message-flow.md) | User message → execution → result flow |
| [inline-keyboards.md](./inline-keyboards.md) | Button layouts and callbacks |
| [feedback-collection.md](./feedback-collection.md) | Collecting user feedback |

## Bot Features

### Commands

| Command | Description |
|---------|-------------|
| `/start` | Welcome message, onboarding |
| `/link <key>` | Link Telegram to API key |
| `/help` | List available commands |
| `/skills` | Browse skills interactively |
| `/status` | Check recent run status |
| `/history` | View past outputs |
| `/feedback` | Submit detailed feedback |

### Natural Language

Users can also just send messages like:
- "Write homepage copy for Acme Corp"
- "Audit my landing page for conversions"
- "Help me with pricing strategy"

The bot will detect the skill and execute it.

## Implementation Order

```
1. Bot Setup
   ├─ Create bot with @BotFather
   ├─ Set up webhook endpoint
   └─ Configure grammY library

2. Command Handlers
   ├─ /start - Welcome flow
   ├─ /link - Account linking
   ├─ /help - Command list
   └─ /skills - Skill browser

3. Message Flow
   ├─ Message → Skill detection
   ├─ Skill confirmation (if needed)
   ├─ Execution via API
   └─ Result delivery

4. Inline Keyboards
   ├─ Skill selection
   ├─ Feedback collection
   └─ Pagination

5. Webhook Integration
   └─ Connect to Inngest callbacks
```

## Verification Checklist

- [ ] Bot responds to /start
- [ ] /link successfully links accounts
- [ ] Natural language triggers skill detection
- [ ] Low-confidence shows skill options
- [ ] Execution results are delivered
- [ ] Feedback buttons work
- [ ] Webhook receives Inngest callbacks

## Dependencies

- Telegram Bot API token
- Public webhook URL
- Phase 1-4 complete

## Packages Used

```json
{
  "dependencies": {
    "grammy": "^1.31.0",
    "@marketing-agent/shared": "workspace:*"
  }
}
```

## Environment Variables

```bash
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_WEBHOOK_URL=https://your-domain/api/v1/webhooks/telegram
TELEGRAM_WEBHOOK_SECRET=your-webhook-secret
```

## Related Documentation

- [Phase 4: Skill Detection](../phase-4-skill-detection/README.md) - How skills are detected
- [Phase 3: Agent Execution](../phase-3-agent-execution/README.md) - How skills run
- [Phase 6: Feedback](../phase-6-feedback-metrics/README.md) - Feedback system
