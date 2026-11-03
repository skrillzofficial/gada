"use client";

import { useState } from "react";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChipSelect } from "@/components/ui/chip-select";
import { Field, TextArea, TextInput } from "@/components/ui/field";
import { WORK_TYPES } from "@/features/profiles/schema";
import type { AdminPlatform } from "../mock-data";

const blank = (): AdminPlatform => ({
  id: `pl-${Date.now()}`,
  name: "",
  summary: "",
  workTypes: [],
  countries: "Nigeria",
  referralUrl: "",
  tip: "",
  active: true,
});

export function PlatformManager({ initial }: { initial: AdminPlatform[] }) {
  const [platforms, setPlatforms] = useState(initial);
  const [editing, setEditing] = useState<AdminPlatform | null>(null);
  const [error, setError] = useState<string | null>(null);

  function save() {
    if (!editing) return;
    if (
      editing.name.trim().length < 2 ||
      editing.workTypes.length === 0 ||
      !/^https:\/\//.test(editing.referralUrl)
    ) {
      setError(
        "Add a name, at least one kind of work, and a sign-up or referral link starting with https://",
      );
      return;
    }
    // TODO (backend step): save the platform
    setPlatforms((list) =>
      list.some((p) => p.id === editing.id)
        ? list.map((p) => (p.id === editing.id ? editing : p))
        : [...list, editing],
    );
    setEditing(null);
    setError(null);
  }

  function toggleActive(id: string) {
    setPlatforms((list) =>
      list.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
  }

  return (
    <div className="space-y-6">
      {!editing && (
        <Button onClick={() => setEditing(blank())}>
          <Plus className="h-4 w-4" aria-hidden="true" /> Add platform
        </Button>
      )}

      {editing && (
        <section className="space-y-5 rounded-3xl border border-gada-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold">
            {initial.some((p) => p.id === editing.id) ||
            platforms.some((p) => p.id === editing.id)
              ? "Edit platform"
              : "New platform"}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="pl-name" label="Platform name">
              <TextInput
                id="pl-name"
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />
            </Field>
            <Field
              id="pl-countries"
              label="Countries accepted"
              hint="Check the platform's current rules before saving."
            >
              <TextInput
                id="pl-countries"
                value={editing.countries}
                onChange={(e) =>
                  setEditing({ ...editing, countries: e.target.value })
                }
              />
            </Field>
          </div>
          <Field id="pl-summary" label="Short summary (shown to taskers)">
            <TextInput
              id="pl-summary"
              value={editing.summary}
              onChange={(e) =>
                setEditing({ ...editing, summary: e.target.value })
              }
            />
          </Field>
          <ChipSelect
            label="Kinds of work"
            options={WORK_TYPES}
            value={editing.workTypes}
            onChange={(workTypes) => setEditing({ ...editing, workTypes })}
          />
          <Field id="pl-url" label="Sign-up or referral link">
            <TextInput
              id="pl-url"
              type="url"
              value={editing.referralUrl}
              onChange={(e) =>
                setEditing({ ...editing, referralUrl: e.target.value })
              }
              placeholder="https://"
            />
          </Field>
          <Field id="pl-tip" label="Tip for taskers">
            <TextArea
              id="pl-tip"
              className="min-h-20"
              value={editing.tip}
              onChange={(e) => setEditing({ ...editing, tip: e.target.value })}
            />
          </Field>
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                setEditing(null);
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={save}>Save platform</Button>
          </div>
        </section>
      )}

      <ul className="grid gap-4 md:grid-cols-2">
        {platforms.map((p) => (
          <li
            key={p.id}
            className={`rounded-3xl border bg-white p-6 ${p.active ? "border-line" : "border-dashed border-line opacity-70"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold text-gada">
                  {p.name}
                </p>
                <p className="text-sm text-muted">{p.summary}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={p.active}
                aria-label={`${p.name} is ${p.active ? "active" : "hidden"}`}
                onClick={() => toggleActive(p.id)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${p.active ? "bg-gada" : "bg-line"}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${p.active ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.workTypes.map((w) => (
                <span
                  key={w}
                  className="rounded-full bg-gada-50 px-2.5 py-0.5 text-xs font-semibold text-gada"
                >
                  {w}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">
              <span className="font-semibold text-gada">Accepts:</span>{" "}
              {p.countries}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
              <a
                href={p.referralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-gada underline"
              >
                Referral link{" "}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setEditing(p)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-semibold text-gada hover:bg-surface"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
