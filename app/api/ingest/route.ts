import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { db } from "@/lib/db"

async function handler(req: AuthenticatedRequest) {
  try {
    const { tenantId } = req.user!
    const formData = await req.formData()

    const siteId = formData.get("siteId") as string
    const urlsJson = formData.get("urls") as string

    if (!siteId) {
      return NextResponse.json({ status: "error", error: "Site ID is required" }, { status: 400 })
    }

    // Verify site belongs to tenant
    const siteResult = await db.query("SELECT id FROM sites WHERE id = $1 AND tenant_id = $2", [siteId, tenantId])

    if (siteResult.rows.length === 0) {
      return NextResponse.json({ status: "error", error: "Site not found" }, { status: 404 })
    }

    // Parse URLs
    const urls = urlsJson ? JSON.parse(urlsJson) : []

    // Get uploaded files
    const files: File[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        files.push(value)
      }
    }

    if (urls.length === 0 && files.length === 0) {
      return NextResponse.json({ status: "error", error: "At least one URL or file is required" }, { status: 400 })
    }

    // Create ingestion job
    const jobPayload = {
      urls: urls.filter((url: string) => url.trim()),
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    }

    const jobResult = await db.query(
      "INSERT INTO ingestion_jobs (site_id, payload, status) VALUES ($1, $2, $3) RETURNING id",
      [siteId, JSON.stringify(jobPayload), "queued"],
    )

    const jobId = jobResult.rows[0].id

    // Update site status
    await db.query("UPDATE sites SET status = $1 WHERE id = $2", ["ingesting", siteId])

    // In a real implementation, you would:
    // 1. Store files in cloud storage (S3, etc.)
    // 2. Queue the job for background processing
    // 3. Process URLs and files to extract text
    // 4. Generate embeddings and store in vectors table
    // 5. Update site status to 'ready' when complete

    // For now, simulate processing by updating status after a delay
    setTimeout(async () => {
      try {
        await db.query("UPDATE sites SET status = $1, ingest_last_run = NOW() WHERE id = $2", ["ready", siteId])
        await db.query("UPDATE ingestion_jobs SET status = $1, updated_at = NOW() WHERE id = $2", ["completed", jobId])
      } catch (error) {
        console.error("Error updating job status:", error)
      }
    }, 5000) // 5 second delay for demo

    return NextResponse.json({
      status: "ok",
      data: {
        jobId,
        message: "Ingestion job started successfully",
      },
    })
  } catch (error) {
    console.error("Ingest error:", error)
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 })
  }
}

export const POST = withAuth(handler)
