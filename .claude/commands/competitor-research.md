---
description: Research and analyze competitors - profiles, battlecards, win/loss analysis, market landscape
argument-hint: [type, e.g., "battlecard for Slack" or "market landscape for project management"]
---

## Competitor Research Command

### Instructions

1. **Invoke the competitor-research skill** to guide this interaction
2. **Determine research type** (profile, battlecard, landscape, win/loss, monitoring)
3. **Gather necessary context** about client and competitors
4. **Follow the skill's frameworks** for structured research
5. **Save all outputs** to: `output/competitor-research/`

### Output Requirements

**Directory**: `output/competitor-research/`

**Filenames by type**:
- `competitor-profile_{competitor}_{YYYY-MM-DD}.md`
- `battlecard_{competitor}_{YYYY-MM-DD}.md`
- `market-landscape_{industry}_{YYYY-MM-DD}.md`
- `win-loss_{descriptor}_{YYYY-MM-DD}.md`
- `monitoring-report_{period}_{YYYY-MM-DD}.md`

### Research Types

| Type | Use Case | Output |
|------|----------|--------|
| **Profile** | Deep-dive on one competitor | Full competitor profile |
| **Battlecard** | Sales enablement | Quick-reference sales document |
| **Landscape** | Market overview | Segment analysis + positioning map |
| **Win/Loss** | Deal analysis | Decision factors + recommendations |
| **Monitoring** | Ongoing tracking | Setup or periodic report |

### User Input

$ARGUMENTS
