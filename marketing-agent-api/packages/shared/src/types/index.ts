// Core entity types
export type SkillType = 'simple' | 'with_rules' | 'complex'

export type RunStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'

export type ChannelType = 'telegram' | 'slack' | 'web'

export type OutputFormat = 'markdown' | 'json' | 'html'

export type FeedbackSource = 'telegram' | 'web' | 'api'

export type IssueSeverity = 'high' | 'medium' | 'low'

// Database entity interfaces
export interface User {
  id: string
  email: string
  apiKeyHash: string
  apiKeyPrefix: string
  createdAt: Date
  updatedAt: Date
}

export interface UserChannel {
  id: string
  userId: string
  channel: ChannelType
  channelUserId: string
  linkedAt: Date
}

export interface Client {
  id: string
  userId: string
  name: string
  slug: string
  description: string | null
  s3Prefix: string
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  id: string
  name: string
  description: string
  type: SkillType
  s3Key: string
  hasRules: boolean
  hasSubdirectories: boolean
  triggerKeywords: string[]
  relatedSkills: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Run {
  id: string
  userId: string
  skillId: string
  clientId: string | null
  status: RunStatus
  userMessage: string
  inngestEventId: string | null
  tokensInput: number | null
  tokensOutput: number | null
  errorMessage: string | null
  metadata: Record<string, unknown>
  queuedAt: Date
  startedAt: Date | null
  completedAt: Date | null
}

export interface Output {
  id: string
  runId: string
  s3Key: string
  format: OutputFormat
  title: string
  preview: string
  sizeBytes: number
  createdAt: Date
}

export interface FeedbackIssue {
  description: string
  severity: IssueSeverity
  suggestedFix?: string
}

export interface SuggestedRuleChange {
  file: string
  currentRule?: string
  suggestedChange: string
  rationale: string
}

export interface Feedback {
  id: string
  outputId: string
  accuracyScore: number | null
  qualityScore: number | null
  usefulnessScore: number | null
  ruleComplianceScore: number | null
  overallScore: number
  whatWorkedWell: string | null
  issues: FeedbackIssue[]
  suggestedRuleChanges: SuggestedRuleChange[]
  source: FeedbackSource
  reviewerName: string | null
  createdAt: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  requestId?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

// Skill detection types
export interface SkillDetectionResult {
  skill: string
  confidence: number
  method: 'command' | 'keyword' | 'claude'
  parameters: ExtractedParameters
  alternatives: SkillAlternative[]
}

export interface SkillAlternative {
  skill: string
  confidence: number
}

export interface ExtractedParameters {
  clientSlug?: string
  outputType?: string
  additionalContext?: string
}

// Run execution types
export interface RunRequest {
  skillName: string
  message: string
  clientId?: string
  options?: RunOptions
}

export interface RunOptions {
  outputFormat?: OutputFormat
  maxTokens?: number
  temperature?: number
}

export interface RunResult {
  runId: string
  status: RunStatus
  estimatedWaitTime?: number
}

// Metrics types
export interface SkillMetrics {
  skillName: string
  averageAccuracyScore: number
  averageQualityScore: number
  averageUsefulnessScore: number
  averageOverallScore: number
  totalRuns: number
  successRate: number
  averageTokensInput: number
  averageTokensOutput: number
  commonIssues: IssueFrequency[]
}

export interface IssueFrequency {
  description: string
  count: number
  severity: IssueSeverity
}
