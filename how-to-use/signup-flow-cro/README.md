# /signup-flow-cro

Optimize signup, registration, and account creation flows.

## Overview

**What it does:** Analyzes and optimizes the signup/registration process—from the first form field to account activation—to reduce drop-off and increase completions.

**When to use it:**
- High drop-off during registration
- Long or complex signup forms
- Deciding between single-step and multi-step flows
- Adding social auth options
- Optimizing free trial signup

**What you'll get:**
- Field-by-field optimization recommendations
- Drop-off diagnosis
- A/B test ideas for signup flow
- Form structure recommendations
- Trust and friction reduction tactics

---

## How to Invoke

**Command:** `/signup-flow-cro`

**Trigger phrases:**
- "Optimize our signup flow..."
- "Registration isn't converting..."
- "Reduce signup drop-off..."
- "Improve our signup form..."
- "Free trial signup optimization..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Current flow | Steps and fields | "Email, password, company name, then verify" |
| Product type | Context for signup | "SaaS free trial," "Newsletter" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Drop-off data | Shows where problems are | "60% drop at company name field" |
| Current conversion | Sets baseline | "35% of who start complete signup" |
| What you collect | Enables field analysis | List all required/optional fields |
| Post-signup flow | Affects recommendations | "Goes to onboarding wizard" |

---

## Prompt Examples

### Example 1: Basic Signup Audit (Beginner)

```
/signup-flow-cro

Analyze our signup flow and suggest improvements.

Current signup form fields:
1. Full name
2. Email
3. Password
4. Company name
5. Company size (dropdown)
6. Role (dropdown)
7. How did you hear about us? (dropdown)

After signup: Email verification required, then dashboard
```

**What you'll get:** Field-by-field analysis with recommendations on what to keep, remove, or move to later.

---

### Example 2: Detailed Flow Optimization (Intermediate)

```
/signup-flow-cro

Optimize TaskFlow's signup flow. We're seeing significant drop-off.

Current flow:
Step 1: Landing page with "Start Free Trial" CTA
Step 2: Signup form (single page)
  - Full name (required)
  - Work email (required)
  - Password (required, 8+ chars, special char)
  - Company name (required)
  - Team size dropdown (required)
  - Role dropdown (required)
Step 3: Email verification (click link)
Step 4: Onboarding wizard (create first project)

Analytics:
- 1,000 people click "Start Free Trial" per month
- 450 start filling out the form (45%)
- 200 submit the form (44% of starters, 20% overall)
- 150 verify email (75% of submitters)
- 100 complete onboarding (67% of verified)

Drop-off points:
- Biggest drop: Form start to submission
- Second biggest: Email verification

Competitors (for reference):
- Notion: Just email/Google auth, profile later
- Asana: Email + password, then onboarding
- Monday: Google auth prominent, email backup

Goals:
- Increase form submission rate to 65%+
- Reduce time to first value
```

**What you'll get:** Specific recommendations for each drop-off point with priority order and implementation guidance.

---

### Example 3: Social Auth Decision (Specific Question)

```
/signup-flow-cro

Help us decide on social authentication for TaskFlow signup.

Current situation:
- Email/password only signup
- 35% form completion rate
- B2B audience (team leads at startups)

Options we're considering:
1. Add Google Sign-In only
2. Add Google + Microsoft (for enterprise)
3. Add Google + GitHub (for developer audience)
4. Keep email-only but simplify

Questions:
- Which social auth options make sense for our B2B audience?
- Should social auth be the primary CTA or secondary?
- What's the typical lift from adding Google auth?
- Any downsides to consider?
```

**What you'll get:** Strategic analysis of social auth options with recommendations tailored to B2B SaaS.

---

### Example 4: Multi-Step vs Single-Step (Design Decision)

```
/signup-flow-cro

Should TaskFlow use a multi-step or single-step signup form?

What we need to collect:
- Email (required for account)
- Password (required for security)
- Full name (required for collaboration)
- Company name (nice to have for personalization)
- Team size (nice to have for onboarding path)

Current: Single form with all 5 fields
Considering: Multi-step with 2-3 steps

Constraints:
- We want to personalize onboarding by team size
- Sales team wants company info for lead scoring
- Users have complained current form is "too long"

What's the right approach?
```

**What you'll get:** Decision framework with pros/cons, recommended structure, and progressive profiling strategy.

---

### Example 5: Mobile Signup Optimization (Platform-Specific)

```
/signup-flow-cro

Optimize TaskFlow's signup flow for mobile.

Current mobile performance:
- 40% of signup attempts are mobile
- Mobile completion: 18% (vs 35% desktop)
- Average time on signup page: 45 seconds mobile, 30 seconds desktop

Current form (same on mobile and desktop):
- Full name
- Work email
- Password (with requirements tooltip)
- Company name
- Team size dropdown

Mobile-specific issues we've noticed:
- Password requirements hard to see
- Dropdowns feel clunky
- Form feels long on small screen

Should we have a different mobile experience?
```

**What you'll get:** Mobile-specific optimizations including input types, layout changes, and UX improvements.

---

### Example 6: A/B Test Ideas for Signup (Testing Focus)

```
/signup-flow-cro

Generate 8 A/B test ideas for TaskFlow's signup flow.

Current signup:
- Single page form
- 5 fields (name, email, password, company, team size)
- Email verification required
- Completion rate: 32%

We've already tested:
- Removing team size field (no significant impact)
- Adding progress bar (slight improvement)
- Google auth (couldn't implement due to tech constraints)

Looking for:
- High-impact tests we haven't considered
- Quick wins and bigger bets
- Tests that help us learn about our users

For each test:
- Clear hypothesis
- What to change
- Expected impact
- Risk level
```

**What you'll get:** 8 specific A/B test ideas with implementation guidance and expected outcomes.

---

## Sample Output Preview

When you run `/signup-flow-cro`, expect output like this:

```markdown
## Signup Flow Analysis: TaskFlow

### Funnel Overview
- Start form: 1,000/month
- Submit form: 200 (20% conversion)
- Verify email: 150 (75% of submissions)
- Complete onboarding: 100 (67% of verified)

**Biggest opportunity:** Form start → submission (losing 800 people)

---

### Field-by-Field Analysis

| Field | Recommendation | Rationale |
|-------|----------------|-----------|
| Full name | Keep, simplify to "Name" | Needed for collaboration |
| Work email | Keep | Essential, validates business |
| Password | Simplify requirements | 8+ chars only, no special chars |
| Company name | Move to onboarding | Not needed for initial signup |
| Team size | Move to onboarding | Can be collected later |

**New field order:**
1. Work email
2. Name
3. Password (simplified)
4. [Social auth alternative: "Or continue with Google"]

---

### Priority Recommendations

**1. Reduce to 3 fields (High Impact)**
- Remove company name and team size from signup
- Collect during onboarding wizard instead
- Expected lift: 25-40% improvement in form completion

**2. Add Google Sign-In (High Impact)**
- Make it equally prominent to email signup
- Expected lift: 20-30% of users will choose Google
- Reduces password friction entirely

**3. Remove email verification (Medium Impact)**
- Or: Make it non-blocking (verify later)
- Expected lift: 15-25% more users reach dashboard

---

### A/B Test Roadmap

| Test | Priority | Expected Lift | Effort |
|------|----------|---------------|--------|
| 3 fields vs 5 fields | 1 | +25-40% | Low |
| Add Google auth | 2 | +20-30% | Medium |
| Remove verification | 3 | +15-25% | Low |
```

---

## Tips for Best Results

### Do This
- **Share your funnel data** — Where exactly do people drop off?
- **List all fields** — Required and optional
- **Include competitor context** — What signup experiences do users expect?
- **Describe post-signup flow** — Affects what to collect when

### Avoid This
- **Ignoring mobile** — Often 30-50% of signups
- **Adding "nice to have" fields** — Every field costs conversions
- **Over-validating** — Complex password rules hurt more than help

### Pro Tips
1. **Collect later** — Progressive profiling beats long forms
2. **Test removing verification** — Non-blocking often works fine
3. **Watch for mobile** — What works on desktop may fail on mobile
4. **Consider social auth carefully** — Right options depend on audience

---

## Signup Optimization Principles

| Principle | Application |
|-----------|-------------|
| Reduce fields | Every field is friction—collect only what's essential |
| Progressive profiling | Get users in first, collect details later |
| Match expectations | If competitors use 2 fields, 5 feels excessive |
| Mobile-first | Optimize for thumbs, not keyboards |
| Quick to value | The faster they see the product, the better |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/page-cro` | When the problem is the landing page, not signup flow |
| `/onboarding-cro` | When optimizing what happens after signup |
| `/form-cro` | For non-signup forms (contact, demo request) |
| `/ab-test-setup` | To properly test signup flow changes |

---

## Quick Reference

```
/signup-flow-cro

Current signup flow:
- Step 1: [Fields]
- Step 2: [Verification/next step]
- Step 3: [What happens after]

Metrics:
- Form starts: X/month
- Form completions: X (Y%)
- Verification completions: X (Y%)
- Drop-off points: [Where people leave]

Context:
- Product type: SaaS | Newsletter | Community
- Audience: B2B | B2C | Developer
- Competitors: [What signup they use]
- Constraints: [What can't change]
```
