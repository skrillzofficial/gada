import type { Metadata } from "next";
import { HowItWorks } from "@/features/marketing/components/how-it-works";
import { WorkPaths } from "@/features/marketing/components/work-paths";
import { CtaBand } from "@/features/marketing/components/cta-band";

export const metadata: Metadata = {
  title: "How it works",
  description: "Create your profile, get assessed, join the community and get matched to AI-training platforms.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorks headingAs="h1" />
      <WorkPaths />
      <div className="pt-20">
        <CtaBand />
      </div>
    </>
  );
}
