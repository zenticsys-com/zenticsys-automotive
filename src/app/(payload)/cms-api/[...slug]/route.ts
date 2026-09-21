import config from "@payload-config";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";

import { isCmsFullyConfigured } from "@/lib/cms/configuration";

const unavailable = () =>
  Response.json(
    { error: "CMS setup is incomplete. Configure Payload, MongoDB Atlas, and Cloudflare R2." },
    { status: 503 },
  );

const payloadGET = REST_GET(config);
const payloadPOST = REST_POST(config);
const payloadPATCH = REST_PATCH(config);
const payloadDELETE = REST_DELETE(config);
const payloadOPTIONS = REST_OPTIONS(config);
const payloadPUT = REST_PUT(config);

export const GET: typeof payloadGET = (...args) => isCmsFullyConfigured() ? payloadGET(...args) : Promise.resolve(unavailable());
export const POST: typeof payloadPOST = (...args) => isCmsFullyConfigured() ? payloadPOST(...args) : Promise.resolve(unavailable());
export const PATCH: typeof payloadPATCH = (...args) => isCmsFullyConfigured() ? payloadPATCH(...args) : Promise.resolve(unavailable());
export const DELETE: typeof payloadDELETE = (...args) => isCmsFullyConfigured() ? payloadDELETE(...args) : Promise.resolve(unavailable());
export const OPTIONS: typeof payloadOPTIONS = (...args) => isCmsFullyConfigured() ? payloadOPTIONS(...args) : Promise.resolve(unavailable());
export const PUT: typeof payloadPUT = (...args) => isCmsFullyConfigured() ? payloadPUT(...args) : Promise.resolve(unavailable());
