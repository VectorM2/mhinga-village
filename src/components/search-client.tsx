"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { ArrowRight, Briefcase, Calendar, FileQuestion, GraduationCap, HeartPulse, Newspaper, SearchX, Store } from "lucide-react";
import type { SearchKind, SearchResult } from "@/lib/types";
import { CategoryFilter, SearchInput } from "./shared/filter-bar";
import { EmptyState } from "./shared/states";
import { Skeleton } from "./ui/skeleton";

const kinds: { value: SearchKind; label: string; icon: typeof HeartPulse }[] = [
  { value: "service", label: "Services", icon: HeartPulse },
  { value: "school", label: "Schools", icon: GraduationCap },
  { value: "opportunity", label: "Opportunities", icon: Briefcase },
  { value: "guide", label: "How-to guides", icon: FileQuestion },
  { value: "article", label: "News", icon: Newspaper },
  { value: "event", label: "Events", icon: Calendar },
  { value: "business", label: "Businesses", icon: Store },
];
const kindMeta = Object.fromEntries(kinds.map((k) => [k.value, k])) as Record<SearchKind, (typeof kinds)[number]>;

const popular = ["clinic", "NSFAS", "bursary", "water", "SASSA", "ID", "school", "land", "jobs"];

function score(r: SearchResult, terms: string[]) {
  const title = r.title.toLowerCase();
  const body = `${r.description} ${r.meta ?? ""}`.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (title.includes(t)) s += title.startsWith(t) ? 6 : 4;
    else if (body.includes(t)) s += 1;
    else return 0;
  }
  return s;
}

export function SearchClient({ index, initialQuery = "" }: { index: SearchResult[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [kind, setKind] = useState("all");
  const deferred = useDeferredValue(query);
  const loading = query !== deferred;

  const matches = useMemo(() => {
    const terms = deferred.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index
      .map((r) => ({ r, s: score(r, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.r);
  }, [deferred, index]);

  const results = kind === "all" ? matches : matches.filter((m) => m.kind === kind);

  const update = (q: string) => {
    setQuery(q);
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  };

  return (
    <div>
      <SearchInput value={query} onChange={update} placeholder="Search services, schools, bursaries, guides…" label="site" autoFocus className="max-w-2xl" />
      {!query && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-muted">Popular:</span>
          {popular.map((p) => (
            <button key={p} type="button" onClick={() => update(p)} className="h-9 rounded-full bg-white px-3.5 text-sm font-medium ring-1 ring-sand-300 hover:bg-sand-100">
              {p}
            </button>
          ))}
        </div>
      )}
      {query && (
        <div className="mt-6">
          <CategoryFilter options={kinds.map((k) => ({ value: k.value, label: k.label, count: matches.filter((m) => m.kind === k.value).length }))} value={kind} onChange={setKind} totalCount={matches.length} label="Filter results by type" />
        </div>
      )}

      <div className="mt-8" aria-live="polite">
        {!query ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/services", label: "Services", icon: HeartPulse },
              { href: "/education", label: "Schools", icon: GraduationCap },
              { href: "/opportunities", label: "Opportunities", icon: Briefcase },
              { href: "/how-to", label: "How-to guides", icon: FileQuestion },
            ].map(({ href, label, icon: Ico }) => (
              <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-semibold ring-1 ring-sand-200 hover:shadow-card">
                <Ico className="size-5 text-bush-700" aria-hidden /> Browse {label.toLowerCase()}
              </Link>
            ))}
          </div>
        ) : loading ? (
          <div className="space-y-3" role="status" aria-label="Searching">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand-200">
                <Skeleton className="size-11 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length ? (
          <>
            <p className="mb-4 text-sm text-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for <span className="font-semibold text-ink">“{deferred}”</span>
            </p>
            <ul className="space-y-3">
              {results.map((r) => {
                const m = kindMeta[r.kind] ?? kinds[0];
                const Ico = m.icon;
                return (
                  <li key={`${r.kind}-${r.id}`}>
                    <Link href={r.href} className="group flex gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200/70 transition hover:shadow-lift">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sand-100 text-bush-700">
                        <Ico className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-xs font-bold tracking-wider text-clay-600 uppercase">{m.label.replace(/s$/, "")}</span>
                        <span className="mt-0.5 block text-lg leading-snug font-semibold text-ink group-hover:text-bush-800">{r.title}</span>
                        <span className="mt-1 line-clamp-2 block text-sm text-muted">{r.description}</span>
                      </span>
                      <ArrowRight className="mt-1 size-5 shrink-0 text-muted transition group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <EmptyState icon={SearchX} title={`No results for “${deferred}”`} description="Try a simpler word like “clinic”, “bursary” or “water” — or browse the sections below." action={{ label: "Browse all services", href: "/services" }} />
        )}
      </div>
    </div>
  );
}
