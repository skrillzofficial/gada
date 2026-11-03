import type { Metadata } from "next";
import Image from "next/image";
import { BookOpenCheck, ShieldCheck, Timer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Recommendations } from "@/features/dashboard/components/recommendations";
import { sampleRecommendations } from "@/features/dashboard/mock-data";
import deskBooks from "@/assets/images/desk-books.webp";

export const metadata: Metadata = { title: "Platforms" };

const tips = [
  { icon: BookOpenCheck, title: "Read the guidelines twice", text: "Most assessments test whether you followed the instructions, not how fast you were." },
  { icon: Timer, title: "Don't rush", text: "Accuracy matters more than speed. Take breaks between long tasks." },
  { icon: ShieldCheck, title: "Always use your own name", text: "Sign up yourself, with your real details. Shared or rented accounts get banned." },
];

export default function PlatformsPage() {
  // TODO (backend step): load this tasker's recommendations and lock the page until they're verified
  return (
    <Container className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">Platforms</h1>
        <p className="mt-2 text-muted">
          Platforms our team recommends for you. Update your progress as you go, so we can help where you get stuck.
        </p>
      </header>

      <Recommendations items={sampleRecommendations} locked={false} />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative min-h-72 overflow-hidden rounded-3xl lg:min-h-0">
          <Image
            src={deskBooks}
            alt="A tidy navy study desk with books and a gold pen holder"
            placeholder="blur"
            fill
            sizes="(min-width: 1024px) 440px, 100vw"
            className="object-cover object-[center_65%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gada-900/90 via-gada-900/30 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h2 className="text-2xl font-bold text-white">Before you apply</h2>
            <p className="mt-1 text-sm text-gada-100">A little preparation goes a long way.</p>
          </div>
        </div>
        <div className="space-y-4">
          {tips.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bridge-100 text-gada">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-gada">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
