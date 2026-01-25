import { index, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

export const clients = pgTable(
  'clients',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 100 }).notNull(),
    description: text('description'),
    s3Prefix: varchar('s3_prefix', { length: 500 }).notNull(), // 'clients/yaz-automate/'
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('clients_user_id_idx').on(table.userId),
    slugIdx: index('clients_slug_idx').on(table.slug),
  }),
)

// Types
export type Client = typeof clients.$inferSelect
export type NewClient = typeof clients.$inferInsert
