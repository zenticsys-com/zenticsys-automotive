import type { CaseStudyEntry, InsightEntry } from "@/content/editorial";
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

export function EditorialListingJsonLd({
  entries,
  collection,
}: {
  entries: readonly (CaseStudyEntry | InsightEntry)[];
  collection: "case-studies" | "insights";
}) {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: collection === "case-studies" ? "Zenticsys automotive case studies" : "Zenticsys automotive insights",
        itemListElement: entries.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.title,
          url: new URL(`/${collection}/${entry.slug}`, siteConfig.url).toString(),
        })),
      }}
    />
  );
}

function BreadcrumbJsonLd({ collection, name, slug }: { collection: "case-studies" | "insights"; name: string; slug: string }) {
  const url = new URL(`/${collection}/${slug}`, siteConfig.url).toString();
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url.toString() },
          {
            "@type": "ListItem",
            position: 2,
            name: collection === "case-studies" ? "Case Studies" : "Insights",
            item: new URL(`/${collection}`, siteConfig.url).toString(),
          },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      }}
    />
  );
}

export function CaseStudyJsonLd({ entry }: { entry: CaseStudyEntry }) {
  const url = new URL(`/case-studies/${entry.slug}`, siteConfig.url).toString();
  return (
    <>
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.title,
          description: entry.summary,
          image: new URL(entry.image, siteConfig.url).toString(),
          author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url.toString() },
          publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url.toString() },
          mainEntityOfPage: url,
          about: ["Automotive SaaS", "Vehicle marketplace", "Automotive auctions", "Dealer software"],
        }}
      />
      <BreadcrumbJsonLd collection="case-studies" name={entry.listingTitle} slug={entry.slug} />
    </>
  );
}

export function InsightJsonLd({ entry }: { entry: InsightEntry }) {
  const url = new URL(`/insights/${entry.slug}`, siteConfig.url).toString();
  return (
    <>
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.title,
          description: entry.excerpt,
          image: new URL(entry.image, siteConfig.url).toString(),
          datePublished: entry.publishedAt,
          dateModified: entry.publishedAt,
          articleSection: entry.category,
          author: { "@type": "Organization", name: entry.author, url: siteConfig.url.toString() },
          publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url.toString() },
          mainEntityOfPage: url,
        }}
      />
      <BreadcrumbJsonLd collection="insights" name={entry.title} slug={entry.slug} />
    </>
  );
}
