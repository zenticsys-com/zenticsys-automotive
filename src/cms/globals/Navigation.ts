import type { Field, GlobalConfig } from "payload";

import { authenticated } from "@/cms/access";
import { revalidateGlobal } from "@/cms/hooks/revalidate";

const linkFields: Field[] = [
  { name: "label", type: "text", required: true },
  { name: "href", type: "text", required: true },
];

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: { group: "Website" },
  access: { read: () => true, update: authenticated },
  hooks: { afterChange: [revalidateGlobal("/")] },
  fields: [
    { name: "primaryLinks", type: "array", minRows: 1, maxRows: 8, fields: linkFields },
    { name: "serviceLinks", type: "array", maxRows: 8, fields: linkFields },
    { name: "proposalLabel", type: "text", required: true },
    { name: "scheduleLabel", type: "text", required: true },
  ],
};
