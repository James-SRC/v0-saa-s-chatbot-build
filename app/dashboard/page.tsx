"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getAuthFromLocalStorage, removeAuthFromLocalStorage } from "@/lib/middleware"
import {
  Bot,
  Plus,
  Settings,
  CreditCard,
  BarChart3,
  Globe,
  Users,
  MessageSquare,
  TrendingUp,
  LogOut,
  ExternalLink,
  Sparkles,
  Zap,
  Target,
  Activity,
  Clock,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Site {
  id: string
  domain: string
  title: string
  status: "pending" | "ingesting" | "ready" | "error"
  created_at: string
}

interface DashboardData {
  sites: Site[]
  usage: {
    queries_this_month: number
    queries_limit: number
    sites_count: number
    sites_limit: number
  }
  tenant: {
    name: string
    plan_name: string
  }
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}

function DashboardContent() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = getAuthFromLocalStorage()
      const response = await fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setData(result.data)
      } else {
        console.error("Failed to fetch dashboard data")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    removeAuthFromLocalStorage()
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "ingesting":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Ready"
      case "ingesting":
        return "Processing"
      case "error":
        return "Error"
      default:
        return "Pending"
    }
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b glass-effect">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="h-8 w-8 text-primary glow-effect" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold gradient-text">NeuralChat AI</span>
            </Link>
            <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
              {data?.tenant.name} • {data?.tenant.plan_name} Plan
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/billing">
              <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 bg-transparent">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold gradient-text">Welcome back!</h1>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground">
            Monitor your AI chatbots, track performance, and manage your customer support automation.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Globe className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{data?.usage.sites_count || 0}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                of {data?.usage.sites_limit === -1 ? "unlimited" : data?.usage.sites_limit} sites
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Queries This Month</CardTitle>
              <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{data?.usage.queries_this_month || 0}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Activity className="h-3 w-3" />
                of {data?.usage.queries_limit === -1 ? "unlimited" : data?.usage.queries_limit} queries
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
              <div className="h-8 w-8 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-chart-3" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-3">24</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <div className="h-8 w-8 bg-chart-4/10 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-chart-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-4">98.5%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sites Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Your AI Chatbots
                  <Bot className="h-6 w-6 text-primary" />
                </h2>
                <p className="text-muted-foreground">Manage and monitor your deployed chatbots</p>
              </div>
              <Link href="/onboard/site">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Site
                </Button>
              </Link>
            </div>

            {data?.sites.length === 0 ? (
              <Card className="p-12 text-center border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">No chatbots deployed yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Get started by adding your first website to create an intelligent AI chatbot that understands your
                  content.
                </p>
                <Link href="/onboard/site">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Deploy Your First Chatbot
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {data?.sites.map((site) => (
                  <Card
                    key={site.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/50"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Globe className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {site.title || site.domain}
                              {site.status === "ready" && <CheckCircle className="h-4 w-4 text-primary" />}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              {site.domain}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${getStatusColor(site.status)} border-0`}>
                            {getStatusText(site.status)}
                          </Badge>
                          <Link href={`/settings/sites/${site.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary/30 hover:bg-primary/10 bg-transparent"
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Created {new Date(site.created_at).toLocaleDateString()}
                        </span>
                        {site.status === "ready" && (
                          <Link
                            href={`/widget/${site.id}`}
                            target="_blank"
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <Zap className="h-3 w-3" />
                            View Live Widget
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/onboard/site" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Deploy New Chatbot
                  </Button>
                </Link>
                <Link href="/billing" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 bg-transparent"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Billing
                  </Button>
                </Link>
                <Link href="/admin/features" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 bg-transparent"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View All Features
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Usage Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Monthly Queries</span>
                      <span className="text-accent font-semibold">
                        {data?.usage.queries_this_month}/
                        {data?.usage.queries_limit === -1 ? "∞" : data?.usage.queries_limit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                        style={{
                          width:
                            data?.usage.queries_limit === -1
                              ? "10%"
                              : `${Math.min(((data?.usage.queries_this_month || 0) / (data?.usage.queries_limit || 1)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Active Sites</span>
                      <span className="text-primary font-semibold">
                        {data?.usage.sites_count}/{data?.usage.sites_limit === -1 ? "∞" : data?.usage.sites_limit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                        style={{
                          width:
                            data?.usage.sites_limit === -1
                              ? "10%"
                              : `${Math.min(((data?.usage.sites_count || 0) / (data?.usage.sites_limit || 1)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Response Time</span>
                    <span className="text-sm font-semibold text-primary">0.8s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="text-sm font-semibold text-accent">4.9/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Resolution Rate</span>
                    <span className="text-sm font-semibold text-chart-3">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b glass-effect">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Bot className="h-8 w-8 text-primary glow-effect" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
