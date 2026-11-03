import type { Metadata } from "next";
import { WhyGada } from "@/features/marketing/components/why-gada";
import { LearnTogether } from "@/features/marketing/components/learn-together";
import { CtaBand } from "@/features/marketing/components/cta-band";

export const metadata: Metadata = {
  title: "Why Gada",
  description: "A verified community, honest platform matching and a profile that shows your experience. Always free for taskers.",
};

export default function WhyGadaPage() {
  return (
    <>
      <WhyGada headingAs="h1" />
      <LearnTogether />
      <CtaBand />
    </>
  );
}
