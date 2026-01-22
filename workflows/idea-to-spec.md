# Workflow: Expert Spec (Idea to Spec)

A structured workflow for turning rough ideas into highly accurate, actionable documents using expert-level questioning and web research validation.

---

## Overview

| Phase | Activity | Output |
|-------|----------|--------|
| 1 | INTAKE | Document type classified |
| 2 | DISCOVERY | Deep understanding gathered |
| 3 | RESEARCH | Claims validated with web search |
| 4 | DEFINE | Prioritized requirements |
| 5 | GENERATE | Complete document |
| 6 | VALIDATE | Quality-checked deliverable |

**Prerequisites**: A rough idea, concept, or project to explore

**Outputs**: SOP, Spec, Plan, PRD, Decision Doc, Business Case, or Technical Design

---

## Phase 1: INTAKE — Classify the Need

**Goal**: Determine what type of document will be most useful

### Document Type Selection

| Document Type | Best For | Key Signals |
|---------------|----------|-------------|
| **SOP** | Repeatable processes | "how do we do X", "standardize", "procedure" |
| **Spec** | Features/products | "build", "feature", "product", "create" |
| **Plan** | Strategic initiatives | "strategy", "roadmap", "launch", "campaign" |
| **PRD** | Product development | "product requirements", "user stories" |
| **Decision Doc** | Choosing between options | "should we", "compare", "build vs buy" |
| **Business Case** | Justifying investment | "ROI", "justify", "budget", "approval" |
| **Technical Design** | Architecture | "architecture", "API", "system design" |

### Intake Questions

1. What's the core idea? (1-2 sentences)
2. What kind of document would be most useful?
3. Who is the audience?
4. What's the urgency? (quick draft vs comprehensive)

### Domain Detection

Auto-activate expert mode based on context:

| Domain | Signals |
|--------|---------|
| Marketing | campaigns, content, SEO, ads, leads |
| Product | features, users, UX, roadmap, MVP |
| Operations | process, workflow, efficiency, SOP |
| Technical | API, architecture, database, integration |

---

## Phase 2: DISCOVERY — Expert Interview

**Goal**: Gather deep understanding through progressive questioning

### Progressive Depth Model

#### Level 1: SURFACE (Always ask)
- "In one sentence, what are you trying to accomplish?"
- "Who is this for? Who benefits?"
- "What does success look like?"

#### Level 2: CONTEXT
- "What triggered this need now?"
- "What happens if you don't do this?"
- "What have you tried before?"
- "What resources do you have?"

#### Level 3: DEPTH — The 5 Whys
- "WHY is that the problem?" (1st Why)
- "WHY does that matter?" (2nd Why)
- "WHY hasn't this been solved?" (3rd Why)
- "WHY would this solution work better?" (4th Why)
- "WHY is now the right time?" (5th Why)

#### Level 4: CHALLENGE
- "What are you assuming that might not be true?"
- "What would your harshest critic say?"
- "Imagine this failed — what went wrong?"
- "What's the biggest risk you haven't mentioned?"

#### Level 5: PRECISION
- "What exactly does success look like? How will you measure it?"
- "What's explicitly OUT of scope?"
- "What are the hard constraints?"
- "Who needs to approve this?"

### Interview Techniques

**Socratic Questioning**: Don't accept surface answers. Probe deeper.

**Jobs-to-be-Done**: "When [situation], I want to [motivation], so I can [outcome]"

**Pre-Mortem**: "It's 6 months from now and this failed. What happened?"

**Reverse Engineering**: "Describe the ideal end state as if it already exists"

---

## Phase 3: RESEARCH — Validate with Web Search

**Goal**: Verify claims and enrich with external data

### When to Research

| Trigger | Action |
|---------|--------|
| Competitor mentioned | Research their approach, features, pricing |
| "Best practice" asked | Find industry standards |
| Market claim made | Validate with data |
| Benchmark needed | Find industry metrics |
| Tool/tech discussed | Research capabilities, pricing |

### Research Query Patterns

**Competitor Analysis:**
```
"[company] [feature] implementation [year]"
"[company] pricing plans [year]"
```

**Best Practices:**
```
"best practices [topic] [year] SaaS"
"[topic] guide [industry]"
```

**Benchmarks:**
```
"[metric] benchmark [industry] [year]"
"average [metric] SaaS [year]"
```

**Tools & Technology:**
```
"[tool A] vs [tool B] comparison [year]"
"[tool] pricing features review [year]"
```

### Confidence Tags

Use these to indicate research status:

| Tag | Meaning |
|-----|---------|
| `[VERIFIED]` | Multiple reliable sources |
| `[HIGH CONFIDENCE]` | One authoritative source |
| `[MODERATE CONFIDENCE]` | Some evidence |
| `[LOW CONFIDENCE]` | Limited evidence |
| `[ASSUMPTION]` | Not researched |

---

## Phase 4: DEFINE — Structure Requirements

**Goal**: Organize requirements with confidence scoring

### MoSCoW with Confidence

```markdown
### Must Have (Critical)
| Requirement | Confidence | Source |
|-------------|------------|--------|
| [Requirement] | [VERIFIED] | [Research] |

### Should Have (Important)
| Requirement | Confidence | Source |
|-------------|------------|--------|

### Won't Have (Out of Scope)
| Excluded | Reason |
|----------|--------|
```

### Constraints Documentation

- Budget limits
- Timeline requirements
- Technical limitations
- Team capacity
- Dependencies

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk] | H/M/L | H/M/L | [Action] |

---

## Phase 5: GENERATE — Produce the Document

**Goal**: Create the appropriate document from templates

### Template Selection

| Document Type | Template |
|---------------|----------|
| SOP | `document-templates/sop-template.md` |
| Spec | `document-templates/spec-template.md` |
| Plan | `document-templates/plan-template.md` |
| PRD | `document-templates/prd-template.md` |
| Decision Doc | `document-templates/decision-doc-template.md` |
| Business Case | `document-templates/business-case-template.md` |
| Technical Design | `document-templates/technical-design-template.md` |

### Required Sections (All Documents)

1. Clear Problem Statement
2. Measurable Success Criteria
3. Prioritized Requirements
4. Confidence Indicators
5. Risks & Mitigations
6. Actionable Next Steps

### Output Location

**Directory**: `output/idea-to-spec/`
**Format**: `{doc-type}_{descriptor}_{YYYY-MM-DD}.md`

---

## Phase 6: VALIDATE — Quality Check

**Goal**: Ensure completeness and accuracy

### Completeness Checklist

- [ ] Problem statement is clear
- [ ] Target audience is defined
- [ ] Success criteria are measurable
- [ ] Requirements are prioritized
- [ ] Scope is bounded (in AND out)
- [ ] Constraints are documented
- [ ] Risks have mitigations
- [ ] Next steps are actionable

### Accuracy Checklist

- [ ] Key claims are research-backed or flagged
- [ ] Competitor info is current
- [ ] Market data is sourced
- [ ] Technical feasibility validated
- [ ] Cost estimates benchmarked

### Gap Analysis

Document any:
- Unresolved questions
- Information gaps
- Assumptions needing validation

### Document Scores

| Metric | Target |
|--------|--------|
| Completeness | 10/10 |
| Confidence | >80% high-confidence |
| Actionability | 10/10 |

---

## Expert Mode Quick Reference

### Marketing Mode
- Activate for: campaigns, content, SEO, ads, growth
- Key questions: audience, channels, budget, metrics
- See: `expert-modes/marketing.md`

### Product Mode
- Activate for: features, UX, roadmap, activation
- Key questions: user problem, success metrics, MVP scope
- See: `expert-modes/product.md`

### Operations Mode
- Activate for: processes, workflows, automation
- Key questions: current state, pain points, future state
- See: `expert-modes/operations.md`

### Technical Mode
- Activate for: architecture, APIs, integrations
- Key questions: requirements, constraints, scale
- See: `expert-modes/technical.md`

---

## Tips for Success

1. **Don't rush Phase 2** — Deep discovery prevents rework
2. **Research proactively** — Validate claims before documenting
3. **Use confidence tags** — Transparency builds trust
4. **Scope aggressively** — Clear boundaries prevent scope creep
5. **Include "Won't Have"** — What's out is as important as what's in
6. **End with actions** — Every document needs clear next steps

---

## Related Skills

After completing the document, recommend:

| Next Skill | When to Use |
|------------|-------------|
| `/customer-research` | Validate assumptions with users |
| `/positioning` | Define value proposition |
| `/pricing-strategy` | Determine pricing/packaging |
| `/launch-strategy` | Plan go-to-market |
| `/competitor-research` | Deep competitive analysis |
