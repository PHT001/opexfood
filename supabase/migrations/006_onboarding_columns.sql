-- Add onboarding tracking columns to restaurants
ALTER TABLE public.restaurants
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0;

-- Existing restaurants are already configured
UPDATE restaurants SET onboarding_completed = true WHERE created_at < now();
