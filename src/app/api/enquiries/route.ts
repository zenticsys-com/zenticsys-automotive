import { NextResponse, type NextRequest } from "next/server";

import { validateEnquiry } from "@/lib/forms/enquiry";
import { sendEnquiryEmail } from "@/lib/forms/resend";
import { verifyTurnstile } from "@/lib/forms/turnstile";

export const runtime = "nodejs";

type RateRecord = { count: number; resetAt: number };
const rateStore = new Map<string, RateRecord>();
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT = 5;

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateStore.get(key);
  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return process.env.NODE_ENV !== "production";
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ message: "This submission could not be verified." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 5 * 1024 * 1024) {
    return NextResponse.json({ message: "The submission is too large." }, { status: 413 });
  }

  const clientIp = getClientIp(request);
  if (clientIp !== "unknown" && isRateLimited(clientIp)) {
    return NextResponse.json(
      { message: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "The form data could not be read." }, { status: 400 });
  }

  // Bots commonly fill this visually hidden field. Return a neutral success so
  // the endpoint does not teach automated submitters how it rejected them.
  if (String(formData.get("websiteConfirmation") || "").trim()) {
    return NextResponse.json({ ok: true, referenceId: "received" });
  }

  const validation = validateEnquiry(formData);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Please review the highlighted information.", errors: validation.errors },
      { status: 400 },
    );
  }

  const action = validation.data.kind === "proposal" ? "proposal" : "contact";
  const turnstileValid = await verifyTurnstile({
    token: String(formData.get("cf-turnstile-response") || ""),
    remoteIp: clientIp === "unknown" ? undefined : clientIp,
    expectedAction: action,
  });
  if (!turnstileValid) {
    return NextResponse.json(
      { message: "The security check expired or could not be verified. Please try again." },
      { status: 400 },
    );
  }

  const referenceId = crypto.randomUUID();
  const delivery = await sendEnquiryEmail(validation.data, referenceId);
  if (!delivery.success) {
    const message =
      delivery.reason === "not-configured"
        ? "Online submissions are being configured. Please email info@zenticsys.com for now."
        : "We could not send your enquiry right now. Please try again or email info@zenticsys.com.";
    return NextResponse.json({ message }, { status: 503 });
  }

  return NextResponse.json({ ok: true, referenceId });
}
