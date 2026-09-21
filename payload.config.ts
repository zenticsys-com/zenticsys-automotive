import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "node:path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

import { CaseStudies } from "@/cms/collections/CaseStudies";
import { Solutions, Services } from "@/cms/collections/Catalog";
import { FAQs } from "@/cms/collections/FAQs";
import { Insights } from "@/cms/collections/Insights";
import { Media } from "@/cms/collections/Media";
import { Pages } from "@/cms/collections/Pages";
import { Testimonials } from "@/cms/collections/Testimonials";
import { Users } from "@/cms/collections/Users";
import { Footer } from "@/cms/globals/Footer";
import { Homepage } from "@/cms/globals/Homepage";
import { Navigation } from "@/cms/globals/Navigation";
import { SiteSettings } from "@/cms/globals/SiteSettings";
import {
  getDatabaseUri,
  getPayloadSecret,
  isR2Configured,
} from "@/lib/cms/configuration";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const r2Enabled = isR2Configured();
const publicMediaUrl = (process.env.R2_PUBLIC_URL || "https://media.invalid").replace(/\/$/, "");

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname, "src") },
    meta: { titleSuffix: " · Zenticsys CMS" },
  },
  collections: [Users, Media, Solutions, Services, CaseStudies, Insights, Pages, FAQs, Testimonials],
  globals: [Homepage, Navigation, Footer, SiteSettings],
  db: mongooseAdapter({ url: getDatabaseUri() }),
  editor: lexicalEditor(),
  secret: getPayloadSecret(),
  serverURL: siteUrl,
  cors: [siteUrl],
  csrf: [siteUrl],
  routes: {
    admin: "/admin",
    api: "/cms-api",
    graphQL: "/cms-graphql",
    graphQLPlayground: "/cms-graphql-playground",
  },
  sharp,
  typescript: { outputFile: path.resolve(dirname, "src/payload-types.ts") },
  plugins: [
    s3Storage({
      enabled: r2Enabled,
      alwaysInsertFields: true,
      bucket: process.env.R2_BUCKET || "unconfigured",
      disableLocalStorage: true,
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename: mediaFilename }) => `${publicMediaUrl}/${mediaFilename}`,
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "unconfigured",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "unconfigured",
        },
        endpoint: process.env.R2_ENDPOINT || "https://unconfigured.invalid",
        forcePathStyle: true,
        region: "auto",
      },
    }),
  ],
});
