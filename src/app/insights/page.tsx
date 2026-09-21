import type { Metadata } from "next";

import { InsightListing } from "@/components/marketing/editorial-listings";
import { EditorialListingJsonLd } from "@/components/seo/editorial-json-ld";
import { insights } from "@/content/editorial";

export const metadata: Metadata = {
  title: "Automotive Technology Insights",
  description: "Practical perspectives on dealership websites, fleet software, service platforms, and connected automotive workflows.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Automotive Technology Insights | Zenticsys",
    description: "Product, workflow, and technology thinking for modern automotive businesses.",
    url: "/insights",
  },
};

export default function InsightsPage() {
  return <><EditorialListingJsonLd entries={insights} collection="insights" /><InsightListing entries={insights} /></>;
}
