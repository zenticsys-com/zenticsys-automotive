# Phase 00 Design Direction

## Reference model

Use YNA as the primary visual/interaction reference:

- Centered composition
- Minimal fixed header
- Menu-triggered navigation instead of visible desktop links
- Centered dark overlay menu
- Full-screen page introductions
- Large editorial typography
- Image-led listing pages
- Large title-over-image cards
- Sparse card metadata
- Rich detail pages after click-through
- Multiple contact options
- Subtle but memorable motion

Use Tekion, Dealerware, AutoWeb Design, and Masterly only for automotive content, enterprise credibility, fleet messaging, dealership requirements, and premium automotive UX inspiration.

## Header

```text
[Zenticsys logo]                 [Schedule a Call] [Menu]
```

The header remains minimal on desktop, tablet, and mobile. The Schedule a Call button is transparent/glassmorphic rather than white-filled.

## Menu overlay

The menu opens as a centered dark panel/overlay aligned with the header composition. It reveals links with a short fade/slide and includes the same Schedule a Call CTA near the bottom.

The overlay must support close button, Escape, focus management, scroll lock, reduced motion, and real crawlable anchors.

## Running CTA border

The Schedule a Call button has a thin translucent base border and a moving, glowing Zenticsys gradient highlight that travels around the perimeter. It must not look like a pulsing border.

Use orange-red `#EF3D23`, dark red `#D62C14`, light orange `#F25A42`, and optional amber as the gradient colors. Use a static border when reduced motion is enabled.

## Page atmosphere

The background is primarily graphite/black with a soft, blurred color pool that changes by page or section. The gradient should feel like automotive light/reflection, not a random colorful effect.

```text
Solutions       orange-red / amber
Case studies    copper / warm red
Insights        petrol blue / green
About           steel blue / silver
Proposal        orange-red / graphite
```

## Page entrance

On refresh:

1. Black/graphite base appears.
2. Gradient light slowly expands, like a light turning on.
3. Core headline and CTA appear quickly.
4. Cards/images reveal with subtle stagger.
5. Page settles into normal interaction.

Do not delay meaningful content, create layout shift, or require a client-only fetch. Provide a reduced-motion version.

## Homepage composition

Do not use a conventional left-copy/right-image hero. Use a centered hero with an automotive system visual below/behind the headline.

The system visual may combine original automotive photography with UI panels representing inventory, fleet, service, auction, dealer, and admin workflows.

## Listing composition

Solutions, Case Studies, and Insights should use large visual cards with minimal text:

- Image or product visual
- Small category/identity label where useful
- Large title
- One clear CTA

Do not put technology stacks, excessive labels, long descriptions, or dense metadata on listing cards.

## Detail composition

Detail pages are informative. Use centered visual hero sections followed by readable left-aligned editorial content, two-column sections, full-width screenshots, workflow diagrams, metrics, and related CTAs.

## Color and typography

```text
Graphite      #111315
Dark surface  #1B1F22
Off-white     #F5F6F4
White         #FFFFFF
Text          #202326
Muted text    #6B7378
Primary       #EF3D23
Primary dark  #D62C14
Primary light #F25A42
```

Use strong modern typography, generous whitespace, short headline line lengths, readable body text, thin borders, restrained shadows, and medium/slightly sharp corners.

## Automotive visual rules

Every page should include at least one automotive signal through photography, product UI, workflow, language, or visual motif. Prefer systems and workflows over generic car decoration.

Use road lines, maps, telemetry, inventory, service bays, parts, auction activity, dashboards, vehicle silhouettes, and headlight/taillight light trails as recurring motifs.
