import type { Metadata } from "next";
import { Faq } from "@/features/marketing/components/faq";
import { CtaBand } from "@/features/marketing/components/cta-band";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about joining Gada, assessment, the community and platform referrals.",
};

export default function FaqPage() {
  return (
    <>
      <Faq headingAs="h1" />
      <CtaBand />
    </>
  );
}
