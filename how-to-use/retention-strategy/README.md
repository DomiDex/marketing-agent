# /retention-strategy

Create strategies to keep customers and grow their value.

## Overview

**What it does:** Creates churn prevention playbooks, win-back campaigns, expansion strategies, and customer health frameworks.

**When to use it:**
- Churn is increasing or too high
- Building a customer success program
- Creating win-back email sequences
- Developing upsell/expansion playbooks
- Setting up health scoring

**What you'll get:**
- Churn prevention playbooks
- Win-back email sequences
- Customer health scoring frameworks
- Expansion revenue strategies
- NPS/feedback programs

---

## How to Invoke

**Command:** `/retention-strategy`

**Trigger phrases:**
- "Help me reduce churn..."
- "Create a win-back campaign..."
- "Build a customer health score..."
- "Develop an expansion strategy..."
- "Set up an NPS program..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Strategy type | What you need | Churn prevention, win-back, expansion |
| Current churn | Your churn rate | 5% monthly, 15% annually |
| Business context | Product and model | B2B SaaS, $100/mo average |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Churn reasons | Targets the real issues | "Top reasons: pricing, missing features, competitor" |
| Customer segments | Enables targeting | "SMB churns 3x more than enterprise" |
| Current efforts | Shows what's tried | "We send one email at cancellation" |
| Data available | Shapes recommendations | "We track logins, not feature usage" |

---

## Prompt Examples

### Example 1: Churn Prevention Playbook (Beginner)

```
/retention-strategy

Create a churn prevention playbook.

Our product: B2B SaaS for customer support ($50-500/mo)
Current churn: 8% monthly
Main churn reasons:
- "Too expensive"
- "Team stopped using it"
- "Switched to Zendesk"
```

**What you'll get:** Basic churn prevention framework with early warning signals, intervention strategies, and escalation paths.

---

### Example 2: Win-Back Email Campaign (Intermediate)

```
/retention-strategy

Create a win-back email sequence for churned customers.

Context:
- Product: Project management SaaS
- Average customer value: $200/mo
- Typical churn reasons: "Not enough time to learn it"
- We've improved onboarding significantly since they left

What I need:
- 4-email sequence over 90 days
- Highlight our improved onboarding
- Include a return offer (1 month free)
- Tone: Humble, not desperate
```

**What you'll get:** Complete 4-email win-back sequence with subject lines, copy, timing, and variations for different churn reasons.

---

### Example 3: Customer Health Scoring (Advanced)

```
/retention-strategy

Help me build a customer health scoring system.

Our product: Analytics platform for e-commerce
Business model: Usage-based pricing ($500-5000/mo)
Current state: No health scoring, just gut feel

Data we have access to:
- Login frequency
- Queries run per day
- Dashboard views
- Support tickets
- NPS scores (quarterly)
- Contract value

Churn patterns we've observed:
- Drops in query volume = bad sign
- Champion leaves = usually churns within 90 days
- Support tickets don't correlate much

Goals:
- Identify at-risk accounts earlier
- Prioritize CSM time
- Automated alerts for critical changes
```

**What you'll get:** Complete health scoring framework with weighted signals, scoring methodology, alert thresholds, and recommended actions per tier.

---

### Example 4: Expansion Revenue Strategy (Upsell/Cross-Sell)

```
/retention-strategy

Create an expansion revenue playbook.

Product: Email marketing platform
Tiers:
- Starter: $29/mo (up to 1,000 contacts)
- Pro: $79/mo (up to 10,000 contacts)
- Business: $199/mo (unlimited, advanced features)

Expansion opportunities:
- Upsell to higher tier (contacts limit)
- SMS add-on: $50/mo
- Advanced automation: $100/mo add-on

Current state:
- Net revenue retention: 95% (want 110%+)
- Only 20% of eligible accounts upsell
- No systematic expansion motion

Signals we can track:
- Approaching contact limits
- Feature usage patterns
- Support requests about missing features
```

**What you'll get:** Expansion playbook with trigger signals, conversation frameworks, offer structures, and measurement approach.

---

### Example 5: NPS Program Design (Feedback Loop)

```
/retention-strategy

Design an NPS program for our SaaS.

Context:
- B2B SaaS, 500 customers
- $200 average MRR
- No current NPS program
- Have customer success team (3 CSMs)

Goals:
1. Measure customer sentiment
2. Identify at-risk accounts
3. Generate testimonials/referrals from promoters
4. Get actionable feedback from detractors

Need:
- Survey design and timing
- Response handling playbook
- Integration with CS workflow
```

**What you'll get:** Complete NPS program with survey design, follow-up workflows for each segment, and integration recommendations.

---

### Example 6: Full Retention Strategy (Comprehensive)

```
/retention-strategy

Create a comprehensive retention strategy.

Company: TaskFlow (project management SaaS)
Model: Freemium + paid tiers ($0, $15, $30/user/mo)
Customers: 2,000 paid accounts
Team: 2 CSMs, focused on enterprise

Current state:
- Monthly churn: 6%
- Net revenue retention: 92%
- No health scoring
- Basic cancellation flow
- No win-back campaigns

Churn analysis shows:
- 40% churn in first 60 days (activation problem)
- Champion churn = 80% chance account follows
- Downgrade requests often lead to full churn

Resources:
- CSMs can handle 50 high-touch accounts each
- Marketing can create automated campaigns
- Product can build in-app messaging

Need:
- Complete retention strategy
- Quick wins (next 30 days)
- Long-term improvements (6 months)
```

**What you'll get:** Comprehensive retention strategy with prioritized initiatives, quick wins, health scoring, intervention playbooks, and measurement framework.

---

## Sample Output Preview

### Win-Back Email Sequence Output:

```markdown
# Win-Back Email Campaign: Churned Customers

## Campaign Overview
- **Audience:** Customers who cancelled in last 90 days
- **Sequence:** 4 emails over 90 days
- **Offer:** First month free on return
- **Goal:** 5% reactivation rate

---

## Email 1: We Miss You
**Send:** 7 days after cancellation
**Subject:** We're sorry to see you go, [Name]

---

Hi [Name],

We noticed you recently cancelled your TaskFlow account.

We're genuinely sorry to see you go. If there's anything we
could have done differently, we'd love to hear about it.

Whether you come back or not, your feedback helps us improve.

[CTA: Share quick feedback (2 min)]

Thanks for giving us a try.

— The TaskFlow Team

---

## Email 2: What's New
**Send:** 30 days after cancellation
**Subject:** Things have changed at TaskFlow

---

Hi [Name],

Since you left, we've made some improvements you might like:

✓ **Faster onboarding** — New guided setup takes 10 minutes
✓ **Simpler interface** — We removed the complexity
✓ **Better templates** — 50+ ready-to-use project templates

If these address what was missing for you, we'd love to
welcome you back.

[CTA: See what's new →]

No pressure—just wanted you to know.

— [Your name], TaskFlow

---

## Email 3: Special Offer
**Send:** 60 days after cancellation
**Subject:** A welcome-back offer for you

---

Hi [Name],

We'd love another chance to earn your business.

As a former customer, you can come back with
**your first month free** — no strings attached.

If things have changed on your end, or our improvements
address your concerns, this might be good timing.

Offer expires: [Date + 14 days]

[CTA: Reactivate with free month →]

— [Your name], TaskFlow

---

## Email 4: Closing the Loop
**Send:** 90 days after cancellation
**Subject:** Last note from TaskFlow

---

Hi [Name],

This is my last email about coming back.

If your situation changes or you want to chat about
what might make TaskFlow work for you, I'm here.

The door is always open: [email] or [calendar link]

Either way, thanks for being part of our story.

— [Your name], TaskFlow

---

## Segmentation Notes

Consider variations for:
- **Price churns:** Emphasize value, offer discount
- **Feature churns:** Highlight new/improved features
- **Competitor churns:** Address specific competitive gaps
- **Adoption churns:** Emphasize improved onboarding
```

---

## Tips for Best Results

### Do This
- **Share real churn data** — Actual numbers and reasons
- **Include what you've tried** — Shows what hasn't worked
- **Be honest about resources** — Shapes realistic recommendations
- **Define success metrics** — What does good look like?

### Avoid This
- **Ignoring root causes** — Retention tactics won't fix product problems
- **One-size-fits-all** — Different segments need different approaches
- **Over-promising** — Retention takes time to improve

### Pro Tips
1. **Fix activation first** — Early churn often = onboarding problem
2. **Champion tracking matters** — When they leave, accounts follow
3. **Win-back works** — 10-15% reactivation is achievable
4. **Chain with email-sequence** — Use `/email-sequence` for detailed campaigns

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/onboarding-cro` | When activation is the problem |
| `/email-sequence` | When creating lifecycle emails |
| `/customer-research` | When you need to understand why customers churn |
| `/paywall-upgrade-cro` | When optimizing upgrade moments |

---

## Quick Reference

```
/retention-strategy

[TYPE]: Churn prevention | Win-back | Health scoring | Expansion | NPS
[CHURN RATE]: Current rate and trend
[CHURN REASONS]: Top reasons customers leave
[SEGMENTS]: Different customer groups
[CURRENT STATE]: What you're doing today
[RESOURCES]: Team, tools, data available
[GOALS]: Target retention improvement
```
