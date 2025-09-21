import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { db } from "@/lib/db"

async function handler(req: AuthenticatedRequest) {
  if (req.method === "POST") {
    try {
      const { tenantId } = req.user!
      const { domain, title, description } = await req.json()

      if (!domain) {
        return NextResponse.json({ status: "error", error: "Domain is required" }, { status: 400 })
      }

      // Check if site already exists for this tenant
      const existingResult = await db.query("SELECT id FROM sites WHERE tenant_id = $1 AND domain = $2", [
        tenantId,
        domain,
      ])

      if (existingResult.rows.length > 0) {
        return NextResponse.json({ status: "error", error: "Site already exists" }, { status: 409 })
      }

      // Create new site
      const result = await db.query(
        "INSERT INTO sites (tenant_id, domain, title, status) VALUES ($1, $2, $3, $4) RETURNING id",
        [tenantId, domain, title || domain, "pending"],
      )

      const siteId = result.rows[0].id

      return NextResponse.json({
        status: "ok",
        data: {
          siteId,
          message: "Site created successfully",
        },
      })
    } catch (error) {
      console.error("Create site error:", error)
      return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
    }
  }

  return NextResponse.json({ status: "error", error: "Method not allowed" }, { status: 405 })
}

export const POST = withAuth(handler)
