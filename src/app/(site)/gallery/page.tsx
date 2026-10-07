import { GalleryGrid } from "@/components/gallery-grid";
import { SharePhotoDialog } from "@/components/forms/other-forms";
import { PageHeader } from "@/components/shared/page-header";
import { getGallery } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Community Gallery",
  description: "Photographs of Mhinga — community, events, schools, sport, culture, nature and history.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Mhinga in pictures" description="Moments, places and people. Illustrations are shown until community photographs are added — share yours!" crumbs={[{ label: "Gallery" }]} variant="plain">
        <SharePhotoDialog />
      </PageHeader>
      <div className="container-page py-10 sm:py-14">
        <GalleryGrid items={items} />
      </div>
    </>
  );
}
