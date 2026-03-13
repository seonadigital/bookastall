import { NextRequest, NextResponse } from "next/server"
import { getEventById } from "@/lib/data"

// GET /api/events/[id] - Get single event details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const event = getEventById(id)

  if (!event) {
    return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: event,
  })
}
