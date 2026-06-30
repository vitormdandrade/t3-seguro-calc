-- Unified Lead Gen Migration
-- Shared table for Calcula Seguro and Oraculo do MEI
-- Run this in your Supabase SQL Editor

-- Drop old tables if they exist (data will be lost if not migrated)
DROP TABLE IF EXISTS public.leads CASCADE;

CREATE TABLE public.leads (
  id BIGSERIAL PRIMARY KEY,
  site TEXT NOT NULL CHECK (site IN ('calcula-seguro', 'oraculo-do-mei')),
  lead_type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_site ON public.leads (site);
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON public.leads (lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_data ON public.leads USING GIN (data);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon and authenticated (public lead submission)
CREATE POLICY "allow_public_inserts" ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reads only to service_role (admin dashboard via API)
CREATE POLICY "allow_service_role_select" ON public.leads
  FOR SELECT
  TO service_role
  USING (true);

-- Allow updates only to service_role
CREATE POLICY "allow_service_role_update" ON public.leads
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow deletes only to service_role
CREATE POLICY "allow_service_role_delete" ON public.leads
  FOR DELETE
  TO service_role
  USING (true);
