import type { MetadataRoute } from "next";

import { getCaseStudies, getInsights, getManagedPages, getServices, getSolutions } from "@/lib/cms/content";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/request-a-proposal", changeFrequency: "yearly", priority: 0.7 },
  { path: "/schedule-a-call", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
] as const;

function absoluteUrl(path: string) {
  return new URL(path || "/", siteConfig.url).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [solutions, services, cases, insights, pages] = await Promise.all([
    getSolutions(),
    getServices(),
    getCaseStudies(),
    getInsights(),
    getManagedPages(),
  ]);

  const urls: MetadataRoute.Sitemap = staticRoutes
    .filter((route) => {
      if (!route.path) return true;
      const managedPage = pages.find(({ slug }) => `/${slug}` === route.path);
      return !managedPage?.seo?.noIndex;
    })
    .map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  for (const entry of solutions) {
    if (!entry.seo?.noIndex) urls.push({ url: absoluteUrl(`/solutions/${entry.slug}`), changeFrequency: "monthly", priority: 0.8 });
  }
  for (const entry of services) {
    if (!entry.seo?.noIndex) urls.push({ url: absoluteUrl(`/services/${entry.slug}`), changeFrequency: "monthly", priority: 0.8 });
  }
  for (const entry of cases) {
    if (!entry.seo?.noIndex) urls.push({ url: absoluteUrl(`/case-studies/${entry.slug}`), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const entry of insights) {
    if (!entry.seo?.noIndex) urls.push({ url: absoluteUrl(`/insights/${entry.slug}`), lastModified: entry.publishedAt, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const page of pages) {
    if (!page.seo?.noIndex && !staticRoutes.some(({ path }) => path === `/${page.slug}`)) {
      urls.push({ url: absoluteUrl(`/${page.slug}`), lastModified: page.updatedAt || undefined, changeFrequency: "monthly", priority: 0.5 });
    }
  }

  return urls;
}
