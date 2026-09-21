# CMS Editor Guide

## Purpose

Payload is the editorial workspace for the Zenticsys Automotive website. It manages published website content; the visual system, responsive layouts, motion, accessibility behavior, and component rules remain controlled in code.

The admin is available at `/admin` after MongoDB Atlas, Payload, and Cloudflare R2 are configured. The public REST endpoint is namespaced at `/cms-api` so it does not conflict with the website's enquiry API.

## First setup

1. Complete the Payload, MongoDB Atlas, and R2 values in [`ENVIRONMENT-SETUP.md`](./ENVIRONMENT-SETUP.md).
2. Start the application and open `/admin`.
3. Create the first administrator account. Use an individual work email and a unique password.
4. Run `npm run cms:seed` once to copy the approved repository content into the configured database. The seed is idempotent by slug: rerunning it updates seeded entries instead of creating duplicates.
5. Review every seeded document before changing public content.

## Roles

- **Administrator:** manages users, deletes records, configures the editorial workspace, and can edit content.
- **Editor:** creates, edits, drafts, and publishes content but cannot administer users or delete protected content.

Do not share accounts. Remove access when a collaborator no longer needs it.

## Content areas

- **Solutions:** automotive products the client may need, such as dealership websites, fleet systems, service platforms, parts ecommerce, marketplaces, and auctions.
- **Services:** ways Zenticsys can engage and deliver, such as website development, custom software, UX, mobile apps, integrations, and maintenance.
- **Case studies:** approved project experience and evidence. Never invent metrics, testimonials, client claims, or confidential implementation details.
- **Insights:** long-form automotive articles with an introduction, sections, points, takeaways, and related articles.
- **Pages:** controlled informational pages assembled only from approved intro, feature-grid, image/text, and CTA blocks.
- **FAQs and testimonials:** reusable editorial records. A testimonial requires a stored approval reference before publication.
- **Homepage, navigation, footer, and site settings:** global content used across the website.

## Draft and publishing workflow

1. Create or edit the record as a draft.
2. Complete the title, URL slug, summary, image alt text, and SEO fields.
3. Preview the relevant public route where available.
4. Check claims, spelling, links, image rights, and mobile-length headings.
5. Publish only after approval.

Anonymous website queries are constrained to `_status: published`. Logged-in CMS users can inspect drafts in the admin, but drafts are not returned to the public server-rendered routes.

## Media rules

- Upload permanent media through the `Media` collection; configured production uploads go to Cloudflare R2, not Vercel's filesystem.
- Supply useful alt text for meaningful images. Use concise language that describes what is visible and relevant.
- Record the source, creator, download date, and license or permission reference.
- Do not upload unlicensed manufacturer photography, logos, customer data, confidential screenshots, or AI-generated work presented as real client evidence.
- Prefer optimized JPEG/WebP/AVIF images at an appropriate source size. Do not upload video in the initial release.
- Deleting a media record may break a page that references it. Check relationships first.

## SEO and URL rules

- Slugs use lowercase letters, numbers, and hyphens; changing a published slug also requires a redirect in a later SEO/launch task.
- Each page needs a distinct, specific meta title and description.
- Do not repeat keywords unnaturally. Write for an automotive buyer first.
- Set `noIndex` only for a deliberate reason and verify it before publishing.
- Keep one clear page topic and preserve the established heading hierarchy.

## Safe fallback behavior

Until all CMS and R2 values are present, the public website serves approved repository content and `/admin` displays a setup notice. The CMS API returns `503` instead of connecting with placeholder credentials or writing uploads to temporary local storage. If a configured CMS read fails, collection pages serve their approved repository fallback and log the server error for investigation.

## After configuration

Run these checks before treating the CMS as ready:

```bash
npm run cms:generate-types
npm run cms:generate-importmap
npm run cms:seed
npm run lint
npm run build
```

Then create a temporary draft and published item for each major collection, upload/read/delete one disposable R2 image, verify a new slug renders server-side, confirm drafts remain private, and remove the temporary records.
