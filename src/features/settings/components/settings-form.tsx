"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, TextInput } from "@/components/ui/field";

const NOTIFICATIONS = [
  { id: "verified", label: "When my profile is reviewed", hint: "Includes your Verified badge and any feedback." },
  { id: "recommendations", label: "New platform recommendations", hint: "When our team matches you to a platform." },
  { id: "replies", label: "Replies to my community posts", hint: "A daily summary, not every reply." },
  { id: "classes", label: "Live class reminders", hint: "The day before each class." },
] as const;

export function SettingsForm({ user }: { user: { name: string; email: string } }) {
  const [name, setName] = useState(user.name);
  const [notify, setNotify] = useState<Record<string, boolean>>({ verified: true, recommendations: true, replies: true, classes: false });
  const [saved, setSaved] = useState(false);

  function save() {
    // TODO (backend step): save the settings
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Account</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field id="settings-name" label="Display name">
            <TextInput id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field id="settings-email" label="Email" hint="This is the email you sign in with.">
            <TextInput id="settings-email" value={user.email} readOnly className="bg-surface text-muted" />
          </Field>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Email notifications</h2>
        <ul className="mt-4 divide-y divide-line">
          {NOTIFICATIONS.map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-semibold text-gada">{n.label}</p>
                <p className="text-sm text-muted">{n.hint}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notify[n.id]}
                aria-label={n.label}
                onClick={() => setNotify((s) => ({ ...s, [n.id]: !s[n.id] }))}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${notify[n.id] ? "bg-gada" : "bg-line"}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    notify[n.id] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
            <Check className="h-4 w-4" aria-hidden="true" /> Saved
          </span>
        )}
        <Button size="lg" onClick={save}>Save changes</Button>
      </div>

      <section className="rounded-3xl border border-red-200 bg-red-50/50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-red-700">Delete account</h2>
        <p className="mt-2 text-sm text-red-700/80">
          Permanently delete your profile and community posts. This can&rsquo;t be undone.
        </p>
        {/* TODO (backend step): confirm, then delete the account */}
        <Button variant="secondary" className="mt-4 border-red-200 text-red-700 hover:bg-red-50">
          Delete my account
        </Button>
      </section>
    </div>
  );
}
