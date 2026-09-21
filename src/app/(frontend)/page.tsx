import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { AutomotiveJourneyGallery } from "@/components/marketing/automotive-journey-gallery";
import { HeroRouteMorph } from "@/components/marketing/hero-route-morph";
import {
  AudienceGallery,
  CapabilitySection,
  CarVuFeature,
  HomeProposalCta,
  InsightsPreview,
  SolutionGallery,
  WorkflowStory,
} from "@/components/marketing/home-sections";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Container } from "@/components/ui/container";
import { getHomepage } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  const title = homepage.seo?.metaTitle || "Automotive Websites, Platforms & Custom Software | Zenticsys";
  const description = homepage.seo?.metaDescription || "Zenticsys builds dealership websites, fleet systems, service platforms, parts ecommerce, marketplaces, auctions, and custom software for automotive businesses.";
  const socialImage = homepage.seo?.socialImage && typeof homepage.seo.socialImage === "object" ? homepage.seo.socialImage.url : undefined;
  return {
    title: { absolute: title },
    description,
    robots: homepage.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: "/" },
    openGraph: { title, description, url: "/", images: socialImage ? [socialImage] : undefined },
    twitter: { card: "summary_large_image", title, description, images: socialImage ? [socialImage] : undefined },
  };
}

export default async function Home() {
  const homepage = await getHomepage();
  const { hero, sections, finalCta } = homepage;
  return (
    <main className="home-page">
      <OrganizationJsonLd />

      <section
        className="home-hero entrance-reveal"
        aria-labelledby="home-title"
        data-atmosphere="brand"
      >
        <HeroRouteMorph />
        <Container className="home-hero__inner">
          <p className="section-kicker">{hero.kicker}</p>
          <h1 id="home-title">{hero.title}</h1>
          <p className="home-hero__intro">{hero.description}</p>
          <div className="home-hero__actions">
            <Link href={hero.primaryHref} className="primary-link">
              {hero.primaryLabel} <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link href={hero.secondaryHref} className="text-link">
              {hero.secondaryLabel} <ArrowDownRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <AutomotiveJourneyGallery />
          <a className="home-hero__scroll" href="#who-we-help">
            <span>{hero.scrollLabel}</span><ArrowDownRight aria-hidden="true" size={16} />
          </a>
        </Container>
      </section>

      <MotionReveal>
        <div id="who-we-help">
          <AudienceGallery copy={sections} />
        </div>
      </MotionReveal>
      <MotionReveal><SolutionGallery copy={sections} /></MotionReveal>
      <MotionReveal><WorkflowStory copy={sections} /></MotionReveal>
      <MotionReveal><CarVuFeature copy={sections} /></MotionReveal>
      <MotionReveal><CapabilitySection copy={sections} /></MotionReveal>
      <MotionReveal><InsightsPreview copy={sections} /></MotionReveal>
      <MotionReveal><HomeProposalCta copy={finalCta} /></MotionReveal>
    </main>
  );
}
