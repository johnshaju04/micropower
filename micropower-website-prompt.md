# Claude Code Prompt: Micropower Energy Solutions Website

Copy everything below into Claude Code to build the site.

---

## Role & Context

You are an expert web designer and front-end developer with 20 years of experience building conversion-focused websites for home-appliance and energy brands in India. Build a marketing + lead-generation website for **Micropower Energy Solutions**, a company that sells lead-acid tubular batteries and inverters for home power backup.

**Target audience:** Homeowners aged 35+. Design for this audience specifically:
- Larger base font size (min 16px, ideally 18px body text)
- High contrast text, generous spacing, no tiny tap targets (min 44x44px buttons)
- Avoid jargon; explain technical terms (AH, backup hours) in plain language
- Minimal steps, obvious next actions, no more than one primary decision per screen
- Trust signals visible early (certifications, warranty, "Made for Indian homes" type messaging)

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS for styling
- Framer Motion for subtle, tasteful micro-interactions only (no gimmicks)
- Fully responsive: mobile-first (most traffic will be mobile), then tablet/desktop
- Deployable as a static/SSR site (no backend database required — see "Lead Capture" section for how data is sent)

## Brand Identity (extracted from reference logo images)

**Logo:** Wordmark "MICROPOWER" in bold, heavy, slightly condensed white sans-serif, preceded by a right-pointing arrow icon in neon green. Below it, "ENERGY SOLUTIONS" in the same bold style, in neon green, smaller size. Recreate this logo in code (SVG/HTML+CSS) rather than using the uploaded image file directly, so it scales cleanly.

**Color palette:**
- Deep navy/blue background: `#0A1440` to `#1B3B8C` (use as a radial/diagonal gradient, darker at edges, lighter glow toward center-left — matches the reference art)
- Primary accent — neon/lime green: `#A6FF3D` (buttons, highlights, key numbers, active states)
- White: `#FFFFFF` (primary text on dark backgrounds)
- Near-black navy for text on light backgrounds: `#0A1440`
- Light neutral background for content sections: `#F5F7FA`
- Use the navy gradient as the hero background; use white/light sections beneath for readability at length (a 35+ audience reads long light-background text more easily than long dark-background text)

**Typography:**
- Headings: a bold/black-weight geometric sans-serif (e.g. "Archivo Black", "Montserrat ExtraBold", or "Poppins ExtraBold" — pick one and use consistently) — matches the heavy wordmark style in the logo
- Body text: a clean, highly legible sans-serif (e.g. "Inter" or "Poppins Regular/Medium") at 16–18px minimum
- Use Google Fonts imports for whichever pair you choose

**Badges/trust marks:** Recreate the "ISO 9001 Certified Guarantee" seal and "5 Years Warranty" hexagon badge in simple SVG, styled in white/navy/green to match the reference, and place them near the top of the hero and again near the footer.

## Site Structure

1. **Header:** Logo (left), nav links (Home, Products, How It Works, Contact), a persistent "Call Now" button with the phone number, visible on all screen sizes.
2. **Hero Section** (see detailed spec below — this is the centerpiece).
3. **How It Works:** 3-step visual explainer (1. Tell us your appliances → 2. Get your recommended battery → 3. Order or talk to us) so a first-time visitor immediately understands the flow before scrolling to use it.
4. **Trust Section:** ISO 9001, 5-year warranty, "why tubular batteries," years in business, number of customers served (placeholder copy, mark as `[TODO: client to confirm number]`).
5. **Products Section:** Cards for 100 AH / 150 AH / 200 AH batteries and available inverters, each with price, key spec, and a "Shop Now" button.
6. **Testimonials** (placeholder content, clearly marked for client to replace).
7. **FAQ:** Plain-language answers to things this audience actually asks — "How long will my fridge run on backup?", "Do I need to replace my old battery or inverter?", "What's the difference between 100/150/200 AH?", "Do you install it or do I need an electrician?"
8. **Footer:** Contact details, WhatsApp link, call button, address, social links, certifications repeated.

## Hero Section — Detailed Spec (the core interactive feature)

### Layout
- Left/top: Headline ("Find the Right Battery for Your Home in 30 Seconds" or similar — write 2–3 alternative headline options), short supporting line, trust badges.
- Right/below: A card titled something like "What do you want to power?" containing a **2x3 grid of appliance tiles**.

### Appliance Grid
Each tile represents one appliance type, with:
- A simple, recognizable icon (use `lucide-react` icons: e.g. `Lightbulb` for lights, `Fan` for fans, `Refrigerator` for fridge, `Tv` for TV, `WashingMachine` for washing machine, `AirVent` or `Wind` for AC/cooler — pick 6 common Indian-household appliances for the 2x3 grid)
- The appliance name in plain language
- A quantity stepper: a large `–` button, the current number in the middle, a large `+` button (no typing required — this audience should never need to type a number here). Default quantity 0.
- Tapping `+` from 0 should visually highlight the tile (e.g. a green border) so it's obvious it's now "selected."

Default 6 appliances for the grid (adjust wattage assumptions to realistic Indian household averages, and clearly comment these assumptions in the code so the client can edit them):
1. LED Light/Tube light (~15W each)
2. Ceiling Fan (~75W each)
3. Refrigerator (~150W)
4. TV (~100W)
5. Washing Machine (~500W, only during use — note this in comments)
6. Mobile/Laptop charging point (~65W each)

Below the grid, a large, high-contrast **"Calculate My Battery"** button in neon green, disabled/greyed out until at least one appliance quantity is greater than 0.

### Calculation Logic
On click:
1. Sum total wattage = Σ (appliance wattage × quantity).
2. Convert to total load in Amps at 12V/24V system voltage (state your assumption in code comments, e.g. `Amps = Watts / 12V`).
3. For each battery option (100 AH, 150 AH, 200 AH), estimate backup hours using a standard formula with a safety/efficiency factor (e.g. `Backup Hours = (AH × Voltage × Efficiency Factor) / Total Watts`, efficiency factor ~0.6–0.7 to account for inverter losses — comment this clearly as an estimate, and add a small disclaimer in the UI: "Estimated backup time. Actual results may vary based on battery condition and usage.").
4. Recommend the smallest AH battery that gives at least a target backup duration (make this a configurable constant, e.g. 6–8 hours, so the client can tune it) — but still show all three options with their respective backup hours and prices, with the recommended one visually marked "Recommended for you."

### Lead Capture Gate (before showing results)
Do NOT show the calculation results immediately. Instead:
1. On clicking "Calculate My Battery," show a simple modal/inline panel: "Almost there! Enter your mobile number to see your personalized recommendation." with a single large phone number input (10-digit India format, with basic validation) and a "Show My Results" button.
2. Reassure them briefly: a one-line note like "We'll only use this to share your results and help if you have questions." (builds trust with this audience, who may be wary of giving out phone numbers).
3. On submit: (a) reveal the results section immediately in the UI so they get instant value, and (b) send the captured lead (phone number + selected appliances + calculated recommendation) to the client's backend/CRM. Since there's no database in this build, implement this as a clearly marked, swappable function (e.g. `submitLead(data)`) that currently POSTs to a placeholder endpoint — add a code comment explaining the client should connect this to their CRM, a Google Sheet via a form service (e.g. Formspree/Sheet.best), or their salesperson's WhatsApp Business API, and note this as a `[TODO: connect lead endpoint]`.
4. Do not block the user forever if the API call fails — show results regardless, but log/flag the failure, so a lead is never lost due to a technical error, and note this in a code comment.

### Results Display
Once unlocked, show a clean comparison of the three batteries:
- Battery name/AH rating
- Estimated backup hours for their specific appliance combo
- Price (100 AH – ₹17,000 / 150 AH – ₹18,500 / 200 AH – ₹20,000 — **note:** the price you gave for 150 AH, ₹1,85,000, is ~10x the other two and is very likely a typo; I've used ₹18,500 as a placeholder in the code with a `[TODO: confirm 150 AH price]` comment so you can correct it before launch)
- The recommended option clearly badge-marked
- All prices and hours pulled from constants at the top of the file so the client can update them without touching logic

### Post-Results CTAs
Directly below the results, three clear, large, thumb-friendly buttons stacked on mobile / in a row on desktop:
1. **Shop This Battery** — primary green button, links to product/checkout page (or placeholder anchor if no e-commerce yet)
2. **Chat on WhatsApp** — green WhatsApp-style button, deep-links to `https://wa.me/<PHONE_NUMBER>` with a pre-filled message like "Hi, I'm interested in the [X] AH battery for my home"
3. **Call a Salesperson** — uses a `tel:` link with a large visible phone number, since this audience often prefers calling over chat

## Accessibility & Trust Details
- All interactive elements keyboard-navigable and screen-reader labeled
- Alt text on all icons/images
- No auto-playing video/audio
- Visible focus states
- A persistent, simple contact bar (WhatsApp + Call icons) fixed at the bottom on mobile throughout the whole site, not just in the hero

## Deliverables
Build this as a working Next.js project with:
- `/app/page.tsx` — home page assembling all sections
- `/components/` — one component per section (Header, Hero, ApplianceCalculator, LeadCaptureModal, ResultsPanel, HowItWorks, TrustSection, Products, Testimonials, FAQ, Footer)
- `/lib/calculator.ts` — all wattage constants, battery pricing constants, and the backup-hours calculation logic, well-commented
- `/lib/leadSubmit.ts` — the swappable lead-submission function
- Clean, componentized, well-commented code so a non-developer client can hand this to a developer for future edits

Build the full site now, starting with the Hero and appliance calculator since that's the core feature, then the rest of the page sections.
