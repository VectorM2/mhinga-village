import Link from "next/link";
import { Compass } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="contour-texture">
        <div className="container-page flex flex-col items-center py-24 text-center sm:py-32">
          <span className="mb-6 grid size-16 place-items-center rounded-2xl bg-bush-50 text-bush-700">
            <Compass className="size-8" aria-hidden />
          </span>
          <p className="text-sm font-bold tracking-[0.16em] text-clay-600 uppercase">Page not found</p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">We couldn&apos;t find that page</h1>
          <p className="mt-4 max-w-md text-lg text-muted">It may have moved, or the link may be wrong. These might help:</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["Opportunities", "/opportunities"],
              ["Search", "/search"],
            ].map(([l, h]) => (
              <Link key={h} href={h} className="inline-flex h-11 items-center rounded-full bg-white px-5 font-semibold ring-1 ring-sand-300 hover:bg-sand-100">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
