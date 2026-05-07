import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { City } from "@/lib/directus-types";

export default function CityHero({ city }: { city: City }) {
  return (
    <header className="w-full bg-white border-b border-zinc-200 relative overflow-hidden flex flex-col items-center justify-center text-center pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
          <Link href="/" className="hover:text-zinc-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Cities</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-600">{city.name}</span>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-zinc-950 tracking-tight leading-[1.1] mb-6">
            Events in {city.name}
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto">
            {city.description ||
              `Discover premium exhibitions, flea markets, and trade shows happening across ${city.name}.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 bg-white/80 backdrop-blur-md border border-zinc-200 px-8 py-5 rounded-full shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-black text-zinc-950">
              {city.active_events_count ?? 0}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">
              Live Events
            </span>
          </div>

          <div className="w-px h-10 bg-zinc-200" />

          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-black text-zinc-950">
              {city.venues_count ?? 0}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">
              Venues
            </span>
          </div>

          <div className="w-px h-10 bg-zinc-200" />

          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-black text-zinc-950">
              {city.stalls_available ?? 0}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">
              Stalls Avail.
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}