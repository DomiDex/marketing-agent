# /customer-research

Create customer research materials to deeply understand your audience.

## Overview

**What it does:** Creates interview scripts, surveys, buyer personas, jobs-to-be-done analyses, and voice-of-customer frameworks.

**When to use it:**
- Planning customer interviews
- Designing a customer survey
- Creating buyer personas
- Analyzing existing customer feedback
- Building an ideal customer profile (ICP)

**What you'll get:**
- Complete interview scripts with probing questions
- Survey designs with question logic
- Detailed persona documents
- JTBD frameworks
- VOC analysis templates

---

## How to Invoke

**Command:** `/customer-research`

**Trigger phrases:**
- "Create an interview script for..."
- "Design a survey about..."
- "Build a persona for..."
- "Help me understand our customers..."
- "Create a customer research plan..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Research type | What you're creating | Interview script, survey, persona |
| Target audience | Who you're researching | Churned customers, enterprise buyers |
| Research goal | What you want to learn | Why users churn, purchase drivers |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| What you already know | Avoids redundant questions | "We know they leave after 30 days" |
| Business context | Shapes the research focus | "Launching enterprise tier" |
| Segments | Enables comparison | "SMB vs enterprise, technical vs non-technical" |
| Previous research | Builds on existing knowledge | "Last survey said pricing was #1 issue" |

---

## Prompt Examples

### Example 1: Basic Interview Script (Beginner)

```
/customer-research

Create an interview script for customer discovery interviews.
Our product is a project management tool for marketing teams.
We want to understand their biggest workflow challenges.
```

**What you'll get:** Complete 30-45 minute interview script with warm-up, core questions, and probing techniques.

---

### Example 2: Churn Interview Script (Intermediate)

```
/customer-research

Create an interview script for churned customers.

Context:
- We're a B2B SaaS with a freemium model
- Churn rate spiked from 5% to 8% in Q4
- Most churn happens in months 2-3
- Support data suggests "complexity" is mentioned often

Research goals:
1. Understand the moment they decided to leave
2. Identify warning signs we missed
3. Learn what would have kept them

Interview length: 30 minutes
Incentive: $50 Amazon gift card
```

**What you'll get:** Targeted churn interview script with questions about the decision timeline, emotional journey, and specific improvement suggestions.

---

### Example 3: NPS Follow-up Survey (Survey Design)

```
/customer-research

Design a survey to follow up with NPS detractors (0-6 scores).

Context:
- We run monthly NPS surveys
- 15% are detractors, 40% passives, 45% promoters
- We want to understand what's driving low scores
- Need actionable insights to improve

Survey constraints:
- Maximum 5 minutes to complete
- Must work on mobile
- Want to identify if it's a segment-specific issue
```

**What you'll get:** Concise survey with branching logic, sentiment questions, and open-ended fields for specific feedback.

---

### Example 4: Buyer Persona (Advanced)

```
/customer-research

Create a detailed buyer persona for our enterprise sales motion.

About our product:
- Enterprise security compliance platform
- $50K-200K ACV
- 6-12 month sales cycle
- Primary buyer: CISO or VP Security

What we know:
- They're under pressure from board on compliance
- Usually evaluating after a failed audit
- Technical team influences but doesn't decide
- Budget comes from risk/compliance, not IT

Research we've done:
- 12 customer interviews
- Win/loss analysis on 50 deals
- 200+ demo call recordings

Need: Comprehensive persona document our sales team can use
```

**What you'll get:** Detailed persona with goals, challenges, buying process, objections, and messaging guidance.

---

### Example 5: Jobs-to-be-Done Analysis (JTBD)

```
/customer-research

Create a jobs-to-be-done analysis for our email marketing tool.

Context:
- Target: Small business owners (1-10 employees)
- They're switching from MailChimp
- Main use case: Newsletter and promotional emails

I want to understand:
- The functional job they're hiring us to do
- The emotional jobs involved
- The circumstances that trigger the job
- How they measure success

Include: Job statement, competing solutions, and opportunity areas
```

**What you'll get:** Complete JTBD framework with job hierarchy, emotional dimensions, and actionable insights.

---

### Example 6: Voice-of-Customer Analysis Template

```
/customer-research

Create a VOC analysis framework for our support ticket data.

Data sources we have:
- 500 support tickets/month
- G2 and Capterra reviews (4.2 average)
- Cancellation survey responses
- Sales call notes in Gong

Goals:
- Identify top 5 themes across all feedback
- Find language we should use in marketing
- Prioritize product improvements

Need: Template and process we can use quarterly
```

**What you'll get:** VOC analysis template with tagging system, theme categorization, and synthesis process.

---

## Sample Output Preview

### Interview Script Output:

```markdown
# Customer Interview Script: Churn Research

## Objectives
1. Understand timeline leading to cancellation
2. Identify early warning signs
3. Discover what would have changed their decision

## Logistics
- Duration: 30 minutes
- Recording: Request permission
- Incentive: $50 Amazon gift card

---

## Section 1: Introduction (3 min)

"Hi [Name], thanks so much for taking the time to chat with us.
I'm [Your name] from [Company].

I want to be upfront - we're not trying to win you back today.
We genuinely want to learn from your experience so we can
improve for others. There are no wrong answers.

This should take about 30 minutes. Do you mind if I record
this for my notes? It won't be shared outside our team.

Any questions before we start?"

---

## Section 2: Background (5 min)

1. "Can you remind me what your role is and what you were
    using [Product] for?"

2. "How long were you using us?"

3. "Walk me through what your workflow looked like when
    you were using [Product]."

---

## Section 3: The Decision (15 min)

4. "Take me back to when you first started thinking about
    making a change. What was happening?"

   Probes:
   - "What triggered that thought?"
   - "How long had you felt that way?"
   - "Did anything specific happen?"

5. "What did you try before deciding to leave?"

   Probes:
   - "Did you reach out to support?"
   - "Did you try different features?"
   - "Did you consider upgrading/downgrading?"

6. "Walk me through the actual decision. Was there a
    specific moment when you decided?"

7. "Were there things you liked that made the decision hard?"

8. "What's the main thing you wish had been different?"

---

## Section 4: What's Next (5 min)

9. "What are you using now instead?"

10. "How is that going?"

11. "Is there anything that would bring you back?"

---

## Section 5: Wrap-up (2 min)

12. "Looking back, what's one thing we could have done
     differently to keep you?"

13. "Is there anything I should have asked but didn't?"

"Thank you so much. This is incredibly helpful. I'll send
your gift card within 24 hours."
```

---

## Tips for Best Results

### Do This
- **State your research goals clearly** — What decisions will this inform?
- **Share what you already know** — Avoids redundant questions
- **Specify the audience** — Customers vs prospects vs churned
- **Include context on constraints** — Time, budget, access

### Avoid This
- **Leading questions** — "Don't you think our pricing is fair?"
- **Double-barreled questions** — "How satisfied are you with our price and features?"
- **Assuming knowledge** — Confirm what they actually know

### Pro Tips
1. **5-15 interviews is enough** — You'll hit saturation quickly
2. **Record everything** — With permission, quotes are gold
3. **Debrief immediately** — Insights fade fast
4. **Chain with positioning** — Use `/positioning` after research to build messaging

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/positioning` | When turning research into brand messaging |
| `/case-study` | When creating content from customer stories |
| `/competitor-research` | When researching competitors, not customers |
| `/marketing-psychology` | When applying psychological frameworks |

---

## Quick Reference

```
/customer-research

[TYPE]: Interview script | Survey | Persona | JTBD | VOC analysis
[AUDIENCE]: Who you're researching
[GOAL]: What you want to learn
[CONTEXT]: What you already know
[CONSTRAINTS]: Time, access, resources
[SEGMENTS]: Any segments to compare
[OUTPUT]: Specific deliverable needed
```
