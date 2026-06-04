-- Supabase Database Schema for Sahm Store

-- 1. Users Table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  capital DECIMAL(12,2) DEFAULT 10000.00,
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Stores Table
CREATE TABLE public.stores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  type TEXT DEFAULT 'بقالة صغيرة',
  reputation INT DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Products Catalog
CREATE TABLE public.products_catalog (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  base_buy_price DECIMAL(10,2) NOT NULL,
  base_demand_rate DECIMAL(3,2) NOT NULL,
  icon TEXT
);

-- 4. Store Inventory
CREATE TABLE public.inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products_catalog(id),
  stock_quantity INT DEFAULT 0,
  sell_price DECIMAL(10,2) NOT NULL,
  UNIQUE(store_id, product_id)
);

-- 5. Employees
CREATE TABLE public.employees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  productivity INT DEFAULT 80,
  rating DECIMAL(3,2) DEFAULT 4.0
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
