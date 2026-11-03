"use client";

import { useState } from "react";
import { EyeOff, Eye, Flag, Pin, PinOff } from "lucide-react";
import type { ModerationPost } from "../mock-data";

export function ModerationList({ initial }: { initial: ModerationPost[] }) {
  const [posts, setPosts] = useState(initial);
  const [view, setView] = useState<"reported" | "all">("reported");

  const update = (id: string, patch: Partial<ModerationPost>) =>
    // TODO (backend step): save the change
    setPosts((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const shown =
    view === "reported" ? posts.filter((p) => p.reports > 0) : posts;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["reported", "all"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${view === v ? "bg-gada text-white" : "border border-line bg-white text-gada"}`}
          >
            {v === "reported"
              ? `Reported (${posts.filter((p) => p.reports > 0 && !p.hidden).length})`
              : "All posts"}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {shown.map((post) => (
          <li
            key={post.id}
            className={`rounded-3xl border bg-white p-5 ${post.hidden ? "border-dashed border-line opacity-60" : post.reports ? "border-red-200" : "border-line"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-gada">
                  {post.title}
                  {post.hidden && (
                    <span className="ml-2 text-xs font-semibold text-muted">
                      (hidden)
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {post.author} · {post.category} · {post.postedOn}
                </p>
                {post.reports > 0 && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                    <Flag className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                    {post.reports} reports
                    {post.reportReason && `: ${post.reportReason}`}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => update(post.id, { pinned: !post.pinned })}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-gada hover:bg-surface"
                >
                  {post.pinned ? (
                    <PinOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Pin className="h-4 w-4" aria-hidden="true" />
                  )}
                  {post.pinned ? "Unpin" : "Pin"}
                </button>
                <button
                  type="button"
                  onClick={() => update(post.id, { hidden: !post.hidden })}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${
                    post.hidden
                      ? "border border-line text-gada hover:bg-surface"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {post.hidden ? (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  )}
                  {post.hidden ? "Restore" : "Hide"}
                </button>
              </div>
            </div>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="rounded-3xl border border-dashed border-line bg-white p-10 text-center text-muted">
            Nothing reported. All clear!
          </li>
        )}
      </ul>
    </div>
  );
}
