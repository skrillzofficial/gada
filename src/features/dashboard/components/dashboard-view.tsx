"use client";

import { useState } from "react";
import Image from "next/image";
import laptopWork from "@/assets/images/laptop-work.webp";
import { Hand } from "lucide-react";
import { CompletenessCard } from "./completeness-card";
import { CommunityPreview } from "./community-preview";
import { Recommendations } from "./recommendations";
import { StatusTracker } from "./status-tracker";
import {
  samplePosts,
  sampleProfile,
  sampleRecommendations,
  type ReviewStatus,
} from "../mock-data";

export function DashboardView() {
  // TODO (backend step): load the signed-in tasker's profile, status and recommendations
  const [status, setStatus] = useState<ReviewStatus>("pending_review");
  const profile = sampleProfile;
  const firstName = profile.fullName.split(" ")[0];
  const locked = status !== "verified";

  return (
    <div className="space-y-6">
      {process.env.NODE_ENV === "development" && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-gada-200 bg-white p-3 text-sm">
          <span className="font-semibold text-muted">Preview (dev only):</span>
          {(["pending_review", "verified"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={status === s}
              className={`rounded-full px-3 py-1 font-semibold ${status === s ? "bg-gada text-white" : "bg-surface text-gada"}`}
            >
              {s === "pending_review" ? "Under review" : "Verified"}
            </button>
          ))}
        </div>
      )}

      <header className="relative overflow-hidden rounded-3xl bg-gada">
        <div className="relative z-10 p-6 sm:p-10 md:max-w-[60%]">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-white sm:text-4xl">
            Hi, {firstName}
            <Hand className="h-8 w-8 text-bridge" aria-hidden="true" />
          </h1>
          <p className="mt-3 leading-relaxed text-gada-100">
            {locked
              ? "Your profile is with our team. Here's what's happening and what you can do meanwhile."
              : "You're verified! Your platform recommendations are ready below."}
          </p>
        </div>
        {/* Photo on wider screens only, to keep the page light on mobile data */}
        <div className="absolute inset-y-0 right-0 hidden w-2/5 md:block" aria-hidden="true">
          <Image
            src={laptopWork}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 40vw, 0px"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gada via-gada/40 to-transparent" />
        </div>
      </header>

      <StatusTracker status={status} />

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <CompletenessCard profile={profile} />
        <CommunityPreview posts={samplePosts} locked={locked} />
      </div>

      <Recommendations items={sampleRecommendations} locked={locked} />
    </div>
  );
}
