import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profileCompleteness } from "@/features/profiles/completeness";
import { adminTaskers } from "@/features/admin/mock-data";

export const metadata: Metadata = { title: "Review queue" };

export default function ReviewQueuePage() {
  const queue = adminTaskers.filter((t) => t.status === "pending_review");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Review queue</h1>
        <p className="mt-1 text-muted">
          {queue.length} profiles waiting. Oldest first, so nobody waits longer
          than 3 working days.
        </p>
      </header>

      <ul className="space-y-3">
        {[...queue].reverse().map((t) => {
          const { percent } = profileCompleteness(t.profile);
          return (
            <li key={t.id}>
              <Link
                href={`/admin/reviews/${t.id}`}
                className="group flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-white p-5 transition hover:border-gada-300 hover:shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gada font-bold text-white">
                  {t.profile.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-semibold text-gada">
                    {t.profile.fullName}
                  </p>
                  <p className="truncate text-sm text-muted">
                    {t.profile.headline} · {t.profile.city}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {t.profile.workTypes.map((w) => (
                      <span
                        key={w}
                        className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-gada"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-gada">{percent}% complete</p>
                  <p className="text-muted">
                    {t.profile.experience} · {t.submittedOn}
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 text-muted transition group-hover:translate-x-1 group-hover:text-gada"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
