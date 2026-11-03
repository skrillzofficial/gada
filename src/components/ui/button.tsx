import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-gada text-white hover:bg-gada-600",
  secondary: "border border-line bg-white text-gada hover:bg-surface",
  accent: "bg-bridge text-gada hover:bg-bridge-600",
  ghost: "text-gada hover:bg-surface",
  inverse: "border border-white/30 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export function buttonStyles(
  variant: Variant = "primary",
  size: Size = "md",
  className = ""
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type StyleProps = { variant?: Variant; size?: Size };

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return <button className={buttonStyles(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonStyles(variant, size, className)} {...props} />;
}
