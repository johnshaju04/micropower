/**
 * Business contact details used across Header, Footer, ContactBar, and the results CTAs.
 */

export const COMPANY_PHONE_DISPLAY = "+91 70253 05693";
export const COMPANY_PHONE_TEL = "+917025305693";

// wa.me expects the number without a leading "+".
export const COMPANY_WHATSAPP = "917025305693";

export const COMPANY_EMAIL = "micropowerindustry@gmail.com";
export const COMPANY_ADDRESS =
  "Micropower Industries, Near St.Theresa's College, Kottakkal, Mala, Kuruvilassery, Thrissur, Kerala 680732";

/**
 * Business stats, single-sourced so the TrustSection numbers and the FAQ answer can never
 * contradict each other.
 *
 * [TODO: confirm — these three figures don't currently line up. The years below are stated as
 * "14+" (client-provided), but MANUFACTURING_SINCE_YEAR of 2010 implies 16 years as of 2026,
 * and the original COMPANY_FOUNDED_YEAR was 2008 (18 years). Pick one start year and we'll
 * derive the years figure from it automatically.]
 */
export const COMPANY_EXPERIENCE_YEARS = 14;
export const CUSTOMERS_SERVED = "8,000+";

// Year manufacturing started, used in the manufacturer tagline below.
// [TODO: confirm — COMPANY_FOUNDED_YEAR above says 2008, this says 2010. If the company
// has been manufacturing since 2008, set both to the same year.]
export const MANUFACTURING_SINCE_YEAR = 2010;

/**
 * One-line manufacturer positioning, shown in the hero eyebrow, the footer blurb and the
 * page <meta description>. Edit here to change it everywhere.
 */
export const COMPANY_TAGLINE = `Manufacturer of tubular batteries in Kerala since ${MANUFACTURING_SINCE_YEAR}`;

/**
 * Window CustomEvent name fired by ResultsPanel's "Shop This Battery" button (with the
 * recommended AH in event.detail.ah) and listened for by Products to highlight that card.
 */
export const HIGHLIGHT_BATTERY_EVENT = "mp:highlight-battery";
