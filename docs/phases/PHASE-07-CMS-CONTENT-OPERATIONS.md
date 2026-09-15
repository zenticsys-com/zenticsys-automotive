# Phase 07 — CMS, Media, and Content Operations

## Goal

Make the website editable without code while preserving the approved visual system.

Before implementation, follow [`../ENVIRONMENT-SETUP.md`](../ENVIRONMENT-SETUP.md) for Payload, MongoDB Atlas, Cloudflare R2, Vercel environment variables, and secret handling.

## Work

- Add Payload CMS to the Next.js application.
- Configure MongoDB Atlas connection.
- Configure Payload admin/authentication securely.
- Define new automotive collections and globals from the project brain.
- Add reusable, controlled page section blocks.
- Add drafts/publishing and access control.
- Configure Cloudflare R2 for permanent media storage.
- Add image alt text, captions, source/license fields.
- Connect server-side frontend queries.
- Add caching/revalidation strategy.
- Seed only approved new automotive content.
- Add editor documentation.

## Acceptance criteria

- Editors can create/update services, solutions, case studies, Insights, pages, FAQs, navigation, footer, and SEO fields.
- Homepage section copy can be changed in the CMS.
- Media uploads do not use ephemeral local production storage.
- R2 media URLs render correctly.
- Published content is server-rendered.
- Draft content is not publicly exposed accidentally.
- CMS blocks cannot create visually broken arbitrary layouts.

## Test

- Create and publish a test solution, case study, Insight, page section, navigation link, footer link, and media item.
- Edit and republish each item.
- Test missing media and optional fields.
- Verify R2 upload/read/delete behavior.
- Test production build with and without CMS data according to the chosen fallback policy.

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Add Payload CMS with a
new automotive content model, MongoDB Atlas, and Cloudflare R2 media storage.
Do not migrate old generic content or recreate the old CMS schema. Keep the
approved visual system controlled by code while allowing editors to update
content. Test drafts, publishing, uploads, server rendering, lint, and build.
```
