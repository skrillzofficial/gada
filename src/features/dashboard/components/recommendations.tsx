"use client";

import { useState } from "react";
import { ArrowUpRight, Globe2, Lightbulb } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { APPLICATION_STAGES, type ApplicationStage, type Recommendation } from "../mock-data";
import { LockedOverlay } from "./locked-overlay";

export function Recommendations({ items, locked }: { items: Recommendation[]; locked: boolean }) {
  const [stages, setStages] = useState<Record<string, ApplicationStage>>(
    Object.fromEntries(items.map((r) => [r.id, r.stage]))
  );

  return (
    <section id="recommendations" className="relative rounded-3xl border border-line bg-white p-6 sm:p-8">
      {locked && (
        <LockedOverlay
          title="Recommendations unlock when you're verified"
          text="Our team will match you to platforms that suit your skills and accept your country."
        />
      )}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">Recommended for you</h2>
          <p className="mt-1 text-sm text-muted">Picked by the Gada team based on your profile.</p>
        </div>
      </div>

      <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-hidden={locked}>
        {items.map((rec) => (
          <li key={rec.id} className="flex flex-col rounded-2xl border border-line p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-lg font-semibold text-gada">{rec.platform}</p>
              {rec.acceptsCountry && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gada-50 px-2.5 py-1 text-[11px] font-semibold text-gada">
                  <Globe2 className="h-3 w-3" aria-hidden="true" /> Accepts Nigeria
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted">{rec.summary}</p>
            <p className="mt-3 text-sm text-gada">
              <span className="font-semibold">Why you:</span> {rec.whyYou}
            </p>
            <p className="mt-3 flex gap-2 rounded-xl bg-bridge-50 p-3 text-xs leading-relaxed text-gada-800">
              <Lightbulb className="h-4 w-4 shrink-0 text-bridge-600" aria-hidden="true" />
              {rec.tip}
            </p>

            <div className="mt-auto pt-5">
              <label htmlFor={`stage-${rec.id}`} className="text-xs font-semibold text-muted">
                Your progress
              </label>
              <select
                id={`stage-${rec.id}`}
                value={stages[rec.id]}
                disabled={locked}
                onChange={(e) => setStages((s) => ({ ...s, [rec.id]: e.target.value as ApplicationStage }))}
                className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-gada outline-none focus:border-gada"
              >
                {APPLICATION_STAGES.map((stage) => (
                  <option key={stage}>{stage}</option>
                ))}
              </select>
              <a
                href={rec.referralUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                tabIndex={locked ? -1 : undefined}
                className={buttonStyles("primary", "md", "mt-3 w-full")}
              >
                Apply on platform <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs text-muted">
        Some Apply buttons are referral links. Gada may receive a bonus at no cost to you, and it never affects your pay.
      </p>
    </section>
  );
}
