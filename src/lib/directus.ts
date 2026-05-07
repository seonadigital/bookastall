import {
  createDirectus,
  rest,
  readItems,
  createItem,
  staticToken,
} from "@directus/sdk";
import type { Schema, EventSubmission } from "./directus-types";

const directusUrl = 'https://admin.bookastall.in';

if (!directusUrl) {
  throw new Error("Missing DIRECTUS_URL or NEXT_PUBLIC_DIRECTUS_URL");
}

export const publicDirectus = createDirectus<Schema>(directusUrl).with(rest());

export const adminDirectus = createDirectus<Schema>(directusUrl)
  .with(staticToken("_GDtZYT4hwVFv62TLHSeymn7-dlUZvpN"))
  .with(rest());

export function directusAssetUrl(file?: string | { id: string } | null) {
  if (!file) return "/placeholder-event.jpg";

  const id = typeof file === "string" ? file : file.id;

  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${id}`;
}

export async function getCities() {
  return publicDirectus.request(
    readItems("cities", {
      filter: {
        is_active: {
          _eq: true,
        },
      },
      sort: ["name"],
      fields: [
        "id",
        "name",
        "slug",
        "image",
        "active_events_count",
        "venues_count",
        "stalls_available",
        "description",
      ],
    })
  );
}

export async function getFeaturedEvents() {
  return publicDirectus.request(
    readItems("events", {
      filter: {
        status: { _eq: "published" },
        is_featured: { _eq: true },
      },
      sort: ["start_date"],
      limit: 6,
      fields: [
        "id",
        "title",
        "slug",
        "venue_name",
        "venue_area",
        "start_date",
        "image",
        "price_from",
        "footfall",
        "booking_status",
        "category.id",
        "category.name",
        "category.slug",
        "city.id",
        "city.name",
        "city.slug",
      ],
    })
  );
}

export async function getCityBySlug(slug: string) {
  const cities = await publicDirectus.request(
    readItems("cities", {
      filter: {
        slug: {
          _eq: slug,
        },
      },
      limit: 1,
      fields: [
        "id",
        "name",
        "slug",
        "image",
        "active_events_count",
        "venues_count",
        "stalls_available",
        "description",
      ],
    })
  );

  return cities[0] ?? null;
}

export async function getEventsByCity(citySlug: string) {
  return publicDirectus.request(
    readItems("events", {
      filter: {
        status: { _eq: "published" },
        city: {
          slug: {
            _eq: citySlug,
          },
        },
      },
      sort: ["start_date"],
      fields: [
        "id",
        "title",
        "slug",
        "venue_name",
        "venue_area",
        "venue_type",
        "environment",
        "start_date",
        "end_date",
        "image",
        "price_from",
        "footfall",
        "booking_status",
        "category.id",
        "category.name",
        "category.slug",
        "city.id",
        "city.name",
        "city.slug",
      ],
    })
  );
}

export async function submitEvent(data: EventSubmission) {
  return adminDirectus.request(
    createItem("event_submissions", {
      ...data,
      status: "pending_review",
    })
  );
}