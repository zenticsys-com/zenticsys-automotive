import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CaseStudyEntry, InsightEntry } from "@/content/editorial";
import { Container } from "@/components/ui/container";

export function CaseStudyListing({ entries }: { entries: readonly CaseStudyEntry[] }) {
  return (
    <main className="case-listing-page">
      <header className="editorial-listing-hero entrance-reveal" data-atmosphere="ember">
        <Container>
          <p className="section-kicker">Selected automotive work</p>
          <h1>Complex products, made understandable.</h1>
          <p>
            A closer look at the automotive workflows, product decisions, and
            platform thinking behind our experience.
          </p>
          <a href="#case-study-list" className="editorial-listing-hero__cue">
            Explore the work <ArrowDownRight aria-hidden="true" size={17} />
          </a>
        </Container>
      </header>

      <section id="case-study-list" className="case-study-list" data-atmosphere="brand">
        <Container>
          {entries.map((entry, index) => (
            <article className="case-study-card" key={entry.slug}>
              <Link
                href={`/case-studies/${entry.slug}`}
                className="clickable-image-card"
              >
                <Image
                  src={entry.image}
                  alt={entry.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 767px) 100vw, 1200px"
                  style={{ objectPosition: entry.imagePosition }}
                />
                <span className="case-study-card__grade" aria-hidden="true" />
                <span className="case-study-card__copy">
                  <small>{entry.kicker}</small>
                  <strong>{entry.listingTitle}</strong>
                  <span>
                    See how we built it <ArrowUpRight aria-hidden="true" size={18} />
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}

export function InsightListing({ entries }: { entries: readonly InsightEntry[] }) {
  return (
    <main className="insight-listing-page">
      <header className="editorial-listing-hero editorial-listing-hero--insights entrance-reveal" data-atmosphere="teal">
        <Container>
          <p className="section-kicker">Automotive insights</p>
          <h1>Practical thinking for what comes next.</h1>
          <p>
            Product, workflow, and technology perspectives for teams building
            better automotive businesses.
          </p>
          <a href="#insight-list" className="editorial-listing-hero__cue">
            Read the insights <ArrowDownRight aria-hidden="true" size={17} />
          </a>
        </Container>
      </header>

      <section id="insight-list" className="insight-list" data-atmosphere="petrol">
        <Container>
          {entries.map((entry, index) => (
            <article className={`insight-list-card insight-list-card--${index + 1}`} key={entry.slug}>
              <Link
                href={`/insights/${entry.slug}`}
                className="clickable-image-card"
              >
                <span className="insight-list-card__media">
                  <Image
                    src={entry.image}
                    alt={entry.imageAlt}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    style={{ objectPosition: entry.imagePosition }}
                  />
                  <span aria-hidden="true" />
                </span>
                <span className="insight-list-card__meta">
                  <small>{entry.category}</small>
                  <time dateTime={entry.publishedAt}>{entry.displayDate}</time>
                </span>
                <strong>{entry.shortTitle}</strong>
                <span className="insight-list-card__action">
                  Read insight <ArrowUpRight aria-hidden="true" size={17} />
                </span>
              </Link>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
