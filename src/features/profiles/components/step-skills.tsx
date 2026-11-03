"use client";

import { ChipSelect } from "@/components/ui/chip-select";
import { Field, Select } from "@/components/ui/field";
import {
  EXPERIENCE_LEVELS,
  HOURS_PER_WEEK,
  LANGUAGES,
  SUBJECTS,
  WORK_TYPES,
  type FieldErrors,
  type ProfileDraft,
} from "../schema";

type StepProps = {
  draft: ProfileDraft;
  update: (patch: Partial<ProfileDraft>) => void;
  errors: FieldErrors;
};

export function StepSkills({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <ChipSelect
        label="Kinds of work you can do"
        hint="Choose everything you've done or feel ready to do."
        options={WORK_TYPES}
        value={draft.workTypes}
        onChange={(workTypes) => update({ workTypes })}
        error={errors.workTypes}
      />
      <ChipSelect
        label="Subjects you know well (optional)"
        hint="Subject knowledge opens up better-paid expert work."
        options={SUBJECTS}
        value={draft.subjects}
        onChange={(subjects) => update({ subjects })}
        error={errors.subjects}
      />
      <ChipSelect
        label="Languages you speak fluently"
        options={LANGUAGES}
        value={draft.languages}
        onChange={(languages) => update({ languages })}
        error={errors.languages}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="hoursPerWeek" label="Hours you can work each week" error={errors.hoursPerWeek}>
          <Select
            id="hoursPerWeek"
            options={HOURS_PER_WEEK}
            placeholder="Choose…"
            value={draft.hoursPerWeek}
            onChange={(e) => update({ hoursPerWeek: e.target.value })}
            error={errors.hoursPerWeek}
          />
        </Field>
        <Field id="experience" label="Experience with AI-training work" error={errors.experience}>
          <Select
            id="experience"
            options={EXPERIENCE_LEVELS}
            placeholder="Choose…"
            value={draft.experience}
            onChange={(e) => update({ experience: e.target.value })}
            error={errors.experience}
          />
        </Field>
      </div>
    </div>
  );
}
