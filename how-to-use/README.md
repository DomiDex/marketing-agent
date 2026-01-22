# Marketing Agent - How to Use Guide

Your comprehensive guide to all 28 marketing slash commands.

## Quick Start

1. **Invoke a skill**: Type `/skillname` in your prompt (e.g., `/copywriting`)
2. **Provide context**: Tell Claude what you need and any relevant details
3. **Get results**: Receive expert-level marketing output

**Example:**
```
/copywriting

Write a homepage for TaskFlow, a project management tool for small teams.
Target audience: startup founders and team leads.
Key benefit: Save 5+ hours per week on project coordination.
```

---

## Skills by Category

### Content Creation

| Skill | Command | Use For |
|-------|---------|---------|
| [Copywriting](./copywriting/) | `/copywriting` | Landing pages, homepage, feature pages, pricing pages |
| [Copy Editing](./copy-editing/) | `/copy-editing` | Edit and improve existing marketing copy |
| [Email Sequence](./email-sequence/) | `/email-sequence` | Drip campaigns, onboarding, nurture sequences |
| [Social Content](./social-content/) | `/social-content` | LinkedIn, Twitter, Instagram, TikTok posts |
| [Content Calendar](./content-calendar/) | `/content-calendar` | Plan and coordinate content across channels |

### Conversion Optimization

| Skill | Command | Use For |
|-------|---------|---------|
| [Page CRO](./page-cro/) | `/page-cro` | Optimize any marketing page for conversions |
| [Signup Flow CRO](./signup-flow-cro/) | `/signup-flow-cro` | Optimize registration and signup flows |
| [Form CRO](./form-cro/) | `/form-cro` | Optimize lead forms, contact forms, applications |
| [Popup CRO](./popup-cro/) | `/popup-cro` | Create and optimize popups, modals, banners |
| [Onboarding CRO](./onboarding-cro/) | `/onboarding-cro` | Improve user activation and first-run experience |
| [Paywall/Upgrade CRO](./paywall-upgrade-cro/) | `/paywall-upgrade-cro` | Optimize in-app upgrade screens and paywalls |

### Strategy & Research

| Skill | Command | Use For |
|-------|---------|---------|
| [Pricing Strategy](./pricing-strategy/) | `/pricing-strategy` | Pricing decisions, tiers, packaging |
| [A/B Test Setup](./ab-test-setup/) | `/ab-test-setup` | Design experiments with statistical rigor |
| [Marketing Psychology](./marketing-psychology/) | `/marketing-psychology` | Apply psychological principles to marketing |
| [Marketing Ideas](./marketing-ideas/) | `/marketing-ideas` | Generate growth tactics and strategies |
| [Launch Strategy](./launch-strategy/) | `/launch-strategy` | Plan product launches and announcements |
| [Competitor Research](./competitor-research/) | `/competitor-research` | Competitive intelligence and analysis |

### SEO & Technical

| Skill | Command | Use For |
|-------|---------|---------|
| [SEO Audit](./seo-audit/) | `/seo-audit` | Diagnose and fix technical SEO issues |
| [Schema Markup](./schema-markup/) | `/schema-markup` | Add structured data for rich snippets |
| [Programmatic SEO](./programmatic-seo/) | `/programmatic-seo` | Create SEO pages at scale |
| [Analytics Tracking](./analytics-tracking/) | `/analytics-tracking` | Set up GA4, GTM, UTM tracking |

### Acquisition & Growth

| Skill | Command | Use For |
|-------|---------|---------|
| [Paid Ads](./paid-ads/) | `/paid-ads` | Google, Meta, LinkedIn ad campaigns |
| [Referral Program](./referral-program/) | `/referral-program` | Design referral and affiliate programs |
| [Free Tool Strategy](./free-tool-strategy/) | `/free-tool-strategy` | Build marketing tools for lead generation |
| [Competitor Alternatives](./competitor-alternatives/) | `/competitor-alternatives` | Create comparison and alternative pages |

---

---

## How Skills Work

### Automatic Triggering
Skills automatically activate based on your request. These phrases trigger skills:

- "write copy for..." → `/copywriting`
- "optimize this page..." → `/page-cro`
- "create an email sequence..." → `/email-sequence`
- "help with pricing..." → `/pricing-strategy`

### Manual Invocation
Use the slash command directly for explicit control:

```
/page-cro

Analyze this landing page and give me conversion recommendations:
[paste URL or content]
```

---

## Tips for Better Results

### 1. Provide Context
The more context you give, the better the output:

**Minimal (works, but generic):**
```
/copywriting
Write a landing page for my app.
```

**Better (specific and actionable):**
```
/copywriting

Write a landing page for TaskFlow, a project management tool.

Target audience: Startup founders managing teams of 5-20 people
Key pain point: Losing track of tasks across Slack, email, and spreadsheets
Main benefit: One place for all project communication and tracking
Differentiator: AI-powered task prioritization
Social proof: 2,000+ teams, 4.8/5 on G2
CTA goal: Start free trial (no credit card)
```

### 2. Specify Your Stage
Tell Claude where you are in the process:

- "I'm just exploring ideas..."
- "We're launching next week..."
- "This is for an A/B test against our current version..."

### 3. Share What You've Tried
If something isn't working, share it:

```
/page-cro

Our landing page converts at 2.1%, below our 4% target.
Current headline: "Project Management Made Simple"
We've tried adding testimonials but no improvement.
[paste page content]
```

### 4. Request Alternatives
Ask for options when you need them:

```
/copywriting
Give me 5 headline options for our pricing page, ranging from
straightforward to creative.
```

### 5. Chain Skills Together
Use multiple skills for comprehensive work:

1. `/marketing-ideas` → Generate campaign concepts
2. `/copywriting` → Write the landing page
3. `/page-cro` → Optimize for conversions
4. `/ab-test-setup` → Plan the experiment

---

## Example Projects

### Launch a New Feature
1. `/launch-strategy` - Plan the announcement
2. `/copywriting` - Write landing page + email announcement
3. `/social-content` - Create launch posts
4. `/paid-ads` - Set up retargeting campaign

### Improve Conversions
1. `/page-cro` - Audit current page
2. `/ab-test-setup` - Design test for top recommendation
3. `/copywriting` - Write variant copy
4. `/analytics-tracking` - Ensure proper measurement

### Content Planning
1. `/competitor-research` - Analyze competitor content
2. `/marketing-ideas` - Generate content topics
3. `/content-calendar` - Plan the quarter
4. `/email-sequence` - Create nurture sequence

---

## Skill Index (A-Z)

| Skill | Category | Best For |
|-------|----------|----------|
| [A/B Test Setup](./ab-test-setup/) | Strategy | Designing experiments |
| [Analytics Tracking](./analytics-tracking/) | Technical | GA4, GTM, measurement |
| [Competitor Alternatives](./competitor-alternatives/) | Growth | Comparison pages |
| [Competitor Research](./competitor-research/) | Strategy | Competitive intelligence |
| [Content Calendar](./content-calendar/) | Content | Planning content |
| [Copy Editing](./copy-editing/) | Content | Improving existing copy |
| [Copywriting](./copywriting/) | Content | Writing new copy |
| [Email Sequence](./email-sequence/) | Content | Email campaigns |
| [Form CRO](./form-cro/) | CRO | Form optimization |
| [Free Tool Strategy](./free-tool-strategy/) | Growth | Lead gen tools |
| [Launch Strategy](./launch-strategy/) | Strategy | Product launches |
| [Marketing Ideas](./marketing-ideas/) | Strategy | Growth tactics |
| [Marketing Psychology](./marketing-psychology/) | Strategy | Persuasion principles |
| [Onboarding CRO](./onboarding-cro/) | CRO | User activation |
| [Page CRO](./page-cro/) | CRO | Page optimization |
| [Paid Ads](./paid-ads/) | Growth | Ad campaigns |
| [Paywall/Upgrade CRO](./paywall-upgrade-cro/) | CRO | Upgrade screens |
| [Popup CRO](./popup-cro/) | CRO | Popups and modals |
| [Pricing Strategy](./pricing-strategy/) | Strategy | Pricing decisions |
| [Programmatic SEO](./programmatic-seo/) | Technical | Pages at scale |
| [Referral Program](./referral-program/) | Growth | Viral programs |
| [Schema Markup](./schema-markup/) | Technical | Structured data |
| [SEO Audit](./seo-audit/) | Technical | SEO diagnosis |
| [Signup Flow CRO](./signup-flow-cro/) | CRO | Registration flows |
| [Social Content](./social-content/) | Content | Social media posts |

---

## Getting Help

- Check individual skill guides for detailed examples
- Review `/plan/big_plan.md` for project context
- See `/tasks/current.md` for active work
