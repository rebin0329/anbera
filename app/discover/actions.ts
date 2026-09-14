"use server";

import { runScoringEngine } from "@/lib/scoring/engine";
import { AnalysisOutput, BusinessInput } from "@/lib/scoring/types";
import { persistAnalysisResult } from "@/lib/discover/persistence";

export interface DiscoveryActionResponse {
  success: boolean;
  data?: AnalysisOutput;
  error?: string;
}

/**
 * Validates and sanitizes business discovery inputs strictly on the server.
 */
function validateDiscoveryInput(raw: unknown): {
  valid: boolean;
  input?: BusinessInput;
  error?: string;
} {
  if (!raw || typeof raw !== "object") {
    return { valid: false, error: "Invalid request payload." };
  }

  const candidate = raw as Record<string, unknown>;
  const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
  const industry =
    typeof candidate.industry === "string" ? candidate.industry.trim() : "";
  const website =
    typeof candidate.website === "string" ? candidate.website.trim() : "";
  const goal = typeof candidate.goal === "string" ? candidate.goal.trim() : "";

  // 1. Business Name limits
  if (!name || name.length < 1) {
    return { valid: false, error: "Business name is required." };
  }
  if (name.length > 120) {
    return {
      valid: false,
      error: "Business name must not exceed 120 characters.",
    };
  }

  // 2. Industry limits
  if (!industry || industry.length < 1) {
    return { valid: false, error: "Industry is required." };
  }
  if (industry.length > 100) {
    return {
      valid: false,
      error: "Industry must not exceed 100 characters.",
    };
  }

  // 3. Website limits and validation (optional)
  if (website) {
    if (website.length > 255) {
      return {
        valid: false,
        error: "Website URL must not exceed 255 characters.",
      };
    }
    const lowerWeb = website.toLowerCase();
    if (lowerWeb.startsWith("javascript:") || lowerWeb.startsWith("data:")) {
      return { valid: false, error: "Invalid website format." };
    }
    // Simple URL/domain sanity check
    const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    if (!domainRegex.test(website) && !website.includes(".")) {
      return { valid: false, error: "Please enter a valid website domain or URL." };
    }
  }

  // 4. Goal limits (optional)
  if (goal && goal.length > 1000) {
    return {
      valid: false,
      error: "Primary objective statement must not exceed 1000 characters.",
    };
  }

  return {
    valid: true,
    input: {
      name,
      industry,
      website: website || undefined,
      goal: goal || undefined,
    },
  };
}

/**
 * Server Action: submitBusinessDiscovery
 *
 * 1. Validates & sanitizes input strictly server-side.
 * 2. Runs the deterministic scoring engine on the server.
 * 3. Persists business, analysis, score, score_categories, and opportunities to Supabase via admin client.
 * 4. Returns safe analysis output to the client (zero database secrets, zero internal IDs).
 */
export async function submitBusinessDiscovery(
  rawInput: BusinessInput
): Promise<DiscoveryActionResponse> {
  // 1. Server-side validation
  const validation = validateDiscoveryInput(rawInput);
  if (!validation.valid || !validation.input) {
    return {
      success: false,
      error: validation.error || "Invalid business submission.",
    };
  }

  try {
    // 2. Server-side scoring calculation
    const output = await runScoringEngine(validation.input);

    // 3. Secure server-side persistence
    await persistAnalysisResult(output);

    // 4. Safe return to client
    return {
      success: true,
      data: output,
    };
  } catch (error) {
    console.error(
      "ANBERA Discovery Server Error:",
      error instanceof Error ? error.message : "Unexpected database error"
    );

    return {
      success: false,
      error:
        "Unable to complete and secure your business analysis. Please try again.",
    };
  }
}
