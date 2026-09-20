import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CatalogEntry } from "@/content/solutions-services";
import { Container } from "@/components/ui/container";

export function CatalogListing({
  entries,
  eyebrow,
  title,
  intro,
  collection,
}: {
  entries: readonly CatalogEntry[];
  eyebrow: string;
  title: string;
  intro: string;
  collection: "solutions" | "services";
}) {
  return (
    <main className="catalog-page">
      <header className="catalog-hero entrance-reveal" data-atmosphere="amber">
        <Container>
          <p className="section-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          <a className="catalog-hero__cue" href="#catalog-list">
            Explore {collection} <ArrowDownRight aria-hidden="true" size={17} />
          </a>
        </Container>
      </header>

      <section
        id="catalog-list"
        className="catalog-list"
        aria-label={`Automotive ${collection}`}
        data-atmosphere="ember"
      >
        <Container>
          {entries.map((entry, index) => (
            <article className="catalog-card" key={entry.slug}>
              <Link
                href={`/${collection}/${entry.slug}`}
                className="clickable-image-card"
              >
                <Image
                  src={entry.image}
                  alt={entry.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 1200px"
                  style={{ objectPosition: entry.imagePosition }}
                  priority={index === 0}
                />
                <span className="catalog-card__grade" aria-hidden="true" />
                <span className="catalog-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="catalog-card__copy">
                  <small>{entry.kicker}</small>
                  <strong>{entry.listingTitle}</strong>
                  <span>
                    Explore {entry.kind} <ArrowUpRight aria-hidden="true" size={17} />
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
