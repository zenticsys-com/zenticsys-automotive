import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CaseStudyEntry } from "@/content/editorial";
import { Container } from "@/components/ui/container";

export function CaseStudyDetail({ entry }: { entry: CaseStudyEntry }) {
  return (
    <main className="case-detail-page">
      <header className="case-detail-hero entrance-reveal" data-atmosphere="ember">
        <Container>
          <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/case-studies">Case Studies</Link><span>/</span>
            <span aria-current="page">CarVu</span>
          </nav>
          <p className="section-kicker">{entry.kicker}</p>
          <h1>{entry.title}</h1>
          <p className="case-detail-hero__summary">{entry.summary}</p>
          <div className="case-detail-hero__actions">
            <Link href="/request-a-proposal" className="primary-link">
              Discuss your project <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <a href="#case-overview" className="text-link">
              Read the case study <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
          <figure className="case-detail-hero__visual">
            <Image
              src={entry.image}
              alt={entry.imageAlt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 1280px"
              style={{ objectPosition: entry.imagePosition }}
            />
            <span aria-hidden="true" />
            <figcaption>
              Supporting automotive auction photography—not a CarVu product screenshot.
            </figcaption>
          </figure>
        </Container>
      </header>

      <section id="case-overview" className="case-facts" data-atmosphere="brand">
        <Container>
          {entry.facts.map((fact) => (
            <dl key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </dl>
          ))}
        </Container>
      </section>

      <section className="case-challenge" data-atmosphere="amber">
        <Container>
          <aside className="case-section-index">
            <span>01</span><p>The product challenge</p>
          </aside>
          <div className="case-editorial-copy">
            <h2>Many journeys. Different permissions. One product landscape.</h2>
            <p>
              Vehicle buying and selling, public auctions, dealer-only auctions,
              dealer operations, and SaaS administration each create a distinct
              set of users, decisions, and rules. Treating them as isolated tools
              would move complexity onto the people using the platform.
            </p>
            <p>
              The product challenge was to make those experiences feel connected
              while preserving the boundaries each workflow requires. A buyer
              should not face dealer operations. A dealer user should not inherit
              unrestricted platform control. An administrator needs governance
              across the system without becoming part of every transaction.
            </p>
          </div>
        </Container>
      </section>

      <section className="case-roles" data-atmosphere="steel">
        <Container>
          <div className="case-section-heading">
            <p className="section-kicker">02 · Users and roles</p>
            <h2>The interface changes with responsibility.</h2>
          </div>
          <div className="case-roles__grid">
            {entry.roles.map((role, index) => (
              <article key={role.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="case-workflow" data-atmosphere="ember">
        <Container>
          <div className="case-section-heading case-section-heading--split">
            <div><p className="section-kicker">03 · Connected workflow</p><h2>One vehicle can move through several operating contexts.</h2></div>
            <p>The product model connects the record, rules, roles, and platform control behind each step.</p>
          </div>
          <ol className="case-workflow__track">
            {entry.workflows.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="case-product-map" data-atmosphere="petrol">
        <Container>
          <div className="case-product-map__copy">
            <p className="section-kicker">04 · Product landscape</p>
            <h2>Customer experiences above. Operational control beneath.</h2>
            <p>
              This representative capability map explains the connected product
              shape. It is an original diagram, not a CarVu interface screenshot.
            </p>
          </div>
          <div className="carvu-landscape" role="img" aria-label="Representative map of connected CarVu product capabilities">
            <div className="carvu-landscape__top">
              <span>CarVu capability map</span><small>Representative diagram</small>
            </div>
            <div className="carvu-landscape__experiences">
              <article><small>Customer</small><strong>Buy &amp; sell</strong><span>Vehicle journey</span></article>
              <article><small>Public</small><strong>Auction</strong><span>Open participation</span></article>
              <article><small>Trade</small><strong>Dealer auction</strong><span>Controlled access</span></article>
            </div>
            <div className="carvu-landscape__spine"><span>Shared vehicle and activity model</span></div>
            <div className="carvu-landscape__operations">
              <article><strong>Dealer operations</strong><span>Roles · dashboards · workflow</span></article>
              <article><strong>Platform administration</strong><span>Governance · users · control</span></article>
            </div>
          </div>
        </Container>
      </section>

      <section className="case-capabilities" data-atmosphere="brand">
        <Container>
          <div className="case-section-heading">
            <p className="section-kicker">05 · What the experience covered</p>
            <h2>Product depth across the automotive platform.</h2>
          </div>
          <div className="case-capabilities__grid">
            {entry.capabilities.map((capability) => (
              <article key={capability.title}>
                <Check aria-hidden="true" size={18} />
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="case-technical" data-atmosphere="steel">
        <Container>
          <div className="case-section-heading case-section-heading--split">
            <div><p className="section-kicker">06 · Technical depth</p><h2>Complexity made explicit before it becomes code.</h2></div>
            <p>No technology stack or implementation detail is published here without approval. These are the product-engineering concerns demonstrated by the known scope.</p>
          </div>
          <div className="case-technical__list">
            {entry.technicalNotes.map((note, index) => (
              <article key={note.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="case-proof" data-atmosphere="amber">
        <Container>
          <div className="case-section-heading">
            <p className="section-kicker">07 · What this experience proves</p>
            <h2>Credibility without invented metrics.</h2>
            <p className="case-section-heading__note">No unapproved performance figures or client claims are used in this case study.</p>
          </div>
          <div className="case-proof__grid">
            {entry.proof.map((item) => (
              <article key={item.title}>
                <ShieldCheck aria-hidden="true" size={20} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="case-cta" data-atmosphere="brand">
        <Container>
          <p className="section-kicker">Build the next workflow</p>
          <h2>Have an automotive platform with this kind of complexity?</h2>
          <p>Tell us about the users, operating rules, and product decisions that need to connect.</p>
          <Link href="/request-a-proposal" className="primary-link">
            Request a Proposal <ArrowUpRight aria-hidden="true" size={19} />
          </Link>
        </Container>
      </section>
    </main>
  );
}
