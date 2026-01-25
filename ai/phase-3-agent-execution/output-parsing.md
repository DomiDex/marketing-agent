# Output Parsing

Output extraction, validation, and storage.

## Overview

After Claude generates content, we need to:
1. Extract the relevant output
2. Validate it meets quality standards
3. Save to S3 with proper naming
4. Create database records

## Output Parser Implementation

### packages/agent-executor/src/parser.ts

```typescript
export interface ParsedOutput {
  content: string
  title?: string
  sections?: string[]
  metadata?: Record<string, unknown>
}

/**
 * Parse and clean output from Claude
 */
export async function parseOutput(
  rawOutput: string,
  skillName: string
): Promise<string> {
  let output = rawOutput

  // 1. Remove any system artifacts
  output = removeSystemArtifacts(output)

  // 2. Apply skill-specific parsing
  output = applySkillParser(output, skillName)

  // 3. Ensure proper markdown formatting
  output = normalizeMarkdown(output)

  // 4. Validate output quality
  validateOutput(output, skillName)

  return output
}

/**
 * Remove Claude artifacts that shouldn't be in output
 */
function removeSystemArtifacts(content: string): string {
  // Remove thinking blocks if present
  content = content.replace(/<thinking>[\s\S]*?<\/thinking>/g, '')

  // Remove assistant preamble
  content = content.replace(/^(Here's|I'll|Let me|Sure,).*?\n\n/i, '')

  // Remove trailing acknowledgments
  content = content.replace(/\n\n(Let me know|Feel free|I hope|Is there anything).*$/i, '')

  return content.trim()
}

/**
 * Apply skill-specific parsing rules
 */
function applySkillParser(content: string, skillName: string): string {
  switch (skillName) {
    case 'copywriting':
      return parseCopywritingOutput(content)
    case 'email-sequence':
      return parseEmailSequenceOutput(content)
    case 'page-cro':
      return parsePageCroOutput(content)
    case 'seo-audit':
      return parseSeoAuditOutput(content)
    default:
      return content
  }
}

/**
 * Parse copywriting output
 */
function parseCopywritingOutput(content: string): string {
  // Ensure sections are properly labeled
  // Extract headline alternatives if present
  // Clean up any draft markers

  // Remove "Option A/B/C" if output should be unified
  // Or keep them if alternatives were requested

  return content
}

/**
 * Parse email sequence output
 */
function parseEmailSequenceOutput(content: string): string {
  // Ensure emails are properly numbered
  // Validate subject lines exist
  // Check for proper email structure

  // Ensure each email has:
  // - Subject line
  // - Preview text
  // - Body
  // - CTA

  const emailPattern = /## Email \d+/g
  if (!emailPattern.test(content)) {
    // Try to restructure if emails aren't properly marked
    content = restructureEmails(content)
  }

  return content
}

function restructureEmails(content: string): string {
  // Logic to identify and restructure email content
  // This is a fallback for malformed output
  return content
}

/**
 * Parse CRO audit output
 */
function parsePageCroOutput(content: string): string {
  // Ensure findings are properly categorized
  // Check for priority levels
  // Validate recommendations exist

  return content
}

/**
 * Parse SEO audit output
 */
function parseSeoAuditOutput(content: string): string {
  // Ensure technical issues are listed
  // Check for severity indicators
  // Validate fix recommendations

  return content
}

/**
 * Normalize markdown formatting
 */
function normalizeMarkdown(content: string): string {
  // Normalize line endings
  content = content.replace(/\r\n/g, '\n')

  // Ensure proper heading spacing
  content = content.replace(/\n(#{1,6})/g, '\n\n$1')
  content = content.replace(/^(#{1,6})/gm, '$1')

  // Remove excessive blank lines
  content = content.replace(/\n{3,}/g, '\n\n')

  // Ensure file ends with single newline
  content = content.trim() + '\n'

  return content
}

/**
 * Validate output meets minimum quality standards
 */
function validateOutput(content: string, skillName: string): void {
  // Minimum length check
  if (content.length < 100) {
    console.warn(`Output seems too short for ${skillName}`)
  }

  // Check for common issues
  if (content.includes('[TODO]') || content.includes('[PLACEHOLDER]')) {
    console.warn('Output contains placeholders')
  }

  // Skill-specific validation
  const validators: Record<string, (c: string) => void> = {
    copywriting: validateCopywriting,
    'email-sequence': validateEmailSequence,
  }

  if (validators[skillName]) {
    validators[skillName](content)
  }
}

function validateCopywriting(content: string): void {
  // Check for headline
  if (!content.match(/^#\s+/m)) {
    console.warn('Copywriting output missing headline')
  }

  // Check for CTA
  if (!content.toLowerCase().includes('cta') && !content.match(/\[.*button.*\]/i)) {
    console.warn('Copywriting output may be missing CTA')
  }
}

function validateEmailSequence(content: string): void {
  // Check for subject lines
  const subjectCount = (content.match(/subject.*:/gi) || []).length
  if (subjectCount < 3) {
    console.warn('Email sequence may have too few emails')
  }
}
```

## Output Storage

### packages/agent-executor/src/storage.ts

```typescript
import { saveOutput as s3SaveOutput, getDownloadUrl } from '@marketing-agent/storage'
import { db, outputs } from '@marketing-agent/db'

export interface SaveOutputInput {
  runId: string
  skillName: string
  clientSlug?: string
  content: string
  outputType?: string
}

export interface SaveOutputResult {
  outputId: string
  s3Key: string
  downloadUrl: string
}

/**
 * Save output to S3 and create database record
 */
export async function saveOutputComplete(
  input: SaveOutputInput
): Promise<SaveOutputResult> {
  const { runId, skillName, clientSlug, content, outputType = 'output' } = input

  // Generate S3 key
  const date = new Date().toISOString().split('T')[0]
  const s3Key = generateS3Key(skillName, clientSlug, outputType, date)

  // Save to S3
  await s3SaveOutput(skillName, clientSlug, outputType, content)

  // Extract title from content
  const title = extractTitle(content, skillName)

  // Generate preview
  const preview = generatePreview(content)

  // Create database record
  const [output] = await db.insert(outputs).values({
    runId,
    s3Key,
    format: 'markdown',
    title,
    preview,
    sizeBytes: Buffer.byteLength(content, 'utf8'),
  }).returning()

  // Generate download URL
  const downloadUrl = await getDownloadUrl(s3Key)

  return {
    outputId: output.id,
    s3Key,
    downloadUrl,
  }
}

/**
 * Generate consistent S3 key
 */
function generateS3Key(
  skillName: string,
  clientSlug: string | undefined,
  outputType: string,
  date: string
): string {
  const parts = [clientSlug, outputType, date].filter(Boolean)
  const fileName = `${parts.join('-')}.md`
  return `outputs/${skillName}/${fileName}`
}

/**
 * Extract title from markdown content
 */
function extractTitle(content: string, skillName: string): string {
  // Try to find first H1
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) {
    return h1Match[1].trim()
  }

  // Try first H2
  const h2Match = content.match(/^##\s+(.+)$/m)
  if (h2Match) {
    return h2Match[1].trim()
  }

  // Fallback to skill name
  return `${formatSkillName(skillName)} Output`
}

/**
 * Generate preview (first 500 chars, clean)
 */
function generatePreview(content: string, maxLength = 500): string {
  // Remove markdown formatting for preview
  let preview = content
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/`(.+?)`/g, '$1') // Remove code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/\n{2,}/g, '\n') // Collapse newlines

  if (preview.length > maxLength) {
    preview = preview.slice(0, maxLength - 3) + '...'
  }

  return preview.trim()
}

function formatSkillName(skillName: string): string {
  return skillName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

## Output Formats

Some skills may produce different output formats:

```typescript
// packages/agent-executor/src/formats.ts

export type OutputFormat = 'markdown' | 'json' | 'html'

export interface FormatConfig {
  extension: string
  contentType: string
  parser: (content: string) => string
}

const formatConfigs: Record<OutputFormat, FormatConfig> = {
  markdown: {
    extension: '.md',
    contentType: 'text/markdown',
    parser: (content) => content,
  },
  json: {
    extension: '.json',
    contentType: 'application/json',
    parser: (content) => {
      // Extract JSON from markdown code block if present
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch) {
        return jsonMatch[1]
      }
      return content
    },
  },
  html: {
    extension: '.html',
    contentType: 'text/html',
    parser: (content) => {
      // Extract HTML or convert markdown
      const htmlMatch = content.match(/```html\n([\s\S]*?)\n```/)
      if (htmlMatch) {
        return htmlMatch[1]
      }
      // Could use a markdown-to-html converter here
      return content
    },
  },
}

const skillFormats: Record<string, OutputFormat> = {
  'schema-markup': 'json',
  // Most skills use markdown
}

export function getFormatForSkill(skillName: string): OutputFormat {
  return skillFormats[skillName] || 'markdown'
}

export function parseForFormat(content: string, format: OutputFormat): string {
  return formatConfigs[format].parser(content)
}
```

## Output Versioning

Track multiple versions of output for the same request:

```typescript
// packages/agent-executor/src/versioning.ts

import { db, outputs, eq, and, like } from '@marketing-agent/db'

/**
 * Get next version number for output
 */
export async function getNextVersion(
  skillName: string,
  clientSlug: string,
  outputType: string,
  date: string
): Promise<number> {
  const pattern = `outputs/${skillName}/${clientSlug}-${outputType}-${date}%`

  const existing = await db.query.outputs.findMany({
    where: like(outputs.s3Key, pattern),
    columns: { s3Key: true },
  })

  if (existing.length === 0) {
    return 1
  }

  // Extract version numbers
  const versions = existing
    .map(o => {
      const match = o.s3Key.match(/-v(\d+)\.md$/)
      return match ? parseInt(match[1]) : 1
    })
    .filter(Boolean)

  return Math.max(...versions) + 1
}

/**
 * Generate versioned S3 key
 */
export async function generateVersionedKey(
  skillName: string,
  clientSlug: string,
  outputType: string
): Promise<string> {
  const date = new Date().toISOString().split('T')[0]
  const version = await getNextVersion(skillName, clientSlug, outputType, date)

  const versionSuffix = version > 1 ? `-v${version}` : ''
  return `outputs/${skillName}/${clientSlug}-${outputType}-${date}${versionSuffix}.md`
}
```

## Quality Scoring

Automated quality checks on output:

```typescript
// packages/agent-executor/src/quality.ts

export interface QualityScore {
  overall: number
  structure: number
  completeness: number
  formatting: number
  issues: string[]
}

/**
 * Score output quality automatically
 */
export function scoreOutput(content: string, skillName: string): QualityScore {
  const issues: string[] = []
  let structureScore = 100
  let completenessScore = 100
  let formattingScore = 100

  // Check structure
  if (!content.match(/^#\s+/m)) {
    structureScore -= 20
    issues.push('Missing main heading')
  }

  if ((content.match(/^##\s+/gm) || []).length < 2) {
    structureScore -= 10
    issues.push('Few section headings')
  }

  // Check completeness
  if (content.length < 500) {
    completenessScore -= 30
    issues.push('Output seems short')
  }

  if (content.includes('[TODO]') || content.includes('[PLACEHOLDER]')) {
    completenessScore -= 40
    issues.push('Contains placeholders')
  }

  // Check formatting
  if (content.includes('  \n')) {
    formattingScore -= 5
    issues.push('Trailing whitespace')
  }

  if (content.match(/\n{4,}/)) {
    formattingScore -= 5
    issues.push('Excessive blank lines')
  }

  // Skill-specific checks
  const skillChecks = getSkillQualityChecks(skillName)
  for (const check of skillChecks) {
    const result = check(content)
    if (!result.passed) {
      completenessScore -= result.deduction
      issues.push(result.issue)
    }
  }

  const overall = Math.round(
    (structureScore + completenessScore + formattingScore) / 3
  )

  return {
    overall,
    structure: structureScore,
    completeness: completenessScore,
    formatting: formattingScore,
    issues,
  }
}

interface QualityCheck {
  (content: string): { passed: boolean; deduction: number; issue: string }
}

function getSkillQualityChecks(skillName: string): QualityCheck[] {
  const checks: Record<string, QualityCheck[]> = {
    copywriting: [
      (c) => ({
        passed: /cta|call.to.action|button/i.test(c),
        deduction: 15,
        issue: 'Missing CTA section',
      }),
      (c) => ({
        passed: /headline|hero/i.test(c),
        deduction: 10,
        issue: 'Missing headline',
      }),
    ],
    'email-sequence': [
      (c) => ({
        passed: (c.match(/subject.*:/gi) || []).length >= 3,
        deduction: 20,
        issue: 'Too few emails in sequence',
      }),
    ],
    'page-cro': [
      (c) => ({
        passed: /recommendation|suggest/i.test(c),
        deduction: 20,
        issue: 'Missing recommendations',
      }),
    ],
  }

  return checks[skillName] || []
}
```
