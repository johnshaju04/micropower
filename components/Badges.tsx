/** Simple SVG recreations of the reference trust seals — navy/white/green to match the brand. */

export function IsoBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="ISO 9001 Certified Guarantee seal">
      <circle cx="60" cy="60" r="56" fill="#0A1440" stroke="#A6FF3D" strokeWidth="4" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="#A6FF3D" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x="60" y="48" textAnchor="middle" fontSize="14" fontWeight="800" fill="#A6FF3D" fontFamily="sans-serif">
        ISO 9001
      </text>
      <text x="60" y="65" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF" fontFamily="sans-serif">
        CERTIFIED
      </text>
      <text x="60" y="79" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF" fontFamily="sans-serif">
        GUARANTEE
      </text>
    </svg>
  );
}

export function WarrantyBadge({ className = "" }: { className?: string }) {
  const hexPoints = "60,4 112,32 112,88 60,116 8,88 8,32";
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="5 Years Warranty badge">
      <polygon points={hexPoints} fill="#A6FF3D" stroke="#0A1440" strokeWidth="3" />
      <text x="60" y="54" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0A1440" fontFamily="sans-serif">
        5
      </text>
      <text x="60" y="74" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0A1440" fontFamily="sans-serif">
        YEARS
      </text>
      <text x="60" y="88" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0A1440" fontFamily="sans-serif">
        WARRANTY
      </text>
    </svg>
  );
}
