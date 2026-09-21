"use client";

import { ArrowLeft, ArrowRight, Check, FileUp, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";

import {
  budgets,
  getProjectType,
  projectTypes,
  proposalSteps,
  timelines,
} from "@/content/conversion";
import { resetTurnstile, TurnstileWidget } from "@/components/forms/turnstile-widget";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string; errors?: Record<string, string> }
  | { status: "success"; referenceId: string };

const stepRequiredFields: Record<number, string[]> = {
  1: ["projectType"],
  2: ["company", "businessType"],
  3: ["primaryGoal"],
  4: ["timeline", "budget"],
  5: ["name", "email", "consent"],
};

export function ProposalForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
  const selectedProject = useMemo(() => getProjectType(projectType), [projectType]);

  function validateStep(currentStep: number) {
    const form = formRef.current;
    if (!form) return false;
    const names = stepRequiredFields[currentStep] || [];
    for (const name of names) {
      const controls = Array.from(form.elements).filter(
        (element): element is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
          "name" in element && element.name === name,
      );
      const valid = controls.some((control) => {
        if (control instanceof HTMLInputElement && (control.type === "radio" || control.type === "checkbox")) {
          return control.checked;
        }
        return control.value.trim().length > 0 && control.checkValidity();
      });
      if (!valid) {
        controls[0]?.focus();
        controls[0]?.reportValidity();
        return false;
      }
    }
    return true;
  }

  function goForward() {
    if (!validateStep(step)) return;
    setSubmission({ status: "idle" });
    setStep((current) => Math.min(current + 1, proposalSteps.length));
    requestAnimationFrame(() => document.querySelector<HTMLElement>(".proposal-form__panel:not([hidden]) h2")?.focus());
  }

  function goBack() {
    setSubmission({ status: "idle" });
    setStep((current) => Math.max(current - 1, 1));
    requestAnimationFrame(() => document.querySelector<HTMLElement>(".proposal-form__panel:not([hidden]) h2")?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep(5)) return;
    setSubmission({ status: "submitting" });

    try {
      const response = await fetch("/api/enquiries", { method: "POST", body: new FormData(event.currentTarget) });
      const result = (await response.json()) as {
        ok?: boolean;
        referenceId?: string;
        message?: string;
        errors?: Record<string, string>;
      };
      if (!response.ok || !result.ok) {
        setSubmission({
          status: "error",
          message: result.message || "We could not send your proposal request.",
          errors: result.errors,
        });
        resetTurnstile();
        return;
      }
      setSubmission({ status: "success", referenceId: result.referenceId || "received" });
    } catch {
      setSubmission({
        status: "error",
        message: "The connection was interrupted. Please try again or email info@zenticsys.com.",
      });
      resetTurnstile();
    }
  }

  if (submission.status === "success") {
    return (
      <div className="form-success" role="status" tabIndex={-1}>
        <span className="form-success__icon" aria-hidden="true"><Check size={28} /></span>
        <p className="section-kicker">Proposal received</p>
        <h2>Thank you. We’ll review the project context before replying.</h2>
        <p>
          Your reference is <strong>{submission.referenceId}</strong>. We’ll use the details you shared to make the first conversation useful.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="proposal-form" onSubmit={submit} noValidate>
      <input type="hidden" name="kind" value="proposal" />
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="proposal-website-confirmation">Leave this field empty</label>
        <input id="proposal-website-confirmation" name="websiteConfirmation" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="proposal-progress" aria-label={`Step ${step} of ${proposalSteps.length}`}>
        <div className="proposal-progress__bar"><span style={{ width: `${(step / proposalSteps.length) * 100}%` }} /></div>
        <ol>
          {proposalSteps.map((item) => (
            <li key={item.number} aria-current={step === item.number ? "step" : undefined} data-complete={step > item.number || undefined}>
              <span>{step > item.number ? <Check size={13} aria-hidden="true" /> : item.number}</span>
              <em>{item.label}</em>
            </li>
          ))}
        </ol>
      </div>

      <section className="proposal-form__panel" hidden={step !== 1} aria-labelledby="proposal-step-1">
        <p className="form-step-count">01 / 05</p>
        <h2 id="proposal-step-1" tabIndex={-1}>What are we building?</h2>
        <p className="form-step-intro">Choose the closest starting point. You can explain the details as we go.</p>
        <fieldset className="choice-grid choice-grid--projects">
          <legend className="visually-hidden">Automotive project type</legend>
          {projectTypes.map((project) => (
            <label key={project.value} className="choice-card">
              <input
                type="radio"
                name="projectType"
                value={project.value}
                required
                checked={projectType === project.value}
                onChange={(event) => setProjectType(event.target.value)}
              />
              <span><strong>{project.label}</strong><small>{project.description}</small></span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="proposal-form__panel" hidden={step !== 2} aria-labelledby="proposal-step-2">
        <p className="form-step-count">02 / 05</p>
        <h2 id="proposal-step-2" tabIndex={-1}>Tell us about the business.</h2>
        <p className="form-step-intro">This helps us understand the operation behind the interface.</p>
        <div className="form-grid">
          <Field label="Business or organisation name" name="company" required />
          <Field label="Current website or product URL" name="website" type="url" placeholder="https://" />
          <Field label="What kind of automotive business is it?" name="businessType" required placeholder="Dealer group, rental fleet, workshop…" wide />
          <Field label="Locations or operating regions" name="locations" placeholder="For example: 4 locations across the UK" wide />
        </div>
      </section>

      <section className="proposal-form__panel" hidden={step !== 3} aria-labelledby="proposal-step-3">
        <p className="form-step-count">03 / 05</p>
        <h2 id="proposal-step-3" tabIndex={-1}>What needs to change?</h2>
        <p className="form-step-intro">Focus on the business outcome and the people who will use the product.</p>
        <div className="form-grid">
          <TextArea label="What is the main goal or problem to solve?" name="primaryGoal" required minLength={20} wide />
          <TextArea label="Who will use it?" name="users" placeholder="Customers, sales teams, technicians, fleet managers…" wide />
        </div>
        {selectedProject ? (
          <fieldset className="feature-choices">
            <legend>{selectedProject.featurePrompt}</legend>
            <div>
              {selectedProject.features.map((feature) => (
                <label key={feature}><input type="checkbox" name="features" value={feature} /><span>{feature}</span></label>
              ))}
            </div>
          </fieldset>
        ) : null}
        <div className="form-grid">
          <TextArea label="Systems or integrations involved" name="integrations" placeholder="CRM, DMS, ERP, telematics, payment provider…" />
          <TextArea label="What exists today?" name="existingSystems" placeholder="Current website, spreadsheets, legacy platform, or nothing yet" />
        </div>
      </section>

      <section className="proposal-form__panel" hidden={step !== 4} aria-labelledby="proposal-step-4">
        <p className="form-step-count">04 / 05</p>
        <h2 id="proposal-step-4" tabIndex={-1}>What are the planning boundaries?</h2>
        <p className="form-step-intro">Ranges are enough. They help us recommend a realistic first step.</p>
        <fieldset className="choice-grid choice-grid--compact">
          <legend>Expected timeline</legend>
          {timelines.map((timeline) => <Choice key={timeline} name="timeline" value={timeline} />)}
        </fieldset>
        <fieldset className="choice-grid choice-grid--compact">
          <legend>Indicative budget</legend>
          {budgets.map((budget) => <Choice key={budget} name="budget" value={budget} />)}
        </fieldset>
        <TextArea label="Where are you in the decision process?" name="decisionStage" placeholder="Researching, comparing partners, replacing a current system…" wide />
      </section>

      <section className="proposal-form__panel" hidden={step !== 5} aria-labelledby="proposal-step-5">
        <p className="form-step-count">05 / 05</p>
        <h2 id="proposal-step-5" tabIndex={-1}>Where should we continue the conversation?</h2>
        <p className="form-step-intro">We’ll review the context first and respond with a useful next step.</p>
        <div className="form-grid">
          <Field label="Your name" name="name" autoComplete="name" required error={submission.status === "error" ? submission.errors?.name : undefined} />
          <Field label="Work email" name="email" type="email" autoComplete="email" required error={submission.status === "error" ? submission.errors?.email : undefined} />
          <Field label="Phone or WhatsApp number" name="phone" type="tel" autoComplete="tel" />
          <label className="form-field"><span>Preferred reply</span><select name="preferredContact" defaultValue="Email"><option>Email</option><option>Phone</option><option>WhatsApp</option></select></label>
          <Field label="Reference or brief link" name="referenceUrl" type="url" placeholder="https://" wide />
          <label className="form-field form-field--wide file-field">
            <span>Optional brief or reference file</span>
            <span className="file-field__control"><FileUp size={18} aria-hidden="true" /> PDF, Word, JPG, PNG, or WebP · 4 MB maximum</span>
            <input name="attachment" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" />
            {submission.status === "error" && submission.errors?.attachment ? <small className="field-error">{submission.errors.attachment}</small> : null}
          </label>
        </div>
        <label className="consent-field">
          <input type="checkbox" name="consent" required />
          <span>I agree that Zenticsys may use these details to review and respond to this enquiry. See the <Link href="/privacy">privacy notice</Link>.</span>
        </label>
        <TurnstileWidget siteKey={turnstileSiteKey} action="proposal" />
        {submission.status === "error" ? <p className="form-alert" role="alert">{submission.message}</p> : null}
      </section>

      <div className="proposal-form__actions">
        {step > 1 ? <button type="button" className="form-button form-button--quiet" onClick={goBack}><ArrowLeft size={17} aria-hidden="true" /> Back</button> : <span />}
        {step < proposalSteps.length ? (
          <button type="button" className="form-button" onClick={goForward}>Continue <ArrowRight size={17} aria-hidden="true" /></button>
        ) : (
          <button type="submit" className="form-button" disabled={submission.status === "submitting"}>
            {submission.status === "submitting" ? "Sending…" : "Send proposal request"} <Send size={17} aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  wide?: boolean;
  error?: string;
};

function Field({ label, name, type = "text", placeholder, autoComplete, required, wide, error }: FieldProps) {
  return (
    <label className={`form-field${wide ? " form-field--wide" : ""}`}>
      <span>{label}{required ? <em>Required</em> : null}</span>
      <input name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required} aria-invalid={Boolean(error)} />
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}

function TextArea({ label, name, placeholder, required, minLength, wide }: FieldProps & { minLength?: number }) {
  return (
    <label className={`form-field${wide ? " form-field--wide" : ""}`}>
      <span>{label}{required ? <em>Required</em> : null}</span>
      <textarea name={name} placeholder={placeholder} required={required} minLength={minLength} rows={4} />
    </label>
  );
}

function Choice({ name, value }: { name: string; value: string }) {
  return <label className="choice-card choice-card--compact"><input type="radio" name={name} value={value} required /><span><strong>{value}</strong></span></label>;
}
