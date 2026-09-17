# Phase 03.1 — Motion and Atmosphere Refinement

**Status:** Complete.

## Goal

Add the premium motion layer requested after the homepage review while keeping
all indexable content server-rendered, accessible, and usable without animation.

## Scope

- Make the fixed page atmosphere transition between section-specific automotive
  palettes as the reader moves through a page.
- Expose a reusable `data-atmosphere` section contract for all future pages.
- Add restrained viewport reveals to homepage sections with Motion for React.
- Keep copy visible in server HTML and when JavaScript is unavailable.
- Add an original decorative SVG morph around the hero headline while retaining
  the real HTML `h1` as the only semantic headline.
- Replace the basic menu fade/scale with coordinated glass-panel choreography:
  backdrop depth, expansion from the header control area, border-radius change,
  staggered navigation, supporting-content timing, and a deliberate reverse
  close sequence.
- Preserve focus trapping, Escape, outside dismissal, scroll lock, and focus
  return until the close sequence completes.
- Correct the Schedule a Call perimeter animation so its Zenticsys gradient
  highlight is visibly travelling around the edge in the header and open menu.
- Keep a static gradient border and simplified state transitions under
  `prefers-reduced-motion`.
- Add Next.js's `data-scroll-behavior="smooth"` root marker for the intentional
  global smooth-scroll rule.
- Do not suppress hydration warnings globally. Browser-extension DOM mutations
  are not an application defect and must not hide genuine hydration failures.

## SEO and rendering rules

- Page copy, links, headings, metadata, and structured data remain Server
  Component output in the initial response.
- Client components may wrap server-rendered children but must not fetch or
  inject marketing content.
- Reveal components render visible HTML on the server. They may progressively
  prepare below-the-fold content after hydration, then animate it once.
- The morphing SVG is `aria-hidden` and decorative; it never replaces the H1.
- Navigation remains discoverable through server-rendered global links even
  while the interactive menu panel is closed.
- Motion must use transform/opacity where practical and introduce no layout
  shift.

## Motion direction

### Section atmosphere

- Keep the light fixed behind the page.
- Transition slowly between orange-red, amber, petrol blue, deep red, steel,
  and teal according to the active section.
- Add subtle ambient drift so the light feels alive rather than like a static
  radial gradient.
- Avoid rapid color cycling or effects that compete with the content.

### Homepage content

- Use small vertical movement, slight blur resolution, and restrained timing.
- Animate sections once as they approach the viewport.
- Do not animate every sentence or create long delays between content blocks.

### Hero SVG

- Morph an automotive route/data line into a simplified vehicle contour and
  back.
- Keep contrast low and position the artwork behind the headline.
- Pause/simplify under reduced motion.

### Navigation

- Expand the menu panel from the menu-control region into the centered glass
  panel.
- Develop backdrop blur and page depth together with the panel.
- Stagger primary links, then reveal project actions and footer details.
- Reverse the sequence on close instead of removing the menu instantly.

### Schedule a Call border

- Use a visible 1–2px perimeter track.
- Move a short orange-red → amber → petrol highlight around the full edge.
- Keep the button surface and text above the animated ring.
- Avoid a full-button pulse or continuously rotating content.

## Acceptance criteria

- Atmosphere color visibly changes as homepage sections cross the viewport and
  remains fixed behind the whole page.
- The same atmosphere contract can be used by later route sections.
- Homepage copy is present in initial HTML and is readable with JavaScript off.
- Hero SVG motion does not replace or duplicate the semantic H1.
- Menu opening and closing both have coordinated modern choreography.
- Menu keyboard behavior from Phase 02 still passes.
- Schedule Call perimeter movement is clearly visible in both required places.
- Reduced-motion mode removes nonessential movement without breaking states.
- No hydration warnings are introduced by application code.
- No horizontal overflow or material layout shift is introduced.
- Lint, production build, and browser tests pass at all four standard widths.

## Test plan

- Inspect initial HTML for homepage copy and navigation anchors.
- Test atmosphere state changes after scrolling to representative sections.
- Test menu opening, closing, Escape, outside dismissal, focus containment, and
  focus return after exit completion.
- Assert open and closed menu animation states.
- Confirm the running border has an active animation and becomes effectively
  static under reduced motion.
- Confirm the decorative SVG is hidden from accessibility APIs and the page has
  one H1.
- Test 320px, 768px, 1024px, and 1440px widths.
- Run lint, production build, and the complete Playwright suite.

## External configuration

None. This is an application-only visual and interaction phase.

## Implementation record

- Added Motion for React `13.4.0` as the focused animation dependency.
- Converted the global atmosphere into a small route-aware client island that
  observes reusable `data-atmosphere` section markers. It changes only visual
  CSS custom properties; it does not own or render page content.
- Added registered color properties and a slow ambient drift so palette changes
  interpolate instead of snapping. Homepage section surfaces are translucent
  enough for the fixed light to remain present behind the complete page.
- Assigned brand, amber, petrol, ember, steel, and teal palettes across the
  homepage narrative.
- Added a progressive Motion reveal wrapper. Its server output remains visible;
  only below-the-fold content is prepared after hydration and animated once as
  it approaches the viewport.
- Added an `aria-hidden` Motion SVG that morphs a route/data line into a simple
  vehicle contour behind the hero. The original HTML H1 remains unchanged.
- Rebuilt the menu with Motion variants and exit presence: panel expansion from
  the header-control region, changing radius/blur/scale, backdrop development,
  timed link/action/footer reveals, two-line menu-to-close icon movement, and a
  reverse close sequence.
- Retained Radix dismissal/focus containment, Escape handling, outside click,
  scroll lock, and trigger focus return after the exit completes.
- Rebuilt the Schedule Call ring layers so the rotating conic highlight sits
  above the surface and below the content. The highlight now visibly travels
  through petrol, Zenticsys red, and amber around both buttons.
- Added the Next.js smooth-scroll declaration to the root HTML element.
- Added no hydration-warning suppression. Browser automation reports no
  application-generated hydration mismatch.

## Server/client boundary record

- Homepage pages, sections, copy, links, metadata, and JSON-LD remain Server
  Component output.
- Client boundaries are limited to `PageAtmosphere`, `MotionReveal`,
  `HeroRouteMorph`, and the already interactive `MenuOverlay`.
- No client component fetches, duplicates, or conditionally creates indexable
  content.

## Verification record

- `npm run lint`: passed
- `npm run build`: passed; `/` remains statically prerendered
- `npm run test:e2e`: 52 tests passed
- Tested widths: 320px, 768px, 1024px, and 1440px
- Verified brand → amber → teal atmosphere state changes while scrolling
- Verified the border animation changes frames and occupies the correct layer
- Verified the hero has one H1 and the morph SVG is decorative
- Verified the menu remains mounted during reverse close and returns focus after
  exit completion
- Retained all Phase 02 keyboard, focus-containment, Escape, overflow, and
  reduced-motion checks
- Verified motion-enhanced copy is visible in initial HTML
- Verified no application hydration warnings in an extension-free browser
- Visually inspected hero, atmosphere, border, opening menu, settled menu, and
  mobile menu states

## AI task prompt

```text
Read the project brain, AI rules, and Phase 03.1. Implement only the reusable
motion and atmosphere refinement. Keep all SEO content server-rendered. Use
Motion for focused client animation islands, preserve menu accessibility, add
reduced-motion behavior, and verify both open and reverse-close sequences. Do
not add CMS, scheduling, forms, or external configuration.
```
