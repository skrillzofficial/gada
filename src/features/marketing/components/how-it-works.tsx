import Image from "next/image";
import { BadgeCheck, Compass, UserRound, UsersRound } from "lucide-react";
import presenterIllustration from "@/assets/images/presenter-illustration.webp";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

const steps = [
  {
    icon: UserRound,
    title: "Create your profile",
    text: "Tell us about yourself: your skills, subjects, languages and the projects you've worked on before.",
  },
  {
    icon: BadgeCheck,
    title: "Get assessed",
    text: "The Gada team reviews your profile and experience, then gives you a level and your Verified badge.",
  },
  {
    icon: UsersRound,
    title: "Join the community",
    text: "Ask questions, share tips and celebrate wins with other verified taskers who are on the same journey.",
  },
  {
    icon: Compass,
    title: "Get matched to platforms",
    text: "We recommend AI-training platforms that suit your profile and accept your country. You sign up under your own name.",
  },
];

export function HowItWorks({ headingAs: Heading = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-bridge-600">How it works</p>
            <Heading className="mt-3 text-3xl font-bold sm:text-4xl">From profile to platform in four steps</Heading>
            <p className="mt-4 text-lg text-muted">
              Whether you&rsquo;re just starting out or already experienced, Gada helps you find your
              next step, and you never have to figure it out alone.
            </p>
          </div>
          <div className="mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-line bg-[#e6dcd3] md:max-w-sm">
            <Image
              src={presenterIllustration}
              alt="Illustration of a trainer guiding a group of learners"
              placeholder="blur"
              sizes="(min-width: 768px) 384px, 320px"
              className="h-auto w-full"
            />
          </div>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative rounded-3xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gada text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-3xl font-bold text-gada-100">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <ButtonLink href="/sign-in" size="lg">
            Create your profile
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
