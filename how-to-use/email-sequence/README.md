# /email-sequence

Create email sequences, drip campaigns, and lifecycle emails.

## Overview

**What it does:** Designs complete email sequences for onboarding, nurturing, re-engagement, and more—including subject lines, timing, and full email copy.

**When to use it:**
- Building an onboarding email sequence for new users
- Creating a nurture sequence for leads
- Designing re-engagement campaigns for inactive users
- Planning welcome sequences for newsletter subscribers
- Setting up trial-to-paid conversion emails

**What you'll get:**
- Complete email sequence with timing recommendations
- Subject lines with alternatives
- Full email copy for each message
- Segmentation suggestions
- Metrics to track

---

## How to Invoke

**Command:** `/email-sequence`

**Trigger phrases:**
- "Create an email sequence..."
- "Build a drip campaign..."
- "Design onboarding emails..."
- "Help with nurture emails..."
- "Write a welcome sequence..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Sequence type | What kind of sequence | Onboarding, nurture, re-engagement |
| Product/service | What you're promoting | SaaS tool, newsletter, course |
| Audience | Who receives these emails | New trial users, cold leads |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Number of emails | Sets scope | "5-7 email sequence" |
| Timeframe | Determines pacing | "Over 14 days" |
| Goal/CTA | Focuses each email | "Upgrade to paid" |
| Key actions to drive | Shapes content | "Complete profile, invite team" |
| Tone/voice | Maintains brand | "Friendly and helpful, not pushy" |

---

## Prompt Examples

### Example 1: Basic Onboarding Sequence (Beginner)

```
/email-sequence

Create an onboarding email sequence for TaskFlow, a project management tool.
5 emails over 14 days for new free trial users.
Goal: Get them to upgrade to paid.
```

**What you'll get:** A 5-email sequence with timing, subject lines, and copy focused on driving trial-to-paid conversion.

---

### Example 2: Detailed Onboarding Sequence (Intermediate)

```
/email-sequence

Create an onboarding sequence for TaskFlow new trial users.

Product context:
- 14-day free trial
- Key activation actions: Create first project, invite teammate, use AI prioritization
- Paid plans: Pro ($12/user/mo), Team ($25/user/mo)
- Main value prop: AI tells you what to work on each morning

Audience:
- Small team leads (5-20 people)
- Pain point: Scattered tasks across tools
- Likely using Asana, Monday, or Notion currently

Sequence requirements:
- 7 emails over 14 days
- Drive key activation actions early
- Build to upgrade CTA in later emails
- Tone: Helpful and encouraging, not salesy

Include:
- Subject line options (3 per email)
- Optimal send times
- Behavioral triggers where relevant
```

**What you'll get:** Comprehensive 7-email sequence with behavioral logic, multiple subject lines, and strategic timing.

---

### Example 3: Lead Nurture Sequence (Different Goal)

```
/email-sequence

Create a lead nurture sequence for people who downloaded our
"Team Productivity Playbook" ebook.

Context:
- These are cold leads, not trial users
- We want them to eventually start a TaskFlow trial
- They're interested in productivity but haven't tried us yet

Sequence:
- 6 emails over 3 weeks
- Mix of value-add content and product education
- Gradual progression from education to trial CTA

Content themes to weave in:
- Team productivity tips (establish expertise)
- Common project management mistakes
- How AI is changing team coordination
- TaskFlow feature highlights
- Social proof (case studies)
- Trial invitation
```

**What you'll get:** Education-focused nurture sequence that warms leads before pitching the product.

---

### Example 4: Re-engagement Sequence (Win-back)

```
/email-sequence

Create a re-engagement sequence for TaskFlow users who haven't
logged in for 30+ days.

Context:
- These are paying customers (not churned yet)
- Monthly subscription, can cancel anytime
- They were active for 2+ months before going quiet
- We want to prevent churn

Approach:
- 4 emails over 2 weeks
- Start gentle, escalate urgency
- Remind them of value they're missing
- Offer help if they're stuck
- Include win-back incentive in final email

Data we can personalize with:
- First name
- Number of projects they created
- Last feature they used
- Team size
```

**What you'll get:** Strategic win-back sequence with escalating messaging and personalization recommendations.

---

### Example 5: Welcome Sequence for Newsletter (Non-SaaS)

```
/email-sequence

Create a welcome sequence for new subscribers to "Productivity Weekly"
newsletter (powered by TaskFlow).

Context:
- Newsletter about team productivity and project management
- Subscribers found us through blog content
- Some are TaskFlow users, most are not
- Goal: Build relationship, eventually convert to TaskFlow trial

Sequence:
- 5 emails over 10 days
- Welcome and set expectations
- Deliver best content
- Share our story
- Soft pitch TaskFlow
- Transition to regular newsletter

Tone: Casual, helpful, like advice from a smart friend
```

**What you'll get:** Welcome sequence that builds trust before any product pitch.

---

### Example 6: Behavioral/Triggered Sequence (Advanced)

```
/email-sequence

Design a behavioral email sequence for TaskFlow trial users based on
their actions in the product.

Triggers to build sequences for:

1. Created account but never created a project (Day 1)
2. Created project but never invited a teammate (Day 3)
3. Has team but never tried AI prioritization (Day 5)
4. Highly engaged but hasn't upgraded (Day 10)
5. Trial expiring in 3 days (Day 11)
6. Trial expired, didn't convert (Day 14)

For each trigger:
- Single email with clear goal
- Subject line options
- Short, focused copy
- One clear CTA

This should work alongside our time-based onboarding sequence.
```

**What you'll get:** Complete behavioral email system with triggers, emails, and logic for integration with marketing automation.

---

## Sample Output Preview

When you run `/email-sequence`, expect output like this:

```markdown
## TaskFlow Onboarding Sequence

### Sequence Overview
- **Emails:** 7
- **Duration:** 14 days
- **Goal:** Trial-to-paid conversion
- **Primary metric:** Activation rate + conversion rate

### Email 1: Welcome (Immediately after signup)

**Subject line options:**
1. Welcome to TaskFlow — here's your first step
2. You're in! Let's set up your first project
3. TaskFlow setup takes 2 minutes (really)

**From:** Alex from TaskFlow

**Body:**
Hey [First Name],

You just made a smart choice. TaskFlow is going to change how your
team coordinates work.

But first—you need to see it in action.

**Your one task today:** Create your first project. It takes 60 seconds.

[Create Your First Project →]

Once you do, you'll see why 2,000+ teams chose TaskFlow over
the usual PM tools.

Talk soon,
Alex

P.S. — Hit reply if you have any questions. I read every email.

**Send time:** Immediately after signup
**Goal:** First project creation
**Metric:** % who create project within 24 hours

---

### Email 2: Feature highlight (Day 2)
[Continues...]
```

---

## Tips for Best Results

### Do This
- **Define clear goals** — What should each email accomplish?
- **Specify activation actions** — What behaviors indicate success?
- **Include product context** — Pricing, features, differentiators
- **Set tone expectations** — How should emails feel?

### Avoid This
- **Vague goals** — "Build engagement" is too broad
- **Too many CTAs** — One clear action per email
- **Ignoring timing** — Spacing matters for effectiveness

### Pro Tips
1. **Request subject line options** — A/B test to find winners
2. **Ask for behavioral triggers** — Combine time + action-based emails
3. **Include personalization variables** — [First Name], [Company], [Feature Used]
4. **Get metrics per email** — Know what success looks like

---

## Sequence Types Reference

| Type | When to Use | Typical Length |
|------|-------------|----------------|
| Welcome | New subscribers or signups | 3-5 emails over 7 days |
| Onboarding | New trial users | 5-10 emails over 14 days |
| Nurture | Cold leads from content | 5-8 emails over 3-4 weeks |
| Re-engagement | Inactive users | 3-5 emails over 2 weeks |
| Upgrade | Trial-to-paid | 3-5 emails, last 5 days of trial |
| Retention | Existing customers | Ongoing, monthly |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/copywriting` | When you need web page copy, not emails |
| `/onboarding-cro` | When optimizing in-app onboarding, not email |
| `/ab-test-setup` | When you want to test email variations |
| `/content-calendar` | When planning content across all channels |

---

## Quick Reference

```
/email-sequence

Sequence type: Onboarding | Nurture | Re-engagement | Welcome | Upgrade
Product: [What you're selling]
Audience: [Who receives these emails]
Goal: [What action you want them to take]

Details:
- Number of emails: X
- Timeframe: X days/weeks
- Key actions to drive: [List behaviors]
- Tone: [How emails should feel]
- Personalization available: [First name, company, etc.]
```
