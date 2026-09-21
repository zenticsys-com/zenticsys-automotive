import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Video } from "lucide-react";

import { Container } from "@/components/ui/container";
import { getCalendlyEmbedUrl, getCalendlyUrl } from "@/lib/scheduling/calendly";

export const metadata: Metadata = {
  title: "Schedule an Automotive Project Call",
  description: "Book a 30-minute Google Meet consultation with Zenticsys to discuss an automotive website, platform, or software project.",
  alternates: { canonical: "/schedule-a-call" },
  openGraph: {
    title: "Schedule an Automotive Project Call | Zenticsys",
    description: "Choose a convenient time for a focused 30-minute automotive project consultation.",
    url: "/schedule-a-call",
  },
};

export default function ScheduleCallPage() {
  const embedUrl = getCalendlyEmbedUrl();
  const publicUrl = getCalendlyUrl();

  return (
    <main className="conversion-page schedule-page" data-atmosphere="amber">
      <Container>
        <header className="conversion-hero conversion-hero--compact entrance-reveal">
          <p className="section-kicker">Schedule a consultation</p>
          <h1>Thirty focused minutes about what you need to move forward.</h1>
          <p>Choose a time through Calendly. The confirmed meeting takes place on Google Meet.</p>
        </header>

        <section className="schedule-layout" aria-labelledby="booking-heading">
          <div className="schedule-context">
            <p className="section-kicker">Automotive project consultation</p>
            <h2 id="booking-heading">A useful fit check—not a sales script.</h2>
            <p>Bring the workflow, problem, or opportunity. We’ll discuss users, constraints, likely scope, and the clearest next step.</p>
            <ul className="schedule-facts">
              <li><Clock3 aria-hidden="true" /><span><strong>30 minutes</strong>One focused consultation</span></li>
              <li><Video aria-hidden="true" /><span><strong>Google Meet</strong>The link arrives with the calendar invitation</span></li>
              <li><CalendarDays aria-hidden="true" /><span><strong>Your local time</strong>Calendly displays available slots in your timezone</span></li>
            </ul>
            <div className="schedule-alternatives">
              <p>Not ready to book?</p>
              <Link href="/request-a-proposal">Request a proposal <ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link href="/contact">Write a message <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>

          <div className="calendly-frame">
            {embedUrl ? (
              <>
                <iframe title="Book an Automotive Project Consultation with Zenticsys" src={embedUrl} loading="eager" />
                <p className="calendly-frame__fallback">Having trouble with the calendar? <a href={publicUrl?.toString()} target="_blank" rel="noreferrer">Open Calendly in a new tab</a>.</p>
              </>
            ) : (
              <div className="calendly-placeholder" role="status">
                <CalendarDays size={34} aria-hidden="true" />
                <h2>Booking calendar configuration pending</h2>
                <p>The consultation event will appear here after the public Calendly event URL is added.</p>
                <Link href="/contact" className="primary-link">Write a message instead <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}
