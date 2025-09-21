import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Shield,
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
  Sparkles,
  Cpu,
  Rocket,
  Target,
  CheckCircle,
  Star,
  Play,
  Bell,
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b glass-effect">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bot className="h-8 w-8 text-primary glow-effect" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-bold gradient-text">NeuralChat AI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Features
            </Link>
            <Link
              href="#solutions"
              className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Pricing
            </Link>
            <Link
              href="#enterprise"
              className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Enterprise
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto text-center relative z-10">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Next-Generation AI Customer Support
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
            Transform Your Business with
            <span className="gradient-text block mt-2"> Intelligent AI Chatbots</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto text-pretty leading-relaxed">
            Deploy enterprise-grade AI chatbots that understand your content, learn from interactions, and provide
            instant, accurate responses to your customers 24/7. Built for scale, designed for success.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="text-lg px-10 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 bg-transparent"
            >
              <Play className="mr-3 h-6 w-6" />
              Watch Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-sm text-muted-foreground max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              14-day free trial
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Setup in under 5 minutes
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10M+</div>
              <div className="text-sm text-muted-foreground">Conversations Handled</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Businesses</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                Customer Rating
                <Star className="h-4 w-4 fill-accent text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Cpu className="h-4 w-4 mr-2" />
              Advanced AI Technology
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Everything you need to succeed</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to help you create, deploy, and manage intelligent chatbots that deliver
              exceptional customer experiences at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Enhanced Core Features */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Lightning-Fast Responses</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  AI-powered chatbots provide instant, contextually accurate answers based on your website content,
                  documentation, and knowledge base with sub-second response times.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Enterprise Security</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Bank-grade encryption, SOC 2 compliance, GDPR ready, and advanced data privacy controls. Your data
                  stays secure with end-to-end encryption and audit trails.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">One-Click Integration</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Deploy anywhere with a simple code snippet. Works seamlessly with WordPress, Shopify, React, and any
                  website. No technical expertise required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Advanced AI Learning</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Continuously learns from interactions, improves responses over time, and adapts to your business
                  context with state-of-the-art machine learning algorithms.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Real-Time Analytics</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Comprehensive dashboards with conversation insights, user behavior analytics, performance metrics, and
                  actionable business intelligence.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Personalization</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Delivers personalized experiences based on user behavior, preferences, and interaction history.
                  Increases engagement and conversion rates significantly.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
              <Sparkles className="h-4 w-4 mr-2" />
              Coming Soon
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Future of AI Customer Support</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're constantly innovating to bring you cutting-edge features that will revolutionize how you interact
              with your customers and manage your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {feature.icon({ className: "h-5 w-5 text-primary" })}
                    </div>
                    <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                      {feature.tier}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 bg-transparent"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notify me
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse delay-700" />
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse delay-1000" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to revolutionize your customer support?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join over 50,000 businesses using NeuralChat AI to provide exceptional customer experiences, increase
            satisfaction rates, and drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Your Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-16 px-4 border-t bg-card">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Bot className="h-8 w-8 text-primary glow-effect" />
                <span className="text-2xl font-bold gradient-text">NeuralChat AI</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The most advanced AI chatbot platform for modern businesses. Transform your customer support with
                intelligent automation.
              </p>
              <div className="flex space-x-4">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-primary font-bold">f</span>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-primary font-bold">t</span>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-primary font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Product</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Press Kit
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Status Page
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div>© 2024 NeuralChat AI. All rights reserved.</div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">Built with ❤️ for the future of customer support</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
