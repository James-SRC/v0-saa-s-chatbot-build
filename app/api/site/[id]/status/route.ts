import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { db } from "@/lib/db"

async function handler(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  try {
    const { tenantId } = req.user!
    const siteId = params.id

    // Get site status
    const result = await db.query(
      "SELECT id, domain, title, status, ingest_last_run, created_at FROM sites WHERE id = $1 AND tenant_id = $2",
      [siteId, tenantId],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ status: "error", error: "Site not found" }, { status: 404 })
    }

    return NextResponse.json({
      status: "ok",
      data: result.rows[0],
    })
  } catch (error) {
    console.error("Site status error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withAuth(handler)
