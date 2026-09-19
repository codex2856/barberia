import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  children: ReactNode;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gold text-void hover:bg-gold-light active:bg-gold-dark shadow-[var(--shadow-gold)]",
  outline:
    "border border-gold/50 text-bone hover:border-gold hover:bg-gold/10",
  ghost: "text-bone hover:text-gold",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-6 py-3 text-xs rounded-full",
  lg: "px-8 py-4 text-sm rounded-full",
};

export function Button({ variant = "primary", size = "md", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
