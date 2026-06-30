-- Create the leads table for Calcula Seguro lead generation
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  insurance_type TEXT NOT NULL,
  coverage_amount TEXT,
  state TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_insurance_type ON leads(insurance_type);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from authenticated and anonymous users (public leads submission)
CREATE POLICY "Allow public inserts" ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reads only to authenticated users (admin dashboard)
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow updates only to authenticated users
CREATE POLICY "Allow authenticated updates" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
