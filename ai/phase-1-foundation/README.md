# Phase 1: Foundation

Infrastructure setup for the Marketing Agent API.

## Overview

This phase establishes the core infrastructure: database, file storage, and local development environment.

## Goals

1. Configure Turborepo monorepo structure
2. Set up PostgreSQL with Drizzle ORM
3. Configure S3-compatible storage (MinIO for local dev)
4. Create Docker Compose for local development
5. Upload existing skills and client templates to S3

## Prerequisites

- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- Docker Desktop installed
- pnpm installed (`npm install -g pnpm`)

## Documents

| Document | Purpose |
|----------|---------|
| [monorepo-setup.md](./monorepo-setup.md) | Turborepo and pnpm workspace configuration |
| [database-schema.md](./database-schema.md) | Full Drizzle ORM schema definitions |
| [s3-structure.md](./s3-structure.md) | S3 bucket organization and upload scripts |
| [docker-compose.md](./docker-compose.md) | Local development environment setup |

## Implementation Order

```
1. Docker Compose Setup
   └─ Start PostgreSQL and MinIO containers

2. Monorepo Configuration
   └─ Configure packages and dependencies

3. Database Schema
   └─ Define and migrate schema

4. S3 Setup
   └─ Create buckets and upload initial data
```

## Verification Checklist

- [ ] `docker compose up` starts all services
- [ ] PostgreSQL accessible at `localhost:5432`
- [ ] MinIO console accessible at `localhost:9001`
- [ ] `pnpm install` succeeds in monorepo root
- [ ] `pnpm db:migrate` creates all tables
- [ ] Skills uploaded to S3 (37 skills)
- [ ] Client template uploaded to S3

## Dependencies

This phase has no dependencies. All subsequent phases depend on this one.

## Estimated Effort

| Task | Complexity |
|------|------------|
| Docker Compose | Low |
| Monorepo config | Low |
| Database schema | Medium |
| S3 setup + upload | Medium |

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - System overview
- [reference/skill-catalog.md](../reference/skill-catalog.md) - All 37 skills
- [reference/client-structure.md](../reference/client-structure.md) - Client template
