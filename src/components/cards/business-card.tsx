import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { Business } from "@/lib/types";
import { businessCategoryMeta } from "@/data/businesses";
import { Card } from "@/components/ui/card";
import { SampleBadge } from "@/components/shared/states";
import { cn } from "@/lib/utils";
import { ContactActions } from "./actions";

const swatches = ["bg-bush-700", "bg-clay-600", "bg-charcoal-800", "bg-amber-gold-500", "bg-bush-500"];

export function BusinessLogo({ business, className }: { business: Business; className?: string }) {
  const swatch = swatches[business.name.length % swatches.length];
  return (
    <span className={cn("grid size-14 shrink-0 place-items-center rounded-2xl font-display text-xl font-semibold text-white shadow-sm", swatch, className)} aria-hidden>
      {business.logoInitials}
    </span>
  );
}

export function BusinessCard({ business }: { business: Business }) {
  const b = business;
  const hasContact = b.contact.phone || b.contact.whatsapp || b.contact.website;
  return (
    <Card interactive className="flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <BusinessLogo business={b} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-clay-600 uppercase">{businessCategoryMeta[b.category]}</span>
            {b.isSample && <SampleBadge />}
          </div>
          <h3 className="mt-0.5 text-lg leading-snug font-semibold">
            <Link href={`/businesses/${b.slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-bush-800">
              {b.name}
            </Link>
          </h3>
        </div>
      </div>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{b.summary}</p>
      {b.services && (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Services">
          {b.services.map((s) => (
            <li key={s} className="rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-medium text-charcoal-700">
              {s}
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-4 space-y-1.5 text-sm text-charcoal-700">
        {b.location && (
          <li className="flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden /> {b.location.label}
          </li>
        )}
        {b.hours && (
          <li className="flex gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden /> {b.hours}
          </li>
        )}
      </ul>
      <div className="relative z-10 mt-auto pt-5">
        {hasContact ? (
          <ContactActions contact={b.contact} location={b.location} />
        ) : (
          <p className="text-sm text-muted italic">Contact details coming soon</p>
        )}
      </div>
    </Card>
  );
}
