import type { Metadata } from "next";
import { DoorWelcome } from "@/features/auth/components/door-welcome";

export const metadata: Metadata = { title: "Welcome" };

export default function WelcomePage() {
  // TODO (backend step): read the signed-in user's name and pass it in: <DoorWelcome name={...} />
  return <DoorWelcome />;
}
