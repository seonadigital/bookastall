import ListEventForm from "@/components/forms/ListEventForm";
import { Building } from "lucide-react";

export const metadata = {
  title: "List Your Event | EventHub",
};

export default function ListEventPage() {
  return (
    <>
      <header className="w-full pt-24 pb-20 md:pt-32 md:pb-28 bg-white border-b border-zinc-200 bg-grid relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-widest mb-6">
              <Building className="w-3.5 h-3.5" />
              For Organizers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight leading-tight mb-6">
              List your event & <br className="hidden sm:block" />
              start accepting bookings.
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl">
              Reach thousands of verified vendors, manage your floor plan
              digitally, and collect payments securely through EventHub.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ListEventForm />
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm p-8">
                <h3 className="text-xl font-black text-zinc-950 tracking-tight mb-6">
                  Why host with EventHub?
                </h3>

                <div className="space-y-5">
                  {[
                    "Reach verified vendors",
                    "Manage bookings digitally",
                    "Collect secure payments",
                    "Publish after review",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-zinc-950" />
                      <p className="text-sm font-bold text-zinc-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-950 text-white rounded-[2rem] border border-zinc-800 shadow-sm p-8">
                <h3 className="text-xl font-black tracking-tight mb-4">
                  What happens next?
                </h3>
                <div className="space-y-6 border-l border-zinc-800 pl-6">
                  <div className="relative">
                    <div className="absolute w-3 h-3 bg-white rounded-full -left-[30px] top-1 ring-4 ring-zinc-950" />
                    <h4 className="font-bold text-sm">Submit Details</h4>
                    <p className="text-xs text-zinc-400 mt-1 font-medium leading-relaxed">
                      Send your organizer, event, and stall information.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute w-3 h-3 bg-zinc-800 rounded-full -left-[30px] top-1 ring-4 ring-zinc-950" />
                    <h4 className="font-bold text-sm">Fast Verification</h4>
                    <p className="text-xs text-zinc-400 mt-1 font-medium leading-relaxed">
                      Our team verifies your details before publishing.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute w-3 h-3 bg-zinc-800 rounded-full -left-[30px] top-1 ring-4 ring-zinc-950" />
                    <h4 className="font-bold text-sm">Go Live</h4>
                    <p className="text-xs text-zinc-400 mt-1 font-medium leading-relaxed">
                      Your event page goes live and vendors start booking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}