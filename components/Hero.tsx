import { IsoBadge, WarrantyBadge } from "./Badges";
import { ApplianceCalculator } from "./ApplianceCalculator";

// Alternative headlines to A/B test or swap in:
// 2. "Never Get Caught in the Dark Again — Find Your Battery in 30 Seconds"
// 3. "The Right Battery for Your Home. No Guesswork, No Jargon."

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-gradient">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div className="text-white">
          <h1 className="font-heading text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Find the Right Battery for Your Home in <span className="text-accent">30 Seconds</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80 sm:text-xl">
            Tell us what you want to power. We&apos;ll tell you exactly how many hours of backup
            you&apos;ll get — no guesswork, no jargon.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <IsoBadge className="h-16 w-16 sm:h-20 sm:w-20" />
            <WarrantyBadge className="h-16 w-16 sm:h-20 sm:w-20" />
            <span className="max-w-[10rem] text-sm text-white/70 sm:text-base">
              Trusted certification and coverage, made for Indian homes.
            </span>
          </div>
        </div>

        <div>
          <ApplianceCalculator />
        </div>
      </div>
    </section>
  );
}
