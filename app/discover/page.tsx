"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/anbera/Navbar";
import { Footer } from "@/components/anbera/Footer";
import { runScoringEngine } from "@/lib/scoring/engine";
import {
  AnalysisOutput,
  BusinessInput,
  OpportunityPriority,
  ScoreCategoryKey,
} from "@/lib/scoring/types";

type ViewState = "form" | "loading" | "results" | "error";

export default function DiscoverPage() {
  const [viewState, setViewState] = useState<ViewState>("form");
  const [formData, setFormData] = useState<BusinessInput>({
    name: "",
    industry: "",
    website: "",
    goal: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisOutput | null>(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = formData.name.trim();
    const industry = formData.industry.trim();

    if (!name) {
      setErrorMessage("Please provide your business name to proceed.");
      setViewState("error");
      return;
    }

    if (!industry) {
      setErrorMessage("Please specify your business industry to proceed.");
      setViewState("error");
      return;
    }

    setViewState("loading");
    setErrorMessage(null);

    try {
      // Small graceful transition for perceptual continuity (no fake progress steps)
      await new Promise((resolve) => setTimeout(resolve, 600));

      const output = await runScoringEngine({
        name,
        industry,
        website: formData.website?.trim() || undefined,
        goal: formData.goal?.trim() || undefined,
      });

      setAnalysisResult(output);
      setViewState("results");
    } catch {
      setErrorMessage(
        "Unable to complete business analysis. Please verify your entries and try again."
      );
      setViewState("error");
    }
  };

  const handleReset = () => {
    setViewState("form");
    setErrorMessage(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#080808] text-[#F5F5F5]">
      <Navbar />

      <main className="flex-1 w-full pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Subtle Ambient Background Gradient */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-[#3682F6]/[0.05] rounded-full blur-[140px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* ======================================================== */}
          {/* STATE 1: INITIAL FORM                                    */}
          {/* ======================================================== */}
          {viewState === "form" && (
            <div className="flex flex-col items-center">
              {/* System Header */}
              <div className="text-center max-w-2xl mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-white/10 mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#3682F6]" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A8A8A]">
                    ANBERA INTELLIGENCE {"//"} DISCOVERY
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#F5F5F5] leading-tight">
                  DISCOVER YOUR <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5] to-[#3682F6]">
                    BUSINESS POTENTIAL
                  </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[#8A8A8A] leading-relaxed">
                  Evaluate your commercial standing across 6 operational pillars.
                  Receive your Business Power Score, prioritized leverage points,
                  and 3 concrete next moves.
                </p>
              </div>

              {/* Discovery Form Card */}
              <div className="w-full max-w-xl bg-[#111111] border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Field 1: Business Name */}
                  <div>
                    <label
                      htmlFor="business-name"
                      className="block text-xs font-mono uppercase tracking-[0.14em] text-[#F5F5F5] mb-2"
                    >
                      Business Name <span className="text-[#3682F6]">*</span>
                    </label>
                    <input
                      id="business-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Apex Strategic Logistics"
                      className="w-full bg-[#080808] border border-white/10 rounded-md px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#8A8A8A]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] transition-colors"
                    />
                  </div>

                  {/* Field 2: Industry */}
                  <div>
                    <label
                      htmlFor="business-industry"
                      className="block text-xs font-mono uppercase tracking-[0.14em] text-[#F5F5F5] mb-2"
                    >
                      Industry <span className="text-[#3682F6]">*</span>
                    </label>
                    <input
                      id="business-industry"
                      name="industry"
                      type="text"
                      required
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="e.g. B2B Professional Services, E-Commerce, SaaS"
                      className="w-full bg-[#080808] border border-white/10 rounded-md px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#8A8A8A]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] transition-colors"
                    />
                  </div>

                  {/* Field 3: Website (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="business-website"
                        className="text-xs font-mono uppercase tracking-[0.14em] text-[#F5F5F5]"
                      >
                        Website
                      </label>
                      <span className="text-[11px] font-mono text-[#8A8A8A]">
                        Optional
                      </span>
                    </div>
                    <input
                      id="business-website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full bg-[#080808] border border-white/10 rounded-md px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#8A8A8A]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] transition-colors"
                    />
                  </div>

                  {/* Field 4: Primary Goal (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="business-goal"
                        className="text-xs font-mono uppercase tracking-[0.14em] text-[#F5F5F5]"
                      >
                        Primary Objective
                      </label>
                      <span className="text-[11px] font-mono text-[#8A8A8A]">
                        Optional
                      </span>
                    </div>
                    <textarea
                      id="business-goal"
                      name="goal"
                      rows={3}
                      value={formData.goal}
                      onChange={handleInputChange}
                      placeholder="e.g. Automate client onboarding, expand search visibility, and increase lead conversion rates"
                      className="w-full bg-[#080808] border border-white/10 rounded-md px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#8A8A8A]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#3682F6] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#2563EB] shadow-[0_0_24px_rgba(54,130,246,0.3)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] cursor-pointer"
                    >
                      <span>ANALYZE BUSINESS</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>
                </form>

                {/* Transparency Disclosure */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
                  <p className="text-[11px] font-mono text-[#8A8A8A] leading-relaxed">
                    V1 analysis uses deterministic demo intelligence. No external website data is scraped.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STATE 2: LOADING                                         */}
          {/* ======================================================== */}
          {viewState === "loading" && (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              aria-live="polite"
              aria-busy="true"
            >
              <div className="relative flex items-center justify-center w-20 h-20 mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-ping opacity-25" />
                <div className="absolute inset-2 rounded-full border border-[#3682F6] animate-spin border-t-transparent" />
                <div className="w-4 h-4 rounded-full bg-[#3682F6]" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-white/10 mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3682F6]">
                  EVALUATING MODEL
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F5F5F5]">
                ANALYZING OPERATIONAL TOPOLOGY
              </h2>

              <p className="mt-2 text-sm text-[#8A8A8A] max-w-md">
                Computing category weights across brand positioning, visibility channels,
                conversion dynamics, and system automation.
              </p>
            </div>
          )}

          {/* ======================================================== */}
          {/* STATE 3: ERROR                                           */}
          {/* ======================================================== */}
          {viewState === "error" && (
            <div
              className="max-w-lg mx-auto bg-[#111111] border border-red-500/30 rounded-xl p-8 text-center"
              role="alert"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 mx-auto flex items-center justify-center mb-4 border border-red-500/20">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 8.25h.01"
                  />
                </svg>
              </div>

              <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-[#F5F5F5] mb-2">
                Analysis Interrupted
              </h2>

              <p className="text-sm text-[#8A8A8A] leading-relaxed mb-6">
                {errorMessage ||
                  "Unable to compute business intelligence. Please verify your business details."}
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-[#111111] text-[#F5F5F5] border border-white/20 text-xs font-mono uppercase tracking-wider hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6]"
              >
                RETURN TO FORM
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* STATE 4: RESULTS                                         */}
          {/* ======================================================== */}
          {viewState === "results" && analysisResult && (
            <div className="space-y-12">
              {/* Mandatory Demo Transparency Strip */}
              <div className="rounded-lg bg-[#111111] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3682F6]" />
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F5F5F5] block">
                      ANBERA DEMO INTELLIGENCE
                    </span>
                    <span className="text-xs text-[#8A8A8A] mt-0.5 block">
                      V1 analysis uses deterministic demo intelligence. No external website data is scraped.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="shrink-0 px-4 py-2 rounded border border-white/10 bg-[#080808] text-xs font-mono uppercase tracking-wider text-[#8A8A8A] hover:text-[#F5F5F5] hover:border-white/25 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3682F6]"
                >
                  Analyze Another Business
                </button>
              </div>

              {/* Hero Score Diagnostic Card */}
              <div className="bg-[#111111] border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Overall Score Display */}
                  <div className="lg:col-span-5 flex flex-col items-start border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A8A8A] mb-2">
                      BUSINESS POWER SCORE
                    </span>

                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#F5F5F5]">
                        {analysisResult.powerScore}
                      </span>
                      <span className="font-mono text-2xl sm:text-3xl text-[#8A8A8A] font-light">
                        / 100
                      </span>
                    </div>

                    <div className="w-full bg-[#080808] h-2 rounded-full mt-4 overflow-hidden border border-white/[0.08]">
                      <div
                        className="h-full bg-[#3682F6] rounded-full transition-all duration-700"
                        style={{ width: `${analysisResult.powerScore}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between w-full mt-3 text-[11px] font-mono text-[#8A8A8A]">
                      <span>Model: {analysisResult.modelVersion}</span>
                      <span>Index: {Math.round(analysisResult.confidence * 100)}%</span>
                    </div>
                  </div>

                  {/* Right: Synthesis & Context */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="font-mono text-xs text-[#3682F6] uppercase tracking-wider mb-2">
                      Target: {analysisResult.business.name} {"//"} {analysisResult.business.industry}
                    </div>

                    <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F5F5F5] mb-3">
                      STRATEGIC OVERVIEW
                    </h2>

                    <p className="text-sm sm:text-base text-[#8A8A8A] leading-relaxed">
                      {analysisResult.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10 text-xs font-mono">
                      <div>
                        <span className="text-[#8A8A8A] block uppercase tracking-wider">Top Driver</span>
                        <span className="text-[#F5F5F5] font-medium mt-0.5 block">Growth Readiness</span>
                      </div>
                      <div>
                        <span className="text-[#8A8A8A] block uppercase tracking-wider">Priority Bottleneck</span>
                        <span className="text-[#3682F6] font-medium mt-0.5 block">
                          {analysisResult.nextMoves[0]?.category || "Automation"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION: 6 CATEGORY SCORES                               */}
              {/* ======================================================== */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F5F5F5]">
                      OPERATIONAL PILLARS
                    </h2>
                    <p className="text-xs font-mono text-[#8A8A8A] mt-1">
                      Six weighted dimensions compounding into your Business Power Score.
                    </p>
                  </div>
                  <span className="hidden sm:inline-block font-mono text-xs text-[#8A8A8A]">
                    TOTAL WEIGHT: 100%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(
                    Object.keys(analysisResult.categories) as ScoreCategoryKey[]
                  ).map((catKey) => {
                    const category = analysisResult.categories[catKey];
                    return (
                      <div
                        key={catKey}
                        className="bg-[#111111] border border-white/10 rounded-xl p-5 sm:p-6 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <h3 className="font-heading text-sm sm:text-base font-bold text-[#F5F5F5]">
                              {category.name}
                            </h3>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#080808] border border-white/10 text-[#8A8A8A] shrink-0">
                              {Math.round(category.weight * 100)}% Weight
                            </span>
                          </div>

                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="font-heading text-3xl font-extrabold text-[#F5F5F5]">
                              {category.score}
                            </span>
                            <span className="font-mono text-xs text-[#8A8A8A]">
                              / 100
                            </span>
                          </div>

                          <div className="w-full bg-[#080808] h-1.5 rounded-full overflow-hidden mb-4 border border-white/[0.04]">
                            <div
                              className="h-full bg-[#3682F6] rounded-full"
                              style={{ width: `${category.score}%` }}
                            />
                          </div>

                          <p className="text-xs text-[#8A8A8A] leading-relaxed mb-4">
                            {category.explanation}
                          </p>
                        </div>

                        {/* Signals list */}
                        <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                          {category.signals.map((sig, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-[11px]"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${
                                  sig.status === "positive"
                                    ? "bg-[#3682F6]"
                                    : sig.status === "attention"
                                    ? "bg-amber-400"
                                    : "bg-[#8A8A8A]"
                                }`}
                              />
                              <div className="leading-tight">
                                <span className="font-mono text-[#F5F5F5] font-medium">
                                  {sig.name}:{" "}
                                </span>
                                <span className="text-[#8A8A8A]">{sig.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION: YOUR 3 NEXT MOVES                               */}
              {/* ======================================================== */}
              <div className="pt-4">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-white/10 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#3682F6]" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3682F6]">
                      PRIORITY ACTION CLUSTER
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F5F5F5]">
                    YOUR 3 NEXT MOVES
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8A8A8A] mt-1">
                    Direct commercial leverage points prioritized by impact and feasibility.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {analysisResult.nextMoves.map((move, index) => (
                    <div
                      key={index}
                      className="bg-[#111111] border border-[#3682F6]/30 rounded-xl p-6 relative flex flex-col justify-between shadow-[0_0_24px_rgba(54,130,246,0.06)]"
                    >
                      <div>
                        {/* Top Indicator */}
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-xs">
                          <span className="text-[#3682F6] font-bold">
                            MOVE {"//"} 0{index + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#080808] text-[10px] uppercase tracking-wider text-[#F5F5F5] border border-white/10">
                            {move.category}
                          </span>
                        </div>

                        {/* What to do */}
                        <h3 className="font-heading text-base font-bold text-[#F5F5F5] mb-2 leading-snug">
                          {move.title}
                        </h3>

                        <div className="mt-4 space-y-3 text-xs">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#3682F6] block mb-1">
                              WHAT TO DO:
                            </span>
                            <p className="text-[#F5F5F5] leading-relaxed bg-[#080808] p-3 rounded border border-white/[0.06]">
                              {move.recommendedAction}
                            </p>
                          </div>

                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8A8A] block mb-1">
                              WHY IT MATTERS:
                            </span>
                            <p className="text-[#8A8A8A] leading-relaxed">
                              {move.businessImpact}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-[#8A8A8A]">
                        <span>PRIORITY: HIGH</span>
                        <span>CONFIDENCE: 94%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION: TOP OPPORTUNITIES                               */}
              {/* ======================================================== */}
              <div className="pt-4">
                <div className="mb-6">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F5F5F5]">
                    TOP OPPORTUNITIES
                  </h2>
                  <p className="text-xs font-mono text-[#8A8A8A] mt-1">
                    Comprehensive catalog of identified business optimizations.
                  </p>
                </div>

                <div className="space-y-4">
                  {analysisResult.opportunities.map((opp, idx) => (
                    <div
                      key={idx}
                      className="bg-[#111111] border border-white/10 rounded-xl p-5 sm:p-6 transition-colors hover:border-white/20"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3682F6]" />
                          <h3 className="font-heading text-base font-bold text-[#F5F5F5]">
                            {opp.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-[#080808] border border-white/10 text-[#8A8A8A] uppercase">
                            {opp.category}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded border uppercase ${
                              opp.priority === ("high" as OpportunityPriority)
                                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                : "bg-white/[0.04] text-[#8A8A8A] border-white/10"
                            }`}
                          >
                            {opp.priority} Priority
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed mb-4">
                        {opp.explanation}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06] text-xs">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8A8A] block mb-1">
                            Business Impact
                          </span>
                          <span className="text-[#F5F5F5] font-medium leading-relaxed block">
                            {opp.businessImpact}
                          </span>
                        </div>

                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#3682F6] block mb-1">
                            Recommended Action
                          </span>
                          <span className="text-[#8A8A8A] leading-relaxed block">
                            {opp.recommendedAction}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Re-analyze CTA */}
              <div className="pt-8 text-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#111111] border border-white/20 text-xs font-mono uppercase tracking-widest text-[#F5F5F5] hover:bg-white/[0.06] hover:border-white/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6]"
                >
                  <span>RUN ANOTHER DIAGNOSTIC</span>
                  <svg
                    className="w-3.5 h-3.5 text-[#8A8A8A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
