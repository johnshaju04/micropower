import { ArrowRight } from "lucide-react";

/**
 * Recreated wordmark logo (SVG/HTML+CSS, not the reference JPGs) so it scales cleanly
 * at any size. Designed for dark backgrounds (navy header/footer).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Micropower Energy Solutions"
      className={`inline-flex flex-col items-start leading-none select-none ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <ArrowRight className="h-5 w-5 shrink-0 text-accent" strokeWidth={3} aria-hidden="true" />
        <span className="font-heading text-xl font-black tracking-tight text-white sm:text-2xl">
          MICROPOWER
        </span>
      </span>
      <span className="pl-[26px] font-heading text-[10px] font-black tracking-[0.15em] text-accent sm:pl-[30px] sm:text-xs">
        ENERGY SOLUTIONS
      </span>
    </span>
  );
}
