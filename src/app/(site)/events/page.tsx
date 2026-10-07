import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { EventsDirectory } from "@/components/directories";
import { PageHeader } from "@/components/shared/page-header";
import { getEvents } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Community Events",
  description: "Community meetings, sport, school events, cultural celebrations, workshops and clean-up campaigns in Mhinga.",
  path: "/events",
});

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <>
      <PageHeader eyebrow="Events" title="What's on in Mhinga" description="Meetings, sport, culture, workshops and more — find out what's happening and get involved." crumbs={[{ label: "Events" }]} image={images.sports}>
        <Link href="/contact?topic=event" className="inline-flex h-12 items-center gap-2 rounded-full bg-amber-gold-400 px-6 font-semibold text-charcoal-900 hover:bg-amber-gold-500">
          <CalendarPlus className="size-5" aria-hidden /> Submit an event
        </Link>
      </PageHeader>
      <div className="container-page py-10 sm:py-14">
        <EventsDirectory events={events} />
      </div>
    </>
  );
}
