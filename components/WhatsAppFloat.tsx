import { COMPANY_WHATSAPP } from "@/lib/constants";

const PREFILLED_MESSAGE =
  "Hi, I'd like to know more about Micropower Industries batteries and inverters.";

/**
 * Floating WhatsApp button, fixed bottom-right, site-wide.
 *
 * Desktop/tablet only (`hidden md:flex`): on mobile the full-width ContactBar already pins
 * WhatsApp + Call to the bottom of the screen, and a floating bubble on top of it would both
 * duplicate the action and cover page content.
 */
export function WhatsAppFloat() {
  const href = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 hidden min-h-[56px] items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 font-heading text-base font-bold text-white shadow-lg shadow-navy/20 transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex"
    >
      {/* WhatsApp glyph — drawn inline so the button stays recognisable without an external asset. */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.014-.52-.072-.148-.656-1.586-.9-2.15-.236-.561-.477-.484-.656-.492-.17-.008-.364-.01-.558-.01-.195 0-.51.073-.776.371-.267.298-1.019 1.004-1.019 2.442 0 1.439 1.043 2.832 1.188 3.03.145.199 2.056 3.137 4.98 4.4.696.3 1.24.48 1.664.615.7.222 1.336.19 1.84.115.56-.083 1.728-.706 1.972-1.388.244-.682.244-1.266.171-1.389-.072-.123-.267-.198-.563-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
      {/* Always-visible label: a bare icon is easy to miss or misread for the 35+ audience. */}
      <span className="whitespace-nowrap">Chat on WhatsApp</span>
    </a>
  );
}
