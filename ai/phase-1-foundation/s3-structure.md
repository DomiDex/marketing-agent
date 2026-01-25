# S3 Structure

S3 bucket organization and file upload procedures.

## Bucket Overview

A single bucket stores all marketing agent files:

```
marketing-agent-bucket/
├── skills/                 # Skill definitions from .claude/skills/
├── clients/                # Client profiles from clients/
├── outputs/                # Generated content
├── feedback/               # Feedback files
└── workflows/              # Multi-skill workflow definitions
```

## Directory Structure

### skills/

Uploaded from `.claude/skills/`. Each skill has its own prefix.

```
skills/
├── copywriting/
│   ├── SKILL.md            # Main skill definition
│   └── RULES.md            # Additional rules (if exists)
├── email-sequence/
│   ├── SKILL.md
│   └── RULES.md
├── page-cro/
│   ├── SKILL.md
│   └── RULES.md
├── idea-to-spec/           # Complex skill with subdirectories
│   ├── SKILL.md
│   ├── document-templates/
│   │   ├── spec-template.md
│   │   ├── sop-template.md
│   │   └── prd-template.md
│   ├── expert-modes/
│   │   ├── consultant.md
│   │   └── analyst.md
│   └── research-prompts/
│       └── web-research.md
├── ab-test-setup/
│   └── SKILL.md
├── analytics-tracking/
│   └── SKILL.md
├── blog-strategy/
│   └── SKILL.md
├── case-study/
│   └── SKILL.md
├── competitor-alternatives/
│   └── SKILL.md
├── competitor-research/
│   └── SKILL.md
├── content-calendar/
│   └── SKILL.md
├── copy-editing/
│   └── SKILL.md
├── customer-research/
│   └── SKILL.md
├── form-cro/
│   └── SKILL.md
├── free-tool-strategy/
│   └── SKILL.md
├── launch-strategy/
│   └── SKILL.md
├── marketing-ideas/
│   └── SKILL.md
├── marketing-psychology/
│   └── SKILL.md
├── onboarding-cro/
│   └── SKILL.md
├── paid-ads/
│   └── SKILL.md
├── partnership-marketing/
│   └── SKILL.md
├── paywall-upgrade-cro/
│   └── SKILL.md
├── popup-cro/
│   └── SKILL.md
├── positioning/
│   └── SKILL.md
├── press-release/
│   └── SKILL.md
├── pricing-strategy/
│   └── SKILL.md
├── programmatic-seo/
│   └── SKILL.md
├── referral-program/
│   └── SKILL.md
├── retention-strategy/
│   └── SKILL.md
├── sales-enablement/
│   └── SKILL.md
├── schema-markup/
│   └── SKILL.md
├── seo-audit/
│   └── SKILL.md
├── signup-flow-cro/
│   └── SKILL.md
├── social-content/
│   └── SKILL.md
└── video-script/
    └── SKILL.md
```

### clients/

Uploaded from `clients/`. Each client has a full profile structure.

```
clients/
├── _template/               # Template for new clients
│   ├── README.md
│   ├── profile.md
│   ├── brand/
│   │   ├── voice.md
│   │   ├── messaging.md
│   │   └── assets.md
│   ├── audience/
│   │   ├── primary-icp.md
│   │   ├── secondary-icp.md
│   │   ├── anti-personas.md
│   │   └── customer-journey.md
│   ├── product/
│   │   ├── overview.md
│   │   ├── pricing.md
│   │   ├── differentiators.md
│   │   └── objections.md
│   ├── market/
│   │   ├── competitors.md
│   │   ├── industry.md
│   │   └── proof.md
│   ├── operations/
│   │   ├── contacts.md
│   │   ├── process.md
│   │   └── tools.md
│   ├── projects/
│   │   ├── active.md
│   │   └── history.md
│   └── research/
│       └── notes.md
└── yaz-automate/            # Example client
    └── [same structure as _template]
```

### outputs/

Generated content, organized by skill and named with client-type-date pattern.

```
outputs/
├── copywriting/
│   ├── yaz-automate-homepage-2026-01-23.md
│   ├── yaz-automate-pricing-2026-01-24.md
│   └── acme-corp-feature-page-2026-01-25.md
├── email-sequence/
│   └── yaz-automate-onboarding-2026-01-25.md
├── page-cro/
│   └── yaz-automate-homepage-audit-2026-01-23.md
└── [skill-name]/
    └── [client]-[type]-[date].md
```

### feedback/

Feedback files aligned with `.claude/feedback/` structure.

```
feedback/
├── copywriting/
│   └── 2026-01-23_homepage-copy.md
├── email-sequence/
│   └── 2026-01-25_onboarding-sequence.md
└── [skill-name]/
    └── [date]_[descriptor].md
```

### workflows/

Multi-skill workflow definitions from `workflows/`.

```
workflows/
├── email-campaign.md
├── landing-page-launch.md
└── skill-improvement.md
```

## Storage Client Implementation

### packages/storage/src/client.ts

```typescript
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT, // MinIO endpoint for local dev
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true, // Required for MinIO
})

const BUCKET = process.env.S3_BUCKET || 'marketing-agent'

export { s3Client, BUCKET }
```

### packages/storage/src/skills.ts

```typescript
import { s3Client, BUCKET } from './client'
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from '@aws-sdk/client-s3'

export interface SkillContent {
  skillMd: string
  rulesMd?: string
  subdirectories?: Record<string, Record<string, string>>
}

/**
 * Get skill content from S3
 */
export async function getSkillContent(skillName: string): Promise<SkillContent> {
  const prefix = `skills/${skillName}/`

  // Get SKILL.md
  const skillMdResponse = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: `${prefix}SKILL.md`,
    })
  )
  const skillMd = await skillMdResponse.Body!.transformToString()

  // Try to get RULES.md
  let rulesMd: string | undefined
  try {
    const rulesMdResponse = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: `${prefix}RULES.md`,
      })
    )
    rulesMd = await rulesMdResponse.Body!.transformToString()
  } catch (e) {
    // RULES.md doesn't exist for this skill
  }

  // Check for subdirectories
  const listResponse = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: prefix,
      Delimiter: '/',
    })
  )

  const subdirectories: Record<string, Record<string, string>> = {}

  if (listResponse.CommonPrefixes) {
    for (const commonPrefix of listResponse.CommonPrefixes) {
      const subdirName = commonPrefix.Prefix!.replace(prefix, '').replace('/', '')
      if (subdirName && subdirName !== 'SKILL.md' && subdirName !== 'RULES.md') {
        // List files in subdirectory
        const subdirResponse = await s3Client.send(
          new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: commonPrefix.Prefix,
          })
        )

        subdirectories[subdirName] = {}

        if (subdirResponse.Contents) {
          for (const obj of subdirResponse.Contents) {
            const fileName = obj.Key!.split('/').pop()!
            const fileResponse = await s3Client.send(
              new GetObjectCommand({
                Bucket: BUCKET,
                Key: obj.Key,
              })
            )
            subdirectories[subdirName][fileName] = await fileResponse.Body!.transformToString()
          }
        }
      }
    }
  }

  return {
    skillMd,
    rulesMd,
    subdirectories: Object.keys(subdirectories).length > 0 ? subdirectories : undefined,
  }
}

/**
 * List all skills
 */
export async function listSkills(): Promise<string[]> {
  const response = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: 'skills/',
      Delimiter: '/',
    })
  )

  return (response.CommonPrefixes || [])
    .map(p => p.Prefix!.replace('skills/', '').replace('/', ''))
    .filter(Boolean)
}
```

### packages/storage/src/clients.ts

```typescript
import { s3Client, BUCKET } from './client'
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

export interface ClientContext {
  profile: string
  brand: {
    voice?: string
    messaging?: string
    assets?: string
  }
  audience: {
    primaryIcp?: string
    secondaryIcp?: string
    antiPersonas?: string
    customerJourney?: string
  }
  product: {
    overview?: string
    pricing?: string
    differentiators?: string
    objections?: string
  }
  market: {
    competitors?: string
    industry?: string
    proof?: string
  }
}

/**
 * Get client context from S3
 */
export async function getClientContext(clientSlug: string): Promise<ClientContext> {
  const prefix = `clients/${clientSlug}/`

  // Helper to get file content
  async function getFile(key: string): Promise<string | undefined> {
    try {
      const response = await s3Client.send(
        new GetObjectCommand({ Bucket: BUCKET, Key: key })
      )
      return await response.Body!.transformToString()
    } catch {
      return undefined
    }
  }

  const [
    profile,
    voice,
    messaging,
    assets,
    primaryIcp,
    secondaryIcp,
    antiPersonas,
    customerJourney,
    overview,
    pricing,
    differentiators,
    objections,
    competitors,
    industry,
    proof,
  ] = await Promise.all([
    getFile(`${prefix}profile.md`),
    getFile(`${prefix}brand/voice.md`),
    getFile(`${prefix}brand/messaging.md`),
    getFile(`${prefix}brand/assets.md`),
    getFile(`${prefix}audience/primary-icp.md`),
    getFile(`${prefix}audience/secondary-icp.md`),
    getFile(`${prefix}audience/anti-personas.md`),
    getFile(`${prefix}audience/customer-journey.md`),
    getFile(`${prefix}product/overview.md`),
    getFile(`${prefix}product/pricing.md`),
    getFile(`${prefix}product/differentiators.md`),
    getFile(`${prefix}product/objections.md`),
    getFile(`${prefix}market/competitors.md`),
    getFile(`${prefix}market/industry.md`),
    getFile(`${prefix}market/proof.md`),
  ])

  if (!profile) {
    throw new Error(`Client not found: ${clientSlug}`)
  }

  return {
    profile,
    brand: { voice, messaging, assets },
    audience: { primaryIcp, secondaryIcp, antiPersonas, customerJourney },
    product: { overview, pricing, differentiators, objections },
    market: { competitors, industry, proof },
  }
}

/**
 * List all clients
 */
export async function listClients(): Promise<string[]> {
  const response = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: 'clients/',
      Delimiter: '/',
    })
  )

  return (response.CommonPrefixes || [])
    .map(p => p.Prefix!.replace('clients/', '').replace('/', ''))
    .filter(name => name && name !== '_template')
}
```

### packages/storage/src/outputs.ts

```typescript
import { s3Client, BUCKET } from './client'
import {
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export interface OutputFile {
  key: string
  content: string
  metadata: {
    skill: string
    client?: string
    type?: string
    date: string
  }
}

/**
 * Save output to S3
 */
export async function saveOutput(
  skillName: string,
  clientSlug: string | undefined,
  outputType: string,
  content: string
): Promise<string> {
  const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const parts = [clientSlug, outputType, date].filter(Boolean)
  const fileName = `${parts.join('-')}.md`
  const key = `outputs/${skillName}/${fileName}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: content,
      ContentType: 'text/markdown',
    })
  )

  return key
}

/**
 * Get output content
 */
export async function getOutput(s3Key: string): Promise<string> {
  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
    })
  )
  return await response.Body!.transformToString()
}

/**
 * Generate signed download URL
 */
export async function getDownloadUrl(s3Key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: s3Key,
  })
  return await getSignedUrl(s3Client, command, { expiresIn })
}

/**
 * List outputs for a skill
 */
export async function listOutputs(skillName: string, limit = 20): Promise<string[]> {
  const response = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: `outputs/${skillName}/`,
      MaxKeys: limit,
    })
  )

  return (response.Contents || [])
    .map(obj => obj.Key!)
    .filter(Boolean)
}
```

## Upload Scripts

### scripts/upload-skills.ts

```typescript
#!/usr/bin/env bun
import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import { s3Client, BUCKET } from '@marketing-agent/storage'
import { PutObjectCommand } from '@aws-sdk/client-s3'

const SKILLS_DIR = '../.claude/skills'

async function uploadDirectory(localPath: string, s3Prefix: string) {
  const entries = await readdir(localPath, { withFileTypes: true })

  for (const entry of entries) {
    const localFullPath = join(localPath, entry.name)
    const s3Key = `${s3Prefix}${entry.name}`

    if (entry.isDirectory()) {
      await uploadDirectory(localFullPath, `${s3Key}/`)
    } else if (entry.name.endsWith('.md')) {
      const content = await readFile(localFullPath, 'utf-8')
      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: s3Key,
          Body: content,
          ContentType: 'text/markdown',
        })
      )
      console.log(`Uploaded: ${s3Key}`)
    }
  }
}

async function main() {
  console.log('Uploading skills to S3...')

  const skills = await readdir(SKILLS_DIR)

  for (const skill of skills) {
    const skillPath = join(SKILLS_DIR, skill)
    const skillStat = await stat(skillPath)

    if (skillStat.isDirectory()) {
      await uploadDirectory(skillPath, `skills/${skill}/`)
    }
  }

  console.log('Done!')
}

main()
```

### scripts/upload-clients.ts

```typescript
#!/usr/bin/env bun
import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import { s3Client, BUCKET } from '@marketing-agent/storage'
import { PutObjectCommand } from '@aws-sdk/client-s3'

const CLIENTS_DIR = '../clients'

async function uploadDirectory(localPath: string, s3Prefix: string) {
  const entries = await readdir(localPath, { withFileTypes: true })

  for (const entry of entries) {
    const localFullPath = join(localPath, entry.name)
    const s3Key = `${s3Prefix}${entry.name}`

    if (entry.isDirectory()) {
      await uploadDirectory(localFullPath, `${s3Key}/`)
    } else if (entry.name.endsWith('.md')) {
      const content = await readFile(localFullPath, 'utf-8')
      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: s3Key,
          Body: content,
          ContentType: 'text/markdown',
        })
      )
      console.log(`Uploaded: ${s3Key}`)
    }
  }
}

async function main() {
  console.log('Uploading clients to S3...')

  const clients = await readdir(CLIENTS_DIR)

  for (const client of clients) {
    const clientPath = join(CLIENTS_DIR, client)
    const clientStat = await stat(clientPath)

    if (clientStat.isDirectory()) {
      await uploadDirectory(clientPath, `clients/${client}/`)
    }
  }

  console.log('Done!')
}

main()
```

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Skill files | `skills/{skill-name}/SKILL.md` | `skills/copywriting/SKILL.md` |
| Skill rules | `skills/{skill-name}/RULES.md` | `skills/copywriting/RULES.md` |
| Client profile | `clients/{client-slug}/profile.md` | `clients/yaz-automate/profile.md` |
| Client context | `clients/{client-slug}/{category}/{file}.md` | `clients/yaz-automate/brand/voice.md` |
| Outputs | `outputs/{skill}/{client}-{type}-{date}.md` | `outputs/copywriting/yaz-automate-homepage-2026-01-23.md` |
| Feedback | `feedback/{skill}/{date}_{descriptor}.md` | `feedback/copywriting/2026-01-23_homepage-copy.md` |

## Environment Variables

```bash
# S3 Configuration
S3_ENDPOINT=http://localhost:9000      # MinIO endpoint (local)
S3_REGION=us-east-1
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=marketing-agent
```
