import Image from "next/image";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/cards/misc-cards";
import { ShareButtons } from "@/components/shared/client";
import { ContentBlocks } from "@/components/shared/content";
import { Breadcrumbs } from "@/components/shared/page-header";
import { SampleBadge } from "@/components/shared/states";
import { getStories, getStory } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = await getStory((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.headline, description: s.excerpt, path: `/stories/${s.slug}`, type: "article" });
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const story = await getStory((await params).slug);
  if (!story) notFound();
  const more = (await getStories()).filter((s) => s.id !== story.id).slice(0, 3);
  return (
    <article>
      <header className="relative isolate overflow-hidden bg-charcoal-900">
        <Image src={story.image.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent" />
        <div className="container-page max-w-4xl pt-20 pb-12 sm:pt-40 sm:pb-16">
          <Breadcrumbs inverted items={[{ label: "People of Mhinga", href: "/stories" }, { label: story.name }]} />
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-gold-400 px-2.5 py-0.5 text-xs font-bold text-charcoal-900">{story.role}</span>
            {story.isSample && <SampleBadge label="Sample story" className="bg-white/15 text-white ring-white/20" />}
          </div>
          <h1 className="text-4xl leading-tight font-semibold text-balance text-white sm:text-6xl">{story.headline}</h1>
          <p className="mt-4 text-xl text-sand-200">{story.excerpt}</p>
        </div>
      </header>
      <div className="container-page max-w-3xl py-10 sm:py-14">
        <p className="mb-6 font-display text-2xl text-ink">{story.name}</p>
        <ContentBlocks blocks={story.body} />
        <div className="mt-10 border-t border-sand-200 pt-6">
          <ShareButtons title={story.headline} path={`/stories/${story.slug}`} />
        </div>
      </div>
      {more.length > 0 && (
        <section className="bg-white py-14">
          <div className="container-page">
            <h2 className="mb-6 text-3xl font-semibold">More stories</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {more.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
