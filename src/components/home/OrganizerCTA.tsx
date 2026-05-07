import Link from "next/link";

export default function OrganizerCTA() {
  return (
    <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 my-24 lg:my-32">
      <div className="bg-zinc-950 rounded-3xl p-10 md:p-20 text-center flex flex-col items-center border border-zinc-800">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Are you an Event Organizer?
        </h2>
        <p className="text-zinc-400 text-lg mb-10 font-medium max-w-2xl">
          Stop managing bookings on spreadsheets. List your exhibition on
          EventHub and reach thousands of verified vendors instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/list-event"
            className="bg-white text-zinc-950 hover:bg-zinc-200 px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto"
          >
            List Your Event
          </Link>
          <Link
            href="#"
            className="bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 px-8 py-4 rounded-xl font-bold transition-colors w-full sm:w-auto"
          >
            Talk to Sales
          </Link>
        </div>
      </div>
    </section>
  );
}