import {
  createDirectus,
  rest,
  readItems,
  createItem,
  staticToken,
} from "@directus/sdk";
import type { Schema, EventItem } from "./directus-types";

const directusUrl = "https://admin.bookastall.in";

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

  return `https://admin.bookastall.in/assets/${id}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
        {
          category: ["id", "name", "slug"],
        },
        {
          city: ["id", "name", "slug"],
        },
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

export async function getCityIdByName(cityName: string) {
  const cities = await adminDirectus.request(
    readItems("cities", {
      filter: {
        name: {
          _eq: cityName,
        },
      },
      limit: 1,
      fields: ["id", "name", "slug"],
    })
  );

  return cities[0]?.id ?? null;
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
        {
          category: ["id", "name", "slug"],
        },
        {
          city: ["id", "name", "slug"],
        },
      ],
    })
  );
}

export async function createPendingEvent(data: Partial<EventItem>) {
  return adminDirectus.request(
    createItem("events", {
      ...data,
      status: "pending_review",
      booking_status: "Pending Review",
      is_featured: false,
    })
  );
}