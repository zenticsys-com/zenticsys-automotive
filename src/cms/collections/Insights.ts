import type { CollectionConfig } from "payload";

import { adminOnly, authenticated, publishedOrAuthenticated } from "@/cms/access";
import { editorialVersions, imageFields, seoFields, slugField, textList } from "@/cms/fields";
import { revalidateCollection, revalidateCollectionDelete } from "@/cms/hooks/revalidate";

export const Insights: CollectionConfig = {
  slug: "insights",
  admin: {
    useAsTitle: "title",
    group: "Automotive content",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    livePreview: { url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/insights/${data.slug || ""}` },
  },
  access: { create: authenticated, delete: adminOnly, read: publishedOrAuthenticated, update: authenticated },
  versions: editorialVersions,
  hooks: {
    afterChange: [revalidateCollection("/insights")],
    afterDelete: [revalidateCollectionDelete("/insights")],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "shortTitle", type: "text", required: true },
    slugField,
    { name: "excerpt", type: "textarea", required: true },
    { name: "category", type: "text", required: true },
    { name: "author", type: "text", required: true, defaultValue: "Zenticsys" },
    { name: "publishedAt", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "displayDate", type: "text", required: true },
    { name: "readingTime", type: "text", required: true },
    ...imageFields,
    textList("introduction", "Introduction paragraphs"),
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "id", type: "text", required: true },
        { name: "title", type: "text", required: true },
        {
          name: "paragraphs",
          type: "array",
          fields: [{ name: "text", type: "textarea", required: true }],
        },
        {
          name: "points",
          type: "array",
          fields: [{ name: "text", type: "text", required: true }],
        },
      ],
    },
    textList("takeaways", "Key takeaways"),
    { name: "relatedSlugs", type: "array", fields: [{ name: "slug", type: "text", required: true }] },
    seoFields,
  ],
};
