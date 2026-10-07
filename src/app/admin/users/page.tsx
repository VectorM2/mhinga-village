import { AdminPageHeader } from "@/components/admin/shell";
import { UsersManager } from "@/components/admin/managers";
import { getAdminUsers } from "@/lib/data";

export const metadata = { title: "Users" };

export default async function Page() {
  const rows = await getAdminUsers();
  return (
    <>
      <AdminPageHeader title="Users" description="Administrators and their roles." />
      <UsersManager rows={rows} />
    </>
  );
}
