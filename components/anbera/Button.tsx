import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3682F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] motion-reduce:transition-none select-none rounded-md";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 min-h-[38px] gap-1.5 uppercase tracking-wider",
    md: "text-xs md:text-sm px-5 py-2.5 min-h-[44px] gap-2 uppercase tracking-wider font-semibold",
    lg: "text-sm px-6 py-3.5 min-h-[48px] gap-2.5 uppercase tracking-wider font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-[#3682F6] text-white hover:bg-[#2563EB] shadow-[0_0_20px_rgba(54,130,246,0.3)] hover:shadow-[0_0_28px_rgba(54,130,246,0.45)] border border-[#3682F6]/30",
    secondary:
      "bg-[#111111] text-[#F5F5F5] border border-white/10 hover:bg-white/[0.04] hover:border-white/25 hover:text-white",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`group ${combinedClassName}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`group ${combinedClassName}`}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
