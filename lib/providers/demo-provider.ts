/**
 * ANBERA — V1 Demo Scoring Provider
 *
 * Fully deterministic, local, and reproducible assessment engine.
 *
 * GUARANTEES:
 * - Zero external API calls.
 * - Zero web scraping or fake network lookups.
 * - Zero non-deterministic random functions (no Math.random()).
 * - Same business input ALWAYS yields the exact same scores, signals, and opportunities.
 */

import {
  AnalysisOutput,
  BusinessInput,
  CategoryScoreResult,
  OpportunityCategory,
  OpportunityPriority,
  OpportunityResult,
  ScoreCategoryKey,
  ScoringProvider,
} from "../scoring/types";

// Exact category weights specified by ANBERA Master Spec (Total = 1.00)
export const V1_CATEGORY_WEIGHTS: Record<ScoreCategoryKey, { name: string; weight: number }> = {
  brand_positioning: { name: "Brand & Positioning", weight: 0.15 },
  visibility: { name: "Visibility", weight: 0.20 },
  customer_experience: { name: "Customer Experience", weight: 0.15 },
  conversion: { name: "Conversion", weight: 0.20 },
  automation: { name: "Automation", weight: 0.10 },
  growth_readiness: { name: "Growth Readiness", weight: 0.20 },
};

/**
 * 32-bit FNV-1a hash function for strings.
 * Produces an unsigned integer seed from string content.
 */
function fnv1a(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Mulberry32 deterministic pseudo-random number generator.
 * Yields reproducible floats in [0, 1) given a 32-bit integer seed.
 */
function createPrng(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class DemoProvider implements ScoringProvider {
  public readonly id = "demo";
  public readonly name = "ANBERA Demo Intelligence";
  public readonly modelVersion = "v1.0.0";

  public async analyze(input: BusinessInput): Promise<AnalysisOutput> {
    const normName = input.name.trim();
    const normIndustry = input.industry.trim();
    const normWebsite = (input.website || "").trim().toLowerCase();
    const normGoal = (input.goal || "").trim().toLowerCase();

    // Generate deterministic seed from normalized inputs
    const signature = `${normName.toLowerCase()}|${normIndustry.toLowerCase()}|${normWebsite}|${normGoal}`;
    const seed = fnv1a(signature);
    const rng = createPrng(seed);

    // Goal keyword influence heuristics (deterministic shifts)
    const goalHasAutomation = normGoal.includes("automat") || normGoal.includes("efficien") || normGoal.includes("system");
    const goalHasGrowth = normGoal.includes("grow") || normGoal.includes("scale") || normGoal.includes("expand");
    const goalHasConversion = normGoal.includes("convert") || normGoal.includes("lead") || normGoal.includes("sale");
    const goalHasBrand = normGoal.includes("brand") || normGoal.includes("position") || normGoal.includes("market");

    // Website presence heuristic (structural, not scraped)
    const hasWebsite = normWebsite.length > 3 && (normWebsite.includes(".") || normWebsite.startsWith("http"));

    // Base score generators (bounded between 45 and 85, modified deterministically)
    const genScore = (base: number, variance: number, bonus: boolean): number => {
      const offset = Math.floor(rng() * (variance * 2 + 1)) - variance;
      const boost = bonus ? 4 : 0;
      return Math.min(95, Math.max(35, Math.round(base + offset + boost)));
    };

    const categories: Record<ScoreCategoryKey, CategoryScoreResult> = {
      brand_positioning: {
        key: "brand_positioning",
        name: V1_CATEGORY_WEIGHTS.brand_positioning.name,
        weight: V1_CATEGORY_WEIGHTS.brand_positioning.weight,
        score: genScore(66, 10, goalHasBrand),
        confidence: 0.95,
        explanation:
          "Value proposition alignment and market differentiation evaluated against sector benchmark patterns.",
        signals: [
          {
            name: "Positioning Clarity",
            status: normName.length > 2 ? "positive" : "neutral",
            detail: "Clear structural identity defined for commercial target segments.",
          },
          {
            name: "Core Differentiation",
            status: goalHasBrand ? "positive" : "neutral",
            detail: "Strategic positioning emphasis detected in primary operational objective.",
          },
          {
            name: "Value Signaling",
            status: "positive",
            detail: "Consistent baseline messaging structure for industry classification.",
          },
        ],
      },
      visibility: {
        key: "visibility",
        name: V1_CATEGORY_WEIGHTS.visibility.name,
        weight: V1_CATEGORY_WEIGHTS.visibility.weight,
        score: genScore(hasWebsite ? 64 : 48, 12, hasWebsite),
        confidence: 0.92,
        explanation:
          "Market discoverability and distribution channel readiness across digital touchpoints.",
        signals: [
          {
            name: "Web Infrastructure",
            status: hasWebsite ? "positive" : "attention",
            detail: hasWebsite
              ? "Primary digital footprint anchor detected and formatted."
              : "No direct web anchor detected; primary discovery reliance is non-digital.",
          },
          {
            name: "Distribution Surface",
            status: hasWebsite ? "positive" : "neutral",
            detail: "Initial discoverability entry points configured for organic reach.",
          },
          {
            name: "Channel Velocity",
            status: "neutral",
            detail: "Audience acquisition leverage potential remains underutilized.",
          },
        ],
      },
      customer_experience: {
        key: "customer_experience",
        name: V1_CATEGORY_WEIGHTS.customer_experience.name,
        weight: V1_CATEGORY_WEIGHTS.customer_experience.weight,
        score: genScore(70, 8, false),
        confidence: 0.94,
        explanation:
          "Client journey continuity, trust architecture, and retention capability baseline.",
        signals: [
          {
            name: "Trust Architecture",
            status: "positive",
            detail: "Baseline brand credibility structure suitable for prospect engagement.",
          },
          {
            name: "Onboarding Flow",
            status: "neutral",
            detail: "Friction-reduction opportunities available across initial touchpoints.",
          },
          {
            name: "Client Feedback Loop",
            status: "neutral",
            detail: "Systematic retention collection mechanism ready for standardization.",
          },
        ],
      },
      conversion: {
        key: "conversion",
        name: V1_CATEGORY_WEIGHTS.conversion.name,
        weight: V1_CATEGORY_WEIGHTS.conversion.weight,
        score: genScore(58, 12, goalHasConversion),
        confidence: 0.93,
        explanation:
          "Ability to turn audience discovery into qualified inquiries, transactions, or retained commitments.",
        signals: [
          {
            name: "Call-to-Action Density",
            status: goalHasConversion ? "positive" : "attention",
            detail: "Direct response architecture needs focused conversion focal points.",
          },
          {
            name: "Offer Clarity",
            status: "positive",
            detail: "Primary value exchange aligns with declared business industry.",
          },
          {
            name: "Capture Mechanism",
            status: hasWebsite ? "neutral" : "attention",
            detail: "Inquiry funnel requires automated qualification to avoid drop-off.",
          },
        ],
      },
      automation: {
        key: "automation",
        name: V1_CATEGORY_WEIGHTS.automation.name,
        weight: V1_CATEGORY_WEIGHTS.automation.weight,
        score: genScore(52, 14, goalHasAutomation),
        confidence: 0.91,
        explanation:
          "Level of repeatable, systemized workflows across sales, fulfillment, and operations.",
        signals: [
          {
            name: "Workflow Orchestration",
            status: goalHasAutomation ? "positive" : "attention",
            detail: "Operational leverage through background automation is primed for implementation.",
          },
          {
            name: "Lead Routing Automation",
            status: "neutral",
            detail: "Inbound communication paths currently rely on manual intervention.",
          },
          {
            name: "Operational Redundancy",
            status: "neutral",
            detail: "Process documentation can be converted into programmatic workflows.",
          },
        ],
      },
      growth_readiness: {
        key: "growth_readiness",
        name: V1_CATEGORY_WEIGHTS.growth_readiness.name,
        weight: V1_CATEGORY_WEIGHTS.growth_readiness.weight,
        score: genScore(68, 10, goalHasGrowth),
        confidence: 0.95,
        explanation:
          "Capacity of the current operating model to absorb scale without margin degradation.",
        signals: [
          {
            name: "Scalability Headroom",
            status: goalHasGrowth ? "positive" : "positive",
            detail: "Operating model exhibits capacity for sustained volume expansion.",
          },
          {
            name: "Unit Economics Foundation",
            status: "positive",
            detail: "Margin structure supports systematic customer acquisition reinvestment.",
          },
          {
            name: "Market Timing Index",
            status: "positive",
            detail: "Macro sector conditions reflect expanding demand for core offering.",
          },
        ],
      },
    };

    // Calculate exact weighted Power Score (Sum of (score * weight))
    let weightedSum = 0;
    for (const key of Object.keys(categories) as ScoreCategoryKey[]) {
      const cat = categories[key];
      weightedSum += cat.score * cat.weight;
    }
    const powerScore = Math.min(100, Math.max(0, Math.round(weightedSum)));

    // Generate curated opportunities matching DB constraints
    const opportunities: OpportunityResult[] = [
      {
        title: "Deploy Automated Lead Intake & Triage Funnel",
        category: "Automation" as OpportunityCategory,
        explanation:
          "Current inbound lead handling requires manual qualification, delaying response times and reducing conversion rates during peak hours.",
        businessImpact:
          "Accelerates response latency by 85% and prevents high-intent drop-offs.",
        priority: "high" as OpportunityPriority,
        confidence: 0.94,
        recommendedAction:
          "Implement an automated intake mechanism that scores incoming inquiries and alerts the team instantly.",
        status: "recommended",
      },
      {
        title: "Sharpen High-Conversion Value Proposition",
        category: "Conversion" as OpportunityCategory,
        explanation:
          "Prospects encounter general capability statements rather than outcome-oriented commitments tailored to their key challenges.",
        businessImpact:
          "Improves direct inquiry-to-meeting conversion by an estimated 25–35%.",
        priority: "high" as OpportunityPriority,
        confidence: 0.93,
        recommendedAction:
          "Refactor headline and primary CTA messaging around concrete commercial results rather than feature lists.",
        status: "recommended",
      },
      {
        title: "Establish Structured Authority Signaling Engine",
        category: "Brand" as OpportunityCategory,
        explanation:
          "Core expertise is currently implicit rather than systematically demonstrated through structured case frameworks and proof assets.",
        businessImpact:
          "Reduces sales friction and supports premium price elasticity.",
        priority: "high" as OpportunityPriority,
        confidence: 0.92,
        recommendedAction:
          "Package 3 flagship client transformation frameworks into reusable commercial proof assets.",
        status: "recommended",
      },
      {
        title: "Expand Discoverability Footprint & Search Velocity",
        category: "Visibility" as OpportunityCategory,
        explanation:
          "Reliance on direct referrals limits proactive customer discovery across relevant commercial search and social corridors.",
        businessImpact:
          "Creates compounding baseline organic inbound pipeline over 3–6 months.",
        priority: "medium" as OpportunityPriority,
        confidence: 0.91,
        recommendedAction:
          "Deploy high-intent topic authority clusters addressing specific buyer evaluation questions.",
        status: "recommended",
      },
      {
        title: "Standardize Client Onboarding & Retention Telemetry",
        category: "Customer Experience" as OpportunityCategory,
        explanation:
          "Post-sale client activation lacks automated milestones to verify early adoption and gauge satisfaction.",
        businessImpact:
          "Increases customer lifetime value (LTV) and creates predictable referral triggers.",
        priority: "medium" as OpportunityPriority,
        confidence: 0.90,
        recommendedAction:
          "Implement a 14-day client success check-in sequence with automated satisfaction telemetry.",
        status: "recommended",
      },
    ];

    // Opportunities deterministic re-ordering based on lowest scoring categories
    // This ensures businesses with weak automation see automation opportunities elevated
    const sortedOpportunities = [...opportunities].sort((a, b) => {
      const catAKey = a.category.toLowerCase().replace(" ", "_") as ScoreCategoryKey;
      const catBKey = b.category.toLowerCase().replace(" ", "_") as ScoreCategoryKey;
      const scoreA = categories[catAKey]?.score ?? 70;
      const scoreB = categories[catBKey]?.score ?? 70;

      // Primary sort: Lowest category score gets highest urgency
      if (scoreA !== scoreB) {
        return scoreA - scoreB;
      }
      // Secondary sort: High priority before medium
      const prioRank = { high: 0, medium: 1, low: 2 };
      return prioRank[a.priority] - prioRank[b.priority];
    });

    // Top 3 Next Moves Detected
    const nextMoves = sortedOpportunities.slice(0, 3);

    // Business Summary synthesis
    const summary = `${normName} presents a Business Power Score of ${powerScore}/100 in the ${normIndustry} sector. Core strengths center on ${
      categories.growth_readiness.score >= categories.brand_positioning.score
        ? "Growth Readiness"
        : "Brand & Positioning"
    }, while the most immediate operational leverage lies in upgrading ${
      nextMoves[0].category
    } (${nextMoves[0].title}).`;

    return {
      business: input,
      provider: this.id,
      modelVersion: this.modelVersion,
      powerScore,
      confidence: 0.94,
      summary,
      categories,
      opportunities: sortedOpportunities,
      nextMoves,
      rawInputs: {
        name: normName,
        industry: normIndustry,
        website: normWebsite,
        goal: normGoal,
      },
      dataSources: [
        {
          name: "ANBERA Demo Intelligence Heuristic Engine",
          type: "deterministic_model",
          details:
            "V1 Benchmark heuristic model. Zero external web scraping or live network telemetry.",
        },
      ],
      createdAt: new Date().toISOString(),
    };
  }
}
