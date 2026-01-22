# /sales-enablement

Create sales collateral that helps your team close deals.

## Overview

**What it does:** Creates one-pagers, battlecards, cold email sequences, sales deck outlines, and objection handling scripts.

**When to use it:**
- Arming sales with product one-pagers
- Preparing for competitive deals
- Writing outbound email sequences
- Building objection handling playbooks
- Structuring sales presentations

**What you'll get:**
- Print-ready one-pagers
- Competitive battlecards
- Cold email sequences (3-5 emails)
- Sales deck outlines
- Objection response scripts

---

## How to Invoke

**Command:** `/sales-enablement`

**Trigger phrases:**
- "Create a one-pager for..."
- "Build a battlecard against..."
- "Write cold emails for..."
- "Create objection handling for..."
- "Outline a sales deck for..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Collateral type | What you need | One-pager, battlecard, cold email |
| Target audience | Who it's for | CFOs at mid-market SaaS |
| Product context | What you're selling | Expense management platform |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Competitors | Sharpens positioning | "Main competitor is Expensify" |
| Common objections | Enables specific responses | "They say we're too expensive" |
| Proof points | Adds credibility | "Cut expense processing 80%" |
| Sales motion | Fits the process | "Inbound, 30-day cycle" |

---

## Prompt Examples

### Example 1: Product One-Pager (Beginner)

```
/sales-enablement

Create a one-pager for our product.

Product: TaskFlow - project management for marketing teams
Target: Marketing directors at companies with 50-200 employees
Key benefits:
- Campaign workflow templates
- Real-time collaboration
- Marketing calendar view
```

**What you'll get:** Complete one-pager layout with headline, benefits, how it works section, and social proof area.

---

### Example 2: Competitive Battlecard (Intermediate)

```
/sales-enablement

Create a battlecard against Asana.

Our product: TaskFlow - project management for marketing teams

Why we win:
- Built specifically for marketing workflows (not generic)
- Pre-built campaign templates
- Native integration with marketing tools (HubSpot, etc.)

Why we sometimes lose:
- They have more brand recognition
- Larger customer base (social proof)
- More integrations overall

Common objections:
- "Asana is a known quantity"
- "My team already knows Asana"
- "Asana has more features"

Customers who switched from Asana:
- GrowthCo: Switched because campaign management was painful
- MarketingHQ: Switched for better templates
```

**What you'll get:** Full battlecard with competitor overview, comparison table, why we win/lose sections, and objection handling.

---

### Example 3: Cold Email Sequence (Outbound)

```
/sales-enablement

Create a cold email sequence for outbound prospecting.

Target: VP Marketing at B2B SaaS companies (Series A-C)
Product: TaskFlow - project management for marketing teams
Our differentiator: Only PM tool with built-in campaign templates

Trigger: Companies hiring marketing ops (sign of scaling pains)

We want:
- 4-email sequence over 2 weeks
- First email should be value-first, not pitchy
- Include one case study email
- Final email is a breakup

Tone: Professional but not stiff. Like a helpful peer.
```

**What you'll get:** 4-email sequence with subject lines, body copy, CTAs, and send timing recommendations.

---

### Example 4: Objection Handling Playbook (Advanced)

```
/sales-enablement

Create an objection handling guide for our sales team.

Product: CloudSecure - compliance automation
Target buyers: CISOs and security leaders

Top objections we hear:
1. "We can do this with spreadsheets" (especially smaller companies)
2. "Vanta is cheaper" (competitor comparison)
3. "We need to wait until next audit" (timing)
4. "I need to get buy-in from finance" (authority)
5. "We've never heard of you" (trust/brand)

For each, I need:
- Why they really say this (root cause)
- How to respond (framework)
- Specific talk track
- Proof point to share
```

**What you'll get:** Complete objection playbook with root cause analysis, response frameworks, and word-for-word scripts.

---

### Example 5: Sales Deck Outline (Presentation)

```
/sales-enablement

Create a sales deck outline for demo calls.

Product: DataSync - data integration platform
Target: Data engineering managers at mid-market companies

Typical demo flow:
- 5 min: Discovery/intro
- 20 min: Demo
- 10 min: Q&A and next steps

Key messages:
- 10x faster than building in-house
- No-code connectors for 200+ sources
- Enterprise-grade security

Proof points:
- 500+ customers
- 99.9% uptime
- Customers include: Stripe, Notion, Linear

Objections that come up in demos:
- "We can build this ourselves"
- "How does it handle [edge case]"
```

**What you'll get:** Full deck outline with slide-by-slide recommendations, talking points, and transition guidance.

---

### Example 6: Enterprise One-Pager (Segment-Specific)

```
/sales-enablement

Create an enterprise-focused one-pager.

Product: TaskFlow - project management
Segment: Enterprise (1000+ employees)

Enterprise-specific concerns:
- Security (SOC 2, SSO, SAML)
- Scale (unlimited users, projects)
- Support (dedicated CSM, SLA)
- Customization (workflows, fields, permissions)

Enterprise proof points:
- Fortune 500 customers: Adobe, Salesforce, IBM
- 99.9% uptime SLA
- SOC 2 Type II certified
- Dedicated implementation team

Format: Needs to work as PDF attachment and print cleanly
```

**What you'll get:** Enterprise-tailored one-pager emphasizing security, scale, and support with relevant proof points.

---

## Sample Output Preview

### Cold Email Sequence Output:

```markdown
# Cold Email Sequence: VP Marketing at B2B SaaS

## Sequence Overview
- 4 emails over 14 days
- Target: VP Marketing at Series A-C companies
- Trigger: Recently hired marketing ops role
- Goal: Book discovery call

---

## Email 1: The Hook
**Send:** Day 1
**Subject:** Quick question about [Company]'s marketing ops

---

Hi [First Name],

Saw you recently brought on a marketing ops hire—congrats on the growth.

Quick question: how are you managing campaign workflows right now?
Most marketing teams I talk to are drowning in spreadsheets and
Asana boards that weren't built for campaigns.

Curious if that's a problem you're solving.

— [Your name]

P.S. We help teams like [Similar Company] run campaigns 40% faster.

---

## Email 2: The Value Add
**Send:** Day 4
**Subject:** Re: Quick question about [Company]'s marketing ops

---

[First Name],

One thing that trips up scaling marketing teams: campaign handoffs.

Design → Copy → Dev → Launch. Each step lives in a different tool.

Here's a 2-minute video showing how [Similar Company] fixed this:
[Link]

Worth a look if campaign coordination is eating your team's time.

— [Your name]

---

## Email 3: The Case Study
**Send:** Day 9
**Subject:** How [Similar Company] cut campaign time by 40%

---

[First Name],

Quick case study that might resonate:

[Similar Company] was managing campaigns across Asana, Google Sheets,
and Slack. Their marketing ops person spent 10+ hours/week just
keeping everyone aligned.

After switching to TaskFlow:
- Campaign launch time: down 40%
- Status meetings: eliminated
- Marketing ops time freed: 10 hours/week

Happy to share how they did it in 15 minutes.
[Calendar link]

— [Your name]

---

## Email 4: The Breakup
**Send:** Day 14
**Subject:** Closing the loop

---

[First Name],

I've reached out a few times—no worries if now isn't the right time.

I'll close the loop on my end, but if campaign management becomes
a priority, I'm always happy to chat.

Either way, good luck with the marketing ops build out.

— [Your name]
```

---

## Tips for Best Results

### Do This
- **Share real objections** — The actual words prospects use
- **Include proof points** — Stats and customer examples
- **Specify the audience** — Title and company type
- **Note what's working/not** — If you have existing collateral

### Avoid This
- **Generic descriptions** — "Sales teams" is too broad
- **Feature dumps** — Benefits and outcomes first
- **Ignoring competitors** — Even if you don't compete directly

### Pro Tips
1. **Chain with positioning** — Use `/positioning` first for consistency
2. **Test subject lines** — Create 3-5 variations for cold emails
3. **Update battlecards quarterly** — Competitors change
4. **Keep one-pagers to one page** — Discipline matters

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/copywriting` | When writing website copy, not sales materials |
| `/competitor-research` | When you need deep competitive intel first |
| `/case-study` | When creating detailed customer stories |
| `/email-sequence` | When creating marketing emails, not sales outbound |

---

## Quick Reference

```
/sales-enablement

[TYPE]: One-pager | Battlecard | Cold email | Deck outline | Objection handling
[AUDIENCE]: Who the collateral is for (buyer title, company type)
[PRODUCT]: What you're selling
[COMPETITORS]: Who you compete against
[OBJECTIONS]: Common pushback you hear
[PROOF POINTS]: Stats, customer examples, results
[TONE]: Professional, casual, consultative
```
