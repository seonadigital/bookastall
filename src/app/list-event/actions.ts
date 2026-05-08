"use server";

import { redirect } from "next/navigation";
import {
  createPendingEvent,
  getCityIdByName,
  slugify,
} from "@/lib/directus";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function getArray(formData: FormData, key: string) {
  return formData.getAll(key).map(String).filter(Boolean);
}

export async function submitEventAction(formData: FormData) {
  const organizer_name = getString(formData, "organizer_name");
  const phone = getString(formData, "phone");

  const event_title = getString(formData, "event_title");
  const cityName = getString(formData, "city");

  const venue_name = getString(formData, "venue_name");
  const venue_type = getString(formData, "venue_type");
  const environment = getString(formData, "environment");

  const start_date = getString(formData, "start_date");
  const end_date = getString(formData, "end_date");

  const stall_model = getString(formData, "stall_model");
  const stall_type = getString(formData, "stall_type");

  const categories_allowed = getArray(formData, "categories_allowed");
  const facilities_provided = getArray(formData, "facilities_provided");

  const stall_price_from = Number(formData.get("stall_price_from") || 0);
  const notes = getString(formData, "notes");

  if (
    !organizer_name ||
    !phone ||
    !event_title ||
    !cityName ||
    !venue_name ||
    !venue_type ||
    !environment ||
    !start_date ||
    !end_date ||
    !stall_model ||
    !stall_type
  ) {
    throw new Error("Please fill all required fields.");
  }

  const cityId = await getCityIdByName(cityName);

  if (!cityId) {
    throw new Error(`City not found in Directus: ${cityName}`);
  }

  await createPendingEvent({
    organizer_name,
    phone,

    title: event_title,
    slug: `${slugify(event_title)}-${Date.now()}`,

    city: cityId,

    venue_name,
    venue_type,
    environment,

    start_date,
    end_date,

    stall_model,
    stall_type,

    categories_allowed,
    facilities_provided,

    price_from: stall_price_from,
    footfall: 0,

    notes,
    description: notes,
  });

  redirect("/list-event?submitted=true");
}