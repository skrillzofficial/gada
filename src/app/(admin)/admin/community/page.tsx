import type { Metadata } from "next";
import { ModerationList } from "@/features/admin/components/moderation-list";
import { moderationPosts } from "@/features/admin/mock-data";

export const metadata: Metadata = { title: "Community moderation" };

export default function AdminCommunityPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="mt-1 text-muted">
          Review reported posts, hide anything harmful and pin important
          announcements.
        </p>
      </header>
      <ModerationList initial={moderationPosts} />
    </div>
  );
}
