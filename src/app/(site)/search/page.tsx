import { SearchClient } from "@/components/search-client";
import { PageHeader } from "@/components/shared/page-header";
import { getSearchIndex } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({ title: "Search", description: "Search Mhinga services, schools, businesses, news, opportunities, events and how-to guides.", path: "/search" }),
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [{ q }, index] = await Promise.all([searchParams, getSearchIndex()]);
  return (
    <>
      <PageHeader title="Search Mhinga" crumbs={[{ label: "Search" }]} variant="plain" />
      <div className="container-page py-10 sm:py-14">
        <SearchClient index={index} initialQuery={q ?? ""} />
      </div>
    </>
  );
}
