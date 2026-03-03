-- ============================================
-- LOYALTY SYSTEM TABLES
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. loyalty_configs: one per restaurant
CREATE TABLE loyalty_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  points_per_euro INTEGER NOT NULL DEFAULT 10,
  reward_threshold INTEGER NOT NULL DEFAULT 500,
  reward_description TEXT NOT NULL DEFAULT '1 Bowl offert',
  welcome_points INTEGER NOT NULL DEFAULT 50,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,

  CONSTRAINT loyalty_configs_restaurant_id_unique UNIQUE (restaurant_id),
  CONSTRAINT loyalty_configs_points_per_euro_check CHECK (points_per_euro >= 1),
  CONSTRAINT loyalty_configs_reward_threshold_check CHECK (reward_threshold >= 10),
  CONSTRAINT loyalty_configs_welcome_points_check CHECK (welcome_points >= 0)
);

CREATE INDEX idx_loyalty_configs_slug ON loyalty_configs(slug);
CREATE INDEX idx_loyalty_configs_restaurant_id ON loyalty_configs(restaurant_id);

-- 2. loyalty_clients: customers enrolled in a restaurant's program
CREATE TABLE loyalty_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  total_visits INTEGER NOT NULL DEFAULT 0,
  total_spent NUMERIC(10,2) NOT NULL DEFAULT 0,
  barcode TEXT NOT NULL UNIQUE,
  pass_type TEXT CHECK (pass_type IN ('apple', 'google', 'pwa')),
  last_visit_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,

  CONSTRAINT loyalty_clients_restaurant_phone_unique UNIQUE (restaurant_id, phone)
);

CREATE INDEX idx_loyalty_clients_restaurant_id ON loyalty_clients(restaurant_id);
CREATE INDEX idx_loyalty_clients_barcode ON loyalty_clients(barcode);
CREATE INDEX idx_loyalty_clients_phone ON loyalty_clients(phone);

-- 3. loyalty_transactions: points history
CREATE TABLE loyalty_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES loyalty_clients(id) ON DELETE CASCADE,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('earn', 'redeem', 'adjust', 'welcome')),
  points INTEGER NOT NULL,
  amount NUMERIC(10,2),
  description TEXT,
  staff_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_loyalty_transactions_client_id ON loyalty_transactions(client_id);
CREATE INDEX idx_loyalty_transactions_restaurant_id ON loyalty_transactions(restaurant_id);
CREATE INDEX idx_loyalty_transactions_created_at ON loyalty_transactions(created_at DESC);

-- ============================================
-- RPC: Atomic point credit
-- ============================================

CREATE OR REPLACE FUNCTION credit_loyalty_points(
  p_client_id UUID,
  p_points INTEGER,
  p_amount NUMERIC
)
RETURNS SETOF loyalty_clients AS $$
  UPDATE loyalty_clients
  SET
    points = points + p_points,
    total_visits = total_visits + 1,
    total_spent = total_spent + p_amount,
    last_visit_at = now(),
    updated_at = now()
  WHERE id = p_client_id
  RETURNING *;
$$ LANGUAGE sql;

-- ============================================
-- AUTO updated_at TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER loyalty_configs_updated_at
  BEFORE UPDATE ON loyalty_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER loyalty_clients_updated_at
  BEFORE UPDATE ON loyalty_clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE loyalty_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- loyalty_configs: staff can manage their own restaurant's config
CREATE POLICY "Staff can read own loyalty config"
  ON loyalty_configs FOR SELECT TO authenticated
  USING (restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid()));

CREATE POLICY "Staff can update own loyalty config"
  ON loyalty_configs FOR UPDATE TO authenticated
  USING (restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid()));

CREATE POLICY "Staff can insert own loyalty config"
  ON loyalty_configs FOR INSERT TO authenticated
  WITH CHECK (restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid()));

-- Public can read active configs (inscription page)
CREATE POLICY "Public can read active configs"
  ON loyalty_configs FOR SELECT TO anon
  USING (is_active = true);

-- loyalty_clients: staff can manage their restaurant's clients
CREATE POLICY "Staff can read own restaurant clients"
  ON loyalty_clients FOR SELECT TO authenticated
  USING (restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid()));

CREATE POLICY "Staff can update own restaurant clients"
  ON loyalty_clients FOR UPDATE TO authenticated
  USING (restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid()));

-- Public can read clients by barcode (pass page)
CREATE POLICY "Public can read clients"
  ON loyalty_clients FOR SELECT TO anon
  USING (true);

-- loyalty_transactions: staff can read and insert for their restaurant
CREATE POLICY "Staff can read own restaurant transactions"
  ON loyalty_transactions FOR SELECT TO authenticated
  USING (restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid()));

CREATE POLICY "Staff can insert transactions"
  ON loyalty_transactions FOR INSERT TO authenticated
  WITH CHECK (restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid()));

-- Public can read transactions (pass page shows history)
CREATE POLICY "Public can read transactions"
  ON loyalty_transactions FOR SELECT TO anon
  USING (true);
