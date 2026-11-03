import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import theatreSeats from "@/assets/images/theatre-seats.webp";

export function CtaBand() {
  return (
    <section className="pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gada px-6 py-16 text-center sm:px-12 sm:py-20">
          <Image
            src={theatreSeats}
            alt=""
            placeholder="blur"
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover object-[center_60%]"
          />
          {/* keep the text readable over the photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-gada/85 via-gada/70 to-gada-900/90" aria-hidden="true" />

          <h2 className="relative text-3xl font-bold text-white sm:text-5xl">
            There&rsquo;s a seat <span className="text-bridge">for you.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-gada-100">
            Create your profile today. Our team will review it and help you take your next step.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/sign-in" size="lg" variant="accent">
              Join Gada
            </ButtonLink>
            <ButtonLink href="/sign-in" size="lg" variant="inverse">
              Sign in
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
