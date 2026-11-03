"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, CircleHelp, LogOut, Settings, UserRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { isActive, memberNavLinks } from "./member-nav-links";

export type MemberUser = { name: string; email: string };

export function MemberHeader({ user }: { user: MemberUser }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  // The header stays on screen between pages, so close the account menu after navigating
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/dashboard" aria-label="Gada dashboard" className="shrink-0">
          <Image
            src="/brand/gada-logo-primary.svg"
            alt="Gada"
            width={110}
            height={29}
            unoptimized
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop navigation (phones use the bottom tab bar) */}
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 md:flex">
          {memberNavLinks.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-gada-50 text-gada" : "text-muted hover:bg-surface hover:text-gada"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2 text-muted hover:bg-surface hover:text-gada"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-bridge ring-2 ring-white" />
          </button>

          {/* Account menu: <details> opens and closes without extra JavaScript */}
          <details ref={menuRef} className="group relative">
            <summary
              aria-label="Account menu"
              className="flex cursor-pointer list-none items-center gap-2 rounded-xl p-1 pr-2 hover:bg-surface [&::-webkit-details-marker]:hidden"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gada text-xs font-bold text-white">
                {initials}
              </span>
              <ChevronDown className="hidden h-4 w-4 text-muted transition-transform group-open:rotate-180 sm:block" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-12 w-64 rounded-2xl border border-line bg-white p-2 shadow-lg">
              <div className="border-b border-line px-3 pb-3 pt-2">
                <p className="font-semibold text-gada">{user.name}</p>
                <p className="truncate text-sm text-muted">{user.email}</p>
              </div>
              <nav aria-label="Account" className="flex flex-col pt-2">
                <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gada hover:bg-surface">
                  <UserRound className="h-4 w-4" aria-hidden="true" /> My profile
                </Link>
                <Link href="/settings" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gada hover:bg-surface">
                  <Settings className="h-4 w-4" aria-hidden="true" /> Settings
                </Link>
                <Link href="/help" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gada hover:bg-surface">
                  <CircleHelp className="h-4 w-4" aria-hidden="true" /> Help
                </Link>
                {/* TODO (backend step): authClient.signOut() */}
                <Link href="/" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
