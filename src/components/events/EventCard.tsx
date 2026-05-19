import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Users } from "lucide-react";
import type { EventItem } from "@/lib/directus-types";
import { directusAssetUrl } from "@/lib/directus";

function getDay(date?: string | null) {
  if (!date) return "--";
  return new Date(date).getDate().toString().padStart(2, "0");
}

function getMonth(date?: string | null) {
  if (!date) return "---";
  return new Date(date).toLocaleString("en-IN", { month: "short" });
}

export default function EventCard({ event }: { event: EventItem }) {
  const category =
    typeof event.category === "object" && event.category
      ? event.category.name
      : "Event";

  return (
    <div className="group bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row overflow-hidden">
      <div className="relative h-56 sm:h-auto sm:w-72 lg:w-80 flex-shrink-0 overflow-hidden">
        <Image
          src={directusAssetUrl(event.image)}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4 bg-white text-zinc-950 px-3 py-1.5 rounded-md text-xs font-bold border border-zinc-200 shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {event.booking_status || "Booking Open"}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
          <div className="pr-4">
            <div className="pb-4 text-sm">ID: 32432</div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              {category}
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-zinc-950 tracking-tight leading-snug">
              {event.title}
            </h3>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-center min-w-[3.5rem] flex-shrink-0">
            <span className="block text-[10px] font-bold text-zinc-500 uppercase">
              {getMonth(event.start_date)}
            </span>
            <span className="block text-xl font-black text-zinc-950 leading-none mt-0.5">
              {getDay(event.start_date)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6">
          <div className="flex items-center gap-2 text-zinc-600 text-sm font-medium">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <span>
              {event.venue_name}
              {event.venue_area ? `, ${event.venue_area}` : ""}
            </span>
          </div>

          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-200" />

          <div className="flex items-center gap-2 text-zinc-600 text-sm font-medium">
            <Users className="w-4 h-4 text-zinc-400" />
            <span>{event.footfall?.toLocaleString("en-IN") ?? "0"}+ Footfall</span>
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-zinc-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">
              Stalls from
            </p>
            <p className="text-xl font-black text-zinc-950">
              ₹{event.price_from?.toLocaleString("en-IN") ?? "0"}
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <Link
              href={`/events/${typeof event.city === "object" ? event.city?.slug : "hyderabad"}/${event.slug}`}
              className="flex gap-1 leading-none rounded-lg text-sm font-bold transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Organizer
            </Link>

            <Link
              href={`/events/${typeof event.city === "object" ? event.city?.slug : "hyderabad"}/${event.slug}`}
              className="bg-zinc-950 text-white hover:bg-blue-600 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors"
            >
              More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}