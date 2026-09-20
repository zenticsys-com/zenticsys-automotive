import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileCheck2,
  Layers3,
  Link2,
  MessagesSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CatalogEntry } from "@/content/solutions-services";
import { solutionEntries } from "@/content/solutions-services";
import { Container } from "@/components/ui/container";

const engagementModels = [
  {
    icon: FileCheck2,
    label: "Focused engagement",
    title: "Define or improve one critical area",
    description:
      "A bounded discovery, design, integration, or engineering engagement with a clear decision or release at the end.",
  },
  {
    icon: Layers3,
    label: "Product delivery",
    title: "Take a complete release from brief to launch",
    description:
      "A cross-functional team responsible for the workflow, experience, implementation, quality, and production readiness.",
  },
  {
    icon: MessagesSquare,
    label: "Ongoing partnership",
    title: "Extend and support an existing product team",
    description:
      "Continuous delivery around an agreed roadmap, measurable priorities, operational support, and retained product context.",
  },
] as const;

function RelatedSolutions({ entry }: { entry: CatalogEntry }) {
  return (
    <div className="service-related__links">
      {entry.relatedSlugs.map((slug) => {
        const related = solutionEntries.find((item) => item.slug === slug);
        if (!related) return null;

        return (
          <Link href={`/solutions/${related.slug}`} key={slug}>
            <span>{related.listingTitle}</span>
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        );
      })}
    </div>
  );
}

export function ServiceDetail({ entry }: { entry: CatalogEntry }) {
  return (
    <main className="service-detail-page">
      <header className="service-detail-hero entrance-reveal" data-atmosphere="amber">
        <Container>
          <div className="service-detail-hero__copy">
            <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              <span aria-current="page">{entry.listingTitle}</span>
            </nav>
            <p className="section-kicker">{entry.kicker}</p>
            <h1>{entry.title}</h1>
            <p className="service-detail-hero__summary">{entry.summary}</p>
            <div className="service-detail-hero__actions">
              <Link href="/request-a-proposal" className="primary-link">
                Discuss your project <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
              <Link href="/schedule-a-call" className="text-link">
                Schedule a Call <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
          <figure className="service-detail-hero__visual">
            <Image
              src={entry.image}
              alt={entry.imageAlt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 48vw"
              style={{ objectPosition: entry.imagePosition }}
            />
            <span aria-hidden="true" />
            <figcaption>
              <small>Built for</small>
              {entry.audience}
            </figcaption>
          </figure>
        </Container>
      </header>

      <section className="service-fit" data-atmosphere="steel">
        <Container>
          <div className="service-fit__heading">
            <p className="section-kicker">01 · Project fit</p>
            <h2>{entry.challengeTitle}</h2>
          </div>
          <div className="service-fit__body">
            <p>{entry.challenge}</p>
            <div className="service-fit__signals">
              {entry.painPoints.map((point, index) => (
                <article key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="service-engagement" data-atmosphere="brand">
        <Container>
          <div className="service-heading-row">
            <div>
              <p className="section-kicker">02 · Ways to work together</p>
              <h2>An engagement shaped around the decision or outcome.</h2>
            </div>
            <p>
              The format follows the problem. We can resolve one high-risk area,
              own a complete release, or stay with the product as it evolves.
            </p>
          </div>
          <div className="service-engagement__grid">
            {engagementModels.map(({ icon: Icon, label, title, description }) => (
              <article key={label}>
                <Icon aria-hidden="true" size={20} />
                <small>{label}</small>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-deliverables" data-atmosphere="ember">
        <Container>
          <div className="service-deliverables__intro">
            <p className="section-kicker">03 · What we deliver</p>
            <h2>Concrete work your team can use.</h2>
          </div>
          <div className="service-deliverables__list">
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

      <section className="service-collaboration" data-atmosphere="amber">
        <Container>
          <div className="service-heading-row">
            <div>
              <p className="section-kicker">04 · Collaboration</p>
              <h2>One delivery stream, with decisions visible.</h2>
            </div>
            <p>
              Strategy, design, engineering, and quality move around the same
              automotive workflow instead of becoming disconnected hand-offs.
            </p>
          </div>
          <ol>
            {entry.process.map((step, index) => (
              <li key={`${step.title}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="service-output" data-atmosphere="petrol">
        <Container>
          <div className="service-output__board">
            <div className="service-output__heading">
              <p className="section-kicker">05 · Representative output</p>
              <h2>{entry.visual.title}</h2>
              <p>
                A representative delivery artifact—not a claimed client
                screenshot—showing how progress and readiness can stay visible.
              </p>
            </div>
            <div className="service-output__status" role="img" aria-label={`Representative ${entry.listingTitle} delivery output`}>
              <div>
                <small>{entry.visual.eyebrow}</small>
                <strong>{entry.visual.primaryValue}</strong>
                <span>{entry.visual.primaryLabel}</span>
              </div>
              <ul>
                {entry.visual.rows.map((row) => (
                  <li key={row.label}>
                    <Check aria-hidden="true" size={16} />
                    <span>{row.label}<small>{row.state}</small></span>
                    <strong>{row.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="service-foundation" data-atmosphere="steel">
        <Container>
          <div>
            <p className="section-kicker">06 · Technical foundation</p>
            <h2>Designed around the systems the work must connect to.</h2>
          </div>
          <ul>
            {entry.integrations.map((integration) => (
              <li key={integration}><Link2 aria-hidden="true" size={17} />{integration}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="service-handover" data-atmosphere="brand">
        <Container>
          <div className="service-handover__intro">
            <p className="section-kicker">07 · Handover and continuity</p>
            <h2>The work should remain useful after delivery.</h2>
            <p>
              Documentation, ownership, release readiness, and an agreed support
              path are part of the outcome—not final-week administration.
            </p>
          </div>
          <div className="service-handover__outcomes">
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

      <section className="service-related" data-atmosphere="ember">
        <Container>
          <div>
            <p className="section-kicker">08 · Where this creates value</p>
            <h2>Automotive solutions supported by this service.</h2>
            <RelatedSolutions entry={entry} />
          </div>
          <article className="service-related__case">
            <small>Relevant experience</small>
            <h3>Enterprise automotive complexity, understood through CarVu.</h3>
            <p>
              Dealer roles, vehicle trading, auctions, operational dashboards,
              and platform administration shaped as one connected SaaS product.
            </p>
            <Link href="/case-studies/carvu">
              Explore the case study <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </article>
        </Container>
      </section>

      <section className="service-faq detail-faq" data-atmosphere="steel">
        <Container className="detail-faq__grid">
          <div>
            <p className="section-kicker">09 · Before we begin</p>
            <h2>Questions about the engagement.</h2>
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

      <section className="service-cta" data-atmosphere="brand">
        <Container>
          <div>
            <p className="section-kicker">Start with the outcome</p>
            <h2>Need {entry.listingTitle.toLowerCase()}?</h2>
          </div>
          <div>
            <p>
              Tell us what needs to change, who the work affects, and what a
              successful first release must make possible.
            </p>
            <Link href="/request-a-proposal" className="primary-link">
              Request a Proposal <ArrowUpRight aria-hidden="true" size={19} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
