import { NextRequest, NextResponse } from "next/server"
import { enquiries, generateId } from "@/lib/data"
import type { Enquiry } from "@/lib/types"

// POST /api/enquiries - Submit an enquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "mobile", "message"]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate mobile number
    const mobileRegex = /^[6-9]\d{9}$/
    if (!mobileRegex.test(body.mobile)) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400 }
      )
    }

    // Create enquiry
    const newEnquiry: Enquiry = {
      id: generateId(),
      eventId: body.eventId || undefined,
      name: body.name,
      email: body.email || "",
      mobile: body.mobile,
      message: body.message,
      type: body.type || "general",
      status: "new",
      createdAt: new Date(),
    }

    // Add to enquiries
    enquiries.push(newEnquiry)

    return NextResponse.json({
      success: true,
      data: newEnquiry,
      message: "Enquiry submitted successfully. Our team will contact you shortly.",
    })
  } catch (error) {
    console.error("Error creating enquiry:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    )
  }
}
