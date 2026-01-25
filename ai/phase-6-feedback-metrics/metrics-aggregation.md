# Metrics Aggregation

Per-skill metrics calculation and tracking.

## Overview

Aggregate feedback data to track skill performance over time and identify improvement opportunities.

## Metrics Structure

### Per-Skill Metrics

```typescript
interface SkillMetrics {
  skillName: string
  period: 'day' | 'week' | 'month' | 'all'

  // Score averages
  scores: {
    overall: number
    accuracy: number
    quality: number
    usefulness: number
    ruleCompliance: number
  }

  // Volume
  volume: {
    totalRuns: number
    completedRuns: number
    failedRuns: number
    feedbackCount: number
    feedbackRate: number // % of runs with feedback
  }

  // Token usage
  tokens: {
    avgInput: number
    avgOutput: number
    totalInput: number
    totalOutput: number
  }

  // Issues
  issues: {
    total: number
    byCategory: Record<string, number>
    topIssues: Array<{ description: string; count: number }>
  }

  // Trends
  trends: {
    scoreChange: number // vs previous period
    volumeChange: number
  }
}
```

## Aggregation Queries

### packages/db/src/queries/metrics.ts

```typescript
import { db, feedback, outputs, runs, skills, eq, and, gte, sql } from '../index'

/**
 * Get aggregated metrics for a skill
 */
export async function getSkillMetrics(
  skillName: string,
  startDate: Date,
  endDate: Date
): Promise<SkillMetrics> {
  // Get skill
  const skill = await db.query.skills.findFirst({
    where: eq(skills.name, skillName),
  })

  if (!skill) throw new Error(`Skill not found: ${skillName}`)

  // Aggregate scores
  const scoreAgg = await db
    .select({
      avgOverall: sql<number>`AVG(${feedback.overallScore})`,
      avgAccuracy: sql<number>`AVG(${feedback.accuracyScore})`,
      avgQuality: sql<number>`AVG(${feedback.qualityScore})`,
      avgUsefulness: sql<number>`AVG(${feedback.usefulnessScore})`,
      avgRuleCompliance: sql<number>`AVG(${feedback.ruleComplianceScore})`,
      count: sql<number>`COUNT(*)`,
    })
    .from(feedback)
    .innerJoin(outputs, eq(outputs.id, feedback.outputId))
    .innerJoin(runs, eq(runs.id, outputs.runId))
    .where(
      and(
        eq(runs.skillId, skill.id),
        gte(feedback.createdAt, startDate),
        lte(feedback.createdAt, endDate)
      )
    )

  // Aggregate runs
  const runAgg = await db
    .select({
      total: sql<number>`COUNT(*)`,
      completed: sql<number>`COUNT(*) FILTER (WHERE status = 'completed')`,
      failed: sql<number>`COUNT(*) FILTER (WHERE status = 'failed')`,
      avgInputTokens: sql<number>`AVG(tokens_input)`,
      avgOutputTokens: sql<number>`AVG(tokens_output)`,
      totalInputTokens: sql<number>`SUM(tokens_input)`,
      totalOutputTokens: sql<number>`SUM(tokens_output)`,
    })
    .from(runs)
    .where(
      and(
        eq(runs.skillId, skill.id),
        gte(runs.queuedAt, startDate),
        lte(runs.queuedAt, endDate)
      )
    )

  // Aggregate issues
  const issueAgg = await db
    .select({
      issues: feedback.issues,
    })
    .from(feedback)
    .innerJoin(outputs, eq(outputs.id, feedback.outputId))
    .innerJoin(runs, eq(runs.id, outputs.runId))
    .where(
      and(
        eq(runs.skillId, skill.id),
        gte(feedback.createdAt, startDate)
      )
    )

  // Process issues
  const allIssues = issueAgg.flatMap(f => f.issues || [])
  const issuesByDescription = new Map<string, number>()
  const issuesBySeverity: Record<string, number> = { high: 0, medium: 0, low: 0 }

  for (const issue of allIssues) {
    issuesByDescription.set(
      issue.description,
      (issuesByDescription.get(issue.description) || 0) + 1
    )
    issuesBySeverity[issue.severity]++
  }

  const topIssues = Array.from(issuesByDescription.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([description, count]) => ({ description, count }))

  return {
    skillName,
    period: 'custom',
    scores: {
      overall: scoreAgg[0]?.avgOverall || 0,
      accuracy: scoreAgg[0]?.avgAccuracy || 0,
      quality: scoreAgg[0]?.avgQuality || 0,
      usefulness: scoreAgg[0]?.avgUsefulness || 0,
      ruleCompliance: scoreAgg[0]?.avgRuleCompliance || 0,
    },
    volume: {
      totalRuns: runAgg[0]?.total || 0,
      completedRuns: runAgg[0]?.completed || 0,
      failedRuns: runAgg[0]?.failed || 0,
      feedbackCount: scoreAgg[0]?.count || 0,
      feedbackRate: runAgg[0]?.total
        ? (scoreAgg[0]?.count || 0) / runAgg[0].total
        : 0,
    },
    tokens: {
      avgInput: runAgg[0]?.avgInputTokens || 0,
      avgOutput: runAgg[0]?.avgOutputTokens || 0,
      totalInput: runAgg[0]?.totalInputTokens || 0,
      totalOutput: runAgg[0]?.totalOutputTokens || 0,
    },
    issues: {
      total: allIssues.length,
      byCategory: issuesBySeverity,
      topIssues,
    },
    trends: {
      scoreChange: 0, // Calculate from previous period
      volumeChange: 0,
    },
  }
}

/**
 * Get summary metrics across all skills
 */
export async function getSummaryMetrics(
  startDate: Date,
  endDate: Date
): Promise<{
  totalRuns: number
  totalFeedback: number
  avgScore: number
  totalTokens: number
  skillRankings: Array<{ skill: string; avgScore: number; runCount: number }>
}> {
  // Total runs and feedback
  const totals = await db
    .select({
      totalRuns: sql<number>`COUNT(DISTINCT ${runs.id})`,
      totalFeedback: sql<number>`COUNT(DISTINCT ${feedback.id})`,
      avgScore: sql<number>`AVG(${feedback.overallScore})`,
      totalTokens: sql<number>`SUM(${runs.tokensInput} + ${runs.tokensOutput})`,
    })
    .from(runs)
    .leftJoin(outputs, eq(outputs.runId, runs.id))
    .leftJoin(feedback, eq(feedback.outputId, outputs.id))
    .where(
      and(
        gte(runs.queuedAt, startDate),
        lte(runs.queuedAt, endDate)
      )
    )

  // Skill rankings
  const rankings = await db
    .select({
      skillName: skills.name,
      avgScore: sql<number>`AVG(${feedback.overallScore})`,
      runCount: sql<number>`COUNT(DISTINCT ${runs.id})`,
    })
    .from(skills)
    .leftJoin(runs, eq(runs.skillId, skills.id))
    .leftJoin(outputs, eq(outputs.runId, runs.id))
    .leftJoin(feedback, eq(feedback.outputId, outputs.id))
    .where(
      and(
        gte(runs.queuedAt, startDate),
        lte(runs.queuedAt, endDate)
      )
    )
    .groupBy(skills.name)
    .orderBy(sql`AVG(${feedback.overallScore}) DESC NULLS LAST`)

  return {
    totalRuns: totals[0]?.totalRuns || 0,
    totalFeedback: totals[0]?.totalFeedback || 0,
    avgScore: totals[0]?.avgScore || 0,
    totalTokens: totals[0]?.totalTokens || 0,
    skillRankings: rankings.map(r => ({
      skill: r.skillName,
      avgScore: r.avgScore || 0,
      runCount: r.runCount || 0,
    })),
  }
}
```

## Scheduled Aggregation

Run daily aggregation via Inngest:

```typescript
// packages/inngest-functions/src/metrics-aggregate.ts

import { inngest } from './client'
import { getSkillMetrics, saveDailyMetrics } from '@marketing-agent/db'

export const metricsAggregateFunction = inngest.createFunction(
  {
    id: 'metrics-aggregate',
    retries: 2,
  },
  { cron: '0 0 * * *' }, // Daily at midnight
  async ({ step }) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Get all skills
    const skills = await step.run('get-skills', async () => {
      return await db.query.skills.findMany({
        columns: { name: true },
      })
    })

    // Aggregate each skill
    for (const skill of skills) {
      await step.run(`aggregate-${skill.name}`, async () => {
        const metrics = await getSkillMetrics(skill.name, yesterday, today)
        await saveDailyMetrics(skill.name, yesterday, metrics)
      })
    }

    // Aggregate summary
    await step.run('aggregate-summary', async () => {
      const summary = await getSummaryMetrics(yesterday, today)
      await saveDailySummary(yesterday, summary)
    })

    return { aggregated: skills.length }
  }
)
```

## Metrics API

### GET /metrics/skills/:name

```typescript
app.get('/skills/:name', async (c) => {
  const skillName = c.req.param('name')
  const period = c.req.query('period') || '30d'

  const { startDate, endDate } = parsePeriod(period)
  const metrics = await getSkillMetrics(skillName, startDate, endDate)

  return c.json({
    success: true,
    data: metrics,
  })
})
```

### GET /metrics/summary

```typescript
app.get('/summary', async (c) => {
  const period = c.req.query('period') || '30d'

  const { startDate, endDate } = parsePeriod(period)
  const summary = await getSummaryMetrics(startDate, endDate)

  return c.json({
    success: true,
    data: summary,
  })
})
```

## Metrics Dashboard Data

Structure for visualization:

```typescript
interface DashboardData {
  summary: {
    totalRuns: number
    avgScore: number
    feedbackRate: number
  }

  scoreOverTime: Array<{
    date: string
    avgScore: number
    runCount: number
  }>

  skillPerformance: Array<{
    skill: string
    avgScore: number
    runCount: number
    trend: 'up' | 'down' | 'stable'
  }>

  topIssues: Array<{
    skill: string
    issue: string
    count: number
    severity: string
  }>

  recentFeedback: Array<{
    skill: string
    score: number
    summary: string
    date: string
  }>
}
```

## Alerting

Trigger alerts for concerning metrics:

```typescript
async function checkMetricAlerts(metrics: SkillMetrics) {
  const alerts: string[] = []

  // Low score alert
  if (metrics.scores.overall < 3) {
    alerts.push(`${metrics.skillName}: Average score dropped below 3.0`)
  }

  // High failure rate
  const failureRate = metrics.volume.failedRuns / metrics.volume.totalRuns
  if (failureRate > 0.1) {
    alerts.push(`${metrics.skillName}: Failure rate above 10%`)
  }

  // Many high-severity issues
  if (metrics.issues.byCategory.high > 5) {
    alerts.push(`${metrics.skillName}: Multiple high-severity issues reported`)
  }

  // Send alerts (Slack, email, etc.)
  for (const alert of alerts) {
    await sendAlert(alert)
  }
}
```
