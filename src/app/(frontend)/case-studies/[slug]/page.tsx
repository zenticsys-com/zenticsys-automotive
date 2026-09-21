import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetail } from "@/components/marketing/case-study-detail";
import { CaseStudyJsonLd } from "@/components/seo/editorial-json-ld";
import { caseStudies } from "@/content/editorial";
import { getCaseStudyBySlug } from "@/lib/cms/content";

export const dynamicParams = true;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getCaseStudyBySlug(slug);
  if (!entry) notFound();
  const canonical = `/case-studies/${entry.slug}`;
  return {
    title: entry.seo?.metaTitle || entry.listingTitle,
    description: entry.seo?.metaDescription || entry.summary,
    robots: entry.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical },
    openGraph: {
      title: `${entry.listingTitle} | Zenticsys`,
      description: entry.summary,
      url: canonical,
      type: "article",
      images: [{ url: entry.seo?.socialImage || entry.image, alt: entry.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: entry.listingTitle, description: entry.summary, images: [entry.image] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getCaseStudyBySlug(slug);
  if (!entry) notFound();
  return <><CaseStudyJsonLd entry={entry} /><CaseStudyDetail entry={entry} /></>;
}
