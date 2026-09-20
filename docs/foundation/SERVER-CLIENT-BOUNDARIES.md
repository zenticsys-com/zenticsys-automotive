# Server and Client Boundaries

The public website uses React Server Components by default. Pages, layouts,
metadata, CMS reads, long-form content, navigation links, solution content,
case studies, and Insights must remain server-rendered unless a browser API or
direct user interaction requires otherwise.

## Server by default

- Route pages and layouts
- Metadata and canonical URL generation
- CMS queries and data shaping
- Navigation and footer link markup
- SEO content and structured data
- Static and editorial presentation components
- Loading and not-found route states

## Approved client islands

Client Components are limited to focused interactive boundaries such as:

- Menu open/close, focus management, Escape handling, and scroll locking
- Coordinated Motion animation that cannot be expressed safely in CSS
- Carousels, accordions, and other stateful controls
- Proposal/contact form interaction around server submissions
- Calendly embed or modal behavior
- Recoverable route error boundaries required by Next.js

Do not mark a page, root layout, or large content tree with `"use client"` merely
to support one interaction. Put the directive in the smallest component that
needs it and pass serializable props from its Server Component parent.

## Phase 01 boundary audit

- `src/app/layout.tsx`: Server Component
- `src/app/page.tsx`: Server Component
- `src/app/loading.tsx`: Server Component
- `src/app/not-found.tsx`: Server Component
- `src/app/error.tsx`: Client Component because Next.js error boundaries require it
- `src/lib/site.ts`: server/build configuration; do not import it into a Client Component

## Phase 02 boundary audit

- `src/app/layout.tsx`: Server Component composing the shared shell
- `SiteHeader`, `SiteFooter`, `SiteLogo`, `PageAtmosphere`, `Container`, and
  `ScheduleCallLink`: Server Components by default
- `MenuOverlay`: focused Client Component for open state, focus containment,
  Escape/outside dismissal, focus return, and scroll locking
- Closed-menu navigation anchors remain in the server-rendered HTML and become
  inert and visually hidden until the trigger is activated
- CSS handles the running border, atmosphere, entrance, and reduced-motion
  treatment without adding animation JavaScript

## Phase 03 boundary audit

- `src/app/page.tsx` and every homepage marketing section remain Server
  Components.
- Homepage content is supplied by a static typed content module and rendered in
  the initial HTML; no client fetch or hydration is needed to reveal it.
- Organization JSON-LD is emitted by a Server Component.
- The hero system visual and representative CarVu interface are semantic
  HTML/CSS illustrations rather than canvas or client-rendered applications.
- Gallery hover effects, workflow movement, atmosphere, and chart entrance are
  CSS-only and have reduced-motion fallbacks.
- Phase 03 adds no new Client Component boundary; the focused menu island from
  Phase 02 remains the only hydrated homepage interaction.

## Phase 03.1 boundary audit

- `PageAtmosphere` is now a focused Client Component because it observes active
  server-rendered sections and updates a decorative palette attribute.
- `MotionReveal` is a Client Component wrapper around server-rendered children.
  It emits visible content during SSR and progressively prepares only
  below-the-fold presentation after hydration.
- `HeroRouteMorph` is a decorative Client Component; the semantic hero heading
  remains server-rendered HTML outside the SVG.
- `MenuOverlay` remains the existing interaction island and now uses Motion for
  coordinated entry/exit. Navigation destinations also remain available in the
  server-rendered global footer.
- No route, long-form section, metadata component, content collection, or
  marketing-copy component was converted to a Client Component.

## Phase 04 boundary audit

- `/solutions`, `/services`, and both dynamic detail route families are Server
  Components and are emitted as static HTML at build time.
- `CatalogListing`, `CatalogDetail`, and the catalogue JSON-LD components are
  Server Components with no browser-only state or client data fetching.
- `src/content/solutions-services.ts` is a typed static source for this phase;
  it can be replaced by server-side Payload queries during Phase 07 without
  changing the public route contract.
- Native links, ordered lists, and `details`/`summary` elements provide the
  catalogue navigation, workflows, and FAQs without adding another hydrated
  interaction island.
- Listing and detail presentation is CSS-only. Phase 04 adds no Client
  Component boundary and no animation runtime usage.

Important headings, links, and marketing copy must be present in initial HTML.
Animations may enhance that HTML but must never be responsible for fetching or
revealing indexable content.
