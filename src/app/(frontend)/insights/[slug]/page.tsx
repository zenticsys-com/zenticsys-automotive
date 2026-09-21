import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsightDetail } from "@/components/marketing/insight-detail";
import { InsightJsonLd } from "@/components/seo/editorial-json-ld";
import { insights } from "@/content/editorial";
import { getInsightBySlug } from "@/lib/cms/content";

export const dynamicParams = true;

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getInsightBySlug(slug);
  if (!entry) notFound();
  const canonical = `/insights/${entry.slug}`;
  return {
    title: entry.seo?.metaTitle || entry.title,
    description: entry.seo?.metaDescription || entry.excerpt,
    robots: entry.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical },
    openGraph: {
      title: `${entry.title} | Zenticsys`,
      description: entry.excerpt,
      url: canonical,
      type: "article",
      publishedTime: entry.publishedAt,
      authors: [entry.author],
      images: [{ url: entry.seo?.socialImage || entry.image, alt: entry.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: entry.title, description: entry.excerpt, images: [entry.image] },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getInsightBySlug(slug);
  if (!entry) notFound();
  return <><InsightJsonLd entry={entry} /><InsightDetail entry={entry} /></>;
}
