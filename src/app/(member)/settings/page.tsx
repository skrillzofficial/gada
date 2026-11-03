import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SettingsForm } from "@/features/settings/components/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  // TODO (backend step): get the signed-in user from the session
  return (
    <Container>
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Settings</h1>
          <p className="mt-2 text-muted">Manage your account and what we email you about.</p>
        </header>
        <SettingsForm user={{ name: "Maris Okafor", email: "maris@example.com" }} />
      </div>
    </Container>
  );
}
