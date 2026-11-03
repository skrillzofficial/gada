"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Sparkles,
  Undo2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, TextArea, TextInput } from "@/components/ui/field";
import {
  TASKER_LEVELS,
  type AdminPlatform,
  type TaskerLevel,
} from "../mock-data";

type Decision = "verify" | "changes" | "reject";

type Props = {
  taskerName: string;
  taskerWorkTypes: string[];
  platforms: AdminPlatform[];
};

const levelHints: Record<TaskerLevel, string> = {
  Beginner: "Needs guidance and simpler first platforms",
  Ready: "Can start applying with confidence",
  Experienced: "Strong track record, suits expert work",
};

export function ReviewPanel({ taskerName, taskerWorkTypes, platforms }: Props) {
  const [level, setLevel] = useState<TaskerLevel | "">("");
  const [notes, setNotes] = useState("");
  const [matches, setMatches] = useState<Record<string, string>>({}); // platformId -> "why you" note
  const [decision, setDecision] = useState<Decision | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Decision | null>(null);

  const isSuggested = (p: AdminPlatform) =>
    p.workTypes.some((w) => taskerWorkTypes.includes(w));

  function toggleMatch(id: string) {
    setError(null);
    setMatches((m) => {
      const next = { ...m };
      if (id in next) delete next[id];
      else next[id] = "";
      return next;
    });
  }

  function confirm() {
    if (decision === "verify") {
      if (!level) return setError("Choose a level before verifying.");
      if (Object.keys(matches).length === 0)
        return setError(
          "Match at least one platform so the tasker has a next step.",
        );
    } else if (reason.trim().length < 10) {
      return setError(
        "Write a short, kind explanation for the tasker (at least 10 characters).",
      );
    }
    // TODO (backend step): save the assessment, update the tasker's status and send them an email
    setError(null);
    setDone(decision);
  }

  if (done) {
    const messages: Record<Decision, string> = {
      verify: `${taskerName} is verified as “${level}” and matched to ${Object.keys(matches).length} platform(s). They'll get an email and the community unlocks for them.`,
      changes: `We've asked ${taskerName} to update their profile. They'll see your note on their dashboard.`,
      reject: `${taskerName}'s profile was not approved. They've been sent your explanation.`,
    };
    return (
      <aside className="rounded-3xl border border-line bg-white p-6 text-center sm:p-8 xl:sticky xl:top-10">
        <CheckCircle2
          className="mx-auto h-12 w-12 text-green-600"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-xl font-semibold">Assessment saved</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {messages[done]}
        </p>
        <Link
          href="/admin/reviews"
          className="mt-6 inline-block text-sm font-semibold text-gada underline"
        >
          Back to the queue
        </Link>
      </aside>
    );
  }

  return (
    <aside className="space-y-6 rounded-3xl border border-line bg-white p-6 sm:p-8 xl:sticky xl:top-10">
      <h2 className="text-xl font-semibold">Assessment</h2>

      <fieldset>
        <legend className="text-sm font-semibold text-gada">Level</legend>
        <div className="mt-2 grid gap-2">
          {TASKER_LEVELS.map((l) => (
            <label
              key={l}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                level === l
                  ? "border-gada bg-gada-50"
                  : "border-line hover:border-gada-300"
              }`}
            >
              <input
                type="radio"
                name="level"
                value={l}
                checked={level === l}
                onChange={() => {
                  setLevel(l);
                  setError(null);
                }}
                className="h-4 w-4 accent-[var(--color-gada)]"
              />
              <span>
                <span className="block text-sm font-semibold text-gada">
                  {l}
                </span>
                <span className="block text-xs text-muted">
                  {levelHints[l]}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-gada">
          Match to platforms
        </legend>
        <p className="mt-1 text-xs text-muted">
          Suggestions are based on the tasker&rsquo;s skills.
        </p>
        <ul className="mt-2 space-y-2">
          {platforms.map((p) => {
            const selected = p.id in matches;
            return (
              <li
                key={p.id}
                className={`rounded-xl border p-3 ${selected ? "border-gada bg-gada-50/60" : "border-line"}`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleMatch(p.id)}
                    className="mt-0.5 h-4 w-4 accent-[var(--color-gada)]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gada">
                      {p.name}
                      {isSuggested(p) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-bridge-100 px-2 py-0.5 text-[11px]">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />{" "}
                          Suggested
                        </span>
                      )}
                    </span>
                    <span className="block text-xs text-muted">
                      {p.workTypes.join(", ")} · {p.countries}
                    </span>
                  </span>
                </label>
                {selected && (
                  <TextInput
                    id={`why-${p.id}`}
                    aria-label={`Why ${p.name} suits ${taskerName}`}
                    value={matches[p.id]}
                    onChange={(e) =>
                      setMatches((m) => ({ ...m, [p.id]: e.target.value }))
                    }
                    placeholder={`Why it suits ${taskerName} (shown to them)`}
                    className="mt-2 py-2 text-sm"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </fieldset>

      <Field
        id="admin-notes"
        label="Private notes"
        hint="Only the Gada team can see these."
      >
        <TextArea
          id="admin-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-24"
          placeholder="e.g. Strong Yoruba. Check certificate next time."
        />
      </Field>

      <div>
        <p className="text-sm font-semibold text-gada">Decision</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(
            [
              {
                id: "verify",
                label: "Verify",
                icon: BadgeCheck,
                active: "border-green-600 bg-green-50 text-green-800",
              },
              {
                id: "changes",
                label: "Changes",
                icon: Undo2,
                active: "border-orange-500 bg-orange-50 text-orange-800",
              },
              {
                id: "reject",
                label: "Reject",
                icon: XCircle,
                active: "border-red-500 bg-red-50 text-red-700",
              },
            ] as const
          ).map(({ id, label, icon: Icon, active }) => (
            <button
              key={id}
              type="button"
              aria-pressed={decision === id}
              onClick={() => {
                setDecision(id);
                setError(null);
              }}
              className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs font-semibold transition ${
                decision === id
                  ? active
                  : "border-line text-gada hover:border-gada-300"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {(decision === "changes" || decision === "reject") && (
        <Field
          id="decision-reason"
          label={
            decision === "changes"
              ? "What should they change?"
              : "Why isn't the profile approved?"
          }
          hint="The tasker will see this, so keep it kind and specific."
        >
          <TextArea
            id="decision-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-24"
          />
        </Field>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <Button
        size="lg"
        className="w-full"
        disabled={!decision}
        onClick={confirm}
      >
        {decision === "verify"
          ? "Verify and send recommendations"
          : decision === "changes"
            ? "Send change request"
            : decision === "reject"
              ? "Confirm rejection"
              : "Choose a decision"}
      </Button>
    </aside>
  );
}
