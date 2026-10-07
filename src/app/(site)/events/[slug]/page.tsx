import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, CalendarPlus, Clock, MapPin, Ticket, Users } from "lucide-react";
import { DateBlock, EventCard } from "@/components/cards/event-card";
import { ShareButtons } from "@/components/shared/client";
import { AsideCard, DetailGrid, InfoList } from "@/components/shared/detail";
import { Breadcrumbs } from "@/components/shared/page-header";
import { SampleBadge } from "@/components/shared/states";
import { eventCategoryMeta } from "@/data/events";
import { getEvent, getEvents, getUpcomingEvents } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { formatDate, formatTime } from "@/lib/utils";
import type { CommunityEvent } from "@/lib/types";

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const e = await getEvent((await params).slug);
  if (!e) return {};
  return pageMetadata({ title: e.title, description: e.summary, path: `/events/${e.slug}` });
}

function icsHref(e: CommunityEvent) {
  const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mhinga//Community Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@mhinga`,
    `DTSTAMP:${fmt(e.startsAt)}`,
    `DTSTART:${fmt(e.startsAt)}`,
    `DTEND:${fmt(e.endsAt ?? e.startsAt)}`,
    `SUMMARY:${e.title}`,
    `LOCATION:${e.venue}, Mhinga`,
    `DESCRIPTION:${e.summary}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const event = await getEvent((await params).slug);
  if (!event) notFound();
  const more = (await getUpcomingEvents()).filter((e) => e.id !== event.id).slice(0, 3);
  return (
    <>
      <header className="relative isolate overflow-hidden bg-charcoal-900">
        <Image src={event.image.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-charcoal-900/30" />
        <div className="container-page flex flex-col gap-6 pt-10 pb-12 sm:flex-row sm:items-end sm:pt-24 sm:pb-16">
          <DateBlock iso={event.startsAt} className="w-20 py-3" />
          <div>
            <Breadcrumbs inverted items={[{ label: "Events", href: "/events" }, { label: event.title }]} />
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-amber-gold-400 px-2.5 py-0.5 text-xs font-bold text-charcoal-900">{eventCategoryMeta[event.category]}</span>
              {event.isSample && <SampleBadge label="Sample event" className="bg-white/15 text-white ring-white/20" />}
            </div>
            <h1 className="max-w-3xl text-4xl leading-tight font-semibold text-white sm:text-5xl">{event.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-sand-200">{event.summary}</p>
          </div>
        </div>
      </header>
      <DetailGrid
        main={
          <div className="space-y-8">
            <div className="prose-mhinga">
              <p>{event.description}</p>
            </div>
            <ShareButtons title={event.title} path={`/events/${event.slug}`} />
            {more.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold">More upcoming events</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {more.slice(0, 2).map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              </section>
            )}
          </div>
        }
        aside={
          <AsideCard title="Event details">
            <InfoList
              items={[
                { icon: CalendarDays, label: "Date", value: formatDate(event.startsAt, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
                { icon: Clock, label: "Time", value: `${formatTime(event.startsAt)}${event.endsAt ? ` – ${formatTime(event.endsAt)}` : ""}` },
                { icon: MapPin, label: "Venue", value: event.venue },
                { icon: Users, label: "Organiser", value: event.organizer },
                { icon: Ticket, label: "Cost", value: event.isFree ? "Free" : undefined },
              ]}
            />
            <a href={icsHref(event)} download={`${event.slug}.ics`} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-bush-700 font-semibold text-white hover:bg-bush-800">
              <CalendarPlus className="size-5" aria-hidden /> Add to calendar
            </a>
          </AsideCard>
        }
      />
    </>
  );
}
