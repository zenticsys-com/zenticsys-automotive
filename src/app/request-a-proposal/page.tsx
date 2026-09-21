import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ProposalForm } from "@/components/forms/proposal-form";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Request an Automotive Project Proposal",
  description: "Share your automotive website, platform, marketplace, fleet, service, auction, or custom software requirements with Zenticsys.",
  alternates: { canonical: "/request-a-proposal" },
  openGraph: {
    title: "Request an Automotive Project Proposal | Zenticsys",
    description: "A guided project brief for automotive websites, platforms, and custom software.",
    url: "/request-a-proposal",
  },
};

export default function RequestProposalPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  return (
    <main className="conversion-page" data-atmosphere="ember">
      <Container>
        <header className="conversion-hero entrance-reveal">
          <p className="section-kicker">Request a proposal</p>
          <h1>Give us the road ahead. We’ll help shape the right build.</h1>
          <p>
            A guided brief for dealership websites, operational platforms, marketplaces, auctions,
            fleet systems, service products, and custom automotive software.
          </p>
        </header>

        <div className="proposal-layout">
          <aside className="proposal-context" aria-label="What happens next">
            <p className="section-kicker">Useful from the first reply</p>
            <h2>Enough context to start intelligently.</h2>
            <ul>
              <li><CheckCircle2 aria-hidden="true" size={18} /><span>Five focused steps—not one intimidating questionnaire.</span></li>
              <li><CheckCircle2 aria-hidden="true" size={18} /><span>Questions adapt to the automotive product you choose.</span></li>
              <li><CheckCircle2 aria-hidden="true" size={18} /><span>Share planning ranges without committing to a final scope.</span></li>
            </ul>
            <p className="proposal-context__alternative">Prefer a conversation first?</p>
            <Link href="/schedule-a-call" className="text-link">Schedule a 30-minute call <ArrowRight size={17} aria-hidden="true" /></Link>
          </aside>
          <ProposalForm turnstileSiteKey={turnstileSiteKey} />
        </div>
      </Container>
    </main>
  );
}
