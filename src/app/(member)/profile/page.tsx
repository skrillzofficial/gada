import type { Metadata } from "next";
import {
  Clock,
  ExternalLink,
  Languages,
  MapPin,
  Pencil,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { sampleProfile } from "@/features/dashboard/mock-data";

export const metadata: Metadata = { title: "My profile" };

function formatMonth(value: string) {
  if (!value) return "Present";
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function ProfilePage() {
  // TODO (backend step): load the signed-in tasker's saved profile
  const p = sampleProfile;
  const initials = p.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <Container className="space-y-6">
      {/* Header card */}
      <section className="overflow-hidden rounded-3xl border border-line bg-white">
        <div className="relative h-32 overflow-hidden bg-gada sm:h-40">
          <div className="absolute -bottom-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-t-full border-[12px] border-b-0 border-bridge/40" />
        </div>
        <div className="px-6 pb-6 sm:px-8">
          <div className="relative z-10 -mt-12 flex flex-wrap items-end justify-between gap-4">
            <span className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gada font-display text-3xl font-bold text-white">
              {initials}
            </span>
            <ButtonLink href="/onboarding" variant="secondary">
              <Pencil className="h-4 w-4" aria-hidden="true" /> Edit profile
            </ButtonLink>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold">{p.fullName}</h1>
            <span className="rounded-full bg-bridge-100 px-3 py-1 text-xs font-semibold text-gada">
              Under review
            </span>
          </div>
          <p className="mt-1 text-lg text-muted">{p.headline}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {p.city},{" "}
              {p.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> {p.hoursPerWeek}{" "}
              hrs / week
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" aria-hidden="true" /> {p.experience}
            </span>
            <span className="flex items-center gap-1.5">
              <Languages className="h-4 w-4" aria-hidden="true" />{" "}
              {p.languages.join(", ")}
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-gada-800">
              {p.bio}
            </p>
          </section>

          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Past projects</h2>
            <ul className="mt-4 space-y-5">
              {p.projects.map((project) => (
                <li key={project.id} className="border-l-4 border-bridge pl-4">
                  <p className="font-semibold text-gada">{project.title}</p>
                  <p className="text-sm text-muted">
                    {project.workType}
                    {project.organisation &&
                      ` · ${project.organisation}`} ·{" "}
                    {formatMonth(project.startMonth)} –{" "}
                    {formatMonth(project.endMonth)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gada-800">
                    {project.description}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gada underline"
                    >
                      View project <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Skills</h2>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
            Kinds of work
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.workTypes.map((w) => (
              <span
                key={w}
                className="rounded-full bg-gada px-3 py-1.5 text-xs font-semibold text-white"
              >
                {w}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">
            Subjects
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.subjects.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-gada"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
