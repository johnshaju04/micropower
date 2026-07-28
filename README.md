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

- `components/Testimonials.tsx` — real customer photos are still missing (names/quotes are
  confirmed real: James Alukas, Suresh C, Baby Payyapilly)

Everything else (contact info, pricing, business stats, lead capture) is confirmed and live.
