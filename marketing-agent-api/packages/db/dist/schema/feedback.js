import { index, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { outputs } from './outputs';
export const feedback = pgTable('feedback', {
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
    issues: jsonb('issues').$type().default([]),
    suggestedRuleChanges: jsonb('suggested_rule_changes').$type().default([]),
    // Metadata
    source: varchar('source', { length: 50 }).notNull(), // 'telegram', 'web', 'api'
    reviewerName: varchar('reviewer_name', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
    outputIdIdx: index('feedback_output_id_idx').on(table.outputId),
    overallScoreIdx: index('feedback_overall_score_idx').on(table.overallScore),
    createdAtIdx: index('feedback_created_at_idx').on(table.createdAt),
}));
//# sourceMappingURL=feedback.js.map