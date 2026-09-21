import type { CollectionConfig } from "payload";

import { adminOnly, authenticated } from "@/cms/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "filename", group: "Assets", defaultColumns: ["filename", "alt", "sourceCreator", "updatedAt"] },
  access: { create: authenticated, delete: adminOnly, read: () => true, update: authenticated },
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "card", width: 960, height: 640, fit: "cover", position: "centre" },
      { name: "wide", width: 1800, height: 1000, fit: "cover", position: "centre" },
    ],
    adminThumbnail: "card",
    focalPoint: true,
  },
  fields: [
    { name: "alt", type: "text", required: true, admin: { description: "Describe the meaningful content; use an empty visual only when the frontend deliberately marks it decorative." } },
    { name: "caption", type: "textarea" },
    { name: "sourceCreator", label: "Creator / photographer", type: "text" },
    { name: "sourceUrl", type: "text" },
    { name: "license", type: "text", required: true, defaultValue: "Owned by Zenticsys" },
    { name: "downloadedAt", type: "date" },
    { name: "usageNotes", type: "textarea", admin: { description: "Include disclosure limits, client approvals, or trademark concerns." } },
  ],
};
