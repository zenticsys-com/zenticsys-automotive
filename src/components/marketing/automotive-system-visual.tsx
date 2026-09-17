import { Activity, CarFront, Gavel, Wrench } from "lucide-react";

const events = [
  { label: "Vehicle enquiry", meta: "Website · now", tone: "brand" },
  { label: "Service confirmed", meta: "Workshop · 09:30", tone: "green" },
  { label: "Dealer bid received", meta: "Auction · live", tone: "amber" },
] as const;

export function AutomotiveSystemVisual() {
  return (
    <div className="system-visual" aria-label="Illustration of a connected automotive platform">
      <div className="system-visual__glow" aria-hidden="true" />

      <div className="system-panel system-panel--inventory">
        <div className="system-panel__bar">
          <span>Inventory</span>
          <span className="system-status">Live</span>
        </div>
        <div className="vehicle-row">
          <span className="vehicle-row__icon"><CarFront aria-hidden="true" size={19} /></span>
          <span><strong>2026 Horizon LX</strong><small>In stock · Published</small></span>
          <span className="vehicle-row__price">$42,800</span>
        </div>
        <div className="vehicle-row vehicle-row--muted">
          <span className="vehicle-row__icon"><CarFront aria-hidden="true" size={19} /></span>
          <span><strong>2025 Atlas Touring</strong><small>Reserved · Follow-up</small></span>
          <span className="vehicle-row__price">$38,400</span>
        </div>
      </div>

      <div className="system-panel system-panel--operations">
        <div className="system-panel__bar">
          <span>Operations pulse</span>
          <Activity aria-hidden="true" size={16} />
        </div>
        <div className="operations-chart" aria-hidden="true">
          {[42, 58, 48, 72, 66, 84, 92, 76, 96].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="operations-legend"><span>Leads</span><span>Bookings</span><span>Active bids</span></div>
      </div>

      <div className="system-panel system-panel--events">
        <div className="system-panel__bar"><span>Connected activity</span><span>03</span></div>
        <div className="event-list">
          {events.map((event) => (
            <div className="event-item" key={event.label}>
              <span className={`event-dot event-dot--${event.tone}`} />
              <span><strong>{event.label}</strong><small>{event.meta}</small></span>
            </div>
          ))}
        </div>
      </div>

      <div className="system-chip system-chip--service">
        <Wrench aria-hidden="true" size={16} />
        <span>Service</span><strong>12 today</strong>
      </div>
      <div className="system-chip system-chip--auction">
        <Gavel aria-hidden="true" size={16} />
        <span>Auction</span><strong>Live</strong>
      </div>
    </div>
  );
}
