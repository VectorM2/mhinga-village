import { AdminPageHeader } from "@/components/admin/shell";
import { SchoolsManager } from "@/components/admin/managers";
import { getSchools } from "@/lib/data";

export const metadata = { title: "Schools" };

export default async function Page() {
  const rows = await getSchools();
  return (
    <>
      <AdminPageHeader title="Schools" description="School listings. Confirm details with each school before verifying." />
      <SchoolsManager rows={rows} />
    </>
  );
}
