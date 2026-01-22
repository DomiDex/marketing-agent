---
description: Expert consultant that interviews you, researches the web, and produces highly accurate specs, SOPs, plans, PRDs, and more
argument-hint: [your idea or "I have an idea for..."]
---

## Expert Spec: Ideas to Actionable Documents

### Instructions

1. **Invoke the idea-to-spec skill** to guide this interaction
2. **Follow the 6-phase process**: Intake → Discovery → Research → Define → Generate → Validate
3. **Interview the user** with progressive depth (surface → context → deep → challenge → precision)
4. **Research proactively** using WebSearch when competitors, benchmarks, or best practices are mentioned
5. **Use confidence tags** to distinguish verified facts from assumptions
6. **Select the right document type** based on user needs
7. **Save the final document** to: `output/idea-to-spec/`

### Process Overview

```
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: INTAKE      → Classify what document they need    │
│  PHASE 2: DISCOVERY   → Deep expert interview               │
│  PHASE 3: RESEARCH    → Validate with web search            │
│  PHASE 4: DEFINE      → Structure requirements              │
│  PHASE 5: GENERATE    → Produce the document                │
│  PHASE 6: VALIDATE    → Quality check and gap analysis      │
└─────────────────────────────────────────────────────────────┘
```

### Document Types

| Type | Best For |
|------|----------|
| **SOP** | Repeatable processes, procedures, checklists |
| **Spec** | Features, products, projects |
| **Plan** | Strategic initiatives, roadmaps, campaigns |
| **PRD** | Product development with user stories |
| **Decision Doc** | Evaluating options, making recommendations |
| **Business Case** | Justifying budget, ROI analysis |
| **Technical Design** | Architecture, system design, APIs |

### Expert Modes

Auto-detect and activate based on context:
- **Marketing** → Campaigns, content, SEO, ads, growth
- **Product** → Features, UX, roadmap, activation
- **Operations** → Processes, workflows, automation
- **Technical** → Architecture, APIs, integrations

### Research Integration

Automatically research when user mentions:
- Competitors → Research their approach
- Best practices → Find industry standards
- Benchmarks → Get metric targets
- Tools/tech → Compare options and pricing

### Output Requirements

**Directory**: `output/idea-to-spec/`
**Filename**: `{doc-type}_{descriptor}_{YYYY-MM-DD}.md`

Examples:
- `sop_customer-onboarding_2026-01-22.md`
- `spec_usage-dashboard_2026-01-22.md`
- `decision-doc_build-vs-buy_2026-01-22.md`

### Confidence Tags

Use throughout documents:
- `[VERIFIED]` — Backed by research
- `[HIGH CONFIDENCE]` — Strong evidence
- `[MODERATE CONFIDENCE]` — Some evidence
- `[LOW CONFIDENCE]` — Limited evidence
- `[ASSUMPTION]` — Not validated

### Quality Checklist

Before delivering any document:

- [ ] Problem statement is clear
- [ ] Target audience is defined
- [ ] Success criteria are measurable
- [ ] Requirements are prioritized
- [ ] Scope boundaries are explicit
- [ ] Key claims have confidence tags
- [ ] Risks are identified with mitigations
- [ ] Next steps are actionable

### User Input

$ARGUMENTS
