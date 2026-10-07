import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns a Supabase client when env vars are present, otherwise null so the
 * app keeps running on mock data. Use from server code (src/lib/data).
 *
 * For authenticated admin sessions, add @supabase/ssr and create a
 * cookie-aware server client in src/lib/supabase/server.ts.
 */
let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cached = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return cached;
}

export const isSupabaseConfigured = () => !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
