import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { City } from "@/lib/directus-types";
import { directusAssetUrl } from "@/lib/directus";

export default function CityGrid({ cities }: { cities: City[] }) {
  return (
    <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32 pt-24 border-t border-zinc-200">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">
            Active Destinations
          </h2>
          <p className="text-zinc-500 mt-2 text-lg font-medium">
            Browse venues in major economic hubs.
          </p>
        </div>

        <Link
          href="/events/hyderabad"
          className="hidden sm:flex text-sm font-bold text-blue-600 items-center gap-1 hover:text-blue-700 transition-colors"
        >
          View directory <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/events/${city.slug}`}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl aspect-square bg-zinc-100 border border-zinc-200 mb-4 relative">
              <Image
                src={directusAssetUrl(city.image)}
                alt={city.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="font-bold text-zinc-950 text-lg">{city.name}</h3>
            <p className="text-sm font-medium text-zinc-500">
              {city.active_events_count ?? 0} Active Events
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}