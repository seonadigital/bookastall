const faqs = [
  {
    q: "Are my payments secure?",
    a: "Yes. Your payment is held securely and only released to the organizer once your stall booking is officially confirmed and verified.",
  },
  {
    q: "Can I cancel my stall booking?",
    a: "Cancellations are subject to the specific organizer policy displayed before checkout.",
  },
  {
    q: "How do I know the floor plan is accurate?",
    a: "We work directly with organizers to digitize their official blueprints and show real-time availability.",
  },
];

export default function FAQ() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32 pt-24 border-t border-zinc-200">
      <h2 className="text-3xl font-black text-zinc-950 tracking-tight mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.q} className="border-b border-zinc-200 pb-6">
            <h3 className="text-lg font-bold text-zinc-950 mb-2">{faq.q}</h3>
            <p className="text-zinc-600 font-medium leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}