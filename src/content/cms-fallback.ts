import { primaryNavigation, projectNavigation } from "@/lib/navigation";
import type { Footer, Homepage, Navigation, SiteSetting } from "@/payload-types";

export const fallbackHomepage: Omit<Homepage, "id"> = {
  hero: {
    kicker: "Automotive digital specialists",
    title: "We build the digital systems that keep automotive businesses moving.",
    description: "Dealership websites, fleet systems, service platforms, parts ecommerce, marketplaces, auctions, and enterprise automotive software—designed as one connected experience.",
    primaryLabel: "Request a Proposal",
    primaryHref: "/request-a-proposal",
    secondaryLabel: "Explore Solutions",
    secondaryHref: "/solutions",
    scrollLabel: "See who we help",
  },
  sections: {
    audienceKicker: "One industry. Different operations.",
    audienceTitle: "Built around how automotive businesses actually work.",
    solutionsKicker: "What we build",
    solutionsTitle: "Digital products across the automotive journey.",
    workflowKicker: "One connected journey",
    workflowTitle: "We design what customers see—and what your team needs behind it.",
    carVuKicker: "Enterprise automotive experience",
    carVuTitle: "Complex automotive workflows, understood through CarVu.",
    carVuDescription: "Our experience includes an enterprise automotive SaaS product spanning online buying and selling, public and dealer auctions, role-based dealer operations, and super-admin platform control.",
    capabilitiesKicker: "Engineering depth",
    capabilitiesTitle: "From the first enquiry to platform-wide control.",
    insightsKicker: "Automotive insights",
    insightsTitle: "Thinking beyond the interface.",
  },
  finalCta: {
    kicker: "Your next automotive project",
    title: "Ready to put it in motion?",
    description: "Tell us whether you need a focused website, a connected platform, or a complex automotive product. We’ll start with the workflow that matters most.",
    label: "Request a Proposal",
    href: "/request-a-proposal",
  },
  seo: {
    metaTitle: "Automotive Websites, Platforms & Custom Software | Zenticsys",
    metaDescription: "Zenticsys builds dealership websites, fleet systems, service platforms, parts ecommerce, marketplaces, auctions, and custom software for automotive businesses.",
    noIndex: false,
  },
};

export const fallbackNavigation: Omit<Navigation, "id"> = {
  primaryLinks: [...primaryNavigation],
  serviceLinks: [...projectNavigation],
  proposalLabel: "Request a Proposal",
  scheduleLabel: "Schedule a Call",
};

export const fallbackFooter: Omit<Footer, "id"> = {
  kicker: "Start something in motion",
  title: "Have an automotive project to build?",
  description: "Digital systems for businesses that sell, service, manage, and move vehicles.",
  ctaLabel: "Request a Proposal",
  ctaHref: "/request-a-proposal",
  linkGroups: [
    { title: "Explore", links: primaryNavigation.slice(1).map((item) => ({ ...item })) },
    { title: "Start a project", links: projectNavigation.map((item) => ({ ...item })) },
  ],
  copyright: "Zenticsys",
};

export const fallbackSiteSettings: Omit<SiteSetting, "id"> = {
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@zenticsys.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsApp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  responsePromise: "We reply to qualified enquiries as soon as practical.",
  socialLinks: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/zenticsys/" }],
};
