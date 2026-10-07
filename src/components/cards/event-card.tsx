import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import type { CommunityEvent } from "@/lib/types";
import { eventCategoryMeta } from "@/data/events";
import { SampleBadge } from "@/components/shared/states";
import { dayAndMonth, formatTime } from "@/lib/utils";

export function DateBlock({ iso, className = "" }: { iso: string; className?: string }) {
  const d = dayAndMonth(iso);
  return (
    <div className={`flex w-16 shrink-0 flex-col items-center rounded-2xl bg-white py-2 text-center shadow-card ring-1 ring-sand-200 ${className}`}>
      <span className="text-[0.7rem] font-bold tracking-widest text-clay-600 uppercase">{d.month}</span>
      <span className="font-display text-3xl leading-none font-semibold text-ink">{d.day}</span>
      <span className="mt-0.5 text-[0.7rem] font-medium text-muted">{d.weekday}</span>
    </div>
  );
}

export function EventCard({ event }: { event: CommunityEvent }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-sand-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative z-[1] aspect-[16/9]">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={event.image.src} alt={event.image.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <DateBlock iso={event.startsAt} className="absolute bottom-0 left-5 translate-y-1/2" />
      </div>
      <div className="flex flex-1 flex-col p-5 pt-12 sm:p-6 sm:pt-12">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-clay-600 uppercase">{eventCategoryMeta[event.category]}</span>
          {event.isSample && <SampleBadge />}
        </div>
        <h3 className="text-xl leading-snug font-semibold">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 group-hover:text-bush-800">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.95rem] text-muted">{event.summary}</p>
        <ul className="mt-auto space-y-1.5 pt-4 text-sm text-charcoal-700">
          <li className="flex gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
            {formatTime(event.startsAt)}
            {event.endsAt && ` – ${formatTime(event.endsAt)}`}
          </li>
          <li className="flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden /> {event.venue}
          </li>
          <li className="flex gap-2">
            <Users className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden /> {event.organizer}
          </li>
        </ul>
      </div>
    </article>
  );
}
