import { NextRequest, NextResponse } from "next/server"
import { getCityBySlug, getEventsByCity } from "@/lib/data"

// GET /api/cities/[slug] - Get city details and events
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const city = getCityBySlug(slug)

  if (!city) {
    return NextResponse.json({ success: false, error: "City not found" }, { status: 404 })
  }

  const events = getEventsByCity(slug)

  return NextResponse.json({
    success: true,
    data: {
      city,
      events,
      eventCount: events.length,
    },
  })
}
