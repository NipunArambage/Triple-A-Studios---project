-- ============================================================
-- Supabase SQL: Create the 'bookings' table
-- Run this in your Supabase Dashboard → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS bookings (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email       TEXT NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  phone       TEXT NOT NULL CHECK (char_length(phone) >= 7 AND char_length(phone) <= 20),
  message     TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 2000),
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Explicitly grant permissions to anon and authenticated roles
GRANT ALL ON TABLE public.bookings TO anon, authenticated;



-- Policy: Allow anonymous inserts (for the website contact form)
CREATE POLICY "Allow anonymous inserts"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users (e.g. admin dashboard) can read rows
CREATE POLICY "Allow authenticated reads"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at DESC);

-- Force PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
