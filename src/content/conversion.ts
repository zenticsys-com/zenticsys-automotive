export const projectTypes = [
  {
    value: "dealership",
    label: "Dealership website",
    description: "Inventory, enquiries, test drives, finance, trade-in, and dealer-group experiences.",
    featurePrompt: "What should the dealership experience support?",
    features: ["Vehicle inventory", "Lead routing", "Test-drive booking", "Finance or trade-in", "CRM integration"],
  },
  {
    value: "fleet",
    label: "Fleet management system",
    description: "Operational software for vehicles, drivers, maintenance, documents, and reporting.",
    featurePrompt: "Which fleet operations matter most?",
    features: ["Vehicle and driver records", "Maintenance", "Telematics", "Compliance", "Reporting"],
  },
  {
    value: "service",
    label: "Service platform",
    description: "Booking, workshop, customer, work-order, history, and multi-location workflows.",
    featurePrompt: "Which service workflows should be connected?",
    features: ["Online booking", "Work orders", "Service history", "Technician workflow", "Customer reminders"],
  },
  {
    value: "parts",
    label: "Parts ecommerce",
    description: "Catalogues, compatibility, inventory, dealer pricing, checkout, and fulfilment.",
    featurePrompt: "What does the parts experience need?",
    features: ["Parts catalogue", "Vehicle compatibility", "Dealer pricing", "Inventory sync", "Checkout and shipping"],
  },
  {
    value: "marketplace",
    label: "Vehicle marketplace",
    description: "Buyer, seller, listing, offer, messaging, moderation, and administration workflows.",
    featurePrompt: "Which marketplace workflows are in scope?",
    features: ["Vehicle listings", "Buyer and seller accounts", "Offers or messaging", "Payments", "Moderation"],
  },
  {
    value: "auction",
    label: "Auction platform",
    description: "Public or dealer auctions with lots, bidding, rules, notifications, and administration.",
    featurePrompt: "What kind of auction operation are you planning?",
    features: ["Timed auctions", "Live bidding", "Dealer-only access", "Bid validation", "Payments and settlement"],
  },
  {
    value: "custom",
    label: "Custom automotive software",
    description: "Internal tools, portals, integrations, mobile products, or platform modernization.",
    featurePrompt: "Which product capabilities are most important?",
    features: ["Internal operations", "Customer portal", "Mobile application", "System integrations", "Legacy modernization"],
  },
] as const;

export const timelines = [
  "As soon as practical",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Exploring options",
] as const;

export const budgets = [
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000+",
  "Not defined yet",
] as const;

export const proposalSteps = [
  { number: 1, label: "Project" },
  { number: 2, label: "Business" },
  { number: 3, label: "Requirements" },
  { number: 4, label: "Timing" },
  { number: 5, label: "Contact" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];

export function getProjectType(value: string) {
  return projectTypes.find((project) => project.value === value);
}
