import { AdminPageHeader } from "@/components/admin/shell";
import { NoticesManager } from "@/components/admin/managers";
import { getAllNotices } from "@/lib/data";

export const metadata = { title: "Notices" };

export default async function Page() {
  const rows = await getAllNotices();
  return (
    <>
      <AdminPageHeader title="Notices" description="Community notices with priority levels and expiry dates." />
      <NoticesManager rows={rows} />
    </>
  );
}
