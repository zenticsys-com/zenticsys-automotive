import "server-only";

import config from "@payload-config";
import { cache } from "react";
import { getPayload } from "payload";

import { caseStudies as fallbackCaseStudies, insights as fallbackInsights } from "@/content/editorial";
import type { CaseStudyEntry, InsightEntry } from "@/content/editorial";
import { fallbackFooter, fallbackHomepage, fallbackNavigation, fallbackSiteSettings } from "@/content/cms-fallback";
import {
  serviceEntries as fallbackServices,
  solutionEntries as fallbackSolutions,
} from "@/content/solutions-services";
import type { CatalogEntry, CatalogKind } from "@/content/solutions-services";
import { isCmsFullyConfigured } from "@/lib/cms/configuration";
import type { CaseStudy, Insight, Media, Page, Service, Solution } from "@/payload-types";
import type { Footer, Homepage, Navigation, SiteSetting } from "@/payload-types";

let payloadPromise: ReturnType<typeof getPayload> | undefined;

async function getCmsPayload() {
  try {
    payloadPromise ??= getPayload({ config });
    return await payloadPromise;
  } catch (error) {
    // Do not permanently cache a transient database or provider failure.
    payloadPromise = undefined;
    throw error;
  }
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function mergeDefined<T extends object>(fallback: T, value: Partial<T> | null | undefined): T {
  const merged = { ...fallback } as Record<string, unknown>;
  if (!value) return merged as T;

  for (const [key, candidate] of Object.entries(value)) {
    if (candidate !== undefined && candidate !== null && candidate !== "") {
      merged[key] = candidate;
    }
  }

  return merged as T;
}

function validLinks(
  value: Array<{ href?: string | null; label?: string | null }> | null | undefined,
  fallback: Array<{ href: string; label: string }>,
) {
  const links = value?.filter(
    (link): link is { href: string; label: string } => hasText(link?.href) && hasText(link?.label),
  );
  return links?.length ? links : fallback.map((link) => ({ ...link }));
}

function mergeHomepage(doc: Homepage): Homepage {
  return {
    ...doc,
    hero: mergeDefined(fallbackHomepage.hero, doc.hero),
    sections: mergeDefined(fallbackHomepage.sections, doc.sections),
    finalCta: mergeDefined(fallbackHomepage.finalCta, doc.finalCta),
    seo: mergeDefined(fallbackHomepage.seo || {}, doc.seo),
  } as Homepage;
}

function mergeNavigation(doc: Navigation): Navigation {
  return {
    ...fallbackNavigation,
    ...doc,
    primaryLinks: validLinks(doc.primaryLinks, fallbackNavigation.primaryLinks || []),
    serviceLinks: validLinks(doc.serviceLinks, fallbackNavigation.serviceLinks || []),
    proposalLabel: hasText(doc.proposalLabel) ? doc.proposalLabel : fallbackNavigation.proposalLabel,
    scheduleLabel: hasText(doc.scheduleLabel) ? doc.scheduleLabel : fallbackNavigation.scheduleLabel,
  } as Navigation;
}

function mergeFooter(doc: Footer): Footer {
  const linkGroups = doc.linkGroups
    ?.map((group) => ({
      title: hasText(group?.title) ? group.title : "",
      links: validLinks(group?.links, []),
    }))
    .filter((group) => hasText(group.title) && group.links.length > 0);

  return {
    ...fallbackFooter,
    ...doc,
    kicker: hasText(doc.kicker) ? doc.kicker : fallbackFooter.kicker,
    title: hasText(doc.title) ? doc.title : fallbackFooter.title,
    description: hasText(doc.description) ? doc.description : fallbackFooter.description,
    ctaLabel: hasText(doc.ctaLabel) ? doc.ctaLabel : fallbackFooter.ctaLabel,
    ctaHref: hasText(doc.ctaHref) ? doc.ctaHref : fallbackFooter.ctaHref,
    copyright: hasText(doc.copyright) ? doc.copyright : fallbackFooter.copyright,
    linkGroups: linkGroups?.length ? linkGroups : fallbackFooter.linkGroups,
  } as Footer;
}

function mergeSiteSettings(doc: SiteSetting): SiteSetting {
  return {
    ...fallbackSiteSettings,
    ...doc,
    publicEmail: hasText(doc.publicEmail) ? doc.publicEmail : fallbackSiteSettings.publicEmail,
    responsePromise: hasText(doc.responsePromise) ? doc.responsePromise : fallbackSiteSettings.responsePromise,
    socialLinks: validLinks(doc.socialLinks, fallbackSiteSettings.socialLinks || []),
    seo: mergeDefined(fallbackSiteSettings.seo || {}, doc.seo),
  } as SiteSetting;
}

function imageUrl(image: string | Media | null | undefined, fallback?: string | null) {
  return typeof image === "object" && image?.url ? image.url : fallback || "/images/og-default.jpg";
}

function optionalImageUrl(image: string | Media | null | undefined) {
  return typeof image === "object" && image?.url ? image.url : undefined;
}

function catalogDocumentToEntry(doc: Solution | Service, kind: CatalogKind): CatalogEntry {
  return {
    kind,
    slug: doc.slug,
    title: doc.title,
    listingTitle: doc.listingTitle,
    kicker: doc.kicker,
    summary: doc.summary,
    audience: doc.audience,
    image: imageUrl(doc.image, doc.fallbackImage),
    imageAlt: doc.imageAlt,
    imagePosition: doc.imagePosition || "center center",
    challengeTitle: doc.challengeTitle,
    challenge: doc.challenge,
    painPoints: doc.painPoints?.map(({ text }) => text) || [],
    capabilities: doc.capabilities || [],
    workflow: doc.workflow || [],
    visual: {
      eyebrow: doc.visual?.eyebrow || "",
      title: doc.visual?.title || "",
      primaryLabel: doc.visual?.primaryLabel || "",
      primaryValue: doc.visual?.primaryValue || "",
      rows: doc.visual?.rows || [],
    },
    integrations: doc.integrations?.map(({ text }) => text) || [],
    outcomes: doc.outcomes || [],
    process: doc.process || [],
    relatedSlugs: doc.relatedSlugs?.map(({ slug }) => slug) || [],
    faqs: doc.faqs || [],
    seo: {
      metaTitle: doc.seo?.metaTitle,
      metaDescription: doc.seo?.metaDescription,
      socialImage: optionalImageUrl(doc.seo?.socialImage),
      noIndex: doc.seo?.noIndex,
    },
  };
}

function caseDocumentToEntry(doc: CaseStudy): CaseStudyEntry {
  return {
    slug: doc.slug,
    title: doc.title,
    listingTitle: doc.listingTitle,
    kicker: doc.kicker,
    summary: doc.summary,
    image: imageUrl(doc.image, doc.fallbackImage),
    imageAlt: doc.imageAlt,
    imagePosition: doc.imagePosition || "center center",
    facts: doc.facts || [],
    roles: doc.roles || [],
    workflows: doc.workflows || [],
    capabilities: doc.capabilities || [],
    technicalNotes: doc.technicalNotes || [],
    proof: doc.proof || [],
    seo: {
      metaTitle: doc.seo?.metaTitle,
      metaDescription: doc.seo?.metaDescription,
      socialImage: optionalImageUrl(doc.seo?.socialImage),
      noIndex: doc.seo?.noIndex,
    },
  };
}

function insightDocumentToEntry(doc: Insight): InsightEntry {
  return {
    slug: doc.slug,
    title: doc.title,
    shortTitle: doc.shortTitle,
    excerpt: doc.excerpt,
    category: doc.category,
    author: doc.author,
    publishedAt: doc.publishedAt,
    displayDate: doc.displayDate,
    readingTime: doc.readingTime,
    image: imageUrl(doc.image, doc.fallbackImage),
    imageAlt: doc.imageAlt,
    imagePosition: doc.imagePosition || "center center",
    introduction: doc.introduction?.map(({ text }) => text) || [],
    sections: doc.sections?.map((section) => ({
      id: section.id,
      title: section.title,
      paragraphs: section.paragraphs?.map(({ text }) => text) || [],
      points: section.points?.map(({ text }) => text) || [],
    })) || [],
    takeaways: doc.takeaways?.map(({ text }) => text) || [],
    relatedSlugs: doc.relatedSlugs?.map(({ slug }) => slug) || [],
    seo: {
      metaTitle: doc.seo?.metaTitle,
      metaDescription: doc.seo?.metaDescription,
      socialImage: optionalImageUrl(doc.seo?.socialImage),
      noIndex: doc.seo?.noIndex,
    },
  };
}

async function safelyFind<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  if (!isCmsFullyConfigured()) return fallback;
  try {
    return await run();
  } catch (error) {
    console.error("CMS read failed; serving approved repository content.", error);
    return fallback;
  }
}

export const getSolutions = cache(() =>
  safelyFind(async () => {
    const payload = await getCmsPayload();
    const result = await payload.find({ collection: "solutions", draft: false, limit: 100, overrideAccess: false, sort: "createdAt" });
    return result.docs.map((doc) => catalogDocumentToEntry(doc, "solution"));
  }, [...fallbackSolutions]),
);

export const getServices = cache(() =>
  safelyFind(async () => {
    const payload = await getCmsPayload();
    const result = await payload.find({ collection: "services", draft: false, limit: 100, overrideAccess: false, sort: "createdAt" });
    return result.docs.map((doc) => catalogDocumentToEntry(doc, "service"));
  }, [...fallbackServices]),
);

export const getCaseStudies = cache(() =>
  safelyFind(async () => {
    const payload = await getCmsPayload();
    const result = await payload.find({ collection: "case-studies", draft: false, limit: 100, overrideAccess: false, sort: "-createdAt" });
    return result.docs.map(caseDocumentToEntry);
  }, [...fallbackCaseStudies]),
);

export const getInsights = cache(() =>
  safelyFind(async () => {
    const payload = await getCmsPayload();
    const result = await payload.find({ collection: "insights", draft: false, limit: 100, overrideAccess: false, sort: "-publishedAt" });
    return result.docs.map(insightDocumentToEntry);
  }, [...fallbackInsights]),
);

export async function getSolutionBySlug(slug: string) {
  return (await getSolutions()).find((entry) => entry.slug === slug);
}

export async function getServiceBySlug(slug: string) {
  return (await getServices()).find((entry) => entry.slug === slug);
}

export async function getCaseStudyBySlug(slug: string) {
  return (await getCaseStudies()).find((entry) => entry.slug === slug);
}

export async function getInsightBySlug(slug: string) {
  return (await getInsights()).find((entry) => entry.slug === slug);
}

export const getHomepage = cache(() => safelyFind(async () => {
  const payload = await getCmsPayload();
  return mergeHomepage(await payload.findGlobal({ slug: "homepage", overrideAccess: false }));
}, fallbackHomepage as Homepage));

export const getNavigation = cache(() => safelyFind(async () => {
  const payload = await getCmsPayload();
  return mergeNavigation(await payload.findGlobal({ slug: "navigation", overrideAccess: false }));
}, fallbackNavigation as Navigation));

export const getFooter = cache(() => safelyFind(async () => {
  const payload = await getCmsPayload();
  return mergeFooter(await payload.findGlobal({ slug: "footer", overrideAccess: false }));
}, fallbackFooter as Footer));

export const getSiteSettings = cache(() => safelyFind(async () => {
  const payload = await getCmsPayload();
  return mergeSiteSettings(await payload.findGlobal({ slug: "site-settings", overrideAccess: false }));
}, fallbackSiteSettings as SiteSetting));

export const getPageBySlug = cache(async (slug: string): Promise<Page | undefined> => {
  if (!isCmsFullyConfigured()) return undefined;
  try {
    const payload = await getCmsPayload();
    const result = await payload.find({
      collection: "pages",
      draft: false,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    });
    return result.docs[0];
  } catch (error) {
    console.error("CMS page read failed.", error);
    return undefined;
  }
});

export const getManagedPages = cache(async (): Promise<Page[]> => {
  if (!isCmsFullyConfigured()) return [];
  try {
    const payload = await getCmsPayload();
    const result = await payload.find({
      collection: "pages",
      draft: false,
      limit: 100,
      overrideAccess: false,
      sort: "slug",
    });
    return result.docs;
  } catch (error) {
    console.error("CMS sitemap page read failed.", error);
    return [];
  }
});
