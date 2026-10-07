"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";
import { CategoryFilter } from "./shared/filter-bar";
import { EmptyState } from "./shared/states";

const cats = ["community", "events", "schools", "sports", "culture", "nature", "history"] as const;
const aspect = { portrait: "aspect-[3/4]", landscape: "aspect-[4/3]", square: "aspect-square" };

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "all" ? items : items.filter((i) => i.category === cat);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % list.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + list.length) % list.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, list.length]);

  const current = open !== null ? list[open] : null;
  return (
    <div>
      <div className="mb-8">
        <CategoryFilter options={cats.map((c) => ({ value: c, label: c[0].toUpperCase() + c.slice(1), count: items.filter((i) => i.category === c).length }))} value={cat} onChange={setCat} totalCount={items.length} />
      </div>
      {list.length ? (
        <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {list.map((item, i) => (
            <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-2xl text-left">
                <span className={`relative block ${aspect[item.aspect]}`}>
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/80 to-transparent p-3 pt-10 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="No photos in this category yet" description="Be the first to share one." />
      )}

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.title} className="fixed inset-0 z-50 flex animate-fade-in flex-col bg-charcoal-900/95 p-4 sm:p-8">
          <div className="flex items-center justify-between text-white">
            <p className="font-semibold">{current.title}</p>
            <button type="button" onClick={() => setOpen(null)} className="grid size-11 place-items-center rounded-full hover:bg-white/10" aria-label="Close" autoFocus>
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <div className="relative my-4 flex-1">
            <Image src={current.image.src} alt={current.image.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-center gap-4">
            <button type="button" onClick={() => setOpen((o) => (o! - 1 + list.length) % list.length)} className="grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous photo">
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <span className="text-sm text-sand-300">
              {open! + 1} / {list.length}
            </span>
            <button type="button" onClick={() => setOpen((o) => (o! + 1) % list.length)} className="grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next photo">
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
