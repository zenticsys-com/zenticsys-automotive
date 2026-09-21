import { SiteLogo } from "@/components/layout/site-logo";
import { MenuOverlay } from "@/components/navigation/menu-overlay";
import { ScheduleCallLink } from "@/components/ui/schedule-call-link";

type SiteHeaderProps = {
  primaryLinks: ReadonlyArray<{ label: string; href: string }>;
  projectLinks: ReadonlyArray<{ label: string; href: string }>;
  scheduleLabel: string;
  email: string;
};

export function SiteHeader({ primaryLinks, projectLinks, scheduleLabel, email }: SiteHeaderProps) {
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
          <ScheduleCallLink compact label={scheduleLabel} />
          <MenuOverlay primaryLinks={primaryLinks} projectLinks={projectLinks} scheduleLabel={scheduleLabel} email={email} />
        </div>
      </div>
    </header>
  );
}
