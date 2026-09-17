# Phase 01 — Application Foundation

**Status:** Complete.

## Goal

Prepare the clean Next.js repository for the website without building page features.

## Work

- Confirm Next.js App Router, TypeScript, Tailwind, ESLint, and Turbopack setup.
- Establish `src/app`, `src/components`, `src/lib`, `src/content`, and `public` structure.
- Add `.env.example` with documented placeholders only.
- Add shared metadata base and site URL handling.
- Add base font decision and global CSS token structure.
- Add required external image-host configuration.
- Add lightweight error/not-found/loading strategy.
- Do not add Payload, MongoDB, R2, Calendly, or application pages yet except for a foundation smoke test.

## Acceptance criteria

- Starter route works.
- `npm run lint` passes.
- `npm run build` passes.
- No secrets are committed.
- No dependency on the old repository exists.
- Server/client boundaries are documented.

## Test

```bash
npm run lint
npm run build
```

Open the app at desktop and mobile widths and confirm no console errors.

## Implementation record

- Retained the clean Next.js App Router, TypeScript, Tailwind CSS v4, ESLint,
  and Turbopack scaffold.
- Established the planned source, component, library, content, style, and public
  asset directories without adding feature implementations.
- Added a committed `.env.example` contract while keeping real `.env*` files
  ignored.
- Added shared site metadata, canonical URL handling, and Open Graph/Twitter
  defaults.
- Kept Geist Sans/Mono as the temporary foundation font pair. Final typography
  remains a deliberate Phase 02 decision.
- Added brand color, layout, focus, selection, and reduced-motion CSS tokens.
- Restricted remote image optimization to the approved stock hosts and the
  configured R2 public origin.
- Added lightweight loading, not-found, and recoverable error states.
- Documented Server and Client Component boundaries in
  `docs/foundation/SERVER-CLIENT-BOUNDARIES.md`.

No Payload, MongoDB, R2 adapter, Calendly integration, application pages, or
final automotive visual components were added in this phase.

## Verification record

- `npm run lint`: passed
- `npm run build`: passed with Next.js 16.3.5 and Turbopack
- `/`: statically prerendered and returned `200 OK`
- Homepage HTML: included the H1, title, description, and canonical URL without
  requiring client-side rendering
- Unknown route: returned `404 Not Found` with Next.js `noindex` metadata
- Client boundary audit: only `src/app/error.tsx` uses `"use client"`, as required
  by the framework
- `git diff --check`: passed

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Prepare only the clean
application foundation. Do not build the automotive UI or content yet. Keep the
starter route functional, avoid CMS and scheduling integrations, and verify lint
and build before finishing.
```
