# Decision Doc Template: Decision Analysis Document

Use this template when the user needs to evaluate options and make a recommendation.

---

## Document Structure

```markdown
# Decision: [What Decision Needs to be Made]

**Author:** [Name]
**Date:** [YYYY-MM-DD]
**Status:** Draft / Under Review / Decision Made
**Decision Deadline:** [Date]
**Decider(s):** [Who makes the final call]

---

## Executive Summary

**Decision:** [One sentence describing the decision to be made]
**Recommendation:** [Option X] — [Brief rationale]
**Confidence:** [HIGH/MEDIUM/LOW] — [Why this confidence level]

---

## Context & Background

### Why This Decision Matters
[Why we need to make this decision now]

### What Triggered This
[Event, problem, or opportunity that prompted this decision]

### Current State
[How things work today]

### Constraints
| Constraint | Details |
|------------|---------|
| Budget | [Limit] |
| Timeline | [Deadline] |
| Technical | [Limitations] |
| Team | [Capacity/skills] |
| Other | [Any other constraints] |

---

## Decision Criteria

### Must-Have Criteria (Non-negotiable)

| # | Criterion | Weight | Definition |
|---|-----------|--------|------------|
| 1 | [Criterion] | Required | [What this means] |
| 2 | [Criterion] | Required | [What this means] |

### Should-Have Criteria (Important)

| # | Criterion | Weight (1-5) | Definition |
|---|-----------|--------------|------------|
| 1 | [Criterion] | [5] | [What this means] |
| 2 | [Criterion] | [4] | [What this means] |
| 3 | [Criterion] | [3] | [What this means] |

### Nice-to-Have Criteria (Differentiators)

| # | Criterion | Weight (1-3) | Definition |
|---|-----------|--------------|------------|
| 1 | [Criterion] | [2] | [What this means] |

---

## Options Analysis

### Option 1: [Name] — RECOMMENDED

**Summary:** [One sentence description]

**How It Works:**
[2-3 sentences explaining this option]

**Pros:**
- [Pro 1] — [VERIFIED/ASSUMPTION]
- [Pro 2]
- [Pro 3]

**Cons:**
- [Con 1]
- [Con 2]

**Cost:** [Total cost estimate]
| Category | Cost | Notes |
|----------|------|-------|
| Upfront | [$X] | [Details] |
| Ongoing | [$X/mo] | [Details] |
| Hidden | [$X] | [Migration, training, etc.] |

**Effort:** [T-shirt size or estimate]

**Timeline:** [How long to implement]

**Risks:**
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk] | High/Med/Low | High/Med/Low | [Action] |

**Criteria Score:**
| Criterion | Score (1-5) | Notes |
|-----------|-------------|-------|
| [Criterion 1] | [4] | [Why] |
| [Criterion 2] | [5] | [Why] |
| **Weighted Total** | **[X]** | |

---

### Option 2: [Name]

**Summary:** [One sentence description]

**How It Works:**
[2-3 sentences explaining this option]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Cost:**
| Category | Cost | Notes |
|----------|------|-------|
| Upfront | [$X] | [Details] |
| Ongoing | [$X/mo] | [Details] |

**Effort:** [T-shirt size]

**Timeline:** [Duration]

**Risks:**
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk] | Med | Med | [Action] |

**Criteria Score:**
| Criterion | Score (1-5) | Notes |
|-----------|-------------|-------|
| [Criterion 1] | [3] | [Why] |
| [Criterion 2] | [3] | [Why] |
| **Weighted Total** | **[X]** | |

---

### Option 3: [Name]

[Same structure as above...]

---

### Option 4: Do Nothing / Status Quo

**Summary:** Maintain current approach

**What This Means:**
[Implications of not making a change]

**Pros:**
- No implementation cost
- No transition risk
- No learning curve

**Cons:**
- [Problem persists]
- [Opportunity cost]

**Cost:** [$X ongoing cost of current state]

**Risk:** [Risk of inaction]

---

## Comparison Matrix

### Quick Comparison

| Criteria | Option 1 | Option 2 | Option 3 | Do Nothing |
|----------|----------|----------|----------|------------|
| [Criterion 1] | [Score] | [Score] | [Score] | [Score] |
| [Criterion 2] | [Score] | [Score] | [Score] | [Score] |
| [Criterion 3] | [Score] | [Score] | [Score] | [Score] |
| **Total Cost** | [$X] | [$X] | [$X] | [$X] |
| **Timeline** | [X weeks] | [X weeks] | [X weeks] | N/A |
| **Effort** | [Size] | [Size] | [Size] | None |
| **Risk Level** | [Level] | [Level] | [Level] | [Level] |
| **Weighted Score** | **[X]** | **[X]** | **[X]** | **[X]** |

### Visual Comparison

```
                    High Value
                        ↑
          Option 1 ★    |
                        |    Option 2
                        |
    Low Risk ←----------+----------→ High Risk
                        |
             Do Nothing |
                        |    Option 3
                        ↓
                    Low Value
```

---

## Recommendation

### Recommended Option: [Option X]

**Why This Option:**
1. [Primary reason]
2. [Secondary reason]
3. [Additional reason]

**Why Not Other Options:**
- **Option Y:** [Key reason for not choosing]
- **Option Z:** [Key reason for not choosing]
- **Do Nothing:** [Key reason for not choosing]

**Confidence Level:** [HIGH/MEDIUM/LOW]
- [HIGH CONFIDENCE] indicates [strong data, multiple sources, proven approach]
- [MEDIUM CONFIDENCE] indicates [reasonable data, some assumptions]
- [LOW CONFIDENCE] indicates [limited data, significant assumptions]

**Key Assumptions:**
| Assumption | Confidence | If Wrong... |
|------------|------------|-------------|
| [Assumption 1] | [Level] | [Impact] |
| [Assumption 2] | [Level] | [Impact] |

---

## Implementation Plan (If Approved)

### Immediate Next Steps
| Action | Owner | Deadline |
|--------|-------|----------|
| [Action 1] | [Name] | [Date] |
| [Action 2] | [Name] | [Date] |

### High-Level Timeline
| Phase | Duration | Key Milestones |
|-------|----------|----------------|
| Phase 1 | [X weeks] | [Milestone] |
| Phase 2 | [X weeks] | [Milestone] |

### Resources Required
| Resource | Quantity | Cost |
|----------|----------|------|
| [Resource] | [Amount] | [$X] |

---

## Reversibility

**Is This Decision Reversible?** [Yes/No/Partially]

**If Yes:**
- How to reverse: [Process]
- Cost to reverse: [$X]
- Time to reverse: [Duration]

**If No:**
- Point of no return: [When]
- What makes it irreversible: [Factors]

---

## Stakeholder Input

### Stakeholders Consulted

| Stakeholder | Role | Input | Concerns |
|-------------|------|-------|----------|
| [Name] | [Role] | [Their view] | [Any concerns] |

### Dissenting Views
[Document any significant disagreements and why the recommendation still stands]

---

## Open Questions

| # | Question | Impact on Decision | Owner | Due |
|---|----------|-------------------|-------|-----|
| 1 | [Question] | [How it affects choice] | [Who] | [When] |

---

## Decision Log

| Date | Decider | Decision | Rationale |
|------|---------|----------|-----------|
| [Date] | [Name] | [Choice made] | [Brief reason] |

---

## Appendix

### A. Research Data
[Supporting research, benchmarks, quotes]

### B. Detailed Cost Analysis
[Breakdown of cost calculations]

### C. Technical Evaluation
[Deep-dive technical comparison if applicable]

### D. Vendor Comparisons
[If evaluating vendors/tools]
```

---

## Decision Doc Best Practices

1. **Be objective** — Present all options fairly before recommending
2. **Show your work** — Include criteria and scoring methodology
3. **Acknowledge uncertainty** — Use confidence tags
4. **Document dissent** — Capture disagreements transparently
5. **Make it actionable** — Include clear next steps

---

## Quality Checklist

Before delivering:

- [ ] Decision is clearly framed
- [ ] All viable options included
- [ ] Criteria are weighted and justified
- [ ] Each option has pros, cons, costs, risks
- [ ] Comparison matrix is complete
- [ ] Recommendation is clear with rationale
- [ ] Assumptions are documented
- [ ] Implementation steps included
- [ ] Reversibility addressed
