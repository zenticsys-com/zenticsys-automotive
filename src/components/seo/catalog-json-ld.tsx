import type { CatalogEntry } from "@/content/solutions-services";
import { siteConfig } from "@/lib/site";

function JsonLd({ value }: { value: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function CatalogListingJsonLd({
  entries,
  kind,
}: {
  entries: readonly CatalogEntry[];
  kind: "solutions" | "services";
}) {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Automotive ${kind} by Zenticsys`,
        itemListElement: entries.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.listingTitle,
          url: new URL(`/${kind}/${entry.slug}`, siteConfig.url).toString(),
        })),
      }}
    />
  );
}

export function CatalogDetailJsonLd({ entry }: { entry: CatalogEntry }) {
  const collection = entry.kind === "solution" ? "solutions" : "services";
  const url = new URL(`/${collection}/${entry.slug}`, siteConfig.url).toString();

  return (
    <>
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: entry.title,
          description: entry.summary,
          serviceType: entry.listingTitle,
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url.toString(),
          },
          areaServed: "Worldwide",
          audience: {
            "@type": "Audience",
            audienceType: entry.audience,
          },
          url,
        }}
      />
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteConfig.url.toString(),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: collection === "solutions" ? "Solutions" : "Services",
              item: new URL(`/${collection}`, siteConfig.url).toString(),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: entry.listingTitle,
              item: url,
            },
          ],
        }}
      />
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: entry.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
    </>
  );
}

