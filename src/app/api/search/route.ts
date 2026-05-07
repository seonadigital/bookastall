import { NextRequest, NextResponse } from "next/server";
import { publicDirectus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") || "";

  const events = await publicDirectus.request(
    readItems("events", {
      filter: {
        status: { _eq: "published" },
        title: {
          _contains: q,
        },
      },
      limit: 10,
      fields: [
        "id",
        "title",
        "slug",
        "venue_name",
        "start_date",
        "price_from",
        "city.slug",
      ],
    })
  );

  return NextResponse.json({ events });
}