import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";

const faqs = [
  {
    q: "Is Gada free?",
    a: "Yes. Creating a profile, getting assessed, joining the community and receiving recommendations are all free.",
  },
  {
    q: "Who can join the community?",
    a: "Only taskers verified by the Gada team. You can create your profile straight away, and the community opens once your profile has been reviewed.",
  },
  {
    q: "How does the assessment work?",
    a: "Our team reviews your profile, skills and past projects, and may ask you a few questions. You then receive a level and, when you're ready, your Verified badge.",
  },
  {
    q: "I'm new to AI training. Can I join?",
    a: "Yes. Many of our taskers started as beginners. Fill in your profile honestly and we'll recommend the right first steps for you.",
  },
  {
    q: "Does Gada guarantee I'll be accepted or earn money?",
    a: "No. Each platform makes its own decisions, and work can vary from week to week. We recommend platforms where you have a good chance and help you prepare, but we can't promise results.",
  },
  {
    q: "Why do some Apply buttons use referral links?",
    a: "Some platforms give Gada a referral bonus when someone we recommend signs up. It costs you nothing, never reduces your pay, and we only recommend platforms we believe suit you.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-bridge-600">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Questions, answered</h2>
        </div>
        <div className="divide-y divide-line rounded-2xl border border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gada [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
