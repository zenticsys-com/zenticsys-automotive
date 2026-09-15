# Phase 02 — Design System and Shared Shell

## Goal

Build the visual foundation: tokens, typography, layout primitives, header, centered overlay menu, footer, gradient atmosphere, and CTA behavior.

## Work

- Configure graphite, off-white, white, muted text, and Zenticsys orange-red tokens.
- Add responsive container and editorial spacing primitives.
- Add shadcn/ui components only as needed.
- Add Radix-based accessible menu behavior.
- Build minimal header: logo, glass Schedule a Call button, menu trigger.
- Reuse the Zenticsys logo asset from the original repository only as a brand asset after confirming the correct file and ownership.
- Build centered menu overlay with real links, close behavior, focus management, Escape handling, and scroll lock.
- Build the running gradient border as a moving highlight around the Schedule a Call button.
- Build page gradient atmosphere and entrance reveal.
- Add reduced-motion behavior.
- Build footer with navigation, contact paths, legal links, and CTA.

## Acceptance criteria

- Header is minimal on desktop, tablet, and mobile.
- Links are real anchors and accessible while the menu is open.
- CTA is transparent/glassmorphic, not white-filled.
- Border highlight travels around the perimeter and does not merely pulse.
- Menu is centered and integrated with the header.
- Gradient reveal feels like a light slowly turning on.
- Content is not delayed by animation.
- Keyboard and reduced-motion behavior pass.

## Test

- Test keyboard-only menu operation.
- Test Escape and focus return.
- Test at 320px, 768px, 1024px, and wide desktop widths.
- Test with reduced motion enabled.
- Run lint/build and inspect initial HTML for anchor links.

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Build only the shared
visual shell. Use the YNA-inspired minimal header and centered menu overlay with
original Zenticsys branding. Implement the glass Schedule a Call button and its
running perimeter gradient highlight. Keep content server-rendered and test
accessibility, reduced motion, lint, and build.
```
