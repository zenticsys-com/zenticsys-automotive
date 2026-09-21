import type { GlobalConfig } from "payload";

import { authenticated } from "@/cms/access";
import { revalidateGlobal } from "@/cms/hooks/revalidate";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: { group: "Website" },
  access: { read: () => true, update: authenticated },
  hooks: { afterChange: [revalidateGlobal("/")] },
  fields: [
    { name: "kicker", type: "text", required: true },
    { name: "title", type: "textarea", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "ctaLabel", type: "text", required: true },
    { name: "ctaHref", type: "text", required: true },
    {
      name: "linkGroups",
      type: "array",
      maxRows: 4,
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "links",
          type: "array",
          maxRows: 10,
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    { name: "copyright", type: "text", required: true },
  ],
};
