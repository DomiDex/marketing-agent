# /schema-markup

Add structured data for rich snippets and better search visibility.

## Overview

**What it does:** Helps implement schema markup (structured data) using JSON-LD format—enabling rich snippets in search results and providing search engines with better context about your content.

**When to use it:**
- Adding schema to a new page type
- Fixing schema validation errors
- Implementing FAQ rich results
- Setting up product schema for e-commerce
- Optimizing for specific rich snippet types

**What you'll get:**
- Ready-to-use JSON-LD code
- Implementation guidance by platform
- Validation recommendations
- Multiple schema type examples
- Testing instructions

---

## How to Invoke

**Command:** `/schema-markup`

**Trigger phrases:**
- "Add schema markup..."
- "Structured data for..."
- "Rich snippets for..."
- "JSON-LD for..."
- "FAQ schema..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Page type | What kind of page | "Product page," "Blog post," "FAQ" |
| Content | What's on the page | Product details, article info |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Current schema | If any exists | "Have Organization already" |
| Platform | Implementation method | "Next.js," "WordPress" |
| Goals | What you want to achieve | "FAQ rich snippets" |

---

## Prompt Examples

### Example 1: FAQ Schema (Common)

```
/schema-markup

Add FAQ schema to TaskFlow's pricing page.

FAQs on the page:
1. "Is there a free trial?" — "Yes, TaskFlow offers a 14-day free trial with no credit card required."
2. "Can I cancel anytime?" — "Absolutely. You can cancel your subscription at any time with no penalties."
3. "Do you offer team discounts?" — "Yes, we offer discounts for annual billing and teams over 20 users."
```

**What you'll get:** Complete FAQPage JSON-LD ready to implement.

---

### Example 2: SoftwareApplication Schema (SaaS)

```
/schema-markup

Create schema markup for TaskFlow's homepage.

Product details:
- Name: TaskFlow
- Category: Project Management Software
- Description: AI-powered project management for small teams
- Operating system: Web-based (Browser)
- Price: Starting at $14/month per user
- Rating: 4.8/5 from 245 reviews
- Website: https://taskflow.com

I want to appear in search with star ratings and price info.
```

**What you'll get:** SoftwareApplication schema with aggregateRating and offers.

---

### Example 3: Article/Blog Post Schema

```
/schema-markup

Add schema to TaskFlow's blog post.

Article details:
- Title: "10 Project Management Mistakes Killing Your Team's Productivity"
- Author: Alex Chen (CEO of TaskFlow)
- Published: January 15, 2026
- Modified: January 20, 2026
- Image: https://taskflow.com/blog/pm-mistakes/hero.jpg
- URL: https://taskflow.com/blog/project-management-mistakes

Include author details and publisher info.
```

**What you'll get:** Article schema with author and publisher information.

---

### Example 4: Organization Schema (Sitewide)

```
/schema-markup

Create comprehensive Organization schema for TaskFlow.

Company details:
- Name: TaskFlow
- URL: https://taskflow.com
- Logo: https://taskflow.com/logo.png
- Description: AI-powered project management for small teams
- Founded: 2024
- Founders: Alex Chen, Jordan Lee
- Social profiles: Twitter, LinkedIn, GitHub

Also include WebSite schema with sitelinks searchbox if appropriate.
```

**What you'll get:** Organization + WebSite schema with sitelinks search.

---

### Example 5: Multiple Schema Types (One Page)

```
/schema-markup

Add schema to TaskFlow's pricing page with multiple types.

Page contains:
1. Product information (pricing tiers)
2. FAQ section (5 questions)
3. Reviews/testimonials (3 customer quotes)

Schema needed:
- SoftwareApplication with pricing
- FAQPage for the FAQ section
- Review schema for testimonials

Show how to combine these on one page.
```

**What you'll get:** Combined schema with multiple types properly structured.

---

### Example 6: Fix Schema Errors

```
/schema-markup

Fix schema validation errors for TaskFlow.

Current errors from Google Search Console:
1. "Missing field 'image'" on Article schema
2. "Invalid URL format" on Organization logo
3. "Missing field 'author'" on blog posts

Current schema:
[paste existing JSON-LD]

Show me the corrected version with all required fields.
```

**What you'll get:** Corrected schema with explanations of what was wrong.

---

## Sample Output Preview

```markdown
## FAQ Schema for Pricing Page

### JSON-LD Code

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is there a free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, TaskFlow offers a 14-day free trial with no credit card required."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. You can cancel your subscription at any time with no penalties."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer team discounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer discounts for annual billing and teams over 20 users."
      }
    }
  ]
}
</script>
```

### Implementation

**Next.js:**
```jsx
import Head from 'next/head';

export default function PricingPage() {
  const faqSchema = {...}; // schema from above

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </Head>
  );
}
```

### Validation
1. Go to: https://search.google.com/test/rich-results
2. Paste your page URL
3. Verify FAQ items appear
```

---

## Tips for Best Results

### Do This
- **Provide accurate data** — Schema must match visible page content
- **Include all required fields** — Check Google's requirements
- **Test before deploying** — Use Rich Results Test
- **Start with one schema type** — Add complexity gradually

### Avoid This
- **Fake or inflated data** — Can result in penalties
- **Schema that doesn't match content** — Must reflect visible page
- **Over-marking** — Don't add schema for everything
- **Ignoring errors** — Fix validation issues promptly

### Pro Tips
1. **Start with Organization + WebSite** — Foundation for all pages
2. **FAQ schema is high-value** — Easy to implement, visible results
3. **Monitor in Search Console** — Check rich result appearances
4. **Keep schema updated** — Prices, ratings, dates change

---

## Common Schema Types

| Type | Use Case | Rich Result |
|------|----------|-------------|
| FAQPage | FAQ sections | Expandable FAQ in search |
| HowTo | Step-by-step guides | Step cards in search |
| Article | Blog posts, news | Enhanced article appearance |
| SoftwareApplication | SaaS products | Price, rating, details |
| Product | Physical/digital products | Price, availability, reviews |
| Organization | Company info | Knowledge panel |
| BreadcrumbList | Navigation paths | Breadcrumb trail in results |
| Review | Testimonials | Star ratings |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/seo-audit` | When diagnosing overall SEO issues |
| `/programmatic-seo` | When building pages at scale |
| `/analytics-tracking` | When setting up other tracking |

---

## Quick Reference

```
/schema-markup

Page type: [FAQ, Article, Product, Organization, etc.]
Page URL: [If helpful for context]

Content:
- [Details to include in schema]
- [Product info, FAQ questions, article details]

Platform: [Next.js, WordPress, Webflow, etc.]

Goals:
- [What rich snippets you want]
- [Any current errors to fix]
```
