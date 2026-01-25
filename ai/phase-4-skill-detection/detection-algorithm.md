# Detection Algorithm

Multi-stage algorithm for identifying the appropriate skill from user messages.

## Overview

The detection algorithm uses a multi-stage approach:
1. **Direct Command** - Exact match on `/skillname`
2. **Keyword Match** - Score based on trigger keywords
3. **Claude Fallback** - Disambiguation for ambiguous cases

## Algorithm Implementation

### packages/skill-detector/src/index.ts

```typescript
import { matchDirectCommand } from './command'
import { matchKeywords } from './keywords'
import { disambiguateWithClaude } from './claude'
import { extractParameters } from './parameters'
import { db, skills } from '@marketing-agent/db'

export interface DetectionResult {
  skill: string
  confidence: number
  method: 'command' | 'keyword' | 'claude'
  extracted: {
    clientSlug?: string
    outputType?: string
  }
  alternatives: Array<{
    skill: string
    confidence: number
  }>
}

const CONFIDENCE_THRESHOLD = 0.7

/**
 * Detect the appropriate skill from a user message
 */
export async function detectSkill(
  message: string,
  clientId?: string
): Promise<DetectionResult> {
  // Load all skills from database
  const allSkills = await db.query.skills.findMany({
    columns: {
      name: true,
      description: true,
      triggerKeywords: true,
    },
  })

  // Stage 1: Direct command match
  const commandMatch = matchDirectCommand(message, allSkills)
  if (commandMatch) {
    return {
      skill: commandMatch,
      confidence: 1.0,
      method: 'command',
      extracted: extractParameters(message, commandMatch),
      alternatives: [],
    }
  }

  // Stage 2: Keyword matching
  const keywordMatches = matchKeywords(message, allSkills)

  // Stage 3: Check confidence
  const topMatch = keywordMatches[0]

  if (topMatch && topMatch.confidence >= CONFIDENCE_THRESHOLD) {
    // High confidence - use keyword match
    return {
      skill: topMatch.skill,
      confidence: topMatch.confidence,
      method: 'keyword',
      extracted: extractParameters(message, topMatch.skill),
      alternatives: keywordMatches.slice(1, 4).map(m => ({
        skill: m.skill,
        confidence: m.confidence,
      })),
    }
  }

  // Stage 4: Low confidence - use Claude for disambiguation
  const claudeResult = await disambiguateWithClaude(message, keywordMatches.slice(0, 5), allSkills)

  return {
    skill: claudeResult.skill,
    confidence: claudeResult.confidence,
    method: 'claude',
    extracted: extractParameters(message, claudeResult.skill),
    alternatives: claudeResult.alternatives,
  }
}
```

## Stage 1: Direct Command Matching

### packages/skill-detector/src/command.ts

```typescript
interface SkillInfo {
  name: string
  description: string
  triggerKeywords: string[]
}

/**
 * Match direct /command in message
 */
export function matchDirectCommand(
  message: string,
  skills: SkillInfo[]
): string | null {
  // Extract command from message
  const commandMatch = message.match(/^\/([a-z0-9-]+)/i)
  if (!commandMatch) return null

  const command = commandMatch[1].toLowerCase()

  // Find matching skill
  const skill = skills.find(s => s.name === command)
  return skill ? skill.name : null
}
```

## Stage 2: Keyword Matching

### packages/skill-detector/src/keywords.ts

```typescript
interface SkillInfo {
  name: string
  description: string
  triggerKeywords: string[]
}

interface KeywordMatch {
  skill: string
  confidence: number
  matchedKeywords: string[]
}

/**
 * Score skills based on keyword matches
 */
export function matchKeywords(
  message: string,
  skills: SkillInfo[]
): KeywordMatch[] {
  const messageLower = message.toLowerCase()
  const messageWords = tokenize(messageLower)

  const matches: KeywordMatch[] = []

  for (const skill of skills) {
    const { score, matchedKeywords } = scoreSkill(
      messageLower,
      messageWords,
      skill
    )

    if (score > 0) {
      matches.push({
        skill: skill.name,
        confidence: score,
        matchedKeywords,
      })
    }
  }

  // Sort by confidence descending
  return matches.sort((a, b) => b.confidence - a.confidence)
}

/**
 * Score a single skill against the message
 */
function scoreSkill(
  messageLower: string,
  messageWords: string[],
  skill: SkillInfo
): { score: number; matchedKeywords: string[] } {
  const matchedKeywords: string[] = []
  let totalScore = 0

  // Check trigger keywords
  for (const keyword of skill.triggerKeywords) {
    const keywordLower = keyword.toLowerCase()

    // Exact phrase match (higher weight)
    if (messageLower.includes(keywordLower)) {
      matchedKeywords.push(keyword)
      totalScore += getKeywordWeight(keyword) * 1.5
      continue
    }

    // Word-by-word match (lower weight)
    const keywordWords = tokenize(keywordLower)
    const matchingWords = keywordWords.filter(w => messageWords.includes(w))
    const matchRatio = matchingWords.length / keywordWords.length

    if (matchRatio >= 0.5) {
      matchedKeywords.push(keyword)
      totalScore += getKeywordWeight(keyword) * matchRatio
    }
  }

  // Check description for additional context
  const descriptionScore = scoreDescription(messageLower, skill.description)
  totalScore += descriptionScore * 0.3

  // Normalize to 0-1 range
  const maxPossibleScore = skill.triggerKeywords.length * 1.5 + 0.3
  const normalizedScore = Math.min(1, totalScore / maxPossibleScore)

  return {
    score: normalizedScore,
    matchedKeywords,
  }
}

/**
 * Get weight for a keyword (longer, more specific = higher weight)
 */
function getKeywordWeight(keyword: string): number {
  const words = keyword.split(/\s+/).length

  // Single words are less specific
  if (words === 1) return 0.5
  // Two words are moderate
  if (words === 2) return 0.8
  // Phrases are highly specific
  return 1.0
}

/**
 * Score based on description match
 */
function scoreDescription(message: string, description: string): number {
  const descWords = tokenize(description.toLowerCase())
  const msgWords = tokenize(message)

  const matchCount = msgWords.filter(w => descWords.includes(w)).length
  return Math.min(1, matchCount / 10) // Normalize
}

/**
 * Tokenize text into words
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2) // Skip short words
}
```

## Stage 3: Confidence Scoring

The confidence score represents how certain we are about the match:

| Score Range | Interpretation | Action |
|------------|----------------|--------|
| 1.0 | Direct command | Execute immediately |
| 0.85 - 0.99 | Strong keyword match | Execute with high confidence |
| 0.70 - 0.84 | Good keyword match | Execute with confidence |
| 0.50 - 0.69 | Weak match | Use Claude disambiguation |
| < 0.50 | Poor match | Use Claude disambiguation |

## Stage 4: Parameter Extraction

### packages/skill-detector/src/parameters.ts

```typescript
/**
 * Extract additional parameters from message
 */
export function extractParameters(
  message: string,
  skillName: string
): { clientSlug?: string; outputType?: string } {
  return {
    clientSlug: extractClientSlug(message),
    outputType: extractOutputType(message, skillName),
  }
}

/**
 * Extract client name/slug from message
 */
function extractClientSlug(message: string): string | undefined {
  // Pattern: "for [Client Name]"
  const forPattern = /\bfor\s+([A-Z][A-Za-z0-9\s]+?)(?:\s*[,.]|\s+(?:that|which|with|about|focusing))/i
  const forMatch = message.match(forPattern)
  if (forMatch) {
    return slugify(forMatch[1])
  }

  // Pattern: "[Client Name]'s"
  const possessivePattern = /([A-Z][A-Za-z0-9\s]+?)'s\s+/
  const possMatch = message.match(possessivePattern)
  if (possMatch) {
    return slugify(possMatch[1])
  }

  return undefined
}

/**
 * Extract output type based on skill
 */
function extractOutputType(message: string, skillName: string): string | undefined {
  const messageLower = message.toLowerCase()

  const outputTypes: Record<string, Record<string, string[]>> = {
    copywriting: {
      homepage: ['homepage', 'home page', 'main page'],
      landing: ['landing page', 'lp'],
      pricing: ['pricing page', 'pricing'],
      feature: ['feature page', 'features'],
      about: ['about page', 'about us'],
      product: ['product page'],
    },
    'email-sequence': {
      onboarding: ['onboarding', 'welcome', 'getting started'],
      nurture: ['nurture', 'drip'],
      'win-back': ['win-back', 'reactivation', 're-engagement'],
      sales: ['sales', 'outbound'],
    },
    'page-cro': {
      audit: ['audit', 'review', 'analyze'],
      recommendations: ['recommendations', 'improve'],
    },
  }

  const skillTypes = outputTypes[skillName]
  if (!skillTypes) return undefined

  for (const [type, keywords] of Object.entries(skillTypes)) {
    if (keywords.some(k => messageLower.includes(k))) {
      return type
    }
  }

  return undefined
}

/**
 * Convert string to slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}
```

## Caching

Cache skill data to avoid database queries:

```typescript
// packages/skill-detector/src/cache.ts

interface CachedSkill {
  name: string
  description: string
  triggerKeywords: string[]
}

let skillCache: CachedSkill[] | null = null
let cacheExpiry = 0

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function getCachedSkills(): Promise<CachedSkill[]> {
  const now = Date.now()

  if (skillCache && now < cacheExpiry) {
    return skillCache
  }

  // Refresh cache
  const skills = await db.query.skills.findMany({
    columns: {
      name: true,
      description: true,
      triggerKeywords: true,
    },
  })

  skillCache = skills
  cacheExpiry = now + CACHE_TTL

  return skills
}

export function invalidateCache(): void {
  skillCache = null
  cacheExpiry = 0
}
```

## Testing

```typescript
// test/detection.test.ts
import { describe, it, expect } from 'vitest'
import { detectSkill } from '@marketing-agent/skill-detector'

describe('Skill Detection', () => {
  it('matches direct command', async () => {
    const result = await detectSkill('/copywriting Write a homepage')

    expect(result.skill).toBe('copywriting')
    expect(result.confidence).toBe(1.0)
    expect(result.method).toBe('command')
  })

  it('matches keywords with high confidence', async () => {
    const result = await detectSkill('Write homepage copy for my SaaS')

    expect(result.skill).toBe('copywriting')
    expect(result.confidence).toBeGreaterThan(0.7)
    expect(result.method).toBe('keyword')
  })

  it('extracts client slug', async () => {
    const result = await detectSkill('Write copy for Yaz Automate')

    expect(result.extracted.clientSlug).toBe('yaz-automate')
  })

  it('extracts output type', async () => {
    const result = await detectSkill('Create pricing page copy')

    expect(result.extracted.outputType).toBe('pricing')
  })

  it('uses Claude for ambiguous requests', async () => {
    const result = await detectSkill('Help me improve my marketing')

    expect(result.method).toBe('claude')
    expect(result.alternatives.length).toBeGreaterThan(0)
  })
})
```
