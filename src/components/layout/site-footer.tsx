import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const columns = [
  {
    title: "Taskers",
    links: [
      { label: "Join Gada", href: "/sign-in" },
      { label: "How assessment works", href: "/faq" },
      { label: "Paths you can take", href: "/paths" },
    ],
  },
  {
    title: "Gada",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Why Gada", href: "/why-gada" },
      { label: "Our community", href: "/our-community" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-gada-900 text-gada-100">
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/gada-logo-reversed.svg"
            alt="Gada"
            width={120}
            height={32}
            unoptimized
            className="h-8 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gada-200">
            Gada means &ldquo;bridge&rdquo; in Hausa. We help African taskers build
            their skills, grow together and find the right AI-training platforms.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gada-200 hover:text-bridge">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-xs text-gada-300">
          &copy; 2026 Gada. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
