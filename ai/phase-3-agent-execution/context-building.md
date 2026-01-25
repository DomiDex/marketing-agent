# Context Building

How context is aggregated for skill execution.

## Overview

Context building combines skill instructions, client information, and user messages into a single prompt for Claude.

## Context Components

### 1. Skill Content

From S3 `skills/{skill-name}/`:

```
├── SKILL.md      # Main skill instructions (required)
├── RULES.md      # Additional rules (optional)
└── [subdirs]/    # Extra resources (optional)
```

### 2. Client Context

From S3 `clients/{client-slug}/`:

```
├── profile.md              # Core company info
├── brand/
│   ├── voice.md           # How they sound
│   └── messaging.md       # Positioning & value props
├── audience/
│   └── primary-icp.md     # Who they sell to
├── product/
│   └── overview.md        # What they sell
└── market/
    └── competitors.md     # Competitive landscape
```

### 3. User Message

The user's request with any extracted parameters.

## Context Builder Implementation

### packages/agent-executor/src/context.ts

```typescript
import type { SkillContent, ClientContext } from '@marketing-agent/storage'

export interface ContextInput {
  skillContent: SkillContent
  clientContext?: ClientContext
  userMessage: string
  options?: Record<string, unknown>
}

/**
 * Build a combined prompt from skill, client context, and user message
 */
export function buildContext(input: ContextInput): string {
  const { skillContent, clientContext, userMessage, options } = input

  const sections: string[] = []

  // Section 1: Skill Instructions
  sections.push(buildSkillSection(skillContent))

  // Section 2: Client Context (if provided)
  if (clientContext) {
    sections.push(buildClientSection(clientContext))
  }

  // Section 3: User Request
  sections.push(buildRequestSection(userMessage, options))

  return sections.join('\n\n---\n\n')
}

/**
 * Build the skill instructions section
 */
function buildSkillSection(skillContent: SkillContent): string {
  const parts: string[] = []

  // Main skill content (SKILL.md)
  parts.push(skillContent.skillMd)

  // Additional rules (RULES.md)
  if (skillContent.rulesMd) {
    parts.push('## Additional Rules\n\n' + skillContent.rulesMd)
  }

  // Subdirectory content (for complex skills like idea-to-spec)
  if (skillContent.subdirectories) {
    for (const [dirName, files] of Object.entries(skillContent.subdirectories)) {
      parts.push(`## ${formatDirName(dirName)}\n`)

      for (const [fileName, content] of Object.entries(files)) {
        parts.push(`### ${formatFileName(fileName)}\n\n${content}`)
      }
    }
  }

  return parts.join('\n\n')
}

/**
 * Build the client context section
 */
function buildClientSection(context: ClientContext): string {
  const parts: string[] = []

  parts.push('# Client Context')
  parts.push('')
  parts.push('Use this information to tailor your output to the client.')
  parts.push('')

  // Profile
  parts.push('## Company Profile')
  parts.push(context.profile)

  // Brand Voice
  if (context.brand.voice) {
    parts.push('## Brand Voice')
    parts.push(context.brand.voice)
  }

  // Messaging/Positioning
  if (context.brand.messaging) {
    parts.push('## Messaging & Positioning')
    parts.push(context.brand.messaging)
  }

  // Primary ICP
  if (context.audience.primaryIcp) {
    parts.push('## Primary Target Audience')
    parts.push(context.audience.primaryIcp)
  }

  // Product Overview
  if (context.product.overview) {
    parts.push('## Product Overview')
    parts.push(context.product.overview)
  }

  // Competitors (for competitive context)
  if (context.market.competitors) {
    parts.push('## Competitive Landscape')
    parts.push(context.market.competitors)
  }

  // Social Proof (for testimonials, case studies)
  if (context.market.proof) {
    parts.push('## Social Proof & Results')
    parts.push(context.market.proof)
  }

  return parts.join('\n\n')
}

/**
 * Build the user request section
 */
function buildRequestSection(
  userMessage: string,
  options?: Record<string, unknown>
): string {
  const parts: string[] = []

  parts.push('# Your Task')
  parts.push('')
  parts.push('Please complete the following request:')
  parts.push('')
  parts.push(userMessage)

  // Add any options as additional context
  if (options && Object.keys(options).length > 0) {
    parts.push('')
    parts.push('## Additional Parameters')
    parts.push('')

    for (const [key, value] of Object.entries(options)) {
      parts.push(`- **${formatOptionKey(key)}**: ${value}`)
    }
  }

  return parts.join('\n')
}

// Helper functions
function formatDirName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatFileName(name: string): string {
  return name.replace('.md', '').replace(/-/g, ' ')
}

function formatOptionKey(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').trim()
}
```

## Context Selection Strategy

Not all client context is always needed. Select based on skill:

```typescript
// packages/agent-executor/src/context-selector.ts

interface ContextSelector {
  profile: boolean
  brandVoice: boolean
  brandMessaging: boolean
  primaryIcp: boolean
  productOverview: boolean
  competitors: boolean
  proof: boolean
}

const skillContextNeeds: Record<string, Partial<ContextSelector>> = {
  copywriting: {
    profile: true,
    brandVoice: true,
    brandMessaging: true,
    primaryIcp: true,
    productOverview: true,
    proof: true,
  },
  'page-cro': {
    profile: true,
    brandVoice: false, // Not needed for audit
    primaryIcp: true,
    productOverview: true,
  },
  'competitor-research': {
    profile: true,
    competitors: true,
    productOverview: true,
  },
  'email-sequence': {
    profile: true,
    brandVoice: true,
    primaryIcp: true,
    productOverview: true,
  },
  'seo-audit': {
    profile: true,
    productOverview: true,
  },
  positioning: {
    profile: true,
    primaryIcp: true,
    productOverview: true,
    competitors: true,
  },
}

const defaultSelector: ContextSelector = {
  profile: true,
  brandVoice: true,
  brandMessaging: true,
  primaryIcp: true,
  productOverview: true,
  competitors: false,
  proof: false,
}

export function getContextSelector(skillName: string): ContextSelector {
  return {
    ...defaultSelector,
    ...skillContextNeeds[skillName],
  }
}
```

## Optimized Context Builder

Only include needed context to reduce token usage:

```typescript
export function buildOptimizedContext(input: ContextInput): string {
  const { skillContent, clientContext, userMessage, options } = input

  const sections: string[] = []

  // Skill content (always needed)
  sections.push(buildSkillSection(skillContent))

  // Client context (selective)
  if (clientContext) {
    const skillName = extractSkillName(skillContent.skillMd)
    const selector = getContextSelector(skillName)
    sections.push(buildSelectiveClientSection(clientContext, selector))
  }

  // User request
  sections.push(buildRequestSection(userMessage, options))

  return sections.join('\n\n---\n\n')
}

function buildSelectiveClientSection(
  context: ClientContext,
  selector: ContextSelector
): string {
  const parts: string[] = ['# Client Context', '']

  if (selector.profile) {
    parts.push('## Company Profile')
    parts.push(context.profile)
  }

  if (selector.brandVoice && context.brand.voice) {
    parts.push('## Brand Voice')
    parts.push(context.brand.voice)
  }

  if (selector.brandMessaging && context.brand.messaging) {
    parts.push('## Messaging')
    parts.push(context.brand.messaging)
  }

  if (selector.primaryIcp && context.audience.primaryIcp) {
    parts.push('## Target Audience')
    parts.push(context.audience.primaryIcp)
  }

  if (selector.productOverview && context.product.overview) {
    parts.push('## Product')
    parts.push(context.product.overview)
  }

  if (selector.competitors && context.market.competitors) {
    parts.push('## Competitors')
    parts.push(context.market.competitors)
  }

  if (selector.proof && context.market.proof) {
    parts.push('## Social Proof')
    parts.push(context.market.proof)
  }

  return parts.join('\n\n')
}

function extractSkillName(skillMd: string): string {
  // Extract name from frontmatter
  const match = skillMd.match(/name:\s*(.+)/i)
  return match ? match[1].trim() : 'unknown'
}
```

## Context Size Management

Monitor and truncate context to stay within token limits:

```typescript
// packages/agent-executor/src/context-size.ts

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

// Approximate tokens (4 chars ≈ 1 token)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

// More accurate token counting
async function countTokens(text: string): Promise<number> {
  const response = await anthropic.messages.countTokens({
    model: 'claude-sonnet-4-20250514',
    messages: [{ role: 'user', content: text }],
  })
  return response.input_tokens
}

const MAX_CONTEXT_TOKENS = 100000 // Leave room for response

export async function ensureContextFits(context: string): Promise<string> {
  const tokens = await countTokens(context)

  if (tokens <= MAX_CONTEXT_TOKENS) {
    return context
  }

  // Need to truncate - start with client context
  console.warn(`Context too large (${tokens} tokens), truncating...`)

  // Split and prioritize
  const sections = context.split('\n\n---\n\n')

  // Always keep skill and request sections
  const skillSection = sections[0]
  const requestSection = sections[sections.length - 1]

  // Truncate client section if needed
  let clientSection = sections.length > 2 ? sections[1] : ''

  while (await countTokens([skillSection, clientSection, requestSection].join('\n\n---\n\n')) > MAX_CONTEXT_TOKENS) {
    // Remove last subsection from client context
    const clientParts = clientSection.split('\n\n## ')
    if (clientParts.length <= 1) break
    clientParts.pop()
    clientSection = clientParts.join('\n\n## ')
  }

  return [skillSection, clientSection, requestSection].filter(Boolean).join('\n\n---\n\n')
}
```

## Example Combined Prompt

For a copywriting request with client context:

```markdown
---
name: copywriting
description: Write marketing copy for pages...
---

# Copywriting

You are an expert conversion copywriter...

## Copywriting Principles

### Clarity Over Cleverness
...

## Writing Style Rules
...

---

# Client Context

Use this information to tailor your output to the client.

## Company Profile

**Company**: Yaz Automate
**Industry**: B2B SaaS
**Stage**: Growth
...

## Brand Voice

**Tone**: Professional but approachable
**Style**: Clear, concise, action-oriented
...

## Target Audience

**Primary ICP**: Operations Managers at mid-market companies
**Pain Points**: Manual workflows, data silos
...

## Product

Yaz Automate is an AI-powered automation platform that helps teams...

---

# Your Task

Please complete the following request:

Write homepage copy for Yaz Automate focusing on the time-saving benefits of automation.

## Additional Parameters

- **Tone**: Professional
- **Include Alternatives**: true
```
