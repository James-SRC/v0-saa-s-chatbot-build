import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { db } from "@/lib/db"
import { generateJWT } from "@/lib/auth"
import crypto from "crypto"

async function handler(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  try {
    const { tenantId } = req.user!
    const siteId = params.id

    // Verify site belongs to tenant
    const siteResult = await db.query("SELECT id FROM sites WHERE id = $1 AND tenant_id = $2", [siteId, tenantId])

    if (siteResult.rows.length === 0) {
      return NextResponse.json({ status: "error", error: "Site not found" }, { status: 404 })
    }

    // Generate widget JWT token (24 hour expiry)
    const widgetToken = generateJWT(
      {
        siteId,
        tenantId,
        type: "widget",
      },
      "24h",
    )

    // Store hash of token for revocation capability
    const tokenHash = crypto.createHash("sha256").update(widgetToken).digest("hex")

    await db.query("UPDATE sites SET widget_token_hash = $1 WHERE id = $2", [tokenHash, siteId])

    return NextResponse.json({
      status: "ok",
      data: {
        token: widgetToken,
        expiresIn: "24h",
      },
    })
  } catch (error) {
    console.error("Widget token error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}

export const POST = withAuth(handler)
