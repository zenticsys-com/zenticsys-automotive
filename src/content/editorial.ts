export type CaseStudyEntry = {
  readonly slug: string;
  readonly title: string;
  readonly listingTitle: string;
  readonly kicker: string;
  readonly summary: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imagePosition: string;
  readonly facts: readonly { readonly label: string; readonly value: string }[];
  readonly roles: readonly { readonly title: string; readonly description: string }[];
  readonly workflows: readonly { readonly title: string; readonly description: string }[];
  readonly capabilities: readonly { readonly title: string; readonly description: string }[];
  readonly technicalNotes: readonly { readonly title: string; readonly description: string }[];
  readonly proof: readonly { readonly title: string; readonly description: string }[];
  readonly seo?: { readonly metaTitle?: string | null; readonly metaDescription?: string | null; readonly socialImage?: string | null; readonly noIndex?: boolean | null };
};

export type InsightSection = {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly points?: readonly string[];
};

export type InsightEntry = {
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly excerpt: string;
  readonly category: string;
  readonly author: string;
  readonly publishedAt: string;
  readonly displayDate: string;
  readonly readingTime: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imagePosition: string;
  readonly introduction: readonly string[];
  readonly sections: readonly InsightSection[];
  readonly takeaways: readonly string[];
  readonly relatedSlugs: readonly string[];
  readonly seo?: { readonly metaTitle?: string | null; readonly metaDescription?: string | null; readonly socialImage?: string | null; readonly noIndex?: boolean | null };
};

export const caseStudies: readonly CaseStudyEntry[] = [
  {
    slug: "carvu",
    title: "A connected automotive SaaS product for trading, auctions, and dealer operations.",
    listingTitle: "CarVu: one product across complex automotive workflows",
    kicker: "Enterprise automotive product experience",
    summary:
      "CarVu brought online vehicle buying and selling, public and dealer auctions, role-based dealer workflows, and platform administration into one connected product landscape.",
    image: "/images/case-carvu-auction.jpg",
    imageAlt: "Vehicle moving through a live automotive auction hall",
    imagePosition: "center 48%",
    facts: [
      { label: "Product", value: "Enterprise automotive SaaS" },
      { label: "Operating model", value: "Multi-role platform" },
      { label: "Core workflows", value: "Trading, auctions, dealer operations" },
      { label: "Platform control", value: "Complex super administration" },
    ],
    roles: [
      {
        title: "Vehicle buyers and sellers",
        description:
          "Customer-facing journeys for discovering, presenting, buying, and selling vehicles online.",
      },
      {
        title: "Dealer teams",
        description:
          "Role-based operational access for teams handling vehicles, activity, auctions, and day-to-day decisions.",
      },
      {
        title: "Auction participants",
        description:
          "Distinct public and dealer auction experiences shaped around eligibility, lots, bids, and outcomes.",
      },
      {
        title: "Platform administrators",
        description:
          "Central control over the wider SaaS environment, its users, permissions, workflows, and governance.",
      },
    ],
    workflows: [
      {
        title: "Vehicle enters the platform",
        description:
          "Vehicle information becomes a reusable record for marketplace, dealer, and auction activity.",
      },
      {
        title: "The right route is selected",
        description:
          "Buying, selling, public auction, and dealer-only auction journeys follow their own rules and participants.",
      },
      {
        title: "Teams manage the operation",
        description:
          "Dealer users work through role-aware dashboards instead of sharing one unrestricted operational view.",
      },
      {
        title: "Administration governs the SaaS",
        description:
          "Super-admin tools provide the control required to operate a complex platform above individual users and dealers.",
      },
    ],
    capabilities: [
      {
        title: "Online vehicle buying and selling",
        description:
          "Connected customer journeys that treat vehicle discovery and transactions as part of a wider product workflow.",
      },
      {
        title: "Public and dealer auctions",
        description:
          "Separate auction contexts for different audiences, access rules, bidding behavior, and operational oversight.",
      },
      {
        title: "Role-based dealer dashboards",
        description:
          "Complex permissions and working views shaped around what each dealer role needs to see and do.",
      },
      {
        title: "Super-admin platform control",
        description:
          "A higher-level administrative experience for managing the SaaS product and its operational structure.",
      },
    ],
    technicalNotes: [
      {
        title: "Roles are product architecture",
        description:
          "Permissions affect navigation, data visibility, allowed actions, and ownership. They must be modelled as part of the product—not attached at the end.",
      },
      {
        title: "Auction state must stay explicit",
        description:
          "Lots, participation, bids, timing, and outcomes create state transitions that need clear rules and auditable behavior.",
      },
      {
        title: "One vehicle record serves many contexts",
        description:
          "Marketplace, dealer, and auction experiences depend on consistent vehicle information while exposing different actions to different users.",
      },
      {
        title: "Administration is its own product surface",
        description:
          "Operating a SaaS platform requires workflows for governance and support—not simply a larger version of the dealer dashboard.",
      },
    ],
    proof: [
      {
        title: "Connected-workflow thinking",
        description:
          "Experience spanning the public product, dealer operation, auction mechanics, and platform-level control.",
      },
      {
        title: "Multi-role product depth",
        description:
          "A practical understanding of how responsibilities and permissions reshape the interface and the underlying system.",
      },
      {
        title: "Automotive domain fluency",
        description:
          "Product decisions grounded in vehicles, trading, auctions, dealers, and the teams operating behind the customer journey.",
      },
    ],
  },
] as const;

export const insights: readonly InsightEntry[] = [
  {
    slug: "modern-dealership-website-beyond-listings",
    title: "What a modern dealership website needs beyond vehicle listings",
    shortTitle: "A dealership website must do more than display stock.",
    excerpt:
      "Inventory is the starting point. A useful dealership website connects vehicle discovery, buyer intent, lead handling, trust, and daily dealership operations.",
    category: "Dealership digital",
    author: "Zenticsys",
    publishedAt: "2026-09-04",
    displayDate: "4 September 2026",
    readingTime: "8 min read",
    image: "/images/insight-dealership-digital.jpg",
    imageAlt: "Customer and dealership representative reviewing vehicle information on a phone",
    imagePosition: "center 42%",
    introduction: [
      "A vehicle grid is necessary, but it is not the whole dealership experience. Buyers arrive with different levels of intent: some are comparing, some need confidence in one vehicle, and others are ready to book a test drive, discuss a trade-in, or ask about finance.",
      "The website should help each person move forward while giving the dealership a reliable operational trail. That requires stronger foundations than attractive listing cards alone.",
    ],
    sections: [
      {
        id: "inventory-foundation",
        title: "Treat inventory quality as a product foundation",
        paragraphs: [
          "Search and filtering only feel useful when the underlying inventory is current, consistently structured, and complete. Feed delays, inconsistent model names, missing prices, or weak photography quickly erode trust.",
          "Before redesigning the interface, map where stock originates, how often it changes, which fields are authoritative, and what happens when a vehicle is reserved or sold. The website experience can only be as dependable as that contract.",
        ],
        points: [
          "Stable vehicle identifiers and canonical vehicle URLs",
          "Clear availability states such as available, reserved, and sold",
          "Consistent specifications, pricing, mileage, and imagery",
          "A defined process for feed errors and manual corrections",
        ],
      },
      {
        id: "vehicle-page",
        title: "Make every vehicle page answer the next buyer question",
        paragraphs: [
          "A detail page should establish confidence quickly: what the vehicle is, why it is relevant, what it costs, what condition or history information is available, and how the buyer can take the next step.",
          "The strongest action depends on the dealership. It may be an enquiry, test-drive request, WhatsApp conversation, trade-in step, reservation, or finance discussion. Presenting every action with equal weight creates hesitation; the page needs a deliberate conversion hierarchy.",
        ],
      },
      {
        id: "lead-context",
        title: "Send useful intent—not another empty lead",
        paragraphs: [
          "A form submission is only valuable when the sales team can understand it and respond in context. Vehicle, location, preferred contact method, requested action, and relevant buyer details should travel with the enquiry.",
          "That context should reach the CRM or dealership workflow without forcing staff to re-enter information. Confirmation messages should also tell the buyer what will happen next rather than ending with a generic success screen.",
        ],
        points: [
          "Attach the exact vehicle and source page",
          "Capture the buyer's intended next step",
          "Route by dealership location or responsible team",
          "Keep consent and communication preferences explicit",
        ],
      },
      {
        id: "search-growth",
        title: "Build search visibility into the inventory experience",
        paragraphs: [
          "Dealership SEO is not a separate layer added after launch. Vehicle URLs, internal linking, location content, page speed, structured data, and sold-stock handling all influence whether useful pages can be discovered and trusted.",
          "Measure more than form totals. Search behavior, no-result searches, vehicle-page engagement, CTA choice, response time, and lead quality reveal where the buying journey is breaking down.",
        ],
      },
    ],
    takeaways: [
      "Start with dependable inventory data and availability states.",
      "Design vehicle pages around buyer questions and one clear next step.",
      "Carry vehicle and intent context into the dealership's operating workflow.",
      "Treat technical SEO and measurement as product requirements.",
    ],
    relatedSlugs: ["designing-fleet-software-around-operations", "connected-car-service-workflows"],
  },
  {
    slug: "designing-fleet-software-around-operations",
    title: "Designing fleet software around the work that happens every day",
    shortTitle: "Fleet software should begin with the operating day.",
    excerpt:
      "A fleet dashboard becomes useful when it helps teams prevent missed work, resolve exceptions, and understand what requires attention now.",
    category: "Fleet systems",
    author: "Zenticsys",
    publishedAt: "2026-08-20",
    displayDate: "20 August 2026",
    readingTime: "9 min read",
    image: "/images/insight-fleet-operations.jpg",
    imageAlt: "Rows of commercial fleet vehicles viewed from above",
    imagePosition: "center center",
    introduction: [
      "Fleet products are often described through modules: vehicles, drivers, maintenance, documents, fuel, tracking, and reports. Operations do not experience those areas as separate modules. A vehicle becomes unavailable, a document expires, a service is overdue, or a driver needs an answer—and the team must coordinate a response.",
      "Designing around that operating reality produces a system that supports decisions rather than a database that merely stores fleet records.",
    ],
    sections: [
      {
        id: "operating-model",
        title: "Map the operating model before the dashboard",
        paragraphs: [
          "Start with the events that change the day: a vehicle is assigned, returned, damaged, serviced, replaced, or made unavailable. Identify who notices each event, who decides what happens, and which system should record the outcome.",
          "This map reveals the states, ownership rules, and hand-offs that matter. It also prevents the product from becoming a collection of screens organized around database tables.",
        ],
        points: [
          "What makes a vehicle available or unavailable?",
          "Who owns the next action when an exception occurs?",
          "Which events require evidence, approval, or notification?",
          "What must remain visible across locations and teams?",
        ],
      },
      {
        id: "attention",
        title: "Design for attention, not maximum information",
        paragraphs: [
          "A useful fleet home screen should make priority visible. Overdue maintenance, expiring documents, unresolved damage, unassigned vehicles, and integration failures are usually more actionable than a wall of equal-weight metrics.",
          "Summary numbers still matter, but they should lead to the affected records and the next task. Every warning needs an owner, a reason, and a route to resolution.",
        ],
      },
      {
        id: "data-sources",
        title: "Define which system owns each fact",
        paragraphs: [
          "Fleet data may arrive from telematics, fuel cards, workshop systems, finance tools, driver apps, spreadsheets, and manual checks. Connecting everything without ownership rules creates conflicting values and unexplained updates.",
          "For each integration, define the source of truth, update frequency, failure behavior, matching identifiers, and whether users may override the value. Integration status should be observable to the team operating the platform.",
        ],
        points: [
          "Use stable identifiers across vehicles, drivers, and locations",
          "Show when connected data was last refreshed",
          "Keep integration failures visible and recoverable",
          "Record important manual changes and approvals",
        ],
      },
      {
        id: "release-slices",
        title: "Release complete workflows in deliberate slices",
        paragraphs: [
          "A first release does not need every fleet feature. It does need one complete operational outcome. A focused vehicle-and-maintenance flow is more valuable than six unfinished modules that do not connect.",
          "Choose the first slice by operational pain, data readiness, user access, and measurable value. Validate it with the people doing the work, then extend the same operating model into documents, drivers, cost, and reporting.",
        ],
      },
    ],
    takeaways: [
      "Model real fleet events, ownership, and hand-offs before drawing screens.",
      "Use the dashboard to direct attention toward resolvable exceptions.",
      "Establish source-of-truth and failure rules for every integration.",
      "Launch one complete operational workflow before expanding breadth.",
    ],
    relatedSlugs: ["modern-dealership-website-beyond-listings", "connected-car-service-workflows"],
  },
  {
    slug: "connected-car-service-workflows",
    title: "Connecting service bookings, work orders, and vehicle history",
    shortTitle: "A service journey is one record moving through many hands.",
    excerpt:
      "The best service platforms connect the customer's booking to workshop execution, approvals, invoices, reminders, and a useful vehicle history.",
    category: "Service platforms",
    author: "Zenticsys",
    publishedAt: "2026-08-06",
    displayDate: "6 August 2026",
    readingTime: "8 min read",
    image: "/images/insight-service-workflows.jpg",
    imageAlt: "Automotive technician reviewing service information on a diagnostic tablet",
    imagePosition: "center 42%",
    introduction: [
      "Customers experience a service appointment as one journey. Internally, the work may pass through reception, workshop planning, inspection, technician activity, parts, approval, invoicing, and follow-up. When each stage uses a separate record, the team spends time reconciling what should already be connected.",
      "A service platform should preserve one understandable thread from the first request to the vehicle's long-term history.",
    ],
    sections: [
      {
        id: "booking-context",
        title: "Capture enough context at booking—without creating friction",
        paragraphs: [
          "The booking experience should collect the vehicle, service need, preferred location, timing, and contact details required to prepare the visit. It should not ask the customer to diagnose the vehicle or complete an internal work order.",
          "Availability must reflect the constraints that genuinely affect capacity. A simple date picker is misleading if bays, technician skills, service duration, parts, or location rules determine whether the work can be accepted.",
        ],
      },
      {
        id: "work-order",
        title: "Let the work order become the operational source of truth",
        paragraphs: [
          "As the vehicle moves through reception, inspection, diagnosis, work, quality checks, and handover, the same service record should accumulate status, evidence, labor, parts, notes, and decisions.",
          "Each role needs a focused view. Reception needs customer and booking context; technicians need the assigned work and evidence capture; managers need capacity, blockers, and approval status.",
        ],
        points: [
          "Explicit statuses with clear ownership",
          "Photos, inspection findings, and technician notes",
          "Parts and labor attached to the relevant work",
          "A timestamped history of approvals and changes",
        ],
      },
      {
        id: "customer-approval",
        title: "Make additional-work approval clear and traceable",
        paragraphs: [
          "Additional work creates a critical moment of trust. The customer needs to understand the finding, recommendation, price, and effect of accepting or declining without decoding workshop terminology.",
          "The response should update the operational record immediately. Teams should not need to reconstruct an approval from a phone call, message thread, and handwritten note.",
        ],
      },
      {
        id: "vehicle-history",
        title: "Turn completed work into useful vehicle history",
        paragraphs: [
          "Closing an invoice should not end the information flow. Completed work, declined recommendations, inspection evidence, mileage, and future maintenance needs should remain connected to the vehicle.",
          "That history helps the next advisor or technician prepare, gives the customer continuity, and supports relevant reminders. It also makes reporting more trustworthy because operational events are recorded at their source.",
        ],
        points: [
          "Keep customer, vehicle, booking, work order, and invoice references connected",
          "Carry unresolved recommendations into future visits",
          "Trigger reminders from actual work and vehicle context",
          "Expose history according to role and privacy requirements",
        ],
      },
    ],
    takeaways: [
      "Connect booking context to the operational service record.",
      "Give each role a focused view of the same underlying workflow.",
      "Make customer approvals understandable and auditable.",
      "Preserve completed and declined work as useful vehicle history.",
    ],
    relatedSlugs: ["modern-dealership-website-beyond-listings", "designing-fleet-software-around-operations"],
  },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((entry) => entry.slug === slug);
}

export function getInsight(slug: string) {
  return insights.find((entry) => entry.slug === slug);
}
