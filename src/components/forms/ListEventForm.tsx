import { ArrowRight, ChevronDown } from "lucide-react";
import { submitEventAction } from "@/app/list-event/actions";

const cities = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Gurgaon",
  "Noida",
  "Indore",
  "Lucknow",
  "Chandigarh",
  "Surat",
  "Vizag",
  "Vadodara",
  "Coimbatore",
];

const categories = [
  "Apparel",
  "Jewelry",
  "Food",
  "Handicrafts",
  "Electronics",
  "Home Decor",
  "Cosmetics",
  "Others",
];

const facilities = [
  "Electricity",
  "Tables",
  "Chairs",
  "Parking",
  "WiFi",
  "Security",
  "Washrooms",
  "Food Court",
];

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-zinc-950 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all font-medium"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-zinc-950 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          required={required}
          defaultValue=""
          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3.5 text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all font-medium appearance-none"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
      </div>
    </div>
  );
}

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm p-8 sm:p-10">
      <div className="flex items-center gap-4 mb-8 border-b border-zinc-100 pb-6">
        <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-950">
          <span className="font-black text-lg">{number}</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">
            {title}
          </h2>
          <p className="text-zinc-500 text-sm font-medium mt-1">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

export default function ListEventForm() {
  return (
    <form action={submitEventAction} className="space-y-8">
      <Section
        number="1"
        title="Organizer Information"
        description="Provide your contact details for exhibitor inquiries."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Organizer/Company Name"
            name="organizer_name"
            placeholder="Your registered company name"
            required
          />

          <div>
            <label className="block text-sm font-bold text-zinc-950 mb-2">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <div className="flex relative">
              <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-100 text-zinc-600 font-bold text-sm">
                +91
              </span>
              <input
                name="phone"
                type="tel"
                required
                placeholder="98765 43210"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-r-xl px-5 py-3.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all font-medium"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section
        number="2"
        title="Event Details"
        description="Provide information about your exhibition or event."
      >
        <div className="space-y-6">
          <Field
            label="Event Title"
            name="event_title"
            placeholder="e.g. The Great Winter Flea Market"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="City"
              name="city"
              options={cities}
              placeholder="Select City"
              required
            />
            <Field
              label="Venue Name"
              name="venue_name"
              placeholder="e.g. Hitex Grounds"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Venue Type"
              name="venue_type"
              options={[
                "Hotel",
                "Convention Center",
                "Banquet Hall",
                "Open Ground",
                "Mall",
                "Exhibition Hall",
                "Club",
                "Other",
              ]}
              placeholder="Select Venue Type"
              required
            />

            <SelectField
              label="Indoor/Outdoor"
              name="environment"
              options={["Indoor", "Outdoor", "Both"]}
              placeholder="Indoor/Outdoor/Both"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Start Date" name="start_date" type="date" required />
            <Field label="End Date" name="end_date" type="date" required />
          </div>
        </div>
      </Section>

      <Section
        number="3"
        title="Stall Information"
        description="Provide details about the stalls available at your event."
      >
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Stall Model"
              name="stall_model"
              options={[
                "Open Table",
                "Canopy",
                "Octanorm",
                "Shell Scheme",
                "Raw Space",
                "Others",
              ]}
              placeholder="Select Stall Model"
              required
            />

            <SelectField
              label="Stall Type"
              name="stall_type"
              options={[
                "With Tables",
                "With Chairs",
                "Tables & Chairs",
                "Empty Space",
              ]}
              placeholder="Select Stall Type"
              required
            />
          </div>

          <Field
            label="Stall Price From"
            name="stall_price_from"
            type="number"
            placeholder="8500"
          />

          <div>
            <label className="block text-sm font-bold text-zinc-950 mb-3">
              Categories Allowed
            </label>
            <p className="text-sm text-zinc-500 font-medium mb-4">
              Select the product categories allowed at your event.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <label key={category} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="categories_allowed"
                    value={category}
                    className="peer sr-only"
                  />
                  <div className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 font-semibold text-sm hover:border-zinc-300 peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-checked:text-white transition-all text-center">
                    {category}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-950 mb-3">
              Facilities Provided
            </label>
            <p className="text-sm text-zinc-500 font-medium mb-4">
              Select the facilities available at your event venue.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {facilities.map((facility) => (
                <label key={facility} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="facilities_provided"
                    value={facility}
                    className="peer sr-only"
                  />
                  <div className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 font-semibold text-sm hover:border-zinc-300 peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-checked:text-white transition-all text-center">
                    {facility}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-950 mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows={5}
              placeholder="Add floor plan notes, stall rules, payment details, etc."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all font-medium"
            />
          </div>
        </div>
      </Section>

      <div className="flex flex-col items-end gap-3 pt-6 border-t border-zinc-200 mt-8">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            className="flex-1 sm:flex-none px-8 py-4 rounded-xl font-bold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200 text-center"
          >
            Save Draft
          </button>

          <button
            type="submit"
            className="flex-1 sm:flex-none bg-zinc-950 text-white hover:bg-blue-600 px-10 py-4 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            Submit Event for Review
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-500 font-medium w-full sm:text-right text-center">
          Your event will be reviewed and published within 24 hours.
        </p>
      </div>
    </form>
  );
}