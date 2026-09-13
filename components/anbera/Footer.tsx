import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: "Intelligence", href: "#intelligence" },
    { label: "Command", href: "#command" },
    { label: "Studio", href: "#studio" },
    { label: "Guardian", href: "#guardian" },
  ];

  const systemLinks = [
    { label: "Principles", href: "#principles" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "System Status", href: "#status" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Security Architecture", href: "#security" },
  ];

  return (
    <footer className="w-full bg-[#080808] border-t border-white/10 text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Logo showTagline={true} />
            <p className="text-sm text-[#8A8A8A] max-w-sm mt-2 leading-relaxed">
              AI-powered business growth system that continuously analyzes a
              business, identifies its highest-value opportunities, and turns them
              into actionable next moves.
            </p>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded bg-[#111111] border border-white/10 font-mono text-[11px] text-[#8A8A8A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3682F6]" />
              <span>CORE PRINCIPLE: AI PROPOSES. YOU DECIDE.</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Ecosystem */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#8A8A8A]">
                Ecosystem
              </span>
              <ul className="flex flex-col space-y-2.5">
                {platformLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#F5F5F5]/80 hover:text-[#3682F6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3682F6] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: System */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#8A8A8A]">
                System
              </span>
              <ul className="flex flex-col space-y-2.5">
                {systemLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#F5F5F5]/80 hover:text-[#3682F6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3682F6] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Trust & Governance */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#8A8A8A]">
                Governance
              </span>
              <ul className="flex flex-col space-y-2.5">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#F5F5F5]/80 hover:text-[#3682F6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3682F6] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8A8A] font-mono">
          <div>
            © {currentYear} ANBERA. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>YOUR BUSINESS. ELEVATED.</span>
            <span>•</span>
            <span className="text-[#3682F6]">FOUNDATION v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
