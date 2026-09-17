import { SiteLogo } from "@/components/layout/site-logo";
import { MenuOverlay } from "@/components/navigation/menu-overlay";
import { ScheduleCallLink } from "@/components/ui/schedule-call-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <span
          className="site-header__glass"
          aria-hidden="true"
          style={{
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        />
        <SiteLogo />
        <div className="site-header__actions">
          <ScheduleCallLink compact />
          <MenuOverlay />
        </div>
      </div>
    </header>
  );
}
