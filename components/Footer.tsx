import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { IsoBadge, WarrantyBadge } from "./Badges";
import {
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_TEL,
  COMPANY_WHATSAPP,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep py-14 text-white sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-base text-white/70">
            Batteries and inverters built for Indian homes — reliable backup, honest advice.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-bold">Contact Us</h3>
          <ul className="space-y-3 text-base text-white/80">
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`tel:${COMPANY_PHONE_TEL}`} className="hover:text-accent">
                {COMPANY_PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <a
                href={`https://wa.me/${COMPANY_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-accent">
                {COMPANY_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span>{COMPANY_ADDRESS}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-bold">Certifications</h3>
          <div className="flex gap-6">
            <IsoBadge className="h-16 w-16" />
            <WarrantyBadge className="h-16 w-16" />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Micropower Energy Solutions. All rights reserved.
      </div>
    </footer>
  );
}
