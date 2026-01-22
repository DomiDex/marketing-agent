# /paid-ads

Create and optimize paid advertising campaigns.

## Overview

**What it does:** Helps plan, create, and optimize paid advertising campaigns across Google Ads, Meta (Facebook/Instagram), LinkedIn, Twitter/X, and other platforms.

**When to use it:**
- Planning a new ad campaign
- Writing ad copy and creative briefs
- Setting up audience targeting
- Optimizing underperforming campaigns
- Scaling successful ads

**What you'll get:**
- Campaign strategy and structure
- Ad copy variations
- Audience targeting recommendations
- Budget allocation guidance
- Optimization playbooks

---

## How to Invoke

**Command:** `/paid-ads`

**Trigger phrases:**
- "Create ads for..."
- "Google Ads campaign..."
- "LinkedIn ads..."
- "Facebook ad copy..."
- "Help with paid advertising..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Platform | Where ads will run | "Google Ads," "LinkedIn" |
| Goal | Campaign objective | "Trial signups," "Demo requests" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Budget | Affects strategy | "$5K/month" |
| Target audience | Shapes targeting | "B2B team leads at startups" |
| Product | For ad copy | "AI project management tool" |
| Landing page | Message match | "taskflow.com/trial" |

---

## Prompt Examples

### Example 1: Google Ads Campaign (Beginner)

```
/paid-ads

Create a Google Search campaign for TaskFlow.

Product: AI-powered project management for small teams
Goal: Free trial signups
Budget: $3,000/month
Target: People searching for project management tools
Landing page: taskflow.com/trial
```

**What you'll get:** Campaign structure with ad groups, keywords, and ad copy.

---

### Example 2: LinkedIn Ads (B2B)

```
/paid-ads

Plan a LinkedIn advertising campaign for TaskFlow.

Context:
- B2B SaaS, $14-24/user/month
- Target: Team leads, managers, founders at startups (5-50 employees)
- Goal: Demo requests
- Budget: $5,000/month

What I need:
1. Campaign structure recommendation
2. Audience targeting options
3. Ad format recommendations (single image vs carousel vs video)
4. Ad copy variations (3-5 versions)
5. Landing page recommendations
```

**What you'll get:** Complete LinkedIn campaign plan with targeting and creative.

---

### Example 3: Retargeting Campaign (Specific)

```
/paid-ads

Create a retargeting campaign for TaskFlow website visitors.

Audience segments:
1. Visited pricing page but didn't sign up
2. Started trial signup but didn't complete
3. Blog readers (visited 3+ articles)

For each segment:
- Best platform (Meta, Google, LinkedIn?)
- Ad messaging angle
- Creative approach
- Budget allocation recommendation

Total retargeting budget: $1,000/month
```

**What you'll get:** Segment-specific retargeting strategy with messaging.

---

### Example 4: Ad Copy Variations (Creative)

```
/paid-ads

Write ad copy variations for TaskFlow's Google Search ads.

Campaign: Brand + competitor keywords
Keywords: "TaskFlow vs Asana", "Monday alternative", "project management tool"

Need for each ad:
- 3 headlines (max 30 characters each)
- 2 descriptions (max 90 characters each)
- Make them different enough to test

Provide 5 complete ad variations with different angles:
1. Feature-focused
2. Benefit-focused
3. Social proof
4. Problem-agitate
5. Direct comparison
```

**What you'll get:** 5 complete ad variations with testing rationale.

---

### Example 5: Campaign Optimization (Improve Existing)

```
/paid-ads

Help optimize TaskFlow's underperforming Google Ads campaign.

Current performance:
- Spend: $2,500/month
- Clicks: 800
- Conversions (trial signups): 12
- CPA: $208 (target: $100)
- CTR: 2.1%

Campaign structure:
- 3 ad groups (brand, competitor, generic PM terms)
- 10 keywords per group
- 3 ads per group

What's wrong and how do we fix it? Be specific.
```

**What you'll get:** Diagnostic analysis with specific optimization recommendations.

---

### Example 6: Full-Funnel Paid Strategy (Comprehensive)

```
/paid-ads

Design a full-funnel paid advertising strategy for TaskFlow.

Monthly budget: $10,000

Goals:
- Awareness: Reach new potential customers
- Consideration: Drive website traffic, content engagement
- Conversion: Trial signups

Audience:
- B2B: Team leads at startups and SMBs (5-100 employees)
- Industries: Tech, agencies, professional services
- Geo: US, UK, Canada

Allocate budget across:
- Platforms (Google, LinkedIn, Meta)
- Funnel stages
- Campaign types

Include timeline for ramp-up (starting from scratch).
```

**What you'll get:** Complete paid media strategy with budget allocation.

---

## Sample Output Preview

```markdown
## Google Search Campaign: TaskFlow

### Campaign Structure

**Campaign:** TaskFlow - Search - US
- Daily budget: $100
- Bidding: Maximize conversions (once data, switch to target CPA)

### Ad Groups

**Ad Group 1: Brand Terms**
Keywords: taskflow, task flow app, taskflow project management
Match type: Phrase match
Bid adjustment: +20%

**Ad Group 2: Competitor Terms**
Keywords: asana alternative, monday.com alternative, clickup alternative
Match type: Phrase match

**Ad Group 3: Generic PM Terms**
Keywords: project management tool, team task management, project tracking software
Match type: Phrase match

---

### Ad Copy: Competitor Terms Group

**Ad Variation 1 (Benefit-focused)**
Headlines:
- Headline 1: "Tired of Complex PM Tools?"
- Headline 2: "TaskFlow - Simple & Powerful"
- Headline 3: "Free 14-Day Trial"

Descriptions:
- Desc 1: "AI tells you what to work on each day. No more endless task lists. Start free today."
- Desc 2: "Join 2,000+ teams who switched. No credit card required. Get started in 2 minutes."

**Ad Variation 2 (Social proof)**
Headlines:
- Headline 1: "2,000+ Teams Chose TaskFlow"
- Headline 2: "4.8★ Rating on G2"
- Headline 3: "See Why Teams Switch"
[...]

---

### Negative Keywords
- free (for paid plans campaign)
- jobs, careers, hiring
- tutorial, how to
- review, reviews
- login, sign in
```

---

## Tips for Best Results

### Do This
- **Specify the platform** — Each has different best practices
- **Share your budget** — Affects strategy recommendations
- **Describe your audience** — Better targeting = better ads
- **Include landing page** — Message match is critical

### Avoid This
- **One ad per group** — Always test multiple variations
- **Broad match only** — Start with phrase/exact
- **Ignoring negatives** — Waste budget on irrelevant clicks
- **Set and forget** — Ads need ongoing optimization

### Pro Tips
1. **Start narrow, expand** — Begin with proven audiences
2. **Match message to landing** — Ad → page consistency matters
3. **Test creative early** — Copy matters more than targeting
4. **Track full funnel** — Clicks mean nothing without conversions

---

## Platform Selection Guide

| Platform | Best For | Typical CPC (B2B SaaS) |
|----------|----------|------------------------|
| Google Search | High-intent keywords | $5-20 |
| LinkedIn | B2B targeting precision | $8-15 |
| Meta (FB/IG) | Retargeting, awareness | $2-8 |
| Twitter/X | Tech/developer audience | $3-10 |
| Google Display | Retargeting, awareness | $1-5 |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/copywriting` | When writing landing page copy |
| `/page-cro` | When optimizing landing pages |
| `/analytics-tracking` | When setting up conversion tracking |
| `/ab-test-setup` | When designing ad tests properly |

---

## Quick Reference

```
/paid-ads

Platform: [Google, LinkedIn, Meta, Twitter, etc.]
Goal: [Conversions, traffic, awareness]
Budget: [Monthly spend]

Audience:
- [Who you're targeting]
- [Company size, role, industry]

Product:
- [What you're advertising]
- [Key benefits/differentiators]

Landing page: [URL]

Include:
- Campaign structure
- Ad copy variations
- Targeting recommendations
- Budget allocation
```
