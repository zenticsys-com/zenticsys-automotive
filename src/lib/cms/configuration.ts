const payloadKeys = ["PAYLOAD_SECRET", "DATABASE_URI"] as const;
const r2Keys = [
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET",
  "R2_ENDPOINT",
  "R2_PUBLIC_URL",
] as const;

function hasAll(keys: readonly string[]) {
  return keys.every((key) => Boolean(process.env[key]?.trim()));
}

export function isPayloadConfigured() {
  return hasAll(payloadKeys);
}

export function isR2Configured() {
  return hasAll(r2Keys);
}

export function isCmsFullyConfigured() {
  return isPayloadConfigured() && isR2Configured();
}

export function getPayloadSecret() {
  return process.env.PAYLOAD_SECRET?.trim() || "development-build-placeholder-change-before-use";
}

export function getDatabaseUri() {
  return process.env.DATABASE_URI?.trim() || "mongodb://127.0.0.1:27017/zenticsys-automotive-unconfigured";
}
