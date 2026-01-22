# /copywriting

Write compelling marketing copy for any page type.

## Overview

**What it does:** Creates conversion-focused copy for landing pages, homepages, pricing pages, feature pages, and about pages.

**When to use it:**
- Writing a new marketing page from scratch
- Rewriting an underperforming page
- Need headlines, CTAs, or section copy
- Creating product or feature descriptions

**What you'll get:**
- Complete page copy organized by section
- Multiple headline/CTA options with rationale
- Annotations explaining copy choices
- Meta content (title, description) when relevant

---

## How to Invoke

**Command:** `/copywriting`

**Trigger phrases:**
- "Write copy for..."
- "Help me with marketing copy..."
- "Create a landing page..."
- "I need headline help..."
- "Write a homepage..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Page type | What kind of page | Landing page, homepage, pricing |
| Product/service | What you're selling | Project management SaaS |
| Primary CTA | Main action you want | Start free trial |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Target audience | Tailors language and pain points | "Startup founders, 5-20 person teams" |
| Key benefit | Focuses the value prop | "Save 5 hours/week on coordination" |
| Differentiator | Makes copy unique | "AI-powered prioritization" |
| Pain points | Enables problem-agitate-solve | "Scattered across Slack, email, sheets" |
| Social proof | Adds credibility | "2,000+ teams, 4.8/5 on G2" |
| Competitor context | Sharpens positioning | "Unlike Asana, we focus on simplicity" |

---

## Prompt Examples

### Example 1: Basic Landing Page (Beginner)

```
/copywriting

Write a landing page for TaskFlow, a project management tool for small teams.
```

**What you'll get:** A complete landing page with hero, benefits, how it works, social proof, and CTA sections. Copy will be solid but somewhat generic.

---

### Example 2: Detailed Landing Page (Intermediate)

```
/copywriting

Write a landing page for TaskFlow.

Product: Project management tool with task boards, time tracking, and team chat
Audience: Startup founders managing teams of 5-20 people
Pain point: Losing track of tasks scattered across Slack, email, and spreadsheets
Key benefit: One place for all project communication and tracking
Differentiator: AI suggests which tasks to prioritize each morning
Proof: 2,000+ teams, 4.8/5 on G2, customers include Stripe and Vercel
CTA: Start free trial (no credit card required)
Tone: Professional but approachable, not corporate
```

**What you'll get:** Targeted copy that speaks directly to startup founders, addresses their specific pain points, and highlights the AI differentiator.

---

### Example 3: Homepage with Multiple Audiences (Advanced)

```
/copywriting

Write a homepage for TaskFlow that serves three audiences:
1. Individual users looking for personal task management
2. Team leads who need to coordinate 5-20 people
3. Enterprise buyers evaluating for larger rollout

Product info:
- Task boards with customizable workflows
- Real-time collaboration and team chat
- Time tracking and reporting
- AI-powered task prioritization
- Integrations with 100+ tools

Pricing:
- Free: Up to 3 projects, 1 user
- Pro: $12/user/mo, unlimited projects
- Team: $25/user/mo, advanced reporting
- Enterprise: Custom pricing, SSO, dedicated support

Social proof:
- 10,000+ teams
- 4.8/5 on G2 (500+ reviews)
- Customers: Stripe, Vercel, Linear, Notion

The homepage should:
- Lead with broad value prop that works for all
- Provide clear paths for each audience type
- Balance "ready to buy" and "still researching" visitors
- Primary CTA: Start free trial
- Secondary CTA: Book a demo (for enterprise)
```

**What you'll get:** Sophisticated homepage copy with strategic audience segmentation, multiple CTAs, and clear navigation paths.

---

### Example 4: Pricing Page (Specific Page Type)

```
/copywriting

Write a pricing page for TaskFlow.

Tiers:
- Free: Up to 3 projects, 1 user, basic integrations
- Pro ($12/user/mo): Unlimited projects, priority support, advanced integrations
- Team ($25/user/mo): Everything in Pro + reporting, time tracking, team analytics
- Enterprise (custom): SSO, dedicated CSM, SLA, custom integrations

Goal: Get visitors to start with Pro or Team tier
Most popular: Team tier (highlight this)
Key objection: "Is it worth the price vs free tools like Notion?"

Include:
- Clear tier comparison
- FAQ addressing common questions
- Social proof from each tier type
- Enterprise contact form pitch
```

**What you'll get:** Complete pricing page with tier descriptions, comparison content, FAQ, and copy designed to push visitors toward the Team tier.

---

### Example 5: Feature Page for Specific Feature (Advanced)

```
/copywriting

Write a feature page for TaskFlow's AI Task Prioritization feature.

Feature details:
- Analyzes all tasks across your projects daily
- Considers deadlines, dependencies, and team capacity
- Suggests top 5 tasks to focus on each morning
- Learns from your behavior over time
- Works across all projects and teams

Audience: Team leads who struggle with prioritization
Pain point: Spending first hour of day figuring out what to work on
Competition: Most PM tools don't have this - it's our differentiator
Use cases:
1. Morning prioritization ritual
2. Sprint planning assistance
3. Capacity planning for managers

Include:
- Hero explaining the feature benefit
- How it works (3-4 steps)
- Use cases section
- Comparison to doing it manually
- Testimonial placeholder
- CTA: Try AI prioritization free
```

**What you'll get:** Complete feature page that positions AI prioritization as a must-have, with clear use cases and comparison to the status quo.

---

### Example 6: Rewrite Existing Copy (Improvement)

```
/copywriting

Rewrite this landing page headline and hero section. Current version isn't converting well (1.8% signup rate, goal is 4%).

Current copy:
---
Headline: "TaskFlow - Project Management Made Simple"
Subhead: "The all-in-one platform for managing your team's work."
CTA: "Get Started"
---

Context:
- Traffic is mostly from Google Ads targeting "project management software"
- Audience is small team leads (5-15 people)
- Our main differentiator is the AI prioritization feature
- Competitors (Asana, Monday) use similar "simple" messaging

Give me 5 headline options ranging from safe to bold.
```

**What you'll get:** Five headline alternatives with rationale, plus rewritten subhead and CTA options with A/B test recommendations.

---

## Sample Output Preview

When you run `/copywriting`, expect output structured like this:

```markdown
## Page Copy

### Hero Section

**Headline:**
Stop juggling tasks across 5 different tools

**Subheadline:**
TaskFlow brings your team's projects, chat, and priorities into one
place—so you can spend less time coordinating and more time shipping.

**Primary CTA:**
Start Free Trial — No credit card required

**Secondary CTA:**
Watch 2-min demo

### Headline Alternatives

1. **"One place for everything your team is working on"**
   - Safe, clear, broad appeal
   - Similar to Notion's positioning

2. **"AI tells you what to work on. You just do it."**
   - Bold, differentiator-focused
   - Higher risk, higher reward

3. **"Your team's work, finally organized"**
   - Emotional appeal to frustration
   - Implies relief and resolution

[Continues with more sections...]
```

---

## Tips for Best Results

### Do This
- **Provide real customer language** — Share reviews, support tickets, or interview quotes
- **Specify your differentiator** — What makes you different from alternatives?
- **Include social proof** — Numbers and names make copy more credible
- **State your conversion goal** — "Start trial" vs "Book demo" changes the copy approach

### Avoid This
- **Generic descriptions** — "A great tool for teams" gives generic output
- **Feature lists without context** — Features need benefits attached
- **Skipping the audience** — Copy for founders differs from copy for enterprise buyers

### Pro Tips
1. **Request alternatives** — Ask for 3-5 headline options to test
2. **Specify tone** — "Playful like Slack" or "Professional like Salesforce"
3. **Share what failed** — If previous copy underperformed, share it
4. **Chain with CRO** — Use `/page-cro` to optimize after writing

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/copy-editing` | When you have copy that needs polishing, not rewriting |
| `/page-cro` | When you need conversion optimization, not new copy |
| `/email-sequence` | When writing email campaigns instead of web pages |
| `/popup-cro` | When creating popup/modal copy specifically |
| `/ab-test-setup` | When you want to test your new copy properly |

---

## Quick Reference

```
/copywriting

[PAGE TYPE]: Landing page | Homepage | Pricing | Feature | About
[PRODUCT]: Brief description of what you're selling
[AUDIENCE]: Who you're writing for
[PAIN POINTS]: What problems they have
[KEY BENEFIT]: Main value proposition
[DIFFERENTIATOR]: What makes you unique
[SOCIAL PROOF]: Numbers, logos, testimonials
[CTA GOAL]: Start trial | Book demo | Sign up
[TONE]: Professional | Casual | Bold | Playful
```
