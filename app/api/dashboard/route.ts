import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { db } from "@/lib/db"

async function handler(req: AuthenticatedRequest) {
  try {
    const { tenantId } = req.user!

    // Get tenant info with plan
    const tenantResult = await db.query(
      `SELECT t.name, p.name as plan_name 
       FROM tenants t 
       JOIN plans p ON t.plan_id = p.id 
       WHERE t.id = $1`,
      [tenantId],
    )

    if (tenantResult.rows.length === 0) {
      return NextResponse.json({ status: "error", error: "Tenant not found" }, { status: 404 })
    }

    const tenant = tenantResult.rows[0]

    // Get sites for this tenant
    const sitesResult = await db.query(
      "SELECT id, domain, title, status, created_at FROM sites WHERE tenant_id = $1 ORDER BY created_at DESC",
      [tenantId],
    )

    // Get usage stats
    const currentMonth = new Date().toISOString().slice(0, 7) + "-01"
    const usageResult = await db.query(
      `SELECT 
         COALESCE(SUM(queries_count), 0) as queries_this_month,
         COUNT(DISTINCT site_id) as sites_count
       FROM usage 
       WHERE tenant_id = $1 AND date >= $2`,
      [tenantId, currentMonth],
    )

    // Get plan limits
    const planResult = await db.query("SELECT monthly_queries, features FROM plans WHERE name = $1", [tenant.plan_name])

    const planLimits = planResult.rows[0]
    const features = planLimits?.features || {}

    const dashboardData = {
      sites: sitesResult.rows,
      usage: {
        queries_this_month: Number.parseInt(usageResult.rows[0]?.queries_this_month || "0"),
        queries_limit: planLimits?.monthly_queries || 0,
        sites_count: Number.parseInt(usageResult.rows[0]?.sites_count || "0"),
        sites_limit: features.sites || 1,
      },
      tenant: {
        name: tenant.name,
        plan_name: tenant.plan_name,
      },
    }

    return NextResponse.json({
      status: "ok",
      data: dashboardData,
    })
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withAuth(handler)
