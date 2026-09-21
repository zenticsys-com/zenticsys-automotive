import type { CollectionConfig } from "payload";

import { adminOnly, authenticated, publishedOrAuthenticated } from "@/cms/access";
import { editorialVersions, imageFields, seoFields, slugField, titleDescriptionArray } from "@/cms/fields";
import { revalidateCollection, revalidateCollectionDelete } from "@/cms/hooks/revalidate";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "listingTitle",
    group: "Automotive content",
    defaultColumns: ["listingTitle", "slug", "_status", "updatedAt"],
    livePreview: { url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/case-studies/${data.slug || ""}` },
  },
  access: { create: authenticated, delete: adminOnly, read: publishedOrAuthenticated, update: authenticated },
  versions: editorialVersions,
  hooks: {
    afterChange: [revalidateCollection("/case-studies")],
    afterDelete: [revalidateCollectionDelete("/case-studies")],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "listingTitle", type: "text", required: true },
    slugField,
    { name: "kicker", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    ...imageFields,
    {
      name: "facts",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    { name: "challengeTitle", type: "text", defaultValue: "The challenge" },
    { name: "challenge", type: "textarea", required: true },
    titleDescriptionArray("roles", "Users and roles"),
    titleDescriptionArray("workflows", "Workflows"),
    titleDescriptionArray("capabilities", "Capabilities"),
    titleDescriptionArray("technicalNotes", "Technical notes"),
    titleDescriptionArray("proof", "Approved proof / results"),
    { name: "testimonial", type: "relationship", relationTo: "testimonials" },
    seoFields,
  ],
};
