# /onboarding-cro

Optimize post-signup onboarding and user activation.

## Overview

**What it does:** Designs and optimizes the experience after signup—helping users reach their "aha moment" faster through onboarding flows, checklists, empty states, and engagement tactics.

**When to use it:**
- Users sign up but don't activate
- Onboarding flow is too long or confusing
- Need to design first-run experience
- Low feature adoption rates
- Users churning before seeing value

**What you'll get:**
- Activation metrics and milestones
- Onboarding flow design
- Checklist and progress patterns
- Empty state recommendations
- Engagement loop strategies

---

## How to Invoke

**Command:** `/onboarding-cro`

**Trigger phrases:**
- "Optimize our onboarding..."
- "Users aren't activating..."
- "First-run experience..."
- "Improve user activation..."
- "Onboarding checklist..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Product type | What your product does | "Project management SaaS" |
| Activation moment | When users find value | "Creates first project + invites team" |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Current activation rate | Baseline metric | "30% of signups create a project" |
| Current onboarding | What you have now | "5-step wizard then dashboard" |
| Drop-off points | Where users leave | "60% drop at step 3" |
| Time to value | How long it takes | "Average 3 days to first project" |

---

## Prompt Examples

### Example 1: Basic Onboarding Design (Beginner)

```
/onboarding-cro

Design an onboarding flow for TaskFlow, a project management tool.

Key features:
- Task boards
- Team collaboration
- AI task prioritization
- Time tracking

Goal: Get users to create their first project and invite a teammate.
```

**What you'll get:** Complete onboarding flow with steps, copy, and progression logic.

---

### Example 2: Activation Metric Definition (Strategic)

```
/onboarding-cro

Help define TaskFlow's activation metric.

Product context:
- Project management tool for small teams
- Key features: task boards, team chat, AI prioritization
- Free trial: 14 days
- Paid plans: Pro ($12/user), Team ($25/user)

Current rough data:
- 1,000 signups/month
- 400 create at least one task (40%)
- 200 invite at least one teammate (20%)
- 100 are still active after 7 days (10%)
- 50 convert to paid (5%)

Questions:
1. What should our activation metric be?
2. What correlates most with conversion?
3. Should we track multiple activation stages?
```

**What you'll get:** Activation framework with recommended metric, correlation analysis, and measurement approach.

---

### Example 3: Onboarding Flow Optimization (Improve Existing)

```
/onboarding-cro

Optimize TaskFlow's current onboarding flow.

Current flow after signup:
1. Welcome screen with video (30 seconds)
2. "Tell us about your team" survey (5 questions)
3. Template selection (6 options)
4. First project creation (name + description)
5. Invite teammates (email input)
6. Dashboard with product tour (10 tooltip steps)

Drop-off data:
- Complete step 1: 85%
- Complete step 2: 60% (survey is long)
- Complete step 3: 55%
- Complete step 4: 40%
- Complete step 5: 25%
- Complete tour: 15%

Issues:
- Total flow takes 8-10 minutes
- Users who skip steps don't know where to start
- Survey feels like homework
- Product tour is overwhelming

What should we keep, cut, or change?
```

**What you'll get:** Prioritized recommendations with specific changes to each step and expected impact.

---

### Example 4: Onboarding Checklist Design (Pattern)

```
/onboarding-cro

Design an onboarding checklist for TaskFlow.

Context:
- Project management tool for small teams
- Users need to: create project, add tasks, invite team, try AI features
- Currently no structured onboarding after initial wizard

Checklist should:
- Feel achievable, not overwhelming
- Drive key activation actions
- Be visible but not intrusive
- Celebrate completion
- Eventually disappear

What items should be on the checklist?
What order?
Where should it live in the UI?
What rewards/feedback for completion?
```

**What you'll get:** Complete checklist design with items, order, UI placement, and gamification elements.

---

### Example 5: Empty States Optimization (Specific Element)

```
/onboarding-cro

Optimize TaskFlow's empty states.

Current empty states:
1. Dashboard (no projects): "Welcome to TaskFlow. Create your first project."
2. Project (no tasks): "Add your first task to get started."
3. Team page (no members): "Invite team members to collaborate."

Problems:
- Generic, not inspiring
- No guidance on what to do or why
- Missed opportunity to show value
- Don't feel like the product is worth exploring

For each empty state:
- New copy that motivates action
- Visual/illustration recommendations
- Call-to-action that's compelling
- Sample content or templates to offer
```

**What you'll get:** Redesigned empty states with motivating copy and clear paths to value.

---

### Example 6: Multi-Channel Onboarding (Comprehensive)

```
/onboarding-cro

Design a multi-channel onboarding program for TaskFlow.

Channels available:
- In-app: Wizard, checklist, tooltips, empty states
- Email: Automated sequence (can trigger based on behavior)
- In-product notifications
- Webinars (optional, for power users)

User segments:
- Individual users (solo, exploring)
- Team leads (will invite others)
- Admins (enterprise, evaluating)

Activation milestones:
1. Create first project
2. Add 5+ tasks
3. Invite at least 1 teammate
4. Teammate accepts invite
5. Try AI prioritization feature

Design a coordinated onboarding that:
- Uses the right channel at the right time
- Adjusts based on user behavior
- Handles stalled users
- Builds toward paid conversion
```

**What you'll get:** Complete multi-channel onboarding system with triggers, content, and behavioral logic.

---

## Sample Output Preview

When you run `/onboarding-cro`, expect output like this:

```markdown
## Onboarding Optimization: TaskFlow

### Activation Definition

**Primary activation metric:**
User creates project AND invites 1+ teammates within 7 days

**Rationale:**
- Solo users churn at 60% vs team users at 20%
- Team invitation correlates 3x with conversion

**Secondary milestones:**
1. Create first project (Day 0-1)
2. Add 3+ tasks (Day 0-2)
3. Invite teammate (Day 1-3)
4. Teammate engages (Day 2-5)
5. Use AI prioritization (Day 3-7)

---

### Recommended Onboarding Flow

**Step 1: Quick Win (60 seconds)**
"Let's create your first project"
- Skip the welcome video
- One field: Project name
- Auto-generate from template options
- Immediate success: "Your project is ready!"

**Step 2: Immediate Value (90 seconds)**
"Add a few tasks to see TaskFlow in action"
- Pre-populate with smart suggestions
- "Add tasks you're already working on"
- Show AI prioritization as tasks are added

**Step 3: Team Invitation (Optional but prompted)**
"Projects are better with your team"
- Make skippable but encourage
- "Invite via email or share link"
- Remind again later if skipped

**Step 4: Dashboard with Checklist**
- Small, persistent checklist (5 items)
- First 2 items already checked (project + tasks)
- Remaining: Invite team, Try AI, Set up integration

---

### Onboarding Checklist

**Items (in order):**
1. ✅ Create your first project
2. ✅ Add your first tasks
3. ⬜ Invite your team (most important next step)
4. ⬜ Try AI prioritization
5. ⬜ Connect your calendar

**UI Placement:**
- Dismissible sidebar widget
- 40% checklist, 60% dashboard visible
- Confetti animation on completion
- "Complete setup" badge on profile

---

### Expected Impact

| Change | Expected Lift | Effort |
|--------|---------------|--------|
| Shorter wizard (5 min → 2 min) | +25% completion | Medium |
| Skip survey, add to settings | +15% completion | Low |
| Add checklist | +20% to activation | Medium |
| Better empty states | +10% first-day actions | Low |
```

---

## Tips for Best Results

### Do This
- **Define activation clearly** — What behavior predicts success?
- **Share drop-off data** — Where exactly do users leave?
- **Explain the product** — What are the key features/actions?
- **Include time data** — How long does activation take now?

### Avoid This
- **Making onboarding too long** — Users want to see value, not learn
- **Asking for info before showing value** — Surveys feel like homework
- **One-size-fits-all** — Different users need different paths
- **Ignoring stalled users** — Have a plan for users who stop mid-onboarding

### Pro Tips
1. **Track time to value** — Reduce the time to first success
2. **Show, don't tell** — Interactive > tutorial videos
3. **Use progressive disclosure** — Don't explain everything upfront
4. **Celebrate small wins** — Positive feedback drives completion

---

## Onboarding Patterns

| Pattern | Best For | Pros | Cons |
|---------|----------|------|------|
| Setup wizard | Complex products | Guided, complete | Can feel long |
| Checklist | Clear action paths | Self-paced, visible progress | Can be ignored |
| Product tour | Feature-rich products | Shows capabilities | Often skipped |
| Empty states | Simple products | Contextual, minimal | Requires design thought |
| Video welcome | High-complexity | Personal, engaging | Not interactive |

---

## Activation Metrics Examples

| Product Type | Typical Activation Metric |
|--------------|---------------------------|
| Project management | Create project + invite team |
| Design tools | Create + export first design |
| Analytics | Connect data source + view report |
| Social tools | Post content + get engagement |
| Collaboration | Invite team + complete shared action |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/signup-flow-cro` | When the problem is before onboarding (registration) |
| `/email-sequence` | When building onboarding email automation |
| `/paywall-upgrade-cro` | When optimizing upgrade prompts |
| `/page-cro` | When optimizing marketing pages, not in-app |

---

## Quick Reference

```
/onboarding-cro

Product: [What your product does]
Activation: [Key behavior that indicates success]

Current onboarding:
- Step 1: [What happens]
- Step 2: [What happens]
...

Drop-off data:
- Complete step 1: X%
- Complete step 2: X%
...

Goals:
- Current activation rate: X%
- Target activation rate: X%
- Time to value: X days → want X days
```
