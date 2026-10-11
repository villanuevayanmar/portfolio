import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// IMPORTANT: the Supabase clients below are created lazily (inside functions),
// not at module load time.
//
// Reason: `next build` evaluates every API route module while collecting page
// data. If createClient() ran at import time, it would throw
// "supabaseUrl is required" during the build whenever the environment variables
// are not yet present (e.g. a fresh checkout with no .env.local), which would
// fail the entire build. Deferring construction to request time means the
// module always loads cleanly, and the client is only built when it is actually
// needed and the real env vars exist.

let anonInstance: SupabaseClient | undefined;
let adminInstance: SupabaseClient | undefined;

// Public client. RLS-protected. Used by the API routes for anon INSERTs only.
export function getAnonClient(): SupabaseClient {
  if (!anonInstance) {
    anonInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }
  return anonInstance;
}

// Service-role client. SERVER ONLY. Bypasses RLS. Used exclusively by the
// /admin dashboard. Never import or call this from a client component.
export function getAdminClient(): SupabaseClient {
  if (!adminInstance) {
    adminInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }
  return adminInstance;
}

