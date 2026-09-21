import type { Block, CollectionConfig } from "payload";

import { adminOnly, authenticated, publishedOrAuthenticated } from "@/cms/access";
import { editorialVersions, seoFields, slugField } from "@/cms/fields";
import { revalidateCollection, revalidateCollectionDelete } from "@/cms/hooks/revalidate";

const IntroBlock: Block = {
  slug: "intro",
  labels: { singular: "Editorial introduction", plural: "Editorial introductions" },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
  ],
};

const FeatureGridBlock: Block = {
  slug: "featureGrid",
  labels: { singular: "Controlled feature grid", plural: "Controlled feature grids" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "intro", type: "textarea" },
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
};

const ImageTextBlock: Block = {
  slug: "imageText",
  labels: { singular: "Image and text", plural: "Image and text sections" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "imageSide", type: "select", defaultValue: "right", options: ["left", "right"] },
  ],
};

const CallToActionBlock: Block = {
  slug: "callToAction",
  labels: { singular: "Call to action", plural: "Calls to action" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "title", group: "Site pages", defaultColumns: ["title", "slug", "_status", "updatedAt"] },
  access: { create: authenticated, delete: adminOnly, read: publishedOrAuthenticated, update: authenticated },
  versions: editorialVersions,
  hooks: {
    afterChange: [revalidateCollection("")],
    afterDelete: [revalidateCollectionDelete("")],
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField,
    { name: "layout", type: "blocks", blocks: [IntroBlock, FeatureGridBlock, ImageTextBlock, CallToActionBlock], maxRows: 12 },
    seoFields,
  ],
};
