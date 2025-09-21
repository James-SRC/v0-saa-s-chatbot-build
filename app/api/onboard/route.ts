import { type NextRequest, NextResponse } from "next/server"
import { createUser, createTenant, generateJWT } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { ownerEmail, password, companyName, ownerName } = await request.json()

    if (!ownerEmail || !password || !companyName) {
      return NextResponse.json(
        { status: "error", error: "Email, password, and company name are required" },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await db.query("SELECT id FROM users WHERE email = $1", [ownerEmail])
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ status: "error", error: "User with this email already exists" }, { status: 409 })
    }

    // Create user
    const user = await createUser(ownerEmail, password, ownerName)

    // Create tenant
    const tenant = await createTenant(user.id, companyName)

    // Generate JWT token
    const token = generateJWT({
      userId: user.id,
      tenantId: tenant.id,
      email: user.email,
    })

    return NextResponse.json({
      status: "ok",
      data: {
        userId: user.id,
        tenantId: tenant.id,
        token,
        nextSteps: ["add-site", "billing"],
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
    console.error("Onboard error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}
