import Link from "next/link";
import {
  MapPin,
  ChevronDown,
  Menu,
  Store,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-200 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-zinc-950 text-white p-2 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-950">
                <span className="font-normal text-zinc-500">book a </span>Stall
              </span>
            </Link>

            <Link
              href="/events/hyderabad"
              className="hidden md:flex items-center gap-2 group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-zinc-600 hover:text-zinc-950 text-sm font-medium transition-colors bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                <span>Hyderabad</span>
                <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events/hyderabad"
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              Find Events
            </Link>
            <Link
              href="/list-event"
              className="bg-zinc-950 text-white hover:bg-zinc-800 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
            >
              List an Event
            </Link>
            <div className="w-px h-5 bg-zinc-200" />
            {/* <Link
              href="#"
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="#"
              className="bg-zinc-950 text-white hover:bg-zinc-800 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
            >
              Sign Up
            </Link> */}
          </div>

          <button className="md:hidden text-zinc-950 focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}