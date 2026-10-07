import { NewsCard } from "@/components/cards/news-card";
import { NewsDirectory } from "@/components/directories";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/states";
import { getNews } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Community News",
  description: "Latest news, notices and stories from Mhinga — community, education, health, youth, infrastructure, agriculture and culture.",
  path: "/news",
});

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category }, news] = await Promise.all([searchParams, getNews()]);
  const featured = news.find((n) => n.featured) ?? news[0];
  return (
    <>
      <PageHeader eyebrow="News" title="Latest from Mhinga" description="Community news, practical explainers and stories from home." crumbs={[{ label: "News" }]} variant="plain" />
      <div className="container-page py-10 sm:py-14">
        {featured ? (
          <>
            {!category && (
              <div className="mb-12">
                <NewsCard article={featured} variant="featured" priority />
              </div>
            )}
            <h2 className="mb-5 text-2xl font-semibold">All articles</h2>
            <NewsDirectory articles={news} initialCategory={category} />
          </>
        ) : (
          <EmptyState title="No news yet" description="Stories from the community will appear here soon." />
        )}
      </div>
    </>
  );
}
