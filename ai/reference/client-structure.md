# Client Structure

Documentation of the client profile template from `clients/_template/`.

## Overview

Each client has a structured profile that provides context for skill execution. The template contains 22 files organized into 7 categories.

## Directory Structure

```
clients/{client-slug}/
├── README.md                    # Quick start guide
├── profile.md                   # Core company info (required)
├── brand/
│   ├── voice.md                 # How they sound
│   ├── messaging.md             # Positioning & value props
│   └── assets.md                # Visual/brand assets
├── audience/
│   ├── primary-icp.md           # Main target customer
│   ├── secondary-icp.md         # Additional segments
│   ├── anti-personas.md         # Who they don't serve
│   └── customer-journey.md      # Buyer journey stages
├── product/
│   ├── overview.md              # What they sell
│   ├── pricing.md               # Pricing structure
│   ├── differentiators.md       # What makes them unique
│   └── objections.md            # Common objections & responses
├── market/
│   ├── competitors.md           # Competitive landscape
│   ├── industry.md              # Industry context
│   └── proof.md                 # Testimonials, case studies
├── operations/
│   ├── contacts.md              # Key contacts
│   ├── process.md               # Working process
│   └── tools.md                 # Tech stack & tools
├── projects/
│   ├── active.md                # Current projects
│   └── history.md               # Past work
└── research/
    └── notes.md                 # Research notes
```

## File Contents

### profile.md (Required)

Core company information. Always loaded for context.

```markdown
# {Company Name} Profile

## Company Overview

**Company Name:** {Full legal name}
**Website:** {URL}
**Industry:** {Primary industry}
**Stage:** {Startup/Growth/Enterprise}
**Founded:** {Year}
**Headquarters:** {Location}

## One-Line Description

{Single sentence describing what they do}

## Elevator Pitch

{2-3 sentence description for someone unfamiliar}

## Mission/Vision

**Mission:** {Why they exist}
**Vision:** {What they're working toward}

## Key Metrics

- **ARR/Revenue:** {If known}
- **Customers:** {Count or range}
- **Team Size:** {Approximate}
- **Funding:** {If relevant}
```

### brand/voice.md

How the company communicates.

```markdown
# Brand Voice

## Voice Attributes

{3-5 adjectives describing their voice}
- {Attribute 1}: {Description}
- {Attribute 2}: {Description}
- {Attribute 3}: {Description}

## Tone Spectrum

| Formal ◄──────────────────────► Casual |
|         {Mark position}                 |

| Technical ◄────────────────► Accessible |
|           {Mark position}               |

## Do's and Don'ts

### Do
- {Voice guideline}
- {Voice guideline}

### Don't
- {Anti-pattern}
- {Anti-pattern}

## Example Phrases

{Phrases that sound like them}

## Example Anti-Phrases

{Phrases that don't sound like them}
```

### brand/messaging.md

Positioning and value propositions.

```markdown
# Messaging Framework

## Positioning Statement

For {target customer}
Who {need/pain}
{Product name} is a {category}
That {key benefit}
Unlike {alternatives}
We {key differentiator}

## Value Propositions

### Primary Value Prop
{Main value delivered}

### Supporting Props
1. {Value prop 1}
2. {Value prop 2}
3. {Value prop 3}

## Key Messages

### For {Audience 1}
{Tailored message}

### For {Audience 2}
{Tailored message}

## Tagline Options

- {Option 1}
- {Option 2}
```

### audience/primary-icp.md

Ideal Customer Profile - main target.

```markdown
# Primary ICP

## Demographics

**Title/Role:** {Job title}
**Company Size:** {Employee range}
**Industry:** {Target industries}
**Geography:** {Target regions}

## Psychographics

**Goals:**
- {Goal 1}
- {Goal 2}

**Challenges:**
- {Challenge 1}
- {Challenge 2}

**Fears:**
- {Fear 1}
- {Fear 2}

## Day in the Life

{Description of their typical day and how product fits}

## Buying Behavior

**Where they research:** {Channels}
**Who influences:** {Stakeholders}
**Decision process:** {How they buy}

## Quotes (Voice of Customer)

> "{Actual quote from customer}"
> "{Another quote}"
```

### product/overview.md

Product information.

```markdown
# Product Overview

## What It Is

{Clear description of the product}

## Core Features

### {Feature 1}
{Description and benefit}

### {Feature 2}
{Description and benefit}

### {Feature 3}
{Description and benefit}

## Use Cases

1. **{Use Case 1}**: {Description}
2. **{Use Case 2}**: {Description}
3. **{Use Case 3}**: {Description}

## Technical Details

- **Platform:** {Web/Mobile/Desktop}
- **Integrations:** {Key integrations}
- **Requirements:** {Technical requirements}

## Pricing Model

{Brief pricing structure - details in pricing.md}
```

### market/competitors.md

Competitive landscape.

```markdown
# Competitive Landscape

## Direct Competitors

### {Competitor 1}
- **What they do:** {Description}
- **Strengths:** {Their advantages}
- **Weaknesses:** {Their gaps}
- **Our advantage:** {Why we win}

### {Competitor 2}
{Same structure}

## Indirect Competitors

{Alternatives customers consider}

## Competitive Positioning

| Factor | Us | Competitor 1 | Competitor 2 |
|--------|----|--------------|--------------|
| {Factor 1} | ✓ | ✓ | ✗ |
| {Factor 2} | ✓ | ✗ | ✓ |

## Win/Loss Insights

**Why we win:** {Common reasons}
**Why we lose:** {Common reasons}
```

### market/proof.md

Social proof and results.

```markdown
# Social Proof

## Customer Testimonials

### {Customer Name}, {Title} at {Company}

> "{Full testimonial quote}"

**Result:** {Specific outcome achieved}

### {Another Customer}
{Same structure}

## Case Studies

### {Company Name} - {Headline Result}

**Challenge:** {What they faced}
**Solution:** {How we helped}
**Result:** {Quantified outcome}

## Metrics & Stats

- {X}% improvement in {metric}
- {Y}+ customers/users
- ${Z} saved/generated

## Logos

{List of notable customer logos}

## Awards & Recognition

- {Award 1}
- {Press mention}
```

## Usage in Skills

### Context Loading Priority

Skills load context in this order:

1. **Always loaded:**
   - profile.md

2. **Usually loaded:**
   - brand/voice.md
   - brand/messaging.md
   - audience/primary-icp.md
   - product/overview.md

3. **Skill-specific:**
   - market/competitors.md (competitor-research, positioning)
   - market/proof.md (copywriting, case-study)
   - product/pricing.md (pricing-strategy, copywriting)

### Creating a New Client

```bash
# Copy template
cp -r clients/_template clients/{new-client-slug}

# Edit profile.md first (required)
# Then fill in other files as information becomes available
```

### S3 Upload

When uploaded to S3, the structure is preserved:

```
s3://marketing-agent/clients/{client-slug}/
├── profile.md
├── brand/
│   ├── voice.md
│   └── ...
└── ...
```

## Required vs Optional

| File | Required | Reason |
|------|----------|--------|
| profile.md | **Yes** | Core identity |
| brand/voice.md | Recommended | Consistent tone |
| brand/messaging.md | Recommended | Key messages |
| audience/primary-icp.md | Recommended | Target understanding |
| product/overview.md | Recommended | Product context |
| All others | Optional | Enhanced context |
