import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <main className="shell-preview entrance-reveal">
      <Container className="shell-preview__inner">
        <p className="section-kicker">Automotive digital specialists</p>
        <h1>Built for automotive motion.</h1>
        <p className="shell-preview__intro">
          Zenticsys designs websites, platforms, and connected software for the
          businesses behind every vehicle journey.
        </p>

        <div className="shell-preview__actions">
          <Link href="/request-a-proposal" className="primary-link">
            Request a Proposal
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
          <Link href="/solutions" className="text-link">
            Explore Solutions
            <ArrowDownRight aria-hidden="true" size={18} />
          </Link>
        </div>

        <div className="automotive-signal" aria-hidden="true">
          <span className="automotive-signal__line" />
          <div className="automotive-signal__nodes">
            <span>Inventory</span>
            <span>Fleet</span>
            <span>Service</span>
            <span>Auction</span>
          </div>
        </div>

        <p className="shell-preview__note">
          Shared design system preview — homepage composition follows in Phase
          03.
        </p>
      </Container>
    </main>
  );
}
