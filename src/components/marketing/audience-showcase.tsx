"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type AudienceItem = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly image: string;
  readonly position: string;
};

export function AudienceShowcase({ items }: { items: readonly AudienceItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <div className="audience-showcase">
      <div
        className="audience-stage"
        aria-hidden="true"
        style={{ position: "relative" }}
      >
        {items.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 767px) 0px, (max-width: 1199px) 58vw, 760px"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={index === activeIndex ? "is-active" : ""}
            style={{ objectPosition: item.position }}
          />
        ))}
        <span className="audience-stage__wash" />
        <span className="audience-stage__count">
          {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <span className="audience-stage__caption">
          <small>Automotive operation</small>
          <strong>{activeItem.title}</strong>
        </span>
      </div>

      <nav className="audience-selector" aria-label="Automotive businesses we serve">
        {items.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className={`audience-selector__item clickable-image-card${index === activeIndex ? " is-active" : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          >
            <span
              className="audience-mobile-media"
              aria-hidden="true"
              style={{ position: "absolute" }}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="82vw"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                style={{ objectPosition: item.position }}
              />
              <span />
            </span>
            <span className="audience-selector__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="audience-selector__copy">
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
            <ArrowUpRight aria-hidden="true" size={19} />
          </Link>
        ))}
      </nav>
    </div>
  );
}
