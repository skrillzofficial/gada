import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ProfileWizard } from "@/features/profiles/components/profile-wizard";

export const metadata: Metadata = { title: "Set up your profile" };

export default function OnboardingPage() {
  return (
    <Container>
      <ProfileWizard />
    </Container>
  );
}
