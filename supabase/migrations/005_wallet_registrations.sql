-- Apple Wallet device registrations for push updates
CREATE TABLE IF NOT EXISTS public.wallet_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_library_id TEXT NOT NULL,
  push_token TEXT NOT NULL,
  pass_type_id TEXT NOT NULL DEFAULT 'pass.com.opexfood.loyalty',
  serial_number TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Unique constraint: one device per pass
CREATE UNIQUE INDEX IF NOT EXISTS idx_wallet_reg_unique
  ON public.wallet_registrations(device_library_id, pass_type_id, serial_number);

-- Fast lookup by serial number (for push notifications)
CREATE INDEX IF NOT EXISTS idx_wallet_reg_serial
  ON public.wallet_registrations(serial_number);

-- RLS: allow service role only (all calls come from server)
ALTER TABLE public.wallet_registrations ENABLE ROW LEVEL SECURITY;
