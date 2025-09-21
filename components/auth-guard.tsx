"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuthFromLocalStorage } from "@/lib/middleware"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = "/auth/signin" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getAuthFromLocalStorage()

    if (!token) {
      router.push(redirectTo)
      return
    }

    // Verify token with server
    fetch("/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem("auth_token")
          router.push(redirectTo)
        }
      })
      .catch(() => {
        localStorage.removeItem("auth_token")
        router.push(redirectTo)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
