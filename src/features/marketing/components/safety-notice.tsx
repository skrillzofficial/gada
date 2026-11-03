import { ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/container";

export function SafetyNotice() {
  return (
    <section id="safety" className="scroll-mt-20 py-12">
      <Container>
        <div className="flex flex-col gap-4 rounded-2xl border border-bridge bg-bridge-50 p-6 sm:flex-row sm:items-start">
          <ShieldAlert className="h-7 w-7 shrink-0 text-gada" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold">Stay safe from scams</h2>
            <p className="mt-1 text-sm leading-relaxed text-gada-800">
              Gada will never ask you to pay to join, to buy or rent an account, or to work on
              someone else&rsquo;s account. Always sign up to platforms yourself, under your own
              name. If anyone claiming to be from Gada asks for money, don&rsquo;t pay. Report it to us.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
