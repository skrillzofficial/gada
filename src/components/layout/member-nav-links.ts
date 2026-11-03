import { Compass, LayoutDashboard, UserRound, UsersRound, type LucideIcon } from "lucide-react";

export type MemberNavLink = { label: string; href: string; icon: LucideIcon };

export const memberNavLinks: MemberNavLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Community", href: "/community", icon: UsersRound },
  { label: "Platforms", href: "/platforms", icon: Compass },
  { label: "My profile", href: "/profile", icon: UserRound },
];

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
