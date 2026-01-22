# Workflow: Email Campaign

A multi-skill workflow for creating effective email sequences.

---

## Overview

| Step | Skill | Output |
|------|-------|--------|
| 1 | Setup | Campaign brief |
| 2 | `/email-sequence` | Email drafts |
| 3 | `/copy-editing` | Polished copy |
| 4 | `/analytics-tracking` | Tracking setup |

**Total time**: 2-3 hours
**Prerequisites**: Client profile, campaign goals defined

---

## Step 1: Define Campaign

Before starting, document:

### Campaign Type
- [ ] Onboarding (new signups)
- [ ] Nurture (leads not ready to buy)
- [ ] Re-engagement (inactive users)
- [ ] Announcement (product launch, feature)
- [ ] Promotional (sale, offer)

### Campaign Goals

| Goal | Metric | Target |
|------|--------|--------|
| Primary | | |
| Secondary | | |

### Audience Segment
- Who receives this sequence?
- What do they already know?
- What action should they take?

### Constraints
- Number of emails:
- Timeframe:
- Sending frequency:
- Brand voice notes:

---

## Step 2: Draft Sequence

**Skill**: `/email-sequence`

**Input needed**:
- Campaign type and goals
- Audience segment details
- Number of emails and timing
- Key messages to convey
- Desired actions per email

**Output**: `output/email-sequence/{client}_{campaign-type}_{date}.md`

**Each email should include**:
- Subject line + preview text
- Body copy
- CTA (button or link)
- Trigger/timing logic
- Segmentation rules (if applicable)

---

## Step 3: Polish Copy

**Skill**: `/copy-editing`

**Input needed**:
- Email drafts from Step 2
- Brand voice guidelines
- Any compliance requirements

**Output**: Updated email sequence file

**Review for**:
- [ ] Subject lines are compelling (<50 chars)
- [ ] Preview text adds value (not repetitive)
- [ ] Opening hooks reader in first line
- [ ] Single CTA per email (clear action)
- [ ] Tone matches brand voice
- [ ] No spam trigger words
- [ ] Mobile-friendly formatting

---

## Step 4: Set Up Tracking

**Skill**: `/analytics-tracking`

**Input needed**:
- Email platform (Mailchimp, Klaviyo, etc.)
- UTM parameter conventions
- Conversion events to track
- Integration with product analytics

**Output**: `output/analytics-tracking/{client}_{campaign-type}-tracking_{date}.md`

**Track per email**:
- Open rate
- Click rate
- Unsubscribe rate
- Conversion events (signup, purchase, etc.)

**Track for sequence**:
- Overall completion rate
- Drop-off points
- Revenue attributed (if applicable)

---

## Email Platform Setup

### Automation Logic
```
Trigger: [Define entry condition]
    ↓
Email 1 (Day 0)
    ↓
Wait [X] days
    ↓
[Condition check?]
    → Yes: Email 2
    → No: Exit or alternative path
    ↓
Continue sequence...
```

### Branching Conditions
Document any conditional logic:
- Activity-based (opened/clicked/converted)
- Time-based (days since signup)
- Attribute-based (plan type, role, etc.)

---

## Deliverables Checklist

- [ ] All emails written and approved
- [ ] Subject lines A/B variants created
- [ ] Automation logic documented
- [ ] Tracking UTMs defined
- [ ] Test emails sent and reviewed
- [ ] Mobile rendering checked

---

## Post-Launch Optimization

### Week 1
- Monitor delivery and open rates
- Check for spam issues
- Review unsubscribe feedback

### Week 2-4
- Analyze click patterns
- Identify drop-off emails
- A/B test subject lines

### Month 2+
- Review conversion data
- Update underperforming emails
- Consider sequence extensions

---

## Common Sequence Types

### Onboarding (7-day)
1. Welcome + first action
2. Quick win (Day 1)
3. Core feature (Day 3)
4. Social proof (Day 5)
5. Next steps (Day 7)

### Nurture (4-week)
1. Value content
2. Problem awareness
3. Solution education
4. Case study
5. Soft CTA
6. Direct offer

### Re-engagement (3-email)
1. "We miss you" + value reminder
2. What's new since you left
3. Final offer or breakup

---

## Related Workflows

- `landing-page-launch.md` — Where emails drive traffic
- `ab-test-setup.md` — Test email variations (coming soon)
