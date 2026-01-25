# Environment Variables

Complete list of all environment variables for the Marketing Agent API.

## Quick Reference

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | PostgreSQL connection string |
| ANTHROPIC_API_KEY | Yes | Anthropic API key |
| S3_ENDPOINT | Yes | S3/MinIO endpoint |
| S3_ACCESS_KEY | Yes | S3 access key |
| S3_SECRET_KEY | Yes | S3 secret key |
| S3_BUCKET | Yes | S3 bucket name |
| INNGEST_EVENT_KEY | Yes | Inngest event key |
| INNGEST_SIGNING_KEY | Yes | Inngest signing key |
| TELEGRAM_BOT_TOKEN | For Telegram | Telegram bot token |
| API_PORT | No | API server port (default: 3000) |

## Environment Files

### .env.local (Local Development)

```bash
# ===========================================
# DATABASE
# ===========================================
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marketing_agent

# ===========================================
# ANTHROPIC
# ===========================================
ANTHROPIC_API_KEY=sk-ant-api03-...

# ===========================================
# S3 / MINIO
# ===========================================
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=marketing-agent

# ===========================================
# INNGEST
# ===========================================
INNGEST_DEV=1
INNGEST_EVENT_KEY=local-event-key
INNGEST_SIGNING_KEY=local-signing-key
INNGEST_BASE_URL=http://localhost:8288

# ===========================================
# API SERVER
# ===========================================
API_PORT=3000
API_BASE_URL=http://localhost:3000
NODE_ENV=development

# ===========================================
# TELEGRAM (Optional for local)
# ===========================================
TELEGRAM_BOT_TOKEN=
TELEGRAM_WEBHOOK_URL=
TELEGRAM_WEBHOOK_SECRET=

# ===========================================
# AUTHENTICATION
# ===========================================
JWT_SECRET=local-jwt-secret-change-in-production
API_KEY_SALT=local-salt-change-in-production
```

### .env.production (Production)

```bash
# ===========================================
# DATABASE
# ===========================================
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# ===========================================
# ANTHROPIC
# ===========================================
ANTHROPIC_API_KEY=sk-ant-api03-...

# ===========================================
# S3 / AWS
# ===========================================
S3_ENDPOINT=https://s3.amazonaws.com
S3_REGION=us-east-1
S3_ACCESS_KEY=AKIA...
S3_SECRET_KEY=...
S3_BUCKET=marketing-agent-production

# ===========================================
# INNGEST
# ===========================================
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...

# ===========================================
# API SERVER
# ===========================================
API_PORT=3000
API_BASE_URL=https://api.marketing-agent.app
NODE_ENV=production

# ===========================================
# TELEGRAM
# ===========================================
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_WEBHOOK_URL=https://api.marketing-agent.app/api/v1/webhooks/telegram
TELEGRAM_WEBHOOK_SECRET=your-webhook-secret

# ===========================================
# AUTHENTICATION
# ===========================================
JWT_SECRET=your-production-jwt-secret
API_KEY_SALT=your-production-salt
```

## Variable Details

### Database

#### DATABASE_URL

PostgreSQL connection string.

```bash
# Format
postgresql://[user]:[password]@[host]:[port]/[database]

# Local
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marketing_agent

# Production (with SSL)
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# Neon
DATABASE_URL=postgresql://user:password@ep-xyz.us-east-1.aws.neon.tech/database?sslmode=require

# Supabase
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

### Anthropic

#### ANTHROPIC_API_KEY

API key from [console.anthropic.com](https://console.anthropic.com).

```bash
# Format
ANTHROPIC_API_KEY=sk-ant-api03-...

# Get from: https://console.anthropic.com/settings/keys
```

### S3 / Storage

#### S3_ENDPOINT

S3-compatible endpoint URL.

```bash
# MinIO (local)
S3_ENDPOINT=http://localhost:9000

# AWS S3
S3_ENDPOINT=https://s3.amazonaws.com

# Cloudflare R2
S3_ENDPOINT=https://[account-id].r2.cloudflarestorage.com

# DigitalOcean Spaces
S3_ENDPOINT=https://[region].digitaloceanspaces.com
```

#### S3_REGION

AWS region for S3.

```bash
S3_REGION=us-east-1
```

#### S3_ACCESS_KEY / S3_SECRET_KEY

S3 credentials.

```bash
# MinIO (local default)
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin

# AWS (from IAM)
S3_ACCESS_KEY=AKIA...
S3_SECRET_KEY=...
```

#### S3_BUCKET

Bucket name for all files.

```bash
S3_BUCKET=marketing-agent
```

### Inngest

#### INNGEST_EVENT_KEY

Event key for sending events to Inngest.

```bash
# Local development
INNGEST_EVENT_KEY=local-event-key

# Production (from Inngest dashboard)
INNGEST_EVENT_KEY=...
```

#### INNGEST_SIGNING_KEY

Signing key for verifying Inngest webhooks.

```bash
# Production (from Inngest dashboard)
INNGEST_SIGNING_KEY=signkey-...
```

#### INNGEST_DEV

Enable development mode.

```bash
# Local only
INNGEST_DEV=1
```

#### INNGEST_BASE_URL

Inngest server URL (local dev only).

```bash
INNGEST_BASE_URL=http://localhost:8288
```

### Telegram

#### TELEGRAM_BOT_TOKEN

Bot token from @BotFather.

```bash
# Format: [bot_id]:[token]
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHI...

# Get from: https://t.me/BotFather
# Command: /newbot
```

#### TELEGRAM_WEBHOOK_URL

Public URL for webhook.

```bash
# Local (use ngrok)
TELEGRAM_WEBHOOK_URL=https://abc123.ngrok.io/api/v1/webhooks/telegram

# Production
TELEGRAM_WEBHOOK_URL=https://api.marketing-agent.app/api/v1/webhooks/telegram
```

#### TELEGRAM_WEBHOOK_SECRET

Secret for webhook verification.

```bash
# Generate random string
TELEGRAM_WEBHOOK_SECRET=your-random-secret
```

### API Server

#### API_PORT

Port for the API server.

```bash
API_PORT=3000
```

#### API_BASE_URL

Public URL of the API.

```bash
# Local
API_BASE_URL=http://localhost:3000

# Production
API_BASE_URL=https://api.marketing-agent.app
```

#### NODE_ENV

Environment mode.

```bash
# Options: development, production, test
NODE_ENV=development
```

### Authentication

#### JWT_SECRET

Secret for signing JWT tokens (future web auth).

```bash
# Generate: openssl rand -hex 32
JWT_SECRET=your-32-byte-hex-secret
```

#### API_KEY_SALT

Salt for hashing API keys.

```bash
# Generate: openssl rand -hex 16
API_KEY_SALT=your-16-byte-hex-salt
```

## Validation

### packages/shared/src/config.ts

```typescript
import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Anthropic
  ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-'),

  // S3
  S3_ENDPOINT: z.string().url(),
  S3_REGION: z.string().default('us-east-1'),
  S3_ACCESS_KEY: z.string().min(1),
  S3_SECRET_KEY: z.string().min(1),
  S3_BUCKET: z.string().min(1),

  // Inngest
  INNGEST_EVENT_KEY: z.string().min(1),
  INNGEST_SIGNING_KEY: z.string().optional(),
  INNGEST_DEV: z.string().optional(),

  // API
  API_PORT: z.coerce.number().default(3000),
  API_BASE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Telegram (optional)
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_WEBHOOK_URL: z.string().url().optional(),
  TELEGRAM_WEBHOOK_SECRET: z.string().optional(),

  // Auth
  JWT_SECRET: z.string().min(32),
  API_KEY_SALT: z.string().min(16),
})

export const config = envSchema.parse(process.env)
```

## Security Notes

1. **Never commit .env files** - Add to .gitignore
2. **Use secrets manager** - In production, use AWS Secrets Manager, Vault, etc.
3. **Rotate regularly** - Especially API keys and secrets
4. **Minimal permissions** - IAM/S3 policies should be least-privilege
5. **Different keys per environment** - Dev, staging, production should have separate keys
