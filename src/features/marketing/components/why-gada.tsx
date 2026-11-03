import Image from "next/image";
import { BadgeCheck, FolderKanban, HandCoins, UsersRound } from "lucide-react";
import creativityRoom from "@/assets/images/creativity-room.webp";
import { Container } from "@/components/ui/container";

const reasons = [
  {
    icon: FolderKanban,
    title: "Show your experience",
    text: "Your profile brings your skills and past projects together in one place, ready to share.",
  },
  {
    icon: UsersRound,
    title: "A verified community",
    text: "Only taskers verified by our team can join, so the advice is trustworthy and the space stays safe.",
  },
  {
    icon: BadgeCheck,
    title: "Honest matching",
    text: "We only recommend platforms that suit your skills and accept your country, with tips to help you apply.",
  },
  {
    icon: HandCoins,
    title: "Free, always",
    text: "Gada never charges taskers to join, get assessed or be recommended. You should never pay for a chance to work.",
  },
];


export function WhyGada({ headingAs: Heading = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section id="why-gada" className="scroll-mt-20 bg-surface py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-bridge-600">Why Gada</p>
          <Heading className="mt-3 text-3xl font-bold sm:text-4xl">More than a list of links</Heading>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="relative h-[26rem] overflow-hidden rounded-3xl border border-line sm:h-96 lg:h-auto lg:min-h-80">
            <Image
              src={creativityRoom}
              alt="A bright workspace with lightbulb wall art and the words Creativity starts here"
              placeholder="blur"
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover object-[center_35%]"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gada-50 text-gada">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
