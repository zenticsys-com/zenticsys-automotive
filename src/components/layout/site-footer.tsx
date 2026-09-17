import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { legalNavigation, primaryNavigation, projectNavigation } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__lead">
          <p className="section-kicker">Start something in motion</p>
          <h2>Have an automotive project to build?</h2>
          <Link href="/request-a-proposal" className="footer-proposal-link">
            Request a Proposal
            <ArrowUpRight aria-hidden="true" size={22} />
          </Link>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <span className="site-footer__mark" aria-hidden="true">
              Z
            </span>
            <p>
              Digital systems for businesses that sell, service, manage, and
              move vehicles.
            </p>
          </div>

          <FooterGroup title="Explore" links={primaryNavigation.slice(1)} />
          <FooterGroup title="Start a project" links={projectNavigation} />

          <div className="footer-group">
            <p className="footer-group__title">Contact</p>
            <a href="mailto:info@zenticsys.com">info@zenticsys.com</a>
            <a
              href="https://www.linkedin.com/company/zenticsys/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="site-footer__legal">
          <span>© {new Date().getFullYear()} Zenticsys</span>
          <div>
            {legalNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

type FooterGroupProps = {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
};

function FooterGroup({ title, links }: FooterGroupProps) {
  return (
    <nav className="footer-group" aria-label={`${title} links`}>
      <p className="footer-group__title">{title}</p>
      {links.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
