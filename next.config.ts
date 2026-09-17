import type { NextConfig } from "next";

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
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns,
  },
};

export default nextConfig;
