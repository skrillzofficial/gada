import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why Gada", href: "/#why-gada" },
  { label: "Community", href: "/#community" },
  { label: "Paths", href: "/#paths" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Gada home">
          <Image
            src="/brand/gada-logo-primary.svg"
            alt="Gada"
            width={120}
            height={32}
            priority
            unoptimized
            className="h-8 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-gada"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/sign-in" variant="ghost">
            Sign in
          </ButtonLink>
          <ButtonLink href="/sign-in">Join Gada</ButtonLink>
        </div>

        {/* Mobile menu: <details> works without any JavaScript */}
        <details className="relative md:hidden">
          <summary
            aria-label="Open menu"
            className="cursor-pointer list-none rounded-lg p-2 text-gada hover:bg-surface [&::-webkit-details-marker]:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-12 w-64 rounded-2xl border border-line bg-white p-3 shadow-lg">
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 font-medium text-gada hover:bg-surface"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
              <ButtonLink href="/sign-in" variant="secondary">
                Sign in
              </ButtonLink>
              <ButtonLink href="/sign-in">Join Gada</ButtonLink>
            </div>
          </div>
        </details>
      </Container>
    </header>
  );
}
