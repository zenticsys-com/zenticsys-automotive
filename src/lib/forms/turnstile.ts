type TurnstileResult = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstile({
  token,
  remoteIp,
  expectedAction,
}: {
  token: string;
  remoteIp?: string;
  expectedAction: string;
}) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  if (!token || token.length > 2048) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: remoteIp,
        idempotency_key: crypto.randomUUID(),
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    const result = (await response.json()) as TurnstileResult;
    return result.success && (!result.action || result.action === expectedAction);
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
