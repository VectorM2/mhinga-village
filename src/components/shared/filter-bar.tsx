"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/** Keeps ?category= and ?q= in the URL without a navigation, so filtered views are shareable. */
function syncUrl(params: Record<string, string>) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  for (const [k, v] of Object.entries(params)) {
    if (v && v !== "all") url.searchParams.set(k, v);
    else url.searchParams.delete(k);
  }
  window.history.replaceState(null, "", url);
}

export function useFilters<T>(items: T[], opts: { initialCategory?: string; initialQuery?: string; getCategory: (x: T) => string | string[]; getText: (x: T) => string }) {
  const [category, setCategoryState] = useState(opts.initialCategory ?? "all");
  const [query, setQueryState] = useState(opts.initialQuery ?? "");

  const setCategory = (c: string) => {
    setCategoryState(c);
    syncUrl({ category: c });
  };
  const setQuery = (q: string) => {
    setQueryState(q);
    syncUrl({ q });
  };

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((it) => {
      const cat = opts.getCategory(it);
      const inCat = category === "all" || (Array.isArray(cat) ? cat.includes(category) : cat === category);
      if (!inCat) return false;
      if (!terms.length) return true;
      const text = opts.getText(it).toLowerCase();
      return terms.every((t) => text.includes(t));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, category, query]);

  const countFor = (value: string) =>
    items.filter((it) => {
      const cat = opts.getCategory(it);
      return Array.isArray(cat) ? cat.includes(value) : cat === value;
    }).length;

  const reset = () => {
    setCategory("all");
    setQuery("");
  };

  return { category, setCategory, query, setQuery, results, countFor, reset };
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  label = "Search",
  className,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <label className="sr-only" htmlFor={`search-${label}`}>
        {label}
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
      <input
        id={`search-${label}`}
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-13 w-full rounded-full border border-sand-300 bg-white pr-12 pl-12 text-base shadow-card placeholder:text-muted/70 focus:border-bush-500 focus:ring-4 focus:ring-bush-100 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-sand-100" aria-label="Clear search">
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

export function CategoryFilter({
  options,
  value,
  onChange,
  label = "Filter by category",
  allLabel = "All",
  totalCount,
}: {
  options: FilterOption[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
  allLabel?: string;
  totalCount?: number;
}) {
  const all: FilterOption = { value: "all", label: allLabel, count: totalCount };
  return (
    <div role="group" aria-label={label} className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {[all, ...options].map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition",
                active ? "bg-charcoal-900 text-white shadow-sm" : "bg-white text-charcoal-700 ring-1 ring-sand-300 hover:bg-sand-100",
              )}
            >
              {o.label}
              {o.count !== undefined && <span className={cn("rounded-full px-1.5 text-xs", active ? "bg-white/20" : "bg-sand-100 text-muted")}>{o.count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ResultsCount({ count, noun, onReset, filtered }: { count: number; noun: string; onReset?: () => void; filtered?: boolean }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3 text-sm text-muted" aria-live="polite">
      <p>
        Showing <span className="font-semibold text-ink">{count}</span> {count === 1 ? noun : `${noun}s`}
      </p>
      {filtered && onReset && (
        <button type="button" onClick={onReset} className="font-semibold text-bush-700 hover:underline">
          Clear filters
        </button>
      )}
    </div>
  );
}
