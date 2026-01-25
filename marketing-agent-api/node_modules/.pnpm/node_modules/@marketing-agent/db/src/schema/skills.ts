import { boolean, index, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const skillTypeEnum = ['simple', 'with_rules', 'complex'] as const
export type SkillType = (typeof skillTypeEnum)[number]

export const skills = pgTable(
  'skills',
  {
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
  },
  (table) => ({
    nameIdx: index('skills_name_idx').on(table.name),
    typeIdx: index('skills_type_idx').on(table.type),
  }),
)

// Types
export type Skill = typeof skills.$inferSelect
export type NewSkill = typeof skills.$inferInsert
