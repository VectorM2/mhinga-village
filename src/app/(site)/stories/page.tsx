import Link from "next/link";
import { StoryCard } from "@/components/cards/misc-cards";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/states";
import { getStories } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "People of Mhinga",
  description: "Stories of the teachers, farmers, entrepreneurs, students, leaders, artists and athletes who make Mhinga home.",
  path: "/stories",
});

export default async function StoriesPage() {
  const stories = await getStories();
  const [first, ...rest] = stories;
  return (
    <>
      <PageHeader eyebrow="Stories" title="People of Mhinga" description="Teachers, farmers, entrepreneurs, students, leaders and athletes — the people who make our community what it is." crumbs={[{ label: "People of Mhinga" }]} variant="plain">
        <Link href="/contact?topic=news" className="inline-flex h-12 items-center rounded-full bg-bush-700 px-6 font-semibold text-white hover:bg-bush-800">
          Nominate someone
        </Link>
      </PageHeader>
      <div className="container-page py-10 sm:py-14">
        {first ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:row-span-2">
              <StoryCard story={first} size="large" />
            </div>
            {rest.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        ) : (
          <EmptyState title="Stories coming soon" description="Know someone whose story should be told? Nominate them." action={{ label: "Nominate someone", href: "/contact?topic=news" }} />
        )}
      </div>
    </>
  );
}
