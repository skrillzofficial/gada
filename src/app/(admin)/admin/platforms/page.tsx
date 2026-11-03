import type { Metadata } from "next";
import { PlatformManager } from "@/features/admin/components/platform-manager";
import { adminPlatforms } from "@/features/admin/mock-data";

export const metadata: Metadata = { title: "Platforms" };

export default function AdminPlatformsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Platforms</h1>
        <p className="mt-1 text-muted">
          The platforms your team recommends. Hidden platforms can&rsquo;t be
          matched to new taskers.
        </p>
      </header>
      <PlatformManager initial={adminPlatforms} />
    </div>
  );
}
