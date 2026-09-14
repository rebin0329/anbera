/**
 * ANBERA — Server-Only Discovery Persistence Layer
 *
 * Persists anonymous discovery runs across all 5 foundation tables:
 * - businesses
 * - analyses
 * - scores
 * - score_categories (exactly 6 rows)
 * - opportunities
 *
 * SECURITY:
 * - Runs strictly server-side.
 * - Never import in client components.
 * - Does not expose database errors or credentials.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import { AnalysisOutput } from "@/lib/scoring/types";

export interface PersistenceResult {
  businessId: string;
  analysisId: string;
  scoreId: string;
}

/**
 * Persists a complete analysis result across all 5 V1 tables.
 */
export async function persistAnalysisResult(
  analysis: AnalysisOutput
): Promise<PersistenceResult> {
  const supabase = createAdminClient();

  // 1. Create businesses row (owner_id is null for anonymous public discovery)
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .insert({
      name: analysis.business.name,
      industry: analysis.business.industry,
      website: analysis.business.website || null,
      goal: analysis.business.goal || null,
      owner_id: null,
    })
    .select("id")
    .single();

  if (businessError || !business) {
    console.error("Database error inserting business:", businessError?.message);
    throw new Error("Failed to persist business record.");
  }

  // 2. Create analyses row
  const { data: analysisRecord, error: analysisError } = await supabase
    .from("analyses")
    .insert({
      business_id: business.id,
      created_by: null,
      provider: analysis.provider || "demo",
      model_version: analysis.modelVersion || "v1.0.0",
      status: "completed",
      raw_inputs: analysis.rawInputs || {},
      data_sources: analysis.dataSources || [],
      confidence: analysis.confidence ?? 1.0,
    })
    .select("id")
    .single();

  if (analysisError || !analysisRecord) {
    console.error("Database error inserting analysis:", analysisError?.message);
    throw new Error("Failed to persist analysis record.");
  }

  // 3. Create scores row
  const { data: scoreRecord, error: scoreError } = await supabase
    .from("scores")
    .insert({
      analysis_id: analysisRecord.id,
      business_id: business.id,
      power_score: analysis.powerScore,
      confidence: analysis.confidence ?? 1.0,
      model_version: analysis.modelVersion || "v1.0.0",
      summary: analysis.summary,
    })
    .select("id")
    .single();

  if (scoreError || !scoreRecord) {
    console.error("Database error inserting score:", scoreError?.message);
    throw new Error("Failed to persist score record.");
  }

  // 4. Create score_categories rows (exactly 6)
  const categoryRows = Object.values(analysis.categories).map((cat) => ({
    score_id: scoreRecord.id,
    category_key: cat.key,
    name: cat.name,
    score: cat.score,
    weight: cat.weight,
    confidence: cat.confidence,
    explanation: cat.explanation,
    signals: cat.signals || [],
  }));

  const { error: categoryError } = await supabase
    .from("score_categories")
    .insert(categoryRows);

  if (categoryError) {
    console.error(
      "Database error inserting score_categories:",
      categoryError.message
    );
    throw new Error("Failed to persist score categories.");
  }

  // 5. Create opportunities rows
  if (analysis.opportunities && analysis.opportunities.length > 0) {
    const opportunityRows = analysis.opportunities.map((opp) => ({
      business_id: business.id,
      analysis_id: analysisRecord.id,
      title: opp.title,
      category: opp.category,
      explanation: opp.explanation,
      business_impact: opp.businessImpact,
      priority: opp.priority,
      confidence: opp.confidence,
      recommended_action: opp.recommendedAction,
      status: opp.status || "recommended",
      outcome: null,
    }));

    const { error: opportunityError } = await supabase
      .from("opportunities")
      .insert(opportunityRows);

    if (opportunityError) {
      console.error(
        "Database error inserting opportunities:",
        opportunityError.message
      );
      throw new Error("Failed to persist opportunities.");
    }
  }

  return {
    businessId: business.id,
    analysisId: analysisRecord.id,
    scoreId: scoreRecord.id,
  };
}
