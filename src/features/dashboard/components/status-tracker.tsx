import { Check, Clock } from "lucide-react";
import type { ReviewStatus } from "../mock-data";

const STAGES = [
  { label: "Profile submitted", detail: "Done" },
  { label: "Under review", detail: "Usually within 3 working days" },
  { label: "Verified", detail: "Community unlocks" },
  { label: "Matched to platforms", detail: "Start applying" },
];

export function StatusTracker({ status }: { status: ReviewStatus }) {
  // index of the stage currently in progress
  const current = status === "pending_review" ? 1 : 3;

  return (
    <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Your journey</h2>
        {status === "pending_review" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bridge-100 px-3 py-1 text-xs font-semibold text-gada">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Under review
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bridge px-3 py-1 text-xs font-semibold text-gada">
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Verified
          </span>
        )}
      </div>

      <ol className="mt-8 grid gap-6 sm:grid-cols-4 sm:gap-2">
        {STAGES.map((stage, i) => {
          const done = i < current || (status === "verified" && i === current);
          const active = i === current && !done;
          return (
            <li key={stage.label} className="relative flex gap-4 sm:block">
              {/* connecting line */}
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-4 top-9 h-[calc(100%-1rem)] w-0.5 sm:left-9 sm:top-4 sm:h-0.5 sm:w-[calc(100%-1.5rem)] ${
                    i < current ? "bg-gada" : "bg-line"
                  }`}
                />
              )}
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  done
                    ? "bg-gada text-white"
                    : active
                      ? "bg-bridge text-gada ring-4 ring-bridge-100"
                      : "border-2 border-line bg-white text-muted"
                }`}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
                {active && <span className="absolute inset-0 animate-ping rounded-full bg-bridge/50" aria-hidden="true" />}
              </span>
              <div className="sm:mt-3 sm:pr-2">
                <p className={`text-sm font-semibold ${done || active ? "text-gada" : "text-muted"}`}>{stage.label}</p>
                <p className="mt-0.5 text-xs text-muted">{stage.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
