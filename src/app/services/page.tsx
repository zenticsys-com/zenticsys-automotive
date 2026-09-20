import type { Metadata } from "next";

import { CatalogListing } from "@/components/marketing/catalog-listing";
import { CatalogListingJsonLd } from "@/components/seo/catalog-json-ld";
import { serviceEntries } from "@/content/solutions-services";

export const metadata: Metadata = {
  title: "Automotive Design & Development Services",
  description:
    "Automotive website development, custom software, UI/UX design, mobile apps, integrations, and long-term platform maintenance.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Automotive Design & Development Services | Zenticsys",
    description: "The design and engineering capabilities behind dependable automotive digital products.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <CatalogListingJsonLd entries={serviceEntries} kind="services" />
      <CatalogListing
        entries={serviceEntries}
        collection="services"
        eyebrow="Automotive services"
        title="The capabilities behind the product."
        intro="Automotive-focused strategy, design, engineering, integration, and support—from the first workflow to long-term operation."
      />
    </>
  );
}

