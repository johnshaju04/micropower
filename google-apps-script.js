/**
 * Paste this into the Apps Script editor bound to your Google Sheet (see setup steps below).
 * It receives each lead from lib/leadSubmit.ts and writes one row per unique phone number —
 * a returning customer's row gets overwritten with their latest calculation, not duplicated.
 *
 * SETUP
 * 1. Go to sheets.google.com, create a new sheet named e.g. "Micropower Leads".
 * 2. In row 1, add these column headers (matches the row order appendRow writes below):
 *    Timestamp | Phone | LED/Tube Light | Ceiling Fan | Refrigerator | TV | Wi-Fi Router |
 *    Mobile/Laptop Charging | Total Watts | Recommended Battery | Backup Hours (est.) | Price (INR)
 * 3. Extensions > Apps Script. Delete the default code, paste this whole file, save.
 * 4. Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    (This does NOT expose your sheet's contents publicly — it only lets this one endpoint
 *    accept new-row submissions. Nobody can read the sheet through this URL.)
 * 5. Click Deploy, authorize when prompted, then copy the Web app URL it gives you
 *    (ends in /exec).
 * 6. In the Next.js project, create a file named .env.local (not committed to git) with:
 *    NEXT_PUBLIC_LEAD_SHEET_URL=<the URL from step 5>
 * 7. Restart the dev server (or redeploy) so the new env var is picked up.
 *
 * If you ever edit the appliance list in lib/calculator.ts, update the row array's column
 * order below to match.
 *
 * IMPORTANT: after changing anything in this file, edits alone don't affect the live URL —
 * go to Deploy > Manage deployments > edit (pencil) your Web app deployment > Version:
 * "New version" > Deploy, or the endpoint keeps running the old code.
 */
// Column B (index 2) holds the phone number — must match the appendRow/setValues order below.
const PHONE_COLUMN = 2;

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  const quantities = data.quantities || {};
  const recommendation = data.recommendation || {};

  const row = [
    data.submittedAt ? new Date(data.submittedAt) : new Date(),
    data.phone || "",
    quantities.light || 0,
    quantities.fan || 0,
    quantities.fridge || 0,
    quantities.tv || 0,
    quantities.wifiRouter || 0,
    quantities.charging || 0,
    data.totalWatts || "",
    recommendation.label || "",
    recommendation.backupHours ? Number(recommendation.backupHours).toFixed(1) : "",
    recommendation.price || "",
  ];

  // One row per phone number: a returning customer (or the same visitor recalculating with
  // different appliances) overwrites their existing row instead of adding a new one.
  const existingRow = data.phone ? findRowByPhone(sheet, data.phone) : -1;
  if (existingRow > -1) {
    sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Returns the 1-indexed sheet row for a phone number, or -1 if no existing row matches. */
function findRowByPhone(sheet, phone) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1; // only header row (or empty sheet) — nothing to match

  const phones = sheet.getRange(2, PHONE_COLUMN, lastRow - 1, 1).getValues();
  for (let i = 0; i < phones.length; i++) {
    if (String(phones[i][0]) === String(phone)) {
      return i + 2; // +2: values array is 0-indexed and starts at sheet row 2
    }
  }
  return -1;
}
