# Marketing Agent

A Claude-powered marketing assistant with specialized skills for SaaS and software marketing.

## Project Overview

This project uses Claude Code skills to generate high-quality marketing content, optimize conversions, and plan marketing strategies.

## Output Structure

All generated content goes to `output/{skill-name}/`:
- Each skill outputs to its own subdirectory
- Use descriptive filenames: `{client}-{type}-{date}.md`
- Keep drafts separate from final versions

## Default Preferences

### Brand Voice
- **Tone**: Professional but approachable
- **Style**: Clear, concise, action-oriented
- **Avoid**: Jargon, fluff, overpromising

### Content Standards
- Always include a clear CTA
- Back claims with specifics (numbers, examples)
- Write for scanning (headers, bullets, short paragraphs)

## Workflow

1. Check `tasks/current.md` for active work
2. Reference `plan/big_plan.md` for strategic context
3. Follow `.claude/rules.md` for quality standards
4. Save outputs to appropriate `output/` subdirectory

## Quick Reference

| Skill | Use For |
|-------|---------|
| `/copywriting` | Landing pages, homepage, feature pages |
| `/page-cro` | Conversion optimization audits |
| `/email-sequence` | Drip campaigns, onboarding emails |
| `/pricing-strategy` | Pricing tiers, packaging decisions |
| `/seo-audit` | Technical SEO issues |
| `/ab-test-setup` | Experiment design |
