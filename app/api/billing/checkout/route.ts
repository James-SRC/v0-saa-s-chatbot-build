import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { db } from "@/lib/db"

async function handler(req: AuthenticatedRequest) {
  try {
    const { tenantId } = req.user!
    const { planId, successUrl, cancelUrl } = await req.json()

    if (!planId || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { status: "error", error: "Plan ID, success URL, and cancel URL are required" },
        { status: 400 },
      )
    }

    // Get plan details
    const planResult = await db.query("SELECT * FROM plans WHERE id = $1", [planId])

    if (planResult.rows.length === 0) {
      return NextResponse.json({ status: "error", error: "Plan not found" }, { status: 404 })
    }

    const plan = planResult.rows[0]

    // For demo purposes, return a mock session ID
    // In a real implementation, you would:
    // 1. Create a Stripe checkout session
    // 2. Handle webhooks for successful payments
    // 3. Update tenant plan when payment succeeds

    const mockSessionId = `cs_test_${Date.now()}_${planId}`

    // Store pending plan change
    await db.query("INSERT INTO invoices (tenant_id, amount_cents, status) VALUES ($1, $2, $3)", [
      tenantId,
      plan.price_cents,
      "pending",
    ])

    return NextResponse.json({
      status: "ok",
      data: {
        sessionId: mockSessionId,
        message: "Checkout session created (demo mode)",
      },
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}

export const POST = withAuth(handler)
