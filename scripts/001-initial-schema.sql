-- SaaS Chatbot Database Schema
-- Initial migration to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Plans table
CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  monthly_queries integer DEFAULT 0,
  features jsonb DEFAULT '{}',
  price_cents integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Insert default plans
INSERT INTO plans (name, monthly_queries, price_cents, features) VALUES
('Free', 100, 0, '{"sites": 1, "storage_mb": 10}'),
('Pro', 1000, 2900, '{"sites": 5, "storage_mb": 100, "custom_branding": true}'),
('Enterprise', -1, 9900, '{"sites": -1, "storage_mb": -1, "custom_branding": true, "sso": true, "priority_support": true}');

-- Tenants table
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  plan_id uuid REFERENCES plans(id),
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sites table
CREATE TABLE sites (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  domain text,
  title text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'ingesting', 'ready', 'error')),
  ingest_last_run timestamptz,
  widget_token_hash text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vectors table for embeddings
CREATE TABLE vectors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  url text,
  title text,
  content text,
  metadata jsonb DEFAULT '{}',
  embedding vector(1536),
  created_at timestamptz DEFAULT now()
);

-- API keys table
CREATE TABLE api_keys (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  key_hash text NOT NULL,
  name text,
  scopes text[] DEFAULT '{}',
  expires_at timestamptz,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Usage tracking table
CREATE TABLE usage (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  date date NOT NULL,
  queries_count integer DEFAULT 0,
  tokens_used bigint DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, site_id, date)
);

-- Invoices table
CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_id text UNIQUE,
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  amount_cents integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now()
);

-- Ingestion jobs table
CREATE TABLE ingestion_jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  payload jsonb NOT NULL,
  status text DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_tenants_owner ON tenants(owner_user_id);
CREATE INDEX idx_sites_tenant ON sites(tenant_id);
CREATE INDEX idx_vectors_site ON vectors(site_id);
CREATE INDEX idx_usage_tenant_date ON usage(tenant_id, date);
CREATE INDEX idx_api_keys_tenant ON api_keys(tenant_id);
CREATE INDEX idx_ingestion_jobs_site ON ingestion_jobs(site_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ingestion_jobs_updated_at BEFORE UPDATE ON ingestion_jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
