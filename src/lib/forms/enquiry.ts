import { getProjectType } from "@/content/conversion";

export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

const allowedAttachmentTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export type EnquiryKind = "proposal" | "message";

export type ValidatedEnquiry = {
  kind: EnquiryKind;
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredContact: string;
  fields: Array<{ label: string; value: string }>;
  attachment?: File;
};

export type ValidationResult =
  | { success: true; data: ValidatedEnquiry }
  | { success: false; errors: Record<string, string> };

function text(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateContactFields(formData: FormData, errors: Record<string, string>) {
  const name = text(formData, "name", 120);
  const email = text(formData, "email", 254).toLowerCase();
  const phone = text(formData, "phone", 60);
  const company = text(formData, "company", 160);
  const preferredContact = text(formData, "preferredContact", 40) || "Email";

  if (name.length < 2) errors.name = "Enter your name.";
  if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (!formData.has("consent")) errors.consent = "Please confirm that we may respond to your enquiry.";

  return { name, email, phone, company, preferredContact };
}

export function validateEnquiry(formData: FormData): ValidationResult {
  const kind = text(formData, "kind", 20) as EnquiryKind;
  const errors: Record<string, string> = {};

  if (kind !== "proposal" && kind !== "message") {
    return { success: false, errors: { form: "This enquiry type is not supported." } };
  }

  const contact = validateContactFields(formData, errors);
  const fields: Array<{ label: string; value: string }> = [];

  if (kind === "proposal") {
    const projectType = text(formData, "projectType", 60);
    const project = getProjectType(projectType);
    const businessType = text(formData, "businessType", 180);
    const primaryGoal = text(formData, "primaryGoal", 3000);
    const users = text(formData, "users", 1500);
    const integrations = text(formData, "integrations", 1500);
    const existingSystems = text(formData, "existingSystems", 1500);
    const timeline = text(formData, "timeline", 80);
    const budget = text(formData, "budget", 80);
    const decisionStage = text(formData, "decisionStage", 600);
    const website = text(formData, "website", 500);
    const referenceUrl = text(formData, "referenceUrl", 500);
    const locations = text(formData, "locations", 100);
    const selectedFeatures = formData
      .getAll("features")
      .filter((value): value is string => typeof value === "string")
      .map((value) => value.trim().slice(0, 100))
      .filter(Boolean)
      .slice(0, 12);

    if (!project) errors.projectType = "Choose the kind of automotive project you need.";
    if (!contact.company) errors.company = "Enter your business or organisation name.";
    if (businessType.length < 3) errors.businessType = "Tell us what kind of automotive business this is.";
    if (primaryGoal.length < 20) errors.primaryGoal = "Describe the outcome you need in a little more detail.";
    if (!timeline) errors.timeline = "Choose the closest expected timeline.";
    if (!budget) errors.budget = "Choose a planning range, even if it is not defined yet.";

    fields.push(
      { label: "Project type", value: project?.label || projectType },
      { label: "Business type", value: businessType },
      { label: "Website or current product", value: website || "Not provided" },
      { label: "Locations", value: locations || "Not provided" },
      { label: "Primary goal", value: primaryGoal },
      { label: "Users", value: users || "Not provided" },
      { label: "Requested capabilities", value: selectedFeatures.join(", ") || "Not selected" },
      { label: "Integrations", value: integrations || "Not provided" },
      { label: "Existing systems", value: existingSystems || "Not provided" },
      { label: "Timeline", value: timeline },
      { label: "Budget", value: budget },
      { label: "Decision stage", value: decisionStage || "Not provided" },
      { label: "Reference link", value: referenceUrl || "Not provided" },
    );
  } else {
    const subject = text(formData, "subject", 180);
    const message = text(formData, "message", 4000);
    if (subject.length < 3) errors.subject = "Add a short subject.";
    if (message.length < 20) errors.message = "Tell us a little more so we can respond usefully.";
    fields.push(
      { label: "Subject", value: subject },
      { label: "Message", value: message },
    );
  }

  const attachmentValue = formData.get("attachment");
  let attachment: File | undefined;
  if (attachmentValue instanceof File && attachmentValue.size > 0) {
    if (attachmentValue.size > MAX_ATTACHMENT_BYTES) {
      errors.attachment = "The attachment must be 4 MB or smaller.";
    } else if (!allowedAttachmentTypes.has(attachmentValue.type)) {
      errors.attachment = "Use a PDF, Word document, JPG, PNG, or WebP file.";
    } else {
      attachment = attachmentValue;
    }
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: { kind, ...contact, fields, attachment },
  };
}
