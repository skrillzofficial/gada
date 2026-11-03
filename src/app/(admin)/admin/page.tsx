import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Compass,
  Flag,
} from "lucide-react";
import { StatusBadge } from "@/features/admin/components/status-badge";
import {
  adminPlatforms,
  adminTaskers,
  moderationPosts,
} from "@/features/admin/mock-data";

export default function AdminOverviewPage() {
  const pending = adminTaskers.filter((t) => t.status === "pending_review");
  const stats = [
    {
      label: "Waiting for review",
      value: pending.length,
      icon: ClipboardCheck,
      href: "/admin/reviews",
      highlight: true,
    },
    {
      label: "Verified taskers",
      value: adminTaskers.filter((t) => t.status === "verified").length,
      icon: BadgeCheck,
      href: "/admin/taskers",
    },
    {
      label: "Active platforms",
      value: adminPlatforms.filter((p) => p.active).length,
      icon: Compass,
      href: "/admin/platforms",
    },
    {
      label: "Reported posts",
      value: moderationPosts.filter((p) => p.reports > 0 && !p.hidden).length,
      icon: Flag,
      href: "/admin/community",
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="mt-1 text-muted">
          What needs your team&rsquo;s attention today.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href, highlight }) => (
          <Link
            key={label}
            href={href}
            className={`group rounded-3xl border p-6 transition hover:-translate-y-0.5 hover:shadow-md ${
              highlight
                ? "border-transparent bg-gada text-white"
                : "border-line bg-white"
            }`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${highlight ? "bg-bridge text-gada" : "bg-gada-50 text-gada"}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p
              className={`mt-5 font-display text-4xl font-bold ${highlight ? "text-white" : "text-gada"}`}
            >
              {value}
            </p>
            <p
              className={`mt-1 text-sm ${highlight ? "text-gada-200" : "text-muted"}`}
            >
              {label}
            </p>
          </Link>
        ))}
      </div>

      <section className="rounded-3xl border border-line bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest submissions</h2>
          <Link
            href="/admin/reviews"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gada underline"
          >
            Open queue <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {adminTaskers.slice(0, 5).map((t) => (
            <li key={t.id} className="flex flex-wrap items-center gap-3 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gada text-xs font-bold text-white">
                {t.profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gada">{t.profile.fullName}</p>
                <p className="truncate text-sm text-muted">
                  {t.profile.headline}
                </p>
              </div>
              <span className="text-xs text-muted">{t.submittedOn}</span>
              <StatusBadge status={t.status} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
