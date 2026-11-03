import type { Metadata } from "next";
import { WorkPaths } from "@/features/marketing/components/work-paths";
import { CtaBand } from "@/features/marketing/components/cta-band";

export const metadata: Metadata = {
  title: "Paths you can grow into",
  description: "AI response rating, annotation, transcription, translation, expert review and more. Find the work that fits you.",
};

export default function PathsPage() {
  return (
    <>
      <WorkPaths headingAs="h1" />
      <div className="pt-20">
        <CtaBand />
      </div>
    </>
  );
}
