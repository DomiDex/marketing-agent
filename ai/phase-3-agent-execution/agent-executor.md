# Agent Executor

Claude Agent SDK integration for skill execution.

## Overview

The Agent Executor wraps Claude Agent SDK to execute marketing skills with appropriate context and tooling.

## Claude Agent SDK Setup

### packages/agent-executor/src/client.ts

```typescript
import Anthropic from '@anthropic-ai/sdk'

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export { anthropic }
```

### packages/agent-executor/src/executor.ts

```typescript
import { anthropic } from './client'
import { buildContext } from './context'
import { parseOutput } from './parser'
import { getSkillContent } from '@marketing-agent/storage'
import { getClientContext } from '@marketing-agent/storage'
import type { SkillContent, ClientContext } from '@marketing-agent/storage'

export interface ExecutionInput {
  skillName: string
  userMessage: string
  clientSlug?: string
  options?: Record<string, unknown>
}

export interface ExecutionResult {
  success: boolean
  output?: string
  tokensInput: number
  tokensOutput: number
  error?: string
}

/**
 * Execute a skill using Claude Agent SDK
 */
export async function executeSkill(input: ExecutionInput): Promise<ExecutionResult> {
  const { skillName, userMessage, clientSlug, options } = input

  try {
    // 1. Load skill content from S3
    const skillContent = await getSkillContent(skillName)

    // 2. Load client context if specified
    let clientContext: ClientContext | undefined
    if (clientSlug) {
      clientContext = await getClientContext(clientSlug)
    }

    // 3. Build the combined prompt
    const prompt = buildContext({
      skillContent,
      clientContext,
      userMessage,
      options,
    })

    // 4. Execute with Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      // Enable tools for skills that need web access
      tools: getToolsForSkill(skillName),
    })

    // 5. Extract text content
    const textContent = response.content.find(block => block.type === 'text')
    const output = textContent?.text || ''

    // 6. Parse and validate output
    const parsedOutput = await parseOutput(output, skillName)

    return {
      success: true,
      output: parsedOutput,
      tokensInput: response.usage.input_tokens,
      tokensOutput: response.usage.output_tokens,
    }

  } catch (error) {
    console.error('Skill execution failed:', error)

    return {
      success: false,
      tokensInput: 0,
      tokensOutput: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get available tools based on skill requirements
 */
function getToolsForSkill(skillName: string): Anthropic.Tool[] {
  // Skills that need web research
  const webResearchSkills = [
    'competitor-research',
    'seo-audit',
    'customer-research',
    'idea-to-spec',
    'blog-strategy',
  ]

  if (webResearchSkills.includes(skillName)) {
    return [
      {
        name: 'web_search',
        description: 'Search the web for current information',
        input_schema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'web_fetch',
        description: 'Fetch content from a URL',
        input_schema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to fetch',
            },
          },
          required: ['url'],
        },
      },
    ]
  }

  // Default: no tools
  return []
}
```

## Tool Execution Handler

When Claude requests tool use, handle it:

```typescript
// packages/agent-executor/src/tools.ts
import { anthropic } from './client'

export interface ToolResult {
  tool_use_id: string
  content: string
}

/**
 * Handle tool calls from Claude
 */
export async function handleToolCalls(
  toolUse: Anthropic.ToolUseBlock
): Promise<ToolResult> {
  switch (toolUse.name) {
    case 'web_search':
      return await handleWebSearch(toolUse)
    case 'web_fetch':
      return await handleWebFetch(toolUse)
    default:
      return {
        tool_use_id: toolUse.id,
        content: `Unknown tool: ${toolUse.name}`,
      }
  }
}

async function handleWebSearch(toolUse: Anthropic.ToolUseBlock): Promise<ToolResult> {
  const { query } = toolUse.input as { query: string }

  // Use a search API (e.g., SerpAPI, Brave Search)
  // For now, return placeholder
  const results = await performWebSearch(query)

  return {
    tool_use_id: toolUse.id,
    content: JSON.stringify(results),
  }
}

async function handleWebFetch(toolUse: Anthropic.ToolUseBlock): Promise<ToolResult> {
  const { url } = toolUse.input as { url: string }

  try {
    const response = await fetch(url)
    const text = await response.text()

    // Truncate if too long
    const maxLength = 50000
    const content = text.length > maxLength
      ? text.slice(0, maxLength) + '\n\n[Content truncated]'
      : text

    return {
      tool_use_id: toolUse.id,
      content,
    }
  } catch (error) {
    return {
      tool_use_id: toolUse.id,
      content: `Failed to fetch URL: ${error}`,
    }
  }
}

// Placeholder for web search implementation
async function performWebSearch(query: string) {
  // Implement with your preferred search API
  return {
    query,
    results: [
      { title: 'Search Result 1', url: 'https://example.com/1', snippet: '...' },
    ],
  }
}
```

## Multi-Turn Execution

For complex skills that need multiple tool calls:

```typescript
// packages/agent-executor/src/executor.ts

/**
 * Execute with multi-turn tool handling
 */
export async function executeWithTools(input: ExecutionInput): Promise<ExecutionResult> {
  const { skillName, userMessage, clientSlug, options } = input

  try {
    const skillContent = await getSkillContent(skillName)
    let clientContext: ClientContext | undefined
    if (clientSlug) {
      clientContext = await getClientContext(clientSlug)
    }

    const prompt = buildContext({ skillContent, clientContext, userMessage, options })
    const tools = getToolsForSkill(skillName)

    // Track total tokens
    let totalInputTokens = 0
    let totalOutputTokens = 0

    // Build conversation
    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: prompt },
    ]

    // Maximum iterations to prevent infinite loops
    const maxIterations = 10
    let iteration = 0

    while (iteration < maxIterations) {
      iteration++

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        messages,
        tools,
      })

      totalInputTokens += response.usage.input_tokens
      totalOutputTokens += response.usage.output_tokens

      // Check if we're done (no more tool use)
      if (response.stop_reason === 'end_turn') {
        const textContent = response.content.find(block => block.type === 'text')
        const output = textContent?.text || ''

        return {
          success: true,
          output: await parseOutput(output, skillName),
          tokensInput: totalInputTokens,
          tokensOutput: totalOutputTokens,
        }
      }

      // Handle tool use
      if (response.stop_reason === 'tool_use') {
        const toolUseBlocks = response.content.filter(
          block => block.type === 'tool_use'
        ) as Anthropic.ToolUseBlock[]

        // Add assistant message with tool use
        messages.push({ role: 'assistant', content: response.content })

        // Execute tools and gather results
        const toolResults: Anthropic.ToolResultBlockParam[] = await Promise.all(
          toolUseBlocks.map(async (toolUse) => {
            const result = await handleToolCalls(toolUse)
            return {
              type: 'tool_result' as const,
              tool_use_id: result.tool_use_id,
              content: result.content,
            }
          })
        )

        // Add tool results
        messages.push({ role: 'user', content: toolResults })
      }
    }

    // Max iterations reached
    return {
      success: false,
      tokensInput: totalInputTokens,
      tokensOutput: totalOutputTokens,
      error: 'Maximum iterations reached',
    }

  } catch (error) {
    console.error('Execution failed:', error)
    return {
      success: false,
      tokensInput: 0,
      tokensOutput: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

## Streaming Support (Future)

For real-time updates to clients:

```typescript
export async function* executeSkillStreaming(
  input: ExecutionInput
): AsyncGenerator<{ type: 'text' | 'done'; content: string }> {
  const skillContent = await getSkillContent(input.skillName)
  const prompt = buildContext({ skillContent, userMessage: input.userMessage })

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  })

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      yield { type: 'text', content: event.delta.text }
    }
  }

  yield { type: 'done', content: '' }
}
```

## Error Handling

```typescript
// packages/agent-executor/src/errors.ts

export class ExecutionError extends Error {
  constructor(
    message: string,
    public code: string,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = 'ExecutionError'
  }
}

export function handleAnthropicError(error: unknown): ExecutionError {
  if (error instanceof Anthropic.APIError) {
    // Rate limit
    if (error.status === 429) {
      return new ExecutionError(
        'Rate limit exceeded. Please try again later.',
        'RATE_LIMIT',
        true
      )
    }

    // Overloaded
    if (error.status === 529) {
      return new ExecutionError(
        'Service temporarily overloaded. Please try again.',
        'OVERLOADED',
        true
      )
    }

    // Invalid request
    if (error.status === 400) {
      return new ExecutionError(
        `Invalid request: ${error.message}`,
        'INVALID_REQUEST',
        false
      )
    }

    // Authentication
    if (error.status === 401) {
      return new ExecutionError(
        'Authentication failed. Check API key.',
        'AUTH_ERROR',
        false
      )
    }
  }

  // Unknown error
  return new ExecutionError(
    error instanceof Error ? error.message : 'Unknown error',
    'UNKNOWN',
    true
  )
}
```

## Configuration

```typescript
// packages/agent-executor/src/config.ts

export interface ExecutorConfig {
  model: string
  maxTokens: number
  temperature?: number
  maxIterations: number
  timeoutMs: number
}

export const defaultConfig: ExecutorConfig = {
  model: 'claude-sonnet-4-20250514',
  maxTokens: 8192,
  temperature: 0.7,
  maxIterations: 10,
  timeoutMs: 120000, // 2 minutes
}

// Per-skill configuration overrides
export const skillConfigs: Record<string, Partial<ExecutorConfig>> = {
  'idea-to-spec': {
    maxTokens: 16384, // Longer outputs
    maxIterations: 15, // More research
    timeoutMs: 300000, // 5 minutes
  },
  'copywriting': {
    temperature: 0.8, // More creative
  },
  'seo-audit': {
    maxIterations: 20, // Many pages to analyze
  },
}

export function getConfigForSkill(skillName: string): ExecutorConfig {
  return {
    ...defaultConfig,
    ...skillConfigs[skillName],
  }
}
```

## Usage Example

```typescript
import { executeSkill } from '@marketing-agent/agent-executor'

const result = await executeSkill({
  skillName: 'copywriting',
  userMessage: 'Write homepage copy for a B2B SaaS product that helps teams manage their workflows',
  clientSlug: 'yaz-automate',
  options: {
    tone: 'professional',
    includeAlternatives: true,
  },
})

if (result.success) {
  console.log('Generated output:', result.output)
  console.log('Tokens used:', result.tokensInput + result.tokensOutput)
} else {
  console.error('Execution failed:', result.error)
}
```
