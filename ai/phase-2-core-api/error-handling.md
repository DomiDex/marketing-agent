# Error Handling

Error response format, HTTP status codes, and retry strategies.

## Error Response Format

All errors follow a consistent JSON structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... },
    "requestId": "req_abc123"
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| success | boolean | Yes | Always `false` for errors |
| error.code | string | Yes | Machine-readable error code |
| error.message | string | Yes | Human-readable description |
| error.details | object | No | Additional error context |
| error.requestId | string | No | Request ID for debugging |

## Error Codes

### Authentication Errors (401)

| Code | Message |
|------|---------|
| `UNAUTHORIZED` | Missing or invalid authentication |
| `INVALID_API_KEY` | API key is invalid or expired |
| `MISSING_AUTH_HEADER` | Authorization header not provided |

### Authorization Errors (403)

| Code | Message |
|------|---------|
| `FORBIDDEN` | Access denied to this resource |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions |
| `RESOURCE_OWNER_MISMATCH` | Resource belongs to another user |

### Not Found Errors (404)

| Code | Message |
|------|---------|
| `NOT_FOUND` | Generic not found |
| `SKILL_NOT_FOUND` | Skill does not exist |
| `CLIENT_NOT_FOUND` | Client does not exist |
| `RUN_NOT_FOUND` | Run does not exist |
| `OUTPUT_NOT_FOUND` | Output does not exist |

### Validation Errors (400)

| Code | Message |
|------|---------|
| `VALIDATION_ERROR` | Request validation failed |
| `INVALID_INPUT` | Input format is invalid |
| `MISSING_REQUIRED_FIELD` | Required field not provided |
| `INVALID_SKILL_NAME` | Skill name is invalid |

### Rate Limit Errors (429)

| Code | Message |
|------|---------|
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `SKILL_RATE_LIMIT_EXCEEDED` | Skill-specific limit exceeded |

### Server Errors (500)

| Code | Message |
|------|---------|
| `INTERNAL_ERROR` | Unexpected server error |
| `DATABASE_ERROR` | Database operation failed |
| `STORAGE_ERROR` | S3 operation failed |
| `AGENT_ERROR` | Claude Agent SDK error |

### External Service Errors (502, 503)

| Code | Message |
|------|---------|
| `ANTHROPIC_ERROR` | Anthropic API error |
| `INNGEST_ERROR` | Inngest service error |
| `S3_ERROR` | S3 service unavailable |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable |

## HTTP Status Code Mapping

| Status | When to Use |
|--------|-------------|
| 200 | Success with data |
| 201 | Resource created |
| 204 | Success, no content |
| 400 | Invalid request (validation) |
| 401 | Authentication required/failed |
| 403 | Authenticated but not authorized |
| 404 | Resource not found |
| 409 | Conflict (duplicate resource) |
| 422 | Unprocessable entity |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 502 | Bad gateway (upstream error) |
| 503 | Service unavailable |
| 504 | Gateway timeout |

## Error Handler Implementation

### apps/api/src/middleware/error-handler.ts

```typescript
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'

// Custom error class
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// Error response builder
function buildErrorResponse(
  code: string,
  message: string,
  details?: Record<string, unknown>,
  requestId?: string
) {
  return {
    success: false as const,
    error: {
      code,
      message,
      ...(details && { details }),
      ...(requestId && { requestId }),
    },
  }
}

// Main error handler
export function errorHandler(err: Error, c: Context) {
  const requestId = c.req.header('x-request-id') || crypto.randomUUID()

  // Log error (in production, send to error tracking)
  console.error(`[${requestId}] Error:`, err)

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const details = {
      issues: err.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    }

    return c.json(
      buildErrorResponse('VALIDATION_ERROR', 'Request validation failed', details, requestId),
      400
    )
  }

  // Handle custom AppError
  if (err instanceof AppError) {
    return c.json(
      buildErrorResponse(err.code, err.message, err.details, requestId),
      err.statusCode
    )
  }

  // Handle Hono HTTPException
  if (err instanceof HTTPException) {
    const code = httpStatusToCode(err.status)
    return c.json(
      buildErrorResponse(code, err.message, undefined, requestId),
      err.status
    )
  }

  // Handle Anthropic API errors
  if (err.name === 'AnthropicError' || err.message.includes('Anthropic')) {
    return c.json(
      buildErrorResponse('ANTHROPIC_ERROR', 'AI service error. Please try again.', undefined, requestId),
      502
    )
  }

  // Handle database errors
  if (err.message.includes('database') || err.message.includes('postgres')) {
    return c.json(
      buildErrorResponse('DATABASE_ERROR', 'Database error. Please try again.', undefined, requestId),
      500
    )
  }

  // Generic internal error
  return c.json(
    buildErrorResponse(
      'INTERNAL_ERROR',
      process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message,
      undefined,
      requestId
    ),
    500
  )
}

// Map HTTP status to error code
function httpStatusToCode(status: number): string {
  const statusCodes: Record<number, string> = {
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    405: 'METHOD_NOT_ALLOWED',
    409: 'CONFLICT',
    422: 'UNPROCESSABLE_ENTITY',
    429: 'RATE_LIMIT_EXCEEDED',
    500: 'INTERNAL_ERROR',
    502: 'BAD_GATEWAY',
    503: 'SERVICE_UNAVAILABLE',
    504: 'GATEWAY_TIMEOUT',
  }

  return statusCodes[status] || 'UNKNOWN_ERROR'
}
```

### Helper Functions

```typescript
// packages/shared/src/errors.ts

// Throw not found error
export function notFound(resource: string, identifier?: string) {
  const message = identifier
    ? `${resource} "${identifier}" not found`
    : `${resource} not found`

  throw new AppError(`${resource.toUpperCase()}_NOT_FOUND`, message, 404)
}

// Throw validation error
export function validationError(message: string, details?: Record<string, unknown>) {
  throw new AppError('VALIDATION_ERROR', message, 400, details)
}

// Throw unauthorized error
export function unauthorized(message = 'Authentication required') {
  throw new AppError('UNAUTHORIZED', message, 401)
}

// Throw forbidden error
export function forbidden(message = 'Access denied') {
  throw new AppError('FORBIDDEN', message, 403)
}

// Usage in routes:
// import { notFound } from '@marketing-agent/shared/errors'
// if (!skill) notFound('Skill', skillName)
```

## Validation Error Details

Zod validation errors include detailed field information:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "issues": [
        {
          "path": "message",
          "message": "String must contain at least 1 character(s)"
        },
        {
          "path": "options.tone",
          "message": "Invalid enum value. Expected 'formal' | 'casual', received 'invalid'"
        }
      ]
    },
    "requestId": "req_abc123"
  }
}
```

## Retry Strategies

### Client-Side Retry Logic

```typescript
// Retryable error codes
const RETRYABLE_CODES = [
  'RATE_LIMIT_EXCEEDED',
  'SERVICE_UNAVAILABLE',
  'ANTHROPIC_ERROR',
  'INNGEST_ERROR',
  'GATEWAY_TIMEOUT',
]

// Retry with exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3,
  baseDelayMs = 1000
): Promise<Response> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)

      // Don't retry successful responses
      if (response.ok) {
        return response
      }

      // Parse error response
      const body = await response.json()
      const errorCode = body.error?.code

      // Check if retryable
      if (!RETRYABLE_CODES.includes(errorCode)) {
        return response // Return non-retryable error
      }

      // Calculate delay
      const retryAfter = response.headers.get('Retry-After')
      const delay = retryAfter
        ? parseInt(retryAfter) * 1000
        : baseDelayMs * Math.pow(2, attempt)

      console.log(`Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`)
      await new Promise(resolve => setTimeout(resolve, delay))

    } catch (error) {
      lastError = error as Error
      // Network errors are retryable
      const delay = baseDelayMs * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError || new Error('Max retries exceeded')
}
```

### Server-Side: Inngest Retry

Inngest handles retries for failed jobs:

```typescript
// packages/inngest-functions/src/skill-execute.ts
import { inngest } from './client'

export const skillExecute = inngest.createFunction(
  {
    id: 'skill-execute',
    retries: 3, // Retry failed executions up to 3 times
    throttle: {
      limit: 10,
      period: '1m',
      key: 'event.data.userId',
    },
  },
  { event: 'skill.execute' },
  async ({ event, step }) => {
    // ... execution logic

    // Throw to trigger retry
    if (shouldRetry) {
      throw new Error('Temporary failure, will retry')
    }
  }
)
```

## Logging Best Practices

### What to Log

```typescript
// Log structure
interface ErrorLog {
  requestId: string
  timestamp: string
  level: 'error' | 'warn'
  code: string
  message: string
  userId?: string
  path: string
  method: string
  stack?: string
  context?: Record<string, unknown>
}

// Example logging
function logError(c: Context, err: Error, code: string) {
  const log: ErrorLog = {
    requestId: c.req.header('x-request-id') || 'unknown',
    timestamp: new Date().toISOString(),
    level: 'error',
    code,
    message: err.message,
    userId: c.get('userId'),
    path: c.req.path,
    method: c.req.method,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  }

  console.error(JSON.stringify(log))
}
```

### What NOT to Log

- API keys (even partial)
- User passwords
- Full request bodies with sensitive data
- PII (email, phone, etc.) in plain text

## Testing Error Handling

```typescript
// test/error-handling.test.ts
import { describe, it, expect } from 'vitest'
import app from '../src/index'

describe('Error Handling', () => {
  it('returns 401 for missing auth', async () => {
    const res = await app.request('/api/v1/skills')

    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.code).toBe('UNAUTHORIZED')
  })

  it('returns 404 for unknown skill', async () => {
    const res = await app.request('/api/v1/skills/nonexistent', {
      headers: { Authorization: 'Bearer valid_key' },
    })

    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body.error.code).toBe('SKILL_NOT_FOUND')
  })

  it('returns validation error for invalid input', async () => {
    const res = await app.request('/api/v1/runs', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer valid_key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: '' }), // Empty message
    })

    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.details.issues).toBeDefined()
  })
})
```
