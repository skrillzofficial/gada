import Image from "next/image";
import { Container } from "@/components/ui/container";
import { OnboardingHelp } from "@/features/help/components/onboarding-help";

/* Minimal shell for profile setup: no navigation, so taskers stay focused and keep their answers */
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-surface">
      <header className="border-b border-line bg-white">
        <Container className="flex h-16 items-center justify-between">
          {/* Not a link: leaving mid-setup would lose the tasker's answers */}
          <Image
            src="/brand/gada-logo-primary.svg"
            alt="Gada"
            width={110}
            height={29}
            unoptimized
            priority
            className="h-7 w-auto"
          />
          <OnboardingHelp />
        </Container>
      </header>
      <main className="py-10 sm:py-14">{children}</main>
    </div>
  );
}
