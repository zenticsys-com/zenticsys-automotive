"use client";

import { Check, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

import { resetTurnstile, TurnstileWidget } from "@/components/forms/turnstile-widget";

type State = { status: "idle" | "submitting" | "success" | "error"; message?: string; referenceId?: string };

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [state, setState] = useState<State>({ status: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setState({ status: "submitting" });
    try {
      const response = await fetch("/api/enquiries", { method: "POST", body: new FormData(event.currentTarget) });
      const result = (await response.json()) as { ok?: boolean; message?: string; referenceId?: string };
      if (!response.ok || !result.ok) {
        setState({ status: "error", message: result.message || "We could not send your message." });
        resetTurnstile();
        return;
      }
      setState({ status: "success", referenceId: result.referenceId });
    } catch {
      setState({ status: "error", message: "The connection was interrupted. Please try again or email us directly." });
      resetTurnstile();
    }
  }

  if (state.status === "success") {
    return (
      <div className="form-success form-success--compact" role="status">
        <span className="form-success__icon" aria-hidden="true"><Check size={25} /></span>
        <h2>Message received.</h2>
        <p>Thank you. We’ll review it and reply using the contact details you provided.</p>
        {state.referenceId ? <small>Reference: {state.referenceId}</small> : null}
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input type="hidden" name="kind" value="message" />
      <div className="honeypot-field" aria-hidden="true"><label htmlFor="contact-website-confirmation">Leave empty</label><input id="contact-website-confirmation" name="websiteConfirmation" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-grid">
        <label className="form-field"><span>Your name <em>Required</em></span><input name="name" autoComplete="name" required /></label>
        <label className="form-field"><span>Work email <em>Required</em></span><input name="email" type="email" autoComplete="email" required /></label>
        <label className="form-field"><span>Business or organisation</span><input name="company" autoComplete="organization" /></label>
        <label className="form-field"><span>Phone or WhatsApp</span><input name="phone" type="tel" autoComplete="tel" /></label>
        <label className="form-field form-field--wide"><span>Subject <em>Required</em></span><input name="subject" required minLength={3} /></label>
        <label className="form-field form-field--wide"><span>How can we help? <em>Required</em></span><textarea name="message" required minLength={20} rows={6} /></label>
        <label className="form-field"><span>Preferred reply</span><select name="preferredContact" defaultValue="Email"><option>Email</option><option>Phone</option><option>WhatsApp</option></select></label>
      </div>
      <label className="consent-field"><input type="checkbox" name="consent" required /><span>I agree that Zenticsys may use these details to respond to my message. See the <Link href="/privacy">privacy notice</Link>.</span></label>
      <TurnstileWidget siteKey={turnstileSiteKey} action="contact" />
      {state.status === "error" ? <p className="form-alert" role="alert">{state.message}</p> : null}
      <button type="submit" className="form-button" disabled={state.status === "submitting"}>{state.status === "submitting" ? "Sending…" : "Send message"} <Send size={17} aria-hidden="true" /></button>
    </form>
  );
}
