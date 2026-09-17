"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type AtmosphereVariant =
  | "brand"
  | "amber"
  | "petrol"
  | "ember"
  | "steel"
  | "teal"
  | "solutions"
  | "cases"
  | "insights"
  | "about"
  | "proposal";

type PageAtmosphereProps = {
  variant?: AtmosphereVariant;
};

const supportedPalettes = new Set([
  "brand",
  "amber",
  "petrol",
  "ember",
  "steel",
  "teal",
]);

export function PageAtmosphere({ variant = "brand" }: PageAtmosphereProps) {
  const pathname = usePathname();
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    if (!atmosphere) {
      return;
    }

    atmosphere.dataset.palette = variant;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-atmosphere]"),
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!activeEntry) {
          return;
        }

        const nextPalette = (activeEntry.target as HTMLElement).dataset
          .atmosphere;

        if (nextPalette && supportedPalettes.has(nextPalette)) {
          atmosphere.dataset.palette = nextPalette;
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.01],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname, variant]);

  return (
    <div
      ref={atmosphereRef}
      className={`page-atmosphere page-atmosphere--${variant}`}
      data-palette={variant}
      aria-hidden="true"
    >
      <span className="page-atmosphere__light" />
      <span className="page-atmosphere__road" />
    </div>
  );
}
