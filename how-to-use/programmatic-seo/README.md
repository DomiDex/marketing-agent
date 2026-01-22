# /programmatic-seo

Create SEO-driven pages at scale using templates and data.

## Overview

**What it does:** Helps design and implement programmatic SEO strategies—creating hundreds or thousands of pages from templates and data to capture long-tail search traffic.

**When to use it:**
- Building location pages ("[Product] in [City]")
- Creating comparison pages ("[Product] vs [Competitor]")
- Generating integration pages ("[Product] + [Tool] integration")
- Designing template-based content at scale
- Planning directory or marketplace SEO

**What you'll get:**
- pSEO strategy and playbook selection
- Template design recommendations
- Data structure specifications
- Quality control guidelines
- Implementation roadmap

---

## How to Invoke

**Command:** `/programmatic-seo`

**Trigger phrases:**
- "Programmatic SEO for..."
- "Create pages at scale..."
- "Template pages for..."
- "[X] vs [Y] pages..."
- "Location pages for..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Page type | What pattern to build | "Comparison pages," "Location pages" |
| Data source | What populates templates | "Competitor list," "City database" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Target keywords | Search intent to capture | "TaskFlow vs [competitor]" |
| Unique value | What makes pages useful | "Real user reviews, not just features" |
| Scale | How many pages | "50 comparison pages" |
| Tech stack | Implementation method | "Next.js with MDX" |

---

## Prompt Examples

### Example 1: Competitor Comparison Pages (Common)

```
/programmatic-seo

Design programmatic SEO for TaskFlow comparison pages.

Target keywords:
- "TaskFlow vs Asana"
- "TaskFlow vs Monday"
- "Asana alternative"
- etc.

Competitors to cover:
- Asana, Monday.com, ClickUp, Notion, Trello, Basecamp
- Linear, Height, Plane (smaller)

What I need:
1. Page template structure
2. What data to collect per competitor
3. How to make each page unique/valuable
4. URL structure
5. Internal linking strategy
```

**What you'll get:** Complete pSEO playbook for comparison pages.

---

### Example 2: Integration Pages (SaaS)

```
/programmatic-seo

Create integration pages for TaskFlow.

Context:
- We integrate with 50+ tools
- Examples: Slack, Google Calendar, Notion, Salesforce
- Each integration has different depth of functionality

Page goals:
- Rank for "[TaskFlow] + [Tool] integration"
- Show how the integration works
- Drive signups from integration searches

Template needs:
- Unique content per integration
- Screenshots/visuals strategy
- Use cases specific to each tool
- Setup instructions

How do I make 50+ pages that aren't thin content?
```

**What you'll get:** Integration page strategy with unique value approach.

---

### Example 3: Location Pages (Service Area)

```
/programmatic-seo

Design location pages for TaskFlow's consulting services.

Context:
- TaskFlow offers implementation consulting
- Serve businesses in 25 major US cities
- Want to rank for "project management consulting [city]"

Challenge:
- No physical offices in these cities
- Need genuine local value, not just template swaps
- Google is skeptical of thin location pages

How do we create legitimate local content at scale?
```

**What you'll get:** Ethical location page strategy with unique value signals.

---

### Example 4: Use Case Pages (Persona-Based)

```
/programmatic-seo

Build use case pages for TaskFlow.

Target patterns:
- "Project management for [industry]" (agencies, startups, nonprofits)
- "Project management for [team type]" (marketing, engineering, design)
- "Project management for [use case]" (remote teams, freelancers)

Data I have:
- 15 industries we serve
- 10 team types
- 20 use cases

How do I create 45 unique pages that:
- Target specific search intent
- Show relevant features/benefits
- Include relevant social proof
- Don't feel like the same page with word swaps?
```

**What you'll get:** Persona-based pSEO strategy with differentiation approach.

---

### Example 5: Directory/Listing Pages

```
/programmatic-seo

Create a templates directory for TaskFlow.

Concept:
- Free project management templates
- Categories: marketing, product, engineering, etc.
- Individual template pages + category pages + hub page

Goals:
- Rank for "project management template [type]"
- Capture email addresses for downloads
- Showcase TaskFlow's capabilities

Questions:
1. Directory structure and URLs
2. Template page content requirements
3. Category page design
4. Internal linking structure
5. How to scale to 100+ templates
```

**What you'll get:** Directory pSEO architecture with scalable structure.

---

### Example 6: Quality at Scale (Anti-Thin Content)

```
/programmatic-seo

Help ensure our pSEO doesn't create thin content.

Current plan:
- 200 comparison pages ([TaskFlow] vs [Competitor])
- Template-based generation
- Competitor data from their websites + reviews

Concerns:
- Don't want to be penalized for thin/duplicate content
- Need genuine value on each page
- Should feel hand-crafted even if templated

How do I:
1. Add unique value to each page?
2. Avoid duplicate content issues?
3. Include dynamic/updating content?
4. Build trust signals at scale?
5. Quality check before publishing?
```

**What you'll get:** Quality framework for pSEO with specific techniques.

---

## Sample Output Preview

```markdown
## Programmatic SEO: Comparison Pages

### Strategy Overview
- **Playbook:** Comparisons (You vs Competitor)
- **Target pages:** 50 comparison pages
- **Keywords:** "[TaskFlow] vs [X]", "[X] alternative"
- **Expected traffic:** 500-2,000 visits/month per page (varies by competitor)

---

### URL Structure

```
/compare/[competitor-slug]
Example: /compare/asana
Also create: /compare/ (hub page linking to all)
```

### Template Structure

**Above the fold:**
- H1: "TaskFlow vs [Competitor]: Honest Comparison"
- Quick comparison table (key differences)
- CTA: "Try TaskFlow Free"

**Main content:**
1. Quick verdict (who should choose which)
2. Side-by-side feature comparison table
3. Pricing comparison
4. Pros/cons of each
5. What users say (reviews)
6. Best for [use case] sections
7. FAQ specific to this comparison
8. Final recommendation

### Unique Value Per Page

To avoid thin content, each page must include:
- [ ] Actual user reviews mentioning both products
- [ ] Screenshots from both products
- [ ] Specific feature deep-dives (3 minimum)
- [ ] Pricing calculated for different team sizes
- [ ] Honest "when to choose them over us"

### Data Schema Per Competitor

```yaml
competitor:
  name: "Asana"
  slug: "asana"
  pricing:
    free_tier: true
    starter_price: 10.99
    per_seat: true
  features:
    - name: "Timeline View"
      has_feature: true
      our_comparison: "We call this..."
  reviews:
    - source: "G2"
      rating: 4.3
      quote: "..."
  best_for: ["Enterprise teams", "Complex workflows"]
  weaknesses: ["Learning curve", "Price at scale"]
```

### Quality Checklist

Before publishing each page:
- [ ] 1,500+ words of unique content
- [ ] At least 5 real user quotes
- [ ] Screenshots from both products
- [ ] Accurate, current pricing
- [ ] Working internal links
- [ ] Passes plagiarism check
```

---

## Tips for Best Results

### Do This
- **Start with unique value** — What can you offer that templates alone can't?
- **Use real data** — Reviews, stats, examples from actual sources
- **Quality over quantity** — 50 great pages beat 500 thin ones
- **Plan for updates** — Programmatic pages need maintenance

### Avoid This
- **Thin content** — Template with word swaps only
- **Fake location signals** — If you're not local, don't pretend
- **Ignoring search intent** — Match what users actually want
- **Set and forget** — Monitor and improve over time

### Pro Tips
1. **Add human touch** — Have humans review key pages
2. **Build data moats** — Proprietary data = unique content
3. **Internal link strategically** — pSEO pages should link to each other
4. **Monitor indexation** — Not all pages will/should be indexed

---

## pSEO Playbooks

| Playbook | Pattern | Example |
|----------|---------|---------|
| Comparisons | You vs X | "TaskFlow vs Asana" |
| Alternatives | X alternatives | "Asana alternatives" |
| Integrations | You + X | "TaskFlow Slack integration" |
| Locations | You in X | "TaskFlow in New York" |
| Use cases | You for X | "TaskFlow for marketing teams" |
| Templates | X templates | "Marketing project template" |
| Glossary | What is X | "What is project management" |
| Directory | List of X | "Best project management tools" |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/seo-audit` | When diagnosing existing SEO issues |
| `/schema-markup` | When adding structured data to pSEO pages |
| `/competitor-alternatives` | When creating comparison page copy |
| `/copywriting` | When writing individual page copy |

---

## Quick Reference

```
/programmatic-seo

Page type: [Comparison, Integration, Location, Use case, etc.]
Scale: [How many pages]
Target keywords: [Pattern to capture]

Data available:
- [What data you have]
- [What data you need]

Goals:
- [Traffic, leads, conversions]

Concerns:
- [Quality, uniqueness, thin content]

Include:
- Template structure
- Data schema
- URL structure
- Quality controls
- Implementation roadmap
```
