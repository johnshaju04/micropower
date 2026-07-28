/**
 * Business contact details used across Header, Footer, ContactBar, and the results CTAs.
 * [TODO: client to confirm email before launch]
 */

export const COMPANY_PHONE_DISPLAY = "+91 70253 05693";
export const COMPANY_PHONE_TEL = "+917025305693";

// wa.me expects the number without a leading "+".
export const COMPANY_WHATSAPP = "917025305693";

export const COMPANY_EMAIL = "info@micropowerenergy.example";
export const COMPANY_ADDRESS =
  "Micropower Inc, Near to St.Theresa's College, Kottakkal, Mala, Kuruvilassery, Kerala 680732";

/**
 * Window CustomEvent name fired by ResultsPanel's "Shop This Battery" button (with the
 * recommended AH in event.detail.ah) and listened for by Products to highlight that card.
 */
export const HIGHLIGHT_BATTERY_EVENT = "mp:highlight-battery";
