import type { Metadata } from "next";
import { TaskerTable } from "@/features/admin/components/tasker-table";
import { adminTaskers } from "@/features/admin/mock-data";

export const metadata: Metadata = { title: "Taskers" };

export default function AdminTaskersPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Taskers</h1>
        <p className="mt-1 text-muted">
          Everyone who has created a Gada profile.
        </p>
      </header>
      <TaskerTable taskers={adminTaskers} />
    </div>
  );
}
