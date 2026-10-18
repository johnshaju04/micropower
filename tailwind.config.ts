import type { Config } from "tailwindcss";

// Brand palette extracted from the reference logo/hero artwork.
// See CLAUDE.md "Design system" for the source spec.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1440",
          deep: "#0A1440",
          light: "#1B3B8C",
        },
        accent: "#A6FF3D",
        surface: "#F5F7FA",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        // Darker at the edges, glow toward center-left — matches the reference hero art.
        "hero-gradient":
          "radial-gradient(120% 120% at 20% 20%, #1B3B8C 0%, #0A1440 65%, #060B29 100%)",
      },
      // Entrance-only animations for the lead modal and results panel. Use them with the
      // `motion-safe:` prefix so visitors with reduced-motion turned on see no movement.
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "slide-up": "slide-up 300ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
