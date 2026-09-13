import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g>
        {/* Outer sharp chevron A */}
        <path d="M24 3L4 43H14L24 21L34 43H44L24 3Z" fill="#F5F5F5" />
        {/* Inner intelligence aperture */}
        <path d="M24 16L32 31H16L24 16Z" fill="#3682F6" fillOpacity="0.9" />
        {/* Crossbar precision wedge */}
        <path d="M13 39L24 18L35 39H27L24 32L21 39H13Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export function Logo({ className = "", showTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] rounded-md transition-opacity ${className}`}
      aria-label="ANBERA Home"
    >
      <LogoMark className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:scale-105" />
      <div className="flex flex-col">
        <span className="font-heading text-lg font-bold tracking-[0.24em] text-[#F5F5F5] uppercase leading-none">
          ANBERA
        </span>
        {showTagline && (
          <span className="text-[10px] font-mono tracking-[0.16em] text-[#8A8A8A] uppercase mt-1">
            YOUR BUSINESS. ELEVATED.
          </span>
        )}
      </div>
    </Link>
  );
}
