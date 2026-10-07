import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { images, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal-900" aria-labelledby="hero-title">
      <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="-z-20 animate-slow-zoom object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/45 to-charcoal-900/90" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-900/70 to-transparent" />

      <div className="container-page flex min-h-[34rem] flex-col justify-end pt-16 pb-28 sm:min-h-[40rem] sm:pb-36 lg:min-h-[44rem] lg:justify-center lg:pb-40">
        <p className="mb-5 inline-flex w-fit animate-fade-up items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-sand-100 ring-1 ring-white/20 backdrop-blur">
          <MapPin className="size-4 text-amber-gold-400" aria-hidden />
          {siteConfig.location}
        </p>
        <h1 id="hero-title" className="max-w-3xl animate-fade-up text-[2.75rem] leading-[1.02] font-semibold text-white [animation-delay:60ms] sm:text-6xl lg:text-7xl">
          Welcome to <span className="text-amber-gold-400 italic">Mhinga</span>
        </h1>
        <p className="mt-4 animate-fade-up font-display text-xl text-sand-100 [animation-delay:120ms] sm:text-2xl">Our Home. Our Community. Our Future.</p>
        <p className="mt-4 max-w-xl animate-fade-up text-base leading-relaxed text-sand-200 [animation-delay:180ms] sm:text-lg">
          A digital community hub connecting the people of Mhinga with local services, opportunities, information and one another.
        </p>

        <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
          <Link href="/explore" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-amber-gold-400 px-7 font-semibold text-charcoal-900 shadow-lg shadow-black/20 transition hover:bg-amber-gold-500">
            Explore Mhinga <ArrowRight className="size-5" aria-hidden />
          </Link>
          <Link href="/services" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white/10 px-7 font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
            Community Services
          </Link>
        </div>

        <form action="/search" role="search" className="mt-6 max-w-xl animate-fade-up [animation-delay:300ms] sm:mt-8">
          <label htmlFor="hero-search" className="sr-only">
            Search Mhinga
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder="Try “clinic” or “NSFAS”"
              className="h-14 w-full rounded-full bg-white/95 pr-28 pl-13 text-base sm:pr-32 text-ink shadow-xl shadow-black/20 placeholder:text-muted focus:ring-4 focus:ring-amber-gold-400/50 focus:outline-none"
            />
            <button type="submit" className="absolute top-1.5 right-1.5 h-11 rounded-full bg-bush-700 px-5 text-sm font-semibold text-white hover:bg-bush-800">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
