-- Add settings columns to restaurants table
ALTER TABLE public.restaurants
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS primary_color text DEFAULT '#ea580c',
  ADD COLUMN IF NOT EXISTS secondary_color text DEFAULT '#171717',
  ADD COLUMN IF NOT EXISTS logo_url text;
