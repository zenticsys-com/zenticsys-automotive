# Phase 05 — Case Studies and Insights

**Status:** Complete.

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

## Implemented

- Added the `/case-studies` listing with a single large, image-led CarVu card,
  restrained overlay copy, and a direct case-study CTA.
- Added the statically generated `/case-studies/[slug]` template with a centered
  introduction, project facts, challenge, users and roles, workflow, capability
  map, technical depth, qualitative proof, and proposal CTA.
- Added the `/insights` editorial listing with one dominant feature followed by
  a quieter two-column article grid.
- Added statically generated `/insights/[slug]` articles with breadcrumbs,
  byline metadata, a sticky table of contents, substantial section content,
  an original workflow diagram, takeaways, related reading, and proposal CTA.
- Added typed editorial content in `src/content/editorial.ts`. This preserves the
  public route and component contract for migration to Payload CMS in Phase 07.
- Added ItemList structured data to listing pages and Article plus
  BreadcrumbList structured data to detail pages.
- Added dedicated Phase 05 browser tests for server-rendered content, metadata,
  canonical URLs, JSON-LD, valid and unknown slugs, content depth, image
  differentiation, and horizontal overflow across four viewports.

## Evidence and claims boundary

The CarVu page uses only the approved experience supplied for this project:
enterprise automotive SaaS, online buying and selling, public and dealer
auctions, role-based dealer dashboards, and complex super-admin operations. It
does not publish unapproved performance metrics, testimonials, named outcomes,
screenshots, technology claims, or confidential client details.

Because no verified quantitative results were supplied, the intended “results”
area is presented as **What this experience proves**: qualitative delivery
capabilities supported by the approved scope. Real metrics can replace or
extend this section once they are approved.

## Visual and asset handling

- The case-study hero uses a clearly disclosed royalty-free editorial stock
  image; it is not represented as a CarVu interface or client photograph.
- Insight imagery is topic-specific royalty-free editorial photography.
- Product and workflow visuals are original semantic HTML/CSS diagrams and are
  labelled as representative diagrams rather than product screenshots.
- Sources, license basis, intended use, and replacement concerns are recorded
  in `docs/assets/EDITORIAL-ASSET-REGISTRY.md`.
- Clickable editorial image cards inherit the shared grayscale-on-hover cue and
  reduced-motion behavior.

## Rendering and SEO

All Phase 05 routes and editorial components are React Server Components. Known
slugs are emitted as static HTML through `generateStaticParams`, unknown slugs
return the route-level 404, and all meaningful copy is present in the initial
document. Metadata, canonical URLs, Open Graph fields, Twitter fields, internal
links, semantic headings, alt text, and structured data are generated on the
server. No client-side fetching or JavaScript-dependent content reveal was
introduced.

## External configuration

None is required for Phase 05. Editorial content and local image derivatives are
currently repository-backed. Payload CMS and Cloudflare R2 configuration remain
deferred to Phase 07, when the static content source is replaced by server-side
CMS reads.

## Verification

Run from the project root:

```bash
npm run lint
npm run build
npx playwright test
```

The phase is complete only while lint, the production build, and the full
browser regression suite pass.

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
