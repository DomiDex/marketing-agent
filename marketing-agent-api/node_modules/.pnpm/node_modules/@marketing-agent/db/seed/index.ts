#!/usr/bin/env bun
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { skills } from '../src/schema'
import { skillsData } from './skills-data'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required')
}

const client = postgres(connectionString)
const db = drizzle(client)

async function seed() {
  console.log('Seeding skills...')

  let inserted = 0
  let updated = 0

  for (const skill of skillsData) {
    const result = await db
      .insert(skills)
      .values(skill)
      .onConflictDoUpdate({
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

    if (result.count === 0) {
      updated++
    } else {
      inserted++
    }
  }

  console.log(`Seeding complete! Inserted: ${inserted}, Updated: ${updated}`)
  console.log(`Total skills: ${skillsData.length}`)

  await client.end()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
