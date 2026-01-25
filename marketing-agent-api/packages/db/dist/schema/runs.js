import { index, integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { clients } from './clients';
import { skills } from './skills';
import { users } from './users';
export const runStatusEnum = ['queued', 'running', 'completed', 'failed', 'cancelled'];
export const runs = pgTable('runs', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .references(() => users.id)
        .notNull(),
    skillId: uuid('skill_id')
        .references(() => skills.id)
        .notNull(),
    clientId: uuid('client_id').references(() => clients.id),
    status: varchar('status', { length: 20 }).notNull().$type().default('queued'),
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
}));
//# sourceMappingURL=runs.js.map