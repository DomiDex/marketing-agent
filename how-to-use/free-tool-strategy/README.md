# /free-tool-strategy

Plan and build free tools for marketing and lead generation.

## Overview

**What it does:** Helps plan, design, and evaluate free tools (calculators, generators, analyzers) that generate leads, build SEO value, and showcase your product's capabilities.

**When to use it:**
- Brainstorming marketing tool ideas
- Designing a calculator or generator
- Evaluating ROI of building a tool
- Planning lead capture strategy
- Scoping MVP for a marketing tool

**What you'll get:**
- Tool concept recommendations
- Feature scoping and MVP definition
- Lead capture strategy
- SEO and promotion plan
- ROI projection framework

---

## How to Invoke

**Command:** `/free-tool-strategy`

**Trigger phrases:**
- "Build a free tool..."
- "Marketing calculator..."
- "Tool for lead generation..."
- "Engineering as marketing..."
- "Interactive tool for..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Product context | What you sell | "Project management SaaS" |
| Goal | What the tool should achieve | "Lead generation" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Target audience | Who will use it | "Team leads at startups" |
| Resources | What you can build | "1 engineer for 2 weeks" |
| Competitive tools | What exists | "HubSpot has website grader" |

---

## Prompt Examples

### Example 1: Tool Brainstorming (Beginner)

```
/free-tool-strategy

Suggest free tool ideas for TaskFlow.

Product: AI-powered project management for small teams
Audience: Startup team leads
Goal: Lead generation + SEO

Give me 5-10 tool ideas that would attract our target users.
```

**What you'll get:** Curated tool ideas with rationale and complexity estimates.

---

### Example 2: Tool Design (Specific Concept)

```
/free-tool-strategy

Design a "Team Productivity Calculator" for TaskFlow.

Concept:
- User inputs team size, weekly meetings, tools used
- Calculator shows time wasted on coordination
- Provides recommendations (including TaskFlow)

Questions:
1. What inputs should we ask for?
2. What outputs/results should we show?
3. How to make it shareable/viral?
4. How to capture leads without being annoying?
5. What's the MVP vs nice-to-have features?
```

**What you'll get:** Complete tool design with inputs, outputs, and UX flow.

---

### Example 3: Build vs Buy Decision (Evaluation)

```
/free-tool-strategy

Evaluate whether TaskFlow should build a "Project Template Generator."

Concept:
- AI generates project templates based on user input
- User describes their project, gets a ready-to-use template
- Can import directly to TaskFlow (or download as spreadsheet)

Questions:
1. Is this a good idea? (worth the investment)
2. What would it cost to build? (rough estimate)
3. What traffic/leads can we expect?
4. Are there existing tools we'd compete with?
5. MVP scope vs full vision?

Resources available: 1 engineer, 4 weeks
```

**What you'll get:** ROI evaluation with recommendation.

---

### Example 4: Lead Capture Strategy (Gating)

```
/free-tool-strategy

Design lead capture for TaskFlow's free productivity audit tool.

Tool: Automated audit that analyzes team's tool stack and gives productivity score
Already built, now need to optimize conversion

Current: Tool is fully ungated, no email required
Problem: Getting traffic but no leads

Options to consider:
1. Gate completely (email to use)
2. Partial gate (basic results free, detailed report gated)
3. Gate on save/share
4. Optional gate with incentive

What's the best approach for B2B lead gen?
```

**What you'll get:** Gating strategy with conversion optimization.

---

### Example 5: SEO Strategy for Tool (Promotion)

```
/free-tool-strategy

Create SEO and promotion strategy for TaskFlow's "Meeting Cost Calculator."

Tool: Calculates how much meetings cost in hourly wages
Target keywords: "meeting cost calculator", "meeting ROI"
Goal: Organic traffic + leads

Questions:
1. How to optimize the tool page for SEO?
2. What content should surround the tool?
3. Link building opportunities?
4. How to get initial traction?
5. Promotion beyond SEO?
```

**What you'll get:** Complete promotion strategy with SEO and distribution.

---

### Example 6: Tool Portfolio Strategy (Multiple Tools)

```
/free-tool-strategy

Plan a portfolio of free tools for TaskFlow marketing.

Goals:
- Build 3-5 tools over next 12 months
- Each serves different keyword/audience
- Collectively drive 5,000 leads/year

Current resources:
- 1 engineer (50% time)
- 1 designer (25% time)
- $5K/year for infrastructure

For the portfolio:
1. Which tools should we build? (prioritized list)
2. How do they work together?
3. Shared infrastructure/components?
4. Rollout timeline?
5. Expected results per tool?
```

**What you'll get:** Tool portfolio roadmap with prioritization and timeline.

---

## Sample Output Preview

```markdown
## Free Tool Strategy: Team Productivity Calculator

### Tool Overview
**Name:** Team Productivity Calculator
**Concept:** Calculate time/money wasted on team coordination
**Target keyword:** "team productivity calculator"
**Expected traffic:** 500-1,500/month (long-tail)
**Expected leads:** 50-150/month (10% conversion)

---

### Tool Flow

**Step 1: Team Info**
- Team size (number input)
- Average hourly rate (slider: $25-150)
- Industry (dropdown: Tech, Agency, etc.)

**Step 2: Communication**
- Weekly meetings (number)
- Average meeting duration (dropdown)
- # of Slack/Teams channels
- Daily emails about work coordination

**Step 3: Tools**
- How many tools for project management? (1-5+)
- Time spent switching between tools daily

**Step 4: Results**
Show:
- Hours wasted per week (calculated)
- Dollar cost per month
- Comparison to benchmark
- Top 3 recommendations

---

### Lead Capture Strategy

**Approach:** Partial gate

**Free (no email):**
- Basic results (hours wasted, dollar cost)
- General recommendations

**Gated (email required):**
- Detailed breakdown by category
- Personalized recommendations
- PDF report to share with team
- Industry benchmark comparison

**CTA after results:**
"See how TaskFlow can save your team 5+ hours/week"
→ Free trial

---

### MVP Scope (2 weeks)

**Include:**
- 4 input fields (team size, meetings, tools, rate)
- Basic calculation and results
- Email gate for detailed report
- Mobile-responsive design

**Defer:**
- PDF export
- Share/embed functionality
- Industry benchmarks
- Saved results

---

### SEO Strategy

**Primary page:**
`taskflow.com/tools/productivity-calculator`

**Supporting content:**
- Blog post: "How to Calculate Team Productivity Cost"
- Blog post: "5 Signs Your Team Needs Better Tools"
- Landing page: "Team Productivity Benchmarks by Industry"

**Internal linking:**
- Link from blog posts to calculator
- Link from calculator results to related content
```

---

## Tips for Best Results

### Do This
- **Solve a real problem** — Useful tools get shared and linked
- **Keep it simple** — Start with 3-5 inputs, not 15
- **Make it shareable** — Results should be share-worthy
- **Connect to your product** — Subtle path to trial

### Avoid This
- **Building what exists** — Check competitors first
- **Over-scoping** — MVP first, enhance later
- **Hard gating everything** — Partial gates convert better
- **Forgetting SEO** — Build content around the tool

### Pro Tips
1. **Embed in content** — Tools in blog posts outperform standalone
2. **Make results visual** — Charts and graphics get shared
3. **Plan for updates** — Tools need maintenance
4. **Promote launch** — Tools don't go viral on their own

---

## Tool Types

| Type | Example | Complexity | SEO Value |
|------|---------|------------|-----------|
| Calculator | ROI calculator, meeting cost | Low | High |
| Generator | Template generator, headline ideas | Medium | High |
| Analyzer | Website audit, productivity score | Medium | High |
| Tester | Speed test, compatibility check | Low | Medium |
| Library | Template gallery, example database | High | Very High |
| Interactive | Assessment, quiz | Medium | Medium |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/seo-audit` | When optimizing tool page SEO |
| `/copywriting` | When writing tool page copy |
| `/page-cro` | When optimizing tool conversion |
| `/analytics-tracking` | When setting up tool measurement |

---

## Quick Reference

```
/free-tool-strategy

Product: [What you sell]
Audience: [Who will use the tool]
Goal: [Lead gen, SEO, brand awareness]

Tool concept: [If you have one]
Or: Looking for ideas

Resources:
- Engineering: [Time available]
- Design: [Time available]
- Budget: [For hosting, etc.]

Include:
- Tool design/inputs/outputs
- Lead capture strategy
- MVP scoping
- SEO/promotion plan
- ROI estimate
```
