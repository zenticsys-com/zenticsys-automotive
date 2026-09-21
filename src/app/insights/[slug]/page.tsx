import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsightDetail } from "@/components/marketing/insight-detail";
import { InsightJsonLd } from "@/components/seo/editorial-json-ld";
import { getInsight, insights } from "@/content/editorial";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getInsight(slug);
  if (!entry) return {};
  const canonical = `/insights/${entry.slug}`;
  return {
    title: entry.title,
    description: entry.excerpt,
    alternates: { canonical },
    openGraph: {
      title: `${entry.title} | Zenticsys`,
      description: entry.excerpt,
      url: canonical,
      type: "article",
      publishedTime: entry.publishedAt,
      authors: [entry.author],
      images: [{ url: entry.image, alt: entry.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: entry.title, description: entry.excerpt, images: [entry.image] },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getInsight(slug);
  if (!entry) notFound();
  return <><InsightJsonLd entry={entry} /><InsightDetail entry={entry} /></>;
}
