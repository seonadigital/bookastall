import { NextRequest, NextResponse } from "next/server"
import { events, cities, generateId } from "@/lib/data"
import type { Event } from "@/lib/types"

// GET /api/events - List all events with optional filters
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")
  const eventType = searchParams.get("eventType")
  const featured = searchParams.get("featured")
  const trending = searchParams.get("trending")
  const search = searchParams.get("search")
  const limit = parseInt(searchParams.get("limit") || "50")
  const offset = parseInt(searchParams.get("offset") || "0")

  let filteredEvents = [...events].filter((e) => e.status === "approved")

  // Apply filters
  if (city) {
    const cityData = cities.find((c) => c.slug === city)
    if (cityData) {
      filteredEvents = filteredEvents.filter((e) => e.cityId === cityData.id)
    }
  }

  if (eventType) {
    filteredEvents = filteredEvents.filter((e) =>
      e.eventType.toLowerCase().includes(eventType.toLowerCase())
    )
  }

  if (featured === "true") {
    filteredEvents = filteredEvents.filter((e) => e.featured)
  }

  if (trending === "true") {
    filteredEvents = filteredEvents.filter((e) => e.trending)
  }

  if (search) {
    const lowerSearch = search.toLowerCase()
    filteredEvents = filteredEvents.filter(
      (e) =>
        e.name.toLowerCase().includes(lowerSearch) ||
        e.city.toLowerCase().includes(lowerSearch) ||
        e.venue.toLowerCase().includes(lowerSearch) ||
        e.categories.some((c) => c.toLowerCase().includes(lowerSearch))
    )
  }

  // Sort by start date
  filteredEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  // Pagination
  const total = filteredEvents.length
  const paginatedEvents = filteredEvents.slice(offset, offset + limit)

  return NextResponse.json({
    success: true,
    data: paginatedEvents,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  })
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "name",
      "cityId",
      "venue",
      "venueAddress",
      "startDate",
      "endDate",
      "totalStalls",
      "organizerName",
      "organizerMobile",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Find city
    const city = cities.find((c) => c.id === body.cityId)
    if (!city) {
      return NextResponse.json({ success: false, error: "Invalid city" }, { status: 400 })
    }

    // Create slug
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Create new event
    const newEvent: Event = {
      id: generateId(),
      name: body.name,
      slug,
      description: body.description || "",
      cityId: body.cityId,
      city: city.name,
      venue: body.venue,
      venueAddress: body.venueAddress,
      venueType: body.venueType || "indoor",
      eventType: body.eventType || "Lifestyle Exhibition",
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      totalStalls: parseInt(body.totalStalls),
      availableStalls: parseInt(body.availableStalls || body.totalStalls),
      stallModels: body.stallModels || [],
      categories: body.categories || [],
      facilities: body.facilities || [],
      posterUrl: body.posterUrl,
      floorPlanUrl: body.floorPlanUrl,
      expectedVisitors: parseInt(body.expectedVisitors || "0"),
      organizerId: generateId(),
      organizerName: body.organizerName,
      organizerMobile: body.organizerMobile,
      organizerEmail: body.organizerEmail,
      status: "pending",
      featured: false,
      trending: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add to events array (in production, this would save to database)
    events.push(newEvent)

    // Update city event count
    city.eventCount += 1

    return NextResponse.json({
      success: true,
      data: newEvent,
      message: "Event created successfully. It will be reviewed and approved shortly.",
    })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ success: false, error: "Failed to create event" }, { status: 500 })
  }
}
