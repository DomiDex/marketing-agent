import { index, integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { runs } from './runs';
export const outputs = pgTable('outputs', {
    id: uuid('id').primaryKey().defaultRandom(),
    runId: uuid('run_id')
        .references(() => runs.id)
        .notNull(),
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
}));
//# sourceMappingURL=outputs.js.map