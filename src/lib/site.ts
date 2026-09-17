const LOCAL_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = new URL(configuredUrl || LOCAL_SITE_URL);

  url.pathname = url.pathname.replace(/\/$/, "");

  return url;
}

export const siteConfig = {
  name: "Zenticsys",
  title: "Zenticsys — Automotive Software & Digital Experiences",
  description:
    "Automotive websites, marketplaces, fleet systems, service platforms, auction software, and custom digital products built by Zenticsys.",
  locale: "en_US",
  url: getSiteUrl(),
} as const;
