# /blog-strategy

Plan content strategy, create briefs, and write blog posts.

## Overview

**What it does:** Creates blog content strategy, topic clusters, content briefs, and full blog post drafts optimized for SEO and conversion.

**When to use it:**
- Planning a content marketing strategy
- Creating a content brief before writing
- Writing a blog post from scratch
- Generating topic ideas for your blog
- Auditing existing content

**What you'll get:**
- Content strategy with topic clusters
- Detailed content briefs for writers
- Full blog post drafts
- Topic ideas with keyword potential
- SEO-optimized content

---

## How to Invoke

**Command:** `/blog-strategy`

**Trigger phrases:**
- "Create a content strategy for..."
- "Write a blog post about..."
- "Give me blog topic ideas for..."
- "Create a content brief for..."
- "Help me plan my blog content..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Goal | What you want to create | Strategy, brief, or full post |
| Topic/Industry | What domain or subject | Project management for startups |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Target audience | Tailors content angle | "Engineering managers at Series A startups" |
| Business goals | Shapes strategy | "Generate leads for demo requests" |
| Target keyword | Focuses SEO efforts | "sprint planning best practices" |
| Competitors | Identifies gaps | "Competing with Asana's blog" |
| Existing content | Avoids duplication | "We have 20 posts on productivity" |

---

## Prompt Examples

### Example 1: Topic Ideas (Beginner)

```
/blog-strategy

Give me 10 blog post ideas for a project management SaaS targeting startup founders.
```

**What you'll get:** List of topics with potential keywords and content type suggestions.

---

### Example 2: Content Strategy (Intermediate)

```
/blog-strategy

Create a content strategy for our developer tools company.

About us:
- We make an API testing platform
- Target audience: Backend developers and QA engineers
- Goal: Rank for API testing related keywords and generate free trial signups

Current state:
- We have 15 blog posts, mostly product updates
- Getting ~2,000 organic visits/month
- Want to 5x traffic in 12 months

Competitors:
- Postman (dominant blog)
- Insomnia
- Thunder Client
```

**What you'll get:** Full content strategy with topic clusters, content pillars, suggested publishing cadence, and prioritized topic list.

---

### Example 3: Content Brief (For Writers)

```
/blog-strategy

Create a content brief for a blog post targeting "API testing best practices"

Context:
- Our product: API testing platform for developers
- Audience: Mid-level backend developers
- Funnel stage: Top of funnel (awareness)
- Goal: Rank page 1, capture email signups

The brief should be detailed enough for a freelance writer to execute.
```

**What you'll get:** Comprehensive brief including outline, keyword targets, competitor analysis, unique angle, and SEO specifications.

---

### Example 4: Full Blog Post Draft (Advanced)

```
/blog-strategy

Write a blog post on "How to implement API rate limiting in Node.js"

Target keyword: "api rate limiting nodejs"
Secondary keywords: "express rate limit", "nodejs throttling", "api throttle middleware"

Audience: Intermediate Node.js developers building APIs
Length: 1,500-2,000 words
Tone: Technical but approachable

Include:
- Code examples (working, copy-paste ready)
- Multiple implementation approaches
- Best practices section
- Common mistakes to avoid

Our product (mention naturally): RateLimitPro - a managed rate limiting service
CTA: Free tier available, no credit card required
```

**What you'll get:** Complete, publish-ready blog post with code examples, proper formatting, and natural product mention.

---

### Example 5: Pillar + Cluster Strategy (SEO-Focused)

```
/blog-strategy

Design a topic cluster strategy around "remote team management"

Business context:
- We sell team collaboration software
- Main competitors: Slack, Teams, Notion
- Differentiator: Async-first features

I need:
1. One pillar page concept
2. 8-10 cluster article topics
3. Internal linking strategy
4. Recommended publishing order
```

**What you'll get:** Complete topic cluster plan with pillar page outline, cluster topics with keywords, linking map, and prioritized creation order.

---

### Example 6: Content Audit + Recommendations

```
/blog-strategy

Audit these existing blog posts and recommend improvements:

1. "What is Project Management" - 500 words, published 2023
2. "10 Productivity Tips" - 800 words, published 2024
3. "Our Product Update v2.0" - 400 words, published 2024
4. "Remote Work Guide" - 2,000 words, published 2023

Current performance:
- Post 1: 100 visits/month, ranking page 3
- Post 2: 50 visits/month, not ranking
- Post 3: 20 visits/month
- Post 4: 500 visits/month, ranking page 1

Goal: Improve overall blog performance and SEO
```

**What you'll get:** Content audit with specific recommendations: which posts to update, consolidate, delete, or expand.

---

## Sample Output Preview

### Content Brief Output:

```markdown
# Content Brief: How to Run Effective Sprint Planning Meetings

## Overview
- **Target Keyword**: sprint planning meeting
- **Secondary Keywords**: sprint planning tips, agile sprint planning, effective sprint planning
- **Search Intent**: Informational (how-to)
- **Target Length**: 1,800-2,200 words
- **Content Type**: How-to guide
- **Funnel Stage**: Top of funnel

## Audience
- **Primary Reader**: Engineering manager or scrum master
- **Knowledge Level**: Intermediate (knows agile basics)
- **What They Want**: Actionable process to improve sprint planning
- **What They Fear**: Wasting team's time, sprint failures

## Competitive Analysis
| Rank | URL | Word Count | Strengths | Gaps |
|------|-----|------------|-----------|------|
| 1 | atlassian.com/... | 1,500 | Brand authority, clean | Generic, no templates |
| 2 | scrum.org/... | 2,000 | Authoritative | Too theoretical |
| 3 | medium.com/... | 1,200 | Real examples | Dated, poor SEO |

**Our Differentiation**: Include downloadable template + real-world examples from startups

## Outline

### H1: How to Run Effective Sprint Planning Meetings (With Template)

### H2: What Is Sprint Planning?
- Brief definition
- Where it fits in agile/scrum
- Why it matters

### H2: Sprint Planning Preparation (Before the Meeting)
- Review backlog
- Gather context
- Pre-meeting async work

### H2: The Sprint Planning Meeting (Step-by-Step)
- H3: Step 1 - Review sprint goal
- H3: Step 2 - Capacity planning
- H3: Step 3 - Story selection
- H3: Step 4 - Task breakdown
- H3: Step 5 - Commitment

### H2: Sprint Planning Best Practices
- 5-7 tips with explanations

### H2: Common Sprint Planning Mistakes
- 4-5 mistakes with solutions

### H2: Sprint Planning Template [Downloadable]
- Visual template preview
- Link to download

### H2: Conclusion + CTA

## Must Include
- [ ] Step-by-step process (numbered)
- [ ] Time recommendations for each step
- [ ] Downloadable template mention
- [ ] Real example from a startup
- [ ] Product mention in tools section

## CTA
- **Primary**: Download sprint planning template
- **Secondary**: Try [Product] free for sprint management

## SEO Elements
- **Title Tag**: How to Run Effective Sprint Planning Meetings [+ Template]
- **Meta Description**: Learn how to run sprint planning meetings that actually work. Includes step-by-step process, best practices, and a free downloadable template.
- **URL**: /blog/sprint-planning-meeting-guide
```

---

## Tips for Best Results

### Do This
- **Specify the output type** — Strategy, brief, or full post
- **Include target keywords** — Helps with SEO optimization
- **Share competitor examples** — Identifies content gaps
- **Define your audience clearly** — Affects tone and depth

### Avoid This
- **Vague goals** — "Write about marketing" is too broad
- **Skipping audience info** — Content for beginners differs from experts
- **Ignoring search intent** — Match content to what searchers want

### Pro Tips
1. **Start with strategy** — Plan topic clusters before individual posts
2. **Create briefs first** — Even if you're writing yourself, briefs improve quality
3. **Update old content** — Refreshing existing posts often beats new content
4. **Chain with other skills** — Use `/social-content` to promote, `/email-sequence` to distribute

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/copywriting` | When writing landing pages, not blog posts |
| `/seo-audit` | When auditing site-wide SEO, not content specifically |
| `/social-content` | When creating social posts to promote blogs |
| `/content-calendar` | When planning content across multiple channels |
| `/programmatic-seo` | When creating many similar pages at scale |

---

## Quick Reference

```
/blog-strategy

[OUTPUT TYPE]: Strategy | Brief | Full post | Topic ideas | Audit
[TOPIC/KEYWORD]: Main subject or target keyword
[AUDIENCE]: Who will read this (role, level, industry)
[GOAL]: Traffic, leads, thought leadership, sales support
[FUNNEL STAGE]: Top (awareness) | Middle (consideration) | Bottom (decision)
[LENGTH]: Word count target
[TONE]: Technical, casual, formal, conversational
[COMPETITORS]: Blogs you're competing with
[EXISTING CONTENT]: What you already have
```
