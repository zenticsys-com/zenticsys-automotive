import type { CollectionConfig, Field } from "payload";

import { adminOnly, authenticated, publishedOrAuthenticated } from "@/cms/access";
import { editorialVersions, imageFields, seoFields, slugField, textList, titleDescriptionArray } from "@/cms/fields";
import { revalidateCollection, revalidateCollectionDelete } from "@/cms/hooks/revalidate";

const visualFields: Field = {
  name: "visual",
  type: "group",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "primaryLabel", type: "text" },
    { name: "primaryValue", type: "text" },
    {
      name: "rows",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "state", type: "text", required: true },
      ],
    },
  ],
};

function createCatalogCollection({
  slug,
  singular,
  listingPath,
}: {
  slug: "solutions" | "services";
  singular: string;
  listingPath: string;
}): CollectionConfig {
  return {
    slug,
    labels: { singular, plural: `${singular}s` },
    admin: {
      useAsTitle: "listingTitle",
      group: "Automotive content",
      defaultColumns: ["listingTitle", "slug", "_status", "updatedAt"],
      livePreview: { url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${listingPath}/${data.slug || ""}` },
    },
    access: { create: authenticated, delete: adminOnly, read: publishedOrAuthenticated, update: authenticated },
    versions: editorialVersions,
    hooks: {
      afterChange: [revalidateCollection(listingPath)],
      afterDelete: [revalidateCollectionDelete(listingPath)],
    },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "listingTitle", type: "text", required: true },
      slugField,
      { name: "kicker", type: "text", required: true },
      { name: "summary", type: "textarea", required: true },
      { name: "audience", type: "textarea", required: true },
      ...imageFields,
      { name: "challengeTitle", type: "text", required: true },
      { name: "challenge", type: "textarea", required: true },
      textList("painPoints", "Pain points"),
      titleDescriptionArray("capabilities", "Capabilities"),
      titleDescriptionArray("workflow", "Workflow"),
      visualFields,
      textList("integrations", "Integrations"),
      titleDescriptionArray("outcomes", "Outcomes"),
      titleDescriptionArray("process", "Process"),
      {
        name: "relatedSlugs",
        label: "Related solution/service slugs",
        type: "array",
        fields: [{ name: "slug", type: "text", required: true }],
      },
      {
        name: "faqs",
        label: "Page-specific FAQs",
        type: "array",
        fields: [
          { name: "question", type: "text", required: true },
          { name: "answer", type: "textarea", required: true },
        ],
      },
      seoFields,
    ],
  };
}

export const Solutions = createCatalogCollection({ slug: "solutions", singular: "Solution", listingPath: "/solutions" });
export const Services = createCatalogCollection({ slug: "services", singular: "Service", listingPath: "/services" });
