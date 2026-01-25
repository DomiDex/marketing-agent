# Workflow: Skill Improvement

A recurring workflow for continuously improving agent/skill performance based on feedback.

---

## Overview

| Step | Action | Output |
|------|--------|--------|
| 1 | Collect | Feedback entries in `.claude/feedback/{skill}/` |
| 2 | Analyze | Pattern identification |
| 3 | Update Metrics | `.claude/metrics/{skill}/metrics.md` |
| 4 | Propose Changes | Rule updates drafted |
| 5 | Implement | Updated RULES.md |
| 6 | Document | CHANGELOG.md updated |

**Frequency**: Weekly or bi-weekly
**Prerequisites**: At least 3-5 feedback entries per skill

---

## Step 1: Collect Feedback

### After Each Skill Use

1. Review the skill output
2. Copy `.claude/feedback/_template.md` to `.claude/feedback/{skill}/{date}_{descriptor}.md`
3. Complete the feedback form:
   - Rate each dimension (1-5)
   - Note what worked well
   - Document issues with severity
   - Suggest rule changes if applicable

### Naming Convention
```
.claude/feedback/{skill}/YYYY-MM-DD_{descriptor}.md

Examples:
- 2026-01-23_homepage-copy.md
- 2026-01-25_pricing-page-audit.md
- 2026-01-27_welcome-sequence.md
```

---

## Step 2: Analyze Patterns

### Review Period
Collect feedback over 1-2 weeks before analysis.

### Pattern Identification Checklist

- [ ] Pull all feedback files for the skill
- [ ] Calculate average scores per dimension
- [ ] Identify recurring issues (3+ occurrences = pattern)
- [ ] Note which rules are consistently followed vs. broken
- [ ] Identify missing rules (issues with no corresponding rule)
- [ ] Flag high-severity issues that occurred even once

### Analysis Questions

1. **What patterns emerge?**
   - Same issue appearing multiple times?
   - Specific rule category underperforming?

2. **What's working?**
   - High scores in certain dimensions?
   - Rules that are always followed?

3. **What's missing?**
   - Issues that no rule addresses?
   - New anti-patterns to document?

4. **What's unclear?**
   - Rules that aren't being followed—are they unclear?
   - Conflicting guidance in different places?

---

## Step 3: Update Metrics

### Skill-Level Metrics

Update `.claude/metrics/{skill}/metrics.md`:

1. Add scores to "Scores Over Time" table
2. Update "Quality Dimensions" averages
3. Add any new common issues to the table
4. Update "Rule Effectiveness" based on compliance patterns
5. Add to "Feedback Summary" sections

### Summary Metrics

Update `.claude/metrics/summary.md`:

1. Update overall stats (outputs tracked, average score)
2. Re-rank skills in performance table
3. Add to "Recent Improvements" if changes made
4. Update "Common Issues Across Skills" if patterns span multiple skills

---

## Step 4: Propose Changes

### Rule Change Types

| Type | When to Use | Example |
|------|-------------|---------|
| **Add rule** | New issue with no coverage | "Subject lines must have fallback text" |
| **Clarify rule** | Existing rule is ambiguous | Add example or more specific criteria |
| **Strengthen rule** | Rule exists but not followed | Add to quality checklist, make more prominent |
| **Add anti-pattern** | Common mistake recurring | Document what not to do + what to do instead |
| **Remove/relax rule** | Rule is unnecessary or too strict | Only if causing problems without benefit |

### Change Documentation Template

```markdown
## Proposed Change

**Skill:** {skill-name}
**Rule file:** `.claude/skills/{skill}/RULES.md`
**Change type:** Add / Clarify / Strengthen / Add anti-pattern / Remove

**Current state:**
{What exists now, if anything}

**Proposed state:**
{What it should say}

**Rationale:**
- Issue observed in: {feedback file references}
- Frequency: {how often}
- Impact: {severity}

**Trade-offs:**
{Any downsides to this change?}
```

---

## Step 5: Implement Changes

### RULES.md Updates

1. Open `.claude/skills/{skill}/RULES.md`
2. Make the proposed changes
3. Update version number in "Version History" table
4. Ensure all checklists remain actionable

### Quality Check

Before saving:
- [ ] Changes are specific and actionable
- [ ] Anti-patterns include both "don't do this" and "do this instead"
- [ ] Checklists are in checkbox format
- [ ] No conflicts with global rules (`.claude/rules.md`)
- [ ] Version number incremented

---

## Step 6: Document Changes

### CHANGELOG.md Update

Add entry to `.claude/skills/{skill}/CHANGELOG.md`:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- {New rules}

### Changed
- {Modified rules}

### Fixed
- {Corrections}

### Feedback Incorporated
- {Reference to feedback files that drove changes}
- Example: `.claude/feedback/copywriting/2026-01-23_homepage-copy.md`
```

### Version Numbering

- **Major (X.0.0)**: Significant restructuring or philosophy change
- **Minor (X.Y.0)**: New rules added
- **Patch (X.Y.Z)**: Clarifications or bug fixes

---

## Improvement Priorities

### Triage Matrix

| Severity | Frequency | Action |
|----------|-----------|--------|
| High | High | Fix immediately |
| High | Low | Add to next improvement cycle |
| Low | High | Consider fixing or documenting as known limitation |
| Low | Low | Backlog |

### Priority Order

1. **Safety issues** (incorrect information, harmful advice)
2. **High-impact quality issues** (usability blockers)
3. **Common annoyances** (frequently noted but not severe)
4. **Polish** (nice-to-have improvements)

---

## Recurring Review Schedule

### Weekly Quick Check
- Review any new feedback entries
- Note any urgent issues to address

### Bi-Weekly Full Review
- Complete Steps 1-6 for skills with sufficient feedback
- Update summary metrics
- Plan next skill batch for RULES.md rollout

### Monthly Retrospective
- Are skills improving over time?
- Which rule changes had the most impact?
- What should we focus on next month?

---

## Task Template for current.md

Add to `tasks/current.md` when running this workflow:

```markdown
## In Progress

- [ ] Skill improvement review ({date range})
  - [ ] Collect feedback for {skill}
  - [ ] Analyze patterns
  - [ ] Update metrics
  - [ ] Propose rule changes
  - [ ] Implement changes to RULES.md
  - [ ] Update CHANGELOG.md
```

---

## Related Files

- **Feedback template**: `.claude/feedback/_template.md`
- **Global rules**: `.claude/rules.md`
- **Skill rules**: `.claude/skills/{skill}/RULES.md`
- **Skill metrics**: `.claude/metrics/{skill}/metrics.md`
- **Summary metrics**: `.claude/metrics/summary.md`

---

## Related Workflows

- None yet (this is the meta-workflow for improving all skills)
