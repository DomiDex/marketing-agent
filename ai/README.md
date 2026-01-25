# Marketing Agent API Documentation

Documentation and implementation plans for exposing 37 Claude Code skills via API.

## Overview

The Marketing Agent API transforms a collection of Claude Code skills into an accessible, multi-channel service. Users can interact via Telegram (Phase 1) with web/API access planned for future phases.

### What This Project Does

1. **Skill Exposure**: Makes 37 specialized marketing skills available via API
2. **Intelligent Detection**: Automatically identifies the right skill for user requests
3. **Context Management**: Aggregates client profiles, brand voice, and product info
4. **Async Execution**: Queues jobs via Inngest for reliable, scalable execution
5. **Feedback Loop**: Collects structured feedback to continuously improve skills

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Bun | Fast JavaScript runtime |
| Monorepo | Turborepo + pnpm | Package management |
| API | Hono | Lightweight, fast API framework |
| Validation | Zod | Runtime type validation |
| Database | PostgreSQL + Drizzle | Data persistence |
| File Storage | S3/MinIO | Skills, outputs, client data |
| Job Queue | Inngest | Background job processing |
| Agent | Claude Agent SDK | Skill execution engine |
| Linting | Biome | Code quality |
| Testing | Vitest | Unit and integration tests |

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Channels                         │
│                 Telegram │ Web │ Slack (future)              │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                        Hono API                              │
│     /skills │ /clients │ /runs │ /outputs │ /feedback       │
└─────────────┬───────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Skill Detector                            │
│        Keyword Match → Claude Haiku Disambiguation           │
└─────────────┬───────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Inngest Job Queue                           │
│              skill.execute │ feedback.process                │
└─────────────┬───────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Agent Executor                             │
│            Claude Agent SDK + Context Building               │
└─────────────┬───────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Storage                                │
│          PostgreSQL (metadata) │ S3 (files/outputs)          │
└─────────────────────────────────────────────────────────────┘
```

## Documentation Structure

### Phase 1: Foundation
Infrastructure setup - database, storage, Docker.

- [README](./phase-1-foundation/README.md)
- [Monorepo Setup](./phase-1-foundation/monorepo-setup.md)
- [Database Schema](./phase-1-foundation/database-schema.md)
- [S3 Structure](./phase-1-foundation/s3-structure.md)
- [Docker Compose](./phase-1-foundation/docker-compose.md)

### Phase 2: Core API
REST endpoints, auth, rate limiting.

- [README](./phase-2-core-api/README.md)
- [API Endpoints](./phase-2-core-api/api-endpoints.md)
- [Authentication](./phase-2-core-api/authentication.md)
- [Rate Limiting](./phase-2-core-api/rate-limiting.md)
- [Error Handling](./phase-2-core-api/error-handling.md)

### Phase 3: Agent Execution
Claude Agent SDK integration, job processing.

- [README](./phase-3-agent-execution/README.md)
- [Agent Executor](./phase-3-agent-execution/agent-executor.md)
- [Inngest Functions](./phase-3-agent-execution/inngest-functions.md)
- [Context Building](./phase-3-agent-execution/context-building.md)
- [Output Parsing](./phase-3-agent-execution/output-parsing.md)

### Phase 4: Skill Detection
Automatic skill selection from user messages.

- [README](./phase-4-skill-detection/README.md)
- [Detection Algorithm](./phase-4-skill-detection/detection-algorithm.md)
- [Keyword Mapping](./phase-4-skill-detection/keyword-mapping.md)
- [Claude Fallback](./phase-4-skill-detection/claude-fallback.md)

### Phase 5: Telegram Bot
First client channel implementation.

- [README](./phase-5-telegram-bot/README.md)
- [Bot Commands](./phase-5-telegram-bot/bot-commands.md)
- [Message Flow](./phase-5-telegram-bot/message-flow.md)
- [Inline Keyboards](./phase-5-telegram-bot/inline-keyboards.md)
- [Feedback Collection](./phase-5-telegram-bot/feedback-collection.md)

### Phase 6: Feedback & Metrics
Continuous improvement system.

- [README](./phase-6-feedback-metrics/README.md)
- [Feedback Schema](./phase-6-feedback-metrics/feedback-schema.md)
- [Metrics Aggregation](./phase-6-feedback-metrics/metrics-aggregation.md)
- [Improvement Workflow](./phase-6-feedback-metrics/improvement-workflow.md)

### Reference
Static reference documentation.

- [Skill Catalog](./reference/skill-catalog.md) - All 37 skills with triggers
- [Client Structure](./reference/client-structure.md) - Client profile template
- [Environment Variables](./reference/env-variables.md) - Configuration reference

## Quick Links

| Resource | Location |
|----------|----------|
| Skills | `.claude/skills/` |
| Client Template | `clients/_template/` |
| Feedback Template | `.claude/feedback/_template.md` |
| Existing API Structure | `marketing-agent-api/` |
| Workflows | `workflows/` |

## Getting Started

1. **Review Architecture**: Start with [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Understand Skills**: Read [reference/skill-catalog.md](./reference/skill-catalog.md)
3. **Follow Phases**: Implement in order, Phase 1 → 6
4. **Reference Often**: Use reference docs for consistent implementation

## Implementation Status

| Phase | Status | Dependencies |
|-------|--------|--------------|
| Phase 1: Foundation | Not Started | - |
| Phase 2: Core API | Not Started | Phase 1 |
| Phase 3: Agent Execution | Not Started | Phase 2 |
| Phase 4: Skill Detection | Not Started | Phase 3 |
| Phase 5: Telegram Bot | Not Started | Phase 4 |
| Phase 6: Feedback & Metrics | Not Started | Phase 5 |
