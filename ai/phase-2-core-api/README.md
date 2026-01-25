# Phase 2: Core API

REST API implementation using Hono.

## Overview

This phase builds the core REST API that powers all client channels (Telegram, web, future integrations).

## Goals

1. Implement Hono API server with all routes
2. Add API key authentication
3. Implement rate limiting
4. Define error response format
5. Add Zod validation for all endpoints

## Prerequisites

- Phase 1 complete (database, S3, Docker)
- Dependencies installed

## Documents

| Document | Purpose |
|----------|---------|
| [api-endpoints.md](./api-endpoints.md) | Full REST API specification |
| [authentication.md](./authentication.md) | API key and JWT authentication |
| [rate-limiting.md](./rate-limiting.md) | Request limiting strategies |
| [error-handling.md](./error-handling.md) | Error response format and codes |

## API Routes Overview

```
/api/v1/
├── skills/
│   ├── GET    /                    # List all skills
│   ├── GET    /:name               # Get skill details
│   └── POST   /detect              # Detect skill from message
├── clients/
│   ├── GET    /                    # List user's clients
│   ├── POST   /                    # Create client
│   ├── GET    /:id                 # Get client details
│   ├── PUT    /:id                 # Update client
│   └── DELETE /:id                 # Delete client
├── runs/
│   ├── POST   /                    # Execute skill (queues job)
│   ├── GET    /:id                 # Get run status
│   └── GET    /                    # List user's runs
├── outputs/
│   ├── GET    /                    # List outputs
│   ├── GET    /:id                 # Get output metadata
│   └── GET    /:id/download        # Download output (signed URL)
├── feedback/
│   ├── POST   /                    # Submit feedback
│   └── GET    /                    # List feedback
└── webhooks/
    ├── POST   /telegram            # Telegram updates
    └── POST   /inngest             # Inngest callbacks
```

## Implementation Order

```
1. Project Setup
   └─ Create apps/api with Hono

2. Middleware
   ├─ Authentication (API key)
   ├─ Rate limiting
   └─ Error handling

3. Route Implementation
   ├─ Skills routes (read-only)
   ├─ Clients routes (CRUD)
   ├─ Runs routes (execute + status)
   ├─ Outputs routes (list + download)
   ├─ Feedback routes
   └─ Webhook routes

4. Validation
   └─ Zod schemas for all endpoints
```

## Verification Checklist

- [ ] API starts without errors
- [ ] `/api/v1/skills` returns skill list
- [ ] API key authentication works
- [ ] Rate limiting triggers at threshold
- [ ] Error responses follow format
- [ ] All Zod validations pass
- [ ] Inngest webhook receives events

## Dependencies

- Phase 1 (database, S3) complete
- Inngest configured and running

## Packages Used

```json
{
  "dependencies": {
    "hono": "^4.6.14",
    "@hono/zod-validator": "^0.4.2",
    "inngest": "^3.28.0",
    "@marketing-agent/shared": "workspace:*",
    "@marketing-agent/db": "workspace:*",
    "@marketing-agent/storage": "workspace:*",
    "@marketing-agent/skill-detector": "workspace:*"
  }
}
```

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - System overview
- [Phase 1: Foundation](../phase-1-foundation/README.md) - Database schema
- [Phase 3: Agent Execution](../phase-3-agent-execution/README.md) - Skill execution
