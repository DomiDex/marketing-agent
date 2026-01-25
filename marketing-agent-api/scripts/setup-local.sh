#!/bin/bash
# Local development setup script
# Run from marketing-agent-api directory

set -e

echo "=== Marketing Agent API - Local Setup ==="
echo ""

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "Error: Run this script from the marketing-agent-api directory"
    exit 1
fi

# Load environment variables
if [ -f ".env" ]; then
    echo "Loading .env file..."
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "Warning: .env file not found, using defaults"
    export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/marketing_agent"
    export S3_ENDPOINT="http://localhost:9000"
    export S3_ACCESS_KEY="minioadmin"
    export S3_SECRET_KEY="minioadmin"
    export S3_BUCKET="marketing-agent"
fi

echo ""
echo "Step 1: Starting Docker services..."
docker compose up -d

echo ""
echo "Step 2: Waiting for services to be healthy..."
sleep 5

# Wait for PostgreSQL
echo "  Waiting for PostgreSQL..."
until docker compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; do
    sleep 1
done
echo "  PostgreSQL is ready!"

# Wait for MinIO
echo "  Waiting for MinIO..."
until curl -s http://localhost:9000/minio/health/live > /dev/null 2>&1; do
    sleep 1
done
echo "  MinIO is ready!"

echo ""
echo "Step 3: Installing dependencies..."
pnpm install

echo ""
echo "Step 4: Building packages..."
pnpm build

echo ""
echo "Step 5: Pushing database schema..."
pnpm db:push

echo ""
echo "Step 6: Uploading skills to S3..."
bun scripts/upload-skills.ts

echo ""
echo "Step 7: Uploading clients to S3..."
bun scripts/upload-clients.ts

echo ""
echo "Step 8: Seeding database..."
bun packages/db/seed/index.ts

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "Services running:"
echo "  - PostgreSQL: localhost:5432"
echo "  - MinIO: localhost:9000 (Console: localhost:9001)"
echo "  - Inngest: localhost:8288"
echo ""
echo "MinIO Console credentials:"
echo "  Username: minioadmin"
echo "  Password: minioadmin"
echo ""
echo "Next steps:"
echo "  1. pnpm dev          - Start development server"
echo "  2. pnpm db:studio    - Open Drizzle Studio"
