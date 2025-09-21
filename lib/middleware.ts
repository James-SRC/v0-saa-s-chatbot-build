import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "./auth"

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string
    tenantId: string
    email: string
  }
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const authHeader = req.headers.get("authorization")
      const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null

      if (!token) {
        return NextResponse.json({ status: "error", error: "Authentication required" }, { status: 401 })
      }

      const payload = verifyJWT(token)
      ;(req as AuthenticatedRequest).user = {
        userId: payload.userId,
        tenantId: payload.tenantId,
        email: payload.email,
      }

      return handler(req as AuthenticatedRequest)
    } catch (error) {
      return NextResponse.json({ status: "error", error: "Invalid or expired token" }, { status: 401 })
    }
  }
}

export function getAuthFromLocalStorage(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

export function removeAuthFromLocalStorage(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("auth_token")
}
