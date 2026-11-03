import { ArrowUpRight, Check, Globe2, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge, VerifiedBadge } from "@/components/ui/badge";

const trustPoints = ["Free to join", "Verified community", "Work under your own name"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gada-50/70 to-white">
      <Container className="grid items-center gap-14 py-16 md:grid-cols-2 md:py-24">
        <div>
          <Badge tone="blue">&ldquo;Gada&rdquo; means bridge in Hausa</Badge>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Build your <span className="whitespace-nowrap">AI-training</span> career,{" "}
            <span className="bg-[linear-gradient(transparent_62%,var(--color-bridge)_62%)]">
              together.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Show your skills and experience, get assessed by the Gada team, learn alongside a
            verified community of taskers, and get matched to AI-training platforms you can
            join under your own name.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/sign-in" size="lg">
              Join Gada
            </ButtonLink>
            <ButtonLink href="/#how-it-works" size="lg" variant="secondary">
              How it works
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gada">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-bridge-600" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <HeroIllustration />
      </Container>
    </section>
  );
}

/* A product preview built from real UI, not a stock photo: light on mobile data */
function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      {/* the "bridge" arc */}
      <div className="absolute -left-6 -right-6 top-10 h-64 rounded-t-full border-[14px] border-b-0 border-bridge/70" />

      {/* Tasker profile card */}
      <div className="relative mt-16 rounded-3xl border border-line bg-white p-6 shadow-xl shadow-gada/10">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gada font-display text-xl font-bold text-white">
            AO
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display text-lg font-semibold text-gada">Amina O.</p>
              <VerifiedBadge />
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted">
              <MapPin className="h-3.5 w-3.5" /> Lagos, Nigeria
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {["AI response rating", "Text annotation", "Biology"].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-gada"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="text-muted">3 past projects</span>
          <span className="flex items-center gap-1.5 text-muted">
            <MessageCircle className="h-4 w-4" /> 12 community posts
          </span>
        </div>
      </div>

      {/* Recommendation card */}
      <div className="relative -mt-4 ml-auto w-4/5 rounded-2xl border border-line bg-white p-4 shadow-lg shadow-gada/10 sm:-mr-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-bridge-600">Recommended for you</p>
        <p className="mt-1 font-display font-semibold text-gada">AI response rating platform</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted">
            <Globe2 className="h-4 w-4" /> Accepts Nigeria
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-gada px-3 py-1.5 text-xs font-semibold text-white">
            Apply <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
