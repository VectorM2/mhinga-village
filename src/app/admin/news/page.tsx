import { AdminPageHeader } from "@/components/admin/shell";
import { NewsManager } from "@/components/admin/managers";
import { getAllNewsForAdmin } from "@/lib/data";

export const metadata = { title: "News" };

export default async function Page() {
  const rows = await getAllNewsForAdmin();
  return (
    <>
      <AdminPageHeader title="News" description="Write, edit, publish and unpublish community articles." />
      <NewsManager rows={rows} />
    </>
  );
}
