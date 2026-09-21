import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description: "Terms governing access to and use of the Zenticsys website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Website Terms of Use | Zenticsys",
    description: "Terms governing access to and use of the Zenticsys website.",
    url: "/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Terms of Use | Zenticsys",
    description: "Terms governing access to and use of the Zenticsys website.",
  },
};

export default function TermsPage() {
  return (
    <main className="legal-page" data-atmosphere="steel">
      <Container>
        <header><p className="section-kicker">Terms of use</p><h1>Using the Zenticsys website.</h1><p>Last updated: 22 September 2026</p></header>
        <article>
          <section><h2>Website information</h2><p>This website provides general information about Zenticsys, its automotive technology experience, and the types of services it may offer. Content is not a binding proposal, warranty, or commitment to deliver a particular product, scope, schedule, or result.</p></section>
          <section><h2>Project discussions</h2><p>Submitting a form, scheduling a call, or exchanging messages does not create a client relationship. Any engagement begins only after the parties approve a separate written agreement covering scope, responsibilities, fees, intellectual property, confidentiality, and other applicable terms.</p></section>
          <section><h2>Permitted use</h2><p>You may use the website for lawful business research and communication. Do not interfere with its operation, attempt unauthorized access, submit malicious material, misuse forms, scrape personal information, or present website content as your own work.</p></section>
          <section><h2>Content and third-party services</h2><p>Zenticsys branding, original copy, interface design, and original materials remain protected by applicable rights. Properly licensed stock assets and third-party trademarks remain subject to their respective owners&apos; rights. Links, scheduling, email, bot protection, and other third-party services may be governed by separate terms.</p></section>
          <section><h2>Availability and liability</h2><p>We aim to keep the website accurate and available, but it may contain errors or experience interruption. To the extent permitted by applicable law, Zenticsys is not responsible for decisions made solely from general website content or for third-party services outside its control.</p></section>
          <section><h2>Contact and legal review</h2><p>Questions may be sent to <a href="mailto:info@zenticsys.com">info@zenticsys.com</a>. These terms are an operational website draft and must receive final review for the legal entity, jurisdiction, and production launch.</p></section>
        </article>
      </Container>
    </main>
  );
}
