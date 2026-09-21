import type { Field } from "payload";

export const slugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar", description: "Lowercase letters, numbers, and hyphens only." },
  validate: (value: unknown) =>
    typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
      ? true
      : "Use a URL-safe slug with lowercase letters, numbers, and hyphens.",
};

export const imageFields: Field[] = [
  { name: "image", type: "upload", relationTo: "media" },
  {
    name: "fallbackImage",
    label: "Repository image path",
    type: "text",
    admin: { description: "Used while approved repository assets are being migrated to R2." },
  },
  { name: "imageAlt", type: "text", required: true },
  { name: "imagePosition", type: "text", defaultValue: "center center" },
];

export const titleDescriptionArray = (name: string, label: string): Field => ({
  name,
  label,
  type: "array",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
  ],
});

export const textList = (name: string, label: string): Field => ({
  name,
  label,
  type: "array",
  fields: [{ name: "text", type: "text", required: true }],
});

export const seoFields: Field = {
  name: "seo",
  type: "group",
  fields: [
    { name: "metaTitle", type: "text", maxLength: 65 },
    { name: "metaDescription", type: "textarea", maxLength: 170 },
    { name: "socialImage", type: "upload", relationTo: "media" },
    { name: "noIndex", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};

export const editorialVersions = {
  drafts: { autosave: { interval: 1500 } },
  maxPerDoc: 30,
} as const;
