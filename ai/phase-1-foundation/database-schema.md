# Database Schema

Full PostgreSQL schema using Drizzle ORM.

## Overview

The database stores metadata about skills, clients, users, runs, outputs, and feedback. File content is stored in S3; the database references S3 keys.

## Schema Diagram

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE SCHEMA                                    │
└────────────────────────────────────────────────────────────────────────────────┘

users ─────────────────┬─────────────────────── clients
  │                    │                           │
  │ 1:N                │                           │
  ▼                    │                           │
user_channels          │                           │
                       │                           │
                       │ N:1                  N:1  │
                       │                           │
skills ────────────────┼───────────────────────────┤
  │                    │                           │
  │ N:1                │                           │
  ▼                    ▼                           │
runs ◄─────────────────────────────────────────────┘
  │
  │ 1:N
  ▼
outputs
  │
  │ 1:1
  ▼
feedback
```

## Drizzle Schema

### packages/db/src/schema/index.ts

```typescript
export * from './users'
export * from './clients'
export * from './skills'
export * from './runs'
export * from './outputs'
export * from './feedback'
```

### packages/db/src/schema/users.ts

```typescript
import { pgTable, uuid, varchar, timestamp, index } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique(),
  apiKey: varchar('api_key', { length: 64 }).unique().notNull(),
  apiKeyHash: varchar('api_key_hash', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  apiKeyIdx: index('users_api_key_idx').on(table.apiKey),
}))

export const userChannels = pgTable('user_channels', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  channel: varchar('channel', { length: 50 }).notNull(), // 'telegram', 'slack', 'web'
  channelUserId: varchar('channel_user_id', { length: 255 }).notNull(),
  channelUsername: varchar('channel_username', { length: 255 }),
  linkedAt: timestamp('linked_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_channels_user_id_idx').on(table.userId),
  channelLookupIdx: index('user_channels_lookup_idx').on(table.channel, table.channelUserId),
}))

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UserChannel = typeof userChannels.$inferSelect
export type NewUserChannel = typeof userChannels.$inferInsert
```

### packages/db/src/schema/clients.ts

```typescript
import { pgTable, uuid, varchar, timestamp, text, index } from 'drizzle-orm/pg-core'
import { users } from './users'

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  description: text('description'),
  s3Prefix: varchar('s3_prefix', { length: 500 }).notNull(), // 'clients/yaz-automate/'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('clients_user_id_idx').on(table.userId),
  slugIdx: index('clients_slug_idx').on(table.slug),
}))

// Types
export type Client = typeof clients.$inferSelect
export type NewClient = typeof clients.$inferInsert
```

### packages/db/src/schema/skills.ts

```typescript
import { pgTable, uuid, varchar, text, boolean, jsonb, timestamp, index } from 'drizzle-orm/pg-core'

export const skillTypeEnum = ['simple', 'with_rules', 'complex'] as const
export type SkillType = typeof skillTypeEnum[number]

export const skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).unique().notNull(),
  description: text('description').notNull(),
  type: varchar('type', { length: 20 }).notNull().$type<SkillType>(), // 'simple', 'with_rules', 'complex'
  s3Key: varchar('s3_key', { length: 500 }).notNull(), // 'skills/copywriting/'
  hasRules: boolean('has_rules').default(false).notNull(),
  hasSubdirectories: boolean('has_subdirectories').default(false).notNull(),
  triggerKeywords: jsonb('trigger_keywords').$type<string[]>().notNull(),
  relatedSkills: jsonb('related_skills').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  nameIdx: index('skills_name_idx').on(table.name),
  typeIdx: index('skills_type_idx').on(table.type),
}))

// Types
export type Skill = typeof skills.$inferSelect
export type NewSkill = typeof skills.$inferInsert
```

### packages/db/src/schema/runs.ts

```typescript
import { pgTable, uuid, varchar, text, integer, timestamp, index } from 'drizzle-orm/pg-core'
import { users } from './users'
import { clients } from './clients'
import { skills } from './skills'

export const runStatusEnum = ['queued', 'running', 'completed', 'failed', 'cancelled'] as const
export type RunStatus = typeof runStatusEnum[number]

export const runs = pgTable('runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  skillId: uuid('skill_id').references(() => skills.id).notNull(),
  clientId: uuid('client_id').references(() => clients.id),
  status: varchar('status', { length: 20 }).notNull().$type<RunStatus>().default('queued'),
  userMessage: text('user_message').notNull(),
  inngestEventId: varchar('inngest_event_id', { length: 100 }),
  tokensInput: integer('tokens_input'),
  tokensOutput: integer('tokens_output'),
  errorMessage: text('error_message'),
  metadata: text('metadata'), // JSON string for additional context
  queuedAt: timestamp('queued_at').defaultNow().notNull(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
}, (table) => ({
  userIdIdx: index('runs_user_id_idx').on(table.userId),
  skillIdIdx: index('runs_skill_id_idx').on(table.skillId),
  clientIdIdx: index('runs_client_id_idx').on(table.clientId),
  statusIdx: index('runs_status_idx').on(table.status),
  queuedAtIdx: index('runs_queued_at_idx').on(table.queuedAt),
}))

// Types
export type Run = typeof runs.$inferSelect
export type NewRun = typeof runs.$inferInsert
```

### packages/db/src/schema/outputs.ts

```typescript
import { pgTable, uuid, varchar, text, integer, timestamp, index } from 'drizzle-orm/pg-core'
import { runs } from './runs'

export const outputs = pgTable('outputs', {
  id: uuid('id').primaryKey().defaultRandom(),
  runId: uuid('run_id').references(() => runs.id).notNull(),
  s3Key: varchar('s3_key', { length: 500 }).notNull(), // 'outputs/copywriting/client-type-date.md'
  format: varchar('format', { length: 20 }).notNull().default('markdown'), // 'markdown', 'json', 'html'
  title: varchar('title', { length: 255 }),
  preview: text('preview'), // First 500 chars for quick display
  sizeBytes: integer('size_bytes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  runIdIdx: index('outputs_run_id_idx').on(table.runId),
  s3KeyIdx: index('outputs_s3_key_idx').on(table.s3Key),
  createdAtIdx: index('outputs_created_at_idx').on(table.createdAt),
}))

// Types
export type Output = typeof outputs.$inferSelect
export type NewOutput = typeof outputs.$inferInsert
```

### packages/db/src/schema/feedback.ts

```typescript
import { pgTable, uuid, varchar, text, integer, jsonb, timestamp, index } from 'drizzle-orm/pg-core'
import { outputs } from './outputs'

export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  outputId: uuid('output_id').references(() => outputs.id).notNull(),

  // Scores (1-5 scale, aligned with .claude/feedback/_template.md)
  accuracyScore: integer('accuracy_score'), // Did it understand the request?
  qualityScore: integer('quality_score'), // Is the output well-crafted?
  usefulnessScore: integer('usefulness_score'), // Is it ready to use?
  ruleComplianceScore: integer('rule_compliance_score'), // Did it follow skill rules?
  overallScore: integer('overall_score').notNull(),

  // Qualitative feedback
  whatWorkedWell: text('what_worked_well'),
  issues: jsonb('issues').$type<FeedbackIssue[]>().default([]),
  suggestedRuleChanges: jsonb('suggested_rule_changes').$type<RuleChange[]>().default([]),

  // Metadata
  source: varchar('source', { length: 50 }).notNull(), // 'telegram', 'web', 'api'
  reviewerName: varchar('reviewer_name', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  outputIdIdx: index('feedback_output_id_idx').on(table.outputId),
  overallScoreIdx: index('feedback_overall_score_idx').on(table.overallScore),
  createdAtIdx: index('feedback_created_at_idx').on(table.createdAt),
}))

// Issue structure (aligned with template)
export interface FeedbackIssue {
  description: string
  severity: 'high' | 'medium' | 'low'
  suggestedFix?: string
}

// Rule change suggestion structure
export interface RuleChange {
  file: string // '.claude/skills/{skill}/RULES.md'
  currentRule?: string
  suggestedChange: string
  rationale: string
}

// Types
export type Feedback = typeof feedback.$inferSelect
export type NewFeedback = typeof feedback.$inferInsert
```

## Database Client

### packages/db/src/index.ts

```typescript
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required')
}

// For query purposes
const queryClient = postgres(connectionString)
export const db = drizzle(queryClient, { schema })

// For migrations
const migrationClient = postgres(connectionString, { max: 1 })
export const migrationDb = drizzle(migrationClient, { schema })

// Re-export schema and types
export * from './schema'
```

## Drizzle Kit Configuration

### packages/db/drizzle.config.ts

```typescript
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
```

## Migrations

### Initial Migration

After defining the schema, generate and run migrations:

```bash
# Generate migration files
pnpm db:generate

# Run migrations
pnpm db:migrate

# Or push directly in development
pnpm db:push
```

### Migration File Structure

```
packages/db/
└── drizzle/
    ├── 0000_init.sql
    ├── 0001_add_indexes.sql
    └── meta/
        └── _journal.json
```

## Seed Data

### packages/db/src/seed.ts

```typescript
import { db, skills, type NewSkill } from './index'

const skillsData: NewSkill[] = [
  {
    name: 'copywriting',
    description: 'Write marketing copy for pages - homepage, landing pages, pricing, features, about',
    type: 'with_rules',
    s3Key: 'skills/copywriting/',
    hasRules: true,
    hasSubdirectories: false,
    triggerKeywords: [
      'write copy', 'rewrite', 'marketing copy', 'headline', 'CTA',
      'homepage copy', 'landing page copy', 'pricing page', 'feature page'
    ],
    relatedSkills: ['copy-editing', 'page-cro', 'email-sequence', 'popup-cro', 'ab-test-setup'],
  },
  {
    name: 'email-sequence',
    description: 'Create email sequences - welcome, nurture, onboarding, re-engagement campaigns',
    type: 'with_rules',
    s3Key: 'skills/email-sequence/',
    hasRules: true,
    hasSubdirectories: false,
    triggerKeywords: [
      'email sequence', 'drip campaign', 'nurture sequence', 'onboarding emails',
      'welcome sequence', 're-engagement emails', 'email automation', 'lifecycle emails'
    ],
    relatedSkills: ['copywriting', 'onboarding-cro'],
  },
  // ... 35 more skills
]

async function seed() {
  console.log('Seeding skills...')

  for (const skill of skillsData) {
    await db.insert(skills).values(skill).onConflictDoUpdate({
      target: skills.name,
      set: {
        description: skill.description,
        type: skill.type,
        s3Key: skill.s3Key,
        hasRules: skill.hasRules,
        hasSubdirectories: skill.hasSubdirectories,
        triggerKeywords: skill.triggerKeywords,
        relatedSkills: skill.relatedSkills,
        updatedAt: new Date(),
      },
    })
  }

  console.log('Seeding complete!')
}

seed()
```

## Query Examples

### Find skill by name

```typescript
import { db, skills, eq } from '@marketing-agent/db'

const skill = await db.query.skills.findFirst({
  where: eq(skills.name, 'copywriting'),
})
```

### Get user's recent runs

```typescript
import { db, runs, outputs, eq, desc } from '@marketing-agent/db'

const recentRuns = await db.query.runs.findMany({
  where: eq(runs.userId, userId),
  with: {
    outputs: true,
  },
  orderBy: desc(runs.queuedAt),
  limit: 10,
})
```

### Get feedback for a skill

```typescript
import { db, feedback, outputs, runs, skills, eq, and, gte, avg } from '@marketing-agent/db'

const skillFeedback = await db
  .select({
    avgOverall: avg(feedback.overallScore),
    avgAccuracy: avg(feedback.accuracyScore),
    avgQuality: avg(feedback.qualityScore),
    avgUsefulness: avg(feedback.usefulnessScore),
  })
  .from(feedback)
  .innerJoin(outputs, eq(outputs.id, feedback.outputId))
  .innerJoin(runs, eq(runs.id, outputs.runId))
  .innerJoin(skills, eq(skills.id, runs.skillId))
  .where(
    and(
      eq(skills.name, 'copywriting'),
      gte(feedback.createdAt, thirtyDaysAgo)
    )
  )
```

## Indexes Summary

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| users | users_email_idx | email | Fast email lookup |
| users | users_api_key_idx | api_key | API key validation |
| user_channels | user_channels_lookup_idx | channel, channel_user_id | Telegram user lookup |
| clients | clients_slug_idx | slug | Client lookup by slug |
| skills | skills_name_idx | name | Skill lookup by name |
| runs | runs_status_idx | status | Filter by status |
| runs | runs_queued_at_idx | queued_at | Recent runs query |
| outputs | outputs_s3_key_idx | s3_key | S3 key lookup |
| feedback | feedback_overall_score_idx | overall_score | Score filtering |
