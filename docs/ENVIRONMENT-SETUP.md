# Environment and External Service Setup

This document records the external accounts, portal actions, credentials, and environment variables required by the Zenticsys Automotive website.

Do not commit `.env.local`, production secrets, API tokens, private keys, or database passwords. Commit only `.env.example` with empty placeholders and comments.

## 1. Service ownership and environments

Use separate values for:

- Local development
- Vercel Preview deployments
- Vercel Production

Prefer one production database and one production media bucket. Preview environments should use a separate database/bucket or explicitly marked preview content so test content cannot appear on the live site.

## 2. Environment variable contract

The application should use these names. Do not invent alternative names in individual phases without updating this document and `.env.example`.

### Core application

```env
# Public canonical website URL. No trailing slash.
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payload cryptographic secret. Generate a long random value.
PAYLOAD_SECRET=

# MongoDB Atlas connection string used by Payload.
DATABASE_URI=
```

### Cloudflare R2

```env
# Cloudflare account ID that owns the R2 bucket.
R2_ACCOUNT_ID=

# R2 S3 API token credentials. Server-only; never prefix with NEXT_PUBLIC_.
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=

# Exact bucket name.
R2_BUCKET=

# Public URL/custom domain for public media. No trailing slash.
R2_PUBLIC_URL=

# Optional S3-compatible endpoint. This can be constructed from the account ID,
# but keeping it explicit makes configuration easier to inspect.
R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

### Calendly

The first release uses a Calendly link or embed. It does not need a Calendly API token.

```env
# Public booking URL or event URL. Safe to expose if used in a client embed.
NEXT_PUBLIC_CALENDLY_URL=
```

Use only one event initially:

```text
30-minute Automotive Project Consultation
```

### Email delivery — decide during the conversion phase

The provider is intentionally not locked yet. Once selected, add server-only variables such as:

```env
EMAIL_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

Do not expose email API keys to the browser. The provider must support production transactional email, domain verification, and spam/abuse controls.

## 3. Generating the Payload secret

Payload needs a long random secret. Generate it locally:

```bash
openssl rand -base64 32
```

Copy the output into `PAYLOAD_SECRET` in local and Vercel environments. Do not use the same secret for unrelated projects. Do not put it in Git, screenshots, issue descriptions, or chat messages.

## 4. MongoDB Atlas setup

### Portal

Use the [MongoDB Atlas](https://www.mongodb.com/atlas) dashboard.

### Steps

1. Create or select the Zenticsys Automotive organization and project.
2. Create a MongoDB cluster in a region close to the Vercel function region.
3. Create a dedicated database user for the application. Do not use the Atlas account owner.
4. Give the application user only the permissions required for the project database.
5. Configure Network Access for the deployment environment.
6. Open Connect → Drivers and copy the Node.js connection string.
7. Replace the placeholder database password and database name.
8. URL-encode special characters in the username/password if required by the connection string.
9. Store the final value in `DATABASE_URI`.

Example shape only—never commit a real value:

```env
DATABASE_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

### Network-access warning

Vercel serverless functions do not always have one fixed outbound IP. An Atlas IP allowlist therefore needs a deployment-compatible strategy. Do not blindly use a broad allowlist in production without reviewing the risk. Use the narrowest supported option, strong generated credentials, database least privilege, and monitoring. Confirm the final approach during the CMS phase.

## 5. Cloudflare R2 setup

### Portal

Use the [Cloudflare Dashboard](https://dash.cloudflare.com/) and open R2 Object Storage.

### Create the bucket

1. Create or select the Zenticsys Cloudflare account.
2. Open R2 → Overview → Create bucket.
3. Use a clear production name, for example `zenticsys-automotive-media-production`.
4. Choose Standard storage, not Infrequent Access, to use the documented free allowance.
5. Keep the bucket private by default while deciding which assets are public.
6. Configure public delivery only for genuinely public website media.
7. Prefer a production custom domain such as `media.zenticsys.com` after DNS is configured.
8. Use an R2-managed `r2.dev` URL only for development/non-production unless the production policy explicitly approves it.

### Create scoped S3 API credentials

1. In R2, open Manage R2 API tokens.
2. Create an API token scoped to the specific media bucket.
3. Grant only Object Read & Write for the required bucket.
4. Copy the Access Key ID and Secret Access Key once; the secret may not be shown again.
5. Find the Cloudflare Account ID in the account overview or dashboard URL.
6. Build the S3-compatible endpoint:

```text
https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

7. Add the values to `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ENDPOINT`, and `R2_PUBLIC_URL`.

### Media rules

- Use R2 for CMS-uploaded images, screenshots, PDFs, and other permanent media.
- Do not use Vercel's local filesystem for production uploads.
- Store alt text, caption, source, creator, download date, and license reference in the CMS.
- Optimize images before delivery and avoid storing videos in the first release.
- Public images may be delivered directly; private documents require a private delivery design.
- Rotate/revoke the R2 token if it is exposed.

R2 Standard's current free allowance is 10 GB-month storage, 1 million Class A operations, 10 million Class B operations, and free egress. Class A includes writes/management such as uploads, copies, lists, and multipart operations. Class B includes reads/checks. Free usage is not unlimited; monitor usage and billing alerts.

## 6. Vercel setup

### Portal

Use the [Vercel Dashboard](https://vercel.com/dashboard).

### Steps

1. Push the new repository to the Zenticsys GitHub organization/account.
2. Import the repository into Vercel.
3. Select the framework preset detected as Next.js.
4. Confirm the project root is the repository root.
5. Configure the production domain when available.
6. Add environment variables under Project Settings → Environment Variables.
7. Assign each variable to Development, Preview, Production, or the appropriate combination.
8. Redeploy after changing variables; existing deployments do not automatically receive newly added values.
9. Set function region close to the MongoDB Atlas region where appropriate.
10. Configure usage monitoring and spend alerts.

Vercel Hobby may be used for personal/development previews, but this is a commercial Zenticsys website. Use an appropriate commercial production plan and review Vercel's current terms before launch.

## 7. Calendly and Google Meet setup

### Portals

- [Calendly](https://calendly.com/)
- Google Calendar for the host account

### Steps

1. Create or select the Zenticsys Calendly account.
2. Connect the host's Google Calendar.
3. Create one one-on-one event type named `Automotive Project Consultation`.
4. Set the duration to 30 minutes.
5. Configure availability, buffer time, minimum scheduling notice, and cancellation policy.
6. Select Google Meet as the location/conferencing option.
7. Confirm that a test booking blocks the host's Google Calendar.
8. Confirm the event includes a Google Meet link and confirmation email.
9. Copy the public Calendly event URL into `NEXT_PUBLIC_CALENDLY_URL`.

The first release should link to or embed Calendly rather than calling Calendly's API. No Calendly secret is needed for this flow. The free plan is limited to one event type and one calendar connection, which matches the initial consultation flow. Add an API token or webhook only if a later phase requires CRM synchronization, custom booking data, or internal automation.

Google Meet, Microsoft Teams, and Zoom should not be presented as selectable platforms in the initial product. The only meeting platform is Google Meet.

## 8. Email and form delivery

The proposal form and message form need a server-side delivery path. Decide the provider in Phase 06 before implementing production submission.

Required setup regardless of provider:

- Verify the Zenticsys sending domain.
- Configure SPF, DKIM, and DMARC as instructed by the provider.
- Use a server-only API key.
- Set a verified `from` address and a monitored `to` address.
- Add rate limiting and honeypot/Turnstile-style spam protection.
- Do not send secrets or sensitive user input to client-side code.
- Test delivery, failure handling, and reply-to behavior.

## 9. Local environment file

Create a local file after the application reads these variables:

```bash
cp .env.example .env.local
```

Populate `.env.local` with development values. Never run `git add .env.local`.

The `.env.example` file should eventually contain:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PAYLOAD_SECRET=
DATABASE_URI=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_ENDPOINT=
R2_PUBLIC_URL=
NEXT_PUBLIC_CALENDLY_URL=
EMAIL_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

## 10. Verification checklist

Before considering infrastructure configured:

- App starts locally without missing-variable crashes.
- Payload connects to the intended Atlas database.
- A CMS test media upload reaches the intended R2 bucket.
- A public media URL renders through the website.
- An R2 delete removes only the selected test object.
- A Calendly test booking appears in Google Calendar.
- The test booking contains a Google Meet link.
- Proposal/message test submissions reach the intended mailbox.
- Preview values cannot affect production content.
- No secret appears in browser source, logs, Git history, or client bundles.
- Vercel preview and production deployments use the intended variables.
- Lint and production build pass.
