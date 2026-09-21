import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Zenticsys handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page" data-atmosphere="steel">
      <Container>
        <header><p className="section-kicker">Privacy notice</p><h1>How website enquiries are handled.</h1><p>Last updated: 22 September 2026</p></header>
        <article>
          <section><h2>Information you provide</h2><p>When you request a proposal or send a message, Zenticsys receives the information entered in the form, including contact details, business context, project requirements, planning ranges, links, and any optional attachment. When you book a call, Calendly processes the booking information you provide.</p></section>
          <section><h2>Why we use it</h2><p>We use enquiry information to understand your request, assess whether Zenticsys can help, respond to you, prepare conversations or proposals, protect the forms from abuse, and maintain necessary business records.</p></section>
          <section><h2>Services involved</h2><p>Form delivery may involve Resend, while bot protection may involve Cloudflare Turnstile. Scheduling uses Calendly, Google Calendar, and Google Meet. These providers process relevant information under their own terms and privacy commitments.</p></section>
          <section><h2>Retention and sharing</h2><p>We keep enquiry information only as long as reasonably needed for the conversation, legal obligations, security, and business records. We do not sell enquiry information. Access is limited to Zenticsys personnel and service providers needed to operate these website functions.</p></section>
          <section><h2>Your choices</h2><p>You may ask about, correct, or request deletion of enquiry information, subject to obligations that require retention. You can avoid the forms and contact us directly by email.</p></section>
          <section><h2>Contact</h2><p>For privacy questions, email <a href="mailto:info@zenticsys.com">info@zenticsys.com</a>. This notice should receive a final legal review before production launch.</p></section>
        </article>
      </Container>
    </main>
  );
}
