import type { GlobalConfig } from "payload";

import { authenticated } from "@/cms/access";
import { seoFields } from "@/cms/fields";
import { revalidateGlobal } from "@/cms/hooks/revalidate";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: { group: "Website" },
  access: { read: () => true, update: authenticated },
  hooks: { afterChange: [revalidateGlobal("/")] },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "kicker", type: "text", required: true },
        { name: "title", type: "textarea", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "primaryLabel", type: "text", required: true },
        { name: "primaryHref", type: "text", required: true },
        { name: "secondaryLabel", type: "text", required: true },
        { name: "secondaryHref", type: "text", required: true },
        { name: "scrollLabel", type: "text", required: true },
      ],
    },
    {
      name: "sections",
      type: "group",
      fields: [
        { name: "audienceKicker", type: "text", required: true },
        { name: "audienceTitle", type: "textarea", required: true },
        { name: "solutionsKicker", type: "text", required: true },
        { name: "solutionsTitle", type: "textarea", required: true },
        { name: "workflowKicker", type: "text", required: true },
        { name: "workflowTitle", type: "textarea", required: true },
        { name: "carVuKicker", type: "text", required: true },
        { name: "carVuTitle", type: "textarea", required: true },
        { name: "carVuDescription", type: "textarea", required: true },
        { name: "capabilitiesKicker", type: "text", required: true },
        { name: "capabilitiesTitle", type: "textarea", required: true },
        { name: "insightsKicker", type: "text", required: true },
        { name: "insightsTitle", type: "textarea", required: true },
      ],
    },
    {
      name: "finalCta",
      type: "group",
      fields: [
        { name: "kicker", type: "text", required: true },
        { name: "title", type: "textarea", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    seoFields,
  ],
};
