const TESTIMONIALS = [
  {
    name: "James Alukas",
    location: "Angamaly",
    quote: "Our fridge and fans ran through a 6-hour power cut without any issue. Great service too.",
  },
  {
    name: "Suresh C",
    location: "Perumbavur",
    quote: "The team explained everything in simple terms and installation was quick.",
  },
  {
    name: "Baby Payyapilly",
    location: "Chalakudy",
    quote: "Five years in and the battery still performs like new. Worth the investment.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
          What Our Customers Say
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial.name} className="rounded-2xl bg-surface p-6">
              <blockquote className="text-lg text-navy/80">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 font-heading font-bold text-navy">
                {testimonial.name}
                <span className="block text-sm font-medium text-navy/60">{testimonial.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
