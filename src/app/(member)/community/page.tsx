import type { Metadata } from "next";
import { CalendarDays, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CommunityFeed } from "@/features/community/components/community-feed";
import { sampleFeed } from "@/features/dashboard/mock-data";

export const metadata: Metadata = { title: "Community" };

const guidelines = [
  "Be kind and patient: everyone started somewhere.",
  "Share what you've learnt, not confidential task content.",
  "Never sell, rent or share platform accounts.",
  "Never ask members for money.",
];

export default function CommunityPage() {
  // TODO (backend step): only verified taskers can open this page
  return (
    <Container>
      <header className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Community</h1>
        <p className="mt-2 text-muted">Ask questions, share tips and celebrate wins with verified taskers.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <CommunityFeed initialPosts={sampleFeed} me={{ name: "Maris Okafor", initials: "MO" }} />

        <aside className="space-y-5 lg:sticky lg:top-24">
          <section className="rounded-3xl bg-gada p-6 text-white">
            <p className="flex items-center gap-2 text-sm font-semibold text-bridge">
              <Video className="h-4 w-4" aria-hidden="true" /> Next live class
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">Passing your first assessment</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-gada-200">
              <CalendarDays className="h-4 w-4" aria-hidden="true" /> Saturday, 7:00 pm (WAT) on Google Meet
            </p>
            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-bridge px-4 py-2.5 text-sm font-semibold text-gada hover:bg-bridge-600"
            >
              Remind me
            </button>
          </section>

          <section className="rounded-3xl border border-line bg-white p-6">
            <h2 className="text-lg font-semibold">Community guidelines</h2>
            <ul className="mt-4 space-y-3 text-sm text-gada-800">
              {guidelines.map((g, i) => (
                <li key={g} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gada-50 text-xs font-bold text-gada">
                    {i + 1}
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </Container>
  );
}
