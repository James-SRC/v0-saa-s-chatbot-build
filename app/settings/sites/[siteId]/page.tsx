"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getAuthFromLocalStorage } from "@/lib/middleware"
import { Bot, ArrowLeft, Code, RefreshCw, Trash2, Copy, ExternalLink, Settings } from "lucide-react"
import Link from "next/link"

interface Site {
  id: string
  domain: string
  title: string
  status: string
  created_at: string
  widget_token?: string
}

export default function SiteSettingsPage() {
  return (
    <AuthGuard>
      <SiteSettingsContent />
    </AuthGuard>
  )
}

function SiteSettingsContent() {
  const params = useParams()
  const router = useRouter()
  const siteId = params.siteId as string

  const [site, setSite] = useState<Site | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [widgetToken, setWidgetToken] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    fetchSiteData()
  }, [siteId])

  const fetchSiteData = async () => {
    try {
      const token = getAuthFromLocalStorage()
      const response = await fetch(`/api/site/${siteId}/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setSite(result.data)
      } else {
        setError("Failed to load site data")
      }
    } catch (error) {
      setError("Network error")
    } finally {
      setIsLoading(false)
    }
  }

  const generateWidgetToken = async () => {
    try {
      const token = getAuthFromLocalStorage()
      const response = await fetch(`/api/site/${siteId}/widget-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setWidgetToken(result.data.token)
      } else {
        setError("Failed to generate widget token")
      }
    } catch (error) {
      setError("Network error")
    }
  }

  const deleteSite = async () => {
    try {
      const token = getAuthFromLocalStorage()
      const response = await fetch(`/api/site/${siteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        setError("Failed to delete site")
      }
    } catch (error) {
      setError("Network error")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getWidgetSnippet = () => {
    if (!widgetToken) return ""

    return `<div id="chatbot-widget"></div>
<script>
  (function(){
    var iframe = document.createElement('iframe');
    iframe.src = '${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/widget/${siteId}?token=${widgetToken}';
    iframe.style.border = 'none';
    iframe.style.width = '360px';
    iframe.style.height = '520px';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.zIndex = '9999';
    iframe.loading = 'lazy';
    document.getElementById('chatbot-widget').appendChild(iframe);
  })();
</script>`
  }

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  if (!site) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Site not found</div>
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

      <div className="container py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{site.title || site.domain}</h1>
          <div className="flex items-center gap-4">
            <Badge className={site.status === "ready" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
              {site.status === "ready" ? "Ready" : "Processing"}
            </Badge>
            <span className="text-muted-foreground">{site.domain}</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {/* Widget Installation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Widget Installation
              </CardTitle>
              <CardDescription>Install your chatbot widget on your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!widgetToken ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Generate a widget token to get your installation code</p>
                  <Button onClick={generateWidgetToken}>Generate Widget Token</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Installation Code:</label>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{getWidgetSnippet()}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-transparent"
                        onClick={() => copyToClipboard(getWidgetSnippet())}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/widget/${siteId}?token=${widgetToken}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Preview Widget
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={generateWidgetToken}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate Token
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Site Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Site Actions
              </CardTitle>
              <CardDescription>Manage your site settings and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Re-ingest Content
                </Button>

                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Site
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Site</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this site? This action cannot be undone. All associated data and
                        widget installations will stop working.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={deleteSite}>
                        Delete Site
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Site Information */}
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Domain</dt>
                  <dd className="text-sm">{site.domain}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                  <dd className="text-sm">{site.status}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                  <dd className="text-sm">{new Date(site.created_at).toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Site ID</dt>
                  <dd className="text-sm font-mono">{site.id}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
