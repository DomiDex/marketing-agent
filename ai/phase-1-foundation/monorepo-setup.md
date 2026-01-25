# Monorepo Setup

Configuration for Turborepo and pnpm workspace.

## Current Structure

The monorepo already exists at `marketing-agent-api/` with this structure:

```
marketing-agent-api/
├── apps/                    # Applications
├── packages/                # Shared packages
│   ├── agent-executor/      # Claude Agent SDK wrapper
│   ├── db/                  # Database (Drizzle)
│   ├── inngest-functions/   # Background jobs
│   ├── shared/              # Types and validators
│   ├── skill-detector/      # Skill detection
│   └── storage/             # S3 operations
├── biome.json               # Linting config
├── package.json             # Root package.json
├── pnpm-workspace.yaml      # Workspace config
├── tsconfig.json            # TypeScript config
└── turbo.json               # Turborepo config
```

## pnpm Workspace Configuration

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## Turborepo Configuration

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.ts", "test/**/*.ts"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "db:generate": {
      "cache": false
    },
    "db:migrate": {
      "cache": false
    },
    "db:push": {
      "cache": false
    }
  }
}
```

## Root package.json

```json
{
  "name": "marketing-agent-api",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint",
    "format": "biome format --write .",
    "check": "biome check .",
    "db:generate": "turbo db:generate",
    "db:migrate": "turbo db:migrate",
    "db:push": "turbo db:push"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "turbo": "^2.3.3",
    "typescript": "^5.7.2"
  },
  "packageManager": "pnpm@9.15.0",
  "engines": {
    "node": ">=20"
  }
}
```

## Package Configurations

### packages/shared/package.json

Already configured with Zod for validation:

```json
{
  "name": "@marketing-agent/shared",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./types": {
      "import": "./dist/types/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./validators": {
      "import": "./dist/validators/index.js",
      "types": "./dist/validators/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "biome check src/",
    "test": "vitest run"
  },
  "dependencies": {
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/bun": "^1.1.14",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

### packages/db/package.json

```json
{
  "name": "@marketing-agent/db",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./schema": {
      "import": "./dist/schema/index.js",
      "types": "./dist/schema/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "biome check src/",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "drizzle-orm": "^0.38.3",
    "postgres": "^3.4.5"
  },
  "devDependencies": {
    "@types/bun": "^1.1.14",
    "drizzle-kit": "^0.30.1",
    "typescript": "^5.7.2"
  }
}
```

### packages/storage/package.json

```json
{
  "name": "@marketing-agent/storage",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "biome check src/",
    "test": "vitest run"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.712.0",
    "@aws-sdk/s3-request-presigner": "^3.712.0"
  },
  "devDependencies": {
    "@types/bun": "^1.1.14",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

### packages/skill-detector/package.json

```json
{
  "name": "@marketing-agent/skill-detector",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "biome check src/",
    "test": "vitest run"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.35.0",
    "@marketing-agent/shared": "workspace:*"
  },
  "devDependencies": {
    "@types/bun": "^1.1.14",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

### packages/agent-executor/package.json

```json
{
  "name": "@marketing-agent/agent-executor",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "biome check src/",
    "test": "vitest run"
  },
  "dependencies": {
    "@anthropic-ai/claude-agent-sdk": "^0.1.0",
    "@marketing-agent/shared": "workspace:*",
    "@marketing-agent/storage": "workspace:*"
  },
  "devDependencies": {
    "@types/bun": "^1.1.14",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

### packages/inngest-functions/package.json

```json
{
  "name": "@marketing-agent/inngest-functions",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "biome check src/",
    "test": "vitest run"
  },
  "dependencies": {
    "inngest": "^3.28.0",
    "@marketing-agent/shared": "workspace:*",
    "@marketing-agent/db": "workspace:*",
    "@marketing-agent/storage": "workspace:*",
    "@marketing-agent/agent-executor": "workspace:*"
  },
  "devDependencies": {
    "@types/bun": "^1.1.14",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

## Apps Configuration

### apps/api/package.json

```json
{
  "name": "@marketing-agent/api",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target bun",
    "start": "bun dist/index.js",
    "lint": "biome check src/",
    "test": "vitest run"
  },
  "dependencies": {
    "hono": "^4.6.14",
    "@hono/zod-validator": "^0.4.2",
    "inngest": "^3.28.0",
    "@marketing-agent/shared": "workspace:*",
    "@marketing-agent/db": "workspace:*",
    "@marketing-agent/storage": "workspace:*",
    "@marketing-agent/skill-detector": "workspace:*",
    "@marketing-agent/inngest-functions": "workspace:*"
  },
  "devDependencies": {
    "@types/bun": "^1.1.14",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

### apps/telegram-bot/package.json

```json
{
  "name": "@marketing-agent/telegram-bot",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target bun",
    "start": "bun dist/index.js",
    "lint": "biome check src/",
    "test": "vitest run"
  },
  "dependencies": {
    "grammy": "^1.31.0",
    "@marketing-agent/shared": "workspace:*"
  },
  "devDependencies": {
    "@types/bun": "^1.1.14",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

## TypeScript Configuration

### tsconfig.json (root)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "types": ["bun-types"]
  }
}
```

### Package tsconfig.json (example for packages/shared)

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Biome Configuration

### biome.json

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": true,
    "ignore": ["node_modules", "dist", ".turbo"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  }
}
```

## Installation Steps

```bash
# Navigate to monorepo root
cd marketing-agent-api

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Verify installation
pnpm lint
```

## Package Dependency Graph

```
                    ┌─────────────────┐
                    │     shared      │
                    │  (types, zod)   │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌───────────────┐ ┌───────────┐ ┌─────────────────┐
    │ skill-detector│ │    db     │ │     storage     │
    └───────┬───────┘ └─────┬─────┘ └────────┬────────┘
            │               │                │
            │               │      ┌─────────┴─────────┐
            │               │      │                   │
            │               │      ▼                   │
            │               │ ┌───────────────┐        │
            │               │ │ agent-executor│        │
            │               │ └───────┬───────┘        │
            │               │         │                │
            │               ▼         ▼                ▼
            │         ┌─────────────────────────────────────┐
            │         │         inngest-functions           │
            │         └──────────────────┬──────────────────┘
            │                            │
            ▼                            ▼
    ┌─────────────────────────────────────────────────────────┐
    │                          api                             │
    └─────────────────────────────────────────────────────────┘
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm build` | Build all packages |
| `pnpm dev` | Start all apps in dev mode |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format all files |
| `pnpm test` | Run all tests |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema changes (dev only) |
