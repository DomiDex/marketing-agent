# PRD Template: Product Requirements Document

Use this template when the user needs a comprehensive product requirements document with user stories and acceptance criteria.

---

## Document Structure

```markdown
# PRD: [Product/Feature Name]

**Version:** 1.0
**Product Manager:** [Name]
**Date:** [YYYY-MM-DD]
**Status:** Draft / In Review / Approved / In Development

---

## Document Info

| Field | Value |
|-------|-------|
| **Target Release** | [Version/Date] |
| **Priority** | P0 / P1 / P2 |
| **Effort Estimate** | [T-shirt size or points] |
| **Engineering Lead** | [Name] |
| **Design Lead** | [Name] |

---

## Overview

### One-Liner
[Single sentence describing what this is]

### Background
[Context that led to this product/feature need]

### Problem Statement
**Who:** [Target user]
**Problem:** [What they struggle with]
**Impact:** [Consequence of not solving]

### Hypothesis
We believe that [building this feature] for [these users] will [achieve this outcome]. We will know we're right when [measurable signal].

---

## Goals & Non-Goals

### Goals
1. [Specific, measurable goal]
2. [Specific, measurable goal]
3. [Specific, measurable goal]

### Non-Goals
1. [What we're explicitly NOT trying to achieve]
2. [What we're explicitly NOT building]

---

## Success Metrics

### Primary Metrics (Must Hit)

| Metric | Definition | Baseline | Target | Measurement |
|--------|------------|----------|--------|-------------|
| [Metric 1] | [How calculated] | [Current] | [Goal] | [Tool/method] |

### Secondary Metrics (Should Improve)

| Metric | Definition | Baseline | Target | Measurement |
|--------|------------|----------|--------|-------------|
| [Metric 1] | [How calculated] | [Current] | [Goal] | [Tool/method] |

### Guardrail Metrics (Must Not Regress)

| Metric | Definition | Current | Threshold | Alert If |
|--------|------------|---------|-----------|----------|
| [Metric] | [How calculated] | [Current] | [Min acceptable] | [Below X] |

---

## User Research

### Target Users

**Primary Persona: [Name]**
- **Role:** [Job title/function]
- **Goal:** [What they're trying to accomplish]
- **Frustration:** [Current pain point]
- **Quote:** "[Verbatim user quote if available]"

**Secondary Persona: [Name]**
- [Similar details]

### User Research Findings

| Finding | Confidence | Source |
|---------|------------|--------|
| [Insight 1] | [VERIFIED] | [Interviews/surveys/data] |
| [Insight 2] | [ASSUMPTION] | [Needs validation] |

### Jobs to be Done

**Primary JTBD:**
When [situation], I want to [motivation], so I can [expected outcome].

**Secondary JTBD:**
When [situation], I want to [motivation], so I can [expected outcome].

---

## Requirements

### Functional Requirements

#### Epic 1: [Epic Name]

**User Story 1.1: [Title]**
```
As a [user type]
I want to [action]
So that [benefit]
```

**Acceptance Criteria:**
```gherkin
Given [context]
When [action]
Then [expected result]

Given [context]
When [alternative action]
Then [expected result]
```

**Priority:** Must Have / Should Have / Could Have
**Confidence:** [VERIFIED] / [ASSUMPTION]
**Notes:** [Additional context]

---

**User Story 1.2: [Title]**
```
As a [user type]
I want to [action]
So that [benefit]
```

**Acceptance Criteria:**
```gherkin
Given [context]
When [action]
Then [expected result]
```

**Priority:** [Priority]
**Confidence:** [Confidence]

---

#### Epic 2: [Epic Name]

[Continue pattern...]

---

### Non-Functional Requirements

| Category | Requirement | Target | Priority |
|----------|-------------|--------|----------|
| **Performance** | Page load time | < 2 seconds | Must Have |
| **Performance** | API response time | < 500ms p95 | Must Have |
| **Scalability** | Concurrent users | [Number] | Should Have |
| **Reliability** | Uptime | 99.9% | Must Have |
| **Security** | [Requirement] | [Standard] | Must Have |
| **Accessibility** | WCAG compliance | Level AA | Should Have |
| **Localization** | Languages | [List] | Could Have |

---

## User Experience

### User Flows

**Happy Path:**
```
[Entry Point] → [Step 1] → [Step 2] → [Success State]
```

**Error Path:**
```
[Entry Point] → [Step 1] → [Error] → [Recovery] → [Success State]
```

### Wireframes/Mockups
[Link to Figma/design files]

**Key Screens:**
1. [Screen 1] — [Purpose]
2. [Screen 2] — [Purpose]

### Interaction Specifications

| Element | Behavior | State Changes |
|---------|----------|---------------|
| [Button X] | [What happens on click] | [Loading → Success/Error] |
| [Form field Y] | [Validation rules] | [Valid/Invalid states] |

---

## Technical Specifications

### Architecture Overview
[High-level architecture diagram or description]

### API Specifications

**Endpoint: [Method] /path**
```json
// Request
{
  "field1": "string",
  "field2": "number"
}

// Response (200 OK)
{
  "id": "string",
  "status": "success"
}

// Error (400 Bad Request)
{
  "error": "description"
}
```

### Data Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | Yes | Unique identifier |
| [field] | [type] | [Yes/No] | [Description] |

### Integration Points

| System | Integration Type | Purpose | Owner |
|--------|-----------------|---------|-------|
| [System] | REST API | [What data exchanged] | [Team] |

### Technical Constraints

| Constraint | Description | Impact |
|------------|-------------|--------|
| [Constraint 1] | [Details] | [How it affects implementation] |

---

## Edge Cases & Error Handling

### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| [Edge case 1] | [What should happen] |
| [Edge case 2] | [What should happen] |
| [Concurrent edit] | [What should happen] |
| [Network failure] | [What should happen] |

### Error Messages

| Error Condition | User Message | Technical Details |
|-----------------|--------------|-------------------|
| [Condition] | "[User-facing message]" | [Error code, logging] |

---

## Dependencies & Risks

### Dependencies

| Dependency | Type | Owner | Status | Impact if Delayed |
|------------|------|-------|--------|-------------------|
| [Dep 1] | Technical | [Team] | Ready | [Impact] |
| [Dep 2] | Design | [Team] | In Progress | [Impact] |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Action] |

---

## Release Plan

### Rollout Strategy
- [ ] Feature flag: [Flag name]
- [ ] Phase 1: [% users] — [Criteria]
- [ ] Phase 2: [% users] — [Criteria]
- [ ] Full rollout: [Criteria]

### Launch Checklist
- [ ] Engineering sign-off
- [ ] Design sign-off
- [ ] QA sign-off
- [ ] Security review complete
- [ ] Documentation updated
- [ ] Support team trained
- [ ] Monitoring/alerts configured
- [ ] Rollback plan tested

### Rollback Plan
[How to disable/revert if issues arise]

---

## Testing Strategy

### Test Scenarios

| Scenario | Type | Priority | Status |
|----------|------|----------|--------|
| [Scenario 1] | Unit | P0 | Not Started |
| [Scenario 2] | Integration | P0 | Not Started |
| [Scenario 3] | E2E | P1 | Not Started |

### QA Acceptance Criteria
- [ ] All P0 test cases pass
- [ ] No critical or high bugs
- [ ] Performance meets targets
- [ ] Accessibility audit complete

---

## Documentation & Training

### Documentation Needed

| Document | Audience | Owner | Status |
|----------|----------|-------|--------|
| User guide | End users | [Owner] | Not Started |
| API docs | Developers | [Owner] | Not Started |
| Internal wiki | Support | [Owner] | Not Started |

### Training Required

| Audience | Training | Format | Date |
|----------|----------|--------|------|
| Support team | Feature overview | Live session | [Date] |
| Sales team | Value proposition | Recording | [Date] |

---

## Open Questions

| # | Question | Impact | Owner | Due | Resolution |
|---|----------|--------|-------|-----|------------|
| 1 | [Question] | [Impact] | [Who] | [When] | [Pending/Resolved] |

---

## Appendix

### A. Competitive Analysis
[How competitors handle this]

### B. User Research Data
[Interview summaries, survey results]

### C. Technical Exploration
[Spike results, POC findings]

---

## Approval

| Role | Name | Date | Status |
|------|------|------|--------|
| Product | [Name] | | Pending |
| Engineering | [Name] | | Pending |
| Design | [Name] | | Pending |
```

---

## Quality Checklist

Before delivering the PRD:

- [ ] Problem statement is clear
- [ ] Success metrics are specific and measurable
- [ ] User stories follow proper format
- [ ] Acceptance criteria are testable
- [ ] Technical requirements are specified
- [ ] Edge cases are documented
- [ ] Dependencies identified
- [ ] Release plan defined
- [ ] Open questions captured
