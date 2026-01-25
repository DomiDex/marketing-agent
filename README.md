# Marketing Agent

A Claude-powered marketing assistant with 23 specialized skills for SaaS and software marketing.

## Quick Start

1. **Set up a client knowledge base**
   ```
   cp -r clients/_template clients/your-client
   ```
   Start with `profile.md` and `brand/voice.md`, then fill in other files as needed.

2. **Run a skill**
   ```
   /copywriting
   /page-cro
   /email-sequence
   ```

3. **Find your output**
   ```
   output/{skill-name}/
   ```

## Available Skills

### Content Creation
| Skill | Use For |
|-------|---------|
| `/copywriting` | Landing pages, homepage, pricing, feature pages |
| `/email-sequence` | Onboarding, nurture, re-engagement campaigns |
| `/social-content` | LinkedIn, Twitter/X, Instagram, TikTok |
| `/copy-editing` | Polish and improve existing copy |

### Conversion Optimization
| Skill | Use For |
|-------|---------|
| `/page-cro` | Audit and optimize any marketing page |
| `/signup-flow-cro` | Registration and trial activation |
| `/form-cro` | Lead capture, contact, demo request forms |
| `/onboarding-cro` | Post-signup activation flows |
| `/popup-cro` | Modals, overlays, slide-ins, banners |
| `/paywall-upgrade-cro` | In-app upgrade screens, feature gates |

### Strategy & Research
| Skill | Use For |
|-------|---------|
| `/pricing-strategy` | Pricing tiers, packaging, monetization |
| `/ab-test-setup` | Experiment design and analysis |
| `/launch-strategy` | Product launches, feature announcements |
| `/marketing-ideas` | 140+ proven marketing tactics |
| `/marketing-psychology` | 70+ mental models for marketing |
| `/competitor-alternatives` | Comparison and alternative pages |
| `/referral-program` | Referral and affiliate programs |
| `/free-tool-strategy` | Free tools for lead generation |

### Technical Marketing
| Skill | Use For |
|-------|---------|
| `/seo-audit` | Technical SEO, on-page optimization |
| `/schema-markup` | Structured data (JSON-LD) |
| `/programmatic-seo` | SEO pages at scale |
| `/analytics-tracking` | GA4, GTM, conversion tracking |
| `/paid-ads` | Google Ads, Meta, LinkedIn campaigns |

## Project Structure

```
marketing-agent/
├── .claude/
│   ├── commands/        # Skill invocation configs
│   ├── skills/          # Skill implementations (23 skills)
│   └── rules.md         # Quality standards
├── clients/
│   ├── _template/       # Client knowledge base template (copy for new clients)
│   │   ├── README.md    # Quick start for this client
│   │   ├── profile.md   # Core company info
│   │   ├── brand/       # Voice, messaging, assets
│   │   ├── audience/    # ICPs, anti-personas, journey
│   │   ├── product/     # Overview, pricing, differentiators
│   │   ├── market/      # Competitors, industry, proof
│   │   ├── research/    # Interviews, surveys, notes
│   │   ├── operations/  # Contacts, process, tools
│   │   └── projects/    # History, active work
│   └── {client-name}/   # Actual client directories
├── output/
│   └── {skill-name}/    # Generated content by skill
├── workflows/           # Multi-skill workflow templates
├── plan/
│   └── big_plan.md      # Strategic roadmap
├── tasks/
│   └── current.md       # Active work tracking
└── CLAUDE.md            # AI instructions
```

## Workflow

1. **Check tasks**: `tasks/current.md`
2. **Reference plan**: `plan/big_plan.md`
3. **Follow rules**: `.claude/rules.md`
4. **Save outputs**: `output/{skill}/`

## Quality Standards

All content follows rules defined in `.claude/rules.md`:

- Headlines: Benefit-led, specific numbers, under 10 words
- Body: One idea per paragraph, active voice, no filler
- CTAs: Action verbs, specific outcomes, clear next step
- Format: Proper hierarchy, scannable, mobile-friendly

## Example Outputs

See example outputs demonstrating quality standards:

- `output/copywriting/example_saas-homepage_2026-01-22.md`
- `output/page-cro/example_pricing-audit_2026-01-22.md`
- `output/email-sequence/example_onboarding-sequence_2026-01-22.md`

## Brand Defaults

| Setting | Default |
|---------|---------|
| Tone | Professional but approachable |
| Style | Clear, concise, action-oriented |
| Avoid | Jargon, fluff, overpromising |

Override defaults by creating a client profile in `clients/`.

## Contributing

1. Add new skills to `.claude/skills/{skill-name}/SKILL.md`
2. Add command config to `.claude/commands/{skill-name}.md`
3. Create output directory: `output/{skill-name}/`
4. Update this README

## License

Private project.
