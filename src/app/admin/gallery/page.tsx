import { AdminPageHeader } from "@/components/admin/shell";
import { GalleryManager } from "@/components/admin/managers";
import { getGallery } from "@/lib/data";

export const metadata = { title: "Gallery" };

export default async function Page() {
  const rows = await getGallery();
  return (
    <>
      <AdminPageHeader title="Gallery" description="Review and manage community photos." />
      <GalleryManager rows={rows} />
    </>
  );
}
