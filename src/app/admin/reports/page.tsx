import { AdminPageHeader } from "@/components/admin/shell";
import { ReportsManager } from "@/components/admin/reports-manager";
import { getReports } from "@/lib/data";

export const metadata = { title: "Service Reports" };

export default async function Page() {
  const rows = await getReports();
  return (
    <>
      <AdminPageHeader title="Service Reports" description="Problems reported by residents. Assign, update status and keep internal notes." />
      <ReportsManager rows={rows} />
    </>
  );
}
