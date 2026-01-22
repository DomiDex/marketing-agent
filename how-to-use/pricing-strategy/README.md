# /pricing-strategy

Make pricing decisions, design tiers, and plan monetization strategy.

## Overview

**What it does:** Helps with pricing strategy including tier design, packaging, value metrics, freemium vs trial decisions, price increases, and pricing page optimization.

**When to use it:**
- Launching a new product and need pricing
- Restructuring existing pricing tiers
- Deciding between freemium and free trial
- Planning a price increase
- Validating willingness to pay

**What you'll get:**
- Pricing tier recommendations
- Packaging strategy
- Value metric analysis
- Research methodology for validation
- Implementation guidance

---

## How to Invoke

**Command:** `/pricing-strategy`

**Trigger phrases:**
- "Help with pricing..."
- "How should we price..."
- "Pricing tiers..."
- "Freemium or free trial..."
- "Price increase strategy..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Product/service | What you're pricing | "Project management SaaS" |
| Target market | Who you're selling to | "Small teams, SMBs" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Current pricing | If you have any | "$12/user/month" |
| Competitor pricing | Market context | "Asana is $10, Monday is $12" |
| Key features | What to package | "Task boards, reporting, AI" |
| Business model | Revenue goals | "Land and expand," "Enterprise sales" |

---

## Prompt Examples

### Example 1: Basic Pricing Design (Beginner)

```
/pricing-strategy

Help me set pricing for TaskFlow, a project management tool.

Target: Small teams (5-20 people)
Features: Task boards, collaboration, time tracking, AI prioritization
Competitors: Asana ($10/user), Monday ($12/user), Notion ($10/user)
```

**What you'll get:** Recommended tier structure with pricing points and feature packaging.

---

### Example 2: Tier Structure Design (Intermediate)

```
/pricing-strategy

Design pricing tiers for TaskFlow.

Product context:
- Project management tool with AI prioritization
- Target: Startups and SMBs (5-100 employees)
- Key differentiator: AI tells users what to focus on

Features to package:
- Task boards and project views
- Team collaboration and chat
- Time tracking
- Reporting and analytics
- AI task prioritization
- Integrations (50+)
- Admin controls and SSO
- Custom workflows
- API access

Competitors:
- Asana: Free / Premium ($10.99) / Business ($24.99) / Enterprise
- Monday: Free / Basic ($9) / Standard ($12) / Pro ($19) / Enterprise

Goals:
- 3-4 tiers including free
- Clear upgrade path
- Enterprise tier for larger deals
```

**What you'll get:** Complete tier structure with feature allocation and pricing logic.

---

### Example 3: Freemium vs Free Trial Decision (Strategic)

```
/pricing-strategy

Should TaskFlow offer freemium or free trial?

Current situation:
- New product, launching soon
- Target: Small teams at startups
- Want to grow user base quickly
- Also need revenue to sustain

Product characteristics:
- Collaborative (more valuable with team)
- Has clear aha moment (create project + add team)
- Some features are clearly "advanced" (AI, reporting)
- Competitors offer both models

Help us decide:
1. Freemium, free trial, or both?
2. If freemium: What limits?
3. If trial: How long? What's included?
```

**What you'll get:** Decision framework with pros/cons and specific recommendation.

---

### Example 4: Price Increase Strategy (Existing Product)

```
/pricing-strategy

Plan a price increase for TaskFlow.

Current pricing:
- Pro: $10/user/month → want to move to $15
- Team: $20/user/month → want to move to $30
- ~2,000 paying customers

Context:
- Haven't raised prices in 3 years
- Added significant features (AI, integrations)
- Customer feedback is very positive

Questions:
1. How much can we increase without major churn?
2. Should we grandfather existing customers?
3. How to communicate the increase?
```

**What you'll get:** Price increase strategy with communication plan and churn mitigation.

---

### Example 5: Value Metric Analysis (Packaging)

```
/pricing-strategy

Help us choose the right value metric for TaskFlow pricing.

Options we're considering:
1. Per user (current)
2. Per project
3. Flat tier (unlimited users at tier price)
4. Per active user (usage-based)

Product context:
- Project management for teams
- More users = more value
- Some teams have many viewers, few editors
- Competitors mostly use per-user

What's the right value metric for us?
```

**What you'll get:** Value metric analysis with recommendation for your product.

---

### Example 6: Pricing Research Plan (Validation)

```
/pricing-strategy

Design a pricing research plan for TaskFlow.

Context:
- We're launching new AI features
- Considering raising prices 30%
- Want to validate willingness to pay
- Have access to ~500 existing customers

Research questions:
1. What's the maximum price we can charge?
2. How do different segments value different features?
3. How sensitive are users to price increases?

Design a research plan with specific questions to ask.
```

**What you'll get:** Complete research methodology with survey questions and analysis framework.

---

## Sample Output Preview

```markdown
## Pricing Strategy: TaskFlow

### Recommended Tier Structure

| Tier | Price | Target | Key Features |
|------|-------|--------|--------------|
| Free | $0 | Individuals trying out | 3 projects, 1 user, basic |
| Pro | $14/user/mo | Growing teams | Unlimited projects, AI, integrations |
| Team | $24/user/mo | Larger teams | + Reporting, time tracking, admin |
| Enterprise | Custom | 100+ employees | + SSO, API, SLA |

### Pricing Rationale

**Why $14/user for Pro (not $10):**
- AI prioritization is genuine differentiator
- Competitors at $10-12 don't have comparable AI
- Room for annual discount (15% → $11.90/user)

### Feature Packaging

**Free → Pro upgrade triggers:**
- Hit 3 project limit
- Want AI prioritization
- Need integrations
```

---

## Tips for Best Results

### Do This
- **Share competitor pricing** — Essential for positioning
- **Describe your target market** — SMB vs enterprise changes everything
- **Include current pricing** — If optimizing existing pricing
- **Explain features to package** — What goes in each tier?

### Avoid This
- **Pricing in isolation** — Always consider packaging together
- **Ignoring competition** — Market sets expectations
- **Overcomplicating tiers** — 3-4 tiers is usually optimal

### Pro Tips
1. **Test before launching** — Use pricing research to validate
2. **Consider annual first** — Lock in customers, improve cash flow
3. **Plan for increases** — Leave room to grow

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/page-cro` | When optimizing pricing page conversion |
| `/copywriting` | When writing pricing page copy |
| `/ab-test-setup` | When testing pricing changes |
| `/competitor-research` | When researching competitor pricing |

---

## Quick Reference

```
/pricing-strategy

Product: [What you're pricing]
Market: [Who you're selling to]

Current state:
- Pricing: [Current tiers if any]
- Competitors: [What they charge]

Goals:
- [What you're trying to solve]

Features to package:
- [List key features]
```
