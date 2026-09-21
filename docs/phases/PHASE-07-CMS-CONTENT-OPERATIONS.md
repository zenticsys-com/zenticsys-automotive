# Phase 07 — CMS, Media, and Content Operations

## Status

Implementation complete with repository-content fallback. Live MongoDB Atlas, Payload authentication, draft/publish, and R2 upload/read/delete verification remains pending until the owner supplies the documented environment values.

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

## Implemented

- Payload 3 is integrated into the existing Next.js application at `/admin`, with its REST API isolated at `/cms-api`.
- MongoDB is connected through Payload's MongoDB adapter when `DATABASE_URI` is present.
- Cloudflare R2 uses Payload's S3-compatible storage adapter with local production storage disabled.
- Collections cover solutions, services, case studies, Insights, controlled pages, FAQs, testimonials, users, and media.
- Globals cover homepage copy, navigation, footer content, contact/site settings, and SEO defaults.
- Public catalogue and editorial routes query published CMS records on the server and retain approved static fallbacks.
- New CMS detail slugs use dynamic server rendering; known approved routes remain statically generated.
- Draft visibility is protected by collection access rules and public queries use `overrideAccess: false` with `draft: false`.
- A controlled root page route renders only the approved page blocks.
- The seed script imports only the approved automotive content in this repository and is idempotent by slug.
- [`../CMS-EDITOR-GUIDE.md`](../CMS-EDITOR-GUIDE.md) documents editorial, media-rights, publishing, and verification procedures.

## Configuration gate

Payload admin and API access require every Payload, MongoDB, and R2 variable. Without them, `/admin` displays an honest setup message, `/cms-api` returns `503`, and the public site keeps rendering approved fallback content. This intentionally prevents accidental use of placeholder database credentials or Vercel-local media storage.

## Verification completed without external credentials

- Payload schema type generation
- Payload admin import-map generation
- ESLint
- TypeScript type checking
- Next.js production build
- Fallback/admin-gate browser tests

The R2 and database checks in the original test list are explicitly deferred until external resources exist; they cannot be truthfully verified against placeholders.

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
