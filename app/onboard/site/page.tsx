"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { getAuthFromLocalStorage } from "@/lib/middleware"
import { Bot, Globe, Upload, CheckCircle, Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, title: "Add Website", description: "Enter your website URL" },
  { id: 2, title: "Upload Content", description: "Add documents or let us crawl your site" },
  { id: 3, title: "Configure", description: "Customize your chatbot settings" },
]

export default function OnboardSitePage() {
  return (
    <AuthGuard>
      <OnboardSiteContent />
    </AuthGuard>
  )
}

function OnboardSiteContent() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [siteId, setSiteId] = useState("")
  const router = useRouter()

  const [formData, setFormData] = useState({
    domain: "",
    title: "",
    description: "",
    urls: [""],
    files: [] as File[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...formData.urls]
    newUrls[index] = value
    setFormData((prev) => ({ ...prev, urls: newUrls }))
  }

  const addUrlField = () => {
    setFormData((prev) => ({ ...prev, urls: [...prev.urls, ""] }))
  }

  const removeUrlField = (index: number) => {
    const newUrls = formData.urls.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, urls: newUrls }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, files: Array.from(e.target.files || []) }))
    }
  }

  const handleStep1Submit = async () => {
    if (!formData.domain) {
      setError("Website URL is required")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const token = getAuthFromLocalStorage()
      const response = await fetch("/api/sites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          domain: formData.domain,
          title: formData.title,
          description: formData.description,
        }),
      })

      const data = await response.json()

      if (data.status === "ok") {
        setSiteId(data.data.siteId)
        setCurrentStep(2)
      } else {
        setError(data.error || "Failed to create site")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep2Submit = async () => {
    const validUrls = formData.urls.filter((url) => url.trim())

    if (validUrls.length === 0 && formData.files.length === 0) {
      setError("Please provide at least one URL or upload a file")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const token = getAuthFromLocalStorage()

      // Create FormData for file uploads
      const formDataToSend = new FormData()
      formDataToSend.append("siteId", siteId)
      formDataToSend.append("urls", JSON.stringify(validUrls))

      formData.files.forEach((file, index) => {
        formDataToSend.append(`file_${index}`, file)
      })

      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      const data = await response.json()

      if (data.status === "ok") {
        setCurrentStep(3)
      } else {
        setError(data.error || "Failed to start ingestion")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFinish = () => {
    router.push("/dashboard")
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

      <div className="container py-8 max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep > step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Add Your Website
              </CardTitle>
              <CardDescription>Enter your website details to get started with your AI chatbot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="domain">Website URL *</Label>
                <Input
                  id="domain"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.domain}
                  onChange={(e) => handleInputChange("domain", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Site Title</Label>
                <Input
                  id="title"
                  placeholder="My Awesome Website"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your website..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleStep1Submit} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Content
              </CardTitle>
              <CardDescription>
                Add specific pages to crawl or upload documents for your chatbot to learn from.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <Label>Specific URLs to Crawl</Label>
                {formData.urls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://example.com/page"
                      value={url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      disabled={isLoading}
                    />
                    {formData.urls.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeUrlField(index)} disabled={isLoading}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addUrlField} disabled={isLoading}>
                  Add Another URL
                </Button>
              </div>

              <div className="space-y-4">
                <Label htmlFor="files">Upload Documents</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                {formData.files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files:</Label>
                    {formData.files.map((file, index) => (
                      <Badge key={index} variant="secondary">
                        {file.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)} disabled={isLoading}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleStep2Submit} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Start Processing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Setup Complete!
              </CardTitle>
              <CardDescription>Your chatbot is being created. This process may take a few minutes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Bot className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your chatbot is being trained</h3>
                <p className="text-muted-foreground mb-6">
                  We're processing your content and training your AI chatbot. You'll receive an email when it's ready.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">Processing content...</Badge>
                  <div className="text-sm text-muted-foreground">
                    This usually takes 2-5 minutes depending on the amount of content.
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleFinish}>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
