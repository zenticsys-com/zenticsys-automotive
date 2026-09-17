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

Important headings, links, and marketing copy must be present in initial HTML.
Animations may enhance that HTML but must never be responsible for fetching or
revealing indexable content.
