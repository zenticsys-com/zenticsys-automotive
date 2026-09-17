import Image from "next/image";

const ecosystemSignals = [
  { label: "Dealership", className: "ecosystem-signal--dealership" },
  { label: "Service", className: "ecosystem-signal--service" },
  { label: "Fleet", className: "ecosystem-signal--fleet" },
  { label: "Auction", className: "ecosystem-signal--auction" },
] as const;

export function AutomotiveEcosystemVisual() {
  return (
    <figure className="ecosystem-visual">
      <Image
        src="/images/automotive-ecosystem-hero.jpg"
        alt="A connected automotive environment spanning a dealership, service workshop, vehicle fleet, and live auction"
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1199px) 92vw, 1248px"
        className="ecosystem-visual__image"
      />
      <span className="ecosystem-visual__wash" aria-hidden="true" />

      <svg
        className="ecosystem-visual__routes"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M80 735 C350 650 565 715 790 650 C1040 578 1220 520 1530 420" />
        <path d="M250 820 C510 740 725 790 950 700 C1160 615 1330 600 1580 515" />
      </svg>

      <span className="ecosystem-visual__signals" aria-hidden="true">
        {ecosystemSignals.map((signal) => (
          <span
            className={`ecosystem-signal ${signal.className}`}
            key={signal.label}
          >
            <i />
            <small>{signal.label}</small>
          </span>
        ))}
      </span>

      <figcaption className="ecosystem-visual__caption">
        <small>One connected automotive ecosystem</small>
        <strong>From showroom to service, fleet, and auction.</strong>
      </figcaption>
    </figure>
  );
}
