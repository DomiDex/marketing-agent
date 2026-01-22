---
description: Plan and coordinate content across channels - calendars, campaigns, batch planning
argument-hint: [type, e.g., "monthly calendar for February" or "product launch campaign"]
---

## Content Calendar Command

### Instructions

1. **Invoke the content-calendar skill** to guide this interaction
2. **Determine planning scope** (calendar, campaign, batch, pillars)
3. **Gather context** about goals, channels, and resources
4. **Coordinate with related skills** as needed:
   - `/copywriting` for web content
   - `/email-sequence` for email content
   - `/social-content` for social content
5. **Save all outputs** to: `output/content-calendar/`

### Output Requirements

**Directory**: `output/content-calendar/`

**Filenames by type**:
- `calendar_{client}_{month-year}_{YYYY-MM-DD}.md`
- `campaign_{client}_{name}_{YYYY-MM-DD}.md`
- `batch-plan_{client}_{theme}_{YYYY-MM-DD}.md`
- `pillars_{client}_{YYYY-MM-DD}.md`

### Planning Types

| Type | Use Case | Output |
|------|----------|--------|
| **Calendar** | Monthly/weekly planning | Full content calendar |
| **Campaign** | Multi-channel coordination | Campaign plan with timeline |
| **Batch** | Efficient content generation | Skill-chained content queue |
| **Pillars** | Strategic theme definition | Content pillar framework |

### Skill Chaining

After planning, execute content generation:
1. `/copywriting` — Web content (blogs, landing pages)
2. `/email-sequence` — Email campaigns
3. `/social-content` — Social posts

### User Input

$ARGUMENTS
