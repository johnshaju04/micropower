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
    },
  },
  plugins: [],
};

export default config;
