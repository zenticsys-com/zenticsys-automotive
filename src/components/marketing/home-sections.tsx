import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Gauge,
  Layers3,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { audiences, capabilities, insights, solutions } from "@/content/home";

export function AudienceGallery() {
  return (
    <section className="home-section audience-section" aria-labelledby="audience-title">
      <Container>
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-kicker">One industry. Different operations.</p>
            <h2 id="audience-title">Built around how automotive businesses actually work.</h2>
          </div>
          <p>
            From a single-location dealership website to the operational system
            behind a national vehicle business, each experience begins with the
            workflow—not a generic template.
          </p>
        </div>

        <div className="audience-grid">
          {audiences.map((audience, index) => (
            <Link
              key={audience.title}
              href={audience.href}
              className={`audience-card audience-card--${index + 1}`}
            >
              <Image
                src={audience.image}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                style={{ objectPosition: audience.position }}
              />
              <span className="audience-card__wash" />
              <span className="audience-card__content">
                <strong>{audience.title}</strong>
                <small>{audience.description}</small>
              </span>
              <ArrowUpRight aria-hidden="true" className="audience-card__arrow" size={20} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function SolutionGallery() {
  return (
    <section className="home-section solution-section" aria-labelledby="solutions-title">
      <Container>
        <div className="section-heading section-heading--centered">
          <p className="section-kicker">What we build</p>
          <h2 id="solutions-title">Digital products across the automotive journey.</h2>
          <p>
            Customer-facing websites, operational platforms, and the software
            connecting everything behind them.
          </p>
        </div>

        <div className="solution-grid">
          {solutions.map((solution) => (
            <Link
              href={solution.href}
              key={solution.title}
              className={`solution-card ${solution.className}`.trim()}
            >
              <Image
                src={solution.image}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 34vw"
              />
              <span className="solution-card__overlay" />
              <span className="solution-card__copy">
                <small>{solution.eyebrow}</small>
                <strong>{solution.title}</strong>
                <span>Explore solution <ArrowRight aria-hidden="true" size={16} /></span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WorkflowStory() {
  const steps = [
    { number: "01", title: "Customer experience", text: "A buyer, driver, fleet manager, or vehicle owner starts on the website or app." },
    { number: "02", title: "Automotive workflow", text: "Inventory, bookings, offers, bids, service work, and vehicle activity move through the system." },
    { number: "03", title: "Team operations", text: "Dealers, technicians, fleet teams, and auction operators manage the work with role-based tools." },
    { number: "04", title: "Platform control", text: "Administrators control users, locations, rules, reporting, integrations, and the wider platform." },
  ] as const;

  return (
    <section className="home-section workflow-section" aria-labelledby="workflow-title">
      <Container>
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-kicker">One connected journey</p>
            <h2 id="workflow-title">We design what customers see—and what your team needs behind it.</h2>
          </div>
          <p>
            Good automotive software connects the public experience to the
            operational reality. We map that complete movement before deciding
            what to build.
          </p>
        </div>

        <div className="workflow-track">
          <span className="workflow-track__line" aria-hidden="true" />
          {steps.map((step) => (
            <article className="workflow-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CarVuFeature() {
  return (
    <section className="home-section carvu-section" aria-labelledby="carvu-title">
      <Container>
        <div className="carvu-card">
          <div className="carvu-card__copy">
            <p className="section-kicker">Enterprise automotive experience</p>
            <h2 id="carvu-title">Complex automotive workflows, understood through CarVu.</h2>
            <p>
              Our experience includes an enterprise automotive SaaS product
              spanning online buying and selling, public and dealer auctions,
              role-based dealer operations, and super-admin platform control.
            </p>
            <ul>
              <li>Vehicle marketplace workflows</li>
              <li>Public and dealer auction journeys</li>
              <li>Dealer roles, permissions, and dashboards</li>
              <li>Multi-level SaaS administration</li>
            </ul>
            <Link href="/case-studies/carvu" className="primary-link">
              See How We Built It <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>

          <div className="carvu-product" aria-label="Representative CarVu workflow interface illustration">
            <div className="carvu-product__top"><span /><span>Platform overview</span><small>Representative interface</small></div>
            <div className="carvu-product__body">
              <aside><strong>CV</strong><span className="is-active" /><span /><span /><span /></aside>
              <div className="carvu-product__dashboard">
                <div className="carvu-metric"><small>Active inventory</small><strong>Connected</strong><span className="metric-line" /></div>
                <div className="carvu-metric"><small>Dealer network</small><strong>Role based</strong><span className="metric-line metric-line--amber" /></div>
                <div className="carvu-auction">
                  <div><small>Live auction workflow</small><strong>Dealer lane</strong></div>
                  <span className="auction-pulse">Live</span>
                  {["Lot prepared", "Bids validated", "Winner confirmed"].map((item, index) => (
                    <div className="auction-row" key={item}><span>0{index + 1}</span><strong>{item}</strong><small>{index === 2 ? "Complete" : "Active"}</small></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CapabilitySection() {
  return (
    <section className="home-section capability-section" aria-labelledby="capability-title">
      <Container>
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-kicker">Engineering depth</p>
            <h2 id="capability-title">From the first enquiry to platform-wide control.</h2>
          </div>
          <p>
            The same team can shape the customer experience, model complex
            operational rules, and build the administrative systems required to
            run the product.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <div key={capability} className="capability-item">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{capability}</strong>
            </div>
          ))}
        </div>

        <div className="proof-strip" aria-label="Range of automotive delivery experience">
          <article><Building2 aria-hidden="true" /><span><strong>Customer-facing</strong><small>Websites, portals, apps, and conversion journeys</small></span></article>
          <article><UsersRound aria-hidden="true" /><span><strong>Operational</strong><small>Dealer, fleet, service, auction, and team workflows</small></span></article>
          <article><ShieldCheck aria-hidden="true" /><span><strong>Platform-wide</strong><small>Roles, governance, integrations, reporting, and admin</small></span></article>
        </div>
      </Container>
    </section>
  );
}

export function InsightsPreview() {
  return (
    <section className="home-section insights-section" aria-labelledby="insights-title">
      <Container>
        <div className="section-heading section-heading--inline">
          <div><p className="section-kicker">Automotive insights</p><h2 id="insights-title">Thinking beyond the interface.</h2></div>
          <Link href="/insights">View all Insights <ArrowRight aria-hidden="true" size={17} /></Link>
        </div>

        <div className="insights-grid">
          {insights.map((insight, index) => (
            <Link href={insight.href} className="insight-card" key={insight.title}>
              <span className={`insight-card__visual insight-card__visual--${index + 1}`}>
                <Image src={insight.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" />
                <span className="insight-card__pattern" />
              </span>
              <small>{insight.category}</small>
              <strong>{insight.title}</strong>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeProposalCta() {
  return (
    <section className="home-proposal" aria-labelledby="home-proposal-title">
      <Container>
        <div className="home-proposal__card">
          <Gauge aria-hidden="true" className="home-proposal__icon" />
          <p className="section-kicker">Your next automotive project</p>
          <h2 id="home-proposal-title">Ready to put it in motion?</h2>
          <p>
            Tell us whether you need a focused website, a connected platform, or
            a complex automotive product. We’ll start with the workflow that
            matters most.
          </p>
          <div>
            <Link href="/request-a-proposal" className="primary-link">Request a Proposal <ArrowUpRight aria-hidden="true" size={18} /></Link>
            <Link href="/schedule-a-call" className="text-link">Schedule a Call <ArrowRight aria-hidden="true" size={18} /></Link>
          </div>
          <Layers3 aria-hidden="true" className="home-proposal__layers" />
        </div>
      </Container>
    </section>
  );
}
