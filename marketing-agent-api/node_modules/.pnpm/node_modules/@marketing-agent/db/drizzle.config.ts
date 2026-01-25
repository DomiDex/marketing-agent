import type { Config } from 'drizzle-kit'

import { resolve } from 'node:path'
// Load environment variables for drizzle-kit CLI
import { config } from 'dotenv'

config({ path: resolve(__dirname, '../../.env') })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

export default {
  schema: './src/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config
