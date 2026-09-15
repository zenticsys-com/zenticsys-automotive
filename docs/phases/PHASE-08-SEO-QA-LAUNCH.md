# Phase 08 — SEO, Accessibility, Performance, and Launch

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
