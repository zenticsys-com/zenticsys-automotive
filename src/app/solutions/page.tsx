import type { Metadata } from "next";

import { CatalogListing } from "@/components/marketing/catalog-listing";
import { CatalogListingJsonLd } from "@/components/seo/catalog-json-ld";
import { solutionEntries } from "@/content/solutions-services";

export const metadata: Metadata = {
  title: "Automotive Digital Solutions",
  description:
    "Explore dealership websites, fleet systems, service platforms, parts ecommerce, vehicle marketplaces, auction platforms, and custom automotive software.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Automotive Digital Solutions | Zenticsys",
    description: "Digital systems for businesses that sell, service, manage, and move vehicles.",
    url: "/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <CatalogListingJsonLd entries={solutionEntries} kind="solutions" />
      <CatalogListing
        entries={solutionEntries}
        collection="solutions"
        eyebrow="Automotive solutions"
        title="Digital products across the automotive journey."
        intro="From a dealership website to a multi-role auction or fleet platform, we design around the operation behind the screen."
      />
    </>
  );
}

