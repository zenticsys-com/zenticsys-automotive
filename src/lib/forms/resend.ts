import type { ValidatedEnquiry } from "@/lib/forms/enquiry";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendEnquiryEmail(enquiry: ValidatedEnquiry, referenceId: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    return { success: false as const, reason: "not-configured" as const };
  }

  const subjectLabel = enquiry.kind === "proposal" ? "Automotive proposal request" : "Website message";
  const rows = [
    { label: "Reference", value: referenceId },
    { label: "Name", value: enquiry.name },
    { label: "Email", value: enquiry.email },
    { label: "Phone", value: enquiry.phone || "Not provided" },
    { label: "Company", value: enquiry.company || "Not provided" },
    { label: "Preferred contact", value: enquiry.preferredContact },
    ...enquiry.fields,
  ];
  const textBody = rows.map(({ label, value }) => `${label}:\n${value}`).join("\n\n");
  const htmlBody = rows
    .map(
      ({ label, value }) =>
        `<tr><th style="padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:12px;white-space:pre-wrap;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const attachments = enquiry.attachment
    ? [
        {
          filename: cleanHeader(enquiry.attachment.name).slice(0, 180),
          content: Buffer.from(await enquiry.attachment.arrayBuffer()).toString("base64"),
        },
      ]
    : undefined;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `zenticsys-enquiry/${referenceId}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `${subjectLabel} — ${cleanHeader(enquiry.company || enquiry.name)}`,
        text: textBody,
        html: `<h1>${subjectLabel}</h1><table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">${htmlBody}</table>`,
        attachments,
      }),
      cache: "no-store",
    });

    if (!response.ok) return { success: false as const, reason: "provider-error" as const };
    return { success: true as const };
  } catch {
    return { success: false as const, reason: "provider-error" as const };
  }
}
