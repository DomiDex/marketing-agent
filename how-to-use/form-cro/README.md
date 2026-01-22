# /form-cro

Optimize forms for better conversion rates.

## Overview

**What it does:** Analyzes and optimizes any form that's NOT signup/registration—including lead capture, contact forms, demo requests, applications, surveys, and checkout forms.

**When to use it:**
- Demo request form has low submissions
- Lead capture form isn't converting
- Contact form feels too long
- Application form has high abandonment
- Survey completion is low

**What you'll get:**
- Field-by-field optimization
- Layout and structure recommendations
- Error handling improvements
- Trust signal suggestions
- A/B test ideas for forms

---

## How to Invoke

**Command:** `/form-cro`

**Trigger phrases:**
- "Optimize this form..."
- "Lead form isn't converting..."
- "Demo request form needs help..."
- "Contact form optimization..."
- "Improve form completion rate..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Form type | What it's for | Demo request, lead gen, contact |
| Current fields | What you're collecting | Name, email, company, phone |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Conversion rate | Sets baseline | "12% of visitors submit" |
| Where form appears | Affects expectations | "On pricing page after scroll" |
| What happens after | Impacts friction perception | "Goes to sales for call" |
| Required vs optional | Shows where to focus | "All fields are required" |

---

## Prompt Examples

### Example 1: Basic Form Audit (Beginner)

```
/form-cro

Analyze this demo request form:

Fields:
- First name (required)
- Last name (required)
- Work email (required)
- Phone number (required)
- Company name (required)
- Job title (required)
- Company size (dropdown, required)
- What are you looking for? (text area, required)

Submit button: "Request Demo"
```

**What you'll get:** Field-by-field analysis with recommendations on what to keep, remove, or make optional.

---

### Example 2: Low-Converting Demo Form (Intermediate)

```
/form-cro

Optimize TaskFlow's demo request form. Conversion is low.

Current form (on dedicated /demo page):
- First name (required)
- Last name (required)
- Work email (required)
- Phone number (required)
- Company name (required)
- Job title (required)
- Company size dropdown (required)
- "Tell us about your needs" text area (required)
- Checkbox: "I agree to receive marketing communications"
- Submit: "Request Demo"

Performance:
- 500 visitors to /demo page per month
- 60 form submissions (12% conversion)
- Target: 25% conversion
- Drop-off: Users start but don't complete

Context:
- Traffic source: Mostly from pricing page
- Sales process: SDR calls within 24 hours
- Competitor comparison: Asana demo form has 4 fields

What should we keep, remove, or change?
```

**What you'll get:** Prioritized recommendations to dramatically reduce fields while maintaining lead quality.

---

### Example 3: Lead Magnet Form (Content Download)

```
/form-cro

Optimize the form for downloading our "Team Productivity Playbook" ebook.

Current form (appears in popup):
- Full name (required)
- Work email (required)
- Company (required)
- Job title (required)
- Phone number (optional)
- "How did you hear about us?" dropdown (required)

Performance:
- Popup shown: 2,000/month
- Form completions: 180 (9%)
- Target: 20%+

Context:
- This is a lead gen form for cold leads
- Sales team wants to know company for scoring
- Marketing wants attribution data
- It's a free resource, not a demo request
```

**What you'll get:** Recommendations balancing lead quality with conversion rate, including progressive profiling options.

---

### Example 4: Contact Form (Simple)

```
/form-cro

Quick optimization of our contact form:

Current:
- Name (required)
- Email (required)
- Phone (optional)
- Subject dropdown (required): Sales, Support, Partnerships, Other
- Message (required)
- Submit: "Send Message"

Performance: 5% conversion, feels low for a contact form.
Appears at bottom of every page in footer.

Should this be simpler? What's the ideal contact form?
```

**What you'll get:** Streamlined contact form recommendation with layout suggestions.

---

### Example 5: Multi-Step Form Decision (Structure)

```
/form-cro

Should TaskFlow's enterprise contact form be multi-step?

We need to collect:
- Work email
- Full name
- Company name
- Job title
- Team size (critical for pricing)
- Use case (helps sales prep)
- Current tools used (competitive intel)
- Timeline for decision
- Preferred contact method

Currently: Single long form (10 fields)
Issue: Low completion rate (8%)

Questions:
- Should this be multi-step?
- How to group fields if multi-step?
- What's the right number of steps?
- Should some fields be optional or moved to sales call?
```

**What you'll get:** Multi-step form strategy with field grouping, progress indicators, and implementation guidance.

---

### Example 6: Form A/B Test Ideas (Testing)

```
/form-cro

Generate 6 A/B test ideas for TaskFlow's demo request form.

Current form:
- 5 required fields (email, name, company, team size, message)
- Submit button: "Request Demo"
- Conversion rate: 15%
- No social proof near form
- Form is on dedicated /demo page

Already tested:
- Reducing to 3 fields (sales pushed back on lead quality)
- Changing button color (no impact)

We need ideas that:
- Maintain lead quality for sales
- Can show measurable lift
- Are easy to implement
```

**What you'll get:** 6 specific test ideas that balance conversion optimization with lead quality requirements.

---

## Sample Output Preview

When you run `/form-cro`, expect output like this:

```markdown
## Form CRO Analysis: Demo Request Form

### Current State
- Conversion rate: 12%
- Fields: 8 required
- Benchmark for B2B demo forms: 20-30%
- Gap: Significant room for improvement

---

### Field Analysis

| Field | Verdict | Rationale |
|-------|---------|-----------|
| First name | Combine | Merge to single "Name" field |
| Last name | Combine | No need for separate fields |
| Work email | Keep | Essential for follow-up |
| Phone | Make optional | 15% of users abandon at phone |
| Company name | Keep | Important for sales prep |
| Job title | Remove | Can find on LinkedIn after |
| Company size | Keep | Critical for routing/pricing |
| Tell us about needs | Make optional | Barrier to quick submissions |

**Recommended field order:**
1. Work email (validates business context)
2. Name (single field)
3. Company name
4. Company size (dropdown)
5. Phone (optional)
6. Message (optional)

---

### Priority Recommendations

**1. Reduce to 4 required fields (High Impact)**
- Email, name, company, company size
- Expected lift: 40-60% improvement
- Risk: Minimal—other fields are nice-to-have

**2. Add trust signals near form (Medium Impact)**
- Add: "We respond within 2 hours"
- Add: "No sales pressure—just a conversation"
- Add: Company logos below form
- Expected lift: 10-20%

**3. Improve submit button (Quick Win)**
- Current: "Request Demo"
- Better: "Schedule My Demo" (ownership language)
- Or: "Get a Personal Walkthrough"
- Expected lift: 5-10%

---

### Form Layout Recommendations

Before:
```
[First Name] [Last Name]
[Email] [Phone]
[Company] [Title]
[Size dropdown]
[Message textarea]
[Submit]
```

After:
```
[Work Email]
[Name]
[Company] [Size dropdown]
[Phone - optional]
[Submit: "Schedule My Demo"]

"Join 2,000+ teams using TaskFlow"
[Logo] [Logo] [Logo]
```
```

---

## Tips for Best Results

### Do This
- **Share the full form** — All fields, required/optional status
- **Include conversion data** — What's the current rate?
- **Explain what happens after** — Helps gauge appropriate friction
- **Specify form location** — Popup vs. dedicated page matters

### Avoid This
- **Collecting "nice to have" data** — Every field costs conversions
- **Making everything required** — Optional fields reduce friction
- **Ignoring mobile** — Forms often fail on small screens

### Pro Tips
1. **Question every field** — "Do we really need this?"
2. **Consider timing** — Can you get info later instead of now?
3. **Use smart defaults** — Pre-fill what you can
4. **Add trust near forms** — Social proof reduces friction

---

## Form Type Guidelines

| Form Type | Ideal Fields | Benchmark Conversion |
|-----------|--------------|----------------------|
| Demo request | 3-5 fields | 15-30% |
| Content download | 2-3 fields | 15-40% |
| Contact form | 3-4 fields | 10-20% |
| Newsletter signup | 1-2 fields | 2-5% of visitors |
| Application form | 5-10 fields (multi-step) | Varies |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/signup-flow-cro` | For account creation/registration forms |
| `/popup-cro` | For forms inside popups/modals |
| `/page-cro` | When the whole page needs optimization, not just form |
| `/ab-test-setup` | To properly test form changes |

---

## Quick Reference

```
/form-cro

Form type: Demo request | Lead gen | Contact | Application
Location: Dedicated page | Popup | In-page | Footer

Current fields:
1. [Field name] (required/optional)
2. [Field name] (required/optional)
...

Performance:
- Conversion rate: X%
- Where users drop off: [Field or step]

Context:
- What happens after submission: [Sales call, download, etc.]
- Who uses the data: [Sales, marketing, etc.]
- Competitor forms: [How many fields they use]
```
