# Phase 01 — Application Foundation

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

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Prepare only the clean
application foundation. Do not build the automotive UI or content yet. Keep the
starter route functional, avoid CMS and scheduling integrations, and verify lint
and build before finishing.
```
