import { index, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { outputs } from './outputs'

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

export const feedback = pgTable(
  'feedback',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    outputId: uuid('output_id')
      .references(() => outputs.id)
      .notNull(),

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
  },
  (table) => ({
    outputIdIdx: index('feedback_output_id_idx').on(table.outputId),
    overallScoreIdx: index('feedback_overall_score_idx').on(table.overallScore),
    createdAtIdx: index('feedback_created_at_idx').on(table.createdAt),
  }),
)

// Types
export type Feedback = typeof feedback.$inferSelect
export type NewFeedback = typeof feedback.$inferInsert
