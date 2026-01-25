# Phase 4: Skill Detection

Automatic skill selection from user messages.

## Overview

This phase implements intelligent skill detection that automatically identifies the appropriate skill from natural language user messages.

## Goals

1. Implement direct command matching (`/copywriting`)
2. Build keyword-based detection from skill descriptions
3. Add Claude Haiku fallback for ambiguous requests
4. Extract additional parameters (client, output type)

## Prerequisites

- Phase 1-3 complete
- Skills uploaded to S3
- Skills seeded to database with trigger keywords

## Documents

| Document | Purpose |
|----------|---------|
| [detection-algorithm.md](./detection-algorithm.md) | Multi-stage detection flow |
| [keyword-mapping.md](./keyword-mapping.md) | All 37 skills with trigger keywords |
| [claude-fallback.md](./claude-fallback.md) | When and how to use Claude disambiguation |

## Detection Flow

```
User Message: "Write homepage copy for Yaz Automate"
                    │
                    ▼
┌───────────────────────────────────────┐
│         Stage 1: Direct Command        │
│                                        │
│  Check for /skillname prefix          │
│  "/copywriting" → copywriting          │
│                                        │
│  Result: No match                      │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│         Stage 2: Keyword Match         │
│                                        │
│  Match against triggerKeywords         │
│  "homepage copy" → copywriting (0.92)  │
│  "write" → copywriting (0.70)          │
│                                        │
│  Result: copywriting (confidence 0.92) │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│        Stage 3: Confidence Check       │
│                                        │
│  If confidence >= 0.7 → Execute        │
│  If confidence < 0.7 → Claude Fallback │
│                                        │
│  Result: Execute (0.92 >= 0.7)         │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│       Stage 4: Extract Parameters      │
│                                        │
│  Client: "yaz-automate" (from message) │
│  Type: "homepage" (from message)       │
│                                        │
└───────────────────────────────────────┘
```

## Implementation Order

```
1. Keyword Mapping
   └─ Extract keywords from all 37 SKILL.md files

2. Matcher Implementation
   ├─ Direct command matching
   ├─ Keyword scoring
   └─ Confidence calculation

3. Claude Fallback
   └─ Disambiguation prompt for low-confidence matches

4. Parameter Extraction
   └─ Client and output type extraction
```

## Verification Checklist

- [ ] Direct commands work (`/copywriting` → copywriting)
- [ ] Keywords match correctly
- [ ] Confidence scores are reasonable
- [ ] Claude fallback triggers when appropriate
- [ ] Client extraction works
- [ ] Ambiguous requests show options

## Dependencies

- Skills in database with triggerKeywords populated
- Anthropic API key for Claude fallback

## Packages Used

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.35.0",
    "@marketing-agent/shared": "workspace:*",
    "@marketing-agent/db": "workspace:*"
  }
}
```

## Related Documentation

- [reference/skill-catalog.md](../reference/skill-catalog.md) - All skills with keywords
- [Phase 3: Agent Execution](../phase-3-agent-execution/README.md) - What happens after detection
