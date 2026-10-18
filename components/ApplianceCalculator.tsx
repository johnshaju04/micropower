"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  APPLIANCES,
  type Appliance,
  ZERO_QUANTITIES,
  calculateTotalWatts,
  getBatteryResults,
  hasAnyAppliance,
  type ApplianceId,
  type ApplianceQuantities,
  type BatteryResult,
} from "@/lib/calculator";
import { submitLead } from "@/lib/leadSubmit";
import { LeadCaptureModal } from "./LeadCaptureModal";
import { ResultsPanel } from "./ResultsPanel";

// Remembers the visitor's phone number on this device so they only enter it once — every
// later "Calculate" (even after changing appliances) reuses it instead of re-asking.
const PHONE_STORAGE_KEY = "micropower_phone";

/**
 * One appliance tile. Memoised because a tap on any stepper changes a single appliance's
 * count, but without this React re-renders all six tiles (and their SVG icons) on every tap —
 * wasted work sitting directly in the interaction's critical path.
 */
const ApplianceStepper = memo(function ApplianceStepper({
  appliance,
  quantity,
  onChange,
}: {
  appliance: Appliance;
  quantity: number;
  onChange: (id: ApplianceId, delta: number) => void;
}) {
  const Icon = appliance.icon;
  const selected = quantity > 0;

  return (
    <div
      className={`flex flex-col items-center rounded-2xl border-2 p-3 text-center transition-colors sm:p-4 ${
        selected ? "border-accent bg-accent/10" : "border-navy/10 bg-surface"
      }`}
    >
      <Icon className="h-8 w-8 text-navy sm:h-9 sm:w-9" aria-hidden="true" />
      <span className="mt-2 text-sm font-semibold leading-tight text-navy sm:text-base">
        {appliance.label}
      </span>
      {appliance.note && <span className="mt-1 text-xs text-navy/60">{appliance.note}</span>}

      {/* mt-auto pins this row to the card's bottom edge regardless of how many lines
          the label above wraps to, so steppers stay level across a grid row. */}
      <div className="mt-auto flex w-full items-center justify-between pt-3">
        <button
          type="button"
          onClick={() => onChange(appliance.id, -1)}
          disabled={quantity === 0}
          aria-label={`Decrease ${appliance.label} quantity`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="h-5 w-5" aria-hidden="true" />
        </button>
        {/* Count is announced by the single shared live region below, not by six separate
            ones — six live regions made screen readers re-scan all of them on every tap. */}
        <span className="text-center text-lg font-bold tabular-nums text-navy">{quantity}</span>
        <button
          type="button"
          onClick={() => onChange(appliance.id, 1)}
          aria-label={`Increase ${appliance.label} quantity`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-white transition active:scale-95"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

export function ApplianceCalculator() {
  const [quantities, setQuantities] = useState<ApplianceQuantities>(ZERO_QUANTITIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState<BatteryResult[] | null>(null);
  const [savedPhone, setSavedPhone] = useState<string | null>(null);
  // Which tile was last stepped — drives the single shared live region below.
  const [lastChangedId, setLastChangedId] = useState<ApplianceId | null>(null);

  useEffect(() => {
    setSavedPhone(window.localStorage.getItem(PHONE_STORAGE_KEY));
  }, []);

  const canCalculate = hasAnyAppliance(quantities);

  // useCallback keeps this reference stable so the memoised tiles above don't all re-render.
  const updateQuantity = useCallback((id: ApplianceId, delta: number) => {
    setQuantities((previous) => ({ ...previous, [id]: Math.max(0, previous[id] + delta) }));
    setLastChangedId(id);
  }, []);

  const lastChanged = APPLIANCES.find((appliance) => appliance.id === lastChangedId);
  const announcement = lastChanged ? `${lastChanged.label}: ${quantities[lastChanged.id]}` : "";

  function revealResults(phone: string) {
    const computed = getBatteryResults(quantities);
    const recommendation = computed.find((result) => result.recommended) ?? null;

    // Reveal results immediately regardless of what happens with the network call below —
    // a visitor should never lose their result because of a slow or failed API call.
    setResults(computed);
    setModalOpen(false);

    // The Google Sheet upserts by phone number, so re-submitting on every recalculation
    // just keeps that customer's single row current rather than creating duplicates.
    void submitLead({
      phone,
      quantities,
      totalWatts: calculateTotalWatts(quantities),
      recommendation,
      submittedAt: new Date().toISOString(),
    });

    // On a repeat calculation the modal never opens, so without this the visitor could stay
    // scrolled at the appliance grid and never notice the backup-hours estimate changed.
    // Scroll straight to the recommended card (not just the section heading) — on mobile the
    // three battery cards stack in one column, so landing at the top alone could leave the
    // actual recommendation (e.g. 200 AH, the last card) off-screen below the fold.
    // Two frames, not one: a single rAF callback still runs *before* the browser paints, so
    // the getElementById + scrollIntoView layout work landed inside the click's own frame and
    // counted against INP. Waiting for the second frame lets the results paint first, then
    // scrolls.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = recommendation
          ? document.getElementById(`result-${recommendation.ah}`)
          : document.getElementById("results");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function handleCalculateClick() {
    if (!canCalculate) return;
    if (savedPhone) {
      revealResults(savedPhone);
    } else {
      setModalOpen(true);
    }
  }

  function handlePhoneSubmit(phone: string) {
    window.localStorage.setItem(PHONE_STORAGE_KEY, phone);
    setSavedPhone(phone);
    revealResults(phone);
  }

  return (
    <div id="calculator" className="rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
      <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
        What do you want to power?
      </h2>
      <p className="mt-1 text-base text-navy/70">
        Tap + to add appliances. We&apos;ll estimate the right battery for your home.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {APPLIANCES.map((appliance) => (
          <ApplianceStepper
            key={appliance.id}
            appliance={appliance}
            quantity={quantities[appliance.id]}
            onChange={updateQuantity}
          />
        ))}
      </div>

      {/* The one live region for the whole grid — see the note in ApplianceStepper. */}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <button
        type="button"
        onClick={handleCalculateClick}
        disabled={!canCalculate}
        className="mt-6 min-h-[44px] w-full rounded-full bg-accent py-4 font-heading text-lg font-extrabold text-navy transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Calculate My Battery
      </button>

      {modalOpen && (
        <LeadCaptureModal onClose={() => setModalOpen(false)} onSubmit={handlePhoneSubmit} />
      )}

      {results && (
        <div className="motion-safe:animate-slide-up">
          <ResultsPanel results={results} />
        </div>
      )}
    </div>
  );
}
