import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalogDetail } from "@/components/marketing/catalog-detail";
import { CatalogDetailJsonLd } from "@/components/seo/catalog-json-ld";
import { getService, serviceEntries } from "@/content/solutions-services";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getService(slug);
  if (!entry) return {};

  const canonical = `/services/${entry.slug}`;
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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getService(slug);
  if (!entry) notFound();

  return (
    <>
      <CatalogDetailJsonLd entry={entry} />
      <CatalogDetail entry={entry} />
    </>
  );
}

