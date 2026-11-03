import type { Metadata } from "next";
import { LearnTogether } from "@/features/marketing/components/learn-together";
import { CtaBand } from "@/features/marketing/components/cta-band";

export const metadata: Metadata = {
  title: "Our community",
  description: "Live classes, answers from people who've done it before, and a verified community of African taskers.",
};

export default function OurCommunityPage() {
  return (
    <>
      <LearnTogether headingAs="h1" />
      <CtaBand />
    </>
  );
}
