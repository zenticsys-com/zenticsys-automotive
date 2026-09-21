# Phase 08 — SEO, Accessibility, Performance, and Launch

## Status

Application implementation complete on 22 September 2026. Automated local QA
is complete when the verification commands below pass. Portal configuration,
legal approval, real provider submissions/bookings, production Lighthouse,
Search Console submission, and live browser/device checks remain launch-owner
tasks documented in [`../LAUNCH-CHECKLIST.md`](../LAUNCH-CHECKLIST.md).

## Goal

Verify that the complete website is crawlable, accessible, fast, stable, and ready for Vercel production deployment.

## Work

- Add/finalize metadata for every indexable route.
- Add canonical URLs, Open Graph, and Twitter cards.
- Add `sitemap.ts` and `robots.ts`.
- Add Organization, Service, Article, FAQ, and Breadcrumb JSON-LD where applicable.
- Verify internal linking and crawlable menu links.
- Optimize R2 images and Next image usage.
- Verify gradient/animation does not harm LCP, CLS, or content visibility.
- Add reduced-motion and accessibility checks.
- Add spam protection and privacy/legal content.
- Configure Vercel environment variables.
- Configure MongoDB Atlas access settings.
- Configure R2 production bucket and delivery if selected.
- Configure Calendly/Google Calendar production account.
- Add analytics only with an approved privacy approach.
- Run final responsive, browser, keyboard, and content QA.

## Acceptance criteria

- Every important page has unique title and description.
- Sitemap contains intended public dynamic pages.
- Robots does not block public pages or expose admin/private paths.
- Initial HTML contains core content and real internal links.
- No broken images, routes, forms, or CMS entries.
- No critical accessibility issues.
- Build and deployment succeed on Vercel.
- CMS, R2, and scheduling environment variables are documented.
- Vercel/R2 usage monitoring and budget alerts are configured.

## Test

```bash
npm run lint
npm run build
npm run test:e2e
npm run test:a11y
```

Then test a Vercel preview, inspect HTML, run Lighthouse-style checks, test schema output, submit forms, create a booking, open all dynamic routes, and verify mobile/keyboard/reduced-motion behavior.

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Perform final SEO,
accessibility, performance, deployment, and launch hardening only. Do not change
the approved visual direction or add new product features. Verify server-rendered
content, metadata, sitemap, robots, structured data, image performance, motion
fallbacks, forms, CMS/R2 configuration, lint, build, and Vercel preview behavior.
```

## Implemented

- Unique route metadata, canonical URLs, per-route Open Graph/Twitter metadata,
  generated social imagery, web manifest, sitemap, and environment-aware robots.
- Published/no-index filtering for CMS-driven sitemap entries and crawler
  exclusion for admin/API routes and Vercel Preview deployments.
- Server-rendered Organization, Service, Article, FAQ, Breadcrumb, and listing
  structured data on applicable routes.
- `/about` and `/terms` routes, plus existing privacy content and explicit legal
  review gates.
- Baseline security/privacy response headers and removal of the framework
  signature header.
- Eager priority for the active above-the-fold automotive audience image while
  keeping inactive images lazy; the hidden lifecycle gallery now returns no DOM
  and downloads no assets.
- WCAG contrast/link-distinction fixes and automated axe checks across a
  representative route set under reduced-motion conditions.
- Automated checks for sitemap/robots, initial HTML, one-H1 structure,
  descriptions, canonicals, social metadata, valid JSON-LD, security headers,
  and hidden-image behavior.
- A code-derived production configuration, service verification, monitoring,
  launch, and rollback checklist.

## External completion boundary

The code can be completed without live credentials. The following claims must
not be marked complete until the owner supplies production accounts and a
deployed URL: CMS/R2 upload verification, email delivery, Turnstile production
verification, Calendly-to-Google Calendar/Meet booking, legal approval,
Search Console submission, production Lighthouse, spend alerts, and real-device
browser checks.

## Local verification record

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; 35 routes generated with no metadata warnings.
- `npm run test:a11y`: 24/24 passed across all four target viewports.
- `npm run test:e2e`: 176/176 passed across all four target viewports.
