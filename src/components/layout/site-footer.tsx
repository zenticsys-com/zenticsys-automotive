import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { legalNavigation } from "@/lib/navigation";

type SiteFooterProps = {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  copyright: string;
  linkGroups: ReadonlyArray<{ title: string; links: ReadonlyArray<{ label: string; href: string }> }>;
  email: string;
  socialLinks: ReadonlyArray<{ label: string; href: string }>;
};

export function SiteFooter({ kicker, title, description, ctaLabel, ctaHref, copyright, linkGroups, email, socialLinks }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__lead">
          <p className="section-kicker">{kicker}</p>
          <h2>{title}</h2>
          <Link href={ctaHref} className="footer-proposal-link">
            {ctaLabel}
            <ArrowUpRight aria-hidden="true" size={22} />
          </Link>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <span className="site-footer__mark" aria-hidden="true">
              Z
            </span>
            <p>{description}</p>
          </div>

          {linkGroups.map((group) => <FooterGroup key={group.title} title={group.title} links={group.links} />)}

          <div className="footer-group">
            <p className="footer-group__title">Contact</p>
            <a href={`mailto:${email}`}>{email}</a>
            {socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}
          </div>
        </div>

        <div className="site-footer__legal">
          <span>© {new Date().getFullYear()} {copyright}</span>
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
