import { AdminPageHeader } from "@/components/admin/shell";
import { BusinessesManager } from "@/components/admin/managers";
import { getAllBusinessesForAdmin } from "@/lib/data";

export const metadata = { title: "Businesses" };

export default async function Page() {
  const rows = await getAllBusinessesForAdmin();
  return (
    <>
      <AdminPageHeader title="Businesses" description="Approve, reject, edit and suspend business listings." />
      <BusinessesManager rows={rows} />
    </>
  );
}
