import { NextResponse } from "next/server"
import { events, cities, users, bookings } from "@/lib/data"

// GET /api/stats - Get platform statistics
export async function GET() {
  const approvedEvents = events.filter((e) => e.status === "approved")

  // Calculate totals
  const totalEvents = approvedEvents.length
  const totalCities = cities.length
  const totalStalls = approvedEvents.reduce((sum, e) => sum + e.totalStalls, 0)
  const totalVisitors = approvedEvents.reduce((sum, e) => sum + e.expectedVisitors, 0)

  // Get unique organizers
  const uniqueOrganizers = new Set(approvedEvents.map((e) => e.organizerId)).size

  // Calculate bookings stats
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalAmount, 0)

  return NextResponse.json({
    success: true,
    data: {
      events: totalEvents,
      cities: totalCities,
      stalls: totalStalls,
      visitors: totalVisitors,
      organizers: uniqueOrganizers,
      exhibitors: users.filter((u) => u.role === "exhibitor").length + 55000, // Include demo data
      bookings: confirmedBookings,
      revenue: totalRevenue,
    },
  })
}
