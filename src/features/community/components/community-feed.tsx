"use client";

import { useState } from "react";
import { BadgeCheck, Heart, MessageCircle, Pin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/field";
import { POST_CATEGORIES, type CommunityPost, type PostCategory } from "@/features/dashboard/mock-data";

const FILTERS = ["All", ...POST_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

const categoryStyles: Record<PostCategory, string> = {
  Wins: "bg-bridge-100 text-gada",
  "Platform tips": "bg-gada-50 text-gada",
  Questions: "bg-surface text-muted",
  "Getting started": "bg-surface text-muted",
};

export function CommunityFeed({ initialPosts, me }: { initialPosts: CommunityPost[]; me: { name: string; initials: string } }) {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState<Filter>("All");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState({ category: "", title: "", body: "" });
  const [error, setError] = useState<string | null>(null);

  const visible = posts.filter((p) => filter === "All" || p.category === filter);

  function toggleLike(id: string) {
    setLiked((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function publish() {
    if (!draft.category || draft.title.trim().length < 5 || draft.body.trim().length < 10) {
      setError("Choose a category and write a title (5+ characters) and a message (10+ characters).");
      return;
    }
    // TODO (backend step): save the post
    const post: CommunityPost = {
      id: `new-${Date.now()}`,
      author: me.name,
      initials: me.initials,
      category: draft.category as PostCategory,
      title: draft.title.trim(),
      body: draft.body.trim(),
      replies: 0,
      likes: 0,
      timeAgo: "Just now",
    };
    const [pinned, ...rest] = posts;
    setPosts(pinned?.pinned ? [pinned, post, ...rest] : [post, ...posts]);
    setDraft({ category: "", title: "", body: "" });
    setComposing(false);
    setError(null);
  }

  return (
    <div className="space-y-5">
      {/* Composer */}
      <div className="rounded-3xl border border-line bg-white p-5">
        {composing ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
              <Field id="post-category" label="Category">
                <Select
                  id="post-category"
                  options={POST_CATEGORIES}
                  placeholder="Choose…"
                  value={draft.category}
                  onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                />
              </Field>
              <Field id="post-title" label="Title">
                <TextInput
                  id="post-title"
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  placeholder="What's on your mind?"
                />
              </Field>
            </div>
            <Field id="post-body" label="Message">
              <TextArea
                id="post-body"
                value={draft.body}
                onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
                placeholder="Ask a question, share a tip or celebrate a win…"
              />
            </Field>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setComposing(false)}>
                Cancel
              </Button>
              <Button onClick={publish}>
                <Send className="h-4 w-4" aria-hidden="true" /> Post
              </Button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setComposing(true)} className="flex w-full items-center gap-3 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gada text-xs font-bold text-white">
              {me.initials}
            </span>
            <span className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-muted hover:border-gada-300">
              Ask a question or share something…
            </span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0" role="tablist" aria-label="Filter posts">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === f ? "bg-gada text-white" : "border border-line bg-white text-gada hover:border-gada-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Posts */}
      <ul className="space-y-4">
        {visible.map((post) => {
          const isLiked = liked.has(post.id);
          return (
            <li
              key={post.id}
              className={`rounded-3xl border bg-white p-5 sm:p-6 ${post.pinned ? "border-bridge" : "border-line"}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    post.fromTeam ? "bg-bridge text-gada" : "bg-gada text-white"
                  }`}
                >
                  {post.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 text-sm font-semibold text-gada">
                    {post.author}
                    <BadgeCheck className="h-4 w-4 text-bridge-600" aria-label="Verified" />
                  </p>
                  <p className="text-xs text-muted">{post.timeAgo}</p>
                </div>
                {post.pinned ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-bridge-100 px-2.5 py-1 text-xs font-semibold text-gada">
                    <Pin className="h-3 w-3" aria-hidden="true" /> Pinned
                  </span>
                ) : (
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[post.category]}`}>
                    {post.category}
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-lg font-semibold">{post.title}</h2>
              {post.body && <p className="mt-2 text-sm leading-relaxed text-gada-800">{post.body}</p>}
              <div className="mt-4 flex gap-2 border-t border-line pt-3 text-sm">
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  aria-pressed={isLiked}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition ${
                    isLiked ? "bg-red-50 text-red-600" : "text-muted hover:bg-surface hover:text-gada"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} aria-hidden="true" />
                  {(post.likes ?? 0) + (isLiked ? 1 : 0)}
                </button>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-muted">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> {post.replies} replies
                </span>
              </div>
            </li>
          );
        })}
        {visible.length === 0 && (
          <li className="rounded-3xl border border-dashed border-line bg-white p-10 text-center text-muted">
            No posts in this category yet. Be the first!
          </li>
        )}
      </ul>
    </div>
  );
}
