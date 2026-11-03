import { Hero } from "@/features/marketing/components/hero";
import { HowItWorks } from "@/features/marketing/components/how-it-works";
import { WorkPaths } from "@/features/marketing/components/work-paths";
import { WhyGada } from "@/features/marketing/components/why-gada";
import { LearnTogether } from "@/features/marketing/components/learn-together";
import { Faq } from "@/features/marketing/components/faq";
import { CtaBand } from "@/features/marketing/components/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WorkPaths />
      <WhyGada />
      <LearnTogether />
      <Faq />
      <CtaBand />
    </>
  );
}
