# Rate Limiting

Request limiting strategies for the Marketing Agent API.

## Overview

Rate limiting prevents abuse, ensures fair usage, and protects backend resources. Limits are applied per-user and per-endpoint.

## Rate Limit Tiers

### Default Limits

| Resource | Limit | Window |
|----------|-------|--------|
| API requests (general) | 100 | 1 minute |
| Skill detection | 60 | 1 minute |
| Skill execution | 20 | 1 minute |
| Output downloads | 100 | 1 minute |
| Feedback submissions | 30 | 1 minute |

### Per-Skill Limits

Some skills are more expensive (use more tokens). Apply additional limits:

| Skill Type | Limit | Window |
|------------|-------|--------|
| Simple skills | 20 | 1 minute |
| Complex skills (idea-to-spec) | 5 | 1 minute |

## Implementation

### In-Memory Rate Limiter

For single-instance deployments, use in-memory rate limiting:

```typescript
// apps/api/src/middleware/rate-limit.ts
import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-memory store (use Redis for multi-instance)
const rateLimitStore = new Map<string, RateLimitEntry>()

interface RateLimitConfig {
  limit: number
  windowMs: number
}

const defaultConfig: RateLimitConfig = {
  limit: 100,
  windowMs: 60 * 1000, // 1 minute
}

export function createRateLimiter(config: Partial<RateLimitConfig> = {}) {
  const { limit, windowMs } = { ...defaultConfig, ...config }

  return async function rateLimitMiddleware(c: Context, next: Next) {
    const userId = c.get('userId')
    if (!userId) {
      // No user context - use IP (for webhooks)
      const ip = c.req.header('x-forwarded-for') || 'unknown'
      return handleRateLimit(c, next, `ip:${ip}`, limit, windowMs)
    }

    return handleRateLimit(c, next, `user:${userId}`, limit, windowMs)
  }
}

async function handleRateLimit(
  c: Context,
  next: Next,
  key: string,
  limit: number,
  windowMs: number
) {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now >= entry.resetAt) {
    // New window
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
  } else if (entry.count >= limit) {
    // Limit exceeded
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)

    c.header('X-RateLimit-Limit', String(limit))
    c.header('X-RateLimit-Remaining', '0')
    c.header('X-RateLimit-Reset', String(Math.ceil(entry.resetAt / 1000)))
    c.header('Retry-After', String(retryAfter))

    throw new HTTPException(429, {
      message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
    })
  } else {
    // Increment counter
    entry.count++
  }

  // Set rate limit headers
  const current = rateLimitStore.get(key)!
  c.header('X-RateLimit-Limit', String(limit))
  c.header('X-RateLimit-Remaining', String(limit - current.count))
  c.header('X-RateLimit-Reset', String(Math.ceil(current.resetAt / 1000)))

  await next()
}

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(key)
    }
  }
}, 60 * 1000) // Every minute

// Export configured middleware
export const rateLimitMiddleware = createRateLimiter()

// Stricter limiter for skill execution
export const executionRateLimiter = createRateLimiter({
  limit: 20,
  windowMs: 60 * 1000,
})
```

### Route-Specific Limits

Apply different limits to different routes:

```typescript
// apps/api/src/routes/runs.ts
import { Hono } from 'hono'
import { executionRateLimiter } from '../middleware/rate-limit'

const app = new Hono()

// Apply stricter rate limit to execution endpoint
app.post('/', executionRateLimiter, async (c) => {
  // Handle skill execution
})

export default app
```

### Per-Skill Rate Limits

```typescript
// apps/api/src/middleware/skill-rate-limit.ts
import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

const skillLimits: Record<string, { limit: number; windowMs: number }> = {
  'idea-to-spec': { limit: 5, windowMs: 60 * 1000 },
  // Add other expensive skills
}

const defaultSkillLimit = { limit: 20, windowMs: 60 * 1000 }

const skillRateLimitStore = new Map<string, { count: number; resetAt: number }>()

export async function skillRateLimiter(c: Context, next: Next) {
  const userId = c.get('userId')
  const skillName = c.req.param('skillName') || c.req.query('skillName')

  if (!skillName) {
    return next()
  }

  const limits = skillLimits[skillName] || defaultSkillLimit
  const key = `${userId}:skill:${skillName}`
  const now = Date.now()

  const entry = skillRateLimitStore.get(key)

  if (!entry || now >= entry.resetAt) {
    skillRateLimitStore.set(key, {
      count: 1,
      resetAt: now + limits.windowMs,
    })
  } else if (entry.count >= limits.limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    throw new HTTPException(429, {
      message: `Rate limit for skill "${skillName}" exceeded. Try again in ${retryAfter} seconds.`,
    })
  } else {
    entry.count++
  }

  await next()
}
```

## Redis Rate Limiter (Multi-Instance)

For production with multiple API instances, use Redis:

```typescript
// apps/api/src/middleware/redis-rate-limit.ts
import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

interface RateLimitConfig {
  limit: number
  windowMs: number
}

export function createRedisRateLimiter(config: RateLimitConfig) {
  const { limit, windowMs } = config

  return async function rateLimitMiddleware(c: Context, next: Next) {
    const userId = c.get('userId') || 'anonymous'
    const key = `ratelimit:${userId}`
    const now = Date.now()

    // Use Redis MULTI for atomic operations
    const multi = redis.multi()
    multi.incr(key)
    multi.pttl(key)

    const results = await multi.exec()
    const count = results![0][1] as number
    const ttl = results![1][1] as number

    // Set expiry if new key
    if (ttl === -1) {
      await redis.pexpire(key, windowMs)
    }

    if (count > limit) {
      const retryAfter = Math.ceil((ttl > 0 ? ttl : windowMs) / 1000)

      c.header('X-RateLimit-Limit', String(limit))
      c.header('X-RateLimit-Remaining', '0')
      c.header('Retry-After', String(retryAfter))

      throw new HTTPException(429, {
        message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
      })
    }

    c.header('X-RateLimit-Limit', String(limit))
    c.header('X-RateLimit-Remaining', String(Math.max(0, limit - count)))

    await next()
  }
}
```

## Sliding Window Algorithm

For smoother rate limiting, implement sliding window:

```typescript
// Sliding window rate limiter
export async function slidingWindowRateLimit(
  userId: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now()
  const windowStart = now - windowMs
  const key = `ratelimit:sliding:${userId}`

  // Remove old entries and count recent ones
  await redis.zremrangebyscore(key, 0, windowStart)
  const count = await redis.zcard(key)

  if (count >= limit) {
    const oldestEntry = await redis.zrange(key, 0, 0, 'WITHSCORES')
    const resetAt = oldestEntry.length > 1
      ? parseInt(oldestEntry[1]) + windowMs
      : now + windowMs

    return {
      allowed: false,
      remaining: 0,
      resetAt,
    }
  }

  // Add current request
  await redis.zadd(key, now, `${now}:${Math.random()}`)
  await redis.pexpire(key, windowMs)

  return {
    allowed: true,
    remaining: limit - count - 1,
    resetAt: now + windowMs,
  }
}
```

## Rate Limit Headers

All responses include rate limit headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed in window |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | Unix timestamp when window resets |
| `Retry-After` | Seconds until retry (on 429 only) |

## Error Response

When rate limit is exceeded:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 45 seconds.",
    "retryAfter": 45
  }
}
```

HTTP Status: `429 Too Many Requests`

## Client Handling

### Retry with Backoff

Clients should implement exponential backoff:

```typescript
async function requestWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options)

    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '60')
      const backoff = Math.min(retryAfter * 1000, Math.pow(2, attempt) * 1000)

      console.log(`Rate limited. Retrying in ${backoff / 1000}s...`)
      await new Promise(resolve => setTimeout(resolve, backoff))
      continue
    }

    return response
  }

  throw new Error('Max retries exceeded')
}
```

## Monitoring

### Metrics to Track

1. **Rate limit hits** - Count of 429 responses
2. **Close calls** - Requests with <10% remaining
3. **Per-user usage** - Identify heavy users
4. **Per-endpoint usage** - Identify hot endpoints

### Logging

```typescript
// Log rate limit events
if (remaining < limit * 0.1) {
  console.warn(`User ${userId} approaching rate limit: ${remaining}/${limit}`)
}

if (count > limit) {
  console.warn(`Rate limit exceeded for user ${userId}`)
}
```

## Configuration

### Environment Variables

```bash
# Rate limiting configuration
RATE_LIMIT_ENABLED=true
RATE_LIMIT_DEFAULT=100
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_EXECUTION=20

# Redis (for multi-instance)
REDIS_URL=redis://localhost:6379
```

### Dynamic Configuration

Allow runtime configuration updates:

```typescript
interface RateLimitConfig {
  enabled: boolean
  defaultLimit: number
  windowMs: number
  perSkillLimits: Record<string, number>
}

let config: RateLimitConfig = {
  enabled: true,
  defaultLimit: 100,
  windowMs: 60000,
  perSkillLimits: {
    'idea-to-spec': 5,
  },
}

export function updateRateLimitConfig(newConfig: Partial<RateLimitConfig>) {
  config = { ...config, ...newConfig }
}
```
