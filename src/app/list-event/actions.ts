"use server";

import { redirect } from "next/navigation";
import { submitEvent } from "@/lib/directus";

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
  const city = getString(formData, "city");
  const venue_name = getString(formData, "venue_name");
  const venue_type = getString(formData, "venue_type");
  const environment = getString(formData, "environment");
  const start_date = getString(formData, "start_date");
  const end_date = getString(formData, "end_date");
  const stall_model = getString(formData, "stall_model");
  const stall_type = getString(formData, "stall_type");

  if (
    !organizer_name ||
    !phone ||
    !event_title ||
    !city ||
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

  await submitEvent({
    organizer_name,
    phone,
    event_title,
    city,
    venue_name,
    venue_type,
    environment,
    start_date,
    end_date,
    stall_model,
    stall_type,
    categories_allowed: getArray(formData, "categories_allowed"),
    facilities_provided: getArray(formData, "facilities_provided"),
    stall_price_from: Number(formData.get("stall_price_from") || 0),
    notes: getString(formData, "notes"),
  });

  redirect("/list-event?submitted=true");
}