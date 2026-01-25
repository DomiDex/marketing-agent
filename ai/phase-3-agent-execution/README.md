# Phase 3: Agent Execution

Claude Agent SDK integration and Inngest job processing.

## Overview

This phase implements the core skill execution engine using Claude Agent SDK and Inngest for reliable background processing.

## Goals

1. Integrate Claude Agent SDK for skill execution
2. Build context aggregation from S3
3. Implement Inngest functions for job processing
4. Parse and save outputs
5. Track token usage and execution metrics

## Prerequisites

- Phase 1 (database, S3, Docker) complete
- Phase 2 (API endpoints) complete
- Anthropic API key configured
- Inngest configured and running

## Documents

| Document | Purpose |
|----------|---------|
| [agent-executor.md](./agent-executor.md) | Claude Agent SDK integration |
| [inngest-functions.md](./inngest-functions.md) | Background job definitions |
| [context-building.md](./context-building.md) | How context is aggregated |
| [output-parsing.md](./output-parsing.md) | Output extraction and storage |

## Execution Flow

```
1. API receives POST /runs
   └─ Validates input
   └─ Creates run record (status: queued)
   └─ Sends Inngest event

2. Inngest picks up job
   └─ Updates run (status: running)
   └─ Loads skill from S3
   └─ Loads client context from S3
   └─ Builds combined prompt

3. Agent Executor runs
   └─ Calls Claude Agent SDK
   └─ Monitors execution
   └─ Captures output

4. Output Processing
   └─ Parses generated content
   └─ Saves to S3
   └─ Creates output record
   └─ Updates run (status: completed)

5. Callback
   └─ Notifies waiting clients (Telegram, webhooks)
```

## Implementation Order

```
1. Agent Executor Package
   ├─ Claude Agent SDK setup
   ├─ Context builder
   └─ Output parser

2. Inngest Functions
   ├─ skill.execute function
   ├─ skill.retry function
   └─ feedback.process function

3. Integration
   └─ Wire up API → Inngest → Executor → Storage
```

## Verification Checklist

- [ ] Agent SDK authenticates with Anthropic
- [ ] Skills load correctly from S3
- [ ] Client context aggregates properly
- [ ] Inngest processes jobs reliably
- [ ] Outputs save to S3 with correct naming
- [ ] Token usage is tracked
- [ ] Failed jobs retry appropriately

## Dependencies

- Anthropic API key
- S3 bucket with uploaded skills
- Inngest running (local or cloud)
- Database migrations applied

## Packages Used

```json
{
  "dependencies": {
    "@anthropic-ai/claude-agent-sdk": "^0.1.0",
    "inngest": "^3.28.0",
    "@marketing-agent/db": "workspace:*",
    "@marketing-agent/storage": "workspace:*",
    "@marketing-agent/shared": "workspace:*"
  }
}
```

## Environment Variables

```bash
# Required for this phase
ANTHROPIC_API_KEY=sk-ant-...
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
```

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - System overview
- [Phase 2: Core API](../phase-2-core-api/README.md) - API endpoints
- [Phase 4: Skill Detection](../phase-4-skill-detection/README.md) - How skills are selected
