"use client";

import { Pencil } from "lucide-react";
import type { ReactNode } from "react";
import type { FieldErrors, ProfileDraft } from "../schema";

type StepProps = {
  draft: ProfileDraft;
  update: (patch: Partial<ProfileDraft>) => void;
  errors: FieldErrors;
  goTo: (step: number) => void;
};

export function StepReview({ draft, update, errors, goTo }: StepProps) {
  return (
    <div className="space-y-5">
      <ReviewCard title="About you" onEdit={() => goTo(0)}>
        <p className="font-semibold text-gada">{draft.fullName}</p>
        <p className="text-muted">{draft.headline}</p>
        <p className="text-muted">
          {draft.city}, {draft.country}
        </p>
        <p className="mt-2 whitespace-pre-line text-gada-800">{draft.bio}</p>
      </ReviewCard>

      <ReviewCard title="Skills" onEdit={() => goTo(1)}>
        <Row label="Work" value={draft.workTypes.join(", ")} />
        <Row label="Subjects" value={draft.subjects.join(", ") || "None added"} />
        <Row label="Languages" value={draft.languages.join(", ")} />
        <Row label="Hours / week" value={draft.hoursPerWeek} />
        <Row label="Experience" value={draft.experience} />
      </ReviewCard>

      <ReviewCard title="Past projects" onEdit={() => goTo(2)}>
        {draft.projects.length ? (
          <ul className="space-y-2">
            {draft.projects.map((p) => (
              <li key={p.id}>
                <span className="font-semibold text-gada">{p.title}</span>
                <span className="text-muted"> · {p.workType}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No projects yet</p>
        )}
      </ReviewCard>

      <label className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-gada">
        <input
          type="checkbox"
          checked={draft.consent}
          onChange={(e) => update({ consent: e.target.checked })}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-gada)]"
        />
        <span>
          I confirm this information is true, and I agree that the Gada team can review my profile.
          I&rsquo;ll always sign up to platforms and work under my own name.
        </span>
      </label>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent}</p>}
    </div>
  );
}

function ReviewCard({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-gada hover:bg-surface"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit
        </button>
      </div>
      <div className="space-y-1 text-sm">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="inline-block w-28 text-muted">{label}</span>
      <span className="text-gada">{value}</span>
    </p>
  );
}
