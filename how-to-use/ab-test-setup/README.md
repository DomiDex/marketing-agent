# /ab-test-setup

Design A/B tests with statistical rigor.

## Overview

**What it does:** Helps plan, design, and analyze A/B tests—including hypothesis formation, sample size calculation, variant design, and results interpretation.

**When to use it:**
- Planning a website or product experiment
- Calculating required sample size
- Designing test variants
- Analyzing test results
- Avoiding common testing mistakes

**What you'll get:**
- Clear hypothesis statement
- Sample size requirements
- Variant specifications
- Success metrics definition
- Results analysis framework

---

## How to Invoke

**Command:** `/ab-test-setup`

**Trigger phrases:**
- "Plan an A/B test..."
- "Help me test..."
- "Design an experiment..."
- "How long to run this test..."
- "Analyze these test results..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| What to test | Element or change | "Headline on landing page" |
| Primary metric | How you measure success | "Trial signup rate" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Current baseline | Sets expectations | "2.5% conversion rate" |
| Traffic volume | For sample size calc | "10,000 visitors/month" |
| MDE (minimum detectable effect) | What matters to you | "15% relative lift" |
| Variants planned | What you're comparing | "Control + 2 variants" |

---

## Prompt Examples

### Example 1: Basic Test Planning (Beginner)

```
/ab-test-setup

Plan an A/B test for TaskFlow's landing page headline.

Current headline: "Project Management Made Simple"
New headline: "AI Tells You What to Work On Each Morning"

Goal: Increase trial signups
Current conversion: 2.5%
Monthly traffic: 15,000 visitors
```

**What you'll get:** Complete test plan with hypothesis, sample size, and run time.

---

### Example 2: Multiple Variants (Intermediate)

```
/ab-test-setup

Plan an A/B/n test for TaskFlow's pricing page.

Testing: CTA button text

Variants:
- Control: "Start Free Trial"
- Variant A: "Try TaskFlow Free"
- Variant B: "Get Started — No Credit Card"
- Variant C: "Start My Free Trial"

Context:
- Primary metric: Click to signup page
- Current CTR: 18%
- Monthly visitors to pricing: 5,000
- Want to detect 15% relative improvement
```

**What you'll get:** Multi-variant test design with sample size per variant and recommendations.

---

### Example 3: Sample Size Calculation (Specific)

```
/ab-test-setup

Calculate sample size for this test:

Test: New signup flow (3 fields) vs current (5 fields)
Primary metric: Signup completion rate
Current rate: 35%
Minimum detectable effect: 10% relative (35% → 38.5%)
Confidence level: 95%
Power: 80%

How many visitors do we need per variant?
How long will this take at 8,000 signups/month?
```

**What you'll get:** Precise sample size calculation with run time estimate.

---

### Example 4: Full Test Design (Comprehensive)

```
/ab-test-setup

Design a complete A/B test for TaskFlow's onboarding flow.

Current onboarding:
1. Welcome screen with video (30 sec)
2. Survey (5 questions)
3. Template selection
4. Project creation
5. Team invite
Completion rate: 40%

Proposed change:
Skip survey entirely, move to settings

What I need:
1. Clear hypothesis
2. Primary and secondary metrics
3. Guardrail metrics (what shouldn't break)
4. Sample size and duration
5. Segmentation (new vs returning users?)
6. Success criteria
7. Common pitfalls to avoid
```

**What you'll get:** Comprehensive test specification document.

---

### Example 5: Results Analysis (Post-Test)

```
/ab-test-setup

Analyze these A/B test results:

Test: Landing page headline
Duration: 3 weeks
Traffic: 12,000 total (6,000 per variant)

Results:
Control: 150 conversions (2.5%)
Variant: 186 conversions (3.1%)

Questions:
1. Is this result statistically significant?
2. What's the confidence interval?
3. Should we ship the variant?
4. Any caveats or next steps?
```

**What you'll get:** Statistical analysis with clear recommendation.

---

### Example 6: Test Prioritization (Multiple Ideas)

```
/ab-test-setup

Help prioritize these A/B test ideas for TaskFlow:

Ideas:
1. Homepage headline (3 variants)
2. CTA button color on pricing page
3. Simplified signup form (5 fields → 3)
4. Social proof placement (above vs below fold)
5. Pricing page layout (comparison table vs cards)
6. Free trial length (14 days vs 30 days)
7. Add live chat widget
8. Exit intent popup

Context:
- 20,000 monthly visitors to homepage
- 5,000 to pricing page
- Current signup conversion: 2.8%
- Can run 2 tests per month

Prioritize by: Expected impact × ease of implementation
```

**What you'll get:** Prioritized testing roadmap with rationale.

---

## Sample Output Preview

```markdown
## A/B Test Plan: Landing Page Headline

### Hypothesis
If we change the headline from "Project Management Made Simple" to
"AI Tells You What to Work On Each Morning," we will increase trial
signups by 15% because the new headline communicates a specific,
differentiated benefit rather than a generic claim.

### Test Configuration

| Parameter | Value |
|-----------|-------|
| Test type | A/B (2 variants) |
| Traffic split | 50/50 |
| Primary metric | Trial signup rate |
| Current baseline | 2.5% |
| MDE | 15% relative (2.5% → 2.875%) |
| Confidence level | 95% |
| Power | 80% |

### Sample Size Calculation

- Required per variant: 8,200 visitors
- Total required: 16,400 visitors
- At 15,000/month: ~5 weeks to complete

### Success Criteria
- Variant wins if: Conversion ≥ 2.875% with p < 0.05
- Consider tie if: Confidence interval overlaps baseline
- Variant loses if: Conversion < 2.5% at significance

### Guardrail Metrics
- Bounce rate (shouldn't increase >10%)
- Time on page (shouldn't decrease significantly)
- Signup quality (trial-to-paid rate)
```

---

## Tips for Best Results

### Do This
- **Define success upfront** — What lift makes this worthwhile?
- **Include baseline data** — Current rates essential for calculation
- **Specify traffic volume** — Affects how long test needs to run
- **Consider guardrails** — What shouldn't break?

### Avoid This
- **Peeking at results** — Wait for full sample size
- **Testing too many things** — Isolate variables
- **Running too short** — Underpowered tests give false negatives
- **Ignoring segments** — New vs returning users may differ

### Pro Tips
1. **One change per test** — Easier to attribute results
2. **Document everything** — Hypotheses, decisions, learnings
3. **Pre-register success criteria** — Avoid p-hacking
4. **Consider business impact** — Statistical significance ≠ business significance

---

## Sample Size Quick Reference

| Baseline Rate | 10% Lift | 15% Lift | 20% Lift |
|---------------|----------|----------|----------|
| 1% | 140K | 63K | 36K |
| 2% | 68K | 31K | 18K |
| 5% | 26K | 12K | 7K |
| 10% | 12K | 6K | 3.5K |
| 20% | 5K | 2.5K | 1.5K |

*Per variant, 95% confidence, 80% power*

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/page-cro` | When you need CRO recommendations before testing |
| `/copywriting` | When creating test variants |
| `/analytics-tracking` | When setting up measurement |

---

## Quick Reference

```
/ab-test-setup

What to test: [Element or change]
Primary metric: [How you measure success]

Context:
- Current baseline: X%
- Traffic volume: X/month
- MDE: X% relative improvement
- Variants: Control + X variants

Include:
- Sample size calculation
- Duration estimate
- Success criteria
- Guardrail metrics
```
