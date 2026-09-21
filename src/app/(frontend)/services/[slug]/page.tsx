import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/marketing/service-detail";
import { CatalogDetailJsonLd } from "@/components/seo/catalog-json-ld";
import { serviceEntries } from "@/content/solutions-services";
import { getServiceBySlug } from "@/lib/cms/content";

export const dynamicParams = true;

export function generateStaticParams() {
  return serviceEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getServiceBySlug(slug);
  if (!entry) notFound();

  const canonical = `/services/${entry.slug}`;
  return {
    title: entry.seo?.metaTitle || entry.listingTitle,
    description: entry.seo?.metaDescription || entry.summary,
    robots: entry.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical },
    openGraph: {
      title: `${entry.listingTitle} | Zenticsys`,
      description: entry.summary,
      url: canonical,
      images: [{ url: entry.seo?.socialImage || entry.image, alt: entry.imageAlt }],
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
  const entry = await getServiceBySlug(slug);
  if (!entry) notFound();

  return (
    <>
      <CatalogDetailJsonLd entry={entry} />
      <ServiceDetail entry={entry} />
    </>
  );
}
