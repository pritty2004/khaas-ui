-- ============================================================
-- ShopSpark – Supabase Schema
-- Run this in your Supabase SQL Editor to set up all tables
-- ============================================================

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  price         NUMERIC     NOT NULL,
  original_price NUMERIC    NULL,
  image_url     TEXT        NULL,
  tag           TEXT        NULL,
  description   TEXT        NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Cart table
CREATE TABLE IF NOT EXISTS public.cart (
  id          BIGSERIAL PRIMARY KEY,
  product_id  BIGINT      NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity    INT         NOT NULL DEFAULT 1,
  user_id     UUID        NULL,  -- tie to auth.users later if needed
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id           BIGSERIAL PRIMARY KEY,
  full_name    TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  phone        TEXT        NULL,
  address      TEXT        NULL,
  total_amount NUMERIC     NOT NULL,
  items_count  INT         NOT NULL DEFAULT 0,
  status       TEXT        NOT NULL DEFAULT 'confirmed',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (open for anon during development)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders   ENABLE ROW LEVEL SECURITY;

-- Public read for products
CREATE POLICY "Public read products"  ON public.products FOR SELECT TO anon USING (true);

-- Full access to cart for anon (dev-friendly; restrict by user_id in production)
CREATE POLICY "Anon cart select"   ON public.cart FOR SELECT TO anon USING (true);
CREATE POLICY "Anon cart insert"   ON public.cart FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon cart update"   ON public.cart FOR UPDATE TO anon USING (true);
CREATE POLICY "Anon cart delete"   ON public.cart FOR DELETE TO anon USING (true);

-- Allow anon to insert orders
CREATE POLICY "Anon orders insert" ON public.orders FOR INSERT TO anon WITH CHECK (true);

-- ============================================================
-- Sample product data (optional – matches existing fallback)
-- ============================================================
INSERT INTO public.products (name, price, original_price, tag) VALUES
  ('Rania Kundan Kara',        24500, 28000, 'Bestseller'),
  ('Aara Slim Stack (Set of 3)', 9800, NULL,  'New'),
  ('Zara Filigree Cuff',       18200, NULL,   NULL),
  ('Noor Polki Pair',          32000, 36500, 'Limited')
ON CONFLICT DO NOTHING;
