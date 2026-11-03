# Public Launch Checklist

Use this checklist prior to and immediately following deployment to verify domain configuration, executive assets, contact delivery, and search indexing eligibility.

---

## 1. Pending Client Material & Executive Assets

- [ ] **Official Executive Portrait:**
  - Obtain approved high-resolution portrait photography of Ibrahima Traore.
  - Place the file in `public/images/` and set `NEXT_PUBLIC_PORTRAIT_PATH` in production environment variables.
- [ ] **Verified Contact Information:**
  - Confirm the official recipient email address for enquiries (`CONTACT_RECIPIENT_EMAIL`).
  - Confirm whether a public direct email address should be displayed on the Contact page (`NEXT_PUBLIC_VERIFIED_EMAIL`).
  - Confirm verified official social profile URLs (`NEXT_PUBLIC_LINKEDIN_URL`) to populate footer links and `sameAs` structured data.
- [ ] **Approved Accomplishments & Case Studies:**
  - As verified career dates, player representation case studies (Sport World Africa), and investment highlights (Kouankan IV SL) are approved for public release, add them to [`src/i18n/`](../src/i18n/) and [`src/content/expansion.ts`](../src/content/expansion.ts).

---

## 2. Production Domain & Protocol Configuration

- [ ] **Set Canonical Production URL:**
  - Configure `NEXT_PUBLIC_SITE_URL=https://...` (without trailing slash) in production environment variables.
  - Verify that `<link rel="canonical">`, `<link rel="alternate" hreflang="...">`, `/sitemap.xml`, `/robots.txt`, Open Graph `og:url` / `og:image`, and JSON-LD `@id` references all resolve to the production domain.
- [ ] **Enable HTTPS & Preferred Domain Redirects:**
  - Set `NEXT_PUBLIC_ENFORCE_HTTPS=true` and `NEXT_PUBLIC_PREFERRED_HOST=<your-domain>` in production.
  - Verify that `http://` and non-preferred `www`/apex requests return a `308 Permanent Redirect` to the canonical HTTPS domain.

---

## 3. Server-Side Contact Delivery Verification

- [ ] **Configure Email Delivery Provider:**
  - Set `CONTACT_DELIVERY_ENABLED=true` and `CONTACT_SIMULATE_DELIVERY=false`.
  - Configure `CONTACT_PROVIDER` (`smtp`, `resend`, `sendgrid`, or `webhook`) along with the required credentials (`SMTP_*`, `RESEND_API_KEY`, `SENDGRID_API_KEY`, or `CONTACT_WEBHOOK_URL`).
  - Verify SPF, DKIM, and DMARC DNS records for `CONTACT_FROM_EMAIL`.
- [ ] **End-to-End Enquiry Test:**
  - Submit a live test enquiry across `/en/contact/`, `/fr/contact/`, and `/es/contact/` and verify receipt in the target inbox.

---

## 4. Search Engineering & Indexing Eligibility

- [ ] **Google Search Console & Bing Webmaster Tools:**
  - Add verification tokens to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
  - Verify domain ownership in Google Search Console and Bing Webmaster Tools.
  - Submit `https://<production-domain>/sitemap.xml` in both consoles.
- [ ] **Public-Launch Indexing Checks:**
  - Confirm `robots.txt` allows crawling (`Allow: /`) and points to `/sitemap.xml`.
  - Inspect rendered HTML for `/en/`, `/fr/`, and `/es/` using Google’s URL Inspection Tool and Rich Results Test to verify `Person`, `ProfilePage`, `Organization`, and `BreadcrumbList` structured data.
- [ ] **Search Performance Monitoring:**
  - Track impressions, clicks, and indexed page coverage across all 3 locales for target queries:
    - `Ibrahima Traore`
    - `Ibrahima Traore Sport World Africa`
    - `Ibrahima Traore Kouankan IV SL`
    - Football representation and sporting investment queries in English, French, and Spanish.
