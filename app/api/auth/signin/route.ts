import { type NextRequest, NextResponse } from "next/server"
import { getUserWithPassword, verifyPassword, generateJWT, getTenantByUserId } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ status: "error", error: "Email and password are required" }, { status: 400 })
    }

    // Get user with password hash
    const user = await getUserWithPassword(email)
    if (!user) {
      return NextResponse.json({ status: "error", error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ status: "error", error: "Invalid email or password" }, { status: 401 })
    }

    // Get user's tenant
    const tenant = await getTenantByUserId(user.id)
    if (!tenant) {
      return NextResponse.json({ status: "error", error: "No tenant found for user" }, { status: 404 })
    }

    // Generate JWT token
    const token = generateJWT({
      userId: user.id,
      tenantId: tenant.id,
      email: user.email,
    })

    return NextResponse.json({
      status: "ok",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        tenant: {
          id: tenant.id,
          name: tenant.name,
        },
      },
    })
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}
