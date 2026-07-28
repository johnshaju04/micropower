import type { ApplianceQuantities, BatteryResult } from "./calculator";

export interface LeadPayload {
  phone: string;
  quantities: ApplianceQuantities;
  totalWatts: number;
  recommendation: BatteryResult | null;
  submittedAt: string;
}

/**
 * Google Apps Script Web App URL that appends each lead as a row to a Google Sheet.
 * Set NEXT_PUBLIC_LEAD_SHEET_URL in .env.local — see /google-apps-script.js in the repo root
 * for the script to paste into the Sheet's Apps Script editor and deploy.
 * [TODO: client to set NEXT_PUBLIC_LEAD_SHEET_URL once the Sheet is deployed]
 */
const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_SHEET_URL;

/**
 * Sends the captured lead to the Google Sheet. Intentionally never throws: a failed
 * network call must never block the visitor from seeing their results, so callers should
 * proceed regardless of the outcome and treat `success: false` as something to log, not react to.
 *
 * Uses mode: "no-cors" because Apps Script Web App responses don't carry CORS headers —
 * the request still lands and appends the row, we just can't read the response body back.
 */
export async function submitLead(payload: LeadPayload): Promise<{ success: boolean }> {
  if (!LEAD_ENDPOINT) {
    console.warn("[leadSubmit] NEXT_PUBLIC_LEAD_SHEET_URL is not set — lead was not recorded.", payload);
    return { success: false };
  }

  try {
    await fetch(LEAD_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });
    // no-cors gives us an opaque response (no status/body), so a resolved fetch is the
    // only success signal available — network/DNS failures still land in the catch below.
    return { success: true };
  } catch (error) {
    console.error("[leadSubmit] Failed to submit lead — results still shown, no lead lost.", error);
    return { success: false };
  }
}
