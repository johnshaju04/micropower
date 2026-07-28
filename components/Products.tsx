"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { BATTERY_OPTIONS, formatINR } from "@/lib/calculator";
import { COMPANY_WHATSAPP, HIGHLIGHT_BATTERY_EVENT } from "@/lib/constants";

// [TODO: client to confirm inverter lineup, specs, and pricing]
const INVERTERS = [
  { name: "Micropower Sine Wave 850VA", spec: "Ideal for lights, fans, and TV", price: 6500 },
  { name: "Micropower Sine Wave 1500VA", spec: "Ideal for fridge + full home essentials", price: 9500 },
];

// Combo bundles pair one battery with one inverter at a small discount vs. buying separately.
// [TODO: client to confirm combo pricing/discount — currently ~5% off the sum of the two items]
const COMBOS = [
  {
    name: "Starter Combo",
    batteryLabel: "100 AH Tubular Battery",
    inverterName: "Sine Wave 850VA",
    spec: "Best for small homes — lights, fans, TV",
    price: 22400,
  },
  {
    name: "Home Combo",
    batteryLabel: "150 AH Tubular Battery",
    inverterName: "Sine Wave 1500VA",
    spec: "Best for full homes — fridge + everyday essentials",
    price: 26600,
  },
  {
    name: "Power Combo",
    batteryLabel: "200 AH Tubular Battery",
    inverterName: "Sine Wave 1500VA",
    spec: "Best for longer backup and heavier loads",
    price: 28000,
  },
];

export function Products() {
  // Set when the visitor arrives here via the results panel's "Shop This Battery" button,
  // so we can highlight the AH size that was actually recommended to them.
  const [highlightedAh, setHighlightedAh] = useState<number | null>(null);

  useEffect(() => {
    function handleHighlight(event: Event) {
      setHighlightedAh((event as CustomEvent<{ ah: number }>).detail.ah);
    }
    window.addEventListener(HIGHLIGHT_BATTERY_EVENT, handleHighlight);
    return () => window.removeEventListener(HIGHLIGHT_BATTERY_EVENT, handleHighlight);
  }, []);

  return (
    <section id="products" className="bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
          Batteries & Inverters
        </h2>

        <h3 className="mt-10 font-heading text-lg font-bold text-navy">Tubular Batteries</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          {BATTERY_OPTIONS.map((battery) => {
            const isRecommended = battery.ah === highlightedAh;
            return (
              <div
                key={battery.ah}
                id={`battery-${battery.ah}`}
                // scroll-mt-24 clears the sticky header when "Shop This Battery" scrolls
                // straight to this specific card — on mobile the grid is one column, so
                // without a targeted scroll the visitor only ever saw the first (100 AH) card.
                className={`relative flex scroll-mt-24 flex-col rounded-2xl border-2 p-6 transition-colors ${
                  isRecommended ? "border-accent bg-accent/10" : "border-navy/10 bg-white"
                }`}
              >
                {isRecommended && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 font-heading text-xs font-bold text-navy">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Recommended for you
                  </span>
                )}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface">
                  <Image
                    src="/images/tubular-battery.jpg"
                    alt={`Micropower ${battery.label} tubular battery`}
                    fill
                    sizes="(min-width: 640px) 33vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <span className="mt-4 font-heading text-xl font-extrabold text-navy">
                  {battery.label} Tubular Battery
                </span>
                <span className="mt-1 text-base text-navy/60">Reliable backup for everyday Indian homes</span>
                <span className="mt-4 font-heading text-2xl font-black text-navy">{formatINR(battery.price)}</span>
                <a
                  href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(
                    `Hi, I'd like to buy the ${battery.label} battery.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent py-3 font-heading text-base font-bold text-navy transition hover:brightness-95"
                >
                  Shop Now
                </a>
              </div>
            );
          })}
        </div>

        <h3 className="mt-12 font-heading text-lg font-bold text-navy">Inverters</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {INVERTERS.map((inverter) => (
            <div key={inverter.name} className="flex flex-col rounded-2xl border-2 border-navy/10 bg-white p-6">
              <span className="font-heading text-xl font-extrabold text-navy">{inverter.name}</span>
              <span className="mt-1 text-base text-navy/60">{inverter.spec}</span>
              <span className="mt-4 font-heading text-2xl font-black text-navy">{formatINR(inverter.price)}</span>
              <a
                href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(
                  `Hi, I'd like to buy the ${inverter.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent py-3 font-heading text-base font-bold text-navy transition hover:brightness-95"
              >
                Shop Now
              </a>
            </div>
          ))}
        </div>

        <h3 className="mt-12 font-heading text-lg font-bold text-navy">Battery + Inverter Combos</h3>
        <p className="mt-1 text-base text-navy/60">
          Buy the matched pair together and save vs. buying separately.
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          {COMBOS.map((combo) => (
            <div
              key={combo.name}
              className="relative flex flex-col rounded-2xl border-2 border-accent bg-white p-6"
            >
              <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-accent px-3 py-1 font-heading text-xs font-bold text-navy">
                Combo Deal
              </span>
              <div className="relative mt-2 aspect-square w-full overflow-hidden rounded-xl bg-surface">
                <Image
                  src="/images/tubular-battery.jpg"
                  alt={`${combo.batteryLabel} with ${combo.inverterName}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 90vw"
                  className="object-contain"
                />
              </div>
              <span className="mt-4 font-heading text-xl font-extrabold text-navy">{combo.name}</span>
              <span className="mt-1 text-base text-navy/70">
                {combo.batteryLabel} + {combo.inverterName}
              </span>
              <span className="mt-1 text-sm text-navy/60">{combo.spec}</span>
              <span className="mt-4 font-heading text-2xl font-black text-navy">{formatINR(combo.price)}</span>
              <a
                href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(
                  `Hi, I'd like to buy the ${combo.name} (${combo.batteryLabel} + ${combo.inverterName}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent py-3 font-heading text-base font-bold text-navy transition hover:brightness-95"
              >
                Shop Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
