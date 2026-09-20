import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Gauge,
  Link2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CatalogEntry } from "@/content/solutions-services";
import { serviceEntries, solutionEntries } from "@/content/solutions-services";
import { Container } from "@/components/ui/container";

function RelatedLinks({ entry }: { entry: CatalogEntry }) {
  const relatedEntries = entry.kind === "solution" ? serviceEntries : solutionEntries;
  const collection = entry.kind === "solution" ? "services" : "solutions";

  return (
    <div className="detail-related__links">
      {entry.relatedSlugs.map((slug) => {
        const related = relatedEntries.find((item) => item.slug === slug);
        if (!related) return null;

        return (
          <Link href={`/${collection}/${related.slug}`} key={slug}>
            <span>{related.listingTitle}</span>
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        );
      })}
    </div>
  );
}

export function CatalogDetail({ entry }: { entry: CatalogEntry }) {
  const collection = entry.kind === "solution" ? "solutions" : "services";
  const capabilityHeading =
    entry.kind === "solution" ? "What the solution can include" : "What we deliver";
  const workflowHeading =
    entry.kind === "solution" ? "A connected operational workflow" : "How the work moves";

  return (
    <main className="detail-page">
      <header className="detail-hero entrance-reveal" data-atmosphere="amber">
        <Container>
          <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/${collection}`}>
              {collection === "solutions" ? "Solutions" : "Services"}
            </Link>
            <span>/</span>
            <span aria-current="page">{entry.listingTitle}</span>
          </nav>
          <p className="section-kicker">{entry.kicker}</p>
          <h1>{entry.title}</h1>
          <p className="detail-hero__summary">{entry.summary}</p>
          <div className="detail-hero__actions">
            <Link href="/request-a-proposal" className="primary-link">
              Request a Proposal <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link href="/schedule-a-call" className="text-link">
              Schedule a Call <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <figure className="detail-hero__visual">
            <Image
              src={entry.image}
              alt={entry.imageAlt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 1280px"
              style={{ objectPosition: entry.imagePosition }}
            />
            <span aria-hidden="true" />
            <figcaption>{entry.audience}</figcaption>
          </figure>
        </Container>
      </header>

      <section className="detail-editorial" data-atmosphere="brand">
        <Container className="detail-editorial__grid">
          <div className="detail-editorial__label">
            <span>01</span>
            <p>{entry.kind === "solution" ? "The business problem" : "When this service fits"}</p>
          </div>
          <div className="detail-editorial__body">
            <h2>{entry.challengeTitle}</h2>
            <p>{entry.challenge}</p>
            <ul className="detail-points">
              {entry.painPoints.map((point) => (
                <li key={point}><span aria-hidden="true" />{point}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="detail-capabilities" data-atmosphere="ember">
        <Container>
          <div className="detail-section-heading">
            <p className="section-kicker">02 · Scope</p>
            <h2>{capabilityHeading}</h2>
          </div>
          <div className="detail-capability-grid">
            {entry.capabilities.map((capability, index) => (
              <article key={capability.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="detail-workflow" data-atmosphere="amber">
        <Container>
          <div className="detail-section-heading detail-section-heading--split">
            <div>
              <p className="section-kicker">03 · Workflow</p>
              <h2>{workflowHeading}</h2>
            </div>
            <p>
              The experience is designed around complete user outcomes—not a
              collection of disconnected screens.
            </p>
          </div>
          <ol className="detail-workflow__track">
            {entry.workflow.map((step, index) => (
              <li key={`${step.title}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="detail-product" data-atmosphere="petrol">
        <Container className="detail-product__grid">
          <div className="detail-product__copy">
            <p className="section-kicker">04 · Product view</p>
            <h2>{entry.visual.title}</h2>
            <p>
              A representative interface direction—not a claimed client
              screenshot—showing how the operational model can become visible.
            </p>
          </div>
          <div
            className="product-concept"
            role="img"
            aria-label={`Representative ${entry.listingTitle} interface concept`}
          >
            <div className="product-concept__topbar">
              <span>{entry.visual.eyebrow}</span>
              <span><Gauge aria-hidden="true" size={17} /> Live view</span>
            </div>
            <div className="product-concept__metric">
              <small>{entry.visual.primaryLabel}</small>
              <strong>{entry.visual.primaryValue}</strong>
            </div>
            <div className="product-concept__rows">
              {entry.visual.rows.map((row) => (
                <div key={row.label}>
                  <span><i aria-hidden="true" />{row.label}</span>
                  <strong>{row.value}</strong>
                  <small>{row.state}</small>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="detail-technical" data-atmosphere="steel">
        <Container className="detail-technical__grid">
          <div>
            <p className="section-kicker">05 · Connected foundation</p>
            <h2>Designed to work with the systems around it.</h2>
          </div>
          <ul>
            {entry.integrations.map((integration) => (
              <li key={integration}><Link2 aria-hidden="true" size={17} />{integration}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="detail-outcomes" data-atmosphere="brand">
        <Container>
          <div className="detail-section-heading">
            <p className="section-kicker">06 · Outcomes</p>
            <h2>What better should look like.</h2>
          </div>
          <div className="detail-outcomes__grid">
            {entry.outcomes.map((outcome) => (
              <article key={outcome.title}>
                <Check aria-hidden="true" size={18} />
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="detail-process" data-atmosphere="amber">
        <Container>
          <div className="detail-section-heading detail-section-heading--split">
            <div>
              <p className="section-kicker">07 · Delivery</p>
              <h2>Built in practical, testable stages.</h2>
            </div>
            <p>
              Scope follows evidence. Each stage should reduce uncertainty and
              move a complete automotive workflow closer to use.
            </p>
          </div>
          <ol>
            {entry.process.map((step, index) => (
              <li key={`${step.title}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="detail-related" data-atmosphere="ember">
        <Container className="detail-related__grid">
          <div>
            <p className="section-kicker">08 · Related expertise</p>
            <h2>
              {entry.kind === "solution"
                ? "Services that support this solution."
                : "Solutions where this service creates value."}
            </h2>
            <RelatedLinks entry={entry} />
          </div>
          <article className="detail-case-link">
            <small>Relevant experience</small>
            <h3>Complex automotive workflows, understood through CarVu.</h3>
            <p>
              Enterprise SaaS experience across dealer roles, vehicle trading,
              auctions, dashboards, and platform administration.
            </p>
            <Link href="/case-studies/carvu">
              See how we built it <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </article>
        </Container>
      </section>

      <section className="detail-faq" data-atmosphere="steel">
        <Container className="detail-faq__grid">
          <div>
            <p className="section-kicker">09 · Questions</p>
            <h2>Before we define the project.</h2>
          </div>
          <div>
            {entry.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="detail-cta" data-atmosphere="brand">
        <Container>
          <p className="section-kicker">Start with the workflow</p>
          <h2>Have a {entry.listingTitle.toLowerCase()} project in mind?</h2>
          <p>
            Tell us about the users, operation, existing systems, and the result
            the business needs.
          </p>
          <Link href="/request-a-proposal" className="primary-link">
            Request a Proposal <ArrowUpRight aria-hidden="true" size={19} />
          </Link>
        </Container>
      </section>
    </main>
  );
}

