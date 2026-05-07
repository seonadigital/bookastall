import { Layout, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Discover Events",
    text: "Search our verified database of high-footfall exhibitions, flea markets, and festivals in your target city.",
  },
  {
    icon: Layout,
    title: "2. Pick Your Spot",
    text: "View interactive floor plans, check adjacent vendors, and select your exact stall location digitally.",
  },
  {
    icon: ShieldCheck,
    title: "3. Secure Booking",
    text: "Pay securely and get your digital pass instantly. Your money is protected until the event is verified.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight mb-4">
          Book with confidence in 3 steps.
        </h2>
        <p className="text-zinc-500 text-lg font-medium">
          A radically simplified process designed to get you the best spot,
          instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex flex-col items-start p-8 rounded-2xl bg-zinc-50 border border-zinc-200"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-6 shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 mb-3">
                {step.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed font-medium">
                {step.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}