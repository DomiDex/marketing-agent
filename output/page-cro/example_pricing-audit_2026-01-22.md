# Page CRO Audit: Pricing Page

> **Example output** demonstrating page-cro skill quality standards

---

## Page Analyzed

- **URL**: example.com/pricing
- **Page type**: SaaS pricing page
- **Current conversion rate**: 2.1% (visitor to trial)
- **Traffic**: ~8,000 monthly visitors (60% organic, 40% paid)

---

## Executive Summary

**Overall Score: 62/100**

The pricing page has clear tier structure but suffers from:
1. Weak headline that doesn't address buyer's main question
2. Feature overload making comparison difficult
3. Missing social proof at decision point
4. No clear recommendation for undecided visitors

**Estimated impact of fixes**: +40-60% improvement in trial starts

---

## Detailed Findings

### 1. Hero Section

**Current state**:
- Headline: "Simple, Transparent Pricing"
- No subheadline
- Jump straight to pricing cards

**Issues**:
- ❌ Headline is generic (every SaaS says this)
- ❌ Doesn't answer "is this worth it for me?"
- ❌ No value reinforcement before showing price

**Recommendations**:
- Headline: "Everything you need to [key outcome], starting at $X/mo"
- Add subheadline addressing main objection: "No contracts. Cancel anytime. Free migration from [competitor]."
- Include one-line value prop above the fold

**Priority**: High
**Effort**: Low

---

### 2. Pricing Tiers

**Current state**:
- 3 tiers: Starter ($29), Pro ($79), Enterprise (Contact us)
- 15+ features listed per tier with checkmarks
- No visual hierarchy or recommendation

**Issues**:
- ❌ Too many features create decision paralysis
- ❌ No recommended tier highlighted
- ❌ Feature names are internal jargon ("Advanced Webhooks")
- ❌ No context on what each tier is *for*

**Recommendations**:
- Limit to 5-7 key differentiating features
- Add "Most Popular" badge to Pro tier
- Add tier descriptions: "For individuals", "For growing teams", "For enterprises"
- Rename features to benefits: "Connect to 50+ tools" not "Advanced Webhooks"
- Use tooltips for detailed feature explanations

**Priority**: High
**Effort**: Medium

---

### 3. Social Proof

**Current state**:
- Logo strip at bottom of page
- No testimonials
- No usage stats

**Issues**:
- ❌ Social proof is below the fold, after pricing
- ❌ Logos without context don't build trust
- ❌ Missing proof at the decision moment

**Recommendations**:
- Add testimonial near Pro tier: quote from similar-sized company
- Move logo strip higher, add "Trusted by X teams"
- Add specific number: "Join 5,000+ teams" near CTAs
- Include a mini case study: "How [Company] saved X hours/week"

**Priority**: High
**Effort**: Medium

---

### 4. CTAs

**Current state**:
- "Start Free Trial" on all tiers
- No secondary CTA
- No trial details visible

**Issues**:
- ❌ No urgency or specificity
- ❌ Visitors don't know trial length or requirements
- ❌ No path for not-ready-to-commit visitors

**Recommendations**:
- Specify: "Start 14-Day Free Trial"
- Add: "No credit card required" below CTA
- Add secondary CTA: "Compare all features" or "Talk to sales"
- Consider "Get started free" for Starter tier (if freemium)

**Priority**: Medium
**Effort**: Low

---

### 5. FAQ Section

**Current state**:
- 4 basic FAQs at bottom
- Generic questions (payment methods, cancellation)

**Issues**:
- ❌ Doesn't address real objections
- ❌ Missing questions visitors actually have
- ❌ No schema markup for SEO

**Recommendations**:
Add these high-impact FAQs:
- "What happens when I hit my plan's limits?"
- "Can I switch plans anytime?"
- "Do you offer discounts for annual billing?"
- "How does [Product] compare to [Competitor]?"
- "What's included in the free trial?"

Add FAQ schema markup for search visibility.

**Priority**: Medium
**Effort**: Low

---

### 6. Mobile Experience

**Current state**:
- Pricing cards stack vertically
- Long scroll to compare tiers
- Sticky header with logo only

**Issues**:
- ❌ Can't compare tiers side-by-side
- ❌ CTA not visible after scrolling
- ❌ 40% of traffic is mobile but conversion is 50% lower

**Recommendations**:
- Add horizontal swipe between tiers on mobile
- Implement sticky CTA bar on scroll
- Create collapsible feature sections
- Test mobile-specific layout

**Priority**: High
**Effort**: High

---

## A/B Test Recommendations

### Test 1: Headline (High Priority)
- Control: "Simple, Transparent Pricing"
- Variant A: "Plans that grow with your team"
- Variant B: "[Outcome] for teams of any size, from $29/mo"
- **Metric**: Time on page, scroll depth, trial starts

### Test 2: Recommended Tier (High Priority)
- Control: No recommendation
- Variant: "Most Popular" badge on Pro tier + slight visual emphasis
- **Metric**: Pro tier selection rate, overall conversion

### Test 3: Social Proof Placement (Medium Priority)
- Control: Logos at bottom
- Variant: Testimonial between hero and pricing cards
- **Metric**: Trial starts, pricing card engagement

---

## Implementation Roadmap

| Phase | Changes | Effort | Expected Impact |
|-------|---------|--------|-----------------|
| 1 | Headline + CTA copy + trial details | 2 hours | +15-20% |
| 2 | Tier descriptions + feature reduction | 4 hours | +10-15% |
| 3 | Social proof repositioning | 3 hours | +10-15% |
| 4 | FAQ expansion + schema | 2 hours | +5% (SEO benefit) |
| 5 | Mobile optimization | 8 hours | +15-20% (mobile) |

---

## Quick Wins (Do This Week)

1. Add "No credit card required" below all CTAs
2. Add "Most Popular" badge to Pro tier
3. Change headline to include starting price
4. Add trial length to CTA: "Start 14-Day Free Trial"
5. Add one customer testimonial near pricing cards

---

*Output generated following page-cro skill framework and rules.md quality standards.*
