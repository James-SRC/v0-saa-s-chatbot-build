import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { db } from "@/lib/db"

async function handler(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  if (req.method === "DELETE") {
    try {
      const { tenantId } = req.user!
      const siteId = params.id

      // Verify site belongs to tenant
      const siteResult = await db.query("SELECT id FROM sites WHERE id = $1 AND tenant_id = $2", [siteId, tenantId])

      if (siteResult.rows.length === 0) {
        return NextResponse.json({ status: "error", error: "Site not found" }, { status: 404 })
      }

      // Delete site (cascade will handle related records)
      await db.query("DELETE FROM sites WHERE id = $1", [siteId])

      return NextResponse.json({
        status: "ok",
        data: {
          message: "Site deleted successfully",
        },
      })
    } catch (error) {
      console.error("Delete site error:", error)
      return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
    }
  }

  return NextResponse.json({ status: "error", error: "Method not allowed" }, { status: 405 })
}

export const DELETE = withAuth(handler)
