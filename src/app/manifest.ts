import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zenticsys — Automotive Software & Digital Experiences",
    short_name: "Zenticsys",
    description: "Automotive websites, platforms, and custom software by Zenticsys.",
    start_url: "/",
    display: "standalone",
    background_color: "#111315",
    theme_color: "#111315",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
