import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { InsightEntry } from "@/content/editorial";
import { insights } from "@/content/editorial";
import { Container } from "@/components/ui/container";

export function InsightDetail({ entry }: { entry: InsightEntry }) {
  const related = entry.relatedSlugs
    .map((slug) => insights.find((item) => item.slug === slug))
    .filter((item): item is InsightEntry => Boolean(item));

  return (
    <main className="insight-detail-page">
      <article>
        <header className="insight-detail-hero entrance-reveal" data-atmosphere="teal">
          <Container>
            <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/insights">Insights</Link><span>/</span>
              <span aria-current="page">{entry.category}</span>
            </nav>
            <p className="section-kicker">{entry.category}</p>
            <h1>{entry.title}</h1>
            <p className="insight-detail-hero__excerpt">{entry.excerpt}</p>
            <div className="insight-byline">
              <span>By {entry.author}</span>
              <time dateTime={entry.publishedAt}>{entry.displayDate}</time>
              <span>{entry.readingTime}</span>
            </div>
            <figure className="insight-detail-hero__visual">
              <Image
                src={entry.image}
                alt={entry.imageAlt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 1280px"
                style={{ objectPosition: entry.imagePosition }}
              />
              <span aria-hidden="true" />
            </figure>
          </Container>
        </header>

        <section className="insight-article" data-atmosphere="petrol">
          <Container>
            <aside className="insight-toc" aria-label="On this page">
              <p>On this page</p>
              <ol>
                {entry.sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>{section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="insight-article__body">
              <div className="insight-article__intro">
                {entry.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <div className="insight-flow" role="img" aria-label={`Workflow lens for ${entry.category}`}>
                <span>Signal</span><ArrowRight aria-hidden="true" size={18} />
                <span>Decision</span><ArrowRight aria-hidden="true" size={18} />
                <span>Action</span><ArrowRight aria-hidden="true" size={18} />
                <span>Recorded outcome</span>
              </div>

              {entry.sections.map((section, index) => (
                <section id={section.id} className="insight-article__section" key={section.id}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.points ? (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}><Check aria-hidden="true" size={17} />{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="insight-takeaways" aria-labelledby="takeaways-title">
                <p className="section-kicker">Practical summary</p>
                <h2 id="takeaways-title">What to carry into the project.</h2>
                <ul>
                  {entry.takeaways.map((takeaway) => (
                    <li key={takeaway}><Check aria-hidden="true" size={18} />{takeaway}</li>
                  ))}
                </ul>
              </section>
            </div>
          </Container>
        </section>
      </article>

      <section className="insight-related" data-atmosphere="steel">
        <Container>
          <div className="insight-related__heading">
            <div><p className="section-kicker">Continue reading</p><h2>Related automotive insights.</h2></div>
            <Link href="/insights">View all insights <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
          <div className="insight-related__grid">
            {related.map((item) => (
              <Link href={`/insights/${item.slug}`} className="insight-related-card clickable-image-card" key={item.slug}>
                <span className="insight-related-card__media">
                  <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" style={{ objectPosition: item.imagePosition }} />
                  <span aria-hidden="true" />
                </span>
                <small>{item.category}</small>
                <strong>{item.shortTitle}</strong>
                <span>Read insight <ArrowUpRight aria-hidden="true" size={16} /></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="insight-cta" data-atmosphere="brand">
        <Container>
          <div><p className="section-kicker">Put the thinking to work</p><h2>Planning an automotive digital product?</h2></div>
          <div><p>Share the workflow, users, and business outcome you need to improve.</p><Link href="/request-a-proposal" className="primary-link">Request a Proposal <ArrowUpRight aria-hidden="true" size={19} /></Link></div>
        </Container>
      </section>
    </main>
  );
}
