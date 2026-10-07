"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, RotateCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Fades content up as it scrolls into view. Pure CSS once revealed. */
export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn(shown ? "animate-fade-up" : "opacity-0", className)} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong.",
  description = "We couldn't load this information. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="flex flex-col items-center rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-sand-200">
      <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-clay-50 text-clay-600">
        <TriangleAlert className="size-7" aria-hidden />
      </div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-muted">{description}</p>
      {onRetry && (
        <Button className="mt-6" onClick={onRetry}>
          <RotateCw aria-hidden /> Try again
        </Button>
      )}
    </div>
  );
}

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(path);
  useEffect(() => setUrl(`${window.location.origin}${path}`), [path]);
  const text = encodeURIComponent(`${title} — ${url}`);
  const btn = "inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold ring-1 ring-sand-300 transition hover:bg-sand-100";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted">Share</span>
      <a className={btn} href={`https://wa.me/?text=${text}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
        Facebook
      </a>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable */
          }
        }}
      >
        {copied ? <Check className="size-4 text-bush-600" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
