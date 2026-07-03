-- ═══════════════════════════════════════════════════════════════════
-- UTM Tracking + Google Ads Conversion Migration
-- Run this in your Supabase SQL Editor
-- Adds UTM tracking columns to the existing unified leads table
-- ═══════════════════════════════════════════════════════════════════

-- Add UTM columns to existing leads table (if they don't exist)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- Add indexes for UTM queries (useful for campaign reporting)
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON public.leads (utm_source) WHERE utm_source IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON public.leads (utm_campaign) WHERE utm_campaign IS NOT NULL;

-- Optional: add a gclid column for Google Ads Click ID (auto-tagged by Google)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS gclid TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_gclid ON public.leads (gclid) WHERE gclid IS NOT NULL;

-- Optional: conversion_tracked flag to know if Google Ads conversion pixel fired
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS conversion_tracked BOOLEAN DEFAULT false;
