import { Filter, Search } from "lucide-react";

export default function EventFilters() {
  return (
    <>
      <button className="lg:hidden w-full bg-white border border-zinc-200 px-6 py-4 rounded-xl font-bold flex items-center justify-between text-zinc-950 shadow-sm">
        <span className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Show Filters
        </span>
        <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded text-xs">
          4 Active
        </span>
      </button>

      <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">
        <form className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-zinc-950 mb-3">
              Search Events
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                name="q"
                type="text"
                placeholder="Search by name or venue..."
                className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all font-medium"
              />
            </div>
          </div>

          <div className="w-full h-px bg-zinc-200" />

          <div>
            <label className="block text-sm font-bold text-zinc-950 mb-4">
              Event Category
            </label>
            <div className="space-y-3">
              {[
                ["all", "All Categories"],
                ["flea-markets", "Flea Markets"],
                ["exhibitions", "Exhibitions"],
                ["food-festivals", "Food Festivals"],
                ["corporate-events", "Corporate Events"],
              ].map(([value, label]) => (
                <label key={value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value={value}
                    className="custom-checkbox"
                    defaultChecked={value === "all"}
                  />
                  <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-950 transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-zinc-200" />

          <div>
            <label className="block text-sm font-bold text-zinc-950 mb-4">
              Venue Type
            </label>
            <div className="space-y-3">
              {["Indoor", "Outdoor"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="venue" value={item} className="custom-checkbox" />
                  <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-950 transition-colors">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-zinc-950 text-white rounded-xl px-5 py-3 font-bold hover:bg-blue-600 transition-colors">
            Apply Filters
          </button>
        </form>
      </aside>
    </>
  );
}