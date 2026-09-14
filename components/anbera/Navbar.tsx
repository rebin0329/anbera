"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Intelligence", href: "#intelligence" },
    { label: "Command", href: "#command" },
    { label: "Studio", href: "#studio" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        {/* Left: Brand Identity */}
        <div className="flex items-center">
          <Logo showTagline={false} />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] rounded px-1.5 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="#signin"
            className="hidden sm:inline-flex text-sm font-medium text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] rounded px-3 py-2"
          >
            Sign In
          </Link>

          <Button
            href="/discover"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            icon={
              <svg
                className="w-3.5 h-3.5"
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
            Discover Your Business
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2.5 rounded-md text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] min-h-[44px] min-w-[44px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#080808]/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-[#F5F5F5] hover:text-[#3682F6] transition-colors py-3 border-b border-white/[0.06] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#8A8A8A] font-mono">0{navLinks.indexOf(link) + 1}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-8 pb-6 border-t border-white/10">
            <Link
              href="#signin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center py-3 text-sm font-medium text-[#8A8A8A] hover:text-[#F5F5F5] min-h-[44px] flex items-center justify-center"
            >
              Sign In
            </Link>
            <Button
              href="/discover"
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setIsMobileMenuOpen(false)}
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
              Discover Your Business
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
