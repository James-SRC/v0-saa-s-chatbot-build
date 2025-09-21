import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
      return NextResponse.json({ status: "error", error: "Authentication required" }, { status: 401 })
    }

    // Verify widget JWT token
    let payload: any
    try {
      payload = verifyJWT(token)
    } catch (error) {
      return NextResponse.json({ status: "error", error: "Invalid or expired token" }, { status: 401 })
    }

    const { siteId, question, sessionId } = await request.json()

    if (!siteId || !question) {
      return NextResponse.json({ status: "error", error: "Site ID and question are required" }, { status: 400 })
    }

    // Verify token scope matches requested site
    if (payload.siteId !== siteId || payload.type !== "widget") {
      return NextResponse.json({ status: "error", error: "Invalid token scope" }, { status: 403 })
    }

    // Verify site exists and is ready
    const siteResult = await db.query("SELECT id, status FROM sites WHERE id = $1", [siteId])

    if (siteResult.rows.length === 0) {
      return NextResponse.json({ status: "error", error: "Site not found" }, { status: 404 })
    }

    const site = siteResult.rows[0]
    if (site.status !== "ready") {
      return NextResponse.json(
        { status: "error", error: "Site is not ready. Please try again later." },
        { status: 503 },
      )
    }

    // TODO: Implement actual RAG query logic
    // 1. Generate embedding for the question
    // 2. Search vectors table for similar content
    // 3. Use retrieved content as context for LLM
    // 4. Generate response using OpenAI/other LLM

    // For now, return a placeholder response
    const placeholderResponse = `Thank you for your question: "${question}". This is a placeholder response. In a full implementation, I would search through your website content and provide a relevant answer based on the information available.`

    // Track usage
    const today = new Date().toISOString().split("T")[0]
    await db.query(
      `INSERT INTO usage (tenant_id, site_id, date, queries_count, tokens_used) 
       VALUES ($1, $2, $3, 1, 100) 
       ON CONFLICT (tenant_id, site_id, date) 
       DO UPDATE SET queries_count = usage.queries_count + 1, tokens_used = usage.tokens_used + 100`,
      [payload.tenantId, siteId, today],
    )

    return NextResponse.json({
      status: "ok",
      data: {
        answer: placeholderResponse,
        sessionId: sessionId || `session_${Date.now()}`,
        sources: [],
      },
    })
  } catch (error) {
    console.error("Query error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}
