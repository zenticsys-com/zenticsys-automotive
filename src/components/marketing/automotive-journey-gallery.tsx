import Image from "next/image";

const journeyStations = [
  {
    number: "01",
    title: "Dealership showroom",
    image: "/images/journey-dealership.jpg",
    position: "center center",
    className: "journey-station--dealership",
  },
  {
    number: "02",
    title: "Service workshop",
    image: "/images/journey-service.jpg",
    position: "32% center",
    className: "journey-station--service",
  },
  {
    number: "03",
    title: "Commercial fleet",
    image: "/images/journey-fleet.jpg",
    position: "center center",
    className: "journey-station--fleet",
  },
  {
    number: "04",
    title: "Live vehicle auction",
    image: "/images/journey-auction.jpg",
    position: "58% center",
    className: "journey-station--auction",
  },
] as const;

export function AutomotiveJourneyGallery() {
  return (
    <figure className="journey-gallery">
      <figcaption className="journey-gallery__heading">
        <small>Across the automotive lifecycle</small>
        <strong>One industry, connected at every turn.</strong>
      </figcaption>

      <div className="journey-gallery__viewport">
        <div className="journey-gallery__track">
          <svg
            className="journey-road"
            viewBox="0 0 1200 280"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="journey-road__edge"
              d="M20 170 C120 35 245 40 330 145 S500 265 615 145 S790 35 900 145 S1080 245 1180 105"
            />
            <path
              className="journey-road__line"
              d="M20 170 C120 35 245 40 330 145 S500 265 615 145 S790 35 900 145 S1080 245 1180 105"
            />
          </svg>

          {journeyStations.map((station, index) => (
            <article
              className={`journey-station ${station.className}`}
              key={station.title}
            >
              <div className="journey-station__surface">
                <div className="journey-station__media">
                  <Image
                    src={station.image}
                    alt=""
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 767px) 72vw, 280px"
                    style={{ objectPosition: station.position }}
                  />
                  <span className="journey-station__wash" />
                </div>
                <span className="journey-station__copy">
                  <small>{station.number}</small>
                  <strong>{station.title}</strong>
                </span>
              </div>
              <span className="journey-station__node" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </figure>
  );
}
