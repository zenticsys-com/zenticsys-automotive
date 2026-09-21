import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CmsPage } from "@/components/marketing/cms-page";
import { getPageBySlug } from "@/lib/cms/content";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function ManagedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  return <CmsPage page={page} />;
}
