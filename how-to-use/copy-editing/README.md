# /copy-editing

Edit, review, and improve existing marketing copy.

## Overview

**What it does:** Systematically reviews and polishes marketing copy through multiple focused editing passes (clarity, voice, specificity, emotion, and more).

**When to use it:**
- You have a draft that needs polishing
- Copy isn't converting and you need diagnosis
- Want a professional review of existing content
- Need to tighten and sharpen written content

**What you'll get:**
- Line-by-line edits with explanations
- Before/after comparisons
- Diagnosis of copy problems
- Prioritized improvement recommendations

---

## How to Invoke

**Command:** `/copy-editing`

**Trigger phrases:**
- "Edit this copy..."
- "Review my copy..."
- "Polish this content..."
- "Proofread and improve..."
- "This copy isn't working..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| The copy | The text you want edited | Paste the full copy |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| What it's for | Tailors editing focus | "Landing page hero section" |
| Target audience | Ensures appropriate tone | "Enterprise IT buyers" |
| What's not working | Focuses the review | "Feels too salesy" |
| Conversion goal | Shapes CTA editing | "Get demo requests" |
| Brand voice | Maintains consistency | "Professional but warm" |

---

## Prompt Examples

### Example 1: Basic Copy Review (Beginner)

```
/copy-editing

Please review and improve this landing page copy:

---
TaskFlow is the ultimate project management solution for modern teams.
Our innovative platform streamlines workflows and maximizes productivity
through cutting-edge AI technology. Get started today and transform
the way your team works!
---
```

**What you'll get:** Identification of issues (vague language, buzzwords, weak CTA) with specific rewrites.

---

### Example 2: Headline Optimization (Intermediate)

```
/copy-editing

Edit these headline options for our TaskFlow landing page. We're targeting
startup founders who manage small teams (5-20 people).

Current options:
1. "TaskFlow - Project Management Made Simple"
2. "The All-in-One Platform for Team Productivity"
3. "Manage Projects Smarter, Not Harder"
4. "Where Great Teams Get Things Done"

Issues we see:
- Feel generic
- Could apply to any competitor
- Don't mention our AI prioritization feature

Please improve each one and explain why.
```

**What you'll get:** Rewritten headlines with explanations of what was weak and what makes the new versions stronger.

---

### Example 3: Full Page Edit (Advanced)

```
/copy-editing

Do a complete copy edit of this TaskFlow landing page. Run through your
full editing process (clarity, voice, specificity, emotion, risk reversal).

Context:
- Audience: Team leads at startups
- Goal: Free trial signups
- Differentiator: AI task prioritization
- Tone: Professional but not corporate

Current copy:
---
[HERO]
Headline: Project Management for Modern Teams
Subhead: TaskFlow helps teams stay organized and productive with
intuitive tools and powerful features.
CTA: Start Your Free Trial

[PROBLEM SECTION]
Managing projects is hard. Teams often struggle with:
- Keeping track of tasks
- Staying aligned on priorities
- Communicating effectively
- Meeting deadlines

[SOLUTION SECTION]
TaskFlow solves these challenges with:
- Smart task boards
- Real-time collaboration
- AI-powered prioritization
- Time tracking and reporting

[CTA]
Ready to transform your team's productivity?
Start your free trial today.
---

Known issues:
- Conversion rate is 2.1%, target is 4%
- Bounce rate is high (65%)
- Users say it "looks like every other PM tool"
```

**What you'll get:** Complete rewrite with before/after for each section, specific changes explained, and prioritized recommendations.

---

### Example 4: Seven Sweeps Editing (Thorough)

```
/copy-editing

Run the complete Seven Sweeps framework on this email:

---
Subject: Check out TaskFlow's new features!

Hi there,

We're excited to announce some amazing new features that will help
you be more productive!

Our new AI prioritization feature uses machine learning to analyze
your tasks and suggest what to work on. It's really powerful and
we think you'll love it.

We also added:
- Better reporting
- Faster performance
- New integrations

Click here to try it out!

Thanks,
The TaskFlow Team
---

Context:
- This is going to existing users (not leads)
- Goal: Get them to try the AI feature
- Open rate has been declining
```

**What you'll get:** The copy run through all seven sweeps (Clarity, Voice/Tone, So What, Prove It, Specificity, Heightened Emotion, Zero Risk) with line-by-line improvements.

---

### Example 5: Quick Polish (Speed Edit)

```
/copy-editing

Quick polish on this CTA section. Keep it short but make it convert better:

---
Ready to get started?
Sign up for TaskFlow today and see how it can help your team.
[Sign Up Button]
---

Context: End of landing page, goal is free trial signups
```

**What you'll get:** Rapid improvements focusing on specificity, urgency, and action-orientation without over-editing.

---

### Example 6: Diagnose Without Rewriting

```
/copy-editing

Don't rewrite this yet—just diagnose what's wrong. Tell me the top 5
problems with this copy and why they might be hurting conversions:

---
TaskFlow: The Ultimate Project Management Solution

In today's fast-paced business environment, teams need powerful
tools to stay ahead. TaskFlow leverages cutting-edge AI technology
to streamline workflows and optimize team performance.

Our platform offers:
• Intuitive task management
• Seamless collaboration features
• Advanced analytics and reporting
• Enterprise-grade security

Trusted by thousands of teams worldwide.

Start your journey to better productivity today.
[Get Started]
---
```

**What you'll get:** Prioritized list of copy problems (vague language, missing specifics, weak social proof, etc.) with explanations of impact on conversions.

---

## Sample Output Preview

When you run `/copy-editing`, expect output like this:

```markdown
## Copy Edit Summary

### Overall Assessment
The copy has good structure but suffers from:
1. Vague, generic language that could describe any PM tool
2. Feature-focused instead of benefit-focused
3. No specificity (numbers, timeframes, proof)
4. Weak CTA that doesn't communicate value

### Line-by-Line Edits

**Original:** "TaskFlow helps teams stay organized and productive"
**Problem:** Vague, could be any tool
**Revised:** "TaskFlow cuts your weekly project coordination time from 4 hours to 30 minutes"
**Why:** Specific, quantified benefit that's easy to imagine

**Original:** "Start Your Free Trial"
**Problem:** Generic CTA, doesn't reduce friction
**Revised:** "Start Free — No Credit Card Required"
**Why:** Reduces perceived commitment, adds friction-reducer

[Continues with more edits...]

### Priority Fixes

1. **Headline** — Replace with specific benefit (impact: high)
2. **Social proof** — Add numbers and logos (impact: high)
3. **CTA copy** — Make value explicit (impact: medium)
```

---

## Tips for Best Results

### Do This
- **Share the full context** — Where this copy lives, who reads it
- **Tell us what's not working** — "Too long," "Not converting," "Feels off"
- **Include your goals** — What action should readers take?
- **Paste the actual copy** — Not a description of it

### Avoid This
- **Partial content** — Full context helps editing
- **Expecting a rewrite** — For new copy, use `/copywriting` instead
- **Skipping context** — "Edit this" without purpose makes editing harder

### Pro Tips
1. **Request specific sweeps** — "Focus on clarity and specificity only"
2. **Ask for before/after** — Easier to see and approve changes
3. **Get diagnosis first** — Understand problems before fixing them
4. **Compare versions** — Edit A/B test variants for consistency

---

## The Seven Sweeps Framework

This skill uses the Seven Sweeps editing method:

| Sweep | Focus | What It Catches |
|-------|-------|-----------------|
| 1. Clarity | Is every sentence clear? | Jargon, confusion, ambiguity |
| 2. Voice & Tone | Does it sound right? | Inconsistent tone, wrong formality |
| 3. So What | Does each sentence earn attention? | Fluff, filler, unnecessary content |
| 4. Prove It | Are claims backed up? | Unsubstantiated claims |
| 5. Specificity | Are details concrete? | Vague language, generalities |
| 6. Heightened Emotion | Does it connect emotionally? | Flat, robotic copy |
| 7. Zero Risk | Are objections addressed? | Missing guarantees, friction |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/copywriting` | When you need new copy, not editing existing copy |
| `/page-cro` | When the problem is page structure, not just copy |
| `/ab-test-setup` | When you have two versions and want to test properly |
| `/marketing-psychology` | When you want to understand why copy works |

---

## Quick Reference

```
/copy-editing

[PASTE YOUR COPY HERE]

Context:
- Type: Landing page | Email | Ad | Social post
- Audience: Who reads this
- Goal: What action you want
- Problem: What's not working
- Voice: How it should sound
```
