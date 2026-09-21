import type { Metadata } from "next";

import { CaseStudyListing } from "@/components/marketing/editorial-listings";
import { EditorialListingJsonLd } from "@/components/seo/editorial-json-ld";
import { getCaseStudies } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Automotive Case Studies",
  description: "Explore Zenticsys experience designing and building connected automotive platforms, workflows, auctions, dealer tools, and administration.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Automotive Case Studies | Zenticsys",
    description: "Selected automotive product and platform experience from Zenticsys.",
    url: "/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automotive Case Studies | Zenticsys",
    description: "Selected automotive product and platform experience from Zenticsys.",
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <EditorialListingJsonLd entries={caseStudies} collection="case-studies" />
      <CaseStudyListing entries={caseStudies} />
    </>
  );
}
