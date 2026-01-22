# /analytics-tracking

Set up, improve, or audit analytics tracking and measurement.

## Overview

**What it does:** Helps implement and optimize analytics tracking—including GA4, Google Tag Manager, UTM parameters, event tracking, and conversion measurement.

**When to use it:**
- Setting up GA4 for a new site
- Designing event tracking strategy
- Creating UTM parameter guidelines
- Auditing existing analytics setup
- Measuring conversion funnels

**What you'll get:**
- Tracking plan with event specifications
- Implementation code/configuration
- UTM parameter strategy
- Measurement framework
- Debugging guidance

---

## How to Invoke

**Command:** `/analytics-tracking`

**Trigger phrases:**
- "Set up analytics..."
- "Track events for..."
- "GA4 implementation..."
- "UTM parameters..."
- "Measure conversions..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| What to measure | Goals and KPIs | "Trial signups, feature adoption" |
| Platform | Tech stack | "GA4 + GTM on Next.js" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Current setup | Avoids duplication | "Have GA4, no event tracking" |
| Key actions | What to track | "Sign up, create project, invite team" |
| Traffic sources | UTM needs | "Google Ads, LinkedIn, email" |

---

## Prompt Examples

### Example 1: GA4 Setup from Scratch (Beginner)

```
/analytics-tracking

Set up GA4 tracking for TaskFlow.

Website: taskflow.com (marketing site)
Tech stack: Next.js on Vercel

Key pages:
- Homepage
- Features page
- Pricing page
- Blog posts

Key actions to track:
- Trial signup button clicks
- Pricing plan selections
- Demo request form submissions
- Blog newsletter signups

What should I track and how?
```

**What you'll get:** GA4 implementation plan with event specifications.

---

### Example 2: Event Tracking Strategy (Intermediate)

```
/analytics-tracking

Design event tracking for TaskFlow's full funnel.

Funnel stages:
1. Awareness (visit site)
2. Consideration (view pricing, features)
3. Trial signup
4. Activation (create project, invite team)
5. Conversion (upgrade to paid)
6. Retention (weekly active)

For each stage:
- What events should we track?
- What properties/parameters?
- How do we connect events to users?

Tech: GA4 + Segment (or similar)
```

**What you'll get:** Full-funnel event tracking plan with naming conventions.

---

### Example 3: UTM Strategy (Attribution)

```
/analytics-tracking

Create a UTM parameter strategy for TaskFlow.

Traffic sources we use:
- Google Ads (multiple campaigns)
- LinkedIn Ads
- Email marketing (newsletter, onboarding)
- Social organic (LinkedIn, Twitter)
- Partner referrals
- Influencer campaigns

Questions:
1. What UTM structure should we use?
2. Naming conventions for each source/medium
3. How to track specific campaigns
4. How to build and manage UTM links
5. Common mistakes to avoid
```

**What you'll get:** Complete UTM framework with naming conventions and examples.

---

### Example 4: Conversion Tracking (Specific)

```
/analytics-tracking

Set up conversion tracking for TaskFlow's trial signup.

Signup flow:
1. Click "Start Free Trial" on pricing page
2. Fill out signup form (email, name, password)
3. Submit form → redirect to /onboarding/welcome
4. Complete onboarding wizard

What to track:
- Button clicks (which CTA, which page)
- Form starts (did they begin filling it?)
- Form completions (successful signups)
- Attribution (what brought them here?)

Tech: GA4 + GTM
Goal: Track full signup funnel with drop-offs
```

**What you'll get:** Step-by-step conversion tracking implementation.

---

### Example 5: Analytics Audit (Review Existing)

```
/analytics-tracking

Audit TaskFlow's current analytics setup.

Current state:
- GA4 installed (basic page views working)
- GTM container with ~10 tags
- Some custom events, but inconsistent naming
- No documented tracking plan

Issues we're seeing:
- Don't know which button clicks to trust
- Conversion data doesn't match payment processor
- UTMs are a mess (everyone makes their own)
- Can't see user journey through funnel

What's wrong and how do we fix it?
```

**What you'll get:** Audit findings with prioritized fixes and documentation.

---

### Example 6: Cross-Platform Tracking (Advanced)

```
/analytics-tracking

Set up tracking across TaskFlow's marketing site and product.

Setup:
- Marketing site: taskflow.com (Next.js)
- App: app.taskflow.com (React SPA)
- Different domains, need to connect user journey

Track:
- Marketing → signup → onboarding → product usage
- Should be able to see: "User from Google Ad → signed up → activated"

Tools available:
- GA4 (both properties)
- Segment (or considering it)
- Mixpanel for product analytics

How do we connect the journey across domains?
```

**What you'll get:** Cross-domain tracking setup with identity resolution approach.

---

## Sample Output Preview

```markdown
## Analytics Tracking Plan: TaskFlow

### Event Naming Convention

Format: `category_action_label`
Examples:
- `cta_click_start_trial`
- `signup_form_submit`
- `pricing_plan_select_pro`

---

### Core Events

**1. CTA Clicks**
```javascript
gtag('event', 'cta_click', {
  'cta_text': 'Start Free Trial',
  'cta_location': 'pricing_hero',
  'page_path': '/pricing'
});
```

**2. Form Submissions**
```javascript
gtag('event', 'signup_complete', {
  'signup_method': 'email', // or 'google', 'github'
  'traffic_source': document.referrer,
  'plan_selected': 'pro'
});
```

---

### UTM Structure

| Parameter | Format | Example |
|-----------|--------|---------|
| utm_source | Platform name | `google`, `linkedin`, `email` |
| utm_medium | Channel type | `cpc`, `social`, `newsletter` |
| utm_campaign | Campaign name | `2024_q1_brand`, `feature_launch` |
| utm_content | Ad/link variant | `headline_a`, `cta_blue` |

**Example URLs:**
```
# Google Ads brand campaign
taskflow.com/?utm_source=google&utm_medium=cpc&utm_campaign=2024_q1_brand

# LinkedIn organic post
taskflow.com/?utm_source=linkedin&utm_medium=social&utm_campaign=founder_posts

# Email newsletter
taskflow.com/?utm_source=email&utm_medium=newsletter&utm_campaign=weekly_digest
```

---

### GTM Implementation

**Trigger: Form Submission**
- Trigger type: Form Submission
- Wait for tags: Enabled
- Check validation: Enabled
- Form ID: `signup-form`

**Tag: GA4 Event**
- Event name: `signup_complete`
- Parameters: [see table]
```

---

## Tips for Best Results

### Do This
- **Start with questions** — What decisions will this data inform?
- **Document everything** — Tracking plan prevents confusion
- **Test before deploying** — Use debug mode, preview mode
- **Name consistently** — Naming conventions are critical

### Avoid This
- **Tracking everything** — Focus on what you'll actually use
- **No naming convention** — Leads to messy, unusable data
- **Skipping testing** — Broken tracking is worse than none
- **Forgetting privacy** — Cookie consent, data retention

### Pro Tips
1. **Start simple** — Basic tracking done right beats complex tracking done wrong
2. **Own your UTMs** — Centralize creation to prevent chaos
3. **Check periodically** — Analytics breaks silently
4. **Connect to decisions** — Every metric should inform an action

---

## Essential Events by Page Type

| Page | Events to Track |
|------|-----------------|
| Homepage | CTA clicks, scroll depth, video plays |
| Pricing | Plan hovers, plan clicks, FAQ opens |
| Signup | Form starts, field completions, errors |
| Blog | Scroll depth, CTA clicks, shares |
| Product | Feature usage, milestone completions |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/ab-test-setup` | When designing experiments |
| `/seo-audit` | When diagnosing search issues |
| `/page-cro` | When optimizing page conversions |

---

## Quick Reference

```
/analytics-tracking

Goal: [What decisions will data inform]
Platform: [GA4, GTM, Segment, etc.]
Tech stack: [Framework, hosting]

Key actions to track:
- [Action 1]
- [Action 2]

Traffic sources:
- [Source 1]
- [Source 2]

Current state:
- [What's set up now]
- [What's broken or missing]

Include:
- Event specifications
- UTM strategy
- Implementation code
- Testing approach
```
