import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { db } from "@/lib/db"

async function handler(req: AuthenticatedRequest) {
  try {
    const { tenantId } = req.user!

    // Get current plan
    const tenantResult = await db.query(
      `SELECT t.plan_id, p.name, p.monthly_queries, p.price_cents, p.features
       FROM tenants t 
       JOIN plans p ON t.plan_id = p.id 
       WHERE t.id = $1`,
      [tenantId],
    )

    if (tenantResult.rows.length === 0) {
      return NextResponse.json({ status: "error", error: "Tenant not found" }, { status: 404 })
    }

    const currentPlan = tenantResult.rows[0]

    // Get all available plans
    const plansResult = await db.query("SELECT * FROM plans ORDER BY price_cents ASC")

    // Get current usage
    const currentMonth = new Date().toISOString().slice(0, 7) + "-01"
    const usageResult = await db.query(
      "SELECT COALESCE(SUM(queries_count), 0) as queries_this_month FROM usage WHERE tenant_id = $1 AND date >= $2",
      [tenantId, currentMonth],
    )

    const billingData = {
      current_plan: {
        id: currentPlan.plan_id,
        name: currentPlan.name,
        monthly_queries: currentPlan.monthly_queries,
        price_cents: currentPlan.price_cents,
        features: currentPlan.features,
      },
      available_plans: plansResult.rows,
      usage: {
        queries_this_month: Number.parseInt(usageResult.rows[0]?.queries_this_month || "0"),
        queries_limit: currentPlan.monthly_queries,
      },
    }

    return NextResponse.json({
      status: "ok",
      data: billingData,
    })
  } catch (error) {
    console.error("Billing error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withAuth(handler)
