# Production Launch Checklist

This checklist is the Phase 08 handoff from completed application code to live
external services. Perform it after the implementation is deployed to a Vercel
Preview environment, because the required values below are derived from the
actual code and `.env.example`, not from a speculative integration plan.

## 1. Release gate

- [ ] Use Node 22 (`nvm use`) and install from the lockfile with `npm ci`.
- [ ] Run `npm run lint`, `npm run build`, `npm run test:e2e`, and
  `npm run test:a11y`.
- [ ] Confirm approved business name, public contact details, CarVu disclosure,
  screenshots, testimonials, metrics, and image licences.
- [ ] Have the operational drafts at `/privacy` and `/terms` reviewed for the
  production legal entity and jurisdiction.
- [ ] Keep Preview deployments private or otherwise non-indexable. The app
  disallows crawling automatically when `VERCEL_ENV=preview`.

## 2. Production environment contract

Add these values in Vercel → Project → Settings → Environment Variables. Scope
secrets to the environments that need them and redeploy after changes.

```env
# Canonical origin; exact HTTPS production URL, with no trailing slash.
NEXT_PUBLIC_SITE_URL=https://www.example.com

# Payload and MongoDB Atlas
PAYLOAD_SECRET=
DATABASE_URI=

# Cloudflare R2 / Payload media
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://media.example.com

# Calendly event connected to Google Calendar and Google Meet
NEXT_PUBLIC_CALENDLY_URL=

# Public contact channels; phone and WhatsApp may be blank
NEXT_PUBLIC_CONTACT_EMAIL=info@zenticsys.com
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_WHATSAPP_URL=

# Server-side enquiry delivery
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

# Form abuse protection
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

The portal-by-portal creation steps, credential permissions, sender-domain DNS,
Calendly event setup, and safe local values are maintained in
[`ENVIRONMENT-SETUP.md`](./ENVIRONMENT-SETUP.md). Never put real credentials in
Git, CMS fields, screenshots, tickets, or client-side variables.

## 3. Domain, canonical, and search setup

- [ ] Add the production domain in Vercel and configure DNS/SSL.
- [ ] Choose one canonical hostname (`www` or apex) and redirect the other to it.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to that exact canonical origin before the final
  deployment; it controls canonical tags, sitemap URLs, robots, and schema URLs.
- [ ] Verify `/robots.txt` allows public routes in production and disallows
  `/admin/`, `/cms-api/`, and `/api/`.
- [ ] Verify `/sitemap.xml` contains all published solutions, services, case
  studies, insights, and managed pages, but no unpublished/no-index entries.
- [ ] Add the canonical domain to Google Search Console, complete ownership
  verification, and submit `https://<domain>/sitemap.xml`.
- [ ] Test the generated Open Graph image and representative URLs in social-card
  debuggers after the public deployment.

## 4. CMS, database, and media verification

- [ ] Create the Atlas database/user and R2 bucket/token by following
  `ENVIRONMENT-SETUP.md`; use least privilege and regions close to Vercel.
- [ ] Open `/admin`, create the first administrator, and run `npm run cms:seed`
  once against the intended environment.
- [ ] Upload, replace, and delete a test media item; confirm the object is stored
  in R2 and served through `R2_PUBLIC_URL`, not Vercel's filesystem.
- [ ] Publish and unpublish one test entry; confirm public fallback behavior,
  sitemap inclusion, canonical metadata, and revalidation are correct.
- [ ] Restrict CMS administrator accounts, use strong unique credentials, and
  keep `/admin` out of search indexing.

## 5. Conversion verification

- [ ] Verify the Resend sender domain and send proposal and contact submissions
  from the production site.
- [ ] Confirm the monitored recipient receives the submission and attachment;
  verify failure UI by testing with a safe invalid configuration in Preview.
- [ ] Confirm Turnstile is visible when challenged and that production rejects a
  missing or invalid token server-side.
- [ ] Make a real Calendly test booking. Confirm it appears in the host Google
  Calendar, includes a Google Meet link, displays the visitor's timezone, and
  sends confirmation/cancellation messages.
- [ ] Confirm direct email, optional phone, and optional WhatsApp links point to
  the approved business channels.

## 6. Browser, accessibility, performance, and content QA

- [ ] Test latest Chrome, Safari, Firefox, and Edge on desktop, plus real iOS
  Safari and Android Chrome where available.
- [ ] Test 390 px, 768 px, 1440 px, and 1920 px widths with no horizontal
  overflow, clipped headings, card collisions, or menu-induced layout shift.
- [ ] Navigate the menu, forms, accordions, links, and dialogs using keyboard
  only; confirm visible focus, Escape close, focus return, and sensible order.
- [ ] Enable reduced motion and verify content remains visible without relying
  on transforms, opacity animation, or the decorative SVG morph.
- [ ] Run Lighthouse against the production deployment and investigate material
  LCP, CLS, INP, accessibility, or SEO regressions. Test more than the homepage.
- [ ] Check every public route for one descriptive H1, useful title/description,
  image alt text, working internal links, and no placeholder claims.
- [ ] Confirm the intentionally hidden automotive-lifecycle gallery does not
  render or download its image set.

## 7. Monitoring and operating limits

- [ ] Enable Vercel deployment notifications, function/log monitoring, usage
  alerts, and a reviewed spend limit on the production account.
- [ ] Enable Atlas alerts for storage, connections, errors, and unusual access;
  review backup/restore requirements.
- [ ] Enable Cloudflare billing/usage alerts and watch R2 storage, Class A writes,
  and Class B reads. Record who owns token rotation.
- [ ] Monitor Resend delivery/bounce activity, Turnstile analytics, and Calendly
  availability after launch.
- [ ] Analytics is intentionally not installed. Add it only after selecting an
  approved privacy/consent approach and updating the privacy notice.

## 8. Launch and rollback

- [ ] Record the last known-good Vercel deployment before promoting production.
- [ ] Deploy, smoke-test homepage, one route from every content family, CMS,
  forms, booking, sitemap, robots, 404, and social metadata.
- [ ] If a critical issue appears, promote the known-good deployment and retain
  the failing deployment/logs for diagnosis; do not destroy CMS or R2 data.
- [ ] Re-run the smoke test after any environment-variable or DNS correction.

