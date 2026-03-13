import { NextRequest, NextResponse } from "next/server"
import { bookings, events, generateId } from "@/lib/data"
import type { Booking } from "@/lib/types"

// GET /api/bookings - List bookings (requires userId in query)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get("userId")
  const eventId = searchParams.get("eventId")

  if (!userId && !eventId) {
    return NextResponse.json(
      { success: false, error: "userId or eventId is required" },
      { status: 400 }
    )
  }

  let filteredBookings = [...bookings]

  if (userId) {
    filteredBookings = filteredBookings.filter((b) => b.userId === userId)
  }

  if (eventId) {
    filteredBookings = filteredBookings.filter((b) => b.eventId === eventId)
  }

  return NextResponse.json({
    success: true,
    data: filteredBookings,
  })
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["eventId", "userId", "stallModelId", "quantity"]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Find event
    const event = events.find((e) => e.id === body.eventId)
    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    // Find stall model
    const stallModel = event.stallModels.find((sm) => sm.id === body.stallModelId)
    if (!stallModel) {
      return NextResponse.json({ success: false, error: "Stall model not found" }, { status: 404 })
    }

    // Check availability
    const quantity = parseInt(body.quantity)
    if (stallModel.available < quantity) {
      return NextResponse.json(
        { success: false, error: "Not enough stalls available" },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = stallModel.price * quantity

    // Create booking
    const newBooking: Booking = {
      id: generateId(),
      eventId: body.eventId,
      userId: body.userId,
      stallModelId: body.stallModelId,
      quantity,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add to bookings
    bookings.push(newBooking)

    // Update stall availability
    stallModel.available -= quantity
    event.availableStalls -= quantity

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: "Booking created successfully. Please complete payment to confirm.",
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 })
  }
}
