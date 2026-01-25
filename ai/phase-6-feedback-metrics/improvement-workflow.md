# Improvement Workflow

Integration with the existing skill improvement process.

## Overview

Connect the API feedback system to the existing workflow at `workflows/skill-improvement.md`.

## Existing Workflow Integration

The existing workflow defines a 6-step process:

1. **Collect** - Feedback entries in `.claude/feedback/{skill}/`
2. **Analyze** - Pattern identification
3. **Update Metrics** - `.claude/metrics/{skill}/metrics.md`
4. **Propose Changes** - Rule updates drafted
5. **Implement** - Updated RULES.md
6. **Document** - CHANGELOG.md updated

The API extends this with automated data collection and analysis.

## Automated Collection

### packages/inngest-functions/src/feedback-collect.ts

```typescript
import { inngest } from './client'
import { db, feedback, outputs, runs, skills, eq, gte } from '@marketing-agent/db'
import { saveFeedbackFile } from '@marketing-agent/storage'

export const feedbackCollectFunction = inngest.createFunction(
  {
    id: 'feedback-collect-weekly',
    retries: 2,
  },
  { cron: '0 9 * * 1' }, // Every Monday at 9 AM
  async ({ step }) => {
    // Get skills with recent feedback
    const skillsWithFeedback = await step.run('get-skills', async () => {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      return await db
        .selectDistinct({ skillName: skills.name })
        .from(skills)
        .innerJoin(runs, eq(runs.skillId, skills.id))
        .innerJoin(outputs, eq(outputs.runId, runs.id))
        .innerJoin(feedback, eq(feedback.outputId, outputs.id))
        .where(gte(feedback.createdAt, oneWeekAgo))
    })

    // For each skill, generate summary file
    for (const { skillName } of skillsWithFeedback) {
      await step.run(`collect-${skillName}`, async () => {
        const summary = await generateWeeklySummary(skillName)
        await saveFeedbackFile(skillName, summary)
      })
    }

    return { processed: skillsWithFeedback.length }
  }
)

async function generateWeeklySummary(skillName: string): Promise<string> {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const feedbackEntries = await db.query.feedback.findMany({
    where: and(
      eq(runs.skillId, skillId),
      gte(feedback.createdAt, oneWeekAgo)
    ),
    with: {
      output: {
        with: {
          run: true,
        },
      },
    },
  })

  // Generate markdown summary
  return formatWeeklySummary(skillName, feedbackEntries)
}

function formatWeeklySummary(skillName: string, entries: any[]): string {
  const avgScore = entries.reduce((sum, e) => sum + e.overallScore, 0) / entries.length

  return `# Weekly Feedback Summary: ${skillName}

**Period:** ${formatDate(oneWeekAgo)} - ${formatDate(new Date())}
**Total Feedback:** ${entries.length}
**Average Score:** ${avgScore.toFixed(1)}/5

## Score Breakdown

| Dimension | Average |
|-----------|---------|
| Accuracy | ${avg(entries, 'accuracyScore')}/5 |
| Quality | ${avg(entries, 'qualityScore')}/5 |
| Usefulness | ${avg(entries, 'usefulnessScore')}/5 |
| Rule Compliance | ${avg(entries, 'ruleComplianceScore')}/5 |

## Issues Reported

${formatIssues(entries)}

## What Worked Well

${formatPositive(entries)}

## Suggested Improvements

${formatSuggestions(entries)}
`
}
```

## Automated Analysis

### packages/inngest-functions/src/feedback-analyze.ts

```typescript
export const feedbackAnalyzeFunction = inngest.createFunction(
  {
    id: 'feedback-analyze',
    retries: 1,
  },
  { event: 'feedback.analyze' },
  async ({ event, step }) => {
    const { skillName } = event.data

    // Step 1: Get recent feedback
    const feedback = await step.run('get-feedback', async () => {
      return await getRecentFeedback(skillName, 30) // Last 30 days
    })

    // Step 2: Identify patterns
    const patterns = await step.run('identify-patterns', async () => {
      return await identifyPatterns(feedback)
    })

    // Step 3: Generate improvement suggestions
    const suggestions = await step.run('generate-suggestions', async () => {
      return await generateSuggestions(skillName, patterns)
    })

    // Step 4: Save analysis
    await step.run('save-analysis', async () => {
      await saveAnalysis(skillName, {
        patterns,
        suggestions,
        analyzedAt: new Date(),
      })
    })

    return { patterns, suggestions }
  }
)

interface Pattern {
  type: 'recurring_issue' | 'score_drop' | 'missing_rule' | 'unclear_rule'
  description: string
  frequency: number
  severity: 'high' | 'medium' | 'low'
  evidence: string[]
}

async function identifyPatterns(feedback: any[]): Promise<Pattern[]> {
  const patterns: Pattern[] = []

  // Group issues by similarity
  const issueCounts = new Map<string, { count: number; severity: string; examples: string[] }>()

  for (const entry of feedback) {
    for (const issue of entry.issues || []) {
      const key = normalizeIssueDescription(issue.description)
      const existing = issueCounts.get(key) || { count: 0, severity: issue.severity, examples: [] }
      existing.count++
      existing.examples.push(issue.description)
      issueCounts.set(key, existing)
    }
  }

  // Identify recurring issues (3+ occurrences)
  for (const [description, data] of issueCounts) {
    if (data.count >= 3) {
      patterns.push({
        type: 'recurring_issue',
        description,
        frequency: data.count,
        severity: data.severity as any,
        evidence: data.examples.slice(0, 5),
      })
    }
  }

  // Check for score drops
  const recentScores = feedback.slice(0, 10).map(f => f.overallScore)
  const olderScores = feedback.slice(-10).map(f => f.overallScore)
  const recentAvg = average(recentScores)
  const olderAvg = average(olderScores)

  if (recentAvg < olderAvg - 0.5) {
    patterns.push({
      type: 'score_drop',
      description: `Average score dropped from ${olderAvg.toFixed(1)} to ${recentAvg.toFixed(1)}`,
      frequency: 1,
      severity: recentAvg < 3 ? 'high' : 'medium',
      evidence: [],
    })
  }

  return patterns
}

async function generateSuggestions(
  skillName: string,
  patterns: Pattern[]
): Promise<Array<{ type: string; suggestion: string; priority: string }>> {
  const suggestions = []

  for (const pattern of patterns) {
    if (pattern.type === 'recurring_issue' && pattern.frequency >= 5) {
      suggestions.push({
        type: 'add_rule',
        suggestion: `Add rule to address: "${pattern.description}"`,
        priority: pattern.severity,
      })
    }
  }

  return suggestions
}
```

## Metrics Update

### .claude/metrics/{skill}/metrics.md Format

```typescript
async function updateSkillMetrics(skillName: string) {
  const metrics = await getSkillMetrics(skillName, thirtyDaysAgo, now)

  const content = `# ${formatSkillName(skillName)} Metrics

**Last Updated:** ${new Date().toISOString()}

## Scores Over Time

| Date | Overall | Accuracy | Quality | Usefulness |
|------|---------|----------|---------|------------|
${formatScoreHistory(metrics.scoreHistory)}

## Quality Dimensions

| Dimension | Average | Trend |
|-----------|---------|-------|
| Overall | ${metrics.scores.overall.toFixed(1)} | ${getTrend(metrics.trends.scoreChange)} |
| Accuracy | ${metrics.scores.accuracy.toFixed(1)} | - |
| Quality | ${metrics.scores.quality.toFixed(1)} | - |
| Usefulness | ${metrics.scores.usefulness.toFixed(1)} | - |
| Rule Compliance | ${metrics.scores.ruleCompliance.toFixed(1)} | - |

## Common Issues

| Issue | Count | Severity |
|-------|-------|----------|
${formatTopIssues(metrics.issues.topIssues)}

## Volume

- **Total Runs:** ${metrics.volume.totalRuns}
- **Completed:** ${metrics.volume.completedRuns}
- **Failed:** ${metrics.volume.failedRuns}
- **Feedback Rate:** ${(metrics.volume.feedbackRate * 100).toFixed(0)}%

## Token Usage

- **Avg Input:** ${metrics.tokens.avgInput.toLocaleString()}
- **Avg Output:** ${metrics.tokens.avgOutput.toLocaleString()}
- **Total:** ${(metrics.tokens.totalInput + metrics.tokens.totalOutput).toLocaleString()}
`

  await saveMetricsFile(skillName, content)
}
```

## Rule Update Proposals

When patterns indicate needed changes, generate proposals:

```typescript
interface RuleProposal {
  skillName: string
  changeType: 'add' | 'clarify' | 'strengthen' | 'remove'
  currentState?: string
  proposedState: string
  rationale: string
  evidence: string[]
  priority: 'high' | 'medium' | 'low'
}

async function generateRuleProposals(
  skillName: string,
  patterns: Pattern[]
): Promise<RuleProposal[]> {
  const proposals: RuleProposal[] = []

  // Use Claude to generate specific rule proposals
  for (const pattern of patterns.filter(p => p.severity === 'high')) {
    const proposal = await generateProposalWithClaude(skillName, pattern)
    proposals.push(proposal)
  }

  return proposals
}

async function generateProposalWithClaude(
  skillName: string,
  pattern: Pattern
): Promise<RuleProposal> {
  // Load current RULES.md
  const currentRules = await getSkillRules(skillName)

  const prompt = `You are reviewing feedback patterns for the ${skillName} skill.

Current RULES.md content:
${currentRules || 'No RULES.md exists'}

Identified Pattern:
- Type: ${pattern.type}
- Description: ${pattern.description}
- Frequency: ${pattern.frequency} occurrences
- Examples:
${pattern.evidence.map(e => `  - ${e}`).join('\n')}

Generate a specific rule addition or modification to address this pattern.
Return as JSON:
{
  "changeType": "add|clarify|strengthen",
  "currentState": "existing rule text if modifying",
  "proposedState": "the new or updated rule text",
  "rationale": "why this change addresses the pattern"
}`

  const response = await anthropic.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  })

  const result = JSON.parse(extractJson(response))

  return {
    skillName,
    changeType: result.changeType,
    currentState: result.currentState,
    proposedState: result.proposedState,
    rationale: result.rationale,
    evidence: pattern.evidence,
    priority: pattern.severity,
  }
}
```

## Changelog Updates

When rules are changed, update CHANGELOG.md:

```typescript
async function updateChangelog(
  skillName: string,
  changes: RuleProposal[],
  version: string
) {
  const currentChangelog = await getSkillChangelog(skillName)

  const newEntry = `## [${version}] - ${formatDate(new Date())}

### ${changes[0].changeType === 'add' ? 'Added' : 'Changed'}
${changes.map(c => `- ${c.proposedState.split('\n')[0]}`).join('\n')}

### Feedback Incorporated
${changes.map(c => `- Pattern: ${c.rationale}`).join('\n')}
`

  const updatedChangelog = newEntry + '\n\n' + currentChangelog
  await saveSkillChangelog(skillName, updatedChangelog)
}
```

## Integration Points

The API integrates with the manual workflow at:

1. **Collection** - API automatically collects feedback, saves to S3
2. **Analysis** - Scheduled jobs identify patterns
3. **Metrics** - Auto-updated metrics files
4. **Proposals** - Generated for human review
5. **Implementation** - Manual (human reviews and applies changes)
6. **Documentation** - Changelog entries auto-generated

Human involvement required at step 5 ensures quality control over rule changes.
