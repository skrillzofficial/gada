import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/features/marketing/components/hero";
import { HowItWorks } from "@/features/marketing/components/how-it-works";
import { WhyGada } from "@/features/marketing/components/why-gada";
import { LearnTogether } from "@/features/marketing/components/learn-together";
import { WorkPaths } from "@/features/marketing/components/work-paths";
import { Faq } from "@/features/marketing/components/faq";
import { CtaBand } from "@/features/marketing/components/cta-band";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <WorkPaths />
        <WhyGada />
        <LearnTogether />
        <Faq />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
