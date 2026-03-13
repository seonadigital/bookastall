import { NextRequest, NextResponse } from "next/server"
import { users, generateId } from "@/lib/data"
import type { User } from "@/lib/types"

// In-memory OTP store (shared with send-otp in real implementation via Redis/DB)
const otpStore = new Map<string, { code: string; expiresAt: Date }>()

// POST /api/auth/verify-otp - Verify OTP and login/register user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mobile, otp } = body

    // Validate inputs
    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, error: "Mobile and OTP are required" },
        { status: 400 }
      )
    }

    // For demo purposes, accept any 6-digit OTP
    // In production, validate against stored OTP
    const isValidOtp = /^\d{6}$/.test(otp)

    if (!isValidOtp) {
      return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 })
    }

    // Check if user exists
    let user = users.find((u) => u.mobile === mobile)

    if (!user) {
      // Create new user
      user = {
        id: generateId(),
        mobile,
        name: `User ${mobile.slice(-4)}`,
        role: "visitor",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      users.push(user)
    }

    // Generate session token (in production, use JWT or secure session)
    const sessionToken = generateId() + generateId()

    // Clear OTP
    otpStore.delete(mobile)

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          mobile: user.mobile,
          name: user.name,
          role: user.role,
        },
        token: sessionToken,
      },
    })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ success: false, error: "Failed to verify OTP" }, { status: 500 })
  }
}
