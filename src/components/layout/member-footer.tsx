import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const links = [
  { label: "Help", href: "/help" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export function MemberFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="flex flex-col items-center gap-4 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/brand/gada-logo-primary.svg" alt="Gada" width={80} height={21} unoptimized className="h-5 w-auto" />
          <span>&copy; 2026 Gada. Bridging talent &amp; teams.</span>
        </div>
        <nav aria-label="Footer" className="flex gap-5">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-gada">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
