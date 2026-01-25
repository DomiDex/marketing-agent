# Email Sequence Rules

Supplements `.claude/rules.md` with skill-specific standards for email sequences and automation.

## Rule Inheritance
- **Inherits**: All global rules (writing rules, body copy standards, quality checklist)
- **Overrides**:
  - **Paragraph length**: Emails can use single-sentence paragraphs for emphasis
- **Exemptions**:
  - **Headline rules**: Subject lines follow email-specific patterns, not landing page headline rules

---

## Skill-Specific Standards

### Sequence Strategy
- [ ] Sequence type clearly identified (welcome, nurture, onboarding, re-engagement, etc.)
- [ ] Entry trigger explicitly stated
- [ ] Primary goal defined (what action = success)
- [ ] Exit conditions defined (when they leave the sequence)
- [ ] Timing/delays between emails specified with rationale

### Subject Lines
- [ ] Subject lines are 40-60 characters (optimal for mobile)
- [ ] Subject lines use clear patterns (question, how-to, number, direct, story tease)
- [ ] No ALL CAPS words in subject lines
- [ ] No excessive punctuation (!!!)
- [ ] Emoji use is intentional (or intentionally absent) based on brand

### Preview Text
- [ ] Preview text extends/complements subject line (doesn't repeat it)
- [ ] Preview text is 90-140 characters
- [ ] Preview text adds intrigue or completes the thought

### Email Structure
- [ ] Each email has ONE primary purpose
- [ ] Each email has ONE primary CTA
- [ ] Hook in first line grabs attention
- [ ] Body provides value before asking for action
- [ ] CTA is clear and action-oriented

### Copy Quality
- [ ] Paragraphs are short (1-3 sentences, single sentences encouraged)
- [ ] Tone is conversational and human (would you send this to a friend?)
- [ ] Active voice throughout
- [ ] Second-person focus ("you" not "we")
- [ ] Read aloud check: sounds natural, not robotic

### Personalization
- [ ] Merge fields have fallbacks (e.g., "there" if name unavailable)
- [ ] Personalization feels natural, not creepy
- [ ] Behavioral triggers use relevant data (not just random fields)

---

## Anti-Patterns

1. **Multi-purpose emails**: Trying to onboard, upsell, and ask for review in one email
   → Instead: One email, one job. Stack separate emails for separate goals.

2. **Long emails without value**: 500 words of fluff before the point
   → Instead: Hook immediately. Value first, ask second.

3. **Generic subject lines**: "Monthly Newsletter" or "Update from [Company]"
   → Instead: Specific benefit or curiosity. "3 ways to cut your invoicing time"

4. **Missing preview text**: Letting email client pull random text
   → Instead: Craft preview text intentionally to complement subject line.

5. **Weak CTAs**: "Click here" or "Learn more"
   → Instead: Action + outcome. "Download the checklist" or "Start your free trial"

6. **No exit conditions**: Sequence runs forever regardless of behavior
   → Instead: Define when someone exits (converted, unsubscribed, completed goal)

7. **Identical timing for all sequences**: Every email 2 days apart
   → Instead: Match timing to sequence type (welcome = faster, nurture = slower)

8. **Fake urgency**: "Limited time offer" with no actual deadline
   → Instead: Real urgency only. If no deadline, don't manufacture one.

9. **Missing fallbacks**: "Hi {first_name}" breaking when data missing
   → Instead: Always use fallbacks. "Hi {first_name|there}"

---

## Sequence-Specific Checklists

### Welcome Sequence
- [ ] First email delivers promised value immediately
- [ ] Expectations set for future emails
- [ ] Single next action identified
- [ ] Quick win enabled within first 2-3 emails
- [ ] Brand story/mission shared early in sequence

### Lead Nurture Sequence
- [ ] Lead magnet delivered immediately
- [ ] Expertise established through valuable content
- [ ] Problem articulated deeply before selling
- [ ] Solution presented as natural next step
- [ ] Soft-to-hard CTA progression

### Re-engagement Sequence
- [ ] Genuine check-in tone (not guilt trip)
- [ ] Clear value reminder (what they're missing)
- [ ] Easy win to re-engage offered
- [ ] Final email is clear: stay or go
- [ ] List cleaning action if no response

### Onboarding Sequence
- [ ] Coordinates with in-app onboarding (doesn't duplicate)
- [ ] Focus on activation and first value
- [ ] Help/support readily offered
- [ ] Key features highlighted progressively
- [ ] Success stories used for motivation

---

## Output Structure

### Required Sections

**Sequence Overview**
- [ ] Sequence name
- [ ] Trigger (what starts it)
- [ ] Goal (primary conversion)
- [ ] Length (number of emails)
- [ ] Timing (delays between emails)
- [ ] Exit conditions

**For Each Email**
- [ ] Email number and purpose
- [ ] Send timing
- [ ] Subject line
- [ ] Preview text
- [ ] Full body copy
- [ ] CTA (button text → destination)
- [ ] Segment/conditions (if applicable)

### Optional Sections
- [ ] Alternative subject lines to A/B test
- [ ] Segmentation recommendations
- [ ] Metrics to track with benchmarks
- [ ] Integration notes with other channels

---

## Quality Checklist

Before completing an email sequence:

- [ ] Sequence type and goal clearly defined
- [ ] Entry trigger and exit conditions stated
- [ ] Timing between emails appropriate for sequence type
- [ ] Each email has one purpose and one primary CTA
- [ ] Subject lines are 40-60 characters with clear patterns
- [ ] Preview text crafted (not defaulting to body text)
- [ ] Hook in first line of each email
- [ ] Conversational tone throughout (passes read-aloud test)
- [ ] Merge fields have fallbacks
- [ ] No fake urgency or manufactured scarcity
- [ ] CTA buttons are action + outcome
- [ ] Global rules from `.claude/rules.md` satisfied
- [ ] Mobile-friendly formatting (short paragraphs)

---

## Email Length Guidelines

| Email Type | Target Length | Notes |
|------------|---------------|-------|
| Transactional | 50-125 words | Get to the point |
| Educational | 150-300 words | Value-focused |
| Story-driven | 300-500 words | Engaging narrative required |
| Conversion | 100-200 words | Clear value + clear ask |

---

## Version History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-23 | Initial rules based on SKILL.md email frameworks |
