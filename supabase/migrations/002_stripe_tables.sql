-- Stripe subscription tables for OpexFood SaaS

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id text,
  stripe_subscription_id text UNIQUE,
  status text DEFAULT 'inactive',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscription_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id text NOT NULL,
  stripe_item_id text UNIQUE,
  module_id text NOT NULL,
  stripe_price_id text,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id text,
  stripe_invoice_id text UNIQUE,
  amount_paid numeric DEFAULT 0,
  currency text DEFAULT 'eur',
  status text,
  invoice_url text,
  invoice_pdf text,
  period_start timestamptz,
  period_end timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Subscriptions: users can read their own restaurant's subscription
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (restaurant_id IN (
    SELECT id FROM restaurants WHERE user_id = auth.uid()
  ));

-- Subscription items: users can view items for their subscription
CREATE POLICY "Users can view own subscription items" ON subscription_items
  FOR SELECT USING (subscription_id IN (
    SELECT stripe_subscription_id FROM subscriptions WHERE restaurant_id IN (
      SELECT id FROM restaurants WHERE user_id = auth.uid()
    )
  ));

-- Invoices: users can view their own invoices
CREATE POLICY "Users can view own invoices" ON invoices
  FOR SELECT USING (subscription_id IN (
    SELECT stripe_subscription_id FROM subscriptions WHERE restaurant_id IN (
      SELECT id FROM restaurants WHERE user_id = auth.uid()
    )
  ));

-- Service role can do everything (for webhook writes)
CREATE POLICY "Service role full access subscriptions" ON subscriptions
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access subscription_items" ON subscription_items
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access invoices" ON invoices
  FOR ALL USING (auth.role() = 'service_role');
