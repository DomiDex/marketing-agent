# Research Queries & Web Search Patterns

This file defines when and how to trigger web searches during the idea-to-spec process to ensure maximum accuracy.

---

## Research Philosophy

**Research First, Assume Never**

When the user makes claims, states facts, or asks about external topics, VERIFY with web search before including in the document. Label confidence appropriately:
- `[VERIFIED]` — Confirmed by research
- `[ASSUMPTION]` — Not researched, needs validation

---

## Automatic Research Triggers

### 1. Competitor Mentions

**Trigger Conditions:**
- User names a specific company
- User says "competitor", "alternative", "like [company]"
- User asks "how do others do X"

**Research Actions:**
```
Query 1: "[company] [product/feature] [year]"
Query 2: "[company] pricing plans [year]"
Query 3: "[company] reviews pros cons"
```

**Extract:**
- Product features and approach
- Pricing structure
- User feedback and reviews
- Positioning and messaging

**Present As:**
```markdown
### Research: [Company Name]

**Features:** [Key features relevant to user's idea]
**Pricing:** [Pricing structure if relevant]
**User Feedback:** [What users say]
**Relevance:** [How this applies to user's idea]
**Confidence:** [VERIFIED]
```

---

### 2. Best Practices Requests

**Trigger Conditions:**
- User asks "what's the best way to..."
- User says "best practices for..."
- User asks "how should I..."
- User says "industry standard for..."

**Research Actions:**
```
Query 1: "best practices [topic] [year]"
Query 2: "[topic] guide [industry] [year]"
Query 3: "[topic] mistakes to avoid"
```

**Extract:**
- Recommended approaches
- Common patterns
- Pitfalls to avoid
- Success factors

**Present As:**
```markdown
### Research: Best Practices for [Topic]

**Recommended Approach:** [Standard approach]
**Key Success Factors:**
1. [Factor 1]
2. [Factor 2]
3. [Factor 3]

**Common Mistakes:**
- [Mistake to avoid]

**Source:** [Where this came from]
**Confidence:** [VERIFIED]
```

---

### 3. Market & Industry Data

**Trigger Conditions:**
- User mentions market size
- User discusses growth rates
- User asks about industry trends
- User makes market claims

**Research Actions:**
```
Query 1: "[market/industry] market size [year]"
Query 2: "[market/industry] trends forecast [year]"
Query 3: "[market/industry] statistics report [year]"
```

**Extract:**
- Market size and growth
- Key trends
- Major players
- Future projections

**Present As:**
```markdown
### Research: [Market/Industry] Data

**Market Size:** [Figure] ([Source], [Year])
**Growth Rate:** [Figure]
**Key Trends:**
1. [Trend 1]
2. [Trend 2]

**Confidence:** [VERIFIED] / [SINGLE SOURCE]
```

---

### 4. Benchmark Data

**Trigger Conditions:**
- User asks about typical metrics
- User needs conversion rates, pricing benchmarks
- User asks "what's normal for..."
- User discusses performance targets

**Research Actions:**
```
Query 1: "[metric] benchmark [industry] [year]"
Query 2: "average [metric] SaaS [year]"
Query 3: "[industry] KPI benchmarks report"
```

**Extract:**
- Industry averages
- Ranges (low/median/high)
- Top performer benchmarks
- Measurement methodology

**Present As:**
```markdown
### Research: [Metric] Benchmarks

| Metric | Low | Median | High | Top Performers |
|--------|-----|--------|------|----------------|
| [Metric] | [X] | [Y] | [Z] | [Top %] |

**Source:** [Where this came from]
**Context:** [What this data applies to]
**Confidence:** [VERIFIED]
```

---

### 5. Technology & Tools

**Trigger Conditions:**
- User mentions specific technology
- User asks about tool options
- User evaluating build vs buy
- User asks about integrations

**Research Actions:**
```
Query 1: "[tool/tech] features pricing [year]"
Query 2: "[tool A] vs [tool B] comparison [year]"
Query 3: "[tool] reviews limitations"
Query 4: "[tool category] alternatives [year]"
```

**Extract:**
- Feature comparison
- Pricing information
- Pros and cons
- User reviews
- Integration capabilities

**Present As:**
```markdown
### Research: [Tool/Technology]

**Overview:** [What it does]
**Pricing:** [Pricing structure]
**Key Features:**
- [Feature 1]
- [Feature 2]

**Pros:**
- [Pro 1]

**Cons:**
- [Con 1]

**Alternatives:** [Other options]
**Confidence:** [VERIFIED]
```

---

### 6. Regulatory & Compliance

**Trigger Conditions:**
- User mentions GDPR, SOC2, HIPAA, etc.
- User asks about compliance requirements
- User discusses data handling
- User mentions regulations

**Research Actions:**
```
Query 1: "[regulation] requirements checklist [year]"
Query 2: "[regulation] compliance guide [industry]"
Query 3: "[regulation] penalties consequences"
```

**Extract:**
- Key requirements
- Compliance steps
- Penalties for non-compliance
- Common approaches

**Present As:**
```markdown
### Research: [Regulation] Compliance

**Key Requirements:**
1. [Requirement 1]
2. [Requirement 2]

**Compliance Steps:**
- [Step]

**Penalties:** [Consequences of non-compliance]
**Resources:** [Official guidance links]
**Confidence:** [VERIFIED]
```

---

### 7. Pricing & Cost Data

**Trigger Conditions:**
- User asks about pricing strategies
- User needs cost estimates
- User evaluating ROI
- User mentions budget planning

**Research Actions:**
```
Query 1: "[product type] pricing strategies [year]"
Query 2: "[service/tool] pricing tiers examples"
Query 3: "[industry] pricing benchmarks SaaS"
Query 4: "[cost item] typical costs [industry]"
```

**Extract:**
- Pricing models used
- Price ranges
- Pricing psychology
- Competitive positioning

**Present As:**
```markdown
### Research: Pricing for [Category]

**Common Models:**
- [Model 1]: [Description, who uses it]
- [Model 2]: [Description, who uses it]

**Price Ranges:** [Low] - [High]
**Benchmarks:** [Industry reference points]
**Confidence:** [VERIFIED]
```

---

### 8. Case Studies & Examples

**Trigger Conditions:**
- User asks for examples
- User wants to see how others did it
- User needs inspiration
- User validating approach

**Research Actions:**
```
Query 1: "[topic] case study [industry]"
Query 2: "[company] [initiative] results"
Query 3: "[approach] success story [year]"
```

**Extract:**
- What was done
- Results achieved
- Lessons learned
- Applicability to user's situation

**Present As:**
```markdown
### Research: Case Study - [Company/Topic]

**Context:** [What they were trying to do]
**Approach:** [What they did]
**Results:** [What happened]
**Lessons:** [Key takeaways]
**Relevance:** [How this applies to user]
**Confidence:** [VERIFIED]
```

---

## Research Quality Standards

### Source Evaluation

**Prefer:**
- Official company sources
- Industry reports (Gartner, Forrester, etc.)
- Peer-reviewed research
- Authoritative publications
- Recent data (within 1-2 years)

**Use Cautiously:**
- Blog posts (check author credibility)
- User forums (useful for sentiment, not facts)
- Old data (note the date)

**Avoid:**
- Anonymous sources
- Obvious marketing content
- Outdated information (>3 years)

### Confidence Levels

| Level | Meaning | When to Use |
|-------|---------|-------------|
| `[VERIFIED]` | Multiple reliable sources agree | Strong external validation |
| `[HIGH CONFIDENCE]` | One reliable source | Single authoritative source |
| `[MODERATE CONFIDENCE]` | Some evidence | Directionally correct |
| `[LOW CONFIDENCE]` | Limited evidence | Best guess, needs validation |
| `[ASSUMPTION]` | No external validation | User's claim, not researched |

---

## Research Output Integration

### In Discovery Phase
Use research to:
- Validate user's claims
- Challenge assumptions
- Provide industry context
- Suggest best practices

### In Define Phase
Use research to:
- Support requirements with evidence
- Provide benchmark targets
- Validate technical feasibility
- Compare to competitors

### In Generate Phase
Include research as:
- Citations for claims
- Confidence tags
- Appendix with sources
- References section

---

## Example Research Workflow

```
User: "I want to build a referral program like Dropbox's"

Step 1: Identify research needs
- Dropbox referral program specifics
- Referral program best practices
- Referral program benchmarks

Step 2: Execute searches
→ WebSearch "Dropbox referral program case study"
→ WebSearch "referral program best practices SaaS 2025"
→ WebSearch "referral program conversion benchmarks"

Step 3: Extract key findings
- Dropbox: Double-sided incentive (both referrer and referred)
- Best practice: Keep it simple, reward both parties
- Benchmark: 2-5% of users typically refer

Step 4: Present to user
"I researched Dropbox's referral program and general best practices..."

Step 5: Include in document with confidence tags
"Referral programs typically achieve 2-5% participation [VERIFIED - industry benchmark]"
```

---

## Research Templates by Document Type

### For Specs
- Competitor feature comparison
- Technical feasibility research
- User behavior benchmarks

### For SOPs
- Industry best practice processes
- Compliance requirements
- Tool comparisons

### For Plans
- Market opportunity data
- Competitive landscape
- Resource/cost benchmarks

### For Decision Docs
- Alternative comparisons
- Pricing research
- Risk/benefit data

### For Business Cases
- ROI benchmarks
- Market sizing
- Competitive positioning

### For Technical Designs
- Technology comparisons
- Performance benchmarks
- Architecture patterns
