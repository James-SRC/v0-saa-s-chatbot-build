"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  BarChart3,
  FileText,
  Calendar,
  Share2,
  Languages,
  Palette,
  Users,
  Key,
  HeadphonesIcon,
  Brain,
  Shield,
  Building,
} from "lucide-react"

const comingSoonFeatures = [
  {
    title: "Auto Sync",
    description: "Keep your site knowledge fresh — automatically crawl and re-ingest site updates.",
    icon: BarChart3,
    tier: "Coming soon",
  },
  {
    title: "PDF & Doc Connectors",
    description: "Import documents from Google Drive, Dropbox or upload PDFs & DOCX.",
    icon: FileText,
    tier: "Coming soon",
  },
  {
    title: "Scheduled Posts",
    description: "Automatically publish answers and summaries to your website.",
    icon: Calendar,
    tier: "Coming soon",
  },
  {
    title: "Social Auto-Share",
    description: "Push intelligent posts to LinkedIn, X and Facebook.",
    icon: Share2,
    tier: "Coming soon",
  },
  {
    title: "Analytics Dashboard",
    description: "See top questions, trends, and bot performance at a glance.",
    icon: BarChart3,
    tier: "Coming soon",
  },
  {
    title: "Multi-Language Support",
    description: "Respond naturally in your customers' language.",
    icon: Languages,
    tier: "Coming soon",
  },
  {
    title: "Custom Personas",
    description: "Create brand-specific reply styles and tones.",
    icon: Palette,
    tier: "Coming soon",
  },
  {
    title: "Team Workspaces",
    description: "Invite teammates, set roles and collaborate.",
    icon: Users,
    tier: "Coming soon",
  },
  {
    title: "White-Labeling",
    description: "Brand the chat widget with your logo, colors, and domain.",
    icon: Palette,
    tier: "Coming soon",
  },
  {
    title: "API Access & Developer Keys",
    description: "Programmatically query your site knowledge from your apps.",
    icon: Key,
    tier: "Coming soon",
  },
  {
    title: "Human Escalation",
    description: "Route complex queries to a human inbox or ticket system.",
    icon: HeadphonesIcon,
    tier: "Coming soon",
  },
  {
    title: "Conversational Memory",
    description: "Maintain context across a session for smoother dialogs.",
    icon: Brain,
    tier: "Coming soon",
  },
  {
    title: "Verification / Confidence Scores",
    description: "Show confidence and source citations for each answer.",
    icon: Shield,
    tier: "Coming soon",
  },
  {
    title: "Enterprise SSO & SAML",
    description: "Single sign-on for enterprise customers and advanced audits.",
    icon: Building,
    tier: "Enterprise",
  },
]

export default function FeaturesPage() {
  return (
    <AuthGuard>
      <FeaturesContent />
    </AuthGuard>
  )
}

function FeaturesContent() {
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Upcoming Features</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're constantly building new capabilities to make your chatbots even more intelligent and useful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {feature.tier}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Notify me
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Have a feature request?</p>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
