"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardCheck,
  Compass,
  LayoutGrid,
  MessagesSquare,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const links: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Overview", href: "/admin", icon: LayoutGrid },
  { label: "Review queue", href: "/admin/reviews", icon: ClipboardCheck },
  { label: "Taskers", href: "/admin/taskers", icon: UsersRound },
  { label: "Platforms", href: "/admin/platforms", icon: Compass },
  { label: "Community", href: "/admin/community", icon: MessagesSquare },
];

function isActive(pathname: string, href: string) {
  return href === "/admin"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col bg-gada-900 p-5 lg:flex">
        <Link href="/admin" className="flex items-center gap-2 px-2">
          <Image
            src="/brand/gada-logo-reversed.svg"
            alt="Gada"
            width={100}
            height={26}
            unoptimized
            className="h-7 w-auto"
          />
          <span className="rounded-md bg-bridge px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gada">
            Admin
          </span>
        </Link>
        <nav aria-label="Admin" className="mt-10 flex flex-col gap-1">
          {links.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-gada-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 ${active ? "text-bridge" : ""}`}
                  aria-hidden="true"
                />
                {label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/dashboard"
          className="mt-auto rounded-xl px-3 py-2.5 text-sm text-gada-300 hover:bg-white/5 hover:text-white"
        >
          ← Back to member view
        </Link>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 bg-gada-900 lg:hidden">
        <div className="flex h-14 items-center gap-2 px-4">
          <Image
            src="/brand/gada-logo-reversed.svg"
            alt="Gada"
            width={90}
            height={24}
            unoptimized
            className="h-6 w-auto"
          />
          <span className="rounded-md bg-bridge px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gada">
            Admin
          </span>
        </div>
        <nav
          aria-label="Admin"
          className="flex gap-1 overflow-x-auto px-3 pb-3 [scrollbar-width:none]"
        >
          {links.map(({ label, href }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${
                  active ? "bg-bridge text-gada" : "text-gada-200"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
