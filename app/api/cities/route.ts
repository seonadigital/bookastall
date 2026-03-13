import { NextRequest, NextResponse } from "next/server"
import { cities } from "@/lib/data"

// GET /api/cities - List all cities
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const popular = searchParams.get("popular")
  const search = searchParams.get("search")

  let filteredCities = [...cities]

  if (popular === "true") {
    filteredCities = filteredCities.filter((c) => c.isPopular)
  }

  if (search) {
    const lowerSearch = search.toLowerCase()
    filteredCities = filteredCities.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.state.toLowerCase().includes(lowerSearch)
    )
  }

  // Sort by event count (descending)
  filteredCities.sort((a, b) => b.eventCount - a.eventCount)

  return NextResponse.json({
    success: true,
    data: filteredCities,
  })
}
