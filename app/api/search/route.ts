import { NextRequest, NextResponse } from "next/server"
import { searchEvents, cities } from "@/lib/data"

// GET /api/search - Search events and cities
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""
  const type = searchParams.get("type") || "all" // all, events, cities

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: true,
      data: { events: [], cities: [] },
    })
  }

  const lowerQuery = query.toLowerCase()

  let matchedEvents: typeof import("@/lib/data").events = []
  let matchedCities: typeof cities = []

  if (type === "all" || type === "events") {
    matchedEvents = searchEvents(query).slice(0, 10)
  }

  if (type === "all" || type === "cities") {
    matchedCities = cities
      .filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.state.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
  }

  return NextResponse.json({
    success: true,
    data: {
      events: matchedEvents,
      cities: matchedCities,
    },
  })
}
