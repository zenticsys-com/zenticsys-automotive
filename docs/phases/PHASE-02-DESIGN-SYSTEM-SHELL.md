# Phase 02 — Design System and Shared Shell

**Status:** Complete.

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

## Implementation record

- Expanded the graphite, off-white, white, muted, border, brand, spacing,
  container, reading-width, radius, focus, and reduced-motion tokens.
- Kept Geist Sans and Geist Mono as the self-hosted project typography.
- Reused the owned light Zenticsys wordmark from the original repository; no old
  layout, component, page, or generic content was copied.
- Added the centered glass header with the logo, compact Schedule a Call CTA,
  and menu trigger at every viewport size.
- Added a conic-gradient/masked border highlight that travels around the CTA
  perimeter, with a static gradient fallback for reduced motion.
- Added the centered dark menu panel with real anchors, staggered reveal, focus
  containment, Escape and outside dismissal, scroll lock, close control, and
  trigger focus return.
- Kept closed-menu links mounted in initial HTML but visually hidden and inert,
  preserving crawlability without exposing them to keyboard users.
- Added reusable atmosphere variants for brand, solutions, case studies,
  insights, about, and proposal pages.
- Added the black-to-gradient “light turning on” entrance and an automotive
  route-line motif using CSS only.
- Added a responsive footer with primary navigation, project paths, email,
  LinkedIn, legal links, and proposal CTA. No office clock was added.
- Added a temporary shell preview route; Phase 03 will replace it with the full
  homepage composition.
- Added Playwright browser checks for the four required viewport widths,
  keyboard behavior, crawlable HTML, horizontal overflow, and reduced motion.

## Dependencies added

- `@radix-ui/react-focus-scope`
- `@radix-ui/react-dismissable-layer`
- `react-remove-scroll`
- `lucide-react`
- `@playwright/test` as a development dependency

No shadcn component was needed for this custom shell, and Motion was not added
because the current effects are more efficiently expressed in CSS.

## Verification record

- `npm run lint`: passed
- `npm run build`: passed
- `npm run test:e2e`: 12 tests passed
- Tested widths: 320px, 768px, 1024px, and 1440px
- Verified keyboard activation, focus containment, Escape close, and focus return
- Verified reduced-motion animation durations and static border treatment
- Verified primary navigation links in the initial server HTML
- Verified no horizontal document overflow at the tested widths
- Visually inspected closed and open menu states at desktop and mobile widths

## External configuration

This phase introduced no external service, account, secret, or environment
variable. The Schedule a Call links point to the internal route that will be
implemented and connected to Calendly in Phase 06.

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Build only the shared
visual shell. Use the YNA-inspired minimal header and centered menu overlay with
original Zenticsys branding. Implement the glass Schedule a Call button and its
running perimeter gradient highlight. Keep content server-rendered and test
accessibility, reduced motion, lint, and build.
```
