import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { CommunityPost } from "../mock-data";
import { LockedOverlay } from "./locked-overlay";

const categoryStyles: Record<CommunityPost["category"], string> = {
  Wins: "bg-bridge-100 text-gada",
  "Platform tips": "bg-gada-50 text-gada",
  Questions: "bg-surface text-muted",
  "Getting started": "bg-surface text-muted",
};

export function CommunityPreview({ posts, locked }: { posts: CommunityPost[]; locked: boolean }) {
  return (
    <section className="relative rounded-3xl border border-line bg-white p-6 sm:p-8">
      {locked && (
        <LockedOverlay title="The community unlocks soon" text="Once you're verified, you can post, ask questions and learn with other taskers." />
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">From the community</h2>
        {!locked && (
          <Link href="/community" className="text-sm font-semibold text-gada underline">
            Open community
          </Link>
        )}
      </div>
      <ul className="mt-5 divide-y divide-line" aria-hidden={locked}>
        {posts.map((post) => (
          <li key={post.id} className="flex items-start gap-3 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gada text-xs font-bold text-white">
              {post.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gada">{post.title}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                <span className={`rounded-full px-2 py-0.5 font-semibold ${categoryStyles[post.category]}`}>{post.category}</span>
                {post.author} · {post.timeAgo}
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> {post.replies}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
