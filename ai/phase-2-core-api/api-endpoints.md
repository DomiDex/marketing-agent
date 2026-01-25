# API Endpoints

Complete REST API specification for the Marketing Agent.

## Base URL

```
/api/v1
```

## Authentication

All endpoints except webhooks require API key authentication:

```
Authorization: Bearer <api_key>
```

## Common Response Format

### Success

```json
{
  "success": true,
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": { ... }
  }
}
```

---

## Skills Endpoints

### GET /skills

List all available skills.

**Response:**
```json
{
  "success": true,
  "data": {
    "skills": [
      {
        "name": "copywriting",
        "description": "Write marketing copy for pages...",
        "type": "with_rules",
        "triggerKeywords": ["write copy", "marketing copy", "headline"],
        "relatedSkills": ["copy-editing", "page-cro"]
      }
    ],
    "total": 37
  }
}
```

### GET /skills/:name

Get details for a specific skill.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| name | string | Skill name (e.g., "copywriting") |

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "copywriting",
    "description": "Write marketing copy for pages...",
    "type": "with_rules",
    "hasRules": true,
    "hasSubdirectories": false,
    "triggerKeywords": ["write copy", "marketing copy", "headline", "CTA"],
    "relatedSkills": ["copy-editing", "page-cro", "email-sequence"]
  }
}
```

### POST /skills/detect

Detect the appropriate skill from a user message.

**Request Body:**
```json
{
  "message": "Write homepage copy for Yaz Automate",
  "clientId": "uuid" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "skill": "copywriting",
    "confidence": 0.92,
    "method": "keyword", // "command" | "keyword" | "claude"
    "extracted": {
      "clientSlug": "yaz-automate",
      "outputType": "homepage"
    },
    "alternatives": [
      {
        "skill": "page-cro",
        "confidence": 0.45
      }
    ]
  }
}
```

---

## Clients Endpoints

### GET /clients

List user's clients.

**Query Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| limit | number | 20 | Max results |
| offset | number | 0 | Pagination offset |

**Response:**
```json
{
  "success": true,
  "data": {
    "clients": [
      {
        "id": "uuid",
        "name": "Yaz Automate",
        "slug": "yaz-automate",
        "description": "AI-powered automation platform",
        "createdAt": "2026-01-20T10:00:00Z",
        "updatedAt": "2026-01-25T15:30:00Z"
      }
    ],
    "total": 3,
    "limit": 20,
    "offset": 0
  }
}
```

### POST /clients

Create a new client.

**Request Body:**
```json
{
  "name": "New Client",
  "slug": "new-client",
  "description": "Client description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Client",
    "slug": "new-client",
    "description": "Client description",
    "s3Prefix": "clients/new-client/",
    "createdAt": "2026-01-25T10:00:00Z"
  }
}
```

### GET /clients/:id

Get client details with context summary.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Yaz Automate",
    "slug": "yaz-automate",
    "description": "AI-powered automation platform",
    "contextSummary": {
      "hasProfile": true,
      "hasBrandVoice": true,
      "hasBrandMessaging": true,
      "hasPrimaryIcp": true,
      "hasProductOverview": true,
      "hasCompetitors": false
    },
    "createdAt": "2026-01-20T10:00:00Z",
    "updatedAt": "2026-01-25T15:30:00Z"
  }
}
```

### PUT /clients/:id

Update client details.

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description"
}
```

### DELETE /clients/:id

Delete a client and all associated data.

**Response:**
```json
{
  "success": true,
  "data": {
    "deleted": true
  }
}
```

---

## Runs Endpoints

### POST /runs

Execute a skill (queues Inngest job).

**Request Body:**
```json
{
  "skillName": "copywriting",
  "message": "Write homepage copy focusing on automation benefits",
  "clientId": "uuid", // optional
  "options": {        // optional, skill-specific
    "tone": "professional",
    "includeAlternatives": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "runId": "uuid",
    "status": "queued",
    "skill": "copywriting",
    "clientId": "uuid",
    "queuedAt": "2026-01-25T10:00:00Z",
    "estimatedWaitTime": 60 // seconds (rough estimate)
  }
}
```

### GET /runs/:id

Get run status and details.

**Response (queued):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "queued",
    "skill": "copywriting",
    "clientId": "uuid",
    "message": "Write homepage copy...",
    "queuedAt": "2026-01-25T10:00:00Z",
    "startedAt": null,
    "completedAt": null
  }
}
```

**Response (running):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "running",
    "skill": "copywriting",
    "clientId": "uuid",
    "message": "Write homepage copy...",
    "queuedAt": "2026-01-25T10:00:00Z",
    "startedAt": "2026-01-25T10:00:05Z",
    "completedAt": null
  }
}
```

**Response (completed):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "completed",
    "skill": "copywriting",
    "clientId": "uuid",
    "message": "Write homepage copy...",
    "queuedAt": "2026-01-25T10:00:00Z",
    "startedAt": "2026-01-25T10:00:05Z",
    "completedAt": "2026-01-25T10:01:30Z",
    "tokensInput": 8500,
    "tokensOutput": 4000,
    "output": {
      "id": "output-uuid",
      "preview": "# Homepage Copy for Yaz Automate\n\n## Hero Section\n...",
      "format": "markdown"
    }
  }
}
```

**Response (failed):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "failed",
    "skill": "copywriting",
    "errorMessage": "Rate limit exceeded for Anthropic API",
    "queuedAt": "2026-01-25T10:00:00Z",
    "startedAt": "2026-01-25T10:00:05Z",
    "completedAt": "2026-01-25T10:00:10Z"
  }
}
```

### GET /runs

List user's runs.

**Query Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| status | string | - | Filter by status |
| skillName | string | - | Filter by skill |
| clientId | string | - | Filter by client |
| limit | number | 20 | Max results |
| offset | number | 0 | Pagination offset |

**Response:**
```json
{
  "success": true,
  "data": {
    "runs": [
      {
        "id": "uuid",
        "status": "completed",
        "skill": "copywriting",
        "clientId": "uuid",
        "message": "Write homepage copy...",
        "queuedAt": "2026-01-25T10:00:00Z",
        "completedAt": "2026-01-25T10:01:30Z",
        "hasOutput": true
      }
    ],
    "total": 15,
    "limit": 20,
    "offset": 0
  }
}
```

---

## Outputs Endpoints

### GET /outputs

List outputs.

**Query Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| skillName | string | - | Filter by skill |
| clientId | string | - | Filter by client |
| limit | number | 20 | Max results |
| offset | number | 0 | Pagination offset |

**Response:**
```json
{
  "success": true,
  "data": {
    "outputs": [
      {
        "id": "uuid",
        "runId": "uuid",
        "skill": "copywriting",
        "clientId": "uuid",
        "title": "Homepage Copy for Yaz Automate",
        "preview": "# Homepage Copy for Yaz Automate\n\n## Hero...",
        "format": "markdown",
        "sizeBytes": 4520,
        "createdAt": "2026-01-25T10:01:30Z"
      }
    ],
    "total": 50,
    "limit": 20,
    "offset": 0
  }
}
```

### GET /outputs/:id

Get output metadata.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "runId": "uuid",
    "skill": "copywriting",
    "clientId": "uuid",
    "title": "Homepage Copy for Yaz Automate",
    "preview": "# Homepage Copy for Yaz Automate\n\n## Hero Section...",
    "format": "markdown",
    "sizeBytes": 4520,
    "s3Key": "outputs/copywriting/yaz-automate-homepage-2026-01-25.md",
    "createdAt": "2026-01-25T10:01:30Z",
    "feedback": {
      "id": "uuid",
      "overallScore": 4
    }
  }
}
```

### GET /outputs/:id/download

Get download URL for output.

**Response:**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://s3.../outputs/copywriting/yaz-automate-homepage-2026-01-25.md?...",
    "expiresAt": "2026-01-25T11:00:00Z",
    "filename": "yaz-automate-homepage-2026-01-25.md"
  }
}
```

---

## Feedback Endpoints

### POST /feedback

Submit feedback for an output.

**Request Body:**
```json
{
  "outputId": "uuid",
  "overallScore": 4,
  "accuracyScore": 5,
  "qualityScore": 4,
  "usefulnessScore": 4,
  "ruleComplianceScore": 4,
  "whatWorkedWell": "Clear structure, good CTAs",
  "issues": [
    {
      "description": "Too formal for our brand voice",
      "severity": "medium",
      "suggestedFix": "Use more conversational tone"
    }
  ],
  "suggestedRuleChanges": []
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "outputId": "uuid",
    "overallScore": 4,
    "createdAt": "2026-01-25T10:05:00Z"
  }
}
```

### GET /feedback

List feedback (optionally filtered).

**Query Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| skillName | string | - | Filter by skill |
| minScore | number | - | Minimum overall score |
| maxScore | number | - | Maximum overall score |
| limit | number | 20 | Max results |
| offset | number | 0 | Pagination offset |

**Response:**
```json
{
  "success": true,
  "data": {
    "feedback": [
      {
        "id": "uuid",
        "outputId": "uuid",
        "skill": "copywriting",
        "overallScore": 4,
        "accuracyScore": 5,
        "qualityScore": 4,
        "usefulnessScore": 4,
        "whatWorkedWell": "Clear structure, good CTAs",
        "issues": [...],
        "createdAt": "2026-01-25T10:05:00Z"
      }
    ],
    "total": 25,
    "limit": 20,
    "offset": 0
  }
}
```

---

## Webhook Endpoints

### POST /webhooks/telegram

Receive Telegram bot updates. No authentication (uses webhook secret in URL or header).

**Request Body:**
Telegram Update object (see Telegram Bot API docs).

**Response:**
```json
{
  "ok": true
}
```

### POST /webhooks/inngest

Receive Inngest callbacks. Validated via Inngest signing key.

**Request Body:**
Inngest event payload.

**Response:**
```json
{
  "ok": true
}
```

---

## Zod Schemas

### packages/shared/src/validators/skills.ts

```typescript
import { z } from 'zod'

export const detectSkillSchema = z.object({
  message: z.string().min(1).max(5000),
  clientId: z.string().uuid().optional(),
})

export type DetectSkillInput = z.infer<typeof detectSkillSchema>
```

### packages/shared/src/validators/clients.ts

```typescript
import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
})

export const updateClientSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
})

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>
```

### packages/shared/src/validators/runs.ts

```typescript
import { z } from 'zod'

export const createRunSchema = z.object({
  skillName: z.string().min(1).max(100),
  message: z.string().min(1).max(10000),
  clientId: z.string().uuid().optional(),
  options: z.record(z.unknown()).optional(),
})

export const listRunsSchema = z.object({
  status: z.enum(['queued', 'running', 'completed', 'failed', 'cancelled']).optional(),
  skillName: z.string().optional(),
  clientId: z.string().uuid().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
})

export type CreateRunInput = z.infer<typeof createRunSchema>
export type ListRunsInput = z.infer<typeof listRunsSchema>
```

### packages/shared/src/validators/feedback.ts

```typescript
import { z } from 'zod'

const issueSchema = z.object({
  description: z.string().min(1).max(500),
  severity: z.enum(['high', 'medium', 'low']),
  suggestedFix: z.string().max(500).optional(),
})

const ruleChangeSchema = z.object({
  file: z.string().min(1).max(200),
  currentRule: z.string().max(500).optional(),
  suggestedChange: z.string().min(1).max(1000),
  rationale: z.string().min(1).max(500),
})

export const createFeedbackSchema = z.object({
  outputId: z.string().uuid(),
  overallScore: z.number().int().min(1).max(5),
  accuracyScore: z.number().int().min(1).max(5).optional(),
  qualityScore: z.number().int().min(1).max(5).optional(),
  usefulnessScore: z.number().int().min(1).max(5).optional(),
  ruleComplianceScore: z.number().int().min(1).max(5).optional(),
  whatWorkedWell: z.string().max(2000).optional(),
  issues: z.array(issueSchema).max(10).default([]),
  suggestedRuleChanges: z.array(ruleChangeSchema).max(5).default([]),
})

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>
```

---

## Hono Route Implementation

### apps/api/src/routes/skills.ts

```typescript
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { db, skills, eq } from '@marketing-agent/db'
import { detectSkillSchema } from '@marketing-agent/shared/validators'
import { detectSkill } from '@marketing-agent/skill-detector'

const app = new Hono()

// List all skills
app.get('/', async (c) => {
  const allSkills = await db.query.skills.findMany({
    columns: {
      name: true,
      description: true,
      type: true,
      triggerKeywords: true,
      relatedSkills: true,
    },
  })

  return c.json({
    success: true,
    data: {
      skills: allSkills,
      total: allSkills.length,
    },
  })
})

// Get skill by name
app.get('/:name', async (c) => {
  const name = c.req.param('name')

  const skill = await db.query.skills.findFirst({
    where: eq(skills.name, name),
  })

  if (!skill) {
    return c.json({
      success: false,
      error: {
        code: 'SKILL_NOT_FOUND',
        message: `Skill "${name}" not found`,
      },
    }, 404)
  }

  return c.json({
    success: true,
    data: skill,
  })
})

// Detect skill from message
app.post('/detect', zValidator('json', detectSkillSchema), async (c) => {
  const { message, clientId } = c.req.valid('json')

  const result = await detectSkill(message, clientId)

  return c.json({
    success: true,
    data: result,
  })
})

export default app
```

### apps/api/src/index.ts

```typescript
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { serve } from 'inngest/hono'

import { authMiddleware } from './middleware/auth'
import { rateLimitMiddleware } from './middleware/rate-limit'
import { errorHandler } from './middleware/error-handler'

import skills from './routes/skills'
import clients from './routes/clients'
import runs from './routes/runs'
import outputs from './routes/outputs'
import feedback from './routes/feedback'
import webhooks from './routes/webhooks'

import { inngest, functions } from '@marketing-agent/inngest-functions'

const app = new Hono()

// Global middleware
app.use('*', logger())
app.use('*', cors())
app.onError(errorHandler)

// Inngest serve endpoint
app.on(['GET', 'PUT', 'POST'], '/api/inngest', serve({ client: inngest, functions }))

// Public routes
app.route('/api/v1/webhooks', webhooks)

// Protected routes
app.use('/api/v1/*', authMiddleware)
app.use('/api/v1/*', rateLimitMiddleware)

app.route('/api/v1/skills', skills)
app.route('/api/v1/clients', clients)
app.route('/api/v1/runs', runs)
app.route('/api/v1/outputs', outputs)
app.route('/api/v1/feedback', feedback)

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

export default {
  port: process.env.API_PORT || 3000,
  fetch: app.fetch,
}
```
