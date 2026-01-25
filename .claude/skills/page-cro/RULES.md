# Page CRO Rules

Supplements `.claude/rules.md` with skill-specific standards for conversion rate optimization audits.

## Rule Inheritance
- **Inherits**: All global rules (formatting, quality checklist)
- **Overrides**: None
- **Exemptions**:
  - Headlines/CTAs: CRO analyzes existing copy rather than writing new (though alternatives provided)

---

## Skill-Specific Standards

### Initial Assessment
- [ ] Page type clearly identified (homepage, landing page, pricing, feature, blog)
- [ ] Primary conversion goal stated explicitly
- [ ] Traffic source context noted (if known)
- [ ] Current conversion rate or baseline mentioned (if provided)

### Analysis Depth
- [ ] Value proposition clarity assessed (can visitor understand in 5 seconds?)
- [ ] Headline effectiveness evaluated against strong patterns
- [ ] CTA placement, copy, and hierarchy reviewed
- [ ] Visual hierarchy and scannability analyzed
- [ ] Trust signals and social proof identified and evaluated
- [ ] Likely objections listed with assessment of how page addresses them
- [ ] Friction points called out specifically

### Evidence-Based Recommendations
- [ ] Each recommendation tied to a specific problem on the page
- [ ] Recommendations include "why" this matters for conversions
- [ ] Priority indicated (quick win vs. high-impact change vs. test idea)
- [ ] No recommendations made without identifying the underlying issue first

### Recommendation Specificity
- [ ] Recommendations are actionable (not vague like "improve the headline")
- [ ] Specific copy alternatives provided for key elements
- [ ] Before/after examples included where helpful
- [ ] Effort level indicated (easy, medium, high)

---

## Anti-Patterns

1. **Generic advice**: "You should have a clearer value proposition"
   → Instead: "The headline 'Welcome to Acme' doesn't communicate what you do. Try: 'Cut your invoicing time in half.'"

2. **Feature-focused analysis**: Commenting on what the page has vs. what it does
   → Instead: Evaluate from visitor's perspective. Does this persuade and convert?

3. **Unsupported opinions**: "This CTA color doesn't work"
   → Instead: Ground in principles. "Red CTAs on a red page lack contrast. Test a high-contrast color."

4. **Kitchen sink recommendations**: 20 changes with no prioritization
   → Instead: 3-5 high-impact changes, clearly prioritized, with quick wins separated

5. **Ignoring page context**: Treating all pages the same way
   → Instead: Apply page-specific frameworks (homepage vs. landing page vs. pricing)

6. **Skipping objection analysis**: Not considering why visitors don't convert
   → Instead: List 3-5 likely objections for this page type and assess if addressed

7. **Assuming data not provided**: "Your bounce rate is probably high"
   → Instead: Ask for data or caveat clearly. "If you're seeing high bounce rates, the issue may be..."

---

## Output Structure

### Required Sections
- [ ] **Initial Assessment**: Page type, goal, traffic context
- [ ] **Quick Wins**: Easy changes, immediate impact (2-5 items)
- [ ] **High-Impact Changes**: Bigger changes worth the effort (2-5 items)
- [ ] **Test Ideas**: Hypotheses to A/B test, not assume (2-5 items)
- [ ] **Copy Alternatives**: 2-3 options for headlines, CTAs, value props

### Optional Sections
- [ ] Competitor comparison notes
- [ ] Mobile-specific recommendations
- [ ] Technical performance notes (if relevant)

### Recommendation Format
Each recommendation should include:
- **What**: The specific change
- **Why**: The CRO principle or problem being addressed
- **How**: Implementation guidance or example
- **Priority**: Quick win / High-impact / Test idea

---

## Quality Checklist

Before completing a CRO audit:

- [ ] Page type and goal clearly identified
- [ ] Analysis covers all 7 dimensions (value prop, headline, CTA, visual hierarchy, trust, objections, friction)
- [ ] Each recommendation is specific and actionable
- [ ] Recommendations are prioritized (not an unprioritized list)
- [ ] Copy alternatives provided for key elements
- [ ] Quick wins separated from bigger efforts
- [ ] At least 2-3 test ideas identified (not just assumed improvements)
- [ ] Global rules from `.claude/rules.md` satisfied for any copy written
- [ ] Recommendations match the page type (not generic)
- [ ] No fabricated data or statistics

---

## Page-Type Checklists

### Homepage CRO
- [ ] Serves multiple audiences without being generic
- [ ] Clear positioning statement for cold visitors
- [ ] Quick path to primary conversion action
- [ ] Navigation helps visitors self-select

### Landing Page CRO
- [ ] Message matches traffic source (ad/email consistency)
- [ ] Single CTA focus (navigation removed or minimized)
- [ ] Complete argument on one page
- [ ] Urgency/scarcity only if genuine

### Pricing Page CRO
- [ ] Clear plan comparison
- [ ] Recommended plan indicated
- [ ] Feature clarity (included/excluded)
- [ ] "Which plan is right for me?" anxiety addressed
- [ ] Easy path from pricing to checkout

### Feature Page CRO
- [ ] Feature connected to benefit
- [ ] Use cases and examples shown
- [ ] Comparison to alternatives (if relevant)
- [ ] Clear CTA to try/buy

---

## Version History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-23 | Initial rules based on SKILL.md analysis framework |
