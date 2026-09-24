"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      remove: (widget: string) => void;
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme: "dark";
          size: "compact" | "flexible";
          action: string;
          "refresh-expired": "auto";
        },
      ) => string;
      reset: (widget?: string | HTMLElement) => void;
    };
  }
}

export function TurnstileWidget({ siteKey, action }: { siteKey?: string; action: string }) {
  const [size, setSize] = useState<"compact" | "flexible" | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 380px)");
    const updateSize = () => setSize(media.matches ? "compact" : "flexible");

    updateSize();
    media.addEventListener("change", updateSize);
    return () => media.removeEventListener("change", updateSize);
  }, []);

  useEffect(() => {
    if (!siteKey || !size || !scriptReady || !containerRef.current || !window.turnstile) return;

    const widget = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "dark",
      size,
      action,
      "refresh-expired": "auto",
    });

    return () => window.turnstile?.remove(widget);
  }, [action, scriptReady, siteKey, size]);

  if (!siteKey) {
    return (
      <p className="form-configuration-note" role="note">
        Security verification will appear here after the form integration is configured.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div
        ref={containerRef}
        className={`turnstile-shell${size ? "" : " turnstile-shell--loading"}`}
      />
    </>
  );
}

export function resetTurnstile() {
  window.turnstile?.reset();
}
