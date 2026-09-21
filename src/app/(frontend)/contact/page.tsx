import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact Zenticsys",
  description: "Write to Zenticsys about an automotive website, digital platform, integration, or custom software project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Zenticsys",
    description: "Start a low-commitment conversation about your automotive digital project.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Zenticsys",
    description: "Start a low-commitment conversation about your automotive digital project.",
  },
};

function safeWhatsAppUrl() {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim();
  if (!configured) return null;
  try {
    const url = new URL(configured);
    return url.protocol === "https:" && ["wa.me", "api.whatsapp.com"].includes(url.hostname) ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function ContactPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@zenticsys.com";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
  const whatsappUrl = safeWhatsAppUrl();

  return (
    <main className="conversion-page contact-page" data-atmosphere="steel">
      <Container>
        <header className="conversion-hero conversion-hero--compact entrance-reveal">
          <p className="section-kicker">Write a message</p>
          <h1>Start with the question—not a complete specification.</h1>
          <p>Tell us what is happening in the business and what you are considering. We’ll help identify the useful next conversation.</p>
        </header>

        <section className="contact-layout" aria-label="Contact Zenticsys">
          <div className="contact-direct">
            <p className="section-kicker">Direct contact</p>
            <h2>Choose the path that fits.</h2>
            <a href={`mailto:${publicEmail}`} className="contact-method"><Mail aria-hidden="true" /><span><strong>Email</strong>{publicEmail}</span><ArrowUpRight aria-hidden="true" /></a>
            {phone ? <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="contact-method"><Phone aria-hidden="true" /><span><strong>Phone</strong>{phone}</span><ArrowUpRight aria-hidden="true" /></a> : null}
            {whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-method"><MessageCircle aria-hidden="true" /><span><strong>WhatsApp</strong>Start a conversation</span><ArrowUpRight aria-hidden="true" /></a> : null}
            <p className="response-expectation"><strong>What to expect</strong>We review project messages before replying so the response has context. Urgent support requests for an existing engagement should use the agreed support channel.</p>
            <div className="contact-next-paths"><Link href="/request-a-proposal">Request a detailed proposal</Link><Link href="/schedule-a-call">Schedule a 30-minute call</Link></div>
          </div>
          <div className="contact-form-shell">
            <p className="section-kicker">Low-commitment enquiry</p>
            <h2>What would you like to discuss?</h2>
            <ContactForm turnstileSiteKey={turnstileSiteKey} />
          </div>
        </section>
      </Container>
    </main>
  );
}
