import Link from "next/link";
import {
  Calendar,
  LayoutGrid,
  Search,
} from "lucide-react";

export default function Hero() {
  return (
    <main className="relative w-full pt-12 2xl:pt-36 pb-24 flex flex-col items-center justify-center border-b border-zinc-200 overflow-hidden bg-zinc-50">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-[100px] animate-blob" />
        <div
          className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-bl from-blue-400/30 to-cyan-300/30 blur-[120px] animate-blob"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-grid opacity-30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 text-zinc-800 shadow-sm text-xs sm:text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          Over 150+ live events in Hyderabad
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-zinc-950 tracking-tighter leading-[1.1] mb-6">
          Find your perfect stall.
          <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Book it in seconds.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 mb-12 max-w-2xl font-medium leading-relaxed mx-auto">
          Access India&apos;s premier exhibitions and trade shows. Reserve your
          space via interactive digital floor plans—no PDFs required.
        </p>

        <form
          action="/events/hyderabad"
          className="w-full max-w-4xl bg-white/90 backdrop-blur-xl p-2 rounded-2xl sm:rounded-full flex flex-col sm:flex-row gap-2 border border-zinc-200 shadow-lg shadow-zinc-200/50 mb-16"
        >
          <div className="flex-1 flex items-center px-6 py-3 rounded-xl sm:rounded-full bg-transparent hover:bg-zinc-50 transition-colors cursor-pointer border border-transparent">
            <LayoutGrid className="w-5 h-5 text-zinc-400 mr-3" />
            <div className="flex flex-col items-start w-full">
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-0.5">
                Category
              </span>
              <select
                name="category"
                className="w-full bg-transparent text-zinc-950 outline-none text-sm font-semibold cursor-pointer appearance-none"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  What are you looking for?
                </option>
                <option value="all">All Categories</option>
                <option value="flea-markets">Flea Markets</option>
                <option value="exhibitions">Exhibitions</option>
              </select>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-zinc-200 self-center" />

          <div className="flex-1 flex items-center px-6 py-3 rounded-xl sm:rounded-full bg-transparent hover:bg-zinc-50 transition-colors cursor-pointer border border-transparent">
            <Calendar className="w-5 h-5 text-zinc-400 mr-3" />
            <div className="flex flex-col items-start w-full">
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-0.5">
                Date
              </span>
              <select
                name="date"
                className="w-full bg-transparent text-zinc-950 outline-none text-sm font-semibold cursor-pointer appearance-none"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  When do you want to book?
                </option>
                <option value="any">Any Date</option>
                <option value="weekend">This Weekend</option>
                <option value="next-7-days">Next 7 Days</option>
              </select>
            </div>
          </div>

          <button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 sm:py-0 rounded-xl sm:rounded-full font-bold transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-zinc-950 pt-8 w-full max-w-4xl border-t border-zinc-100">
          {[
            ["500+", "Organizers"],
            ["15k+", "Bookings"],
            ["₹50Cr", "Sales Gen."],
            ["24/7", "Support"],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-3xl font-black mb-1 tracking-tight">
                {value}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}