# Zenticsys Automotive Website — Project Brain

## 1. Purpose

This is a completely new website for Zenticsys in a new repository. It must not inherit the old repository's content, page structure, visual style, component composition, CMS content, or generic multi-industry positioning.

The website is a company, portfolio, and lead-generation website. It exists to demonstrate Zenticsys's automotive expertise and generate qualified project enquiries. It is not initially a SaaS product, marketplace, customer portal, or fleet application.

The niche is one industry—automotive—but the project range is broad:

- Car dealerships and dealer groups needing websites
- Fleet, rental, logistics, and transportation operators needing fleet systems
- Repair shops, workshops, detailing businesses, and service chains
- Parts retailers, distributors, wholesalers, and manufacturers
- Vehicle marketplaces and online buy/sell businesses
- Public auction and dealer auction companies
- Automotive businesses needing internal software or platform modernization

## 2. Positioning

Position Zenticsys as an automotive technology and digital solutions partner, not as a general software agency and not only as an automotive SaaS company.

Primary direction:

> Zenticsys builds automotive websites, digital platforms, and custom software for businesses that sell, service, manage, and move vehicles.

Alternative headline:

> We build the digital systems that keep automotive businesses moving.

The site must communicate both customer-facing work—dealership websites, service websites, and parts ecommerce—and complex operational products—CarVu, fleet systems, marketplaces, auctions, dealer dashboards, and super-admin panels.

CarVu is a major proof point. The team has experience building an enterprise automotive SaaS product involving online buy/sell, public and dealer auctions, complex role-based dealer dashboards, and a complex super-admin panel. CarVu proves engineering depth; it does not limit the types of projects Zenticsys accepts.

## 3. Creative reference and originality

The primary visual and interaction reference is YNA (Your Next Agency). The team wants the new site to follow that direction closely:

- Centered editorial composition
- Minimal header with logo, CTA, and menu trigger
- No traditional visible desktop navbar initially
- Centered expanding menu overlay
- Full-screen creative page introductions
- Large typography
- Dark canvas with changing blurred gradient light
- Image-led listing pages
- Large case cards with title overlays and one CTA
- Editorial Insights listing
- Multiple contact paths
- Proposal/onboarding flow
- Premium but practical agency feel

Use original Zenticsys copy, automotive images, product screenshots, logo, colors, and code. Do not use YNA's logo, images, wording, source code, or proprietary assets.

Supporting references:

- Tekion: enterprise automotive solution organization and platform credibility
- Dealerware: concise fleet/product value messaging
- AutoWeb Design: dealership website requirements and automotive conversion language
- Masterly Automotive: premium automotive UX and visual presentation

The result should feel like YNA's clarity and polish, but distinctly Zenticsys and automotive.

## 4. Brand and visual system

Existing Zenticsys brand colors:

```text
Primary       #EF3D23
Primary dark  #D62C14
Primary light #F25A42
Foreground    #2C2C2C
```

Recommended palette:

```text
Graphite      #111315
Dark surface  #1B1F22
Off-white     #F5F6F4
White         #FFFFFF
Text          #202326
Muted text    #6B7378
Brand orange  #EF3D23
Brand hover   #D62C14
```

Use orange-red as an accent, not as the fill of every section. Use graphite/black canvases, off-white content surfaces, white typography on dark areas, thin borders, restrained shadows, strong typography, generous whitespace, and medium or slightly sharp corners.

The site should feel premium, automotive-focused, enterprise-capable, practical, trustworthy, editorial, and high contrast. Avoid excessive pill-shaped cards, generic SaaS gradients, and admin-dashboard styling.

## 5. Automotive visual language and assets

Every page and section should carry an automotive touch without becoming a car advertisement. Mix automotive photography with software visuals.

Recurring motifs:

- Road lines and route paths
- Vehicle silhouettes
- Headlight and taillight reflections
- Telemetry points
- Fleet maps
- Inventory grids
- Workshop tools and service bays
- Auction activity
- Metallic, glass, carbon-fiber, and dark technical textures
- Data connection lines and status indicators
- Dashboard panels

Use original or properly licensed assets. Stock photography must follow one art direction: dark/high-contrast automotive imagery, graphite/metallic tones, warm controlled highlights, and compositions that leave room for white overlay text.

Preferred temporary/production stock sources are Unsplash, Pexels, and Pixabay, subject to checking individual licenses and third-party rights. Save source URL, creator, download date, and license reference for every external asset. Be especially careful with recognizable people, trademarks, logos, and vehicle brands.

Use stock assets for atmosphere and real product screenshots or annotated mockups for proof. Never imply stock imagery is a client result or a Zenticsys-built product.

## 6. Motion and page entrance

The signature page-load effect is like a light slowly turning on:

1. The page begins mostly black.
2. A blurred radial gradient slowly expands/brightens.
3. The headline and primary CTA reveal quickly.
4. Images/cards reveal with a subtle stagger.
5. The page settles into its normal state.

Suggested accent mapping:

```text
Solutions       orange-red / amber
Case studies    copper / warm red
Insights        petrol blue / green
About           steel blue / silver
Proposal        orange-red / graphite
```

Cards should inherit the page/section color through dark image assets, overlays, and blending/filter treatment. The effect is a color grade, not manual editing of every image.

Use CSS keyframes for basic reveals and Motion only for coordinated/interactive animation. Keep important content visible quickly, avoid layout shift/flashing/excessive parallax, and respect `prefers-reduced-motion`.

## 7. Navbar and menu

Use the YNA-inspired minimal navbar on desktop, tablet, and mobile. Do not initially show a traditional row of navigation links.

```text
[Zenticsys logo]                 [Schedule a Call] [Menu]
```

The Schedule a Call button is transparent/glassmorphic, not white-filled. It has a subtle translucent background, thin border, and a Zenticsys-themed running gradient border. “Running border” means a glowing gradient highlight travels continuously around the perimeter; it is not a pulse or static gradient. Use a rotating conic-gradient/mask or equivalent and a static reduced-motion fallback.

The opened menu is a dark centered overlay/panel. It has a close control, animated link reveal, scroll lock, Escape-to-close, focus management, and the same Schedule a Call CTA near the bottom.

Menu structure:

```text
Home
Solutions
Services
Case Studies
Insights
About
Contact

[Schedule a Call]
```

Links must be real server-rendered `<a href>` elements. A menu can be visually closed initially without harming SEO. Do not use click-only `div`s or client-only generated links.

Use “Solutions,” not “Industries.” Automotive business types may appear within Solutions or “Who We Help,” but do not create broad unrelated-industry pages.

## 8. Information architecture

Primary navigation:

```text
Solutions
Services
Case Studies
Insights
About
Schedule a Call / Request a Proposal
```

Recommended routes:

```text
/
/solutions
/solutions/dealership-websites
/solutions/fleet-management
/solutions/car-service-platforms
/solutions/automotive-parts-ecommerce
/solutions/vehicle-marketplaces
/solutions/auction-platforms
/solutions/custom-automotive-software
/services
/services/automotive-website-development
/services/custom-software-development
/services/ui-ux-design
/services/mobile-app-development
/services/integrations-and-maintenance
/case-studies
/case-studies/carvu
/insights
/insights/[slug]
/about
/request-a-proposal
/schedule-a-call
/contact
/privacy
/terms
```

The Solutions listing page uses a YNA-like gallery: a small number of large image-led cards, minimal text, and one CTA. Do not overload cards with stacks, labels, or long descriptions. The Insights listing follows the same editorial image-led approach. Detail pages are informative.

## 9. Homepage

Do not use the old left-text/right-image hero. Use a centered, full-screen opening scene.

```text
Dark graphite canvas
Animated automotive gradient light

Centered headline:
Automotive technology, built for the way business moves.

Supporting copy:
Websites, platforms, and software for modern automotive businesses.

[Request a Proposal] [Explore Solutions]

Large system visual with automotive UI, inventory, fleet, service,
auction, and admin signals appearing through motion.
```

Homepage sequence:

1. Creative centered hero
2. Automotive business-type gallery
3. “What We Build” solution gallery
4. Animated website → dealer/operations → admin/platform workflow
5. Featured CarVu case study
6. Automotive engineering capabilities
7. Trust/proof/testimonials/metrics where approved
8. Automotive Insights preview
9. Final proposal CTA

The homepage must explain both ordinary website projects and complex software projects.

## 10. Solutions and services

Solution detail pages must be informative, SEO-ready, and conversion-oriented.

Solution categories:

- Dealership Websites: inventory, search, leads, test drives, financing/trade-in, CRM, WhatsApp, SEO vehicle pages, mobile-first conversion.
- Fleet Management Systems: vehicles, drivers, GPS/telematics integrations, maintenance, fuel, compliance, documents, dashboards, reporting, roles.
- Car Service Platforms: appointments, customer/vehicle profiles, service history, work orders, technicians, parts/labor, invoices, reminders, multi-location support.
- Automotive Parts Ecommerce: compatibility lookup, VIN/model search, catalog, inventory, dealer pricing, checkout, shipping, ERP/inventory integrations.
- Vehicle Marketplaces: buyers/sellers, listings, search, offers, messaging, payments, moderation, dealer dashboards, admin controls.
- Auction Platforms: public/dealer auctions, timed/live bidding, lots, bid validation, rules, buyer/seller workflows, payments, notifications, administration.
- Custom Automotive Software: process discovery, internal tools, portals, legacy modernization, integrations, mobile apps, cloud, maintenance.

Each solution detail page generally includes hero/audience, problem, capabilities/features, workflows, product visuals, integrations, benefits, process, related case study, FAQs, and proposal CTA.

Services support solutions. Do not position generic development services as the main identity.

## 11. Case studies and Insights

The Case Studies listing is visually minimal/editorial: large image, large title overlay, little metadata, one CTA such as “See how we built it.”

The detail template includes hero, project facts, challenge, users/roles, workflows, solution, screenshots, technical depth, results, approved testimonial, related work, and proposal CTA. Use a centered hero, then left-aligned editorial content, two-column sections, full-width visuals, metrics, and optional sticky in-page navigation. Do not center the entire detail page.

The Insights listing is a YNA-inspired editorial image-led page. Topics include dealership website strategy, fleet software, service platforms, parts ecommerce, dealer dashboards, auction software, vehicle marketplace development, automotive SaaS, APIs/integrations, SEO, and legacy modernization.

Insight detail pages include title, author/date, structured headings, useful long-form content, images/diagrams, related posts, FAQs where appropriate, Article JSON-LD, and a relevant CTA.

## 12. Contact and conversion

Provide multiple contact paths:

- Request a Proposal — primary CTA
- Schedule a Call — secondary CTA
- Write a Message — low-commitment option
- Email
- Phone or WhatsApp

Do not add a live office clock or office-hours indicator to the menu/footer. It was considered but intentionally rejected as unnecessary for the initial site.

Request Proposal onboarding:

1. Project type
2. Business details
3. Requirements, users, integrations, and existing systems
4. Timeline and budget
5. Contact details and optional file/link

Use conditional questions and a progress indicator. Keep the experience conversational, not an intimidating long form. It may later generate an internal project brief.

Schedule a Call uses only Google Meet initially through Calendly:

```text
Schedule a Consultation
        ↓
Calendly: 30-minute Automotive Project Consultation
        ↓
Google Calendar availability
        ↓
Google Meet link and confirmation
```

Do not build Teams, Zoom, or a custom calendar engine initially. Calendly free is the preferred first implementation; it provides one event type and one calendar connection. Google Calendar appointment schedules are an alternative.

## 13. CMS and content model

The site must allow editors to add/update services, solutions, case studies, Insights, homepage sections, static page headings/descriptions, footer links, navigation, FAQs, testimonials, SEO metadata, and media.

Recommended CMS: Payload CMS. It is open-source, self-hostable, TypeScript-based, and can run inside Next.js. Its content model is new and automotive-focused; do not migrate old generic content.

Entities:

- `Page`: title, slug, SEO, ordered section blocks
- `Solution`: title, slug, audience, hero, problem, capabilities, workflows, visuals, FAQs, related cases, SEO
- `Service`: title, slug, scope, deliverables, process, related solutions, SEO
- `CaseStudy`: title, slug, client/product, summary, facts, challenge, roles, workflows, solution blocks, screenshots, technical notes, results, testimonial, SEO
- `Insight`: title, slug, excerpt, body, author, date, category, tags, cover image, related content, SEO
- `Media`: file, alt text, caption, credit/license/source
- `SiteSettings`: logo, brand, contact, social links, response promise
- `Navigation`, `Footer`, `FAQ`, `Testimonial`, `ReusableSection`

Use controlled reusable blocks. Editors control content; engineering controls available layouts so the visual system cannot be accidentally broken.

## 14. Hosting and infrastructure

```text
GitHub → Vercel
          ├── Next.js frontend
          ├── Payload CMS/admin
          └── server/API routes

MongoDB Atlas → CMS content/database
Cloudflare R2 → uploaded media
Calendly + Google Calendar + Google Meet → scheduling
```

Payload can deploy to Vercel. MongoDB Atlas remains external. Do not rely on Vercel's local filesystem for production uploads. Use Cloudflare R2 through Payload's R2/S3-compatible adapter.

The public site is a commercial Zenticsys business website. Vercel Hobby is useful for development/preview testing but should not be treated as the production plan for this site; use an appropriate commercial Vercel plan for launch. Vercel and R2 usage should have monitoring and budget alerts configured.

R2 Standard currently includes 10 GB-month storage, 1 million Class A operations, 10 million Class B operations, and free egress. Class A means writes/management such as upload, copy, list, and multipart operations. Class B means reads such as retrieving/checking an object. Deletes and aborting multipart uploads are free. The initial expectation is about 10,000 visitors/month; optimize images and monitor usage.

## 15. Rendering, SEO, accessibility, performance

Use Server Components by default. Client islands are allowed for menu open/close, forms, Calendly embed/modal, accordions, carousels, Motion choreography, and the running border where necessary.

All important copy, headings, links, images, solution content, case-study content, and Insights content must be in initial server-rendered HTML.

SEO requirements:

- Unique page-level metadata
- Canonical URLs
- Open Graph and Twitter metadata
- `sitemap.ts` and `robots.ts`
- Organization, Service, Article, FAQ, and Breadcrumb JSON-LD where appropriate
- One clear H1 and logical H2/H3 structure
- Descriptive image alt text
- Crawlable internal links
- Stable layout and fast loading
- No important content behind client-only fetching

The closed menu is acceptable for SEO when links are real anchors in server-rendered markup. The gradient/entrance animation is acceptable when it does not delay or remove content.

Accessibility requirements include keyboard menu operation, visible focus, semantic buttons/links, `aria-expanded`, `aria-controls`, focus trap/return, Escape-to-close, reduced motion, sufficient contrast, labelled forms, useful alt text, and no color-only communication.

## 16. Stack and component strategy

Base stack:

```text
Next.js 16.3.5
React 19
TypeScript
Tailwind CSS v4
App Router
ESLint
Turbopack
```

UI stack:

- shadcn/ui for customizable base components
- Radix UI primitives for accessible behavior
- Motion for selective animation
- Lucide React for icons

Do not install a large pre-styled library that makes the site look like a generic admin dashboard. Add only needed shadcn components, then build custom automotive marketing components.

Custom component families include `SiteHeader`, `MenuOverlay`, `ScheduleCallButton`, `RunningGradientBorder`, `PageAtmosphere`, `AutomotiveHero`, `SolutionGallery`, `CaseStudyGallery`, `InsightGallery`, `DashboardPreview`, `WorkflowStory`, `CapabilityGrid`, `MetricStrip`, `ProcessTimeline`, `ProposalForm`, `ScheduleCallEmbed`, and `SiteFooter`.

## 17. Target folder structure

```text
zenticsys-automotive/
├── docs/
│   ├── PROJECT-BRAIN.md
│   ├── AI-VIBE-CODING.md
│   └── phases/
├── public/
│   ├── brand/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── solutions/
│   │   ├── services/
│   │   ├── case-studies/
│   │   ├── insights/
│   │   ├── about/
│   │   ├── request-a-proposal/
│   │   ├── schedule-a-call/
│   │   ├── contact/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── marketing/
│   │   ├── automotive/
│   │   ├── forms/
│   │   └── ui/
│   ├── content/
│   ├── lib/
│   │   ├── seo/
│   │   ├── cms/
│   │   ├── media/
│   │   └── scheduling/
│   └── styles/
├── payload.config.ts
├── next.config.ts
├── package.json
└── .env.example
```

## 18. Non-goals for first release

Do not build customer login, marketplace business logic, live auctions, telemetry processing, payments, multiple video providers, AI proposal assistant, full CRM, complex custom analytics, or generic multi-industry pages before the marketing site is validated.

## 19. Definition of success

The site succeeds when a visitor understands that Zenticsys is automotive-focused, builds both websites and complex systems, has credible CarVu/enterprise experience, provides clear paths for each automotive customer type, offers proposal/call/message contact paths, supports editor-managed content, and delivers fast, structured, server-rendered pages.
