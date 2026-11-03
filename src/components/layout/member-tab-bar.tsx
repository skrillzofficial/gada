"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, memberNavLinks } from "./member-nav-links";

/** App-style navigation fixed to the bottom of the screen on phones */
export function MemberTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-4">
        {memberNavLinks.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${
                  active ? "text-gada" : "text-muted"
                }`}
              >
                <span className={`flex h-8 w-12 items-center justify-center rounded-full ${active ? "bg-bridge-100" : ""}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
