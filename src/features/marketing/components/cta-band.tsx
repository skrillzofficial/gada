import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gada px-6 py-14 text-center sm:px-12">
          <div
            className="absolute -bottom-40 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-t-full border-[12px] border-b-0 border-bridge/40"
            aria-hidden="true"
          />
          <h2 className="relative text-3xl font-bold text-white sm:text-4xl">Ready to cross the bridge?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-gada-200">
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
