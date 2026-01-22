# /popup-cro

Create and optimize popups, modals, and banners.

## Overview

**What it does:** Designs high-converting popups for email capture, lead magnets, discounts, announcements, and more—with optimal trigger strategies, copy, and design.

**When to use it:**
- Creating an exit-intent popup
- Building email capture modals
- Designing announcement banners
- Optimizing existing popup performance
- Planning popup strategy

**What you'll get:**
- Popup copy and CTA recommendations
- Trigger strategy (timing, scroll, exit-intent)
- Design and layout suggestions
- Frequency and targeting rules
- A/B test ideas

---

## How to Invoke

**Command:** `/popup-cro`

**Trigger phrases:**
- "Create a popup for..."
- "Exit intent popup..."
- "Email capture modal..."
- "Optimize our popup..."
- "Popup isn't converting..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Popup goal | What action you want | Email capture, lead download |
| Offer or hook | Why someone would engage | "Get our free ebook" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Trigger | When popup appears | Exit intent, after 30 seconds |
| Current performance | Baseline for optimization | "2% conversion rate" |
| Page context | Where popup appears | "On blog posts only" |
| Audience | Who sees it | "First-time visitors" |

---

## Prompt Examples

### Example 1: Basic Email Capture Popup (Beginner)

```
/popup-cro

Create an email capture popup for TaskFlow's blog.

Goal: Grow newsletter list
Offer: Weekly productivity tips
Audience: Blog readers interested in productivity
```

**What you'll get:** Complete popup with headline, copy, form, CTA, and trigger recommendations.

---

### Example 2: Exit-Intent Popup (Specific Trigger)

```
/popup-cro

Create an exit-intent popup for TaskFlow's pricing page.

Context:
- Visitors look at pricing but leave without signing up
- We offer a 14-day free trial (no credit card)
- Main objection: "Is this worth trying?"

Goal: Capture leads who are considering but hesitant

Possible offers to consider:
1. "Start your free trial" (reinforce it's free)
2. "Get a personalized demo"
3. "Download our ROI calculator"
4. "Chat with us about your needs"

Which offer works best for pricing page exits?
```

**What you'll get:** Exit-intent popup with offer recommendation, copy, and objection-handling messaging.

---

### Example 3: Lead Magnet Popup (Content Upgrade)

```
/popup-cro

Create a lead magnet popup for TaskFlow blog posts.

Lead magnet: "The Team Productivity Playbook" (PDF)
- 25-page guide
- Covers: meeting efficiency, task prioritization, team communication
- Valuable for team leads and managers

Where it appears: Blog posts about productivity/project management
Trigger: After 60 seconds or 50% scroll
Current conversion: 1.5% (we want 4%+)

Include:
- Headline options
- Body copy
- Form fields (what to ask for)
- CTA button text
- Design/layout recommendations
```

**What you'll get:** Optimized lead magnet popup with multiple headline options and conversion-focused copy.

---

### Example 4: Announcement Banner (Top Bar)

```
/popup-cro

Create an announcement banner for TaskFlow's new AI feature launch.

Feature: AI Task Prioritization
- Analyzes tasks and suggests what to focus on each morning
- Available to all Pro and Team users starting today

Where it appears: Site-wide, sticky top bar
Duration: 2 weeks post-launch
Goal: Drive users to learn more / try the feature

Requirements:
- Super concise (it's a top bar)
- Clear CTA
- Option to dismiss
- Not annoying on repeat visits
```

**What you'll get:** Compact banner copy with CTA and frequency/display rules.

---

### Example 5: Popup Optimization (Improve Existing)

```
/popup-cro

Optimize TaskFlow's current email popup. It's underperforming.

Current popup:
---
Headline: "Join Our Newsletter"
Copy: "Get the latest updates and tips delivered to your inbox."
Form: Email field
CTA: "Subscribe"
---

Trigger: Shows after 30 seconds on any page
Performance:
- Shown to: 10,000 visitors/month
- Submissions: 150 (1.5%)
- Target: 3-4%

Issues I suspect:
- Headline is boring
- No clear value proposition
- "Subscribe" is a weak CTA
- Shows to everyone, including returning visitors

What should we change?
```

**What you'll get:** Specific improvements to each element with before/after comparisons.

---

### Example 6: Full Popup Strategy (Multiple Popups)

```
/popup-cro

Design a popup strategy for TaskFlow with 3-4 different popups.

Pages/contexts to cover:
1. Blog readers (first-time visitors)
2. Pricing page visitors (considering trial)
3. Homepage visitors (early in journey)
4. Exit intent site-wide (last chance capture)

For each popup:
- Goal
- Trigger and targeting
- Offer/hook
- Copy (headline, body, CTA)
- Form fields
- Frequency rules (how often to show)

Also explain:
- How they work together
- Who sees what (priority/rules)
- How to measure success
```

**What you'll get:** Complete popup system with targeting rules, priority hierarchy, and measurement framework.

---

## Sample Output Preview

When you run `/popup-cro`, expect output like this:

```markdown
## Exit-Intent Popup: Pricing Page

### Goal
Capture leaving visitors who showed interest but didn't convert

### Trigger Strategy
- **Trigger:** Exit intent (mouse leaves viewport)
- **Target:** Visitors who viewed pricing page for 10+ seconds
- **Exclude:** Users who already signed up, returning visitors who dismissed

### Popup Content

**Headline:**
"Before you go—have questions?"

**Subhead:**
Getting the right project management tool is a big decision.
We're here to help.

**Body:**
✓ No sales pressure—just answers
✓ We'll show you exactly how TaskFlow fits your team
✓ 15-minute call, your schedule

**Form:**
- Work email (required)
- [Optional: "What's your biggest question about TaskFlow?"]

**CTA Button:**
"Schedule a Quick Call"

**Dismiss link:**
"No thanks, I'll figure it out myself"

---

### Design Recommendations

- **Layout:** Centered modal, 50% overlay darkness
- **Size:** Medium (not overwhelming, not too small)
- **Image:** Friendly photo of support/success team
- **Colors:** Brand colors, high-contrast CTA button

---

### Frequency Rules

- Show once per visitor per session
- If dismissed, don't show again for 7 days
- If converted, never show again
- Mobile: Same popup, but simplified layout

---

### Expected Performance

- Benchmark for exit-intent on pricing: 3-6% conversion
- With personalization: 5-8%
- Recommended test: Compare "schedule call" vs "start trial" offers
```

---

## Tips for Best Results

### Do This
- **Be clear about the offer** — What's the visitor getting?
- **Specify the context** — Which page? What type of visitor?
- **Include current performance** — Helps gauge improvement potential
- **Describe the trigger** — Timing matters for popup success

### Avoid This
- **Showing popups too early** — Let visitors engage first
- **Too many popups** — One per session is usually enough
- **Generic copy** — "Sign up for updates" doesn't compel action
- **Ignoring mobile** — Popups need mobile-specific treatment

### Pro Tips
1. **Match offer to page context** — Pricing page visitors need different hooks than blog readers
2. **Test timing triggers** — 30 seconds vs 60 seconds vs scroll depth
3. **Make dismissal easy** — Annoying popups hurt brand
4. **Personalize when possible** — "Welcome back" for returning visitors

---

## Popup Types Reference

| Type | Best For | Typical Conversion |
|------|----------|-------------------|
| Exit-intent | Last chance capture | 3-8% |
| Time-based | Email capture | 2-5% |
| Scroll-triggered | Content upgrades | 3-6% |
| Click-triggered | Specific CTAs | 10-20% |
| Announcement bar | New features, sales | 0.5-2% CTR |

---

## Trigger Strategies

| Trigger | When to Use | Pros | Cons |
|---------|-------------|------|------|
| Time delay | General capture | Simple, predictable | May interrupt too early |
| Scroll depth | Content engagement | Shows to engaged users | May miss quick visitors |
| Exit intent | Last chance | Catches leaving users | Only works on desktop |
| Click trigger | Specific offers | High intent, high conversion | Requires user action |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/form-cro` | When optimizing the form itself, not the popup |
| `/page-cro` | When optimizing the whole page, not just popup |
| `/copywriting` | When you need landing page copy, not popup copy |
| `/email-sequence` | For follow-up after popup conversion |

---

## Quick Reference

```
/popup-cro

Popup type: Email capture | Lead magnet | Announcement | Exit intent
Goal: [What action you want]
Offer: [What the visitor gets]

Context:
- Pages: Where popup appears
- Audience: Who sees it
- Trigger: When it shows (time, scroll, exit)
- Current performance: X% conversion

Requirements:
- Form fields: [What to collect]
- Frequency: [How often to show]
- Mobile: [Same or different treatment]
```
