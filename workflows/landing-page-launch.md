# Workflow: Landing Page Launch

A multi-skill workflow for creating and launching high-converting landing pages.

---

## Overview

| Step | Skill | Output |
|------|-------|--------|
| 1 | Setup | Client profile |
| 2 | `/copywriting` | Page copy draft |
| 3 | `/page-cro` | CRO audit & optimization |
| 4 | `/ab-test-setup` | Test variations |
| 5 | `/analytics-tracking` | Tracking setup |

**Total time**: 2-4 hours
**Prerequisites**: Client profile completed

---

## Step 1: Gather Context

Before starting, ensure you have:

- [ ] Client profile in `clients/{client}/profile.md`
- [ ] Page purpose and primary CTA defined
- [ ] Target audience documented
- [ ] Key differentiators identified
- [ ] Existing assets (testimonials, logos, metrics)

---

## Step 2: Write Copy

**Skill**: `/copywriting`

**Input needed**:
- Page type (landing page, homepage, feature page)
- Primary action (signup, demo, download)
- Traffic source context
- Competitive positioning

**Output**: `output/copywriting/{client}_landing-page_{date}.md`

**Quality check**:
- [ ] Headline passes "so what?" test
- [ ] Benefits are specific and quantified
- [ ] CTA is clear and action-oriented
- [ ] Follows brand voice guidelines

---

## Step 3: CRO Audit

**Skill**: `/page-cro`

**Input needed**:
- Copy draft from Step 2
- Page layout/wireframe (if available)
- Conversion goals and metrics

**Output**: `output/page-cro/{client}_landing-audit_{date}.md`

**Actions**:
- Review structure against CRO best practices
- Identify friction points
- Optimize social proof placement
- Refine CTAs and urgency elements

---

## Step 4: Plan A/B Tests

**Skill**: `/ab-test-setup`

**Input needed**:
- Final page copy
- CRO audit recommendations
- Traffic estimates
- Primary conversion metric

**Output**: `output/ab-test-setup/{client}_landing-tests_{date}.md`

**Typical tests**:
1. Headline variations (benefit vs. curiosity vs. proof)
2. CTA copy and button color
3. Social proof placement
4. Form length (if applicable)

---

## Step 5: Set Up Tracking

**Skill**: `/analytics-tracking`

**Input needed**:
- Page URL
- Conversion events to track
- Analytics platform (GA4, Mixpanel, etc.)
- UTM parameter requirements

**Output**: `output/analytics-tracking/{client}_landing-tracking_{date}.md`

**Must track**:
- Page views
- Scroll depth
- CTA clicks
- Form submissions
- Conversion events

---

## Deliverables Checklist

- [ ] Final copy approved
- [ ] CRO recommendations implemented
- [ ] A/B test plan documented
- [ ] Tracking configured and tested
- [ ] UTM parameters defined for campaigns

---

## Post-Launch

After 2 weeks of traffic:

1. Review analytics data
2. Analyze A/B test results (if sufficient sample)
3. Run `/page-cro` again with real data
4. Iterate on copy based on learnings

---

## Related Workflows

- `email-campaign.md` — Drive traffic via email
- `paid-ads.md` — Drive traffic via ads (coming soon)
