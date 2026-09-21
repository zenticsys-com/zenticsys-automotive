import type { CollectionConfig } from "payload";

import { adminOnly, authenticated, publishedOrAuthenticated } from "@/cms/access";
import { editorialVersions } from "@/cms/fields";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  admin: { useAsTitle: "question", group: "Reusable content" },
  access: { create: authenticated, delete: adminOnly, read: publishedOrAuthenticated, update: authenticated },
  versions: editorialVersions,
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    { name: "topic", type: "select", options: ["General", "Solutions", "Services", "Process", "Support"] },
  ],
};
