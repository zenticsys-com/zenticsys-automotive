import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CmsPage } from "@/components/marketing/cms-page";
import { getPageBySlug } from "@/lib/cms/content";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  const title = page.seo?.metaTitle || page.title;
  const description = page.seo?.metaDescription || undefined;
  const canonical = `/${page.slug}`;
  return {
    title,
    description,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ManagedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  return <CmsPage page={page} />;
}
