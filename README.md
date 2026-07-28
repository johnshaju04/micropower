# Micropower Energy Solutions — Website

Next.js 14 + TypeScript + Tailwind marketing site with an interactive battery-sizing
calculator in the hero. Full build spec: `micropower-website-prompt.md`. Codebase
conventions and constants: `CLAUDE.md`.

## Getting started

Requires [Node.js](https://nodejs.org/) 18 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```

## Project structure

- `app/` — root layout, global styles, the single home page
- `components/` — one component per site section (Header, Hero, ApplianceCalculator,
  LeadCaptureModal, ResultsPanel, HowItWorks, TrustSection, Products, Testimonials, FAQ,
  Footer, plus Logo/Badges/ContactBar)
- `lib/calculator.ts` — appliance wattages, battery pricing, backup-hours formula
- `lib/leadSubmit.ts` — swappable lead-submission function
- `lib/constants.ts` — phone/WhatsApp/address used across the site

## Before launch — outstanding TODOs

- `lib/constants.ts` — real phone number, WhatsApp number, email, address
- `lib/calculator.ts` — confirm the 150 AH price (currently a ₹18,500 placeholder)
- `lib/leadSubmit.ts` — connect `LEAD_ENDPOINT` to the real CRM / Google Sheet / WhatsApp
  Business API integration
- `components/TrustSection.tsx` — real years-in-business and customers-served figures
- `components/Products.tsx` — confirm inverter lineup, specs, and pricing
- `components/Testimonials.tsx` — replace placeholder testimonials with real ones
- `components/FAQ.tsx` — confirm the installation/electrician answer
