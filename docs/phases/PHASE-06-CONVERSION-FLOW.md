# Phase 06 — Proposal and Scheduling Conversion Flow

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
