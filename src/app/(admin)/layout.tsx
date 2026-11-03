import type { Metadata } from "next";
import { AdminNav } from "@/features/admin/components/admin-nav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Gada Admin" },
  robots: { index: false, follow: false }, // keep admin pages out of search engines
};

/* Admin area for the Gada team */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO (backend step): only users with role "admin" can open these pages
  return (
    <div className="min-h-svh bg-surface lg:flex">
      <AdminNav />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
