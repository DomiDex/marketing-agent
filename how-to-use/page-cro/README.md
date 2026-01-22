# /page-cro

Optimize any marketing page for better conversions.

## Overview

**What it does:** Analyzes marketing pages and provides actionable recommendations to improve conversion rates—covering value proposition, headlines, CTAs, trust signals, and more.

**When to use it:**
- Landing page isn't converting well
- Need to improve homepage performance
- Optimizing pricing page for signups
- Auditing any marketing page
- Preparing for A/B tests

**What you'll get:**
- Prioritized CRO recommendations
- Quick wins vs high-impact changes
- A/B test ideas
- Copy alternatives for key elements
- Specific, actionable improvements

---

## How to Invoke

**Command:** `/page-cro`

**Trigger phrases:**
- "Optimize this page..."
- "CRO audit..."
- "This page isn't converting..."
- "Improve conversions on..."
- "Why isn't this page working..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Page content or URL | What to analyze | Paste copy or share URL |
| Page type | Context for analysis | Landing page, pricing, homepage |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Current conversion rate | Sets the baseline | "Converting at 2.1%" |
| Target conversion rate | Defines success | "Goal is 4%" |
| Traffic source | Affects message match | "Mostly Google Ads" |
| Primary CTA goal | Focuses recommendations | "Start free trial" |
| What you've tried | Avoids repeat suggestions | "Added testimonials, no change" |

---

## Prompt Examples

### Example 1: Basic Page Audit (Beginner)

```
/page-cro

Analyze this landing page and give me conversion recommendations:

[Paste page content or URL]
```

**What you'll get:** General CRO analysis with prioritized recommendations across value proposition, headlines, CTAs, and trust signals.

---

### Example 2: Detailed Landing Page Audit (Intermediate)

```
/page-cro

Analyze TaskFlow's landing page for conversion optimization.

Current performance:
- 10,000 monthly visitors
- 2.1% conversion rate (210 trial signups)
- Target: 4% (400 trial signups)
- Bounce rate: 65%

Traffic sources:
- 60% Google Ads (targeting "project management software")
- 25% organic search
- 15% social/referral

Current page content:
---
Headline: "Project Management Made Simple"
Subhead: "The all-in-one platform for managing your team's work."
CTA: "Get Started"

[Benefits section]
- Task management
- Team collaboration
- Time tracking
- Reporting

[Social proof]
"Trusted by thousands of teams"

[Final CTA]
"Ready to get started? Sign up now."
---

Competitors: Asana, Monday.com, ClickUp
Our differentiator: AI-powered task prioritization
```

**What you'll get:** Specific diagnosis of conversion issues, prioritized fixes, and alternative copy for weak elements.

---

### Example 3: Homepage CRO (Different Page Type)

```
/page-cro

Analyze TaskFlow's homepage for conversion optimization.

Challenge: Homepage serves multiple audiences:
1. Individual users (looking for personal task management)
2. Team leads (want to coordinate 5-20 people)
3. Enterprise buyers (evaluating for 100+ users)

Current situation:
- High traffic (50K/month) but low conversion (0.8%)
- Most users go to pricing page but don't convert
- Heat maps show users not scrolling past first section

Homepage structure:
[Hero] Generic headline, trial CTA
[Features] List of 8 features
[Testimonials] 3 quotes, no specifics
[Pricing teaser] "Plans starting at $12/mo"
[Final CTA] "Get Started"

What's our primary goal: Get all audiences to start free trial
Secondary goal: Push enterprise to "Book Demo"
```

**What you'll get:** Homepage-specific CRO recommendations addressing multi-audience challenges.

---

### Example 4: Pricing Page CRO (High-Intent Page)

```
/page-cro

Analyze TaskFlow's pricing page for conversion optimization.

Current pricing:
- Free: Up to 3 projects, 1 user
- Pro ($12/user/mo): Unlimited projects, priority support
- Team ($25/user/mo): + reporting, time tracking, analytics
- Enterprise (Contact us): SSO, dedicated CSM, SLA

Performance:
- 5,000 monthly visitors to pricing page
- 15% click "Start Trial" (any tier)
- 5% actually complete signup
- Drop-off mostly happens at Pro/Team decision point

User feedback:
- "Not sure which plan is right for my team"
- "What's the difference between Pro and Team?"
- "Is there a free trial for paid plans?"

Competitor pricing:
- Asana: Free / Premium ($10.99) / Business ($24.99)
- Monday: Free / Basic ($9) / Standard ($12) / Pro ($19)
```

**What you'll get:** Pricing page-specific recommendations focusing on plan clarity, tier comparison, and decision friction.

---

### Example 5: Test Ideas Only (Focused Request)

```
/page-cro

Generate 10 A/B test ideas for TaskFlow's landing page.

Context:
- Current conversion: 2.5%
- Audience: Startup team leads
- Main CTA: Start free trial
- We've already tested: Headline variations (3x), button color

Focus on:
- High-impact tests we might not have considered
- Quick wins that are easy to implement
- Tests that validate assumptions about our audience

For each test:
- Hypothesis
- What to test
- Expected impact
- Implementation difficulty
```

**What you'll get:** 10 specific A/B test ideas with hypotheses and implementation guidance.

---

### Example 6: Before/After Comparison (Validation)

```
/page-cro

Compare these two versions of TaskFlow's hero section and tell me
which one is likely to convert better and why:

Version A (current):
---
Headline: "Project Management Made Simple"
Subhead: "The all-in-one platform for teams to manage work."
CTA: "Get Started"
---

Version B (proposed):
---
Headline: "Stop losing tasks in Slack, email, and spreadsheets"
Subhead: "TaskFlow gives your team one place for all projects—with AI that tells you what to focus on each morning."
CTA: "Start Free Trial — No Credit Card"
---

Context:
- Audience: Startup founders/team leads
- Traffic: Google Ads for "project management software"
- Main differentiator: AI prioritization
```

**What you'll get:** Detailed comparison with conversion likelihood assessment and improvement suggestions for both.

---

## Sample Output Preview

When you run `/page-cro`, expect output like this:

```markdown
## CRO Analysis: TaskFlow Landing Page

### Overall Assessment
**Current state:** 2.1% conversion, 65% bounce rate
**Primary issues:**
1. Value proposition is generic (sounds like every PM tool)
2. No differentiation from Asana/Monday.com
3. Weak CTA copy doesn't reduce friction
4. Social proof lacks specificity

---

### Quick Wins (Implement Now)

**1. Update CTA copy**
- Current: "Get Started"
- Recommended: "Start Free Trial — No Credit Card Required"
- Impact: Medium | Effort: 5 minutes
- Why: Reduces perceived commitment

**2. Add specific social proof**
- Current: "Trusted by thousands of teams"
- Recommended: "2,000+ teams including Stripe and Vercel"
- Impact: Medium | Effort: 10 minutes

---

### High-Impact Changes (Prioritize)

**1. Rewrite headline for specificity**
- Current: "Project Management Made Simple"
- Problem: Generic, could be any competitor
- Recommended options:
  a. "AI tells you what to work on. You just ship."
  b. "Stop managing projects. Start finishing them."
  c. "One place for your team's tasks, chat, and priorities"
- Impact: High | Effort: 30 minutes

---

### A/B Test Ideas

**Test 1: Headline approach**
- Hypothesis: Specific pain-point headline outperforms generic
- Control: "Project Management Made Simple"
- Variant: "Stop losing tasks across Slack, email, and spreadsheets"
- Expected lift: 15-30%
- Sample size needed: ~3,000 visitors per variant
```

---

## Tips for Best Results

### Do This
- **Share actual page content** — Screenshots or copy, not just descriptions
- **Include current metrics** — Conversion rate, bounce rate, traffic
- **Specify traffic source** — Affects message match expectations
- **Tell us what failed** — Avoid wasted recommendations

### Avoid This
- **Vague requests** — "Make it better" gives generic advice
- **No context on audience** — CRO differs by who you're targeting
- **Skipping conversion goals** — "More signups" vs "more demos" changes strategy

### Pro Tips
1. **Request prioritized recommendations** — Quick wins vs big bets
2. **Ask for copy alternatives** — Get testable variations
3. **Include competitor context** — Differentiation matters
4. **Chain with A/B test setup** — Test, don't guess

---

## CRO Analysis Framework

The skill analyzes these dimensions in order of impact:

| Dimension | What It Covers |
|-----------|----------------|
| Value Proposition | Is the core benefit clear in 5 seconds? |
| Headline | Specific, compelling, differentiated? |
| CTA | Clear action, visible, friction-reduced? |
| Visual Hierarchy | Can people scan and get the message? |
| Trust Signals | Social proof near decision points? |
| Objection Handling | Are concerns addressed? |
| Friction Points | What's getting in the way? |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/copywriting` | When you need a complete rewrite, not optimization |
| `/signup-flow-cro` | When the problem is after the page (in signup flow) |
| `/form-cro` | When forms specifically need optimization |
| `/ab-test-setup` | When you want to properly test CRO recommendations |
| `/marketing-psychology` | When you want to understand why changes work |

---

## Quick Reference

```
/page-cro

[PASTE PAGE CONTENT OR URL]

Context:
- Page type: Landing | Homepage | Pricing | Feature
- Current conversion rate: X%
- Target conversion rate: X%
- Traffic source: Ads | Organic | Social | Email
- Primary CTA: [What action you want]
- Audience: [Who visits this page]
- Competitors: [Who you're compared against]
- Already tried: [What hasn't worked]
```
