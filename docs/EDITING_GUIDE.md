# Editing & Content Management Guide

This guide explains how to update website copy, translations, executive photography, contact details, and future expansion sections without altering the underlying layout code.

---

## 1. Updating Multilingual Copy (`EN`, `FR`, `ES`)

All website text, metadata, navigation labels, form labels, validation errors, and accessibility descriptions are stored in three strongly-typed dictionary files:

- **English:** [`src/i18n/en.ts`](../src/i18n/en.ts)
- **French:** [`src/i18n/fr.ts`](../src/i18n/fr.ts)
- **Spanish:** [`src/i18n/es.ts`](../src/i18n/es.ts)

All three files conform to the `SiteDictionary` TypeScript interface in [`src/i18n/types.ts`](../src/i18n/types.ts). If a field is added or modified in one language, TypeScript (`npm run lint`) will verify that the corresponding keys exist in the other two languages.

---

## 2. Adding the Official Executive Portrait

Both the **Home** hero (`HeroPitchComposition`) and the **Profile** page (`ProfilePage`) are architecturally prepared to display an official portrait of Ibrahima Traore without restructuring the page layout:

1. Place the optimized portrait image (recommended aspect ratio `4:4.5`, minimum width `960px`, WebP/AVIF/JPG) inside `public/images/ibrahima-traore-portrait.jpg`.
2. Set the environment variable in `.env.local` or your hosting dashboard:
   ```env
   NEXT_PUBLIC_PORTRAIT_PATH=/images/ibrahima-traore-portrait.jpg
   ```
3. Rebuild or restart the application. The architectural frame will automatically replace the monogram placeholder with the portrait.

---

## 3. Adding Verified Direct Email & Official Social Links

1. **Verified Direct Email:**
   Set `NEXT_PUBLIC_VERIFIED_EMAIL` in your environment configuration:
   ```env
   NEXT_PUBLIC_VERIFIED_EMAIL=office@ibrahimatraore.com
   ```
   When populated, this email address automatically appears in the Contact page sidebar and in the Schema.org `Person` structured data.

2. **Official Social Links (e.g., LinkedIn):**
   Set `NEXT_PUBLIC_LINKEDIN_URL` in your environment configuration:
   ```env
   NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/...
   ```
   When populated, the link automatically appears in the website footer and is added to `sameAs` in Schema.org `Person` structured data.

---

## 4. Activating Future Articles & Case Studies

Reusable templates are ready in [`src/templates/ArticleTemplate.tsx`](../src/templates/ArticleTemplate.tsx) and [`src/templates/CaseStudyTemplate.tsx`](../src/templates/CaseStudyTemplate.tsx).

1. Open [`src/content/expansion.ts`](../src/content/expansion.ts).
2. Add approved entries to `APPROVED_ARTICLES` or `APPROVED_CASE_STUDIES` for `en`, `fr`, and `es`.
3. Enable the corresponding feature flag in `.env.local` or production environment variables:
   ```env
   NEXT_PUBLIC_ENABLE_INSIGHTS=true
   NEXT_PUBLIC_ENABLE_CASE_STUDIES=true
   ```
4. Pages will immediately become accessible at `/[lang]/insights/[slug]/` and `/[lang]/case-studies/[slug]/`.

---

## 5. Regenerating Brand Assets

If you adjust any SVG file in `public/brand/` or update the Open Graph card text in [`scripts/generate-brand-assets.mjs`](../scripts/generate-brand-assets.mjs), run:

```bash
npm run generate:assets
```

This regenerates all retina transparent PNG signatures, favicons, Apple touch icons, and localized `1200×630` Open Graph preview images.
