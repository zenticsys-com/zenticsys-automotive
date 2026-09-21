export function getCalendlyUrl() {
  const configured = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (!configured) return null;
  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" || !(url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com"))) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

export function getCalendlyEmbedUrl() {
  const url = getCalendlyUrl();
  if (!url) return null;
  url.searchParams.set("background_color", "111315");
  url.searchParams.set("text_color", "f5f6f4");
  url.searchParams.set("primary_color", "ef3d23");
  return url.toString();
}
