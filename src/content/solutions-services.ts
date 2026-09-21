export type CatalogKind = "solution" | "service";

export type CatalogCapability = {
  title: string;
  description: string;
};

export type CatalogStep = {
  title: string;
  description: string;
};

export type CatalogFaq = {
  question: string;
  answer: string;
};

export type SeoContent = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  socialImage?: string | null;
  noIndex?: boolean | null;
};

export type CatalogEntry = {
  kind: CatalogKind;
  slug: string;
  title: string;
  listingTitle: string;
  kicker: string;
  summary: string;
  audience: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  challengeTitle: string;
  challenge: string;
  painPoints: readonly string[];
  capabilities: readonly CatalogCapability[];
  workflow: readonly CatalogStep[];
  visual: {
    eyebrow: string;
    title: string;
    primaryLabel: string;
    primaryValue: string;
    rows: readonly { label: string; value: string; state: string }[];
  };
  integrations: readonly string[];
  outcomes: readonly CatalogCapability[];
  process: readonly CatalogStep[];
  relatedSlugs: readonly string[];
  faqs: readonly CatalogFaq[];
  seo?: SeoContent;
};

const solutionProcess = [
  {
    title: "Map the operation",
    description:
      "We document users, decisions, hand-offs, data sources, and the constraints already shaping the business.",
  },
  {
    title: "Prototype the critical path",
    description:
      "The highest-risk customer and operational workflows are designed and tested before the wider interface expands.",
  },
  {
    title: "Build in connected releases",
    description:
      "We deliver usable increments around real workflows, integrations, permissions, and measurable acceptance criteria.",
  },
  {
    title: "Improve with operational evidence",
    description:
      "After launch, analytics, support signals, and team feedback guide the next practical improvements.",
  },
] as const;

const serviceProcess = [
  {
    title: "Automotive discovery",
    description:
      "We learn the commercial goal, users, vehicle data, systems, constraints, and operational reality behind the brief.",
  },
  {
    title: "Scope and experience direction",
    description:
      "We define the release, information architecture, technical boundaries, and the journeys that must work first.",
  },
  {
    title: "Design and engineering",
    description:
      "Design, frontend, backend, integrations, and quality assurance progress as one delivery stream.",
  },
  {
    title: "Launch and continuous care",
    description:
      "We support rollout, monitoring, iteration, and a clear path for the product to keep evolving.",
  },
] as const;

export const solutionEntries: readonly CatalogEntry[] = [
  {
    kind: "solution",
    slug: "dealership-websites",
    title: "Dealership websites built around inventory and enquiries",
    listingTitle: "Dealership websites",
    kicker: "For dealerships and dealer groups",
    summary:
      "Fast, search-ready automotive websites that make stock easy to explore and every enquiry easier to act on.",
    audience:
      "Independent dealers, franchise locations, dealer groups, specialist sellers, and used-vehicle businesses replacing a slow or disconnected website.",
    image: "/images/solution-dealership.jpg",
    imageAlt: "Customer viewing vehicles inside a modern automotive showroom",
    imagePosition: "center center",
    challengeTitle: "A vehicle listing is not yet a buying experience.",
    challenge:
      "Dealership sites often separate inventory, finance, trade-in, test-drive, and lead follow-up into disconnected steps. Buyers lose context and dealer teams receive enquiries without enough information to move quickly.",
    painPoints: [
      "Inventory is difficult to search on mobile or becomes stale between systems.",
      "Vehicle pages do not answer the questions that lead to a visit or conversation.",
      "Enquiries arrive without vehicle, finance, trade-in, or location context.",
    ],
    capabilities: [
      { title: "Inventory-led discovery", description: "Faceted search, model pages, saved vehicles, comparison, and availability-aware stock journeys." },
      { title: "Vehicle detail pages", description: "SEO-ready pages with media, specifications, pricing, finance context, and clear next actions." },
      { title: "Lead and booking flows", description: "Test drives, callbacks, WhatsApp, part-exchange, reservations, and location-aware routing." },
      { title: "Dealer operations", description: "Simple publishing, lead ownership, location controls, content updates, and role-based access." },
      { title: "System connections", description: "Inventory feeds, CRM hand-off, finance calculators, analytics, maps, and messaging integrations." },
      { title: "Search performance", description: "Structured vehicle data, crawlable inventory architecture, fast media, and local landing pages." },
    ],
    workflow: [
      { title: "Find the right vehicle", description: "A buyer filters live stock around budget, body style, fuel, mileage, and location." },
      { title: "Build confidence", description: "The vehicle page brings condition, specification, media, finance, and dealer information together." },
      { title: "Choose the next step", description: "The buyer books a test drive, submits a trade-in, asks a question, or starts a reservation." },
      { title: "Respond with context", description: "The dealership receives a structured lead tied to the vehicle and buyer intent." },
    ],
    visual: {
      eyebrow: "Inventory experience",
      title: "Stock, intent, and follow-up in one view.",
      primaryLabel: "Live vehicles",
      primaryValue: "248",
      rows: [
        { label: "2026 Horizon LX", value: "Test drive", state: "Today · 14:30" },
        { label: "2025 Atlas Touring", value: "Trade-in", state: "Awaiting appraisal" },
        { label: "2024 Northline EV", value: "Enquiry", state: "Assigned" },
      ],
    },
    integrations: ["DMS and stock feeds", "CRM and lead routing", "Finance calculators", "Maps and location data", "WhatsApp and email", "Analytics and call tracking"],
    outcomes: [
      { title: "Clearer vehicle discovery", description: "Buyers reach relevant stock without fighting the interface." },
      { title: "More useful enquiries", description: "Dealer teams receive the vehicle and intent context needed to respond." },
      { title: "A maintainable platform", description: "Content, locations, stock, and campaigns can evolve without rebuilding the site." },
    ],
    process: solutionProcess,
    relatedSlugs: ["automotive-website-development", "integrations-and-maintenance"],
    faqs: [
      { question: "Can the website connect to our existing inventory or DMS?", answer: "Yes. We first assess the available feed or API, its update frequency, image quality, identifiers, and data ownership, then design the inventory pipeline around that contract." },
      { question: "Can one platform support multiple dealership locations?", answer: "Yes. Locations can have their own stock, contact paths, opening information, teams, landing pages, and lead-routing rules while sharing one managed platform." },
    ],
  },
  {
    kind: "solution",
    slug: "fleet-management",
    title: "Fleet systems that connect vehicles, drivers, and daily operations",
    listingTitle: "Fleet management systems",
    kicker: "For fleet, rental, logistics, and mobility operators",
    summary:
      "Operational software for vehicle availability, drivers, maintenance, compliance, documents, costs, and reporting.",
    audience:
      "Commercial fleets, rental operators, transport teams, field-service businesses, logistics companies, and mobility providers outgrowing spreadsheets or fragmented tools.",
    image: "/images/solution-fleet.jpg",
    imageAlt: "Commercial vehicles travelling as part of an active fleet",
    imagePosition: "68% center",
    challengeTitle: "Fleet decisions fail when the operational picture is fragmented.",
    challenge:
      "Vehicle status, driver assignments, maintenance, incidents, documents, and costs often live in separate systems. Teams spend time reconciling information instead of preventing downtime and acting on exceptions.",
    painPoints: [
      "No reliable real-time view of availability, assignment, or vehicle condition.",
      "Maintenance is reactive because mileage, defects, and schedules are disconnected.",
      "Different roles see either too much information or not enough to act.",
    ],
    capabilities: [
      { title: "Vehicle lifecycle", description: "Acquisition, specification, assignment, condition, documents, costs, and disposal history." },
      { title: "Driver operations", description: "Profiles, eligibility, assignments, incidents, checks, and role-appropriate mobile workflows." },
      { title: "Maintenance control", description: "Preventive schedules, inspections, defects, work orders, downtime, and service-provider coordination." },
      { title: "Telematics context", description: "Location, odometer, utilisation, fuel or charge signals, and exception-driven operational views." },
      { title: "Compliance and documents", description: "Expiry tracking, evidence, policy workflows, reminders, and audit-ready history." },
      { title: "Reporting and permissions", description: "Role-based dashboards for operations, maintenance, finance, managers, and external partners." },
    ],
    workflow: [
      { title: "Monitor the fleet", description: "Operations sees availability, assignments, alerts, and exceptions rather than a wall of raw data." },
      { title: "Act on risk", description: "Defects, service thresholds, expiring documents, and unusual utilisation become owned tasks." },
      { title: "Coordinate work", description: "Drivers, workshops, managers, and suppliers share one traceable operational record." },
      { title: "Learn from performance", description: "Cost, downtime, utilisation, and maintenance patterns inform the next decision." },
    ],
    visual: {
      eyebrow: "Operations control",
      title: "Exceptions first. Every vehicle traceable.",
      primaryLabel: "Available today",
      primaryValue: "86%",
      rows: [
        { label: "FL-208 · Transit", value: "Service due", state: "420 km" },
        { label: "FL-114 · E-Van", value: "Assigned", state: "Route 07" },
        { label: "FL-391 · Truck", value: "Inspection", state: "Owner notified" },
      ],
    },
    integrations: ["GPS and telematics", "Fuel and charging data", "Workshop systems", "Driver identity", "Accounting and ERP", "Maps and route services"],
    outcomes: [
      { title: "Less avoidable downtime", description: "Maintenance and defects become visible before they disrupt the operation." },
      { title: "Shared operational truth", description: "Teams work from one vehicle, driver, and activity history." },
      { title: "Control that scales", description: "Permissions, regions, depots, and workflows can grow with the fleet." },
    ],
    process: solutionProcess,
    relatedSlugs: ["custom-software-development", "mobile-app-development", "integrations-and-maintenance"],
    faqs: [
      { question: "Do you provide the tracking hardware?", answer: "We build the software and integration layer. Where tracking hardware is required, we work with the selected telematics provider and its supported device/API model." },
      { question: "Can different depots or customers have separate access?", answer: "Yes. Multi-location, multi-company, and role-based access can be designed around the actual ownership and operating model." },
    ],
  },
  {
    kind: "solution",
    slug: "car-service-platforms",
    title: "Service platforms from booking to completed work order",
    listingTitle: "Car service platforms",
    kicker: "For workshops, service chains, and repair networks",
    summary:
      "Connected booking, vehicle history, work orders, technicians, parts, invoicing, and customer communication.",
    audience:
      "Independent workshops, dealership service departments, repair chains, mobile technicians, detailing businesses, and specialist service providers.",
    image: "/images/service-workshop.jpg",
    imageAlt: "Technician working beside a vehicle in a professional service workshop",
    imagePosition: "center center",
    challengeTitle: "The customer sees an appointment. The workshop manages an operation.",
    challenge:
      "A useful service platform must connect the customer promise to bay capacity, technician skills, vehicle history, parts, approvals, and invoicing. A calendar alone cannot manage that chain.",
    painPoints: [
      "Bookings are accepted without reliable duration, capacity, or parts context.",
      "Advisors, technicians, and customers receive different versions of job status.",
      "Service history and recommendations are difficult to retrieve or reuse."],
    capabilities: [
      { title: "Online booking", description: "Service selection, vehicle capture, location, availability, estimates, and confirmation." },
      { title: "Customer and vehicle records", description: "Ownership, contact preferences, service history, mileage, notes, and documents." },
      { title: "Workshop planning", description: "Bay capacity, technician skills, job duration, assignment, and workload visibility." },
      { title: "Digital work orders", description: "Inspections, labour, parts, evidence, recommendations, approvals, and status." },
      { title: "Customer communication", description: "Reminders, progress updates, digital approvals, completion, and follow-up." },
      { title: "Multi-location control", description: "Shared standards with location-specific teams, pricing, capacity, and reporting." },
    ],
    workflow: [
      { title: "Book with the vehicle", description: "The customer selects work and provides the vehicle and concern before arrival." },
      { title: "Plan the workshop", description: "The job is scheduled against capacity, skills, parts needs, and promised time." },
      { title: "Inspect and approve", description: "Technicians record findings; customers approve additional work with clear evidence." },
      { title: "Complete and retain", description: "Invoice, service history, reminders, and recommendations remain connected." },
    ],
    visual: {
      eyebrow: "Workshop day",
      title: "Every job has an owner, status, and next action.",
      primaryLabel: "Capacity booked",
      primaryValue: "74%",
      rows: [
        { label: "WO-1842 · Annual service", value: "In progress", state: "Bay 04" },
        { label: "WO-1849 · Brake inspection", value: "Approval", state: "Sent 8 min ago" },
        { label: "WO-1854 · Diagnostics", value: "Checked in", state: "Technician assigned" },
      ],
    },
    integrations: ["VIN and vehicle data", "Parts catalogs", "Payment providers", "Accounting systems", "SMS and email", "Dealer or workshop systems"],
    outcomes: [
      { title: "Better-filled capacity", description: "Bookings reflect the work and resources required, not only open calendar slots." },
      { title: "Faster approvals", description: "Customers receive understandable evidence and can approve work without telephone delays." },
      { title: "Stronger retention", description: "History, reminders, and recommendations support the next service relationship." },
    ],
    process: solutionProcess,
    relatedSlugs: ["custom-software-development", "ui-ux-design", "integrations-and-maintenance"],
    faqs: [
      { question: "Can customers approve additional work online?", answer: "Yes. A work order can present findings, images, pricing, and approval choices through a secure customer link or portal." },
      { question: "Can the platform support different services and prices by location?", answer: "Yes. Shared service definitions can coexist with location-specific capacity, pricing, tax, teams, and operating rules." },
    ],
  },
  {
    kind: "solution",
    slug: "automotive-parts-ecommerce",
    title: "Automotive parts ecommerce that understands fitment",
    listingTitle: "Automotive parts ecommerce",
    kicker: "For parts retailers, distributors, and manufacturers",
    summary:
      "Vehicle-aware catalog, compatibility search, pricing, stock, fulfillment, and account workflows for B2C and trade buyers.",
    audience:
      "Parts retailers, wholesalers, distributors, manufacturers, specialist brands, and dealer groups selling components online.",
    image: "/images/solution-parts.jpg",
    imageAlt: "Organized automotive components in a specialist parts environment",
    imagePosition: "center center",
    challengeTitle: "A part is only useful when the buyer knows it will fit.",
    challenge:
      "Automotive ecommerce carries more uncertainty than ordinary retail. Vehicle compatibility, superseded part numbers, trade pricing, stock sources, kits, shipping constraints, and returns all influence the buying decision.",
    painPoints: [
      "Customers cannot confidently identify compatible parts from a large catalog.",
      "Stock and pricing differ across warehouses, suppliers, channels, or trade accounts.",
      "Catalog errors create avoidable support, returns, and fulfillment cost."],
    capabilities: [
      { title: "Vehicle and VIN lookup", description: "Registration, VIN, make/model/year, engine, and saved-garage discovery patterns." },
      { title: "Fitment-rich catalog", description: "Compatibility, attributes, cross-references, supersessions, kits, and technical documents." },
      { title: "B2C and trade commerce", description: "Retail checkout, account pricing, quotes, purchase orders, tax, and credit controls." },
      { title: "Inventory and sourcing", description: "Multi-location stock, supplier availability, lead times, substitutions, and backorders." },
      { title: "Fulfillment", description: "Shipping rules, collection, split orders, hazardous/oversize constraints, and returns." },
      { title: "Catalog operations", description: "Bulk imports, enrichment queues, quality controls, merchandising, and audit history." },
    ],
    workflow: [
      { title: "Identify the vehicle", description: "The buyer starts with a vehicle, registration, VIN, or precise model configuration." },
      { title: "See compatible choices", description: "Results explain fitment, alternatives, availability, and the information needed to compare." },
      { title: "Apply account rules", description: "Pricing, tax, credit, delivery, and approval behavior adapts to retail or trade context." },
      { title: "Fulfil accurately", description: "Warehouse and supplier logic routes the order while preserving customer visibility." },
    ],
    visual: {
      eyebrow: "Catalog intelligence",
      title: "Compatibility before checkout.",
      primaryLabel: "Catalog coverage",
      primaryValue: "96%",
      rows: [
        { label: "Brake kit · AX-204", value: "Exact fit", state: "3 warehouses" },
        { label: "Oil filter · OF-88", value: "Compatible", state: "Trade price applied" },
        { label: "Sensor · SN-412", value: "VIN check", state: "Confirmation required" },
      ],
    },
    integrations: ["Vehicle and VIN datasets", "PIM and catalog feeds", "ERP and warehouse systems", "Supplier availability", "Payment and tax", "Shipping and returns"],
    outcomes: [
      { title: "More confident buying", description: "Compatibility and availability are resolved before the customer commits." },
      { title: "Lower operational friction", description: "Catalog, order, warehouse, and supplier data move through one controlled workflow." },
      { title: "One platform for channels", description: "Retail, trade, branches, and sales teams can share a dependable commerce foundation." },
    ],
    process: solutionProcess,
    relatedSlugs: ["automotive-website-development", "custom-software-development", "integrations-and-maintenance"],
    faqs: [
      { question: "Can you work with our existing parts catalog or PIM?", answer: "Yes. We audit identifiers, fitment relationships, attributes, media, pricing, and update methods before defining the catalog integration and quality controls." },
      { question: "Can trade customers receive different prices and checkout rules?", answer: "Yes. Account tiers, contract pricing, tax treatment, credit limits, approvals, purchase orders, and delivery options can be role and account aware." },
    ],
  },
  {
    kind: "solution",
    slug: "vehicle-marketplaces",
    title: "Vehicle marketplaces designed for trusted transactions",
    listingTitle: "Vehicle marketplaces",
    kicker: "For automotive marketplaces and digital retail ventures",
    summary:
      "Buyer, seller, dealer, listing, offer, messaging, payment, moderation, and administration workflows in one platform.",
    audience:
      "Vehicle marketplace operators, classified platforms, dealer networks, specialist vehicle communities, and new digital retail ventures.",
    image: "/images/solution-marketplace.jpg",
    imageAlt: "Vehicles prepared for digital marketplace listings",
    imagePosition: "63% center",
    challengeTitle: "A marketplace must earn trust from every side.",
    challenge:
      "Search is only the visible layer. Sustainable marketplaces coordinate listing quality, seller identity, dealer tools, enquiries, offers, payments, disputes, moderation, and platform economics without making participation difficult.",
    painPoints: [
      "Inconsistent listings make comparison difficult and reduce buyer confidence.",
      "Private sellers, dealers, and internal teams need different tools and controls.",
      "Moderation and transaction exceptions become manual operational bottlenecks."],
    capabilities: [
      { title: "Structured listings", description: "Vehicle identity, specification, condition, media, ownership, pricing, and quality checks." },
      { title: "Buyer discovery", description: "Search, filters, saved searches, comparison, recommendations, and alert preferences." },
      { title: "Seller and dealer tools", description: "Onboarding, listing management, bulk stock, enquiries, offers, performance, and billing." },
      { title: "Transaction workflows", description: "Messaging, offers, deposits, reservation, document exchange, payment, and status tracking." },
      { title: "Trust and moderation", description: "Verification, reporting, review queues, fraud signals, policies, and dispute records." },
      { title: "Platform administration", description: "Roles, plans, fees, content, users, audit logs, reports, and operational controls." },
    ],
    workflow: [
      { title: "Create a trusted listing", description: "Vehicle data, seller context, media, and quality checks produce a comparable record." },
      { title: "Match buyer intent", description: "Search, saved criteria, and alerts keep relevant vehicles discoverable." },
      { title: "Move into a transaction", description: "Enquiries, offers, reservations, documents, and payments follow explicit states." },
      { title: "Handle exceptions", description: "Moderators and support teams can review evidence and act with a complete audit history." },
    ],
    visual: {
      eyebrow: "Marketplace operations",
      title: "Quality listings and active transactions at a glance.",
      primaryLabel: "Verified listings",
      primaryValue: "91%",
      rows: [
        { label: "Listing MV-10428", value: "Offer received", state: "Seller notified" },
        { label: "Dealer Northline", value: "18 active", state: "Feed healthy" },
        { label: "Listing MV-10391", value: "Review", state: "Media mismatch" },
      ],
    },
    integrations: ["Vehicle data providers", "Identity verification", "Dealer inventory feeds", "Payments and payouts", "Messaging and notifications", "Fraud and analytics tools"],
    outcomes: [
      { title: "Higher listing quality", description: "Structured requirements and review tools improve consistency before publication." },
      { title: "Clear transaction progress", description: "Buyers, sellers, and support teams understand the current state and next action." },
      { title: "Operable marketplace growth", description: "Dealer accounts, moderation, fees, and administration scale beyond manual handling." },
    ],
    process: solutionProcess,
    relatedSlugs: ["custom-software-development", "ui-ux-design", "mobile-app-development"],
    faqs: [
      { question: "Can the marketplace support both private sellers and dealers?", answer: "Yes. Account types can have different onboarding, listing limits, feeds, subscriptions, team access, pricing, and transaction workflows." },
      { question: "Can you build moderation and super-admin tools as well as the public marketplace?", answer: "Yes. Operational and super-admin workflows are treated as core product surfaces, with permissions, review queues, audit history, and reporting." },
    ],
  },
  {
    kind: "solution",
    slug: "auction-platforms",
    title: "Auction platforms for public and dealer vehicle trading",
    listingTitle: "Auction platforms",
    kicker: "For public, trade, and dealer auction operators",
    summary:
      "Timed and live auction systems connecting lots, inspections, bidders, sellers, rules, payments, and administration.",
    audience:
      "Public auction houses, dealer-only exchanges, remarketing businesses, fleet disposals, salvage operators, and specialist vehicle auctions.",
    image: "/images/solution-auction.jpg",
    imageAlt: "Vehicle presented during an active automotive auction",
    imagePosition: "65% center",
    challengeTitle: "Bidding is the moment. Auction operations make it possible.",
    challenge:
      "A reliable auction platform must prepare trustworthy lots, qualify participants, enforce sale rules, synchronize bidding, communicate outcomes, collect payment, and manage exceptions under time pressure.",
    painPoints: [
      "Lot data, inspections, reserves, and seller instructions are prepared in disconnected tools.",
      "Bid eligibility and auction rules vary by buyer type, sale, jurisdiction, or payment status.",
      "Post-sale payment, collection, documents, and disputes create heavy administration."],
    capabilities: [
      { title: "Lot preparation", description: "Consignment, vehicle data, inspections, condition media, reserve, documents, and sale assignment." },
      { title: "Buyer and seller portals", description: "Registration, verification, deposits, permissions, watchlists, bids, stock, and settlements." },
      { title: "Timed and live bidding", description: "Bid increments, proxy bids, extensions, lanes, real-time state, and resilient event handling." },
      { title: "Rules and eligibility", description: "Buyer tiers, geography, deposits, credit, sale access, fees, tax, and conditional participation." },
      { title: "Post-sale operations", description: "Invoices, payments, release, transport, documents, arbitration, and seller settlement." },
      { title: "Auction administration", description: "Sales, lanes, lots, users, interventions, audit events, reports, and platform configuration." },
    ],
    workflow: [
      { title: "Prepare the lot", description: "Vehicle identity, condition, media, documents, fees, and seller rules are validated." },
      { title: "Qualify the bidder", description: "Verification, deposits, account status, and sale rules determine participation." },
      { title: "Run a controlled sale", description: "The platform maintains authoritative bid state and communicates every change." },
      { title: "Complete the transaction", description: "Winning, invoicing, payment, release, collection, and settlement remain traceable." },
    ],
    visual: {
      eyebrow: "Live sale control",
      title: "Authoritative bidding with an operational view behind it.",
      primaryLabel: "Active bidders",
      primaryValue: "184",
      rows: [
        { label: "Lot 214 · SUV", value: "£18,400", state: "Live · 12 bids" },
        { label: "Lot 215 · E-Van", value: "On deck", state: "Reserve met" },
        { label: "Lot 209 · Saloon", value: "Sold", state: "Payment pending" },
      ],
    },
    integrations: ["Vehicle and inspection data", "Identity and business verification", "Payments and deposits", "Accounting and settlement", "Transport and collection", "Realtime messaging infrastructure"],
    outcomes: [
      { title: "Confident participation", description: "Clear condition, rules, fees, and bid state help buyers act decisively." },
      { title: "Reliable sale operations", description: "Auction teams can intervene, resolve exceptions, and trace every material event." },
      { title: "Faster post-sale completion", description: "Payment, release, transport, documents, and settlement share one status model." },
    ],
    process: solutionProcess,
    relatedSlugs: ["custom-software-development", "ui-ux-design", "integrations-and-maintenance"],
    faqs: [
      { question: "Can one platform support timed and live auctions?", answer: "Yes. They can share lots, accounts, eligibility, fees, and post-sale workflows while using sale-specific bidding and event models." },
      { question: "How do you approach bidding reliability?", answer: "We define one authoritative server-side bid state, explicit ordering and validation rules, resilient event delivery, audit records, operational controls, and load testing around expected sale behavior." },
    ],
  },
  {
    kind: "solution",
    slug: "custom-automotive-software",
    title: "Custom automotive software for the workflow you cannot buy off the shelf",
    listingTitle: "Custom automotive software",
    kicker: "For complex and differentiating automotive operations",
    summary:
      "Internal platforms, partner portals, role-based dashboards, workflow automation, integrations, and legacy modernization.",
    audience:
      "Automotive businesses with specialist processes, multiple user roles, disconnected systems, or a product opportunity that generic software cannot support.",
    image: "/images/solution-custom-software.jpg",
    imageAlt: "Automotive operations team reviewing connected software workflows",
    imagePosition: "center center",
    challengeTitle: "The difficult part is rarely the screen. It is the operation behind it.",
    challenge:
      "Automotive businesses accumulate rules, hand-offs, exceptions, spreadsheets, portals, and legacy systems. Custom software succeeds when those realities become a coherent product model—not when they are hidden beneath a new interface.",
    painPoints: [
      "Critical work depends on spreadsheets, email, duplicate entry, or individual knowledge.",
      "Off-the-shelf tools force the operation into workflows that do not fit.",
      "Legacy systems block new customer experiences, integrations, or business models."],
    capabilities: [
      { title: "Operational platforms", description: "Role-based systems for teams, locations, partners, customers, vehicles, and work." },
      { title: "Portals and dashboards", description: "Dealer, supplier, customer, driver, technician, manager, and super-admin experiences." },
      { title: "Workflow automation", description: "Rules, approvals, tasks, notifications, exceptions, and audit trails across the operation." },
      { title: "Data and integrations", description: "A controlled domain model connecting APIs, legacy systems, files, and external providers." },
      { title: "Legacy modernization", description: "Incremental replacement, new frontends, service extraction, migration, and coexistence planning." },
      { title: "Product engineering", description: "Web, mobile, cloud architecture, quality, observability, security, and ongoing evolution." },
    ],
    workflow: [
      { title: "Expose the real process", description: "We map actors, decisions, information, exceptions, and system boundaries." },
      { title: "Define the product model", description: "Shared concepts and state transitions replace disconnected screens and documents." },
      { title: "Release around value", description: "The product evolves in slices that improve a complete workflow for a real user group." },
      { title: "Modernize without a cliff edge", description: "Migration and integration let the new platform take responsibility progressively." },
    ],
    visual: {
      eyebrow: "Connected operations",
      title: "Different roles. One controlled workflow.",
      primaryLabel: "Open workflows",
      primaryValue: "42",
      rows: [
        { label: "Dealer onboarding", value: "Review", state: "Compliance team" },
        { label: "Vehicle transfer", value: "In transit", state: "ETA 16:20" },
        { label: "Settlement batch", value: "Approved", state: "Finance queue" },
      ],
    },
    integrations: ["Legacy databases and APIs", "Vehicle data providers", "Identity and permissions", "Payments and accounting", "Document and messaging services", "Cloud monitoring and analytics"],
    outcomes: [
      { title: "Less operational drag", description: "Duplicate entry and unclear hand-offs become explicit, automated workflows." },
      { title: "Software that fits", description: "The product reflects the roles, rules, and exceptions that make the business distinctive." },
      { title: "A platform that can evolve", description: "Clear boundaries and incremental delivery reduce dependence on another large replacement." },
    ],
    process: solutionProcess,
    relatedSlugs: ["custom-software-development", "ui-ux-design", "integrations-and-maintenance"],
    faqs: [
      { question: "How do you decide whether custom software is justified?", answer: "We look for strategic differentiation, recurring operational cost, integration complexity, scale, risk, and gaps that configured products cannot address economically." },
      { question: "Can you modernize a legacy platform without replacing everything at once?", answer: "Yes. We prefer controlled seams: a new workflow, frontend, service, or integration can take responsibility while the remaining legacy system continues operating." },
    ],
  },
] as const;

export const serviceEntries: readonly CatalogEntry[] = [
  {
    kind: "service",
    slug: "automotive-website-development",
    title: "Automotive website development built around real buyer journeys",
    listingTitle: "Automotive website development",
    kicker: "Strategy, design, development, and launch",
    summary: "High-performance automotive websites for inventory, services, parts, locations, leads, and long-term content growth.",
    audience: "Dealerships, workshops, parts businesses, automotive brands, mobility companies, and established operators replacing a generic or underperforming website.",
    image: "/images/service-website-development.jpg",
    imageAlt: "Hands using a laptop displaying an active website interface",
    imagePosition: "center center",
    challengeTitle: "When an automotive website must do more than describe the company.",
    challenge: "Automotive websites often need structured vehicle or service content, high-intent conversion paths, integrations, local search architecture, and fast media. We treat those needs as the product—not as additions to a generic brochure template.",
    painPoints: ["The current site is slow, difficult to update, or weak on mobile.", "Inventory, bookings, parts, locations, and enquiries feel disconnected.", "Search visibility depends on pages the existing platform cannot structure well."],
    capabilities: [
      { title: "Discovery and content architecture", description: "Audience journeys, search intent, page structure, content models, and conversion paths." },
      { title: "Automotive UX and visual design", description: "Responsive, accessible interfaces shaped around vehicles, services, parts, and trust." },
      { title: "Next.js engineering", description: "Server-rendered pages, optimized media, structured data, integrations, and maintainable components." },
      { title: "Launch and measurement", description: "Migration, redirects, analytics, quality assurance, performance checks, and iteration planning." },
    ],
    workflow: serviceProcess,
    visual: { eyebrow: "Website delivery", title: "Content, inventory, and enquiries working together.", primaryLabel: "Core Web Vitals", primaryValue: "Ready", rows: [
      { label: "Vehicle and service pages", value: "Structured", state: "Search-ready" },
      { label: "Lead journeys", value: "Connected", state: "Context preserved" },
      { label: "Editorial content", value: "Managed", state: "Reusable sections" },
    ] },
    integrations: ["Inventory and catalog feeds", "CRM and lead delivery", "Booking tools", "Maps and messaging", "Analytics and consent", "Future CMS content models"],
    outcomes: [
      { title: "Faster buyer journeys", description: "Visitors can understand the offer and reach the right action with less friction." },
      { title: "A stronger search foundation", description: "Structure, performance, metadata, and internal linking support sustainable visibility." },
      { title: "Easier evolution", description: "Reusable components and controlled content structures make future changes safer." },
    ],
    process: serviceProcess,
    relatedSlugs: ["dealership-websites", "automotive-parts-ecommerce", "car-service-platforms"],
    faqs: [
      { question: "Can you redesign an existing automotive website without losing search visibility?", answer: "Yes. We inventory important URLs and content, plan redirects, preserve or improve search intent, and validate metadata, structured data, internal links, and crawl behavior before launch." },
      { question: "Will our team be able to update the site?", answer: "Yes. The final editing model will be implemented through the agreed CMS phase, with controlled reusable blocks that protect the design while allowing practical updates." },
    ],
  },
  {
    kind: "service",
    slug: "custom-software-development",
    title: "Custom software development for complex automotive operations",
    listingTitle: "Custom software development",
    kicker: "Product strategy through long-term engineering",
    summary: "Automotive platforms, internal tools, portals, dashboards, and SaaS products designed around specific workflows and roles.",
    audience: "Automotive operators, technology ventures, dealer networks, fleets, marketplaces, auction companies, and teams modernizing business-critical systems.",
    image: "/images/service-custom-software.jpg",
    imageAlt: "Software developer working across code and delivery planning screens",
    imagePosition: "center center",
    challengeTitle: "When the business process is too important for a generic tool.",
    challenge: "Custom development is valuable when the operation, product model, integration landscape, or competitive advantage cannot be represented well by existing software. We combine product discovery with implementation so the system reflects the real work.",
    painPoints: ["Teams operate through spreadsheets and disconnected tools.", "A legacy platform blocks growth or creates unacceptable operational risk.", "A new automotive product needs credible technical and workflow depth."],
    capabilities: [
      { title: "Product and domain discovery", description: "Users, roles, rules, states, exceptions, data, and release priorities." },
      { title: "Platform engineering", description: "Secure web applications, APIs, background workflows, data models, and cloud services." },
      { title: "Role-based product surfaces", description: "Customer, dealer, partner, operator, manager, and super-admin experiences." },
      { title: "Modernization and continuity", description: "Migration, integration, observability, support, and incremental platform evolution." },
    ],
    workflow: serviceProcess,
    visual: { eyebrow: "Product engineering", title: "From operating rule to dependable software.", primaryLabel: "Release health", primaryValue: "Stable", rows: [
      { label: "Core workflows", value: "Covered", state: "Acceptance mapped" },
      { label: "Integration jobs", value: "Healthy", state: "Monitored" },
      { label: "Role permissions", value: "Verified", state: "Audit complete" },
    ] },
    integrations: ["API and event architecture", "Automotive data providers", "Authentication and permissions", "Payments and financial systems", "Cloud infrastructure", "Monitoring and support tooling"],
    outcomes: [
      { title: "A coherent product model", description: "Rules and workflows are explicit rather than scattered through manual workarounds." },
      { title: "Safer operational change", description: "Incremental releases and observable systems reduce the risk of improvement." },
      { title: "Long-term product ownership", description: "Documentation, architecture, testing, and support make the platform maintainable." },
    ],
    process: serviceProcess,
    relatedSlugs: ["fleet-management", "vehicle-marketplaces", "auction-platforms", "custom-automotive-software"],
    faqs: [
      { question: "Can you join an existing product or engineering team?", answer: "Yes. We can take responsibility for a defined product area, work alongside internal teams, or provide a cross-functional delivery group around a specific release." },
      { question: "How do you reduce risk on a large custom platform?", answer: "We make assumptions visible, prototype critical workflows, define acceptance around complete user outcomes, integrate early, and release in operationally useful increments." },
    ],
  },
  {
    kind: "service",
    slug: "ui-ux-design",
    title: "Automotive UI/UX design for customers and operational teams",
    listingTitle: "Automotive UI/UX design",
    kicker: "Research, workflows, prototyping, and product systems",
    summary: "Clear interfaces for vehicle discovery, dealer tools, fleet operations, workshops, marketplaces, auctions, and administration.",
    audience: "Automotive product teams improving an existing experience, validating a new platform, or untangling complex role-based workflows before engineering.",
    image: "/images/service-ui-ux.jpg",
    imageAlt: "Design team reviewing interface wireframes and user journeys",
    imagePosition: "center center",
    challengeTitle: "When complexity is reaching the interface.",
    challenge: "Automotive products combine dense records, operational urgency, different expertise levels, and role-specific decisions. Good design makes the next action clear without hiding the information and control experienced users need.",
    painPoints: ["Users rely on training or memory to navigate ordinary work.", "Customer and admin experiences evolved separately and no longer agree.", "Engineering is starting before important workflow decisions are resolved."],
    capabilities: [
      { title: "Workflow research", description: "Interviews, task mapping, evidence review, roles, pain points, and opportunity framing." },
      { title: "Information architecture", description: "Navigation, object models, hierarchy, terminology, states, and permissions." },
      { title: "Interaction and prototyping", description: "Critical paths, responsive behavior, edge cases, validation, and usability testing." },
      { title: "Product design systems", description: "Accessible components, patterns, tokens, documentation, and engineering hand-off." },
    ],
    workflow: serviceProcess,
    visual: { eyebrow: "Workflow prototype", title: "The right information at the point of decision.", primaryLabel: "Tasks validated", primaryValue: "18", rows: [
      { label: "Vehicle intake", value: "Tested", state: "Advisor + technician" },
      { label: "Bid approval", value: "Refined", state: "Dealer role" },
      { label: "Fleet exception", value: "Simplified", state: "Operations role" },
    ] },
    integrations: ["Design-system foundations", "Responsive web patterns", "Mobile interaction patterns", "Accessibility requirements", "Data-dense interfaces", "Engineering-ready specifications"],
    outcomes: [
      { title: "Less ambiguity", description: "Users can see current state, available actions, and consequences more clearly." },
      { title: "Earlier risk reduction", description: "Critical workflows and edge cases are resolved before expensive implementation." },
      { title: "Consistent product growth", description: "Reusable patterns help customer, operational, and admin surfaces evolve together." },
    ],
    process: serviceProcess,
    relatedSlugs: ["dealership-websites", "car-service-platforms", "vehicle-marketplaces", "auction-platforms"],
    faqs: [
      { question: "Can you redesign only one part of an existing product?", answer: "Yes. A focused workflow can be researched and redesigned while respecting the surrounding product, technical constraints, and migration path." },
      { question: "Do you provide designs developers can implement?", answer: "Yes. The output includes responsive states, interaction behavior, edge cases, component patterns, and ongoing design support during implementation." },
    ],
  },
  {
    kind: "service",
    slug: "mobile-app-development",
    title: "Automotive mobile apps built for work on the move",
    listingTitle: "Mobile app development",
    kicker: "Customer, driver, dealer, and technician experiences",
    summary: "Focused mobile products for drivers, technicians, buyers, sellers, dealers, and field operations.",
    audience: "Automotive businesses whose users inspect, drive, collect, deliver, approve, photograph, communicate, or make decisions away from a desk.",
    image: "/images/service-mobile-app-phone.jpg",
    imageAlt: "Person holding and using a smartphone inside a car",
    imagePosition: "center 50%",
    challengeTitle: "When the workflow happens beside the vehicle—not behind a desk.",
    challenge: "A useful automotive app must account for attention, connectivity, camera and location use, short task windows, permissions, and synchronization with the wider platform. It should simplify field work rather than copy a desktop screen.",
    painPoints: ["Field users record information later because current tools are desktop-only.", "Photos, signatures, locations, and inspections lack a shared operational record.", "A customer app offers features without a clear recurring reason to use it."],
    capabilities: [
      { title: "Mobile product strategy", description: "Use cases, frequency, context, device capabilities, offline needs, and release priorities." },
      { title: "Native-feeling interaction", description: "Focused tasks, camera, location, notifications, biometrics, and accessible controls." },
      { title: "Connected field workflows", description: "Inspections, handovers, proof, service updates, driver tasks, and approvals." },
      { title: "Backend and release delivery", description: "APIs, synchronization, security, observability, app-store readiness, and support." },
    ],
    workflow: serviceProcess,
    visual: { eyebrow: "Mobile operations", title: "Capture the work where it happens.", primaryLabel: "Tasks synced", primaryValue: "128", rows: [
      { label: "Vehicle inspection", value: "Uploaded", state: "12 photos" },
      { label: "Driver handover", value: "Signed", state: "Location verified" },
      { label: "Service approval", value: "Pending", state: "Push delivered" },
    ] },
    integrations: ["Platform APIs", "Camera and media upload", "Location and maps", "Push notifications", "Offline synchronization", "Identity and device security"],
    outcomes: [
      { title: "Work captured at source", description: "Evidence and status enter the system while the user and vehicle are present." },
      { title: "Shorter operational delays", description: "Approvals, hand-offs, and exception reporting no longer wait for desktop access." },
      { title: "A focused mobile experience", description: "The app supports repeatable value instead of becoming a smaller website." },
    ],
    process: serviceProcess,
    relatedSlugs: ["fleet-management", "car-service-platforms", "vehicle-marketplaces"],
    faqs: [
      { question: "Should we build a mobile app or a responsive web application?", answer: "We decide from context: frequency, offline needs, camera/location use, notifications, device security, distribution, and whether the user benefits from installation." },
      { question: "Can the app work with an existing platform?", answer: "Yes, provided suitable APIs exist or can be introduced. We assess authentication, data ownership, synchronization, errors, and versioning before defining the mobile scope." },
    ],
  },
  {
    kind: "service",
    slug: "integrations-and-maintenance",
    title: "Automotive integrations and ongoing platform maintenance",
    listingTitle: "Integrations and maintenance",
    kicker: "Connect, observe, support, and improve",
    summary: "API integrations, data synchronization, operational monitoring, platform support, and continuous product improvement.",
    audience: "Automotive teams connecting websites or platforms to vehicle data, inventory, telematics, CRM, ERP, payments, messaging, or legacy systems—and teams needing dependable ongoing care.",
    image: "/images/service-integrations.jpg",
    imageAlt: "Technician operating a connected vehicle diagnostic system",
    imagePosition: "center center",
    challengeTitle: "When the product is only as dependable as the systems around it.",
    challenge: "Automotive software frequently depends on third-party feeds and operational systems with different identifiers, timing, quality, and failure modes. Integration and maintenance must make those dependencies visible and recoverable.",
    painPoints: ["Teams manually move information between systems or repair failed imports.", "An integration exists but no one can see whether its data is complete or current.", "The platform needs regular security, performance, dependency, and product attention after launch."],
    capabilities: [
      { title: "Integration discovery", description: "Contracts, ownership, identifiers, frequency, volume, mapping, and failure handling." },
      { title: "APIs and synchronization", description: "Secure endpoints, scheduled jobs, webhooks, event processing, imports, and exports." },
      { title: "Data quality and operations", description: "Validation, reconciliation, retries, alerts, dashboards, and support tooling." },
      { title: "Continuous platform care", description: "Monitoring, updates, incident response, performance, security, and prioritized improvements." },
    ],
    workflow: serviceProcess,
    visual: { eyebrow: "Integration health", title: "Connected systems with visible failure and recovery.", primaryLabel: "Jobs healthy", primaryValue: "99.8%", rows: [
      { label: "Inventory import", value: "Complete", state: "2 min ago" },
      { label: "CRM lead delivery", value: "Healthy", state: "38 today" },
      { label: "Telematics sync", value: "Retrying", state: "Provider delay" },
    ] },
    integrations: ["Inventory, DMS, CRM, and ERP", "Vehicle, VIN, and catalog data", "Telematics and mapping", "Payments and accounting", "Email, SMS, and WhatsApp", "Monitoring and incident tooling"],
    outcomes: [
      { title: "Less invisible failure", description: "Health, freshness, errors, and retries become observable to the people responsible." },
      { title: "Lower manual reconciliation", description: "Clear data contracts and automated recovery reduce repetitive operational work." },
      { title: "A healthier product", description: "Maintenance combines technical care with a prioritized path for ongoing improvement." },
    ],
    process: serviceProcess,
    relatedSlugs: ["dealership-websites", "fleet-management", "automotive-parts-ecommerce", "custom-automotive-software"],
    faqs: [
      { question: "Can you take over an integration built by another team?", answer: "Usually, yes. We first inspect the code, contracts, credentials model, data mappings, logs, retry behavior, tests, and known operational issues before accepting support responsibility." },
      { question: "What does ongoing maintenance include?", answer: "The agreement can cover monitoring, dependency and security updates, incident response, bug fixes, performance work, integration health, and a planned allowance for product improvements." },
    ],
  },
] as const;

export const allCatalogEntries = [...solutionEntries, ...serviceEntries] as const;

export function getSolution(slug: string) {
  return solutionEntries.find((entry) => entry.slug === slug);
}

export function getService(slug: string) {
  return serviceEntries.find((entry) => entry.slug === slug);
}

export function getCatalogEntry(kind: CatalogKind, slug: string) {
  return kind === "solution" ? getSolution(slug) : getService(slug);
}
