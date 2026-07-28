import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ContactBar } from "@/components/ContactBar";

// Heading font: heavy geometric sans to match the wordmark's bold style.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

// Body font: highly legible at length, sized up for the 35+ target audience.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Micropower Energy Solutions | Batteries & Inverters for Home Backup",
  description:
    "Find the right tubular battery for your home in 30 seconds. ISO 9001 certified, 5-year warranty, made for Indian homes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      {/* pb-16 reserves space for the fixed mobile ContactBar so it never covers page content.
          suppressHydrationWarning: browser extensions (e.g. Grammarly) inject attributes into
          <body> before React hydrates, which otherwise trips a false-positive hydration warning. */}
      <body
        className="bg-surface font-body text-navy antialiased pb-16 md:pb-0"
        suppressHydrationWarning
      >
        {children}
        <ContactBar />
      </body>
    </html>
  );
}
