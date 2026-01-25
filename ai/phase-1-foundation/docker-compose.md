# Docker Compose

Local development environment with PostgreSQL, MinIO, and Inngest.

## docker-compose.yml

Create this file in `marketing-agent-api/`:

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: marketing-agent-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: marketing_agent
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # MinIO (S3-compatible storage)
  minio:
    image: minio/minio:latest
    container_name: marketing-agent-minio
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"   # S3 API
      - "9001:9001"   # Web Console
    volumes:
      - minio_data:/data
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      interval: 5s
      timeout: 5s
      retries: 5

  # MinIO bucket initialization
  minio-init:
    image: minio/mc:latest
    container_name: marketing-agent-minio-init
    depends_on:
      minio:
        condition: service_healthy
    entrypoint: >
      /bin/sh -c "
      mc alias set myminio http://minio:9000 minioadmin minioadmin;
      mc mb myminio/marketing-agent --ignore-existing;
      mc anonymous set download myminio/marketing-agent/outputs;
      exit 0;
      "

  # Inngest Dev Server
  inngest:
    image: inngest/inngest:latest
    container_name: marketing-agent-inngest
    restart: unless-stopped
    ports:
      - "8288:8288"
    environment:
      INNGEST_DEV: 1
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:8288/health"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  minio_data:
```

## Services Overview

### PostgreSQL

| Setting | Value |
|---------|-------|
| Image | postgres:16-alpine |
| Port | 5432 |
| User | postgres |
| Password | postgres |
| Database | marketing_agent |

Connection string:
```
postgresql://postgres:postgres@localhost:5432/marketing_agent
```

### MinIO (S3)

| Setting | Value |
|---------|-------|
| Image | minio/minio:latest |
| S3 API Port | 9000 |
| Console Port | 9001 |
| Access Key | minioadmin |
| Secret Key | minioadmin |
| Bucket | marketing-agent |

S3 endpoint:
```
http://localhost:9000
```

Console URL:
```
http://localhost:9001
```

### Inngest

| Setting | Value |
|---------|-------|
| Image | inngest/inngest:latest |
| Port | 8288 |
| Mode | Development |

Dashboard URL:
```
http://localhost:8288
```

## Usage

### Start all services

```bash
cd marketing-agent-api
docker compose up -d
```

### View logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f postgres
docker compose logs -f 
docker compose logs -f inngest
```

### Stop all services

```bash
docker compose down
```

### Reset data

```bash
docker compose down -v  # Removes volumes
docker compose up -d
```

## Health Checks

### Verify PostgreSQL

```bash
docker compose exec postgres pg_isready -U postgres
```

Or with psql:
```bash
docker compose exec postgres psql -U postgres -d marketing_agent -c "SELECT 1"
```

### Verify MinIO

Open console: http://localhost:9001
- Username: minioadmin
- Password: minioadmin

Or with mc CLI:
```bash
docker compose exec minio mc ls local/marketing-agent
```

### Verify Inngest

Open dashboard: http://localhost:8288

## Environment File

Create `.env` in `marketing-agent-api/`:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marketing_agent

# S3 / MinIO
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=marketing-agent

# Inngest
INNGEST_DEV=1
INNGEST_EVENT_KEY=dev-key
INNGEST_SIGNING_KEY=dev-signing-key
INNGEST_BASE_URL=http://localhost:8288

# API
API_PORT=3000

# Anthropic
ANTHROPIC_API_KEY=your-api-key-here

# Telegram (optional for Phase 1)
TELEGRAM_BOT_TOKEN=
TELEGRAM_WEBHOOK_SECRET=
```

## Initial Setup Script

Create `scripts/setup-local.sh`:

```bash
#!/bin/bash
set -e

echo "Starting Docker services..."
docker compose up -d

echo "Waiting for services to be healthy..."
sleep 5

echo "Running database migrations..."
pnpm db:push

echo "Uploading skills to S3..."
bun scripts/upload-skills.ts

echo "Uploading client templates to S3..."
bun scripts/upload-clients.ts

echo "Seeding database..."
bun packages/db/src/seed.ts

echo ""
echo "Setup complete!"
echo ""
echo "Services:"
echo "  PostgreSQL: localhost:5432"
echo "  MinIO S3:   localhost:9000"
echo "  MinIO UI:   localhost:9001"
echo "  Inngest:    localhost:8288"
echo ""
echo "Run 'pnpm dev' to start the API"
```

Make executable:
```bash
chmod +x scripts/setup-local.sh
```

## Production Considerations

For production, replace:

| Local | Production |
|-------|------------|
| Local PostgreSQL | AWS RDS / Neon / Supabase |
| MinIO | AWS S3 / Cloudflare R2 |
| Inngest Dev | Inngest Cloud |

Update environment variables accordingly:

```bash
# Production Database
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# Production S3
S3_ENDPOINT=https://s3.amazonaws.com
S3_REGION=us-east-1
S3_ACCESS_KEY=AKIA...
S3_SECRET_KEY=...
S3_BUCKET=marketing-agent-production

# Production Inngest
INNGEST_EVENT_KEY=your-event-key
INNGEST_SIGNING_KEY=your-signing-key
```

## Troubleshooting

### Port conflicts

If ports are in use:
```bash
# Check what's using the port
lsof -i :5432
lsof -i :9000
lsof -i :8288

# Kill process or change ports in docker-compose.yml
```

### MinIO bucket not created

Manually create via console or mc:
```bash
docker compose exec minio mc alias set local http://localhost:9000 minioadmin minioadmin
docker compose exec minio mc mb local/marketing-agent
```

### PostgreSQL connection refused

Wait for healthcheck or check logs:
```bash
docker compose logs postgres
```

### Inngest not receiving events

1. Check the API is sending to correct endpoint
2. Verify INNGEST_BASE_URL is set
3. Check Inngest dashboard for errors
