# Feedback Schema

Feedback data structure aligned with existing `.claude/feedback/_template.md`.

## Template Alignment

The existing feedback template defines:

```markdown
| Dimension | Score | Notes |
|-----------|-------|-------|
| Accuracy | /5 | Did it understand the request correctly? |
| Quality | /5 | Is the output well-crafted? |
| Usefulness | /5 | Is it ready to use (or close)? |
| Rule Compliance | /5 | Did it follow skill and global rules? |
| **Overall** | /5 | |
```

## Database Schema

### packages/db/src/schema/feedback.ts

```typescript
import { pgTable, uuid, varchar, text, integer, jsonb, timestamp, index } from 'drizzle-orm/pg-core'
import { outputs } from './outputs'

// Issue structure from template
export interface FeedbackIssue {
  description: string
  severity: 'high' | 'medium' | 'low'
  suggestedFix?: string
}

// Rule change suggestion from template
export interface RuleChange {
  file: string           // e.g., '.claude/skills/copywriting/RULES.md'
  currentRule?: string
  suggestedChange: string
  rationale: string
}

export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  outputId: uuid('output_id').references(() => outputs.id).notNull(),

  // Scores (1-5 scale)
  accuracyScore: integer('accuracy_score'),       // Did it understand the request?
  qualityScore: integer('quality_score'),         // Is the output well-crafted?
  usefulnessScore: integer('usefulness_score'),   // Is it ready to use?
  ruleComplianceScore: integer('rule_compliance_score'), // Did it follow rules?
  overallScore: integer('overall_score').notNull(),

  // Qualitative feedback
  whatWorkedWell: text('what_worked_well'),
  issues: jsonb('issues').$type<FeedbackIssue[]>().default([]),
  suggestedRuleChanges: jsonb('suggested_rule_changes').$type<RuleChange[]>().default([]),

  // Prompt/input issues (from template checkboxes)
  promptIssues: jsonb('prompt_issues').$type<{
    askedGoodQuestions: boolean
    madeReasonableAssumptions: boolean
    understoodContext: boolean
    notes?: string
  }>(),

  // Action items
  actionItems: jsonb('action_items').$type<string[]>().default([]),
  additionalContext: text('additional_context'),

  // Metadata
  source: varchar('source', { length: 50 }).notNull(), // 'telegram', 'web', 'api', 'manual'
  reviewerName: varchar('reviewer_name', { length: 100 }),
  clientName: varchar('client_name', { length: 100 }),

  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  outputIdIdx: index('feedback_output_id_idx').on(table.outputId),
  overallScoreIdx: index('feedback_overall_score_idx').on(table.overallScore),
  createdAtIdx: index('feedback_created_at_idx').on(table.createdAt),
  sourceIdx: index('feedback_source_idx').on(table.source),
}))

export type Feedback = typeof feedback.$inferSelect
export type NewFeedback = typeof feedback.$inferInsert
```

## Zod Validation

### packages/shared/src/validators/feedback.ts

```typescript
import { z } from 'zod'

// Score validation (1-5)
const scoreSchema = z.number().int().min(1).max(5)

// Issue schema
const issueSchema = z.object({
  description: z.string().min(1).max(1000),
  severity: z.enum(['high', 'medium', 'low']),
  suggestedFix: z.string().max(1000).optional(),
})

// Rule change schema
const ruleChangeSchema = z.object({
  file: z.string().min(1).max(500),
  currentRule: z.string().max(1000).optional(),
  suggestedChange: z.string().min(1).max(2000),
  rationale: z.string().min(1).max(1000),
})

// Prompt issues schema
const promptIssuesSchema = z.object({
  askedGoodQuestions: z.boolean(),
  madeReasonableAssumptions: z.boolean(),
  understoodContext: z.boolean(),
  notes: z.string().max(500).optional(),
})

// Full feedback submission
export const createFeedbackSchema = z.object({
  outputId: z.string().uuid(),

  // Scores (overall required, others optional)
  overallScore: scoreSchema,
  accuracyScore: scoreSchema.optional(),
  qualityScore: scoreSchema.optional(),
  usefulnessScore: scoreSchema.optional(),
  ruleComplianceScore: scoreSchema.optional(),

  // Qualitative
  whatWorkedWell: z.string().max(5000).optional(),
  issues: z.array(issueSchema).max(20).default([]),
  suggestedRuleChanges: z.array(ruleChangeSchema).max(10).default([]),

  // Prompt issues
  promptIssues: promptIssuesSchema.optional(),

  // Action items
  actionItems: z.array(z.string().max(500)).max(20).default([]),
  additionalContext: z.string().max(5000).optional(),

  // Metadata
  source: z.enum(['telegram', 'web', 'api', 'manual']).default('api'),
  reviewerName: z.string().max(100).optional(),
  clientName: z.string().max(100).optional(),
})

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>

// Quick feedback (from Telegram buttons)
export const quickFeedbackSchema = z.object({
  outputId: z.string().uuid(),
  overallScore: scoreSchema,
  source: z.enum(['telegram', 'web']).default('telegram'),
})

export type QuickFeedbackInput = z.infer<typeof quickFeedbackSchema>
```

## API Endpoints

### POST /feedback

Create feedback entry.

```typescript
// apps/api/src/routes/feedback.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createFeedbackSchema } from '@marketing-agent/shared/validators'
import { db, feedback, outputs, eq } from '@marketing-agent/db'

const app = new Hono()

app.post('/', zValidator('json', createFeedbackSchema), async (c) => {
  const data = c.req.valid('json')

  // Verify output exists
  const output = await db.query.outputs.findFirst({
    where: eq(outputs.id, data.outputId),
  })

  if (!output) {
    return c.json({
      success: false,
      error: { code: 'OUTPUT_NOT_FOUND', message: 'Output not found' },
    }, 404)
  }

  // Create feedback
  const [entry] = await db.insert(feedback).values(data).returning()

  return c.json({
    success: true,
    data: {
      id: entry.id,
      outputId: entry.outputId,
      overallScore: entry.overallScore,
      createdAt: entry.createdAt,
    },
  }, 201)
})

export default app
```

### GET /feedback

List feedback with filters.

```typescript
app.get('/', async (c) => {
  const { skillName, minScore, maxScore, limit = 20, offset = 0 } = c.req.query()

  // Build query with filters
  let query = db
    .select()
    .from(feedback)
    .innerJoin(outputs, eq(outputs.id, feedback.outputId))
    .innerJoin(runs, eq(runs.id, outputs.runId))
    .innerJoin(skills, eq(skills.id, runs.skillId))

  if (skillName) {
    query = query.where(eq(skills.name, skillName))
  }

  if (minScore) {
    query = query.where(gte(feedback.overallScore, parseInt(minScore)))
  }

  if (maxScore) {
    query = query.where(lte(feedback.overallScore, parseInt(maxScore)))
  }

  const entries = await query
    .limit(parseInt(limit))
    .offset(parseInt(offset))
    .orderBy(desc(feedback.createdAt))

  return c.json({
    success: true,
    data: {
      feedback: entries,
      total: entries.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
    },
  })
})
```

## S3 File Format

For manual feedback stored as files (aligned with template):

### Filename Pattern

```
feedback/{skill}/{date}_{descriptor}.md

Examples:
- feedback/copywriting/2026-01-23_homepage-copy.md
- feedback/email-sequence/2026-01-25_onboarding-sequence.md
```

### File Content

```markdown
# Feedback: Copywriting Output

**Date:** 2026-01-23
**Skill:** copywriting
**Output file:** output/copywriting/yaz-automate-homepage-2026-01-23.md
**Client:** yaz-automate
**Reviewer:** Marketing Team

---

## Rating (1-5)

| Dimension | Score | Notes |
|-----------|-------|-------|
| Accuracy | 5/5 | Understood the request perfectly |
| Quality | 4/5 | Well-crafted, minor tone issues |
| Usefulness | 4/5 | Nearly ready to use |
| Rule Compliance | 5/5 | Followed all guidelines |
| **Overall** | 4/5 | |

---

## What Worked Well

- Clear structure with logical flow
- Strong CTAs throughout
- Good use of social proof section

---

## What Needs Improvement

| Issue | Severity | Suggested Fix |
|-------|----------|---------------|
| Tone slightly too formal | Medium | Use more conversational language |
| Missing pricing teaser | Low | Add pricing preview section |

---

## Suggested Rule Changes

| File | Current Rule | Suggested Change | Rationale |
|------|--------------|------------------|-----------|
| `.claude/skills/copywriting/RULES.md` | None | Add rule about matching brand voice first | Prevents tone mismatches |

---

## Prompt/Input Issues

- [x] Skill asked good clarifying questions
- [x] Skill made reasonable assumptions
- [x] Skill understood the context

**Notes:** None

---

## Action Items

- [ ] Review tone guidelines for this client
- [ ] Add voice example to client profile

---

## Additional Context

Client feedback was positive overall. They plan to A/B test the headline variations.
```

## Upload to S3

When manual feedback is submitted, also save to S3:

```typescript
import { saveOutput } from '@marketing-agent/storage'

async function saveFeedbackToS3(
  skillName: string,
  feedbackData: CreateFeedbackInput,
  descriptor: string
) {
  const date = new Date().toISOString().split('T')[0]
  const content = formatFeedbackAsMarkdown(feedbackData)

  await saveOutput(
    `feedback/${skillName}`,
    undefined,
    `${date}_${descriptor}`,
    content
  )
}

function formatFeedbackAsMarkdown(data: CreateFeedbackInput): string {
  // Convert structured data to markdown format
  // matching the template
}
```
