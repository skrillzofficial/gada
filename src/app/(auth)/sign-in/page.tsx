import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Compass, UsersRound } from "lucide-react";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import door from "@/assets/images/welcome-door.webp";

export const metadata: Metadata = { title: "Sign in" };

const highlights = [
  { icon: BadgeCheck, text: "Get assessed and earn your Verified badge" },
  { icon: UsersRound, text: "Learn with a verified community of taskers" },
  { icon: Compass, text: "Get matched to platforms that suit you" },
];

export default function SignInPage() {
  return (
    <main className="relative grid min-h-svh lg:grid-cols-2">
      {/* Door background: full screen on mobile, left half on desktop */}
      <div className="fixed inset-0 -z-10 lg:hidden" aria-hidden="true">
        <Image src={door} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-[center_45%]" />
        <div className="absolute inset-0 bg-[#050a1d]/40" />
      </div>

      <section className="relative hidden overflow-hidden bg-[#050a1d] lg:block">
        <Image src={door} alt="" fill priority placeholder="blur" sizes="50vw" className="object-cover object-[center_45%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a1d] via-[#050a1d]/30 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" aria-label="Back to Gada home">
            <Image
              src="/brand/gada-logo-reversed.svg"
              alt="Gada"
              width={130}
              height={34}
              unoptimized
              priority
              className="h-9 w-auto"
            />
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight text-white">
              Your next step is <span className="text-bridge">through this door.</span>
            </h1>
            <ul className="mt-6 space-y-3">
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-gada-100">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
                    <Icon className="h-4 w-4 text-bridge" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="flex items-center justify-center px-4 py-12 sm:px-6 lg:bg-white">
        <div className="w-full max-w-md">
          <Link href="/" aria-label="Back to Gada home" className="inline-block lg:hidden">
            <Image
              src="/brand/gada-logo-reversed.svg"
              alt="Gada"
              width={120}
              height={32}
              unoptimized
              priority
              className="h-8 w-auto"
            />
          </Link>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8 lg:mt-0 lg:p-0 lg:shadow-none">
            <SignInForm />
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-white/80 lg:text-muted">
            By continuing, you agree to Gada&rsquo;s{" "}
            <Link href="/terms" className="font-semibold underline lg:text-gada">Terms</Link> and{" "}
            <Link href="/privacy" className="font-semibold underline lg:text-gada">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
