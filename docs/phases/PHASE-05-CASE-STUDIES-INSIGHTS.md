# Phase 05 — Case Studies and Insights

## Goal

Build high-impact listing pages and informative dynamic detail pages for proof and authority.

## Work

- Build `/case-studies` with large visual cards, minimal overlay copy, and one CTA.
- Build `/case-studies/[slug]` informative template.
- Add CarVu case study with only approved public information.
- Build `/insights` editorial listing inspired by YNA.
- Build `/insights/[slug]` rich article template.
- Add related content, breadcrumbs, article metadata, and Article JSON-LD.
- Add screenshots, diagrams, and asset credits where applicable.

## Acceptance criteria

- Listing pages catch attention with large titles and imagery.
- Cards do not become dense dashboards of metadata.
- Case-study details include challenge, users/roles, workflows, solution, visuals, technical depth, and results.
- Insight details are useful long-form pages, not only excerpts.
- No unverified metrics or invented client claims.
- Images have meaningful alt text and documented licenses.

## Test

- Test dynamic slugs, missing content, not-found behavior, metadata, and social previews.
- Verify article headings and structured data.
- Test image loading and mobile reading width.
- Run lint/build.

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Build the case-study and
Insights listing/detail experiences. Listings must remain minimal and image-led;
detail pages must be informative. Use CarVu only with approved facts. Do not
invent results, clients, screenshots, or claims. Verify dynamic routes, SEO,
accessibility, lint, and build.
```
