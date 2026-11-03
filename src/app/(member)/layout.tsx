import { MemberFooter } from "@/components/layout/member-footer";
import { MemberHeader } from "@/components/layout/member-header";
import { MemberTabBar } from "@/components/layout/member-tab-bar";

/* Layout for signed-in member pages: dashboard, community, platforms, profile */
export default function MemberLayout({ children }: { children: React.ReactNode }) {
  // TODO (backend step): get the signed-in user from the session
  const user = { name: "Maris Okafor", email: "maris@example.com" };

  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <MemberHeader user={user} />
      {/* extra bottom padding on phones so the tab bar never covers content */}
      <main className="flex-1 pb-28 pt-8 sm:pt-12 md:pb-16">{children}</main>
      <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <MemberFooter />
      </div>
      <MemberTabBar />
    </div>
  );
}
