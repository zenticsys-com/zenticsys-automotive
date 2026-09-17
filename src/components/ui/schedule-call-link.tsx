import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ScheduleCallLinkProps = {
  className?: string;
  compact?: boolean;
  onNavigate?: () => void;
};

export function ScheduleCallLink({
  className = "",
  compact = false,
  onNavigate,
}: ScheduleCallLinkProps) {
  return (
    <Link
      href="/schedule-a-call"
      className={`running-border-cta ${compact ? "running-border-cta--compact" : ""} ${className}`.trim()}
      onClick={onNavigate}
    >
      <span className="running-border-cta__label">
        <span className="running-border-cta__full-label">Schedule a Call</span>
        <span className="running-border-cta__short-label">Schedule</span>
      </span>
      {!compact && <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />}
    </Link>
  );
}
