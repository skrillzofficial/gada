"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";
import { Field, TextArea, TextInput } from "@/components/ui/field";
import type { FieldErrors, ProfileDraft } from "../schema";

type StepProps = {
  draft: ProfileDraft;
  update: (patch: Partial<ProfileDraft>) => void;
  errors: FieldErrors;
};

export function StepAbout({ draft, update, errors }: StepProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (draft.photoUrl) URL.revokeObjectURL(draft.photoUrl);
    // TODO (backend step): upload the file and save its URL
    update({ photoUrl: URL.createObjectURL(file) });
  }

  const initials = draft.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="group relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-gada font-display text-2xl font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge"
          aria-label="Upload a profile photo"
        >
          {draft.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- local preview of a file the user picked
            <img src={draft.photoUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initials || <Camera className="h-7 w-7" aria-hidden="true" />
          )}
          <span className="absolute inset-x-0 bottom-0 bg-black/50 py-1 text-[11px] font-medium opacity-0 transition group-hover:opacity-100">
            Change
          </span>
        </button>
        <div>
          <p className="font-semibold text-gada">Profile photo</p>
          <p className="mt-1 text-sm text-muted">A clear photo of your face helps our team verify you.</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-2 text-sm font-semibold text-gada underline"
          >
            {draft.photoUrl ? "Change photo" : "Upload photo"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </div>
      </div>

      <Field id="fullName" label="Full name" hint="Use the name on your ID. Platforms will check it." error={errors.fullName}>
        <TextInput
          id="fullName"
          autoComplete="name"
          value={draft.fullName}
          onChange={(e) => update({ fullName: e.target.value })}
          error={errors.fullName}
        />
      </Field>

      <Field
        id="headline"
        label="Headline"
        hint="One line about you, e.g. “Biology graduate and AI response rater”"
        error={errors.headline}
      >
        <TextInput
          id="headline"
          maxLength={80}
          value={draft.headline}
          onChange={(e) => update({ headline: e.target.value })}
          error={errors.headline}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="city" label="City" error={errors.city}>
          <TextInput
            id="city"
            autoComplete="address-level2"
            value={draft.city}
            onChange={(e) => update({ city: e.target.value })}
            error={errors.city}
          />
        </Field>
        <Field id="country" label="Country" error={errors.country}>
          <TextInput
            id="country"
            autoComplete="country-name"
            value={draft.country}
            onChange={(e) => update({ country: e.target.value })}
            error={errors.country}
          />
        </Field>
      </div>

      <Field
        id="bio"
        label="About you"
        hint={`${draft.bio.trim().length}/500 · Your background, what you're good at and what you're looking for.`}
        error={errors.bio}
      >
        <TextArea
          id="bio"
          maxLength={500}
          value={draft.bio}
          onChange={(e) => update({ bio: e.target.value })}
          error={errors.bio}
          placeholder="e.g. I'm a biology graduate from Ibadan. I've been rating AI responses for six months and I'm careful, detail-oriented and quick to learn new guidelines…"
        />
      </Field>
    </div>
  );
}
