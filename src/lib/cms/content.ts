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
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "solutions", draft: false, limit: 100, overrideAccess: false, sort: "createdAt" });
    return result.docs.map((doc) => catalogDocumentToEntry(doc, "solution"));
  }, [...fallbackSolutions]),
);

export const getServices = cache(() =>
  safelyFind(async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "services", draft: false, limit: 100, overrideAccess: false, sort: "createdAt" });
    return result.docs.map((doc) => catalogDocumentToEntry(doc, "service"));
  }, [...fallbackServices]),
);

export const getCaseStudies = cache(() =>
  safelyFind(async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "case-studies", draft: false, limit: 100, overrideAccess: false, sort: "-createdAt" });
    return result.docs.map(caseDocumentToEntry);
  }, [...fallbackCaseStudies]),
);

export const getInsights = cache(() =>
  safelyFind(async () => {
    const payload = await getPayload({ config });
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
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "homepage", overrideAccess: false });
}, fallbackHomepage as Homepage));

export const getNavigation = cache(() => safelyFind(async () => {
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "navigation", overrideAccess: false });
}, fallbackNavigation as Navigation));

export const getFooter = cache(() => safelyFind(async () => {
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "footer", overrideAccess: false });
}, fallbackFooter as Footer));

export const getSiteSettings = cache(() => safelyFind(async () => {
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "site-settings", overrideAccess: false });
}, fallbackSiteSettings as SiteSetting));

export const getPageBySlug = cache(async (slug: string): Promise<Page | undefined> => {
  if (!isCmsFullyConfigured()) return undefined;
  try {
    const payload = await getPayload({ config });
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
