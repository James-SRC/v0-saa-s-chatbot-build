import { NextResponse } from "next/server"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"

async function handler(req: AuthenticatedRequest) {
  return NextResponse.json({
    status: "ok",
    data: {
      user: req.user,
    },
  })
}

export const GET = withAuth(handler)
export const POST = withAuth(handler)
