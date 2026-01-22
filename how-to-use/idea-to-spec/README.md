# /idea-to-spec

Expert consultant that interviews you, researches the web, and produces highly accurate specs, SOPs, plans, PRDs, decision docs, business cases, and technical designs.

---

## Overview

**What it does:** An expert-level consulting experience that:
1. Interviews you with progressive depth (surface → context → deep → challenge → precision)
2. Automatically researches competitors, benchmarks, and best practices via web search
3. Produces highly accurate documents with confidence indicators
4. Validates completeness and flags gaps

**When to use it:**
- You have a rough idea that needs to be fleshed out
- Starting a new project, feature, or initiative
- Need to document a process (SOP)
- Making a build vs buy decision
- Justifying budget or resources
- Planning an architecture or system

**What you'll get:**
- Clear problem statement and goals
- Research-backed requirements with confidence tags
- Prioritized scope (Must/Should/Could/Won't)
- Risk assessment with mitigations
- Actionable implementation plan
- Quality-validated document

---

## Document Types

| Type | Best For | Example Use Case |
|------|----------|------------------|
| **SOP** | Repeatable processes | "Document our customer onboarding process" |
| **Spec** | Features/products | "Spec out a usage dashboard feature" |
| **Plan** | Strategic initiatives | "Plan our Q2 marketing campaign" |
| **PRD** | Product development | "Create a PRD for the new checkout flow" |
| **Decision Doc** | Evaluating options | "Should we build or buy email infrastructure?" |
| **Business Case** | Justifying investment | "Justify budget for a new CRM tool" |
| **Technical Design** | Architecture | "Design the API for our integrations" |

---

## How to Invoke

**Command:** `/idea-to-spec`

**Trigger phrases:**
- "I have an idea for..."
- "Help me brainstorm..."
- "Spec this out..."
- "Help me think through..."
- "Create an SOP for..."
- "Help me decide between..."
- "I need to justify budget for..."

---

## The 6-Phase Process

### Phase 1: INTAKE
Claude classifies what document you need and activates the right expert mode.

### Phase 2: DISCOVERY
Deep expert interview with progressive questioning:
- **Surface**: What are you trying to accomplish?
- **Context**: What triggered this? What have you tried?
- **Depth**: The 5 Whys — digging to root causes
- **Challenge**: What assumptions might be wrong?
- **Precision**: Exact success criteria and constraints

### Phase 3: RESEARCH
Automatic web search when you mention:
- Competitors → Researches their approach
- Best practices → Finds industry standards
- Benchmarks → Gets metric targets
- Tools → Compares options and pricing

### Phase 4: DEFINE
Requirements structured with MoSCoW prioritization and confidence tags.

### Phase 5: GENERATE
Produces the appropriate document using proven templates.

### Phase 6: VALIDATE
Quality check ensuring completeness, accuracy, and actionability.

---

## Prompt Examples

### Example 1: SOP for a Process

```
/idea-to-spec

I need to document our customer onboarding process. Right now it's in people's heads and new hires struggle to learn it.
```

**What happens:**
- Claude classifies as SOP
- Activates Operations expert mode
- Asks about current process steps, pain points, who's involved
- Researches onboarding best practices
- Produces comprehensive SOP with steps, owners, exceptions, metrics

---

### Example 2: Feature Specification

```
/idea-to-spec

I want to add a usage dashboard to our SaaS product.

Context:
- Customers keep asking support "how much am I using?"
- We have the data but it's not exposed
- Target users are team admins
```

**What happens:**
- Claude classifies as Spec
- Activates Product expert mode
- Digs into user needs, success metrics, MVP scope
- Researches competitor dashboards
- Produces detailed spec with requirements, user flows, tech considerations

---

### Example 3: Decision Document (Build vs Buy)

```
/idea-to-spec

Should we build our own email marketing system or use something like Klaviyo?

Context:
- Currently using Mailchimp ($500/mo)
- Pain: Limited automation, can't customize templates
- We have engineering capacity
- Budget: Up to $50K build or $1K/mo for tool
```

**What happens:**
- Claude classifies as Decision Doc
- Researches Klaviyo, alternatives, pricing
- Evaluates build effort and costs
- Produces decision matrix with recommendation

---

### Example 4: Business Case

```
/idea-to-spec

I need to justify budget for implementing HubSpot as our CRM.

Context:
- Currently using spreadsheets for sales tracking
- Sales team of 5 people
- Losing deals due to poor follow-up
- Budget discussion with CEO next week
```

**What happens:**
- Claude classifies as Business Case
- Asks about current costs, expected benefits, alternatives
- Researches HubSpot pricing, ROI benchmarks
- Produces business case with ROI analysis, risk assessment

---

### Example 5: Technical Design

```
/idea-to-spec

I need to design the API architecture for our third-party integrations.

Context:
- Python/Django backend
- Need to support Zapier, Salesforce, HubSpot
- Current: No API, only UI
- Security is critical (SOC2 compliance)
```

**What happens:**
- Claude classifies as Technical Design
- Activates Technical expert mode
- Asks about performance requirements, data models, security needs
- Researches API best practices, OAuth standards
- Produces technical design with architecture, endpoints, security

---

### Example 6: Marketing Campaign Plan

```
/idea-to-spec

I want to plan a Product Hunt launch for our SaaS.

Context:
- B2B project management tool
- Never done PH before
- Launch target: 6 weeks out
- Goal: 500 signups
```

**What happens:**
- Claude classifies as Plan
- Activates Marketing expert mode
- Asks about product readiness, existing audience, content assets
- Researches successful PH launches, best practices
- Produces launch plan with phases, content, timeline

---

## Confidence Tags

Throughout documents, Claude uses confidence tags:

| Tag | Meaning |
|-----|---------|
| `[VERIFIED]` | Backed by web research, multiple sources |
| `[HIGH CONFIDENCE]` | Strong evidence from reliable source |
| `[MODERATE CONFIDENCE]` | Some evidence, reasonable inference |
| `[LOW CONFIDENCE]` | Limited evidence, needs validation |
| `[ASSUMPTION]` | User's claim, not externally validated |

**Example in document:**
```markdown
The SaaS industry average for activation rate is 20-40% [VERIFIED - industry benchmark].
Our users prefer mobile over desktop [ASSUMPTION - needs customer research].
```

---

## Expert Modes

Claude auto-detects and activates specialized questioning:

### Marketing Mode
- Triggers on: campaigns, content, SEO, ads, leads, conversion
- Special questions: audience, channels, budget, metrics, competitors

### Product Mode
- Triggers on: features, users, UX, roadmap, MVP
- Special questions: user problem, jobs-to-be-done, success metrics

### Operations Mode
- Triggers on: process, workflow, SOP, efficiency, automation
- Special questions: current state, pain points, future state

### Technical Mode
- Triggers on: architecture, API, database, integration, security
- Special questions: requirements, constraints, scale, failure modes

---

## Tips for Best Results

### Do This
- **Share context freely** — More background = better spec
- **Be honest about constraints** — Budget, timeline, team capacity
- **Mention competitors** — Triggers helpful research
- **State your assumptions** — Claude will validate or challenge

### Avoid This
- **Rushing to solutions** — Let the process explore options
- **Hiding constraints** — Unrealistic specs waste time
- **Being too attached** — Be open to the idea evolving

### Pro Tips
1. **Start vague, get specific** — "I want to do something with AI" is fine
2. **Request research** — "Can you research how Notion does this?"
3. **Challenge back** — "What am I missing?" gets better results
4. **Iterate** — First pass is a draft; refine the spec

---

## Sample Output Preview

```markdown
# Spec: Customer Usage Dashboard

**Confidence Score:** 85% high-confidence

## Overview
A self-serve dashboard for team admins to view account usage metrics.

## Problem Statement
Team admins contact support for usage data, creating overhead and
friction. [VERIFIED - 47% of support tickets are usage-related]

## Goals & Success Criteria
- Primary: Reduce usage support tickets by 50% [Target based on
  industry benchmarks for self-serve tools]
- Secondary: Increase upgrade conversion by 10%

## Requirements

### Must Have (MVP)
| Requirement | Confidence |
|-------------|------------|
| Total active users (DAU/MAU) | [VERIFIED] |
| Storage used vs limit | [VERIFIED] |
| Export to PDF | [HIGH CONFIDENCE] |

### Won't Have
| Excluded | Reason |
|----------|--------|
| Predictive analytics | Complexity, v2 candidate |
| Cross-team comparison | Privacy concerns |

## Research Findings

### Competitor Analysis: Slack
Slack shows workspace analytics including messages sent,
files shared, and active members. Clean design, 7-day
default view. [VERIFIED]

## Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Data accuracy concerns | Reconcile with billing before launch |

## Document Quality
- Completeness: 9/10
- Confidence: 85% high-confidence
- Actionability: 9/10
- Gaps: Legal review for data exposure pending
```

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/customer-research` | Validate assumptions with real users first |
| `/positioning` | Define value proposition and messaging |
| `/pricing-strategy` | Determine pricing and packaging |
| `/launch-strategy` | Plan go-to-market after spec |
| `/competitor-research` | Deep dive on competitive landscape |

---

## Quick Reference

```
/idea-to-spec

[IDEA]: What you want to create or accomplish
[CONTEXT]: Background, constraints, what you've tried
[AUDIENCE]: Who this document is for
[TYPE]: (Optional) SOP/Spec/Plan/PRD/Decision/Business Case/Technical
```

**Output location:** `output/idea-to-spec/`
**Filename format:** `{type}_{name}_{date}.md`
