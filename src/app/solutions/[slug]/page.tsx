import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionDetail } from "@/components/marketing/catalog-detail";
import { CatalogDetailJsonLd } from "@/components/seo/catalog-json-ld";
import { getSolution, solutionEntries } from "@/content/solutions-services";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getSolution(slug);
  if (!entry) return {};

  const canonical = `/solutions/${entry.slug}`;
  return {
    title: entry.listingTitle,
    description: entry.summary,
    alternates: { canonical },
    openGraph: {
      title: `${entry.listingTitle} | Zenticsys`,
      description: entry.summary,
      url: canonical,
      images: [{ url: entry.image, alt: entry.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: entry.listingTitle, description: entry.summary },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getSolution(slug);
  if (!entry) notFound();

  return (
    <>
      <CatalogDetailJsonLd entry={entry} />
      <SolutionDetail entry={entry} />
    </>
  );
}
