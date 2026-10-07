import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, inverted = false }: { items: Crumb[]; inverted?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className={cn("flex flex-wrap items-center gap-1 text-sm", inverted ? "text-sand-200" : "text-muted")}>
        <li>
          <Link href="/" className="inline-flex items-center gap-1 rounded hover:underline" aria-label="Home">
            <Home className="size-3.5" aria-hidden />
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.label} className="inline-flex items-center gap-1">
            <ChevronRight className="size-3.5 opacity-60" aria-hidden />
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="rounded hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn("font-medium", inverted ? "text-white" : "text-ink")}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  title,
  eyebrow,
  description,
  crumbs,
  image,
  children,
  variant = "image",
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  crumbs: Crumb[];
  image?: { src: string; alt: string };
  children?: React.ReactNode;
  variant?: "image" | "plain";
}) {
  if (variant === "plain" || !image) {
    return (
      <header className="contour-texture border-b border-sand-200 bg-sand-100">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={crumbs} />
          {eyebrow && <p className="mb-2 text-xs font-bold tracking-[0.16em] text-clay-600 uppercase">{eyebrow}</p>}
          <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{description}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </header>
    );
  }
  return (
    <header className="relative isolate overflow-hidden bg-charcoal-900">
      <Image src={image.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/75 to-charcoal-900/30" />
      <div className="container-page py-12 sm:py-20">
        <Breadcrumbs items={crumbs} inverted />
        {eyebrow && <p className="mb-2 text-xs font-bold tracking-[0.16em] text-amber-gold-400 uppercase">{eyebrow}</p>}
        <h1 className="max-w-3xl animate-fade-up text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl animate-fade-up text-lg leading-relaxed text-pretty text-sand-200 [animation-delay:80ms]">{description}</p>}
        {children && <div className="mt-7 animate-fade-up [animation-delay:160ms]">{children}</div>}
      </div>
    </header>
  );
}
