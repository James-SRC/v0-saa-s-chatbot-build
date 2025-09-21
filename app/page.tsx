import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  MessageSquare,
  BarChart3,
  Users,
  FileText,
  Calendar,
  Share2,
  Palette,
  Key,
  HeadphonesIcon,
  Brain,
  Languages,
  Building,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ChatBot AI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered Customer Support
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Transform Your Website with
            <span className="text-primary"> Intelligent Chatbots</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Create AI-powered chatbots that understand your content and provide instant, accurate responses to your
            customers 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            No credit card required • 14-day free trial • Setup in minutes
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you create, deploy, and manage intelligent chatbots effortlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Core Features */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Instant Responses</CardTitle>
                <CardDescription>
                  AI-powered chatbots provide immediate, accurate answers based on your website content.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Enterprise-grade security with data encryption and privacy compliance built-in.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Embed your chatbot anywhere with a simple code snippet. Works with any website.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">More powerful features coming soon</h2>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your customer support?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses using AI chatbots to provide better customer experiences.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">ChatBot AI</span>
              </div>
              <p className="text-sm text-muted-foreground">Intelligent chatbots for modern businesses.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ChatBot AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

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
