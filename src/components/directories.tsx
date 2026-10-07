"use client";

/**
 * Client-side filterable listings. Each receives its data from a server
 * component (which reads through src/lib/data), so swapping to Supabase
 * doesn't touch these.
 */
import { useState } from "react";
import { CalendarX, Inbox, SearchX } from "lucide-react";
import type { Business, CommunityEvent, DirectoryPlace, NewsArticle, Opportunity, School, Service } from "@/lib/types";
import { businessCategoryMeta } from "@/data/businesses";
import { placeCategoryMeta } from "@/data/community";
import { eventCategoryMeta } from "@/data/events";
import { newsCategoryMeta } from "@/data/news";
import { opportunityCategoryMeta } from "@/data/opportunities";
import { schoolTypeMeta } from "@/data/schools";
import { serviceCategoryMeta } from "@/data/services";
import { NOW } from "@/lib/clock";
import { BusinessCard } from "./cards/business-card";
import { EventCard } from "./cards/event-card";
import { PlaceCard } from "./cards/misc-cards";
import { NewsCard } from "./cards/news-card";
import { OpportunityCard } from "./cards/opportunity-card";
import { SchoolCard } from "./cards/school-card";
import { ServiceCard } from "./cards/service-card";
import { CategoryFilter, ResultsCount, SearchInput, useFilters } from "./shared/filter-bar";
import { EmptyState } from "./shared/states";

const grid = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";

function options<K extends string>(meta: Record<K, string | { label: string }>, present: string[], countFor: (v: string) => number) {
  return (Object.keys(meta) as K[])
    .filter((k) => present.includes(k))
    .map((k) => {
      const m = meta[k];
      return { value: k, label: typeof m === "string" ? m : m.label, count: countFor(k) };
    });
}

function NoResults({ onReset, noun }: { onReset: () => void; noun: string }) {
  return (
    <div>
      <EmptyState icon={SearchX} title={`No ${noun} match your search`} description="Try a different word, or clear the filters to see everything." />
      <div className="mt-4 text-center">
        <button type="button" onClick={onReset} className="font-semibold text-bush-700 hover:underline">
          Clear filters
        </button>
      </div>
    </div>
  );
}

/* ---------- Services ---------- */

export function ServicesDirectory({ services, initialCategory }: { services: Service[]; initialCategory?: string }) {
  const f = useFilters(services, {
    initialCategory,
    getCategory: (s) => s.category,
    getText: (s) => `${s.name} ${s.summary} ${s.subcategory} ${s.tags.join(" ")}`,
  });
  const present = [...new Set(services.map((s) => s.category))];
  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchInput value={f.query} onChange={f.setQuery} placeholder="Search clinics, helplines, offices…" label="services" className="max-w-xl" />
        <CategoryFilter options={options(serviceCategoryMeta, present, f.countFor)} value={f.category} onChange={f.setCategory} totalCount={services.length} />
      </div>
      <ResultsCount count={f.results.length} noun="service" filtered={f.category !== "all" || !!f.query} onReset={f.reset} />
      {f.results.length ? (
        <div className={grid}>
          {f.results.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      ) : (
        <NoResults onReset={f.reset} noun="services" />
      )}
    </div>
  );
}

/* ---------- Schools ---------- */

export function SchoolsDirectory({ schools, initialCategory }: { schools: School[]; initialCategory?: string }) {
  const f = useFilters(schools, {
    initialCategory,
    getCategory: (s) => s.type,
    getText: (s) => `${s.name} ${s.summary} ${s.location?.label ?? ""}`,
  });
  const meta = Object.fromEntries(Object.entries(schoolTypeMeta).map(([k, v]) => [k, v.label])) as Record<School["type"], string>;
  const present = [...new Set(schools.map((s) => s.type))];
  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchInput value={f.query} onChange={f.setQuery} placeholder="Search schools by name or area…" label="schools" className="max-w-xl" />
        <CategoryFilter options={options(meta, present, f.countFor)} value={f.category} onChange={f.setCategory} totalCount={schools.length} label="Filter by school type" />
      </div>
      <ResultsCount count={f.results.length} noun="listing" filtered={f.category !== "all" || !!f.query} onReset={f.reset} />
      {f.results.length ? (
        <div className={grid}>
          {f.results.map((s) => (
            <SchoolCard key={s.id} school={s} />
          ))}
        </div>
      ) : (
        <NoResults onReset={f.reset} noun="schools" />
      )}
    </div>
  );
}

/* ---------- Opportunities ---------- */

export function OpportunitiesDirectory({ opportunities, initialCategory, initialQuery }: { opportunities: Opportunity[]; initialCategory?: string; initialQuery?: string }) {
  const [showClosed, setShowClosed] = useState(false);
  const visible = showClosed ? opportunities : opportunities.filter((o) => !o.deadline || new Date(o.deadline) >= NOW);
  const f = useFilters(visible, {
    initialCategory,
    initialQuery,
    getCategory: (o) => o.category,
    getText: (o) => `${o.title} ${o.organization} ${o.summary} ${o.tags.join(" ")}`,
  });
  const present = [...new Set(opportunities.map((o) => o.category))];
  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput value={f.query} onChange={f.setQuery} placeholder="Search bursaries, jobs, learnerships…" label="opportunities" className="w-full max-w-xl" />
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-charcoal-700">
            <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} className="size-5 rounded accent-bush-700" />
            Show closed opportunities
          </label>
        </div>
        <CategoryFilter options={options(opportunityCategoryMeta, present, f.countFor)} value={f.category} onChange={f.setCategory} totalCount={visible.length} />
      </div>
      <ResultsCount count={f.results.length} noun="opportunity" filtered={f.category !== "all" || !!f.query} onReset={f.reset} />
      {f.results.length ? (
        <div className={grid}>
          {f.results.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      ) : f.query || f.category !== "all" ? (
        <NoResults onReset={f.reset} noun="opportunities" />
      ) : (
        <EmptyState icon={Inbox} title="No current opportunities found." description="Check back soon for new opportunities." />
      )}
    </div>
  );
}

/* ---------- News ---------- */

export function NewsDirectory({ articles, initialCategory }: { articles: NewsArticle[]; initialCategory?: string }) {
  const f = useFilters(articles, {
    initialCategory,
    getCategory: (a) => a.category,
    getText: (a) => `${a.title} ${a.excerpt}`,
  });
  const present = [...new Set(articles.map((a) => a.category))];
  const allCategories = Object.keys(newsCategoryMeta);
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <CategoryFilter
          options={allCategories.map((k) => ({ value: k, label: newsCategoryMeta[k as keyof typeof newsCategoryMeta], count: f.countFor(k) }))}
          value={f.category}
          onChange={f.setCategory}
          totalCount={articles.length}
        />
        <SearchInput value={f.query} onChange={f.setQuery} placeholder="Search articles…" label="news" className="w-full lg:max-w-xs" />
      </div>
      {f.results.length ? (
        <div className={grid}>
          {f.results.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Inbox} title="No articles in this category yet" description="New stories are added regularly. Check back soon." />
      )}
    </div>
  );
}

/* ---------- Events ---------- */

export function EventsDirectory({ events }: { events: CommunityEvent[] }) {
  const [when, setWhen] = useState<"upcoming" | "past">("upcoming");
  const scoped = events.filter((e) => (when === "upcoming" ? new Date(e.endsAt ?? e.startsAt) >= NOW : new Date(e.endsAt ?? e.startsAt) < NOW));
  const f = useFilters(scoped, { getCategory: (e) => e.category, getText: (e) => `${e.title} ${e.summary} ${e.venue}` });
  const present = [...new Set(events.map((e) => e.category))];
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        <div className="inline-flex w-fit rounded-full bg-white p-1 ring-1 ring-sand-300" role="tablist" aria-label="Event timing">
          {(["upcoming", "past"] as const).map((w) => (
            <button
              key={w}
              role="tab"
              aria-selected={when === w}
              type="button"
              onClick={() => setWhen(w)}
              className={`h-10 rounded-full px-5 text-sm font-semibold capitalize transition ${when === w ? "bg-bush-700 text-white" : "text-charcoal-700 hover:bg-sand-100"}`}
            >
              {w}
            </button>
          ))}
        </div>
        <CategoryFilter options={options(eventCategoryMeta, present, f.countFor)} value={f.category} onChange={f.setCategory} totalCount={scoped.length} />
      </div>
      {f.results.length ? (
        <div className={grid}>
          {f.results.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CalendarX}
          title={when === "upcoming" ? "No upcoming events in this category" : "No past events to show"}
          description="Organising something? Let us know and we'll add it to the calendar."
          action={{ label: "Submit an event", href: "/contact?topic=event" }}
        />
      )}
    </div>
  );
}

/* ---------- Businesses ---------- */

export function BusinessesDirectory({ businesses, initialCategory }: { businesses: Business[]; initialCategory?: string }) {
  const f = useFilters(businesses, {
    initialCategory,
    getCategory: (b) => b.category,
    getText: (b) => `${b.name} ${b.summary} ${(b.services ?? []).join(" ")}`,
  });
  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchInput value={f.query} onChange={f.setQuery} placeholder="Search for a plumber, salon, mechanic…" label="businesses" className="max-w-xl" />
        <CategoryFilter options={(Object.keys(businessCategoryMeta) as Business["category"][]).map((k) => ({ value: k, label: businessCategoryMeta[k], count: f.countFor(k) }))} value={f.category} onChange={f.setCategory} totalCount={businesses.length} />
      </div>
      <ResultsCount count={f.results.length} noun="business" filtered={f.category !== "all" || !!f.query} onReset={f.reset} />
      {f.results.length ? (
        <div className={grid}>
          {f.results.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Inbox} title="No businesses listed here yet" description="Run a business in this category? Add it for free." action={{ label: "Add your business", href: "#add-your-business" }} />
      )}
    </div>
  );
}

/* ---------- Explore places ---------- */

export function PlacesDirectory({ places, initialCategory, map }: { places: DirectoryPlace[]; initialCategory?: string; map: React.ReactNode }) {
  const f = useFilters(places, {
    initialCategory,
    getCategory: (p) => p.category,
    getText: (p) => `${p.name} ${p.description} ${p.location.label}`,
  });
  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchInput value={f.query} onChange={f.setQuery} placeholder="Search places…" label="places" className="max-w-xl" />
        <CategoryFilter options={(Object.keys(placeCategoryMeta) as DirectoryPlace["category"][]).map((k) => ({ value: k, label: placeCategoryMeta[k], count: f.countFor(k) }))} value={f.category} onChange={f.setCategory} totalCount={places.length} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 lg:order-1">
          <ResultsCount count={f.results.length} noun="place" filtered={f.category !== "all" || !!f.query} onReset={f.reset} />
          {f.results.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {f.results.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
          ) : (
            <NoResults onReset={f.reset} noun="places" />
          )}
        </div>
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-24">{map}</div>
        </div>
      </div>
    </div>
  );
}
