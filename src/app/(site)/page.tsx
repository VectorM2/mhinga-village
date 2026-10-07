import Image from "next/image";
import Link from "next/link";
import { Accessibility, ArrowRight, BookOpen, Code2, GraduationCap, Plus, School, Store, Trophy, Wallet } from "lucide-react";
import { BusinessCard } from "@/components/cards/business-card";
import { EventCard } from "@/components/cards/event-card";
import { GuideCard, NoticeCard, PlaceCard, StoryCard } from "@/components/cards/misc-cards";
import { NewsCard } from "@/components/cards/news-card";
import { OpportunityCard } from "@/components/cards/opportunity-card";
import { ServiceCard } from "@/components/cards/service-card";
import { Hero } from "@/components/home/hero";
import { QuickAccess } from "@/components/home/quick-access";
import { Reveal } from "@/components/shared/client";
import { MapView } from "@/components/shared/map-view";
import { Section, SectionHeading } from "@/components/shared/section";
import { EmptyState } from "@/components/shared/states";
import {
  getActiveNotices,
  getBusinesses,
  getGuides,
  getNews,
  getOpportunities,
  getPlaces,
  getSchools,
  getServices,
  getStories,
  getUpcomingEvents,
  NOW,
} from "@/lib/data";
import { images } from "@/lib/site";

export default async function HomePage() {
  const [notices, services, news, opportunities, schools, places, events, businesses, stories, guides] = await Promise.all([
    getActiveNotices(),
    getServices(),
    getNews(),
    getOpportunities(),
    getSchools(),
    getPlaces(),
    getUpcomingEvents(),
    getBusinesses(),
    getStories(),
    getGuides(),
  ]);

  const [leadNotice, ...otherNotices] = notices;
  const featuredServices = ["mhinga-clinic", "ambulance-ems", "sassa", "malamulele-hospital", "gbv-command-centre", "traditional-authority"]
    .map((s) => services.find((x) => x.slug === s))
    .filter((x) => !!x);
  const openOpps = opportunities
    .filter((o) => !o.deadline || new Date(o.deadline) >= NOW)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .slice(0, 3);
  const schoolCounts = {
    primary: schools.filter((s) => s.type === "primary").length,
    secondary: schools.filter((s) => s.type === "secondary").length,
    special: schools.filter((s) => s.type === "special").length,
    tertiary: schools.filter((s) => s.type === "tertiary").length,
  };

  return (
    <>
      <Hero />
      <QuickAccess />

      {/* 4. Important notice */}
      <Section aria-labelledby="notice-title" className="pt-10! sm:pt-14!">
        <h2 id="notice-title" className="sr-only">
          Important Community Notice
        </h2>
        {leadNotice ? (
          <div className="grid items-start gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <NoticeCard notice={leadNotice} size="large" />
            </Reveal>
            <div className="grid gap-4">
              {otherNotices.slice(0, 2).map((n, i) => (
                <Reveal key={n.id} delay={80 * (i + 1)}>
                  <NoticeCard notice={n} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState title="No active notices" description="There are no community notices right now." />
        )}
      </Section>

      {/* 5. Community services */}
      <Section tone="white" aria-labelledby="services-title">
        <SectionHeading eyebrow="Services" title="Community Services" description="Find important services, facilities and contacts available in and around Mhinga." action={{ label: "All services", href: "/services" }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-sand-100 p-6 sm:p-8">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-2xl font-semibold">How do I…?</h3>
            <Link href="/how-to" className="inline-flex items-center gap-1.5 text-sm font-semibold text-bush-700">
              All guides <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guides.slice(0, 6).map((g) => (
              <GuideCard key={g.id} guide={g} />
            ))}
          </div>
        </div>
      </Section>

      {/* 6. Latest news */}
      <Section aria-labelledby="news-title">
        <SectionHeading eyebrow="News" title="What's happening in Mhinga?" action={{ label: "All news", href: "/news" }} />
        {news.length ? (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <NewsCard article={news[0]} />
            <div className="flex flex-col gap-6 rounded-3xl bg-white p-5 ring-1 ring-sand-200 sm:p-6">
              {news.slice(1, 5).map((a) => (
                <NewsCard key={a.id} article={a} variant="compact" />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState title="No news yet" description="Stories from the community will appear here." />
        )}
      </Section>

      {/* 7. Opportunities */}
      <Section tone="green" aria-labelledby="opps-title" className="contour-texture relative">
        <SectionHeading
          eyebrow="Opportunities"
          title="Opportunities for our people"
          description="Bursaries, learnerships, jobs and programmes — with clear steps on how to apply."
          action={{ label: "See all opportunities", href: "/opportunities" }}
          inverted
        />
        <div className="mb-8 flex flex-wrap gap-2">
          {[
            ["Bursaries", "bursary"],
            ["Jobs", "job"],
            ["Learnerships", "learnership"],
            ["Internships", "internship"],
            ["Entrepreneurship", "entrepreneurship"],
            ["Training", "training"],
          ].map(([label, cat]) => (
            <Link key={cat} href={`/opportunities?category=${cat}`} className="inline-flex h-10 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20">
              {label}
            </Link>
          ))}
        </div>
        {openOpps.length ? (
          <div className="grid gap-5 text-ink sm:grid-cols-2 lg:grid-cols-3">
            {openOpps.map((o, i) => (
              <Reveal key={o.id} delay={i * 60}>
                <OpportunityCard opportunity={o} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState title="No current opportunities found." description="Check back soon for new opportunities." />
        )}
      </Section>

      {/* 8. Education */}
      <Section aria-labelledby="edu-title">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative order-2 overflow-hidden rounded-[2rem] lg:order-1">
            <Image src={images.school.src} alt={images.school.alt} width={1600} height={1000} sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur sm:right-auto sm:max-w-xs">
              <p className="flex items-center gap-2 font-semibold text-ink">
                <Accessibility className="size-5 text-clay-600" aria-hidden /> Special needs education
              </p>
              <p className="mt-1 text-sm text-muted">Find schools and support for children with special educational needs.</p>
              <Link href="/education?category=special" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-bush-700">
                Learn more <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Education" title="Education & Learning" description="From early childhood to college — find schools near you, support for learners with special needs, and resources for exams and funding." className="mb-6!" />
            <ul className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
              {[
                { label: "Primary schools", count: schoolCounts.primary, href: "/education?category=primary", icon: BookOpen },
                { label: "Secondary schools", count: schoolCounts.secondary, href: "/education?category=secondary", icon: School },
                { label: "Special needs", count: schoolCounts.special, href: "/education?category=special", icon: Accessibility },
                { label: "Tertiary", count: schoolCounts.tertiary, href: "/education?category=tertiary", icon: GraduationCap },
              ].map(({ label, count, href, icon: Ico }) => (
                <li key={label}>
                  <Link href={href} className="group flex h-full items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-sand-200 transition hover:shadow-card hover:ring-sand-300">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sand-100 text-bush-700">
                      <Ico className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block leading-tight font-semibold text-ink">{label}</span>
                      <span className="text-sm text-muted">{count} listed</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/education" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-bush-700 px-6 font-semibold text-white hover:bg-bush-800">
              Explore education <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {/* 9. Explore */}
      <Section tone="white" aria-labelledby="explore-title">
        <SectionHeading eyebrow="Explore" title="Find your way around Mhinga" description="Schools, clinics, offices, shops, sports grounds and more." action={{ label: "Open the directory", href: "/explore" }} />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <MapView />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {places.filter((p) => p.href).slice(0, 4).map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </div>
      </Section>

      {/* 10. Events */}
      <Section aria-labelledby="events-title">
        <SectionHeading eyebrow="Events" title="Upcoming events" description="Meetings, sport, culture and workshops in the community." action={{ label: "Full calendar", href: "/events" }} />
        {events.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((e, i) => (
              <Reveal key={e.id} delay={i * 60}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState title="No upcoming events" description="Check back soon, or tell us about an event." action={{ label: "Submit an event", href: "/contact?topic=event" }} />
        )}
      </Section>

      {/* 11. Youth hub */}
      <section aria-labelledby="youth-title" className="py-6 sm:py-10">
        <div className="container-page">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-charcoal-900 px-6 py-12 sm:px-12 sm:py-16">
            <div className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-amber-gold-400/25 blur-3xl" aria-hidden />
            <div className="absolute -bottom-32 -left-16 -z-10 size-80 rounded-full bg-clay-500/25 blur-3xl" aria-hidden />
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold tracking-[0.16em] text-amber-gold-400 uppercase">Youth Hub</p>
                <h2 id="youth-title" className="text-4xl leading-[1.05] font-semibold text-white sm:text-5xl">
                  Your future starts <span className="text-amber-gold-400 italic">here.</span>
                </h2>
                <p className="mt-4 max-w-md text-lg text-sand-200">Bursaries, jobs, coding, entrepreneurship, sport and career advice for the young people of Mhinga.</p>
                <Link href="/youth" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-amber-gold-400 px-6 font-semibold text-charcoal-900 hover:bg-amber-gold-500">
                  Visit the Youth Hub <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-3">
                {[
                  { label: "Bursaries", href: "/opportunities?category=bursary", icon: Wallet },
                  { label: "Learn to code", href: "/youth#skills", icon: Code2 },
                  { label: "Start a business", href: "/youth#entrepreneurship", icon: Store },
                  { label: "Sport", href: "/youth#sport", icon: Trophy },
                ].map(({ label, href, icon: Ico }) => (
                  <li key={label}>
                    <Link href={href} className="flex h-full flex-col gap-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/10">
                      <Ico className="size-7 text-amber-gold-400" aria-hidden />
                      <span className="font-semibold text-white">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Support local */}
      <Section aria-labelledby="biz-title">
        <SectionHeading eyebrow="Businesses" title="Support Local" description="Discover the people who build, feed, fix and serve our community." action={{ label: "Browse businesses", href: "/businesses" }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.slice(0, 3).map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
        <Link href="/businesses#add-your-business" className="mt-6 flex items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-sand-300 bg-white/50 p-5 transition hover:border-bush-500 hover:bg-white">
          <span>
            <span className="block font-semibold text-ink">Own a business in Mhinga?</span>
            <span className="text-sm text-muted">List it for free so residents can find you.</span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-bush-700 text-white">
            <Plus className="size-5" aria-hidden />
          </span>
        </Link>
      </Section>

      {/* 13. Community story */}
      <Section tone="white" aria-labelledby="stories-title">
        <SectionHeading eyebrow="People of Mhinga" title="Stories from our community" action={{ label: "All stories", href: "/stories" }} />
        <div className="grid gap-5 md:grid-cols-3">
          {stories.slice(0, 3).map((s, i) => (
            <StoryCard key={s.id} story={s} size={i === 0 ? "large" : "default"} />
          ))}
        </div>
      </Section>

      {/* 14. About */}
      <Section aria-labelledby="about-title">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="About Mhinga" title="More than a place. A community." className="mb-5!" />
            <p className="text-lg leading-relaxed text-charcoal-700">
              Mhinga is a village in Limpopo, in the Vhembe District — a place of hills, fields and families who have shared this land for generations. This website exists to make everyday life a little easier, and to celebrate the people who make Mhinga home.
            </p>
            <Link href="/about" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold ring-1 ring-sand-300 hover:bg-sand-100">
              Our story <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Image src={images.village.src} alt={images.village.alt} width={800} height={1000} className="row-span-2 h-full rounded-3xl object-cover" />
            <Image src={images.fields.src} alt={images.fields.alt} width={800} height={500} className="aspect-[4/3] rounded-3xl object-cover" />
            <Image src={images.gathering.src} alt={images.gathering.alt} width={800} height={500} className="aspect-[4/3] rounded-3xl object-cover" />
          </div>
        </div>
      </Section>

      {/* 15. CTA */}
      <section className="pb-24">
        <div className="container-page">
          <div className="contour-texture flex flex-col items-start gap-6 rounded-[2rem] bg-amber-gold-100 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Help build the digital home of Mhinga</h2>
              <p className="mt-3 max-w-xl text-lg text-charcoal-700">Share news, correct a phone number, list your business or report a problem — every contribution makes this more useful for everyone.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/report" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-charcoal-900 px-6 font-semibold text-white hover:bg-charcoal-800">
                Report a problem
              </Link>
              <Link href="/contact" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold ring-1 ring-sand-300 hover:bg-sand-50">
                Get involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
