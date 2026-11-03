"use client";

import { useState } from "react";
import { Briefcase, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/field";
import {
  WORK_TYPES,
  projectSchema,
  toFieldErrors,
  type FieldErrors,
  type ProfileDraft,
  type Project,
  type ProjectDraft,
} from "../schema";

type StepProps = {
  draft: ProfileDraft;
  update: (patch: Partial<ProfileDraft>) => void;
  errors: FieldErrors;
};

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const blankProject = (): ProjectDraft => ({
  id: newId(),
  title: "",
  workType: "",
  organisation: "",
  description: "",
  startMonth: "",
  endMonth: "",
  link: "",
});

function formatMonth(value: string) {
  if (!value) return "Present";
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function StepProjects({ draft, update, errors }: StepProps) {
  const [editing, setEditing] = useState<ProjectDraft | null>(null);

  function saveProject(project: Project) {
    const exists = draft.projects.some((p) => p.id === project.id);
    update({
      projects: exists
        ? draft.projects.map((p) => (p.id === project.id ? project : p))
        : [...draft.projects, project],
      noProjects: false,
    });
    setEditing(null);
  }

  function removeProject(id: string) {
    update({ projects: draft.projects.filter((p) => p.id !== id) });
  }

  return (
    <div className="space-y-6">
      <p className="text-muted">
        Add AI-training work, data projects, research or any other relevant work. Real examples help
        our team understand your strengths.
      </p>

      {draft.projects.length > 0 && (
        <ul className="space-y-3">
          {draft.projects.map((project) => (
            <li key={project.id} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-gada">{project.title}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {project.workType}
                    {project.organisation && ` · ${project.organisation}`} ·{" "}
                    {formatMonth(project.startMonth)} – {formatMonth(project.endMonth)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => setEditing(project)}
                    className="rounded-lg p-2 text-muted hover:bg-surface hover:text-gada"
                    aria-label={`Edit ${project.title}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${project.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gada-800">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gada underline"
                >
                  View project <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {editing ? (
        <ProjectForm initial={editing} onSave={saveProject} onCancel={() => setEditing(null)} />
      ) : (
        <button
          type="button"
          onClick={() => setEditing(blankProject())}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gada-200 px-4 py-6 font-semibold text-gada transition hover:border-gada hover:bg-gada-50"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          {draft.projects.length ? "Add another project" : "Add a project"}
        </button>
      )}

      {draft.projects.length === 0 && !editing && (
        <label className="flex items-center gap-3 rounded-xl bg-surface p-4 text-sm text-gada">
          <input
            type="checkbox"
            checked={draft.noProjects}
            onChange={(e) => update({ noProjects: e.target.checked })}
            className="h-5 w-5 accent-[var(--color-gada)]"
          />
          I haven&rsquo;t worked on any projects yet. That&rsquo;s fine: everyone starts somewhere.
        </label>
      )}

      {errors.projects && <p className="text-sm text-red-600">{errors.projects}</p>}
    </div>
  );
}

function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: ProjectDraft;
  onSave: (project: Project) => void;
  onCancel: () => void;
}) {
  const [project, setProject] = useState<ProjectDraft>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});

  function set(patch: Partial<ProjectDraft>) {
    setProject((p) => ({ ...p, ...patch }));
  }

  function handleSave() {
    const result = projectSchema.safeParse(project);
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    onSave(result.data);
  }

  return (
    <div className="space-y-5 rounded-2xl border border-gada-200 bg-gada-50/40 p-5 sm:p-6">
      <p className="flex items-center gap-2 font-display text-lg font-semibold text-gada">
        <Briefcase className="h-5 w-5" aria-hidden="true" />
        {initial.title ? "Edit project" : "New project"}
      </p>

      <Field id="p-title" label="Project title" error={errors.title}>
        <TextInput
          id="p-title"
          value={project.title}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="e.g. Rating chatbot answers in Yoruba"
          error={errors.title}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="p-type" label="Kind of work" error={errors.workType}>
          <Select
            id="p-type"
            options={WORK_TYPES}
            placeholder="Choose…"
            value={project.workType}
            onChange={(e) => set({ workType: e.target.value })}
            error={errors.workType}
          />
        </Field>
        <Field id="p-org" label="Platform or organisation (optional)" error={errors.organisation}>
          <TextInput
            id="p-org"
            value={project.organisation}
            onChange={(e) => set({ organisation: e.target.value })}
            error={errors.organisation}
          />
        </Field>
      </div>

      <Field id="p-desc" label="What did you do?" error={errors.description}>
        <TextArea
          id="p-desc"
          maxLength={400}
          value={project.description}
          onChange={(e) => set({ description: e.target.value })}
          placeholder="Your tasks, the tools or guidelines you used, and any results (e.g. quality scores)."
          error={errors.description}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="p-start" label="Started" error={errors.startMonth}>
          <TextInput
            id="p-start"
            type="month"
            value={project.startMonth}
            onChange={(e) => set({ startMonth: e.target.value })}
            error={errors.startMonth}
          />
        </Field>
        <Field id="p-end" label="Finished" hint="Leave empty if you're still working on it." error={errors.endMonth}>
          <TextInput
            id="p-end"
            type="month"
            value={project.endMonth}
            onChange={(e) => set({ endMonth: e.target.value })}
            error={errors.endMonth}
          />
        </Field>
      </div>

      <Field id="p-link" label="Link (optional)" hint="A certificate, portfolio or LinkedIn post." error={errors.link}>
        <TextInput
          id="p-link"
          type="url"
          inputMode="url"
          value={project.link}
          onChange={(e) => set({ link: e.target.value })}
          placeholder="https://"
          error={errors.link}
        />
      </Field>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save project</Button>
      </div>
    </div>
  );
}
