import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetail } from "@/components/marketing/case-study-detail";
import { CaseStudyJsonLd } from "@/components/seo/editorial-json-ld";
import { caseStudies, getCaseStudy } from "@/content/editorial";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) return {};
  const canonical = `/case-studies/${entry.slug}`;
  return {
    title: entry.listingTitle,
    description: entry.summary,
    alternates: { canonical },
    openGraph: {
      title: `${entry.listingTitle} | Zenticsys`,
      description: entry.summary,
      url: canonical,
      type: "article",
      images: [{ url: entry.image, alt: entry.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: entry.listingTitle, description: entry.summary, images: [entry.image] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) notFound();
  return <><CaseStudyJsonLd entry={entry} /><CaseStudyDetail entry={entry} /></>;
}
