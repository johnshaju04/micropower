"use client";

import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { COMPANY_PHONE_DISPLAY, COMPANY_PHONE_TEL } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="shrink-0" aria-label="Micropower Energy Solutions home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-white transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${COMPANY_PHONE_TEL}`}
            className="hidden min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 py-3 font-heading text-base font-bold text-navy transition hover:brightness-95 sm:inline-flex"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={`tel:${COMPANY_PHONE_TEL}`}
            aria-label={`Call Now: ${COMPANY_PHONE_DISPLAY}`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-accent p-3 text-navy sm:hidden"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-white md:hidden"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy-deep px-4 py-4 md:hidden" aria-label="Primary mobile">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-[44px] rounded-lg px-3 py-3 text-base font-medium text-white hover:bg-white/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
