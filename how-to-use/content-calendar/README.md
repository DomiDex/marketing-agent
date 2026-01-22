# /content-calendar

Plan and coordinate content across all channels.

## Overview

**What it does:** Creates strategic content calendars that coordinate email, social, blog, and other content across weeks or months—ensuring consistent messaging and efficient production.

**When to use it:**
- Planning content for the upcoming month/quarter
- Coordinating a multi-channel campaign
- Building a repeatable content system
- Batching content creation efficiently
- Aligning content with product launches or events

**What you'll get:**
- Weekly/monthly content calendar
- Content pillar distribution
- Cross-channel coordination
- Production timeline
- Content ideas per slot

---

## How to Invoke

**Command:** `/content-calendar`

**Trigger phrases:**
- "Plan content for..."
- "Create a content calendar..."
- "Help me batch content..."
- "Coordinate content across channels..."
- "Content planning for..."

---

## Input Requirements

### Required Information
| Input | Description | Example |
|-------|-------------|---------|
| Time period | How far out to plan | "4 weeks," "Q1," "January" |
| Channels | Where content will be published | Blog, LinkedIn, Twitter, Email |

### Recommended Context
| Input | Why It Helps | Example |
|-------|--------------|---------|
| Goals | Focuses content strategy | "Drive trial signups" |
| Content pillars | Ensures variety | "Product, thought leadership, culture" |
| Key dates | Builds around events | "Product launch on Jan 15" |
| Resources | Sets realistic scope | "1 writer, 3 hrs/week" |
| Existing content | Shows what can be repurposed | "10 blog posts, 1 webinar" |

---

## Prompt Examples

### Example 1: Simple Monthly Calendar (Beginner)

```
/content-calendar

Create a content calendar for TaskFlow for January.

Channels:
- Blog (1 post/week)
- LinkedIn (3 posts/week)
- Email newsletter (1/week)

Main goal: Drive free trial signups
```

**What you'll get:** A 4-week calendar with content slots, topic ideas, and basic coordination.

---

### Example 2: Detailed Monthly Calendar (Intermediate)

```
/content-calendar

Create a detailed content calendar for TaskFlow for January.

Channels and frequency:
- Blog: 1 post/week (Tuesdays)
- LinkedIn (founder): 3 posts/week (Mon, Wed, Fri)
- LinkedIn (company): 2 posts/week (Tue, Thu)
- Twitter: Daily
- Email newsletter: Weekly (Thursdays)

Content pillars (mix throughout month):
1. Product tips and how-tos (30%)
2. Productivity insights (25%)
3. Customer success stories (20%)
4. Industry commentary (15%)
5. Company culture/behind-scenes (10%)

Goals:
- Drive blog traffic up 20%
- Grow LinkedIn following by 500
- Generate 200 new trial signups

Key dates:
- Jan 15: New AI feature launch
- Jan 22: Webinar on team productivity

Include:
- Weekly themes
- Specific topic ideas per slot
- Cross-channel coordination (how content relates)
- Recommended visuals
```

**What you'll get:** Comprehensive calendar with themed weeks, specific topics, and multi-channel coordination.

---

### Example 3: Campaign-Focused Calendar (Launch)

```
/content-calendar

Create a content calendar for TaskFlow's AI feature launch campaign.

Launch date: January 15

Pre-launch (Jan 1-14):
- Build anticipation
- Tease the feature
- Educate on the problem it solves

Launch week (Jan 15-21):
- Announcement content
- Deep-dive content
- Social proof

Post-launch (Jan 22-31):
- Continued education
- User stories
- How-to content

Channels:
- Blog
- Email (list of 5,000)
- LinkedIn (founder + company)
- Twitter
- Product Hunt (launch day)

Include timing of each piece and how they connect.
```

**What you'll get:** Phased campaign calendar with pre-launch, launch, and post-launch content coordinated across channels.

---

### Example 4: Quarterly Planning (Strategic)

```
/content-calendar

Create a Q1 content strategy and calendar for TaskFlow.

Q1 Goals:
- Drive 500 trial signups from content
- Publish 12 blog posts (SEO-focused)
- Grow email list by 1,000
- Establish founder as thought leader

Available resources:
- 1 content marketer (full-time)
- Founder available 2 hrs/week for LinkedIn
- Budget for 1 freelance writer

Key Q1 dates:
- Jan 15: AI feature launch
- Feb: No major launches
- March 1: Annual user conference

Content priorities by month:
- January: Launch support
- February: SEO content push
- March: Conference content + recap

Channels: Blog, LinkedIn, Twitter, Email, YouTube (1 video/month)

Include:
- Monthly themes
- High-level weekly breakdown
- Resource allocation
- Content production timeline
```

**What you'll get:** Strategic quarterly plan with monthly themes, resource allocation, and production timelines.

---

### Example 5: Content Batching Calendar (Efficiency)

```
/content-calendar

Create a content batching calendar for TaskFlow.

Goal: Batch-produce a month of content in one week.

Available for batching:
- 1 blog post → repurpose into social, email, video script
- 1 customer interview → case study, quote graphics, testimonial video
- 5 product tips → tip thread, carousel, newsletter section

Production schedule needed:
- Day 1: Research and outline day
- Day 2: Long-form writing day
- Day 3: Video recording day
- Day 4: Social content creation day
- Day 5: Editing and scheduling day

For each day, specify:
- What to produce
- How it connects to other content
- Where each piece will be published
```

**What you'll get:** Efficient batching schedule that maximizes content output from minimal production time.

---

### Example 6: Content Repurposing Plan (From Existing Assets)

```
/content-calendar

Create a content repurposing plan from these existing assets:

Existing content:
1. Blog post: "10 Project Management Mistakes Killing Your Team's Productivity"
2. Webinar recording: "How to Run Effective Standups" (45 min)
3. Customer case study: "How Acme Corp Saved 10 Hours/Week with TaskFlow"
4. Product launch blog: "Introducing AI Task Prioritization"

For each piece, show how to repurpose into:
- LinkedIn posts (founder account)
- Twitter content
- Email newsletter sections
- Short-form video clips
- Infographics/carousels

Create a 4-week distribution calendar that spreads this
repurposed content strategically.
```

**What you'll get:** Repurposing roadmap that multiplies content value across channels.

---

## Sample Output Preview

When you run `/content-calendar`, expect output like this:

```markdown
## TaskFlow Content Calendar: January 2026

### Monthly Theme: "New Year, New Focus"
Tied to AI feature launch on Jan 15

---

### Week 1 (Jan 1-7): Setting the Stage

**Theme:** New year productivity reset

| Day | Channel | Content | Pillar | Notes |
|-----|---------|---------|--------|-------|
| Mon | LinkedIn (Alex) | "My 3 productivity resolutions for 2026" | Thought leadership | Personal, relatable |
| Tue | Blog | "How to Audit Your Team's Workflow in 30 Minutes" | How-to | SEO: "workflow audit" |
| Tue | LinkedIn (Company) | Blog promo + key takeaway | Product | Graphic with checklist |
| Wed | LinkedIn (Alex) | Teaser: "We're launching something next week..." | Product | Build anticipation |
| Thu | Email | Newsletter: Workflow audit tips + "something coming" | Mix | 30% open rate target |
| Fri | LinkedIn (Alex) | Friday reflection post | Culture | Engagement focus |

**Content to produce this week:**
- [ ] 1 blog post (Workflow audit)
- [ ] 5 LinkedIn posts
- [ ] 1 newsletter
- [ ] 3 graphics/images

---

### Week 2 (Jan 8-14): Pre-Launch Buzz

**Theme:** The focus problem

[Continues with detailed weekly breakdown...]

---

### Cross-Channel Coordination

**Blog → Social → Email flow:**
1. Blog published Tuesday AM
2. LinkedIn promo Tuesday PM
3. Twitter thread Wednesday
4. Newsletter Thursday includes blog highlight
5. Reminder post following Monday

**Launch coordination (Jan 15):**
- 9am: Blog post live
- 10am: Email blast
- 11am: LinkedIn (Alex) personal take
- 12pm: Twitter thread
- 2pm: LinkedIn (Company) announcement
- 6pm: Product Hunt launch
```

---

## Tips for Best Results

### Do This
- **Start with goals** — What should content achieve?
- **Define pillars** — Ensures variety and balance
- **Include key dates** — Launches, events, seasonality
- **Be realistic about resources** — Don't overplan

### Avoid This
- **Planning too far ahead** — Things change; 1-3 months is ideal
- **All same content type** — Mix formats and tones
- **Ignoring repurposing** — One piece should become many
- **No coordination** — Channels should work together

### Pro Tips
1. **Theme your weeks** — Makes content feel cohesive
2. **Plan production, not just publishing** — When will you create?
3. **Build in buffer** — Not every slot needs to be filled
4. **Review and adjust** — Calendars should evolve

---

## Content Pillar Framework

A balanced content mix typically includes:

| Pillar | % of Content | Purpose |
|--------|--------------|---------|
| Educational | 25-30% | Build authority, SEO |
| Product | 20-25% | Drive conversions |
| Thought Leadership | 20-25% | Build brand, founder profile |
| Social Proof | 15-20% | Build trust |
| Culture/BTS | 10-15% | Humanize brand |

---

## Related Skills

| Skill | When to Use Instead |
|-------|---------------------|
| `/social-content` | When creating specific social posts |
| `/email-sequence` | When building email automations |
| `/copywriting` | When writing individual content pieces |
| `/launch-strategy` | When planning a product launch |

---

## Quick Reference

```
/content-calendar

Time period: [Week / Month / Quarter]
Channels: [Blog, LinkedIn, Twitter, Email, etc.]
Frequency: [Posts per channel per week]

Goals:
- [What content should achieve]

Content pillars:
1. [Category] (X%)
2. [Category] (X%)

Key dates:
- [Date]: [Event/Launch]

Resources:
- [Who creates content]
- [Hours available]

Include:
- Weekly themes: yes/no
- Production timeline: yes/no
- Content ideas: yes/no
- Cross-channel coordination: yes/no
```
