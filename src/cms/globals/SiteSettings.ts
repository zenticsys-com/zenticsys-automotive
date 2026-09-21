import type { GlobalConfig } from "payload";

import { authenticated } from "@/cms/access";
import { seoFields } from "@/cms/fields";
import { revalidateGlobal } from "@/cms/hooks/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Website" },
  access: { read: () => true, update: authenticated },
  hooks: { afterChange: [revalidateGlobal("/")] },
  fields: [
    { name: "publicEmail", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "whatsApp", type: "text" },
    { name: "responsePromise", type: "text" },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    seoFields,
  ],
};
