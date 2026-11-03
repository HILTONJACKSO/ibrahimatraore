# Ibrahima Traore — Official Executive Website

Official multilingual executive website for **Ibrahima Traore**, CEO of **Sport World Africa** and **Kouankan IV SL** (both registered in Spain).

Built with **Next.js (App Router)** and **TypeScript**, combining static/server-rendered HTML for search discoverability, a custom vector signature brand system, self-hosted variable typography (**Source Serif 4** and **Inter**), complete **English (`/en/`)**, **French (`/fr/`)**, and **Spanish (`/es/`)** editions, and a configurable server-side enquiry delivery endpoint.

---

## 1. Quick Start & Setup Instructions

### Prerequisites
- **Node.js** `>= 20.x` (verified on Node `v22.21.0`)
- **npm** `>= 10.x`

### Installation & Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables (optional for local preview):**
   Copy [`.env.example`](.env.example) to `.env.local` and adjust values as needed:
   ```bash
   cp .env.example .env.local
   ```

3. **Regenerate brand PNGs, favicons, Open Graph cards, and self-hosted fonts (if SVGs are modified):**
   ```bash
   npm run generate:assets
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (automatically redirects `/` to `/en/`).

5. **Production build & verification:**
   ```bash
   npm run lint
   npm run build
   npm run start
   ```

---

## 2. Site Architecture & Multilingual Routes

Every active page is statically/server-rendered across three language routes (`/en/`, `/fr/`, `/es/`) with automatic equivalent-page preservation when switching languages:

| Page | English | French | Spanish |
|---|---|---|---|
| **Home** | `/en/` | `/fr/` | `/es/` |
| **Profile** | `/en/profile/` | `/fr/profile/` | `/es/profile/` |
| **Companies** | `/en/companies/` | `/fr/companies/` | `/es/companies/` |
| **Partnerships** | `/en/partnerships/` | `/fr/partnerships/` | `/es/partnerships/` |
| **Contact** | `/en/contact/` | `/fr/contact/` | `/es/contact/` |
| **Privacy Notice** | `/en/privacy/` | `/fr/privacy/` | `/es/privacy/` |

Future expansion routes are pre-built and feature-flagged via environment configuration:
- **Insights / Articles:** `/[lang]/insights/[slug]/` (uses [`src/templates/ArticleTemplate.tsx`](src/templates/ArticleTemplate.tsx))
- **Case Studies:** `/[lang]/case-studies/[slug]/` (uses [`src/templates/CaseStudyTemplate.tsx`](src/templates/CaseStudyTemplate.tsx))

---

## 3. Brand Identity & Signature Assets

All original vector and high-resolution raster assets are located in [`public/brand/`](public/brand/) and [`public/`](public/):

- **Forest-Green Signature (for light backgrounds `#F7F5EF` / `#E8E9E0`):**
  - [`public/brand/signature-forest.svg`](public/brand/signature-forest.svg)
  - [`public/brand/signature-forest.png`](public/brand/signature-forest.png) (`1680×390` transparent PNG)
- **Ivory Signature (for deep forest-green backgrounds `#173B38`):**
  - [`public/brand/signature-ivory.svg`](public/brand/signature-ivory.svg)
  - [`public/brand/signature-ivory.png`](public/brand/signature-ivory.png) (`1680×390` transparent PNG)
- **Monochrome Signature:**
  - [`public/brand/signature-monochrome.svg`](public/brand/signature-monochrome.svg)
  - [`public/brand/signature-monochrome.png`](public/brand/signature-monochrome.png) (`1680×390` transparent PNG)
- **“IT” Monogram & Favicons:**
  - [`public/brand/monogram-it.svg`](public/brand/monogram-it.svg) & [`public/brand/monogram-it.png`](public/brand/monogram-it.png)
  - [`public/brand/monogram-it-transparent.svg`](public/brand/monogram-it-transparent.svg) & [`public/brand/monogram-it-transparent.png`](public/brand/monogram-it-transparent.png)
  - [`public/favicon.svg`](public/favicon.svg), [`public/favicon-32x32.png`](public/favicon-32x32.png), [`public/favicon-16x16.png`](public/favicon-16x16.png), [`public/apple-touch-icon.png`](public/apple-touch-icon.png)
- **Localized Open Graph Social Preview Images (`1200×630`):**
  - [`public/brand/og-en.png`](public/brand/og-en.png) (and [`public/brand/og-default.png`](public/brand/og-default.png))
  - [`public/brand/og-fr.png`](public/brand/og-fr.png)
  - [`public/brand/og-es.png`](public/brand/og-es.png)

---

## 4. Color System & Typography

| Role | Color | Hex |
|---|---|---|
| Primary | Deep forest green | `#173B38` |
| Main background | Warm ivory | `#F7F5EF` |
| Main text | Dark charcoal | `#172522` |
| Accent | Muted gold | `#A17D43` |
| Secondary background | Soft sage | `#E8E9E0` |
| Supporting text | Slate green | `#56645D` |

- **Display & Editorial Headings:** `Source Serif 4` (self-hosted WOFF2 variable fonts in `public/fonts/`)
- **Navigation, Body Copy, Controls & Labels:** `Inter` (self-hosted WOFF2 variable fonts in `public/fonts/`)

---

## 5. Contact Delivery Setup

The contact form posts to [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts), which enforces:
- Input sanitization and server-side validation across all fields
- Hidden honeypot spam protection (`website_url`)
- Per-IP sliding-window rate limiting (max 5 requests per 10 minutes)
- Multi-provider email dispatch configurable via environment variables:
  - `CONTACT_PROVIDER=smtp` (via `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`)
  - `CONTACT_PROVIDER=resend` (via `RESEND_API_KEY`)
  - `CONTACT_PROVIDER=sendgrid` (via `SENDGRID_API_KEY`)
  - `CONTACT_PROVIDER=webhook` (via `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET`)
- Set `CONTACT_RECIPIENT_EMAIL` and `CONTACT_FROM_EMAIL` in production, and set `CONTACT_SIMULATE_DELIVERY=false` once live credentials are active.

---

## 6. Documentation Links

- **Editing Guide:** [`docs/EDITING_GUIDE.md`](docs/EDITING_GUIDE.md)
- **Launch Checklist:** [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md)
