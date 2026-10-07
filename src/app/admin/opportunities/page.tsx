import { AdminPageHeader } from "@/components/admin/shell";
import { OpportunitiesManager } from "@/components/admin/managers";
import { getOpportunities } from "@/lib/data";

export const metadata = { title: "Opportunities" };

export default async function Page() {
  const rows = await getOpportunities();
  return (
    <>
      <AdminPageHeader title="Opportunities" description="Bursaries, jobs and programmes. Set deadlines, categories and verification." />
      <OpportunitiesManager rows={rows} />
    </>
  );
}
