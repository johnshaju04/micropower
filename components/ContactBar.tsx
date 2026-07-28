import { Phone, MessageCircle } from "lucide-react";
import { COMPANY_PHONE_TEL, COMPANY_WHATSAPP } from "@/lib/constants";

/** Persistent WhatsApp + Call bar, fixed at the bottom on mobile, site-wide (not just the hero). */
export function ContactBar() {
  const whatsappHref = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(
    "Hi, I'd like to know more about Micropower batteries and inverters."
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-white/10 md:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[56px] items-center justify-center gap-2 bg-[#25D366] font-heading text-base font-bold text-white"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        WhatsApp
      </a>
      <a
        href={`tel:${COMPANY_PHONE_TEL}`}
        className="flex min-h-[56px] items-center justify-center gap-2 bg-accent font-heading text-base font-bold text-navy"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call Now
      </a>
    </div>
  );
}
