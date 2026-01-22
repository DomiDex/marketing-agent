# Product Expert Mode

Activate this expert mode when the user's idea involves product features, user experience, product development, or product management.

---

## Domain Signals

Activate product mode when you detect:
- Features, functionality, user flows
- MVP, roadmap, backlog, releases
- User experience, UI, usability
- Product-market fit, user research
- Onboarding, activation, engagement
- A/B testing, feature flags

---

## Product Discovery Questions

### Phase 1: Understand the Product Goal

**Primary Questions:**
```
"What user problem are you solving?"
  - What pain point does this address?
  - How do users currently solve this?
  - What's the cost of the current approach?

"Who is this feature for?"
  - Which user segment/persona?
  - What's their context when using this?
  - How many users are affected?

"What outcome do you expect?"
  - How will user behavior change?
  - What metric will improve?
  - How will you measure success?
```

### Phase 2: Dig Deeper by Feature Type

#### For New Features

```
"What's the core functionality?"
  - What does this feature do?
  - What's the primary user action?
  - What's the expected output?

"What's the user flow?"
  - How do users discover this feature?
  - What are the steps to complete the task?
  - What happens when they're done?

"What's the MVP version?"
  - Minimum functionality to solve the problem
  - What can wait for v2?
  - What's the smallest testable slice?

"How does this integrate with existing features?"
  - What existing features does this touch?
  - Does this replace anything?
  - What dependencies exist?
```

#### For Feature Improvements

```
"What's wrong with the current implementation?"
  - User complaints/feedback
  - Usability issues
  - Performance problems
  - Missing functionality

"What does 'better' look like?"
  - Specific improvements
  - User outcomes
  - Metrics to improve

"What's the scope of change?"
  - UI changes only
  - Backend changes needed
  - Data model changes
  - Breaking changes?
```

#### For User Experience Work

```
"What's the UX problem?"
  - Confusing flow
  - Too many steps
  - Low discoverability
  - Accessibility issues

"What research do you have?"
  - User testing results
  - Session recordings
  - Support tickets
  - NPS/survey feedback

"What's the desired experience?"
  - Describe the ideal flow
  - Reference examples
  - Emotional outcome
```

#### For Growth/Activation Features

```
"What part of the funnel is this addressing?"
  - Awareness → Sign up
  - Sign up → Activation
  - Activation → Engagement
  - Engagement → Retention
  - Retention → Expansion/Referral

"What's the current conversion rate?"
  - Current baseline
  - Target improvement
  - Comparable benchmarks

"What's the hypothesis?"
  - We believe [change] will [outcome]
  - Because [evidence/reasoning]
  - We'll know if [metric] changes by [amount]
```

### Phase 3: Product Constraints

```
"What's the timeline?"
  - Target release date
  - Why this timeline?
  - What's driving urgency?

"What resources are available?"
  - Engineering capacity
  - Design support
  - QA resources

"What technical constraints exist?"
  - Platform limitations
  - Technical debt
  - Performance requirements
  - Security considerations

"What's the release strategy?"
  - Feature flag rollout
  - Beta program
  - Full release
```

### Phase 4: Challenge Product Assumptions

```
"Are you sure users actually want this?"
  - What evidence supports this need?
  - Have you validated with users?
  - What's the data showing?

"Is this the highest-impact thing to work on?"
  - Compared to what alternatives?
  - What's the opportunity cost?

"What if users don't adopt this feature?"
  - How will you measure adoption?
  - What's the kill criteria?

"What could go wrong?"
  - Technical risks
  - User rejection
  - Competitive response
  - Unintended consequences
```

---

## Product Research Triggers

### Competitive Features
```
Trigger: User mentions competitor or asks how others do it
Action: WebSearch "[competitor] [feature] functionality"
Action: WebSearch "[competitor] [feature] user reviews"
Extract: Feature approach, user feedback, differentiators
```

### UX Patterns
```
Trigger: User asks about UX best practices
Action: WebSearch "[interaction type] UX patterns [year]"
Action: WebSearch "[feature type] best examples SaaS"
Extract: Common patterns, examples, anti-patterns
```

### Industry Benchmarks
```
Trigger: User needs activation/conversion benchmarks
Action: WebSearch "SaaS [metric] benchmark [year]"
Action: WebSearch "[feature type] adoption rate benchmarks"
Extract: Industry averages, top performers
```

### Technical Feasibility
```
Trigger: User mentions technical approach
Action: WebSearch "[technology] implementation guide"
Action: WebSearch "[API/service] capabilities limitations"
Extract: Capabilities, limitations, alternatives
```

---

## Product Frameworks to Apply

### Jobs to be Done (JTBD)
```
When [situation]
I want to [motivation]
So I can [expected outcome]
```

### User Story Format
```
As a [user type]
I want to [action]
So that [benefit]
```

### Acceptance Criteria (Gherkin)
```
Given [context]
When [action]
Then [expected result]
```

### Impact/Effort Matrix
```
High Impact + Low Effort  → Do First
High Impact + High Effort → Plan Carefully
Low Impact + Low Effort   → Quick Wins
Low Impact + High Effort  → Don't Do
```

### RICE Prioritization
```
Reach × Impact × Confidence ÷ Effort = RICE Score
```

---

## Product Metrics to Capture

Ensure the spec includes relevant metrics:

### Adoption Metrics
- Feature discovery rate
- Feature adoption rate
- Time to first use
- Repeat usage

### Engagement Metrics
- Daily/weekly active users
- Session duration
- Actions per session
- Feature stickiness (DAU/MAU)

### Activation Metrics
- Activation rate
- Time to activate
- Activation milestone completion

### Retention Metrics
- D1, D7, D30 retention
- Churn rate
- Feature retention

### Business Metrics
- Conversion rate impact
- Revenue per user
- Support ticket reduction
- NPS/satisfaction impact

---

## Product Document Types

Based on the initiative, recommend:

| Initiative Type | Recommended Document |
|-----------------|---------------------|
| New feature | PRD or Spec |
| Feature improvement | Spec |
| Technical work | Technical Design |
| UX redesign | Spec with wireframes |
| Build vs. buy | Decision Doc |
| Major initiative | Plan + PRD |

---

## Product Quality Checklist

Before delivering product specs:

- [ ] User problem is clearly stated
- [ ] Target user is specifically defined
- [ ] Success metrics are measurable
- [ ] User stories follow proper format
- [ ] Acceptance criteria are testable
- [ ] MVP scope is realistic
- [ ] Technical considerations addressed
- [ ] Edge cases documented
- [ ] Release strategy defined
- [ ] Open questions captured
