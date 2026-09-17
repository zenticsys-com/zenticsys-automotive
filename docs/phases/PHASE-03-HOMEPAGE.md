# Phase 03 — Homepage

**Status:** Complete.

## Goal

Build the modern, centered, automotive homepage that explains the full range of projects Zenticsys can deliver.

## Work

- Build the no-split hero: centered headline, supporting message, CTAs, animated gradient atmosphere, and automotive system visual.
- Add automotive business-type visual gallery.
- Add “What We Build” solution gallery with minimal image-led cards.
- Add animated website → dealer/operations → admin/platform workflow story.
- Add prominent CarVu case-study feature.
- Add automotive capability section.
- Add proof/testimonials/metrics where approved.
- Add Insights preview.
- Add final Request a Proposal CTA.
- Add homepage metadata and Organization JSON-LD.

## Acceptance criteria

- First viewport does not use a left-copy/right-image template.
- Hero feels modern, creative, and automotive.
- Simple website projects and complex software projects are both represented.
- Solution cards do not contain unnecessary stacks or dense labels.
- Gradient and image color treatment harmonize.
- Main copy is in initial HTML.
- Primary CTA is obvious without being noisy.

## Test

- Check visual hierarchy at desktop and mobile.
- Check LCP candidate and image loading.
- Check heading hierarchy and initial HTML.
- Test reduced motion.
- Run lint/build.

## Implementation record

- Replaced the Phase 02 shell preview with an original, centered automotive
  homepage; the first viewport does not use a conventional split hero.
- Added the approved headline, supporting positioning, proposal CTA, solutions
  CTA, and a code-built automotive system visual covering inventory,
  operational activity, service, and auction signals.
- Added an image-led audience mosaic for dealerships, fleets, service centers,
  parts businesses, marketplaces, and auction companies.
- Added the seven-part solution gallery with minimal overlay copy and no noisy
  technology tags.
- Added a four-step customer experience to platform-control workflow story.
- Added a prominent CarVu section describing only the experience already in
  scope. Its interface is an original representative illustration and is
  explicitly labelled as such; no product screenshot, testimonial, client
  metric, or invented result is presented.
- Added capability and delivery-range sections spanning customer-facing,
  operational, and platform-wide work. Unsupported social proof was
  intentionally omitted until approved material exists.
- Added an automotive-only Insights preview and the closing proposal/schedule
  conversion block.
- Applied a consistent graphite, warm brand-light, orange-red, and petrol accent
  treatment so the photographs and surrounding atmosphere feel coordinated.
- Added mobile-specific compositions for the system visual, galleries,
  workflow, CarVu interface, capabilities, Insights, and final CTA.
- Added a branded homepage title, description, canonical, Open Graph metadata,
  and Organization JSON-LD.
- Kept every section, link, heading, and structured-data block server-rendered.
- Replaced the abstract dashboard beneath the hero copy with an original,
  cinematic automotive ecosystem scene spanning dealership, service, fleet,
  and auction operations. A lightweight SVG route layer and restrained signal
  markers communicate digital connection without presenting the agency as only
  a SaaS-platform builder. The previous dashboard component remains available
  in the repository while this direction is evaluated.

## Assets

- Added four locally stored atmospheric photographs sourced under the Unsplash
  License, then added six solution-specific photographs under the Pexels
  License so every What We Build card depicts its actual automotive context.
  These visuals are not represented as Zenticsys client work.
- Added a separate set of six operation-specific photographs for the audience
  section. None are reused by What We Build. The repeated card mosaic was
  replaced with an image-and-selector composition on larger screens and a
  horizontal editorial rail on mobile, making “who we serve” visually distinct
  from “what we build.”
- Source, creator, usage, and license details are recorded in
  `docs/assets/HOMEPAGE-ASSET-REGISTRY.md`.
- No third-party logo, proprietary screenshot, or YNA asset/source code was
  copied.

## Dependencies added

None. The phase uses Next.js Image, existing Lucide icons, and CSS motion.

## Verification record

- `npm run lint`: passed
- `npm run build`: passed; `/` is statically prerendered
- `npm run test:e2e`: 28 tests passed
- Tested widths: 320px, 768px, 1024px, and 1440px
- Verified the complete homepage narrative and primary CTA are in initial HTML
- Verified one H1, the expected H2 hierarchy, metadata, and Organization JSON-LD
- Verified no horizontal document overflow at any tested width
- Verified decorative image semantics and the representative CarVu visual label
- Verified reduced-motion behavior and retained the Phase 02 menu accessibility
  regression tests
- Visually inspected the full desktop and mobile compositions; refined the
  narrow-screen CarVu layout after inspection

## External configuration

This phase introduced no external service, account, secret, or environment
variable. The proposal, solution, case-study, Insights, and scheduling links are
intentional future routes implemented in later phases. Calendly/Google Meet,
forms/email, CMS, database, and R2 configuration remain deferred to their
documented phases.

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Build only the homepage.
Do not use the old Zenticsys homepage structure. Create the centered, YNA-inspired
automotive experience with the light-turning-on gradient, automotive system
visual, solution gallery, CarVu proof, workflow story, Insights, and proposal CTA.
Use original automotive copy and assets. Verify SEO, responsive layout, motion,
lint, and build.
```
