import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { AutomotiveSystemVisual } from "@/components/marketing/automotive-system-visual";
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
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: {
    absolute: "Automotive Websites, Platforms & Custom Software | Zenticsys",
  },
  description:
    "Zenticsys builds dealership websites, fleet systems, service platforms, parts ecommerce, marketplaces, auctions, and custom software for automotive businesses.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Automotive Websites, Platforms & Custom Software | Zenticsys",
    description:
      "Digital products for businesses that sell, service, manage, and move vehicles.",
    url: "/",
  },
};

export default function Home() {
  return (
    <main className="home-page">
      <OrganizationJsonLd />

      <section className="home-hero entrance-reveal" aria-labelledby="home-title">
        <Container className="home-hero__inner">
          <p className="section-kicker">Automotive digital specialists</p>
          <h1 id="home-title">
            We build the digital systems that keep automotive businesses moving.
          </h1>
          <p className="home-hero__intro">
            Dealership websites, fleet systems, service platforms, parts
            ecommerce, marketplaces, auctions, and enterprise automotive
            software—designed as one connected experience.
          </p>
          <div className="home-hero__actions">
            <Link href="/request-a-proposal" className="primary-link">
              Request a Proposal <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link href="/solutions" className="text-link">
              Explore Solutions <ArrowDownRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <AutomotiveSystemVisual />
          <a className="home-hero__scroll" href="#who-we-help">
            <span>See who we help</span><ArrowDownRight aria-hidden="true" size={16} />
          </a>
        </Container>
      </section>

      <div id="who-we-help">
        <AudienceGallery />
      </div>
      <SolutionGallery />
      <WorkflowStory />
      <CarVuFeature />
      <CapabilitySection />
      <InsightsPreview />
      <HomeProposalCta />
    </main>
  );
}
