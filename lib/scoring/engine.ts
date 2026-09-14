/**
 * ANBERA — Core Scoring Engine
 *
 * Coordinates scoring providers, validates weights, and enforces
 * mathematical integrity for the ANBERA Business Power Score.
 */

import { DemoProvider } from "../providers/demo-provider";
import {
  AnalysisOutput,
  BusinessInput,
  CategoryScoreResult,
  ScoreCategoryKey,
  ScoringProvider,
} from "./types";

/**
 * Canonical V1 Scoring Category Definitions and Weights.
 * Sum of weights MUST equal exactly 1.00.
 */
export const SCORING_CATEGORIES: Record<
  ScoreCategoryKey,
  { name: string; weight: number; description: string }
> = {
  brand_positioning: {
    name: "Brand & Positioning",
    weight: 0.15,
    description: "Market identity, differentiation clarity, and value proposition alignment.",
  },
  visibility: {
    name: "Visibility",
    weight: 0.20,
    description: "Discoverability footprint, inbound channel reach, and search presence.",
  },
  customer_experience: {
    name: "Customer Experience",
    weight: 0.15,
    description: "Friction-free onboarding, trust architecture, and retention capability.",
  },
  conversion: {
    name: "Conversion",
    weight: 0.20,
    description: "Lead capture mechanism, call-to-action efficacy, and offer resonance.",
  },
  automation: {
    name: "Automation",
    weight: 0.10,
    description: "Systemized workflows, operational leverage, and routine task autonomy.",
  },
  growth_readiness: {
    name: "Growth Readiness",
    weight: 0.20,
    description: "Unit economic resilience, scale absorption capacity, and market timing.",
  },
};

/**
 * Asserts at module initialization that category weights total 1.00.
 */
const TOTAL_WEIGHT = Object.values(SCORING_CATEGORIES).reduce(
  (sum, cat) => sum + cat.weight,
  0
);
if (Math.abs(TOTAL_WEIGHT - 1.0) > 0.0001) {
  throw new Error(
    `Invalid scoring configuration: weights must sum to 1.00, got ${TOTAL_WEIGHT}`
  );
}

/**
 * Calculates the overall Business Power Score (0–100) from weighted category scores.
 *
 * Formula:
 * PowerScore = Math.round(
 *   (BrandPositioning * 0.15) +
 *   (Visibility * 0.20) +
 *   (CustomerExperience * 0.15) +
 *   (Conversion * 0.20) +
 *   (Automation * 0.10) +
 *   (GrowthReadiness * 0.20)
 * )
 */
export function calculatePowerScore(
  categories: Record<ScoreCategoryKey, Pick<CategoryScoreResult, "score" | "weight">>
): number {
  let weightedSum = 0;
  for (const key of Object.keys(SCORING_CATEGORIES) as ScoreCategoryKey[]) {
    const category = categories[key];
    if (!category) {
      throw new Error(`Missing category score for '${key}'`);
    }
    const score = Math.max(0, Math.min(100, Math.round(category.score)));
    weightedSum += score * category.weight;
  }
  return Math.max(0, Math.min(100, Math.round(weightedSum)));
}

/**
 * Primary Scoring Pipeline Entrypoint.
 *
 * Validates business inputs, delegates analysis to the active provider
 * (defaults to deterministic DemoProvider), and validates output constraints.
 */
export async function runScoringEngine(
  input: BusinessInput,
  provider: ScoringProvider = new DemoProvider()
): Promise<AnalysisOutput> {
  const name = input.name?.trim();
  const industry = input.industry?.trim();

  if (!name || name.length < 1) {
    throw new Error("Business name is required for ANBERA analysis.");
  }
  if (!industry || industry.length < 1) {
    throw new Error("Industry is required for ANBERA analysis.");
  }

  // Execute provider analysis
  const output = await provider.analyze({
    name,
    industry,
    website: input.website?.trim() || undefined,
    goal: input.goal?.trim() || undefined,
  });

  // Verify and reconcile power score calculation
  const verifiedPowerScore = calculatePowerScore(output.categories);
  output.powerScore = verifiedPowerScore;

  // Enforce Next Moves constraint: exactly top 3 prioritized moves
  if (!output.nextMoves || output.nextMoves.length === 0) {
    output.nextMoves = output.opportunities.slice(0, 3);
  } else if (output.nextMoves.length > 3) {
    output.nextMoves = output.nextMoves.slice(0, 3);
  }

  return output;
}
