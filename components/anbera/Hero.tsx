import React from "react";
import { Button } from "./Button";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-36 bg-[#080808]">
      {/* Subtle Diffused Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-[#3682F6]/[0.06] rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Strategic Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8">
            {/* System Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#111111] border border-white/10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3682F6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3682F6]" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5F5F5]">
                AI BUSINESS GROWTH SYSTEM
              </span>
            </div>

            {/* Dominant Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-extrabold uppercase tracking-[-0.03em] text-[#F5F5F5] leading-[1.05]">
              YOUR BUSINESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5] to-[#3682F6]">
                HAS MORE
              </span>{" "}
              <br />
              POTENTIAL.
            </h1>

            {/* Subcopy */}
            <p className="text-base sm:text-lg md:text-xl text-[#8A8A8A] max-w-xl leading-relaxed">
              ANBERA helps businesses understand where they stand, discover their
              highest-value opportunities, and turn them into their next move.
            </p>

            {/* Action Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Button
                href="/discover"
                variant="primary"
                size="lg"
                icon={
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
                }
              >
                DISCOVER YOUR BUSINESS
              </Button>

              <Button
                href="#how-it-works"
                variant="secondary"
                size="lg"
                icon={
                  <svg
                    className="w-4 h-4 text-[#8A8A8A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                }
              >
                SEE HOW IT WORKS
              </Button>
            </div>

            {/* Strategic Workflow Ribbon */}
            <div className="w-full pt-4">
              <div className="py-2.5 px-4 rounded-lg bg-[#111111] border border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#8A8A8A] uppercase tracking-[0.16em]">
                <span className="text-[#F5F5F5] font-medium">DISCOVER</span>
                <span className="text-white/20">•</span>
                <span>PRIORITIZE</span>
                <span className="text-white/20">•</span>
                <span>BUILD</span>
                <span className="text-white/20">•</span>
                <span>AUTOMATE</span>
                <span className="text-white/20">•</span>
                <span className="text-[#3682F6] font-semibold">GROW</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Business Intelligence Visualization */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative rounded-xl bg-[#111111] border border-white/10 p-5 md:p-6 shadow-2xl overflow-hidden">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3682F6]" />
                  <span className="text-[#F5F5F5] font-medium tracking-wider">
                    OPPORTUNITY TOPOLOGY
                  </span>
                </div>
                <span className="text-[#8A8A8A] tracking-wider">
                  MATRIX // SCAN_01
                </span>
              </div>

              {/* Static SVG Business Intelligence Graph */}
              <div className="relative w-full aspect-[540/320] bg-[#080808] rounded-lg border border-white/[0.06] p-2 flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 540 320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  aria-label="Abstract business intelligence opportunity graph"
                  role="img"
                >
                  {/* Subtle Grid Substrate */}
                  <line x1="40" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  <line x1="40" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  <line x1="40" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  <line x1="40" y1="220" x2="500" y2="220" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  <line x1="40" y1="280" x2="500" y2="280" stroke="rgba(255,255,255,0.06)" />

                  <line x1="100" y1="40" x2="100" y2="280" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  <line x1="220" y1="40" x2="220" y2="280" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  <line x1="340" y1="40" x2="340" y2="280" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  <line x1="460" y1="40" x2="460" y2="280" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

                  {/* Interconnecting Intelligence Vectors */}
                  <path
                    d="M100 230 L220 150 L340 190 L460 70"
                    stroke="#3682F6"
                    strokeWidth="1.5"
                    strokeOpacity="0.85"
                  />
                  <path
                    d="M100 230 L220 150 L340 190 L460 70 L460 280 L100 280 Z"
                    fill="url(#gradient-area)"
                    opacity="0.12"
                  />
                  <path
                    d="M100 180 L220 220 L340 110 L460 130"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />

                  {/* Linear Gradients */}
                  <defs>
                    <linearGradient id="gradient-area" x1="280" y1="70" x2="280" y2="280" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3682F6" stopOpacity="0.5" />
                      <stop offset="1" stopColor="#3682F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Node 1: Acquisition Efficiency */}
                  <circle cx="100" cy="230" r="5" fill="#111111" stroke="#8A8A8A" strokeWidth="1.5" />
                  <circle cx="100" cy="230" r="2" fill="#F5F5F5" />
                  <text x="100" y="254" textAnchor="middle" fill="#8A8A8A" fontSize="9" fontFamily="monospace" letterSpacing="0.05em">
                    ACQUISITION
                  </text>

                  {/* Node 2: Operational Leverage */}
                  <circle cx="220" cy="150" r="5" fill="#111111" stroke="#3682F6" strokeWidth="1.5" />
                  <circle cx="220" cy="150" r="2" fill="#3682F6" />
                  <text x="220" y="136" textAnchor="middle" fill="#8A8A8A" fontSize="9" fontFamily="monospace" letterSpacing="0.05em">
                    AUTOMATION
                  </text>

                  {/* Node 3: Retention Defense */}
                  <circle cx="340" cy="190" r="5" fill="#111111" stroke="#8A8A8A" strokeWidth="1.5" />
                  <circle cx="340" cy="190" r="2" fill="#F5F5F5" />
                  <text x="340" y="214" textAnchor="middle" fill="#8A8A8A" fontSize="9" fontFamily="monospace" letterSpacing="0.05em">
                    RETENTION
                  </text>

                  {/* Node 4: Alpha Opportunity Hub */}
                  <circle cx="460" cy="70" r="8" fill="#111111" stroke="#3682F6" strokeWidth="2" />
                  <circle cx="460" cy="70" r="3.5" fill="#3682F6" />
                  <circle cx="460" cy="70" r="14" stroke="#3682F6" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <text x="460" y="48" textAnchor="middle" fill="#F5F5F5" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="0.06em">
                    NEXT MOVE: ALPHA
                  </text>

                  {/* Coordinate Tag */}
                  <rect x="390" y="85" width="105" height="18" rx="3" fill="#111111" stroke="rgba(255,255,255,0.12)" />
                  <text x="442" y="97" textAnchor="middle" fill="#3682F6" fontSize="9" fontFamily="monospace">
                    +42% HEADROOM
                  </text>
                </svg>
              </div>

              {/* Lower Telemetry Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 text-center font-mono text-[10px]">
                <div className="rounded bg-[#080808] border border-white/[0.06] p-2.5">
                  <div className="text-[#8A8A8A] uppercase">Analyzed Signals</div>
                  <div className="text-sm font-semibold text-[#F5F5F5] mt-0.5">142 Vectors</div>
                </div>
                <div className="rounded bg-[#080808] border border-white/[0.06] p-2.5">
                  <div className="text-[#8A8A8A] uppercase">Confidence</div>
                  <div className="text-sm font-semibold text-[#3682F6] mt-0.5">99.4% Index</div>
                </div>
                <div className="rounded bg-[#080808] border border-white/[0.06] p-2.5">
                  <div className="text-[#8A8A8A] uppercase">Action State</div>
                  <div className="text-sm font-semibold text-[#F5F5F5] mt-0.5">Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
