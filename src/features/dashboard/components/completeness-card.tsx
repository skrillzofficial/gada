import Link from "next/link";
import { Check, Circle } from "lucide-react";
import { profileCompleteness } from "@/features/profiles/completeness";
import type { ProfileDraft } from "@/features/profiles/schema";

export function CompletenessCard({ profile }: { profile: ProfileDraft }) {
  const { percent, items } = profileCompleteness(profile);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold">Profile strength</h2>
      <div className="mt-6 flex items-center gap-6">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--color-line)" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="var(--color-bridge)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - percent / 100)}
              className="transition-[stroke-dashoffset] duration-1000"
            />
          </svg>
          <p className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold text-gada">{percent}%</span>
          </p>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          Stronger profiles get verified faster and matched to better-paid work.
        </p>
      </div>

      <ul className="mt-6 space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm">
            {item.done ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gada text-white">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
            ) : (
              <Circle className="h-5 w-5 text-line" aria-hidden="true" />
            )}
            <span className={item.done ? "text-muted line-through" : "text-gada"}>{item.label}</span>
            {!item.done && <span className="ml-auto text-xs font-semibold text-bridge-600">+{item.points}%</span>}
          </li>
        ))}
      </ul>

      <Link href="/onboarding" className="mt-6 inline-block text-sm font-semibold text-gada underline">
        Improve my profile
      </Link>
    </section>
  );
}
