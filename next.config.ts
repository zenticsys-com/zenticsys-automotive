import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const remotePatterns = [
  new URL("https://images.unsplash.com/**"),
  new URL("https://images.pexels.com/**"),
  new URL("https://cdn.pixabay.com/**"),
];

if (process.env.R2_PUBLIC_URL) {
  const r2MediaPattern = new URL(process.env.R2_PUBLIC_URL);
  const basePath = r2MediaPattern.pathname.replace(/\/$/, "");

  r2MediaPattern.pathname = `${basePath}/**`;
  r2MediaPattern.search = "";
  remotePatterns.push(r2MediaPattern);
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86_400,
    remotePatterns,
  },
  async headers() {
    const headers = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    if (process.env.VERCEL_ENV === "production") {
      headers.push({ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" });
    }

    return [{ source: "/:path*", headers }];
  },
};

export default withPayload(nextConfig);
