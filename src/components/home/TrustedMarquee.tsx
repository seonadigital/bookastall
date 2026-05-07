import {
  Aperture,
  Codesandbox,
  Figma,
  Framer,
  Gitlab,
  Hexagon,
  Slack,
  Triangle,
} from "lucide-react";

const icons = [
  Codesandbox,
  Figma,
  Framer,
  Gitlab,
  Hexagon,
  Slack,
  Triangle,
  Aperture,
];

export default function TrustedMarquee() {
  const repeated = [...icons, ...icons];

  return (
    <section className="bg-zinc-50 py-10 border-b border-zinc-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center relative z-10">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Powering infrastructure for India&apos;s top event organizers
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex z-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-zinc-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-zinc-50 after:to-transparent">
        <div className="flex animate-scroll whitespace-nowrap gap-16 items-center px-4 opacity-50 grayscale">
          {repeated.map((Icon, index) => (
            <Icon key={index} className="w-8 h-8 text-zinc-900" />
          ))}
        </div>
      </div>
    </section>
  );
}