import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Info, MapPin, Megaphone, Siren, TriangleAlert } from "lucide-react";
import type { DirectoryPlace, HowToGuide, Notice, NoticeLevel, Story } from "@/lib/types";
import { placeCategoryMeta } from "@/data/community";
import { Icon } from "@/components/shared/icon";
import { SampleBadge, VerifiedBadge } from "@/components/shared/states";
import { cn, formatDate } from "@/lib/utils";

/* ---------- Story ---------- */

export function StoryCard({ story, size = "default" }: { story: Story; size?: "default" | "large" }) {
  return (
    <article className={cn("group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl bg-charcoal-900", size === "large" ? "min-h-[26rem] sm:min-h-[30rem]" : "min-h-[22rem]")}>
      <Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width:1024px) 33vw, 100vw" className="-z-10 object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent" />
      <div className="p-6 sm:p-7">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-amber-gold-400 px-2.5 py-0.5 text-xs font-bold text-charcoal-900">{story.role}</span>
          {story.isSample && <SampleBadge className="bg-white/15 text-white ring-white/20" />}
        </div>
        <h3 className={cn("leading-tight font-semibold text-balance text-white", size === "large" ? "text-3xl" : "text-2xl")}>
          <Link href={`/stories/${story.slug}`} className="after:absolute after:inset-0">
            {story.headline}
          </Link>
        </h3>
        <p className="mt-2 text-sand-200">{story.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-gold-400">
          Read story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}

/* ---------- Notice ---------- */

export const noticeStyles: Record<NoticeLevel, { label: string; icon: typeof Siren; wrap: string; chip: string; iconWrap: string }> = {
  emergency: { label: "Emergency", icon: Siren, wrap: "bg-clay-600 text-white ring-clay-700", chip: "bg-white text-clay-700", iconWrap: "bg-white/15 text-white" },
  important: { label: "Important", icon: TriangleAlert, wrap: "bg-amber-gold-100 text-charcoal-900 ring-amber-gold-400/40", chip: "bg-amber-gold-500 text-charcoal-900", iconWrap: "bg-amber-gold-400 text-charcoal-900" },
  information: { label: "Information", icon: Info, wrap: "bg-white text-ink ring-sand-200", chip: "bg-bush-50 text-bush-800", iconWrap: "bg-bush-50 text-bush-700" },
  event: { label: "Event", icon: CalendarDays, wrap: "bg-bush-800 text-white ring-bush-900", chip: "bg-amber-gold-400 text-charcoal-900", iconWrap: "bg-white/10 text-amber-gold-400" },
};

export function NoticeCard({ notice, size = "default" }: { notice: Notice; size?: "default" | "large" }) {
  const s = noticeStyles[notice.level];
  const Ico = s.icon;
  const dark = notice.level === "emergency" || notice.level === "event";
  return (
    <article className={cn("relative flex h-full flex-col rounded-3xl p-6 ring-1 sm:p-7", s.wrap, size === "large" && "sm:p-9")}>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <span className={cn("grid size-11 shrink-0 place-items-center rounded-2xl sm:size-12", s.iconWrap)}>
          <Ico className="size-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className={cn("rounded-full px-2.5 py-0.5 tracking-wide uppercase", s.chip)}>{s.label}</span>
            <span className={cn("tracking-wide uppercase", dark ? "text-white/75" : "text-muted")}>{notice.category}</span>
            <span className={dark ? "text-white/60" : "text-muted"} aria-hidden>·</span>
            <time dateTime={notice.publishedAt} className={dark ? "text-white/75" : "text-muted"}>
              {formatDate(notice.publishedAt)}
            </time>
            {notice.isSample && <SampleBadge className={dark ? "bg-white/15 text-white ring-white/20" : ""} />}
          </div>
          <h3 className={cn("mt-2 leading-snug font-semibold text-balance", size === "large" ? "text-2xl sm:text-3xl" : "text-xl")}>{notice.title}</h3>
          <p className={cn("mt-2 leading-relaxed", dark ? "text-white/85" : "text-charcoal-700")}>{notice.summary}</p>
          {notice.link && (
            <Link href={notice.link} className={cn("mt-4 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline", dark ? "text-white" : "text-bush-800")}>
              Read more <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function NoticeBanner({ notice }: { notice: Notice }) {
  const s = noticeStyles[notice.level];
  return (
    <div className={cn("ring-1", s.wrap, "rounded-none ring-0")}>
      <div className="container-page flex items-center gap-3 py-2.5 text-sm">
        <Megaphone className="size-4 shrink-0" aria-hidden />
        <p className="min-w-0 flex-1 truncate">
          <span className="font-bold">{s.label}: </span>
          {notice.title}
        </p>
        {notice.link && (
          <Link href={notice.link} className="shrink-0 font-semibold underline underline-offset-4">
            Details
          </Link>
        )}
      </div>
    </div>
  );
}

/* ---------- How-to guide ---------- */

export function GuideCard({ guide }: { guide: HowToGuide }) {
  return (
    <Link
      href={`/how-to/${guide.slug}`}
      className="group flex h-full items-start gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-bush-50 text-bush-700 transition-colors group-hover:bg-bush-700 group-hover:text-white">
        <Icon name={guide.icon} className="size-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-muted">How do I…</span>
        <span className="mt-0.5 block text-lg leading-snug font-semibold text-ink">{guide.question.charAt(0).toLowerCase() + guide.question.slice(1)}?</span>
      </span>
      <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bush-700" aria-hidden />
    </Link>
  );
}

/* ---------- Directory place ---------- */

export function PlaceCard({ place }: { place: DirectoryPlace }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-bold tracking-wider text-clay-600 uppercase">{placeCategoryMeta[place.category]}</span>
        <VerifiedBadge verification={place.verification} />
      </div>
      <h3 className="mt-1.5 text-lg leading-snug font-semibold">{place.name}</h3>
      <p className="mt-1 text-sm text-muted">{place.description}</p>
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-charcoal-700">
        <MapPin className="size-4 text-muted" aria-hidden /> {place.location.label}
      </p>
    </>
  );
  const cls = "block h-full rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200/70";
  return place.href ? (
    <Link href={place.href} className={cn(cls, "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift")}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
