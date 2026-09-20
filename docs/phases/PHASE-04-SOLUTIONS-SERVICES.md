# Phase 04 — Solutions and Services

**Status:** Complete.

## Goal

Build the visual Solutions/Services listing experience and informative detail templates for automotive buyers.

## Work

- Build `/solutions` as an image-led YNA-inspired gallery.
- Build solution detail template.
- Add all seven solution paths.
- Build `/services` and automotive service detail template.
- Add audiences, problems, capabilities, workflows, screenshots, FAQs, related case studies, and CTAs.
- Add metadata, canonical URLs, breadcrumbs, and relevant structured data.
- Keep all pages automotive-focused.

## Acceptance criteria

- Listing pages are visually light and easy to scan.
- Detail pages are informative and not merely centered title/description pages.
- Dealership buyers find website work quickly.
- Fleet/operations buyers find system work quickly.
- Every detail page has a clear proposal CTA.
- Internal links connect solutions, services, and case studies.

## Test

- Test every route and card link.
- Check one H1 per page and meaningful metadata.
- Verify mobile gallery behavior.
- Confirm long-form content remains server-rendered.
- Run lint/build.

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Build the automotive
solutions and services listing/detail pages only. Use minimal YNA-inspired
listing cards but informative detail pages with real automotive workflows and
capabilities. Do not add unrelated industries or generic agency copy. Verify all
links, metadata, responsive layouts, accessibility, lint, and build.
```

## Implementation record

Completed with a static, typed catalogue that keeps all important content in
the initial HTML. No CMS dependency was introduced in this phase.

### Routes delivered

- `/solutions`
- `/solutions/dealership-websites`
- `/solutions/fleet-management`
- `/solutions/car-service-platforms`
- `/solutions/automotive-parts-ecommerce`
- `/solutions/vehicle-marketplaces`
- `/solutions/auction-platforms`
- `/solutions/custom-automotive-software`
- `/services`
- `/services/automotive-website-development`
- `/services/custom-software-development`
- `/services/ui-ux-design`
- `/services/mobile-app-development`
- `/services/integrations-and-maintenance`

The listing pages use large, image-led cards with only a short audience cue,
title, and CTA. The detail pages deliberately become more informative and use
an editorial layout rather than carrying the centered listing treatment through
the entire page.

### Detail-page information model

Every detail route includes:

- Visible breadcrumbs and one unique H1
- Automotive audience and business problem
- Operational pain points
- Solution capabilities or service deliverables
- A connected workflow
- A labelled representative product-interface concept
- Integrations and surrounding systems
- Intended outcomes without fabricated performance claims
- A practical, staged delivery process
- Related services or solutions
- A CarVu experience link reserved for the Phase 05 case-study route
- Native HTML FAQ disclosure controls
- Schedule Call and Request a Proposal paths

### SEO and rendering

- Listing and detail pages are React Server Components.
- All 12 dynamic detail paths are statically generated with
  `generateStaticParams`; unknown slugs are disabled with
  `dynamicParams = false`.
- Metadata includes a unique title, meaningful description, canonical URL,
  Open Graph data, and a large-image Twitter card where applicable.
- Listing pages emit `ItemList` JSON-LD.
- Detail pages emit `Service`, `BreadcrumbList`, and `FAQPage` JSON-LD.
- Long-form headings, copy, links, FAQs, and schemas are available in the
  server response and do not depend on hydration or animation.

### Assets and presentation

- Phase 04 reuses the approved, locally stored automotive assets recorded by
  the earlier asset work; it does not introduce AI-generated imagery or new
  external image dependencies.
- The fixed, changing atmosphere continues behind every route.
- Presentation and responsive behavior are contained in
  `src/styles/catalog.css`; no new animation runtime or component library was
  added.
- Listing images use `next/image` with positioned parents, responsive `sizes`,
  meaningful alt text, and priority only for the first visible item.

### External configuration after implementation

None. Phase 04 uses static local content and images, so it requires no R2,
Payload CMS, database, Calendly, Google Calendar, or additional environment
variables. Content migration to Payload and R2 remains Phase 07. Calendly and
Google Meet configuration remains Phase 06.

### Verification completed

- ESLint passes.
- The optimized Next.js production build passes.
- The build reports `/solutions` and `/services` as static pages and all 12
  detail paths as statically generated HTML.
- Phase-specific Playwright coverage verifies every route and listing link,
  one H1, metadata, canonical URLs, JSON-LD, breadcrumbs, content sections,
  proposal CTAs, initial-response content, and horizontal overflow.
- Phase-specific tests pass at 320px, 768px, 1024px, and 1440px widths.
- Desktop and mobile visual inspection was completed for both listing and
  detail patterns.

## Phase 04.1 — Distinct detail-page compositions

The original Phase 04 implementation correctly varied the content but used one
shared visual template for both route families. Phase 04.1 separates them into
two purpose-built Server Components.

### Solution detail direction

Solution pages retain the product-oriented editorial structure:

- Business problem and operational pain points
- Product capabilities
- Connected end-to-end workflow
- Representative operational interface
- System integrations
- Business outcomes and staged implementation

The implementation is provided by `SolutionDetail`. These pages should feel
like examining how an automotive digital product would work.

### Service detail direction

Service pages now use a delivery-partner structure and a visibly different
composition:

- Asymmetric text-and-image hero rather than a centered hero
- Project-fit signals
- Focused engagement, product delivery, and ongoing partnership options
- Concrete service-specific deliverables
- Staggered collaboration stages
- Representative delivery/readiness artifact instead of a product dashboard
- Technical foundations and surrounding systems
- Handover, ownership, support, and continuity outcomes
- Related automotive solutions, FAQs, and proposal CTA

The implementation is provided by `ServiceDetail`. These pages should help a
buyer evaluate how Zenticsys would engage and deliver—not mistake a service for
another packaged solution.

### Shared design system, not a shared page template

Both route families continue to share the global navigation, footer,
typography, color system, fixed atmosphere, CTA language, metadata, structured
data, and small semantic patterns such as breadcrumbs and native FAQs. They do
not share the main page composition.

### Phase 04.1 configuration and verification

- No external configuration or new environment variables are required.
- No new dependency or client-side rendering boundary was introduced.
- Both route families remain statically generated.
- Tests explicitly assert that solution pages use the product narrative and
  service pages use the engagement/delivery narrative.
- Desktop and mobile visual inspection was repeated for the new service layout.
