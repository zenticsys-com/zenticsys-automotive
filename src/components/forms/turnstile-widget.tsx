"use client";

import Script from "next/script";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string | HTMLElement) => void };
  }
}

export function TurnstileWidget({ siteKey, action }: { siteKey?: string; action: string }) {
  if (!siteKey) {
    return (
      <p className="form-configuration-note" role="note">
        Security verification will appear here after the form integration is configured.
      </p>
    );
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div
        className="cf-turnstile turnstile-shell"
        data-sitekey={siteKey}
        data-theme="dark"
        data-size="flexible"
        data-action={action}
        data-refresh-expired="auto"
      />
    </>
  );
}

export function resetTurnstile() {
  window.turnstile?.reset();
}
