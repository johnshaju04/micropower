import { Users, BatteryFull, Calendar } from "lucide-react";
import { COMPANY_EXPERIENCE_YEARS, CUSTOMERS_SERVED } from "@/lib/constants";

export function TrustSection() {
  const STATS = [
    { icon: Calendar, value: `${COMPANY_EXPERIENCE_YEARS}+`, label: "Years in Business" },
    { icon: Users, value: CUSTOMERS_SERVED, label: "Customers Served" },
    { icon: BatteryFull, value: "Tubular", label: "Technology, Built to Last" },
  ];

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ISO + warranty badges live in the Hero and Footer; repeating them here was redundant. */}
        <div className="grid gap-8 text-center sm:grid-cols-3">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label}>
                <Icon className="mx-auto h-8 w-8 text-navy" aria-hidden="true" />
                <div className="mt-2 font-heading text-2xl font-extrabold text-navy">{stat.value}</div>
                <div className="text-base text-navy/70">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
            Why Tubular Batteries?
          </h2>
          <p className="mt-3 text-lg text-navy/70">
            Tubular batteries are built for Indian homes — they handle frequent power cuts better,
            last longer than flat-plate batteries, and need less maintenance. That means fewer
            replacements and more reliable backup when you need it most.
          </p>
        </div>
      </div>
    </section>
  );
}
