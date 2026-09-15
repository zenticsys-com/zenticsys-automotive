# AI Vibe-Coding Rules

Read `docs/PROJECT-BRAIN.md` and the active phase file before making changes.

## Design rules

- Follow the YNA-inspired centered editorial experience closely.
- Use original Zenticsys automotive copy, assets, and implementation.
- Do not copy YNA logos, images, wording, source code, or proprietary assets.
- Do not reuse the old Zenticsys UI, layout, colors, content, or generic industry messaging.
- Keep the minimal logo + glass Schedule a Call + Menu header.
- Keep the centered expanding menu overlay.
- Make the running border a moving perimeter highlight, not a pulse.
- Use graphite, off-white, and Zenticsys orange-red.
- Make every page and section recognizably automotive.
- Keep listing cards minimal; put detail on detail pages.
- Do not center-align all long-form content.

## Engineering rules

- Use Server Components by default.
- Add `use client` only for genuine interaction or animation.
- Use real `<a href>` links for navigation.
- Keep important content in initial server-rendered HTML.
- Do not add CMS until its phase.
- Do not add calendar API logic when Calendly is selected.
- Keep secrets in environment variables and update `.env.example`.
- Do not use local filesystem storage for production CMS uploads.
- Use R2 for production media through the agreed adapter.
- Optimize images and use meaningful alt text.

## Implementation loop

1. State scope and assumptions.
2. Implement the smallest complete slice.
3. Run lint.
4. Run production build.
5. Test desktop, tablet, and mobile.
6. Test keyboard and reduced motion for interactive work.
7. Check server/client boundaries.
8. Report changed files, commands, and remaining risks.

## Prompt template

```text
Read docs/PROJECT-BRAIN.md, docs/AI-VIBE-CODING.md, and the active phase file first.

Implement only the scope in the active phase. Do not add unrelated features.
Use the YNA-inspired centered editorial interaction model, but use original
Zenticsys automotive copy, assets, colors, and implementation. Do not reuse the
old project's UI or content.

Keep server rendering and SEO intact. Use client components only where required.
After implementation, run lint and production build, then report the results.
```

## Completion standard

A phase is complete only when its acceptance criteria pass, the visual direction is preserved, responsive/accessibility behavior works, SEO/rendering is verified where relevant, `npm run lint` passes, and `npm run build` passes.
