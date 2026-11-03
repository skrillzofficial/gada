import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HelpList } from "@/features/help/components/help-list";
import { SUPPORT_EMAIL, memberHelp } from "@/features/help/help-content";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl space-y-8">
        <header>
          <h1 className="text-3xl font-bold sm:text-4xl">Help</h1>
          <p className="mt-2 text-muted">Answers to the questions taskers ask us most.</p>
        </header>
        <HelpList items={memberHelp} />
        <section className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-gada p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Still need help?</h2>
            <p className="mt-1 text-sm text-gada-200">Our team usually replies within a day.</p>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-xl bg-bridge px-5 py-3 text-sm font-semibold text-gada hover:bg-bridge-600"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> Email the Gada team
          </a>
        </section>
      </div>
    </Container>
  );
}
