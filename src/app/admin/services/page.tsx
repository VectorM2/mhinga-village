import { AdminPageHeader } from "@/components/admin/shell";
import { ServicesManager } from "@/components/admin/managers";
import { getServices } from "@/lib/data";

export const metadata = { title: "Services" };

export default async function Page() {
  const rows = await getServices();
  return (
    <>
      <AdminPageHeader title="Services" description="Service directory. Mark information as verified once confirmed with the provider." />
      <ServicesManager rows={rows} />
    </>
  );
}
