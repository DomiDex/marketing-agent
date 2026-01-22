# /referral-program

Design referral programs, affiliate programs, and viral mechanics.

## Overview

**What it does:** Helps design and optimize referral programs, affiliate programs, and word-of-mouth growth strategies—including incentive structures, mechanics, and promotion.

**When to use it:**
- Creating a customer referral program
- Designing an affiliate/partner program
- Building viral mechanics into product
- Optimizing existing referral performance
- Planning referral program launch

**What you'll get:**
- Program structure and mechanics
- Incentive recommendations
- Referral flow design
- Email sequences for referrers
- Measurement framework

---

## How to Invoke

**Command:** `/referral-program`

**Trigger phrases:**
- "Create a referral program..."
- "Design affiliate program..."
- "Word of mouth strategy..."
- "Referral incentives..."
- "Viral loop for..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Product type | What you're selling | "SaaS subscription" |
| Current customers | Who would refer | "2,000 paying customers" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Pricing | Affects incentive math | "$14-24/user/month" |
| LTV | For incentive sizing | "$500 average LTV" |
| CAC | Benchmark for referral cost | "$80 CAC currently" |
| Growth goals | Sets targets | "100 referrals/month" |

---

## Prompt Examples

### Example 1: Basic Referral Program (Beginner)

```
/referral-program

Create a referral program for TaskFlow.

Product: B2B project management ($14-24/user/month)
Customers: 2,000 paying teams
Goal: Get customers to refer other teams
```

**What you'll get:** Referral program structure with incentives and basic mechanics.

---

### Example 2: Detailed Referral Program (Intermediate)

```
/referral-program

Design a comprehensive referral program for TaskFlow.

Business context:
- B2B SaaS, $14/user/month (Pro) and $24/user/month (Team)
- Average customer has 8 users
- LTV: ~$800
- Current CAC: $75
- 2,000 paying customers, very happy (NPS 60+)

Referral goals:
- Launch with strong incentive to drive adoption
- Target: 50 referrals in first month
- Sustainable long-term program

Questions to answer:
1. What incentive structure? (Both sides? Cash vs credit?)
2. How much to give? (Balance generosity vs sustainability)
3. When do rewards trigger? (On signup? First payment?)
4. How to prevent abuse?
5. How to promote to existing customers?
```

**What you'll get:** Complete program design with incentive math and launch plan.

---

### Example 3: Affiliate Program (Partner Focus)

```
/referral-program

Design an affiliate program for TaskFlow.

Context:
- Looking to partner with productivity bloggers, consultants
- Not just customers, but professional promoters
- Want to track and pay commissions

Questions:
1. Commission structure (% vs flat? recurring vs one-time?)
2. Cookie duration
3. What tools/platform to use?
4. How to recruit affiliates?
5. What assets to provide affiliates?
6. How to prevent fraud?

Budget: Can afford up to 20% of first year revenue
```

**What you'll get:** Affiliate program structure with recruitment strategy.

---

### Example 4: Viral Mechanics (Product-Led)

```
/referral-program

Design viral mechanics for TaskFlow.

Product context:
- Project management tool
- Free plan available
- Value increases with more team members
- Has collaboration features

What viral loops can we build in?
- In-product invitations
- Sharing features
- Network effects

I want referrals to feel natural, not forced.
```

**What you'll get:** In-product viral mechanics that drive organic growth.

---

### Example 5: Referral Program Optimization (Improve Existing)

```
/referral-program

Optimize TaskFlow's underperforming referral program.

Current program:
- Offer: "Give $20, Get $20" account credit
- How it works: Referrer gets $20 credit when friend signs up for paid
- Performance: 15 referrals/month (want 50+)
- Participation: Only 2% of customers have shared referral link

Issues:
- Low awareness (many don't know it exists)
- Incentive might not be motivating enough
- Referral flow might be confusing

What should we change?
```

**What you'll get:** Diagnostic analysis with specific improvements.

---

### Example 6: Referral Launch Campaign (Activation)

```
/referral-program

Plan the launch of TaskFlow's new referral program.

Program details:
- Give 1 free month, get 1 free month
- Available to all paying customers
- Can refer unlimited people
- New referrals get 50% off first 3 months

Launch needs:
1. Announcement email sequence (how many? what timing?)
2. In-app announcement (design ideas?)
3. Referral page copy
4. FAQ for common questions
5. Social assets for customers to share
6. Measurement plan (what to track)

Timeline: Launch in 2 weeks
```

**What you'll get:** Complete launch plan with email content and assets.

---

## Sample Output Preview

```markdown
## Referral Program: TaskFlow

### Program Structure

**Name:** "Share TaskFlow"

**Incentive:**
- Referrer: 1 month free (worth $24-40 per referral)
- Referee: 50% off first 3 months

**Why this structure:**
- Credit > cash (keeps users on platform)
- Generous enough to motivate (~$30 value)
- Within CAC budget (current: $75)
- Sustainable at scale

---

### Referral Mechanics

**Trigger:** Referee signs up for paid plan (not free trial)

**Sharing methods:**
1. Unique referral link (taskflow.com/r/abc123)
2. Email invitation from product
3. Social share buttons

**Tracking:**
- 90-day cookie attribution
- Credit referrer even if link used later
- Cap: No limit per referrer

---

### Abuse Prevention

- Require payment to trigger reward (not just signup)
- Same IP/payment method detection
- Manual review for >10 referrals/month
- Terms prohibiting self-referral

---

### Referral Flow

1. **Customer sees referral prompt**
   - In-app: Dashboard sidebar card
   - Email: Monthly newsletter mention
   - Account: Dedicated referral page

2. **Customer shares link**
   - Copy link, email invite, or social share

3. **Friend clicks and signs up**
   - Landing page shows "Invited by [Name]"
   - Discount auto-applied

4. **Friend becomes paying customer**
   - Referrer notified via email
   - Credit applied automatically

5. **Both rewarded**
   - Referrer: 1 month credit
   - Referee: Already got discount

---

### Email Sequence (Launch)

**Email 1: Announcement (Day 1)**
Subject: "Share TaskFlow, get free months"
Content: Program introduction, how it works, CTA

**Email 2: Reminder (Day 7)**
Subject: "Your referral link is waiting"
Content: Reinforce value, suggest who to share with

**Email 3: Success story (Day 14)**
Subject: "Sarah earned 3 free months"
Content: Social proof, reactivation
```

---

## Tips for Best Results

### Do This
- **Know your numbers** — LTV and CAC determine incentive size
- **Make it easy to share** — Reduce friction at every step
- **Reward both sides** — Two-sided incentives work best
- **Promote continuously** — Don't just announce once

### Avoid This
- **Complex rules** — If it takes 3 paragraphs to explain, simplify
- **Delayed rewards** — People want instant gratification
- **Ignoring fraud** — Build prevention in from the start
- **Under-promoting** — Most customers won't find it on their own

### Pro Tips
1. **Trigger after activation** — Refer when happy, not right after signup
2. **Make referrers feel special** — Exclusive access, recognition
3. **Test incentive levels** — Generous beats stingy
4. **Remind regularly** — Referral prompts decay without reminders

---

## Incentive Sizing Guide

| LTV | Suggested Referrer Reward | Max Sustainable |
|-----|---------------------------|-----------------|
| $100 | $10-15 (10-15%) | $20 (20%) |
| $500 | $30-50 (6-10%) | $75 (15%) |
| $1,000 | $50-100 (5-10%) | $150 (15%) |
| $5,000 | $100-250 (2-5%) | $500 (10%) |

*As % of LTV, not to exceed current CAC*

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/email-sequence` | When creating referral email campaigns |
| `/copywriting` | When writing referral page copy |
| `/marketing-psychology` | When understanding referral motivation |
| `/analytics-tracking` | When setting up referral tracking |

---

## Quick Reference

```
/referral-program

Product: [What you sell]
Pricing: [Monthly/annual, price points]
Customers: [How many, how happy]

Business metrics:
- LTV: [Average customer lifetime value]
- CAC: [Current acquisition cost]
- NPS: [Customer satisfaction]

Goals:
- [Referrals per month]
- [Target CAC for referrals]

Include:
- Incentive structure
- Referral mechanics
- Abuse prevention
- Launch plan
- Email sequences
```
