import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase Admin Client.
 *
 * CAUTION: Bypasses Row Level Security (RLS).
 * MUST NEVER BE IMPORTED IN BROWSER / CLIENT-SIDE CODE.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secretKey) {
    throw new Error(
      "Missing server-side Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be defined."
    );
  }

  return createSupabaseClient(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
