# /paywall-upgrade-cro

Optimize in-app paywalls, upgrade screens, and feature gates.

## Overview

**What it does:** Designs and optimizes in-app moments where users encounter paywalls, upgrade prompts, or feature gates—helping convert free users to paid.

**When to use it:**
- Designing upgrade screens for free-to-paid conversion
- Feature gates aren't driving upgrades
- Trial expiration screens need optimization
- Upsell prompts feel too pushy (or too subtle)
- Freemium conversion rates are low

**What you'll get:**
- Paywall screen copy and design
- Trigger point recommendations
- Upgrade flow optimization
- A/B test ideas for upgrade prompts
- Timing and frequency rules

---

## How to Invoke

**Command:** `/paywall-upgrade-cro`

**Trigger phrases:**
- "Optimize our upgrade screen..."
- "Design a paywall..."
- "Feature gate isn't converting..."
- "Trial expiration screen..."
- "Freemium to paid conversion..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Business model | Free trial, freemium, etc. | "14-day trial" or "Freemium with limits" |
| Upgrade trigger | What prompts the screen | "Hit project limit," "Clicked locked feature" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Current conversion rate | Sets baseline | "3% of free users upgrade" |
| Pricing tiers | Affects messaging | "Pro $12, Team $25" |
| Value they've received | Enables personalization | "Created 5 projects, invited 3 users" |
| Main objection | Shapes copy | "Not sure it's worth the price" |

---

## Prompt Examples

### Example 1: Basic Feature Gate (Beginner)

```
/paywall-upgrade-cro

Design an upgrade screen for when TaskFlow free users try to access
the AI prioritization feature (locked on free plan).

Context:
- Free plan includes: 3 projects, basic features
- Pro plan ($12/mo): AI prioritization + unlimited projects
- User is interested enough to click on the locked feature
```

**What you'll get:** Complete upgrade screen with copy, design recommendations, and CTA.

---

### Example 2: Usage Limit Paywall (Common Scenario)

```
/paywall-upgrade-cro

Design an upgrade screen for TaskFlow's project limit.

Context:
- Free plan: 3 projects max
- Pro plan: Unlimited projects ($12/user/month)
- Team plan: Unlimited + advanced features ($25/user/month)

User scenario:
- They've created 3 projects and are trying to create a 4th
- They've been using TaskFlow for 2+ weeks
- Clearly finding value (active projects)

The screen should:
- Acknowledge their success (they've used their limit!)
- Make upgrading feel like a natural next step
- Reduce friction with clear value proposition
- Option to compare Pro vs Team
```

**What you'll get:** Limit-reached paywall with value-focused messaging and tier comparison.

---

### Example 3: Trial Expiration Screen (Time-Based)

```
/paywall-upgrade-cro

Design TaskFlow's trial expiration screen.

Trial details:
- 14-day free trial of Pro plan
- No credit card required to start
- At expiration: Account downgrades to free (limited features)

Screen timing:
- 3 days before expiration (warning)
- Day of expiration (urgent)
- After expiration (win-back)

For each timing:
- Appropriate messaging/urgency
- What to highlight
- CTA and offer if any

Personalization available:
- Projects created
- Tasks completed
- Team members invited
- Features used
```

**What you'll get:** Three-stage expiration messaging with personalized value reminders.

---

### Example 4: Soft Upgrade Prompt (Non-Blocking)

```
/paywall-upgrade-cro

Design a soft upgrade prompt for TaskFlow's dashboard.

Context:
- User is on free plan
- Using TaskFlow actively (3 projects, 20+ tasks)
- Haven't upgraded yet

Goals:
- Remind them of Pro benefits
- Not interrupt their workflow
- Feel helpful, not pushy
- Be dismissible

Placement options:
1. Dashboard sidebar card
2. After completing a task (celebration moment)
3. Weekly email digest with upgrade nudge

Design prompts for each placement with appropriate tone.
```

**What you'll get:** Multiple soft prompt designs optimized for each placement.

---

### Example 5: Team/Seat Expansion Prompt (Expansion Revenue)

```
/paywall-upgrade-cro

Design an upgrade prompt for expanding team seats on TaskFlow.

Context:
- Current plan: Team plan with 5 seats
- All 5 seats are filled
- Admin tries to invite a 6th team member

Pricing:
- Additional seats: Same per-seat pricing ($25/user/month)
- Can add seats at any time
- Annual discount: 20% off

Goals:
- Make adding seats feel easy, not like "buying more"
- Highlight value of collaboration (more people = more value)
- Reduce friction in the seat-add flow
- Upsell annual if they're on monthly
```

**What you'll get:** Seat expansion prompt focused on collaboration value with annual upsell.

---

### Example 6: Full Paywall Strategy (Comprehensive)

```
/paywall-upgrade-cro

Design a complete paywall strategy for TaskFlow.

Business model:
- Freemium: Free plan with limits
- Pro ($12/user/mo): Unlimited + AI features
- Team ($25/user/mo): Pro + analytics, admin controls

Trigger points to design:
1. Project limit reached (3 → Pro)
2. Clicked locked AI feature (→ Pro)
3. Tried to access reporting (→ Team)
4. Admin tried to add team controls (→ Team)
5. 30 days of active free usage (soft prompt)
6. Invited 3+ teammates on free (team growth moment)

For each trigger:
- Paywall screen design
- Copy and CTA
- What plan to push
- Personalization to include

Also include:
- Frequency rules (don't show too often)
- Priority rules (which paywall wins if multiple apply)
- Mobile considerations
```

**What you'll get:** Complete paywall system with all trigger screens, rules, and coordination logic.

---

## Sample Output Preview

When you run `/paywall-upgrade-cro`, expect output like this:

```markdown
## Feature Gate Paywall: AI Prioritization

### Trigger
User clicks on "AI Prioritization" feature (locked on free plan)

### Screen Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [AI sparkle icon]                              │
│                                                 │
│  Let AI tell you what to work on                │
│                                                 │
│  You've created 12 tasks across 3 projects.     │
│  AI Prioritization analyzes them each morning   │
│  and tells you exactly where to focus.          │
│                                                 │
│  ✓ Stop deciding what's urgent                  │
│  ✓ Focus on what moves the needle               │
│  ✓ Learn from your team's patterns              │
│                                                 │
│  [Upgrade to Pro — $12/month]                   │
│                                                 │
│  "Start 7-day free trial" (secondary CTA)       │
│                                                 │
│  [Maybe later]                                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copy Elements

**Headline:**
"Let AI tell you what to work on"

**Subhead (personalized):**
"You've created [X] tasks across [Y] projects. AI Prioritization
analyzes them each morning and tells you exactly where to focus."

**Benefits:**
- Stop deciding what's urgent
- Focus on what moves the needle
- Learn from your team's patterns

**Primary CTA:**
"Upgrade to Pro — $12/month"

**Secondary CTA:**
"Start 7-day free trial" (for hesitant users)

**Dismiss:**
"Maybe later" (not "No thanks"—keeps door open)

---

### Design Recommendations

- **Style:** Modal overlay, centered
- **Animation:** Smooth fade-in, not jarring
- **Visual:** Show preview of AI feature in action
- **Mobile:** Full-screen takeover with easy dismiss

### Personalization

Include these when available:
- Number of tasks they've created
- Number of projects
- "You've been using TaskFlow for X days"
- Team size if applicable

### Frequency Rules

- Show once per session if dismissed
- After 3 dismissals, show "Talk to us" option instead
- Reset after 14 days
```

---

## Tips for Best Results

### Do This
- **Time it right** — Show upgrade at moments of value, not frustration
- **Personalize with data** — "You've created 50 tasks" hits harder than generic
- **Make value clear** — What will they get for their money?
- **Reduce friction** — Easy path to upgrade, trial options

### Avoid This
- **Blocking too aggressively** — Users will leave, not upgrade
- **Showing too often** — Frequency caps prevent annoyance
- **Generic copy** — "Upgrade to unlock features" doesn't persuade
- **Wrong tier push** — Don't push Team when Pro is the right fit

### Pro Tips
1. **Celebrate before you sell** — "You've accomplished X!" then upgrade
2. **Show don't tell** — Preview what they'll get
3. **Offer trial at paywall** — Reduces risk perception
4. **A/B test everything** — Copy, timing, design all matter

---

## Paywall Trigger Points

| Trigger | Best For | Intensity |
|---------|----------|-----------|
| Feature click | Interest signal | Medium (modal) |
| Limit reached | Natural upgrade moment | High (blocking) |
| Time-based (trial) | Scheduled prompts | Escalating |
| Usage milestone | Celebration moment | Low (soft prompt) |
| Team growth | Expansion revenue | Medium (modal) |

---

## Paywall Types

| Type | When to Use | Example |
|------|-------------|---------|
| Hard gate | Feature requires paid plan | "AI features are Pro-only" |
| Soft prompt | Suggest upgrade without blocking | Dashboard card |
| Limit reached | User hits quantitative cap | "3/3 projects used" |
| Trial warning | Time running out | "3 days left" |
| Expansion | Add seats/resources | "Add teammates" |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/pricing-strategy` | When setting prices, not designing paywalls |
| `/onboarding-cro` | When optimizing initial user experience |
| `/page-cro` | When optimizing public pricing page |
| `/ab-test-setup` | To properly test paywall variations |

---

## Quick Reference

```
/paywall-upgrade-cro

Business model: Free trial (X days) | Freemium | Usage-based
Trigger: [What causes the upgrade screen]

Context:
- Current plan: [What they have now]
- Target plan: [What we want them to upgrade to]
- Price: [Cost of upgrade]
- User data: [What we know about them]

Goals:
- Conversion rate target: X%
- Tone: Encouraging | Urgent | Celebratory
- Blocking: Hard gate | Soft prompt

Include:
- Copy for screen
- Design recommendations
- CTA options
- Frequency rules
```
