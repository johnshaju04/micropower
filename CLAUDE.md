# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project status

This repo currently contains only the build spec (`micropower-website-prompt.md`) and three
reference logo/brand images (`photo_2026-07-27_*.jpg`). The Next.js app has not been scaffolded
yet. When asked to "build the site," follow the full spec in `micropower-website-prompt.md` — this
file is a condensed, code-facing summary of it, not a replacement.

## What this project is

A marketing + lead-generation website for **Micropower Energy Solutions**, an Indian brand
selling lead-acid tubular batteries and inverters for home power backup. The centerpiece is an
interactive hero calculator: visitor picks appliances → app estimates required battery size →
phone number gate → personalized results + CTAs (Shop / WhatsApp / Call).

**Audience:** homeowners 35+. This drives concrete UI rules, not just vibes — see below.

## Tech stack

- Next.js 14, App Router, TypeScript
- Tailwind CSS
- Framer Motion — subtle micro-interactions only, no gimmicks
- `lucide-react` for icons
- Mobile-first responsive. No backend database — lead capture posts to a swappable function.

## Design system (from brand reference images)

- Background gradient: `#0A1440` → `#1B3B8C` (navy, radial/diagonal, glow toward center-left)
- Accent (buttons, key numbers, active states): neon/lime green `#A6FF3D`
- Text on dark: `#FFFFFF`; text on light: `#0A1440`; light section background: `#F5F7FA`
- Headings: one bold/black geometric sans (Archivo Black / Montserrat ExtraBold / Poppins
  ExtraBold — pick one, use consistently). Body: Inter or Poppins, 16–18px minimum.
- Logo is a recreated SVG/HTML+CSS wordmark ("MICROPOWER" + right-pointing arrow icon in neon
  green, "ENERGY SOLUTIONS" subline in neon green) — do not embed the reference JPGs directly in
  the site, they're for visual reference only.
- Recreate the "ISO 9001 Certified" seal and "5 Years Warranty" hexagon badge as simple SVGs.

## 35+ audience UI rules (non-negotiable)

- Body text ≥16px (prefer 18px)
- Tap targets ≥44×44px
- High contrast, generous spacing
- No typing where a tap will do — appliance quantities use `–`/`+` steppers, never text input
- One primary decision per screen; explain jargon (AH, backup hours) in plain language
- Trust signals (certifications, warranty, "Made for Indian homes") visible early
- Persistent WhatsApp + Call contact bar fixed at bottom on mobile, site-wide
- Full keyboard nav + screen-reader labels, visible focus states, no autoplay media

## Planned file structure

```
/app/page.tsx              — assembles all sections
/components/                — Header, Hero, ApplianceCalculator, LeadCaptureModal,
                               ResultsPanel, HowItWorks, TrustSection, Products,
                               Testimonials, FAQ, Footer
/lib/calculator.ts          — wattage constants, battery pricing, backup-hours formula
/lib/leadSubmit.ts          — swappable submitLead(data) function
```

## Calculator logic (must live in `/lib/calculator.ts`, well-commented, all constants at top)

- Default 6 appliances (wattages are editable assumptions, comment them as such): LED/Tube
  light ~15W, Ceiling Fan ~75W, Refrigerator ~150W, TV ~100W, Washing Machine ~500W (in-use
  only), Mobile/Laptop charging ~65W
- `Amps = Total Watts / System Voltage` (state the 12V/24V assumption in a comment)
- `Backup Hours = (AH × Voltage × Efficiency Factor) / Total Watts`, efficiency factor ~0.6–0.7
  (inverter losses) — label this an estimate in both code comments and UI copy
- Target backup duration for "recommended" pick is a configurable constant (default 6–8h)
- Battery options: 100 AH (₹17,000), 150 AH (₹18,500 — `[TODO: confirm 150 AH price]`, the
  original spec's ₹1,85,000 looks like a typo), 200 AH (₹20,000)
- Always show all three options with hours + price; badge the recommended one

## Lead capture flow

1. "Calculate My Battery" is disabled until ≥1 appliance quantity > 0.
2. Clicking it opens a phone-number gate (10-digit India format, validated) before showing any
   results — reassure with a one-line privacy note.
3. On submit: reveal results immediately in the UI regardless of network outcome, and fire
   `submitLead(data)` in `/lib/leadSubmit.ts` (phone + appliances + recommendation) to a
   placeholder endpoint. Mark as `[TODO: connect lead endpoint]` — client will wire this to a
   CRM, Formspree/Sheet.best, or WhatsApp Business API.
4. Never block or lose a lead on API failure — log/flag failure, still show results.

## Post-results CTAs

Three large, thumb-friendly buttons (stacked mobile / row desktop): **Shop This Battery**
(primary green, links to product/checkout or placeholder anchor), **Chat on WhatsApp**
(`https://wa.me/<PHONE_NUMBER>` with prefilled message), **Call a Salesperson** (`tel:` link,
number visible).

## Conventions

- All copy/pricing/wattage constants belong at the top of their file, not inline in JSX, so a
  non-developer client can tune numbers without touching logic.
- Mark any placeholder content (testimonials, customer counts, unconfirmed prices) with
  `[TODO: ...]` comments, both in code and visibly if it's client-facing placeholder copy.
- One component per site section (see file structure above) — keep them self-contained.
