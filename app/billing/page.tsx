"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAuthFromLocalStorage } from "@/lib/middleware"
import { Bot, Check, CreditCard, ArrowLeft, Zap, Users, Globe } from "lucide-react"
import Link from "next/link"

interface Plan {
  id: string
  name: string
  monthly_queries: number
  price_cents: number
  features: {
    sites: number
    storage_mb: number
    custom_branding?: boolean
    sso?: boolean
    priority_support?: boolean
  }
}

interface BillingData {
  current_plan: Plan
  available_plans: Plan[]
  usage: {
    queries_this_month: number
    queries_limit: number
  }
}

export default function BillingPage() {
  return (
    <AuthGuard>
      <BillingContent />
    </AuthGuard>
  )
}

function BillingContent() {
  const [data, setData] = useState<BillingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState<string | null>(null)

  useEffect(() => {
    fetchBillingData()
  }, [])

  const fetchBillingData = async () => {
    try {
      const token = getAuthFromLocalStorage()
      const response = await fetch("/api/billing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setData(result.data)
      }
    } catch (error) {
      console.error("Error fetching billing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgrade = async (planId: string) => {
    setProcessingPlan(planId)

    try {
      const token = getAuthFromLocalStorage()
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId,
          successUrl: `${window.location.origin}/billing?success=true`,
          cancelUrl: `${window.location.origin}/billing?canceled=true`,
        }),
      })

      const result = await response.json()

      if (result.status === "ok") {
        // Redirect to Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/${result.data.sessionId}`
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setProcessingPlan(null)
    }
  }

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(0)}`
  }

  const formatQueries = (queries: number) => {
    return queries === -1 ? "Unlimited" : queries.toLocaleString()
  }

  const formatStorage = (mb: number) => {
    return mb === -1 ? "Unlimited" : `${mb}MB`
  }

  const formatSites = (sites: number) => {
    return sites === -1 ? "Unlimited" : sites.toString()
  }

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ChatBot AI</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Billing & Plans</h1>
            <p className="text-muted-foreground">Choose the plan that's right for your business</p>
          </div>

          {/* Current Plan */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{data?.current_plan.name} Plan</h3>
                  <p className="text-muted-foreground">
                    {formatQueries(data?.current_plan.monthly_queries || 0)} queries per month
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {formatPrice(data?.current_plan.price_cents || 0)}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {data?.usage.queries_this_month || 0} / {formatQueries(data?.usage.queries_limit || 0)} used
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {data?.available_plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.name === "Pro" ? "border-primary shadow-lg" : ""}`}>
                {plan.name === "Pro" && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    {plan.name === "Free" && <Zap className="h-5 w-5" />}
                    {plan.name === "Pro" && <Users className="h-5 w-5" />}
                    {plan.name === "Enterprise" && <Globe className="h-5 w-5" />}
                    {plan.name}
                  </CardTitle>
                  <div className="text-3xl font-bold">
                    {formatPrice(plan.price_cents)}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>{formatQueries(plan.monthly_queries)} queries per month</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      {formatSites(plan.features.sites)} sites
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      {formatStorage(plan.features.storage_mb)} storage
                    </li>
                    {plan.features.custom_branding && (
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Custom branding
                      </li>
                    )}
                    {plan.features.sso && (
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        SSO & SAML
                      </li>
                    )}
                    {plan.features.priority_support && (
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Priority support
                      </li>
                    )}
                  </ul>

                  {plan.id === data?.current_plan.id ? (
                    <Button className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.name === "Pro" ? "default" : "outline"}
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={processingPlan === plan.id}
                    >
                      {processingPlan === plan.id ? "Processing..." : plan.price_cents === 0 ? "Downgrade" : "Upgrade"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>All plans include 24/7 support and a 14-day money-back guarantee.</p>
            <p>
              Need a custom plan?{" "}
              <Link href="#" className="text-primary hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
