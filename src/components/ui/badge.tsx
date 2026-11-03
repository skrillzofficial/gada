import type { ComponentProps } from "react";
import { BadgeCheck } from "lucide-react";

type Tone = "neutral" | "blue" | "verified";

const tones: Record<Tone, string> = {
  neutral: "border border-line bg-surface text-muted",
  blue: "bg-gada-50 text-gada",
  verified: "bg-bridge text-gada",
};

export function Badge({
  tone = "neutral",
  className = "",
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
      {...props}
    />
  );
}

export function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <Badge tone="verified" className={className}>
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
      Verified
    </Badge>
  );
}
