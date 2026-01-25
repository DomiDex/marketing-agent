# Authentication

API key and future JWT authentication.

## Overview

The API uses API keys for authentication. Each user has a unique API key that must be included in all requests.

## API Key Authentication

### Request Format

Include the API key in the Authorization header:

```
Authorization: Bearer <api_key>
```

### API Key Format

API keys are 64-character random strings:

```
ma_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0
```

Prefix: `ma_live_` (32 chars) + random (32 chars)

For test environments: `ma_test_`

### Key Generation

```typescript
import { randomBytes } from 'crypto'

function generateApiKey(environment: 'live' | 'test' = 'live'): string {
  const prefix = environment === 'live' ? 'ma_live_' : 'ma_test_'
  const random = randomBytes(32).toString('hex').slice(0, 32)
  return `${prefix}${random}`
}
```

### Key Storage

API keys are stored hashed in the database. The original key is only shown once at creation.

```typescript
import { createHash } from 'crypto'

function hashApiKey(apiKey: string): string {
  return createHash('sha256').update(apiKey).digest('hex')
}
```

## Authentication Middleware

### apps/api/src/middleware/auth.ts

```typescript
import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { db, users, eq } from '@marketing-agent/db'
import { hashApiKey } from '@marketing-agent/shared'

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization')

  if (!authHeader) {
    throw new HTTPException(401, {
      message: 'Missing Authorization header',
    })
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new HTTPException(401, {
      message: 'Invalid Authorization format. Use: Bearer <api_key>',
    })
  }

  const apiKey = authHeader.slice(7) // Remove "Bearer "

  if (!apiKey || apiKey.length < 40) {
    throw new HTTPException(401, {
      message: 'Invalid API key format',
    })
  }

  // Hash the key and look up user
  const apiKeyHash = hashApiKey(apiKey)

  const user = await db.query.users.findFirst({
    where: eq(users.apiKeyHash, apiKeyHash),
  })

  if (!user) {
    throw new HTTPException(401, {
      message: 'Invalid API key',
    })
  }

  // Attach user to context for downstream handlers
  c.set('user', user)
  c.set('userId', user.id)

  await next()
}
```

### Type Definitions

```typescript
// packages/shared/src/types/context.ts
import type { User } from '@marketing-agent/db'

declare module 'hono' {
  interface ContextVariableMap {
    user: User
    userId: string
  }
}
```

## User Registration

### Create User with API Key

```typescript
// packages/db/src/operations/users.ts
import { db, users } from '../index'
import { generateApiKey, hashApiKey } from '@marketing-agent/shared'

export async function createUser(email?: string) {
  const apiKey = generateApiKey('live')
  const apiKeyHash = hashApiKey(apiKey)

  const [user] = await db.insert(users).values({
    email,
    apiKey: apiKey.slice(0, 12) + '...' + apiKey.slice(-4), // Masked for display
    apiKeyHash,
  }).returning()

  // Return the full API key only once
  return {
    user,
    apiKey, // Full key - show to user only this one time
  }
}
```

### API Key Rotation

```typescript
export async function rotateApiKey(userId: string) {
  const newApiKey = generateApiKey('live')
  const newApiKeyHash = hashApiKey(newApiKey)

  // Update with new key
  await db.update(users)
    .set({
      apiKey: newApiKey.slice(0, 12) + '...' + newApiKey.slice(-4),
      apiKeyHash: newApiKeyHash,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))

  return { apiKey: newApiKey }
}
```

## Telegram User Linking

Users link their Telegram account to their API key using the `/link` command.

### Flow

1. User obtains API key (via web or direct creation)
2. User messages bot: `/link ma_live_abc123...`
3. Bot validates API key against database
4. If valid, creates `user_channels` record
5. Future messages from that Telegram user are authenticated

### Implementation

```typescript
// packages/db/src/operations/user-channels.ts
import { db, users, userChannels, eq, and } from '../index'
import { hashApiKey } from '@marketing-agent/shared'

export async function linkTelegramUser(
  telegramUserId: string,
  telegramUsername: string | undefined,
  apiKey: string
): Promise<{ success: boolean; error?: string }> {
  // Validate API key
  const apiKeyHash = hashApiKey(apiKey)

  const user = await db.query.users.findFirst({
    where: eq(users.apiKeyHash, apiKeyHash),
  })

  if (!user) {
    return { success: false, error: 'Invalid API key' }
  }

  // Check if already linked
  const existing = await db.query.userChannels.findFirst({
    where: and(
      eq(userChannels.channel, 'telegram'),
      eq(userChannels.channelUserId, telegramUserId)
    ),
  })

  if (existing) {
    if (existing.userId === user.id) {
      return { success: true } // Already linked to same user
    }
    // Update to new user
    await db.update(userChannels)
      .set({ userId: user.id, linkedAt: new Date() })
      .where(eq(userChannels.id, existing.id))
  } else {
    // Create new link
    await db.insert(userChannels).values({
      userId: user.id,
      channel: 'telegram',
      channelUserId: telegramUserId,
      channelUsername: telegramUsername,
    })
  }

  return { success: true }
}

export async function getUserByTelegram(telegramUserId: string) {
  const channel = await db.query.userChannels.findFirst({
    where: and(
      eq(userChannels.channel, 'telegram'),
      eq(userChannels.channelUserId, telegramUserId)
    ),
    with: {
      user: true,
    },
  })

  return channel?.user ?? null
}
```

## Future: JWT Authentication

For web dashboard (future phase), implement JWT-based sessions.

### JWT Flow

1. User logs in with email/password or OAuth
2. Server issues JWT token
3. Client stores token and includes in requests
4. Server validates token on each request

### JWT Structure

```typescript
interface JWTPayload {
  sub: string       // User ID
  email: string
  iat: number       // Issued at
  exp: number       // Expiration
}
```

### Implementation Outline

```typescript
import { sign, verify } from 'hono/jwt'

const JWT_SECRET = process.env.JWT_SECRET!

export async function generateToken(user: User): Promise<string> {
  const payload = {
    sub: user.id,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  }

  return await sign(payload, JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    return await verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
```

## Security Best Practices

### API Key Security

1. **Never log API keys** - Mask in logs and errors
2. **Hash before storage** - Store SHA-256 hash only
3. **Single exposure** - Show full key only at creation
4. **Rotation support** - Allow users to regenerate keys
5. **Environment separation** - Different keys for test/live

### Request Security

1. **HTTPS only** - Reject HTTP in production
2. **Rate limiting** - Prevent brute force
3. **Request logging** - Audit trail without exposing keys
4. **Short timeouts** - Fail fast on slow requests

### Database Security

1. **Parameterized queries** - Drizzle handles this
2. **Minimal privileges** - DB user has limited permissions
3. **Connection encryption** - SSL/TLS for database connections

## Error Responses

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid API key"
  }
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have access to this resource"
  }
}
```

## Testing Authentication

```bash
# Valid request
curl -H "Authorization: Bearer ma_live_abc123..." \
  http://localhost:3000/api/v1/skills

# Missing header
curl http://localhost:3000/api/v1/skills
# → 401 Missing Authorization header

# Invalid key
curl -H "Authorization: Bearer invalid_key" \
  http://localhost:3000/api/v1/skills
# → 401 Invalid API key
```
