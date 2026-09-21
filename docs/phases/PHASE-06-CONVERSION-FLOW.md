# Phase 06 — Proposal and Scheduling Conversion Flow

**Status:** Implementation complete; external configuration and live-service verification pending.

## Goal

Create the multiple contact paths and primary client-onboarding experience.

Before implementation, follow [`../ENVIRONMENT-SETUP.md`](../ENVIRONMENT-SETUP.md) for Calendly and Google Calendar/Meet setup. The initial Calendly flow requires a public event URL, not a Calendly API token.

## Work

- Build `/request-a-proposal` guided multi-step form.
- Add conditional fields for the selected automotive project type.
- Add project, business, requirements, timeline, budget, contact, and optional file/link fields.
- Build `/schedule-a-call` around Calendly.
- Configure one Calendly event: 30-minute Automotive Project Consultation.
- Connect one Google Calendar and Google Meet.
- Add Write a Message form.
- Add email, phone/WhatsApp, and response expectation.
- Add success/error states, spam protection, privacy notice, and validation.
- Keep Schedule a Call as the header/menu CTA.

## Acceptance criteria

- Request a Proposal is the primary CTA.
- Schedule a Call is the secondary CTA.
- Only Google Meet is offered initially.
- Calendly handles availability and meeting creation; no custom calendar engine is built.
- Both Calendly and Google Calendar show booked calls after configuration.
- Forms are accessible and explain why information is requested.

## Implemented

- Added `/request-a-proposal` with a five-step, automotive-specific guided form:
  project type, business context, conditional requirements, timeline/budget,
  and contact/optional reference material.
- Added conditional capability choices for dealership, fleet, service, parts,
  marketplace, auction, and custom automotive software projects.
- Added `/schedule-a-call` with a configured-state Calendly iframe, an honest
  unconfigured-state panel, Google Meet expectations, local-time explanation,
  and alternative proposal/message paths.
- Added `/contact` with a low-commitment message form, public email, optional
  configured phone/WhatsApp methods, response expectations, and links to the
  other conversion paths.
- Added `/privacy` with the website-enquiry privacy notice required by both
  forms. A final legal review remains a launch task.
- Added `POST /api/enquiries` as a Node.js server route. It validates all fields,
  enforces same-origin requests, limits request size, validates optional file
  type/size, uses a honeypot and best-effort rate limit, verifies Cloudflare
  Turnstile, and sends through Resend.
- Added clear pending, success, validation, provider-failure, and connection-
  failure states without clearing entered form data after an error.
- Added canonical metadata and unique titles/descriptions for every Phase 06
  page.

## Configuration contract

The implementation reads these Phase 06 values:

```env
NEXT_PUBLIC_CALENDLY_URL=
NEXT_PUBLIC_CONTACT_EMAIL=info@zenticsys.com
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_WHATSAPP_URL=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Public variables are safe to expose in rendered pages. `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `TURNSTILE_SECRET_KEY` are
server-only. Exact portal instructions and verification steps are maintained in
`docs/ENVIRONMENT-SETUP.md`.

## Remaining live verification

The code and local browser behavior are complete, but the following acceptance
items require owner-controlled external accounts and therefore remain pending:

- Create the 30-minute `Automotive Project Consultation` event in Calendly.
- Connect the host Google Calendar and select Google Meet as the only location.
- Verify one real booking appears in both Calendly and Google Calendar with a
  working Google Meet URL.
- Verify the Resend sending domain, create an API key, and confirm proposal and
  contact delivery to the monitored mailbox.
- Configure a production Turnstile widget and verify valid and invalid tokens.
- Supply the approved public phone number and WhatsApp URL if those contact
  methods should appear.

Until Resend is configured, the endpoint returns a helpful unavailable message
instead of pretending a submission succeeded. Until Calendly is configured, the
scheduling page displays its setup-pending panel rather than a fake calendar.

## Verification performed

- ESLint passes.
- The Next.js production build passes and emits 29 pages/routes, with the form
  endpoint remaining server-rendered on demand.
- The full 140-test Playwright regression suite passes, including Phase 06
  coverage across 320 px, 768 px, 1024 px, and 1440 px viewports.
- Visual review covered proposal, contact, scheduling, and the 320 px proposal
  layout with no browser errors or horizontal overflow.

## Test

- Test a Calendly sandbox/test booking.
- Confirm Google Calendar event and Google Meet link.
- Test invalid, incomplete, mobile, keyboard, and reduced-motion states.
- Verify secrets and third-party URLs are not hardcoded.
- Run lint/build.

## AI task prompt

```text
Read the project brain, AI rules, and this phase file. Build the proposal,
scheduling, and message conversion flows only. Use Calendly with one Google Meet
consultation event; do not build Teams, Zoom, or a custom calendar engine. Make
proposal onboarding conversational and automotive-specific. Verify validation,
accessibility, privacy, success states, lint, and build.
```
