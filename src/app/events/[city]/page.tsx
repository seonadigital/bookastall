import { notFound } from "next/navigation";
import CityHero from "@/components/events/CityHero";
import EventFilters from "@/components/events/EventFilters";
import EventCard from "@/components/events/EventCard";
import { getCityBySlug, getEventsByCity } from "@/lib/directus";

type PageProps = {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<{
    category?: string;
    sort?: string;
    q?: string;
  }>;
};

export default async function CityEventsPage({ params, searchParams }: PageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;

  const city = await getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  let events = await getEventsByCity(citySlug);

  if (filters.q) {
    const query = filters.q.toLowerCase();
    events = events.filter((event) => {
      return (
        event.title.toLowerCase().includes(query) ||
        event.venue_name?.toLowerCase().includes(query)
      );
    });
  }

  if (filters.category && filters.category !== "all") {
    events = events.filter((event) => {
      if (typeof event.category !== "object" || !event.category) return false;
      return event.category.slug === filters.category;
    });
  }

  if (filters.sort === "price-low") {
    events = [...events].sort((a, b) => (a.price_from ?? 0) - (b.price_from ?? 0));
  }

  if (filters.sort === "price-high") {
    events = [...events].sort((a, b) => (b.price_from ?? 0) - (a.price_from ?? 0));
  }

  if (filters.sort === "soonest") {
    events = [...events].sort((a, b) => {
      return new Date(a.start_date ?? 0).getTime() - new Date(b.start_date ?? 0).getTime();
    });
  }

  return (
    <>
      <CityHero city={city} />

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <EventFilters />

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <p className="text-zinc-600 font-medium">
                Showing{" "}
                <span className="font-bold text-zinc-950">{events.length}</span>{" "}
                events
              </p>

              <form className="flex items-center gap-3">
                <span className="text-sm font-bold text-zinc-950">Sort by:</span>
                <select
                  name="sort"
                  defaultValue={filters.sort || "recommended"}
                  className="bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-zinc-900 cursor-pointer min-w-[140px]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="soonest">Date: Soonest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <button className="bg-zinc-950 text-white rounded-lg px-4 py-2 text-sm font-bold">
                  Apply
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}

              {events.length === 0 && (
                <div className="bg-white rounded-2xl border border-zinc-200 p-10 text-center">
                  <h2 className="text-xl font-black text-zinc-950">
                    No events found
                  </h2>
                  <p className="text-zinc-500 mt-2 font-medium">
                    Try changing filters or search again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}