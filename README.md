# SaaS Chatbot Platform

A modern multi-tenant SaaS platform for creating AI-powered chatbots that can be embedded on websites.

## Features

- **Multi-tenant Architecture**: Secure tenant isolation with role-based access
- **AI-Powered Chatbots**: RAG-based chatbots trained on your website content
- **Embeddable Widgets**: Secure JWT-based widget authentication
- **Modern UI**: Built with Next.js, TypeScript, and shadcn/ui
- **Scalable Backend**: PostgreSQL with vector embeddings support

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, PostgreSQL, pgvector
- **Authentication**: JWT tokens, bcrypt
- **Payments**: Stripe integration
- **AI**: OpenAI API for embeddings and chat completion

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ with pgvector extension
- OpenAI API key
- Stripe account (for billing)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd saas-chatbot
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your actual values
\`\`\`

4. Set up the database:
\`\`\`bash
# Create your PostgreSQL database
# Run the initial migration
psql -d your_database_url -f scripts/001-initial-schema.sql
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

\`\`\`
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Admin dashboard
│   ├── onboard/           # Onboarding flow
│   └── widget/            # Embeddable widget
├── components/            # React components
├── lib/                   # Utility functions
├── scripts/               # Database migrations
└── types/                 # TypeScript type definitions
\`\`\`

## API Endpoints

- `POST /api/onboard` - Create new tenant and user
- `POST /api/ingest` - Start content ingestion job
- `POST /api/query` - Query chatbot (widget endpoint)
- `GET /api/site/[id]/status` - Get site ingestion status
- `POST /api/billing/checkout` - Create Stripe checkout session

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts
- `tenants` - Multi-tenant organizations
- `sites` - Websites/chatbots
- `vectors` - Embedded content for RAG
- `usage` - Usage tracking and billing
- `plans` - Subscription plans

## Deployment

### Environment Variables

Make sure to set all required environment variables in your production environment.

### Database Setup

1. Create a PostgreSQL database with pgvector extension
2. Run the migration scripts in order
3. Update your DATABASE_URL environment variable

### Vercel Deployment

This project is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
