import type { EventItem } from "@/lib/directus-types";
import EventCard from "@/components/events/EventCard";

export default function FeaturedEvents({ events }: { events: EventItem[] }) {
  return (
    <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
            Featured in Hyderabad
          </h2>
        </div>

        <div className="flex p-1 bg-zinc-100 border border-zinc-200 rounded-lg shadow-sm overflow-x-auto no-scrollbar self-start md:self-end">
          <button className="px-5 py-2 text-sm font-bold rounded bg-white text-zinc-950 shadow-sm transition-all whitespace-nowrap">
            All Events
          </button>
          <button className="px-5 py-2 text-sm font-semibold rounded text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-all whitespace-nowrap">
            Corporate
          </button>
          <button className="px-5 py-2 text-sm font-semibold rounded text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-all whitespace-nowrap">
            Flea Markets
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}