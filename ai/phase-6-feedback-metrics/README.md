# Phase 6: Feedback & Metrics

Continuous improvement system.

## Overview

This phase implements the feedback loop that enables continuous skill improvement based on user feedback and execution metrics.

## Goals

1. Implement feedback schema aligned with existing template
2. Build metrics aggregation for skills
3. Create improvement workflow integration
4. Track execution performance

## Prerequisites

- Phase 1-5 complete
- Feedback collection working
- Outputs being stored

## Documents

| Document | Purpose |
|----------|---------|
| [feedback-schema.md](./feedback-schema.md) | Feedback data structure aligned with template |
| [metrics-aggregation.md](./metrics-aggregation.md) | Per-skill metrics calculation |
| [improvement-workflow.md](./improvement-workflow.md) | Feedback → skill improvement process |

## System Overview

```
Feedback Collection
        │
        ▼
┌───────────────────┐
│  Database Store   │
│                   │
│  - ratings        │
│  - issues         │
│  - suggestions    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Metrics Engine   │
│                   │
│  - avg scores     │
│  - issue patterns │
│  - token usage    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Improvement      │
│  Workflow         │
│                   │
│  - identify gaps  │
│  - update rules   │
│  - track changes  │
└───────────────────┘
```

## Implementation Order

```
1. Feedback Schema
   ├─ Database tables
   ├─ API endpoints
   └─ Validation schemas

2. Metrics Aggregation
   ├─ Score calculations
   ├─ Issue pattern detection
   └─ Token usage tracking

3. Improvement Integration
   └─ Connect to existing workflow
```

## Verification Checklist

- [ ] Feedback saves correctly
- [ ] Scores aggregate accurately
- [ ] Issue patterns are detected
- [ ] Metrics dashboard shows data
- [ ] Improvement workflow can access data

## Dependencies

- Feedback collection from Phase 5
- Database from Phase 1
- Existing workflow at `workflows/skill-improvement.md`

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - System overview
- [Phase 5: Telegram Bot](../phase-5-telegram-bot/README.md) - Feedback collection
- [workflows/skill-improvement.md](../../workflows/skill-improvement.md) - Existing workflow
