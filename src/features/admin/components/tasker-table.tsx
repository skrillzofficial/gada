"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { AdminTasker, TaskerStatus } from "../mock-data";
import { StatusBadge } from "./status-badge";

const FILTERS: { label: string; value: TaskerStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending_review" },
  { label: "Changes requested", value: "changes_requested" },
  { label: "Verified", value: "verified" },
  { label: "Rejected", value: "rejected" },
];

export function TaskerTable({ taskers }: { taskers: AdminTasker[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TaskerStatus | "all">("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return taskers.filter((t) => {
      const matchesStatus = status === "all" || t.status === status;
      const text =
        `${t.profile.fullName} ${t.email} ${t.profile.city} ${t.profile.workTypes.join(" ")}`.toLowerCase();
      return matchesStatus && (!q || text.includes(q));
    });
  }, [taskers, query, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block sm:w-80">
          <span className="sr-only">Search taskers</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, city or skill"
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-9 pr-3 text-sm text-gada outline-none focus:border-gada focus:ring-4 focus:ring-gada-100"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={status === f.value}
              onClick={() => setStatus(f.value)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${
                status === f.value
                  ? "bg-gada text-white"
                  : "border border-line bg-white text-gada"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                Tasker
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Location
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Work
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Level
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Status
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((t) => (
              <tr key={t.id} className="hover:bg-surface/60">
                <td className="px-5 py-4">
                  <p className="font-semibold text-gada">
                    {t.profile.fullName}
                  </p>
                  <p className="text-xs text-muted">{t.email}</p>
                </td>
                <td className="px-5 py-4 text-muted">{t.profile.city}</td>
                <td className="px-5 py-4 text-muted">
                  {t.profile.workTypes.slice(0, 2).join(", ")}
                </td>
                <td className="px-5 py-4 text-gada">{t.level ?? "—"}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/reviews/${t.id}`}
                    className="font-semibold text-gada underline"
                  >
                    {t.status === "pending_review" ? "Review" : "View"}
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted">
                  No taskers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted">
        {rows.length} of {taskers.length} taskers
      </p>
    </div>
  );
}
