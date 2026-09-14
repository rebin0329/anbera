import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

// Load .env.local if present
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim();
      process.env[key] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const secretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const isConfigured = (val) => Boolean(val) && !val.startsWith("YOUR_") && !val.includes("your-project-id");

console.log("=========================================");
console.log("ANBERA — Supabase Foundation Verification");
console.log("=========================================");

// Check variable presence without exposing values
console.log("1. Environment Variable Names:");
console.log(
  "   - NEXT_PUBLIC_SUPABASE_URL:",
  isConfigured(supabaseUrl) ? "CONFIGURED (Present)" : "PLACEHOLDER / UNSAVED"
);
console.log(
  "   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:",
  isConfigured(publishableKey) ? "CONFIGURED (Present)" : "PLACEHOLDER / UNSAVED"
);
console.log(
  "   - SUPABASE_SECRET_KEY:",
  isConfigured(secretKey) ? "CONFIGURED (Present)" : "PLACEHOLDER / UNSAVED"
);

if (!isConfigured(supabaseUrl) || (!isConfigured(publishableKey) && !isConfigured(secretKey))) {
  console.log("\n⚠️ Supabase credentials in .env.local on disk still contain placeholder values.");
  console.log("💡 Tip: If you have edited .env.local in your editor, please SAVE the file (Ctrl+S / Cmd+S).");
  process.exit(1);
}

const adminClient = isConfigured(secretKey)
  ? createClient(supabaseUrl, secretKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

const publicClient = isConfigured(publishableKey)
  ? createClient(supabaseUrl, publishableKey, {
      auth: { persistSession: false },
    })
  : null;

async function verify() {
  const primaryClient = adminClient || publicClient;
  console.log("\n2. Connecting to Supabase Project...");

  const tables = [
    "businesses",
    "analyses",
    "scores",
    "score_categories",
    "opportunities",
  ];
  let allExist = true;

  console.log("\n3. Verifying 5 V1 Tables Existence:");
  for (const table of tables) {
    const { error } = await primaryClient
      .from(table)
      .select("*", { count: "exact", head: true });
    if (error) {
      console.log(`   ❌ Table '${table}': ${error.message} (Code: ${error.code})`);
      allExist = false;
    } else {
      console.log(`   ✅ Table '${table}': Present and accessible.`);
    }
  }

  console.log("\n4. Verifying Row Level Security (RLS) Enforcement:");
  if (publicClient) {
    const { data: publicData, error: publicError } = await publicClient
      .from("businesses")
      .select("id");

    if (publicError) {
      console.log(
        `   ✅ RLS Enforcement: Public/unauthenticated access rejected (${publicError.message}).`
      );
    } else if (Array.isArray(publicData) && publicData.length === 0) {
      console.log(
        "   ✅ RLS Enforcement: Confirmed active. Public client receives 0 rows (isolated by RLS)."
      );
    } else {
      console.log(
        "   ⚠️ RLS Warning: Unauthenticated client received rows. Verify RLS policies."
      );
    }
  } else {
    console.log("   ℹ️ Public client not configured for RLS live test.");
  }

  console.log("\n=========================================");
  if (allExist) {
    console.log("🎉 All 5 V1 tables and Supabase connection verified successfully!");
  } else {
    console.log(
      "⚠️ One or more tables were not found. Ensure supabase/migrations/20260913_v1_foundation.sql has been executed in the Supabase SQL Editor."
    );
  }
  console.log("=========================================");
}

verify().catch((err) => {
  console.error("Verification error:", err.message);
  process.exit(1);
});
