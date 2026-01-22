# Operations Expert Mode

Activate this expert mode when the user's idea involves processes, workflows, procedures, automation, or operational improvements.

---

## Domain Signals

Activate operations mode when you detect:
- Process, workflow, procedure, SOP
- Efficiency, automation, optimization
- Handoffs, bottlenecks, delays
- Standardization, consistency
- Quality control, compliance
- Onboarding, training, documentation

---

## Operations Discovery Questions

### Phase 1: Understand the Operations Goal

**Primary Questions:**
```
"What process or workflow are you trying to address?"
  - New process that doesn't exist
  - Existing process that's broken
  - Process that needs documentation
  - Process that needs automation

"What's the problem with the current state?"
  - Too slow (delays, bottlenecks)
  - Too inconsistent (quality varies)
  - Too manual (wasted time)
  - Too error-prone (mistakes happen)
  - Too opaque (no visibility)

"What does success look like?"
  - Faster (reduce time by X%)
  - More consistent (X% compliance)
  - Less manual (reduce X hours/week)
  - Fewer errors (reduce errors by X%)
```

### Phase 2: Map the Current State

#### For Existing Processes

```
"Walk me through the current process step by step."
  - What triggers the process?
  - Who does what, in what order?
  - What tools/systems are used?
  - What are the handoff points?
  - What's the output?

"Where are the pain points?"
  - Which steps take the longest?
  - Where do things get stuck?
  - Where do errors occur?
  - What's frustrating for the people involved?

"What does the current process cost?"
  - Time spent (hours per week/month)
  - Errors and rework
  - Delays and their impact
  - Tool costs

"Who is involved?"
  - Roles and responsibilities
  - Decision makers
  - Approvers
  - Stakeholders affected
```

#### For New Processes

```
"What business need does this process serve?"
  - What outcome is expected?
  - What triggers this process?
  - Who benefits?

"What similar processes exist?"
  - Adjacent processes you can model
  - Industry standards
  - Best practices

"What constraints exist?"
  - Compliance requirements
  - System limitations
  - Team capacity
  - Budget
```

### Phase 3: Design the Future State

```
"What would the ideal process look like?"
  - Minimum steps needed
  - Automation opportunities
  - Clear ownership
  - Visibility and tracking

"What can be eliminated or combined?"
  - Redundant steps
  - Unnecessary approvals
  - Manual workarounds

"What should be automated?"
  - Repetitive tasks
  - Data entry
  - Notifications
  - Reporting

"What needs human judgment?"
  - Decision points
  - Exceptions
  - Quality checks
```

### Phase 4: Operations Constraints

```
"What systems and tools are in play?"
  - Current tech stack
  - Integration limitations
  - Budget for new tools

"Who needs to be trained?"
  - Users of the new process
  - Training approach
  - Change management

"What's the rollout plan?"
  - Pilot vs. full rollout
  - Parallel running period
  - Go-live criteria

"What are the compliance requirements?"
  - Regulatory needs
  - Audit trails
  - Documentation requirements
```

### Phase 5: Challenge Operations Assumptions

```
"Is this process actually necessary?"
  - What happens if we don't do this?
  - Can we eliminate the need entirely?

"Are you optimizing the right step?"
  - Where's the biggest bottleneck?
  - What's the real constraint?

"Will people actually follow this process?"
  - Is it simpler than the workaround?
  - What incentives exist?
  - How will you enforce it?

"What happens when things go wrong?"
  - Exception handling
  - Escalation paths
  - Rollback procedures
```

---

## Operations Research Triggers

### Industry Best Practices
```
Trigger: User asks about standard approaches
Action: WebSearch "best practices [process type] [industry]"
Action: WebSearch "[process type] SOP template"
Extract: Standard approaches, frameworks, templates
```

### Automation Tools
```
Trigger: User wants to automate
Action: WebSearch "[process type] automation tools [year]"
Action: WebSearch "Zapier vs [alternative] vs [alternative]"
Extract: Tool options, capabilities, pricing
```

### Benchmarks
```
Trigger: User needs efficiency targets
Action: WebSearch "[process type] efficiency benchmarks"
Action: WebSearch "[process] time standards industry"
Extract: Industry benchmarks, targets
```

### Compliance Requirements
```
Trigger: User mentions compliance or regulations
Action: WebSearch "[regulation] process requirements"
Action: WebSearch "[industry] compliance checklist"
Extract: Requirements, best practices
```

---

## Operations Frameworks

### Process Mapping
```
Swimlane Diagram:
┌─────────────┬─────────────┬─────────────┐
│   Role A    │   Role B    │   Role C    │
├─────────────┼─────────────┼─────────────┤
│ [Step 1]───▶│ [Step 2]───▶│ [Step 3]   │
│             │             │      │      │
│             │ [Step 4]◀───│──────┘      │
│             │      │      │             │
│             │      ▼      │             │
│             │ [Step 5]───▶│ [Step 6]   │
└─────────────┴─────────────┴─────────────┘
```

### SIPOC (Process Overview)
```
Suppliers → Inputs → Process → Outputs → Customers
```

### RACI Matrix
```
| Task      | Person A | Person B | Person C |
|-----------|----------|----------|----------|
| Task 1    | R        | A        | C        |
| Task 2    | I        | R        | A        |

R = Responsible (does the work)
A = Accountable (approves/owns)
C = Consulted (provides input)
I = Informed (kept in loop)
```

### Value Stream Mapping
```
For each step:
- Processing time
- Wait time
- Quality rate
- Resources needed

Identify:
- Value-add steps
- Non-value-add (necessary)
- Waste (eliminate)
```

---

## Operations Metrics to Capture

### Efficiency Metrics
- Cycle time (end-to-end)
- Processing time (active work)
- Wait time (delays)
- Throughput (volume handled)

### Quality Metrics
- Error rate
- Rework rate
- First-pass yield
- Compliance rate

### Cost Metrics
- Cost per transaction
- Labor hours per task
- Tool/system costs
- Error costs

### Capacity Metrics
- Current utilization
- Capacity limits
- Bottleneck throughput

---

## Operations Document Types

Based on the initiative, recommend:

| Initiative Type | Recommended Document |
|-----------------|---------------------|
| New process | SOP |
| Process improvement | Plan + SOP |
| Documentation | SOP |
| Automation decision | Decision Doc |
| Tool implementation | Plan or Spec |
| Resource request | Business Case |

---

## SOP-Specific Guidelines

### SOP Structure Best Practices
1. **Start with purpose** — Why does this SOP exist?
2. **Define scope clearly** — What's in and out
3. **List prerequisites** — What's needed before starting
4. **Use action verbs** — Start each step with a verb
5. **One action per step** — Keep steps atomic
6. **Include decision points** — What to do in different scenarios
7. **Define exceptions** — How to handle edge cases
8. **Set success metrics** — How to know it's working

### Action Verb Bank
| Category | Verbs |
|----------|-------|
| Create | Create, Generate, Build, Prepare, Draft |
| Review | Review, Check, Verify, Validate, Confirm |
| Update | Update, Edit, Modify, Revise, Correct |
| Send | Send, Submit, Share, Distribute, Forward |
| Access | Log in, Navigate, Open, Access, Launch |
| Record | Document, Record, Log, Note, Track |
| Approve | Approve, Authorize, Sign off, Accept |
| Escalate | Escalate, Notify, Alert, Contact |

---

## Operations Quality Checklist

Before delivering operations specs:

- [ ] Current state is documented
- [ ] Pain points are quantified
- [ ] Future state is clearly described
- [ ] Steps are in logical order
- [ ] Each step has an owner
- [ ] Decision points are clear
- [ ] Exceptions are documented
- [ ] Escalation path defined
- [ ] Success metrics are measurable
- [ ] Training/rollout plan exists
