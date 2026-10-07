import { PlacesDirectory } from "@/components/directories";
import { MapView } from "@/components/shared/map-view";
import { PageHeader } from "@/components/shared/page-header";
import { getPlaces } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Explore Mhinga",
  description: "A directory of schools, clinics, police, government offices, halls, churches, shops, sports grounds, ATMs, taxi ranks and landmarks in Mhinga.",
  path: "/explore",
});

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category }, places] = await Promise.all([searchParams, getPlaces()]);
  return (
    <>
      <PageHeader eyebrow="Explore" title="Explore Mhinga" description="Find schools, clinics, offices, shops, sports grounds and important places in and around the village." crumbs={[{ label: "Explore Mhinga" }]} image={images.river} />
      <div className="container-page py-10 sm:py-14">
        <PlacesDirectory places={places} initialCategory={category} map={<MapView />} />
      </div>
    </>
  );
}
