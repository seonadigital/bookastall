import Link from "next/link";
import { Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-16 pb-8 mt-12">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 lg:pr-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-zinc-950 text-white p-1.5 rounded-md">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-950">
                <span className="font-normal text-zinc-500">book a </span>Stall
              </span>
            </Link>

            <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
              The premium booking infrastructure for India&apos;s most exclusive
              exhibitions, flea markets, and trade shows.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-zinc-950 mb-5 tracking-tight">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500 font-medium">
              <li>
                <Link href="/events/hyderabad" className="hover:text-zinc-950">
                  Find Events
                </Link>
              </li>
              <li>
                <Link href="/list-event" className="hover:text-zinc-950">
                  List an Event
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-950">
                  Venues
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-zinc-950 mb-5 tracking-tight">
              Categories
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500 font-medium">
              <li>Flea Markets</li>
              <li>Art Exhibitions</li>
              <li>Food Festivals</li>
              <li>Tech Summits</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-zinc-950 mb-5 tracking-tight">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500 font-medium">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact Support</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">
            © 2026 Book a Stall Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-semibold uppercase tracking-widest">
            <span>Engineered for scale.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}