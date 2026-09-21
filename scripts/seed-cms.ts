import config from "@payload-config";
import { getPayload } from "payload";

import { caseStudies, insights } from "@/content/editorial";
import { serviceEntries, solutionEntries } from "@/content/solutions-services";
import { fallbackFooter, fallbackHomepage, fallbackNavigation, fallbackSiteSettings } from "@/content/cms-fallback";
import { isCmsFullyConfigured } from "@/lib/cms/configuration";

type SeedCollection = "solutions" | "services" | "case-studies" | "insights";

if (!isCmsFullyConfigured()) {
  throw new Error("CMS seed requires PAYLOAD_SECRET, DATABASE_URI, and all R2 environment variables.");
}

const payload = await getPayload({ config });

async function upsert(collection: SeedCollection, slug: string, data: Record<string, unknown>) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, overrideAccess: true });
  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data: data as never, overrideAccess: true });
    return;
  }
  await payload.create({ collection, data: data as never, overrideAccess: true });
}

function catalogData(entry: (typeof solutionEntries)[number] | (typeof serviceEntries)[number]) {
  return {
    ...entry,
    fallbackImage: entry.image,
    image: undefined,
    painPoints: entry.painPoints.map((text) => ({ text })),
    capabilities: entry.capabilities.map((item) => ({ ...item })),
    workflow: entry.workflow.map((item) => ({ ...item })),
    visual: { ...entry.visual, rows: entry.visual.rows.map((row) => ({ ...row })) },
    integrations: entry.integrations.map((text) => ({ text })),
    outcomes: entry.outcomes.map((item) => ({ ...item })),
    process: entry.process.map((item) => ({ ...item })),
    relatedSlugs: entry.relatedSlugs.map((relatedSlug) => ({ slug: relatedSlug })),
    faqs: entry.faqs.map((item) => ({ ...item })),
    _status: "published",
  };
}

for (const entry of solutionEntries) await upsert("solutions", entry.slug, catalogData(entry));
for (const entry of serviceEntries) await upsert("services", entry.slug, catalogData(entry));

for (const entry of caseStudies) {
  await upsert("case-studies", entry.slug, {
    ...entry,
    fallbackImage: entry.image,
    image: undefined,
    challengeTitle: "The product challenge",
    challenge: entry.summary,
    facts: entry.facts.map((item) => ({ ...item })),
    roles: entry.roles.map((item) => ({ ...item })),
    workflows: entry.workflows.map((item) => ({ ...item })),
    capabilities: entry.capabilities.map((item) => ({ ...item })),
    technicalNotes: entry.technicalNotes.map((item) => ({ ...item })),
    proof: entry.proof.map((item) => ({ ...item })),
    _status: "published",
  });
}

for (const entry of insights) {
  await upsert("insights", entry.slug, {
    ...entry,
    fallbackImage: entry.image,
    image: undefined,
    introduction: entry.introduction.map((text) => ({ text })),
    sections: entry.sections.map((section) => ({
      id: section.id,
      title: section.title,
      paragraphs: section.paragraphs.map((text) => ({ text })),
      points: section.points?.map((text) => ({ text })) || [],
    })),
    takeaways: entry.takeaways.map((text) => ({ text })),
    relatedSlugs: entry.relatedSlugs.map((relatedSlug) => ({ slug: relatedSlug })),
    _status: "published",
  });
}

await payload.updateGlobal({ slug: "homepage", data: fallbackHomepage as never, overrideAccess: true });
await payload.updateGlobal({ slug: "navigation", data: fallbackNavigation as never, overrideAccess: true });
await payload.updateGlobal({ slug: "footer", data: fallbackFooter as never, overrideAccess: true });
await payload.updateGlobal({ slug: "site-settings", data: fallbackSiteSettings as never, overrideAccess: true });

payload.logger.info("CMS seed complete. Existing records were updated by slug; no duplicates were created.");
await payload.destroy();
