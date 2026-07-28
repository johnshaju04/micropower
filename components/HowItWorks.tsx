import { ListChecks, BatteryCharging, PhoneCall } from "lucide-react";

const STEPS = [
  {
    icon: ListChecks,
    title: "1. Tell us your appliances",
    description: "Tap to add the lights, fans, and appliances you want to keep running.",
  },
  {
    icon: BatteryCharging,
    title: "2. Get your recommended battery",
    description: "We calculate the right AH battery for your home in seconds.",
  },
  {
    icon: PhoneCall,
    title: "3. Order or talk to us",
    description: "Shop online, chat on WhatsApp, or call a salesperson — your choice.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
          How It Works
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy text-accent">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-base text-navy/70">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
