import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Languages,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { profileCompleteness } from "@/features/profiles/completeness";
import { ReviewPanel } from "@/features/admin/components/review-panel";
import { StatusBadge } from "@/features/admin/components/status-badge";
import {
  adminPlatforms,
  adminTaskers,
  findTasker,
} from "@/features/admin/mock-data";

export const metadata: Metadata = { title: "Review tasker" };

// Sample data: pre-build a page for each sample tasker
export function generateStaticParams() {
  return adminTaskers.map((t) => ({ id: t.id }));
}

export default async function ReviewTaskerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tasker = findTasker(id);
  if (!tasker) notFound();
  const p = tasker.profile;
  const { percent, items } = profileCompleteness(p);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/reviews"
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-gada"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Review queue
      </Link>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:items-start">
        {/* The tasker's profile */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-start gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gada text-xl font-bold text-white">
                {p.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    {p.fullName}
                  </h1>
                  <StatusBadge status={tasker.status} />
                </div>
                <p className="mt-1 text-muted">{p.headline}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" /> {tasker.email}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {p.city},{" "}
                {p.country}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />{" "}
                {p.hoursPerWeek} hrs / week
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" aria-hidden="true" />{" "}
                {p.experience}
              </span>
              <span className="flex items-center gap-2">
                <Languages className="h-4 w-4" aria-hidden="true" />{" "}
                {p.languages.join(", ")}
              </span>
            </div>
            <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">
              Bio
            </h2>
            <p className="mt-2 leading-relaxed text-gada-800">{p.bio}</p>
            <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">
              Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {[...p.workTypes, ...p.subjects].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-gada-50 px-3 py-1 text-xs font-semibold text-gada"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Past projects</h2>
            {p.projects.length ? (
              <ul className="mt-4 space-y-4">
                {p.projects.map((project) => (
                  <li
                    key={project.id}
                    className="border-l-4 border-bridge pl-4"
                  >
                    <p className="font-semibold text-gada">{project.title}</p>
                    <p className="text-sm text-muted">
                      {project.workType}
                      {project.organisation && ` · ${project.organisation}`}
                    </p>
                    <p className="mt-1 text-sm text-gada-800">
                      {project.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-muted">
                No projects yet. This tasker is starting out.
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              Profile strength: {percent}%
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {items.map((item) => (
                <li
                  key={item.label}
                  className={
                    item.done ? "text-muted line-through" : "text-gada"
                  }
                >
                  {item.done ? "✓" : "○"} {item.label}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Assessment */}
        <ReviewPanel
          taskerName={p.fullName.split(" ")[0]}
          taskerWorkTypes={p.workTypes}
          platforms={adminPlatforms.filter((pl) => pl.active)}
        />
      </div>
    </div>
  );
}
