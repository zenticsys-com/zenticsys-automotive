import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { CmsPage } from "@/components/marketing/cms-page";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { Container } from "@/components/ui/container";
import { getPageBySlug } from "@/lib/cms/content";

const fallbackTitle = "Automotive technology experience, applied to the whole operation.";
const fallbackDescription = "Learn how Zenticsys combines automotive product understanding, design, and engineering to build websites, platforms, and connected operational software.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");
  const title = page?.seo?.metaTitle || "About Zenticsys Automotive";
  const description = page?.seo?.metaDescription || fallbackDescription;
  return {
    title,
    description,
    robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: "/about" },
    openGraph: {
      title,
      description,
      url: "/about",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AboutPage() {
  const managedPage = await getPageBySlug("about");
  if (managedPage) return <CmsPage page={managedPage} />;

  return (
    <main className="legal-page about-page" data-atmosphere="steel">
      <OrganizationJsonLd />
      <Container>
        <header className="entrance-reveal">
          <p className="section-kicker">About Zenticsys</p>
          <h1>{fallbackTitle}</h1>
          <p>{fallbackDescription}</p>
        </header>
        <article>
          <section>
            <h2>One industry, without one-size-fits-all thinking</h2>
            <p>Automotive businesses share vehicles and customers, but their operations differ. A dealership website, workshop platform, fleet system, parts store, marketplace, and auction each have their own users, rules, data, and commercial pressures. We begin with that operating reality.</p>
          </section>
          <section>
            <h2>Experience across customer and operational products</h2>
            <p>Our work ranges from public websites and mobile journeys to role-based dealer tools, auction workflows, administration, integrations, and enterprise automotive SaaS. CarVu is an important proof point: experience connecting online vehicle trading, public and dealer auctions, dealer operations, and platform control.</p>
          </section>
          <section>
            <h2>Designed and engineered as one system</h2>
            <p>We connect product strategy, UX, frontend, backend, data, integrations, quality assurance, and ongoing improvement. That helps avoid a polished customer interface sitting on top of fragmented internal workflows.</p>
          </section>
          <section>
            <h2>A practical way to begin</h2>
            <p>Some engagements start with one dealership website or a focused integration. Others begin with a complex platform brief. In both cases, we identify the critical workflow, clarify the first useful release, and create a path that can evolve.</p>
            <Link href="/request-a-proposal" className="primary-link">Discuss your automotive project <ArrowUpRight aria-hidden="true" size={18} /></Link>
          </section>
        </article>
      </Container>
    </main>
  );
}
