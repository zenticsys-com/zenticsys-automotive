import type { CollectionConfig } from "payload";

import { adminOnly, authenticated, publishedOrAuthenticated } from "@/cms/access";
import { editorialVersions } from "@/cms/fields";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "attribution", group: "Reusable content" },
  access: { create: authenticated, delete: adminOnly, read: publishedOrAuthenticated, update: authenticated },
  versions: editorialVersions,
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "attribution", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "company", type: "text" },
    { name: "approvalReference", type: "textarea", required: true, admin: { description: "Record who approved publication and where that approval is stored." } },
  ],
};
