# /seo-audit

Diagnose and fix technical SEO issues.

## Overview

**What it does:** Audits websites for SEO issues across crawlability, indexation, technical performance, on-page optimization, and content quality—with prioritized recommendations.

**When to use it:**
- Diagnosing why pages aren't ranking
- Technical SEO health check
- Preparing for site migration
- Fixing indexation issues
- Improving Core Web Vitals

**What you'll get:**
- Categorized SEO issues
- Prioritized fix recommendations
- Implementation guidance
- Technical specifications
- Monitoring approach

---

## How to Invoke

**Command:** `/seo-audit`

**Trigger phrases:**
- "SEO audit of..."
- "Why isn't my site ranking..."
- "Technical SEO issues..."
- "Fix SEO problems..."
- "SEO health check..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Website/URL | What to audit | "taskflow.com" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Known issues | Focus the audit | "Pages not getting indexed" |
| Traffic data | Understand impact | "Organic dropped 30%" |
| Tech stack | Technical context | "Next.js on Vercel" |
| Competitors | Benchmark context | "Asana, Monday rank above us" |

---

## Prompt Examples

### Example 1: Basic SEO Audit (Beginner)

```
/seo-audit

Do an SEO audit for taskflow.com

Focus areas:
- Are pages being indexed properly?
- Any major technical issues?
- Is content optimized for search?
```

**What you'll get:** High-level audit covering major SEO categories with key findings.

---

### Example 2: Indexation Issues (Specific Problem)

```
/seo-audit

Diagnose indexation issues for TaskFlow.

Problem:
- Published 20 blog posts in last 3 months
- Only 5 are showing up in Google
- Search Console shows "Discovered - not indexed" for most

What I know:
- Site is taskflow.com/blog/[slug]
- Using Next.js static generation
- Have a sitemap at /sitemap.xml
- No robots.txt blocking

Why aren't our pages getting indexed?
```

**What you'll get:** Focused diagnosis of indexation problems with specific fixes.

---

### Example 3: Technical SEO Deep Dive (Comprehensive)

```
/seo-audit

Do a comprehensive technical SEO audit for taskflow.com.

Site context:
- SaaS website (marketing pages + blog)
- Built with Next.js, hosted on Vercel
- ~50 pages total (20 marketing, 30 blog)
- Launched 6 months ago

Check for:
1. Crawlability (robots.txt, sitemaps, internal linking)
2. Indexation (what's indexed vs what should be)
3. Technical issues (Core Web Vitals, mobile, security)
4. On-page SEO (titles, metas, headings, content)
5. Site architecture (URL structure, depth, orphan pages)

Prioritize findings by impact and effort.
```

**What you'll get:** Full technical audit with categorized findings and priority matrix.

---

### Example 4: Core Web Vitals Optimization

```
/seo-audit

Help fix Core Web Vitals issues for TaskFlow.

Current metrics (Google Search Console):
- LCP: 4.2s (Poor) — Target: <2.5s
- FID: 180ms (Needs Improvement) — Target: <100ms
- CLS: 0.18 (Needs Improvement) — Target: <0.1

Tech stack:
- Next.js 13
- Images served from AWS S3
- Google Fonts loaded
- Intercom chat widget
- GA4 + GTM scripts

Pages most affected:
- Homepage
- Blog posts with many images

What's causing these issues and how do I fix them?
```

**What you'll get:** Specific technical fixes for each Core Web Vital with implementation guidance.

---

### Example 5: Content SEO Review

```
/seo-audit

Audit content SEO for TaskFlow's blog.

Blog URL: taskflow.com/blog
Current state:
- 25 published posts
- Average 1,500 words
- Targeting keywords like "project management tips"
- Very little organic traffic

Questions:
1. Are we targeting the right keywords?
2. Are posts properly optimized?
3. What's the content quality like?
4. How's our E-E-A-T?
5. What should we fix first?

Include specific examples from our content.
```

**What you'll get:** Content-focused SEO audit with keyword and optimization recommendations.

---

### Example 6: Pre-Migration Audit

```
/seo-audit

Audit TaskFlow before our site migration.

Current: taskflow.com (WordPress)
New: taskflow.com (Next.js on Vercel)

Migration plan:
- Same domain, new tech
- URL structure changing slightly
- Some pages being consolidated

Audit needs:
1. Document current SEO state (baseline)
2. Identify pages to preserve (high-value)
3. Plan redirects needed
4. Check for issues to fix during migration
5. Create monitoring plan for post-migration

What could go wrong and how do we prevent it?
```

**What you'll get:** Migration-focused audit with preservation and redirect recommendations.

---

## Sample Output Preview

```markdown
## SEO Audit: taskflow.com

### Executive Summary
- **Overall SEO health:** Moderate (needs work)
- **Critical issues:** 2
- **High priority:** 5
- **Medium priority:** 8

---

### Critical Issues (Fix Immediately)

**1. 15 pages returning 404 errors**
- Impact: High — losing link equity, poor UX
- Pages: /features/old-feature, /blog/draft-post, etc.
- Fix: Implement 301 redirects or restore pages
- Effort: 1 hour

**2. No sitemap submitted to Google Search Console**
- Impact: High — Google may not discover all pages
- Current: /sitemap.xml exists but not submitted
- Fix: Submit sitemap in GSC, verify it's updating
- Effort: 15 minutes

---

### High Priority (This Week)

**3. Missing meta descriptions on 12 pages**
- Pages: Homepage, /pricing, /features, 9 blog posts
- Impact: Lower CTR from search results
- Fix: Write unique meta descriptions for each
- Template: [Primary keyword]. [Benefit]. [CTA]

**4. H1 tags missing or duplicated**
- 3 pages missing H1
- 5 pages have multiple H1s
- Fix: One H1 per page, include target keyword

---

### Technical Checklist

| Area | Status | Notes |
|------|--------|-------|
| Robots.txt | ✅ Good | No issues |
| Sitemap | ⚠️ Issue | Not submitted to GSC |
| HTTPS | ✅ Good | SSL valid |
| Mobile | ✅ Good | Responsive design |
| Core Web Vitals | ⚠️ Issue | LCP needs work |
| Internal linking | ⚠️ Issue | Orphan pages detected |
```

---

## Tips for Best Results

### Do This
- **Share specific problems** — "Traffic dropped" is more useful than "audit SEO"
- **Include tech stack** — Helps with technical recommendations
- **Mention known issues** — Avoids duplicate work
- **Provide traffic context** — Helps prioritize

### Avoid This
- **Expecting magic** — Some SEO issues take time to fix
- **Ignoring content quality** — Technical SEO alone doesn't rank
- **Fixing everything at once** — Prioritize by impact

### Pro Tips
1. **Start with Search Console** — Real data beats speculation
2. **Check competitors** — What are they doing that you're not?
3. **Monitor after changes** — Track impact of fixes
4. **Fix foundations first** — Crawlability before content optimization

---

## SEO Audit Framework

| Layer | What to Check |
|-------|---------------|
| Crawlability | Can Google access and crawl pages? |
| Indexation | Are pages being indexed correctly? |
| Technical | Speed, mobile, security, Core Web Vitals |
| On-Page | Titles, metas, headings, content optimization |
| Content | Quality, relevance, E-E-A-T signals |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/schema-markup` | When adding structured data specifically |
| `/programmatic-seo` | When building pages at scale |
| `/page-cro` | When optimizing for conversions, not rankings |
| `/analytics-tracking` | When setting up measurement |

---

## Quick Reference

```
/seo-audit

Website: [URL to audit]

Focus:
- Technical SEO
- Content SEO
- Specific problem: [What's not working]

Context:
- Tech stack: [Framework, hosting]
- Known issues: [What you've noticed]
- Traffic situation: [Current state]

Include:
- Prioritized findings
- Implementation guidance
- Monitoring approach
```
