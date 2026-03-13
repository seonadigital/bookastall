import { NextRequest, NextResponse } from "next/server"
import { generateId } from "@/lib/data"

// In-memory OTP store (in production, use Redis or database)
const otpStore = new Map<string, { code: string; expiresAt: Date }>()

// POST /api/auth/send-otp - Send OTP to mobile number
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mobile } = body

    // Validate mobile number
    const mobileRegex = /^[6-9]\d{9}$/
    if (!mobile || !mobileRegex.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400 }
      )
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 5-minute expiry
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
    otpStore.set(mobile, { code: otp, expiresAt })

    // In production, send SMS via Twilio/MSG91/etc.
    // For demo, we'll return the OTP (remove in production!)
    console.log(`[Demo] OTP for ${mobile}: ${otp}`)

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      // Remove this in production - only for demo purposes
      demo_otp: otp,
    })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ success: false, error: "Failed to send OTP" }, { status: 500 })
  }
}

// Export for use in verify endpoint
export { otpStore }
