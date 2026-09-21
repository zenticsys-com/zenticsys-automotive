import type { CollectionConfig } from "payload";

import { adminOnly } from "@/cms/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email", group: "Administration" },
  auth: { maxLoginAttempts: 5, lockTime: 10 * 60 * 1000 },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: ({ req, id }) => req.user?.role === "admin" || req.user?.id === id,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: { update: ({ req }) => req.user?.role === "admin" },
    },
  ],
};
