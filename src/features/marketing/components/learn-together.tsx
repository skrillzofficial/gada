import Image from "next/image";
import { Check, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import communityClass from "@/assets/images/community-class.webp";

const points = [
  "Live classes on getting started, passing assessments and doing quality work",
  "Ask questions and get answers from people who've done it before",
  "Share wins, from first approvals to first payouts",
];

export function LearnTogether() {
  return (
    <section id="community" className="scroll-mt-20 py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <figure>
          <div className="overflow-hidden rounded-3xl border border-line bg-[#202124] shadow-xl shadow-gada/10">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="ml-3 flex items-center gap-1.5 text-xs font-medium text-white/70">
                <Video className="h-3.5 w-3.5" aria-hidden="true" /> Live community class
              </span>
            </div>
            <Image
              src={communityClass}
              alt="A live online class with members of the Gada community"
              placeholder="blur"
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            One of our live community classes. Names are hidden for privacy.
          </figcaption>
        </figure>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-bridge-600">Learn together</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">You won&rsquo;t figure it out alone</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Behind Gada is a real, active community. We run live classes, answer questions and
            celebrate progress together, and verified taskers get full access.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-gada">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bridge">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <ButtonLink href="/sign-in" size="lg" className="mt-8">
            Join the community
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
