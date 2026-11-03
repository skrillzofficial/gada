"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "sending" | "sent";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleGoogle() {
    // TODO (backend step): authClient.signIn.social({ provider: "google", callbackURL: "/welcome" })
    router.push("/welcome"); // preview only: goes straight to the welcome door
  }

  async function handleEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO (backend step): authClient.signIn.magicLink({ email, callbackURL: "/welcome" })
    await new Promise((resolve) => setTimeout(resolve, 800)); // simulated for now
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-bridge-100 text-gada">
          <MailCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-bold">Check your email</h2>
        <p className="mt-3 leading-relaxed text-muted">
          We sent a sign-in link to <strong className="text-gada">{email}</strong>. Open it on this
          device to continue. The link expires in 5 minutes.
        </p>
        <p className="mt-6 text-sm text-muted">Can&rsquo;t find it? Check your spam or promotions folder.</p>
        {process.env.NODE_ENV === "development" && (
          <Link href="/welcome" className="mt-4 block text-sm font-semibold text-gada underline">
            Preview: continue as if you clicked the email link
          </Link>
        )}
        <Button variant="ghost" className="mt-4" onClick={() => setStatus("idle")}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome to Gada</h2>
        <p className="mt-2 text-muted">Sign in or create your free account.</p>
      </div>

      <Button variant="secondary" size="lg" className="w-full" onClick={handleGoogle}>
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" />
        or continue with email
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleEmail} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gada">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-gada outline-none transition placeholder:text-muted/70 focus:border-gada focus:ring-4 focus:ring-gada-100"
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending link…
            </>
          ) : (
            "Send me a sign-in link"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        New to Gada? Signing in creates your account automatically.
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
