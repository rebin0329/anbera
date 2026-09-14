/**
 * ANBERA — Scoring System Type Definitions
 *
 * Fully typed, provider-agnostic domain contracts for ANBERA Score v1.
 * Matches Supabase foundation schema (v1_foundation.sql).
 */

export type ScoreCategoryKey =
  | "brand_positioning"
  | "visibility"
  | "customer_experience"
  | "conversion"
  | "automation"
  | "growth_readiness";

export type OpportunityCategory =
  | "Visibility"
  | "Conversion"
  | "Automation"
  | "Brand"
  | "Customer Experience"
  | "Growth"
  | "Content"
  | "Sales"
  | "Marketing"
  | "Operations";

export type OpportunityPriority = "high" | "medium" | "low";

export type OpportunityStatus =
  | "recommended"
  | "viewed"
  | "accepted"
  | "rejected"
  | "completed";

export interface BusinessInput {
  name: string;
  industry: string;
  website?: string;
  goal?: string;
}

export interface CategorySignal {
  name: string;
  status: "positive" | "neutral" | "attention";
  detail: string;
}

export interface CategoryScoreResult {
  key: ScoreCategoryKey;
  name: string;
  score: number; // Integer 0–100
  weight: number; // Decimal (e.g. 0.15, 0.20)
  confidence: number; // 0.000 to 1.000
  explanation: string;
  signals: CategorySignal[];
}

export interface OpportunityResult {
  title: string;
  category: OpportunityCategory;
  explanation: string;
  businessImpact: string;
  priority: OpportunityPriority;
  confidence: number;
  recommendedAction: string;
  status: OpportunityStatus;
}

export interface DataSourceRecord {
  name: string;
  type: string;
  details: string;
}

export interface AnalysisOutput {
  business: BusinessInput;
  provider: string; // e.g. 'demo'
  modelVersion: string; // e.g. 'v1.0.0'
  powerScore: number; // Integer 0–100, weighted sum
  confidence: number; // 0.000 to 1.000
  summary: string;
  categories: Record<ScoreCategoryKey, CategoryScoreResult>;
  opportunities: OpportunityResult[];
  nextMoves: OpportunityResult[]; // Exactly top 3 prioritized moves
  rawInputs: Record<string, unknown>;
  dataSources: DataSourceRecord[];
  createdAt: string;
}

export interface ScoringProvider {
  readonly id: string;
  readonly name: string;
  readonly modelVersion: string;
  analyze(input: BusinessInput): Promise<AnalysisOutput>;
}
