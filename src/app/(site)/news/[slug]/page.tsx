import Image from "next/image";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/cards/news-card";
import { ShareButtons } from "@/components/shared/client";
import { ContentBlocks, wordCount } from "@/components/shared/content";
import { Breadcrumbs } from "@/components/shared/page-header";
import { newsCategoryMeta } from "@/data/news";
import { getArticle, getNews } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getNews()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = await getArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.excerpt, path: `/news/${a.slug}`, type: "article" });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const all = await getNews();
  const related = [...all.filter((n) => n.id !== article.id && n.category === article.category), ...all.filter((n) => n.id !== article.id && n.category !== article.category)].slice(0, 3);
  const minutes = readingTime(wordCount(article.body));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    image: `${siteConfig.url}${article.image.src}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="container-page max-w-4xl pt-8 sm:pt-12">
        <Breadcrumbs items={[{ label: "News", href: "/news" }, { label: newsCategoryMeta[article.category], href: `/news?category=${article.category}` }, { label: article.title }]} />
        <p className="text-sm font-bold tracking-[0.14em] text-clay-600 uppercase">{newsCategoryMeta[article.category]}</p>
        <h1 className="mt-2 text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl">{article.title}</h1>
        <p className="mt-4 text-xl leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="font-semibold text-ink">{article.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{minutes} min read</span>
        </div>
      </header>
      <div className="container-page mt-8 max-w-5xl">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
          <Image src={article.image.src} alt={article.image.alt} fill priority sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="container-page max-w-3xl py-10 sm:py-14">
        <ContentBlocks blocks={article.body} />
        <div className="mt-10 border-t border-sand-200 pt-6">
          <ShareButtons title={article.title} path={`/news/${article.slug}`} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="border-t border-sand-200 bg-white py-14" aria-labelledby="related-title">
          <div className="container-page">
            <h2 id="related-title" className="mb-6 text-3xl font-semibold">
              Related articles
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
