# Claude Fallback

When and how to use Claude Haiku for skill disambiguation.

## Overview

When keyword matching produces low-confidence results (< 0.7), we use Claude Haiku to intelligently disambiguate which skill the user needs.

## When to Use Claude Fallback

| Scenario | Example | Action |
|----------|---------|--------|
| Multiple skills match similarly | "help with marketing" | Ask Claude |
| Confidence < 0.7 | "make my site better" | Ask Claude |
| No clear keyword match | "I need assistance" | Ask Claude |
| Ambiguous request | "optimize this" | Ask Claude |

## Implementation

### packages/skill-detector/src/claude.ts

```typescript
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

interface SkillCandidate {
  skill: string
  confidence: number
}

interface SkillInfo {
  name: string
  description: string
  triggerKeywords: string[]
}

interface DisambiguationResult {
  skill: string
  confidence: number
  reasoning: string
  alternatives: Array<{
    skill: string
    confidence: number
  }>
}

/**
 * Use Claude to disambiguate between potential skill matches
 */
export async function disambiguateWithClaude(
  userMessage: string,
  candidates: SkillCandidate[],
  allSkills: SkillInfo[]
): Promise<DisambiguationResult> {
  // Build skill descriptions for context
  const skillDescriptions = allSkills
    .map(s => `- **${s.name}**: ${s.description}`)
    .join('\n')

  // Build candidate list
  const candidateList = candidates.length > 0
    ? candidates.map(c => `- ${c.skill} (confidence: ${(c.confidence * 100).toFixed(0)}%)`).join('\n')
    : 'No strong matches found'

  const prompt = `You are a skill classifier for a marketing assistant. Given a user's message, determine which skill they need.

## Available Skills

${skillDescriptions}

## User Message

"${userMessage}"

## Keyword Match Results

${candidateList}

## Your Task

1. Analyze the user's intent
2. Select the most appropriate skill
3. Rate your confidence (0.0 to 1.0)
4. Explain your reasoning briefly

Respond in this exact JSON format:
\`\`\`json
{
  "skill": "skill-name",
  "confidence": 0.85,
  "reasoning": "Brief explanation",
  "alternatives": [
    {"skill": "other-skill", "confidence": 0.6}
  ]
}
\`\`\`

If no skill fits well, use the skill "marketing-ideas" as a fallback.`

  const response = await anthropic.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  // Parse response
  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  // Extract JSON from response
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/)
  if (!jsonMatch) {
    // Fallback if parsing fails
    return {
      skill: candidates[0]?.skill || 'marketing-ideas',
      confidence: 0.5,
      reasoning: 'Unable to parse Claude response',
      alternatives: candidates.slice(1).map(c => ({
        skill: c.skill,
        confidence: c.confidence,
      })),
    }
  }

  try {
    const result = JSON.parse(jsonMatch[1])

    // Validate the skill exists
    const skillExists = allSkills.some(s => s.name === result.skill)
    if (!skillExists) {
      result.skill = candidates[0]?.skill || 'marketing-ideas'
      result.confidence = 0.5
    }

    return result
  } catch (e) {
    // JSON parsing failed
    return {
      skill: candidates[0]?.skill || 'marketing-ideas',
      confidence: 0.5,
      reasoning: 'Failed to parse disambiguation result',
      alternatives: [],
    }
  }
}
```

## Optimization: Batch Disambiguation

For efficiency, handle multiple messages in a batch:

```typescript
/**
 * Disambiguate multiple messages at once
 */
export async function disambiguateBatch(
  messages: Array<{ id: string; message: string; candidates: SkillCandidate[] }>,
  allSkills: SkillInfo[]
): Promise<Map<string, DisambiguationResult>> {
  const results = new Map<string, DisambiguationResult>()

  // Process in parallel (with limit)
  const batchSize = 5
  for (let i = 0; i < messages.length; i += batchSize) {
    const batch = messages.slice(i, i + batchSize)

    const batchResults = await Promise.all(
      batch.map(({ id, message, candidates }) =>
        disambiguateWithClaude(message, candidates, allSkills)
          .then(result => ({ id, result }))
      )
    )

    for (const { id, result } of batchResults) {
      results.set(id, result)
    }
  }

  return results
}
```

## Caching Disambiguation Results

Cache results for identical messages:

```typescript
// packages/skill-detector/src/claude-cache.ts

interface CacheEntry {
  result: DisambiguationResult
  expiresAt: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

/**
 * Get cached disambiguation or compute new one
 */
export async function getCachedDisambiguation(
  userMessage: string,
  candidates: SkillCandidate[],
  allSkills: SkillInfo[]
): Promise<DisambiguationResult> {
  // Create cache key from message (normalized)
  const cacheKey = normalizeMessage(userMessage)

  // Check cache
  const cached = cache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) {
    return cached.result
  }

  // Compute new result
  const result = await disambiguateWithClaude(userMessage, candidates, allSkills)

  // Cache result
  cache.set(cacheKey, {
    result,
    expiresAt: Date.now() + CACHE_TTL,
  })

  // Clean old entries periodically
  cleanCache()

  return result
}

function normalizeMessage(message: string): string {
  return message.toLowerCase().trim().replace(/\s+/g, ' ')
}

function cleanCache(): void {
  const now = Date.now()
  for (const [key, entry] of cache.entries()) {
    if (entry.expiresAt < now) {
      cache.delete(key)
    }
  }
}
```

## Interactive Disambiguation

When Claude is also uncertain, present options to the user:

```typescript
// packages/skill-detector/src/interactive.ts

export interface InteractiveChoice {
  skill: string
  description: string
  example: string
}

/**
 * Generate user-friendly choices for disambiguation
 */
export function generateInteractiveChoices(
  result: DisambiguationResult,
  allSkills: SkillInfo[]
): InteractiveChoice[] {
  const choices: InteractiveChoice[] = []

  // Add main suggestion
  const mainSkill = allSkills.find(s => s.name === result.skill)
  if (mainSkill) {
    choices.push({
      skill: mainSkill.name,
      description: truncate(mainSkill.description, 100),
      example: getExampleForSkill(mainSkill.name),
    })
  }

  // Add alternatives
  for (const alt of result.alternatives.slice(0, 3)) {
    const skill = allSkills.find(s => s.name === alt.skill)
    if (skill) {
      choices.push({
        skill: skill.name,
        description: truncate(skill.description, 100),
        example: getExampleForSkill(skill.name),
      })
    }
  }

  return choices
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

function getExampleForSkill(skillName: string): string {
  const examples: Record<string, string> = {
    copywriting: 'Write homepage copy for my SaaS',
    'email-sequence': 'Create a 5-email onboarding sequence',
    'page-cro': 'Audit my landing page for conversions',
    'seo-audit': 'Review my site for SEO issues',
    positioning: 'Help me define our value proposition',
    'competitor-research': 'Analyze our top 3 competitors',
  }

  return examples[skillName] || `Use ${skillName} skill`
}
```

## Telegram Integration

Present choices as inline keyboard:

```typescript
// For Telegram bot usage
export function buildSkillChoiceKeyboard(choices: InteractiveChoice[]) {
  return {
    inline_keyboard: choices.map(choice => [
      {
        text: `${choice.skill}: ${choice.description}`,
        callback_data: `skill:${choice.skill}`,
      },
    ]),
  }
}
```

## Metrics and Monitoring

Track disambiguation usage:

```typescript
// packages/skill-detector/src/metrics.ts

interface DisambiguationMetric {
  timestamp: Date
  userMessage: string
  keywordTopMatch: string | null
  keywordConfidence: number
  claudeChoice: string
  claudeConfidence: number
  latencyMs: number
}

const metrics: DisambiguationMetric[] = []

export function recordDisambiguation(metric: DisambiguationMetric): void {
  metrics.push(metric)

  // Log for analysis
  console.log('Disambiguation:', {
    keyword: `${metric.keywordTopMatch} (${metric.keywordConfidence})`,
    claude: `${metric.claudeChoice} (${metric.claudeConfidence})`,
    latency: `${metric.latencyMs}ms`,
  })

  // Could send to analytics service
}

export function getDisambiguationStats(): {
  total: number
  avgLatency: number
  agreementRate: number
} {
  const total = metrics.length
  const avgLatency = metrics.reduce((sum, m) => sum + m.latencyMs, 0) / total
  const agreements = metrics.filter(
    m => m.keywordTopMatch === m.claudeChoice
  ).length
  const agreementRate = agreements / total

  return { total, avgLatency, agreementRate }
}
```

## Error Handling

Handle Claude API failures gracefully:

```typescript
export async function safeDisambiguate(
  userMessage: string,
  candidates: SkillCandidate[],
  allSkills: SkillInfo[]
): Promise<DisambiguationResult> {
  try {
    return await disambiguateWithClaude(userMessage, candidates, allSkills)
  } catch (error) {
    console.error('Claude disambiguation failed:', error)

    // Fall back to keyword match
    if (candidates.length > 0) {
      return {
        skill: candidates[0].skill,
        confidence: candidates[0].confidence * 0.8, // Reduce confidence
        reasoning: 'Fell back to keyword match due to Claude error',
        alternatives: candidates.slice(1).map(c => ({
          skill: c.skill,
          confidence: c.confidence,
        })),
      }
    }

    // Ultimate fallback
    return {
      skill: 'marketing-ideas',
      confidence: 0.3,
      reasoning: 'No matches found, using generic skill',
      alternatives: [],
    }
  }
}
```
