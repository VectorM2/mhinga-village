import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/shell";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin | Mhinga" },
  robots: { index: false, follow: false },
};

/**
 * TODO(auth): wrap with a Supabase session check and role guard
 * (super_admin | editor | community_manager) before going live.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
