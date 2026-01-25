import { index, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).unique(),
    apiKey: varchar('api_key', { length: 64 }).unique().notNull(),
    apiKeyHash: varchar('api_key_hash', { length: 128 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index('users_email_idx').on(table.email),
    apiKeyIdx: index('users_api_key_idx').on(table.apiKey),
  }),
)

export const userChannels = pgTable(
  'user_channels',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),
    channel: varchar('channel', { length: 50 }).notNull(), // 'telegram', 'slack', 'web'
    channelUserId: varchar('channel_user_id', { length: 255 }).notNull(),
    channelUsername: varchar('channel_username', { length: 255 }),
    linkedAt: timestamp('linked_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('user_channels_user_id_idx').on(table.userId),
    channelLookupIdx: index('user_channels_lookup_idx').on(table.channel, table.channelUserId),
  }),
)

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UserChannel = typeof userChannels.$inferSelect
export type NewUserChannel = typeof userChannels.$inferInsert
