const FAQS = [
  {
    question: "How long will my fridge run on backup?",
    answer:
      "It depends on your battery size and what else is running at the same time. Use the calculator above — add your fridge and any other appliances, and we'll show you the estimated backup hours for each battery option.",
  },
  {
    question: "Do I need to replace my old battery or inverter?",
    answer:
      "Not always. If your current inverter is working well, you may only need a new battery. Our team can check your existing setup and tell you honestly what needs replacing.",
  },
  {
    question: "What's the difference between 100/150/200 AH?",
    answer:
      "AH (Amp Hour) is a measure of how much energy a battery can store — think of it like a fuel tank size. A higher AH battery stores more energy and gives longer backup, but costs more. Use the calculator above to see how each size performs for your specific appliances.",
  },
  {
    question: "Do you install it or do I need an electrician?",
    answer:
      "We take care of both delivery and installation as part of your purchase, so you don't need to arrange anything separately. If you'd prefer to have your own electrician handle the installation instead, that's completely fine too — just let us know when you order.",
  },
];

export function FAQ() {
  return (
    <section className="bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border-2 border-navy/10 bg-white p-5 open:border-accent"
            >
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-lg font-semibold text-navy">
                {faq.question}
                <span
                  className="ml-4 text-2xl text-navy/40 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-base text-navy/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
