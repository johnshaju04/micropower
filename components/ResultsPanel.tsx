import { CheckCircle2 } from "lucide-react";
import { formatINR, type BatteryResult } from "@/lib/calculator";
import { COMPANY_PHONE_TEL, COMPANY_WHATSAPP, HIGHLIGHT_BATTERY_EVENT } from "@/lib/constants";

interface ResultsPanelProps {
  results: BatteryResult[];
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  const recommended = results.find((result) => result.recommended) ?? results[0];
  const whatsappMessage = `Hi, I'm interested in the ${recommended.ah} AH battery for my home.`;

  return (
    // scroll-mt-24 keeps this clear of the sticky header (~69px tall) when the calculator
    // scrolls here after a calculation — without it the heading lands hidden underneath.
    <div id="results" className="mt-8 scroll-mt-24 border-t border-navy/10 pt-6">
      <h3 className="font-heading text-xl font-extrabold text-navy sm:text-2xl">
        Your Personalized Recommendation
      </h3>
      <p className="mt-1 text-sm text-navy/60">
        Estimated backup time. Actual results may vary based on battery condition and usage.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.ah}
            id={`result-${result.ah}`}
            // scroll-mt-24 lets the calculator scroll straight to whichever card is
            // recommended (see ApplianceCalculator) and still clear the sticky header.
            className={`relative flex scroll-mt-24 flex-col rounded-2xl border-2 p-5 ${
              result.recommended ? "border-accent bg-accent/10" : "border-navy/10 bg-surface"
            }`}
          >
            {result.recommended && (
              <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 font-heading text-xs font-bold text-navy">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Recommended for you
              </span>
            )}
            <span className="mt-2 font-heading text-2xl font-extrabold text-navy">{result.label}</span>
            <span className="mt-2 font-heading text-3xl font-black text-navy">
              {result.backupHours.toFixed(1)}
              <span className="text-base font-semibold text-navy/60"> hrs backup</span>
            </span>
            <span className="mt-3 text-xl font-bold text-navy">{formatINR(result.price)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="#products"
          onClick={(event) => {
            event.preventDefault();
            window.dispatchEvent(
              new CustomEvent(HIGHLIGHT_BATTERY_EVENT, { detail: { ah: recommended.ah } })
            );
            // Scroll straight to the recommended card, not just the section — on mobile the
            // battery grid is a single column, so landing on #products alone always showed
            // the first (100 AH) card regardless of what was actually recommended.
            const target =
              document.getElementById(`battery-${recommended.ah}`) ?? document.getElementById("products");
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-accent py-4 font-heading text-base font-extrabold text-navy transition hover:brightness-95"
        >
          Shop This Battery
        </a>
        <a
          href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-heading text-base font-extrabold text-white transition hover:brightness-95"
        >
          Chat on WhatsApp
        </a>
        <a
          href={`tel:${COMPANY_PHONE_TEL}`}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border-2 border-navy py-4 font-heading text-base font-extrabold text-navy transition hover:bg-navy hover:text-white"
        >
          Call a Salesperson
        </a>
      </div>
    </div>
  );
}
