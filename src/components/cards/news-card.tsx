import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { NewsArticle } from "@/lib/types";
import { newsCategoryMeta } from "@/data/news";
import { wordCount } from "@/components/shared/content";
import { cn, formatDate, readingTime } from "@/lib/utils";

export function NewsCard({ article, variant = "default", priority }: { article: NewsArticle; variant?: "default" | "featured" | "compact"; priority?: boolean }) {
  const minutes = readingTime(wordCount(article.body));
  const featured = variant === "featured";
  if (variant === "compact") {
    return (
      <article className="group relative flex gap-4">
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
          <Image src={article.image.src} alt={article.image.alt} fill sizes="112px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-wider text-clay-600 uppercase">{newsCategoryMeta[article.category]}</p>
          <h3 className="mt-1 leading-snug font-semibold">
            <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-bush-800">
              {article.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-muted">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {minutes} min read
          </p>
        </div>
      </article>
    );
  }
  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-sand-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", featured && "lg:flex-row")}>
      <div className={cn("relative aspect-[16/10] overflow-hidden", featured && "lg:aspect-auto lg:w-3/5")}>
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority={priority}
          sizes={featured ? "(min-width:1024px) 60vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-ink shadow-sm">{newsCategoryMeta[article.category]}</span>
      </div>
      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "lg:justify-center lg:p-10")}>
        <h3 className={cn("leading-snug font-semibold text-balance", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-bush-800">
            {article.title}
          </Link>
        </h3>
        <p className={cn("mt-2 leading-relaxed text-muted", featured ? "text-lg" : "line-clamp-3 text-[0.95rem]")}>{article.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-sm text-muted">
          <span className="font-semibold text-charcoal-800">{article.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden /> {minutes} min read
          </span>
        </div>
      </div>
    </article>
  );
}
