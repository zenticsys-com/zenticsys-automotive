# AI Vibe-Coding Rules

Read `docs/PROJECT-BRAIN.md` and the active phase file before making changes.

## External configuration workflow

Use a two-stage workflow so the AI does not guess the final configuration contract before the integration exists.

### Stage 1 — Brief preflight before coding

Before implementation, the AI should state:

- Which external service the phase is expected to use
- Whether an account or resource will probably be needed
- Whether the feature can be developed with a mock/placeholder first
- What could block implementation or testing

This is a planning notice, not the final environment-variable checklist.

### Stage 2 — Exact configuration after the integration is written

After implementing the integration, the AI must inspect the code it actually wrote and then tell the owner:

- Which portal to open
- Which account, project, bucket, event, or resource to create
- Which IDs, URLs, tokens, or credentials are required
- The exact environment-variable names used by the code
- Whether each value is public or secret
- Whether the value belongs in local development, Vercel Preview, or Vercel Production
- How to add each value
- How to verify the configuration

The AI may implement UI shells, typed interfaces, mocks, and integration scaffolding before credentials are available. It must not claim the integration is complete until real configuration and verification succeed.

This workflow applies to Payload, MongoDB Atlas, Cloudflare R2, Vercel, Calendly, Google Calendar/Google Meet, email delivery, analytics, and any future third-party service.

Expected order:

```text
Brief phase preflight
→ AI implements the integration or a testable scaffold
→ AI inspects the actual code/config contract
→ AI gives exact portal and environment instructions
→ Owner creates/configures the external resource
→ Owner adds values to local/Vercel environments
→ AI verifies locally and in Preview
→ Production configuration and deployment test
```

For purely visual or static work, the AI should proceed without waiting for external configuration.

## Design rules

- Follow the YNA-inspired centered editorial experience closely.
- Use original Zenticsys automotive copy, assets, and implementation.
- Do not copy YNA logos, images, wording, source code, or proprietary assets.
- Do not reuse the old Zenticsys UI, layout, colors, content, or generic industry messaging.
- Keep the minimal logo + glass Schedule a Call + Menu header.
- Keep the centered expanding menu overlay.
- Make the running border a moving perimeter highlight, not a pulse.
- Use section-level `data-atmosphere` markers so the fixed global light can
  transition with the content.
- Keep animated marketing copy in initial server HTML; motion is progressive
  enhancement, never the content delivery mechanism.
- Keep decorative hero SVG animation separate from semantic heading text.
- Menu transitions must animate both entry and exit while preserving focus and
  reduced-motion behavior.
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
