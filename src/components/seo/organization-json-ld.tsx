import { siteConfig } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url.toString(),
    logo: new URL(
      "/brand/zenticsys-wordmark-light.png",
      siteConfig.url,
    ).toString(),
    email: "info@zenticsys.com",
    sameAs: ["https://www.linkedin.com/company/zenticsys/"],
    description: siteConfig.description,
    knowsAbout: [
      "Automotive software development",
      "Automotive websites",
      "Fleet management software",
      "Vehicle marketplaces",
      "Automotive auction platforms",
      "Car service software",
      "Automotive ecommerce",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
