"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface LeadCaptureModalProps {
  onClose: () => void;
  onSubmit: (phone: string) => void;
}

// Indian mobile numbers: 10 digits, starting 6-9.
const PHONE_REGEX = /^[6-9]\d{9}$/;

export function LeadCaptureModal({ onClose, onSubmit }: LeadCaptureModalProps) {
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = PHONE_REGEX.test(phone);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onSubmit(phone);
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      // z-[60]: must sit above the fixed mobile ContactBar (z-50) or the bar visually
      // covers the bottom of the modal on small screens. pb-24 keeps a safe gap above it too.
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-deep/70 px-4 pb-24 pt-4 sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 id="lead-modal-title" className="font-heading text-xl font-extrabold text-navy sm:text-2xl">
            Almost there!
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface"
          >
            <X className="h-5 w-5 text-navy" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-2 text-base text-navy/70">
          Enter your mobile number to see your personalized battery recommendation.
        </p>

        <form onSubmit={handleSubmit} className="mt-5" noValidate>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-navy">
            Mobile Number
          </label>
          <div className="flex items-center overflow-hidden rounded-2xl border-2 border-navy/15 focus-within:border-accent">
            <span className="pl-4 pr-3 text-lg font-medium text-navy/60">+91</span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
              onBlur={() => setTouched(true)}
              placeholder="98765 43210"
              className="w-full border-l-2 border-navy/10 py-4 pl-3 pr-4 text-lg text-navy outline-none"
              aria-invalid={touched && !isValid}
              aria-describedby="phone-error"
            />
          </div>
          {touched && !isValid && (
            <p id="phone-error" className="mt-2 text-sm font-medium text-red-600">
              Please enter a valid 10-digit mobile number.
            </p>
          )}

          <p className="mt-3 text-sm text-navy/60">
            We&apos;ll only use this to share your results and help if you have questions.
          </p>

          <button
            type="submit"
            className="mt-5 min-h-[44px] w-full rounded-full bg-accent py-4 font-heading text-lg font-extrabold text-navy transition hover:brightness-95"
          >
            Show My Results
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
