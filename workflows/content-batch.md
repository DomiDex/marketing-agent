# Workflow: Content Batch

A multi-skill workflow for batch content creation and coordinated publishing.

---

## Overview

| Step | Skill | Output |
|------|-------|--------|
| 1 | Setup | Client context + pillars |
| 2 | `/content-calendar` | Batch plan |
| 3 | `/copywriting` | Web content batch |
| 4 | `/email-sequence` | Email content batch |
| 5 | `/social-content` | Social content batch |
| 6 | Review | Quality check + scheduling |

**Estimated time**: 4-8 hours (depending on batch size)
**Prerequisites**: Client profile completed, content pillars defined

---

## Step 1: Gather Context

Before starting, ensure you have:

- [ ] Client profile in `clients/{client}/profile.md`
- [ ] Content pillars defined (or define them first)
- [ ] Key dates/events for the period
- [ ] Business goals and priorities
- [ ] Available assets (testimonials, data, images)
- [ ] Publishing cadence by channel

---

## Step 2: Create Batch Plan

**Skill**: `/content-calendar`

**Input needed**:
- Time period (week, month, theme)
- Content pillars
- Channel priorities
- Campaign tie-ins

**Command**:
```
/content-calendar batch plan for [client] - [period/theme]
```

**Output**: `output/content-calendar/batch-plan_{client}_{theme}_{date}.md`

**Quality check**:
- [ ] Pieces map to content pillars
- [ ] Mix is balanced across channels
- [ ] Timeline is realistic
- [ ] Dependencies are identified

---

## Step 3: Generate Web Content

**Skill**: `/copywriting`

**Input needed**:
- Items from batch plan (blog posts, landing pages)
- Key messages from plan
- CTAs that coordinate with other channels

**Command** (run for each item):
```
/copywriting [item type] for [client] - [topic from batch plan]
```

**Output**: `output/copywriting/` (per batch plan)

**Quality check**:
- [ ] Messaging aligns with batch theme
- [ ] CTAs match the plan
- [ ] Links to other content work
- [ ] Follows brand voice

---

## Step 4: Generate Email Content

**Skill**: `/email-sequence`

**Input needed**:
- Email items from batch plan
- Links to web content from Step 3
- Send dates and segments

**Command** (run for each sequence):
```
/email-sequence [sequence type] for [client] - [purpose from batch plan]
```

**Output**: `output/email-sequence/` (per batch plan)

**Quality check**:
- [ ] Links to web content are correct
- [ ] Timing coordinates with social
- [ ] CTAs align with campaign
- [ ] Subject lines follow best practices

---

## Step 5: Generate Social Content

**Skill**: `/social-content`

**Input needed**:
- Social items from batch plan
- Web content to promote/link
- Key messages from batch theme

**Command** (run for each platform/batch):
```
/social-content [platform] posts for [client] - [topic/theme from batch plan]
```

**Output**: `output/social-content/` (per batch plan)

**Quality check**:
- [ ] Posts promote web + email content
- [ ] Messages are consistent across platforms
- [ ] Timing avoids conflicts
- [ ] Hooks are strong

---

## Step 6: Review and Schedule

**Final review**:

### Cross-Channel Consistency
- [ ] Key messages are consistent
- [ ] CTAs don't compete
- [ ] Timeline has no conflicts
- [ ] Links work correctly

### Quality Standards
- [ ] All content passes `rules.md` checks
- [ ] Brand voice is consistent
- [ ] No typos or errors
- [ ] Formatting is correct

### Scheduling
- [ ] Content added to publishing tools
- [ ] Dates confirmed
- [ ] Tracking/UTMs configured
- [ ] Team notified of schedule

---

## Deliverables Checklist

- [ ] Batch plan documented
- [ ] Web content created and reviewed
- [ ] Email content created and reviewed
- [ ] Social content created and reviewed
- [ ] Cross-channel consistency verified
- [ ] Content scheduled in tools
- [ ] Tracking configured

---

## Post-Batch

After content publishes:

1. **Track performance** by piece and channel
2. **Note what worked** for future batches
3. **Identify gaps** in content pillars
4. **Plan next batch** based on learnings

---

## Batch Sizing Guide

| Capacity | Batch Size | Frequency |
|----------|------------|-----------|
| Solo/Small | 4-8 pieces | Weekly |
| Medium | 8-15 pieces | Bi-weekly |
| Large | 15-25 pieces | Monthly |

**Pieces include**: Blog posts, emails, social posts (counted individually)

---

## Related Workflows

- `landing-page-launch.md` — Launch a specific page with full optimization
- `email-campaign.md` — Deep-dive on email sequences

---

## Tips for Efficiency

1. **Batch similar content together** — Write all blog posts, then all emails, then all social
2. **Start with anchor content** — Web content first, then distribute
3. **Repurpose aggressively** — One blog post = multiple social posts + email mention
4. **Template what you can** — Reusable intros, CTAs, signatures
5. **Review as you go** — Catch issues early, not at the end
