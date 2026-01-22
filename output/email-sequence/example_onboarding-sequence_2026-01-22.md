# Email Sequence: Trial Onboarding

> **Example output** demonstrating email-sequence skill quality standards

---

## Sequence Overview

- **Type**: Trial onboarding (14-day free trial)
- **Product**: TaskFlow (project management for remote teams)
- **Goal**: Convert trial users to paid subscribers
- **Emails**: 6 emails over 14 days
- **Key activation metric**: Create first project + invite 2 team members

---

## Sequence Map

| Day | Email | Trigger | Goal |
|-----|-------|---------|------|
| 0 | Welcome | Signup | Set expectations, first action |
| 1 | Quick Win | 24hr no activity | Complete first project setup |
| 3 | Core Feature | - | Discover workload view |
| 7 | Social Proof | Mid-trial | Build confidence |
| 10 | Upgrade Preview | - | Show paid value |
| 13 | Trial Ending | 1 day left | Convert or extend |

---

## Email 1: Welcome

**Trigger**: Immediate after signup
**Subject**: Your TaskFlow trial is ready
**Preview**: Here's your first step (takes 2 minutes)

---

Hi {{first_name}},

Welcome to TaskFlow. You just took the first step toward managing your remote team without the chaos.

**Your trial includes everything in our Pro plan for 14 days.** No credit card needed. No commitment.

Here's the one thing I'd suggest doing right now:

**→ Create your first project** (2 minutes)

Just click the button below, name your project, and you're in.

[Create Your First Project]

Once you have a project, you can invite your team and see the magic happen—real-time workload visibility across everyone.

Questions? Reply to this email. I read every one.

— Sarah
Head of Customer Success, TaskFlow

P.S. — If you're migrating from Asana, Jira, or Linear, we can import your existing projects automatically. Just reply and I'll set it up.

---

## Email 2: Quick Win

**Trigger**: 24 hours after signup, no project created
**Subject**: Need help getting started?
**Preview**: Most teams get stuck here

---

Hi {{first_name}},

I noticed you signed up for TaskFlow but haven't created your first project yet.

Totally normal—new tools can feel overwhelming.

Here's the thing: **the setup takes about 2 minutes**, and I've seen teams have their "aha moment" within the first 10 minutes of using it.

The fastest way to see value:

1. **Create a project** → Name it after a real project you're working on
2. **Add 3-5 tasks** → Import them or add manually
3. **Invite one teammate** → They'll get set up in 30 seconds

[Create Your First Project]

That's it. Once you have tasks and a teammate, you'll see the workload view that makes TaskFlow different from every other PM tool.

If something's blocking you, just reply. I'm here to help.

— Sarah

---

## Email 3: Core Feature

**Trigger**: Day 3
**Condition**: Has created project
**Subject**: The feature our customers can't live without
**Preview**: (Hint: it's not task management)

---

Hi {{first_name}},

Now that you've got {{project_name}} set up, I want to show you the feature that makes teams stick with TaskFlow.

It's not task management—you can get that anywhere.

**It's the Workload View.**

Go to your project and click "Workload" in the left sidebar. You'll see a heat map of everyone's capacity:

- 🟢 Green = has bandwidth
- 🟡 Yellow = at capacity
- 🔴 Red = overloaded

This is the view that prevents burnout. It shows you who's drowning before they tell you (or quit).

**Try this:** Look at your team's workload right now. Is anyone in the red? If so, click their name to see what they're working on—then drag a task to someone with green capacity.

[Open Workload View]

Teams tell me this is the moment TaskFlow "clicks" for them.

— Sarah

P.S. — If you haven't invited your team yet, the Workload View gets 10x more useful with real data. [Invite your team →]

---

## Email 4: Social Proof

**Trigger**: Day 7
**Subject**: How Buildkit cut missed deadlines by 34%
**Preview**: A 45-person remote team's story

---

Hi {{first_name}},

You're one week into your trial. I wanted to share what other teams have experienced at this point.

**Buildkit** is a 45-person remote engineering team. They were struggling with the same problems most remote teams face:

- Senior devs overloaded, juniors underutilized
- Deadlines slipping with no warning
- Status meetings eating 5+ hours per week

Sound familiar?

After 30 days with TaskFlow:
- **34% fewer missed deadlines**
- **4.2 hours saved** per manager per week
- Eliminated all weekly status meetings

Here's what their engineering lead said:

> "We went from constant fire drills to actually shipping on time. TaskFlow showed us our senior dev was doing 3x the work of others—something we'd missed for months."
> — Sarah Chen, Engineering Lead

[Read the Full Case Study]

You're closer to these results than you think. If you've invited your team and started using the Workload View, you're already on track.

— Sarah

---

## Email 5: Upgrade Preview

**Trigger**: Day 10
**Subject**: What you'll lose on day 15
**Preview**: And what you'll keep

---

Hi {{first_name}},

Your trial ends in 4 days. Here's what changes:

**What you'll keep (Free tier):**
- Up to 3 projects
- Basic task management
- 1 team member

**What goes away:**
- ❌ Unlimited projects
- ❌ Workload View
- ❌ AI task rebalancing
- ❌ Async standups
- ❌ Team analytics

The Pro plan is $79/month for your whole team. That's roughly what one missed deadline costs in scramble time—and you'll prevent a lot more than one.

**If you upgrade before your trial ends, I'll:**
- Lock in 20% off your first 3 months
- Set up a free migration from your old tool
- Give you a 30-minute strategy call to optimize your setup

[Upgrade to Pro — 20% Off]

Not ready? Reply and tell me what's holding you back. I might be able to help.

— Sarah

---

## Email 6: Trial Ending

**Trigger**: Day 13 (1 day before trial ends)
**Subject**: Your trial ends tomorrow
**Preview**: Here's what happens next

---

Hi {{first_name}},

Quick heads up: your TaskFlow trial ends tomorrow.

**Here's what happens:**
- Your account switches to the Free tier
- You keep access to your first 3 projects
- Features like Workload View and AI rebalancing will be locked

**Option 1: Upgrade now**
Keep everything. Get 20% off your first 3 months.

[Upgrade to Pro — $63/mo]

**Option 2: Need more time?**
If you haven't had a chance to really try TaskFlow, reply to this email. I can extend your trial by a week—no strings attached.

**Option 3: Not the right fit?**
That's okay too. Your data stays safe on the Free tier, and you can upgrade anytime.

Whatever you decide, thanks for trying TaskFlow. I hope you found it useful.

— Sarah

P.S. — If there's a specific feature you wish we had, I'd love to hear it. We ship updates every two weeks based on customer feedback.

---

## Sequence Metrics to Track

| Metric | Target | Notes |
|--------|--------|-------|
| Email 1 open rate | >60% | Welcome emails should hit 60%+ |
| Email 1 click rate | >25% | "Create project" CTA |
| Email 2 recovery | >15% | Inactive users who activate |
| Email 4 open rate | >40% | Case study engagement |
| Email 5 click rate | >10% | Upgrade intent |
| Trial-to-paid conversion | >12% | Overall sequence goal |

---

## Branching Logic

```
Signup
  ↓
Email 1 (Day 0)
  ↓
[Has project?]
  → No: Email 2 (Day 1)
  → Yes: Skip Email 2
  ↓
Email 3 (Day 3) — only if has project
  ↓
Email 4 (Day 7)
  ↓
Email 5 (Day 10)
  ↓
[Already upgraded?]
  → Yes: Send "Thanks for upgrading" email
  → No: Email 6 (Day 13)
```

---

*Output generated following email-sequence skill framework and rules.md quality standards.*
