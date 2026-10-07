import Link from "next/link";
import { Building2, Clock, HandHeart, HeartPulse, Landmark, MapPin, Phone, ShieldAlert, Siren } from "lucide-react";
import type { Service } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { VerifiedBadge } from "@/components/shared/states";
import { ContactActions } from "./actions";

export const serviceIcon = {
  health: HeartPulse,
  emergency: Siren,
  support: HandHeart,
  government: Landmark,
  municipal: Building2,
  safety: ShieldAlert,
} as const;

const iconTone: Record<Service["category"], string> = {
  health: "bg-bush-50 text-bush-700",
  emergency: "bg-clay-50 text-clay-600",
  support: "bg-amber-gold-100 text-amber-gold-700",
  government: "bg-sand-100 text-charcoal-800",
  municipal: "bg-sand-100 text-charcoal-800",
  safety: "bg-clay-50 text-clay-600",
};

export function ServiceCard({ service }: { service: Service }) {
  const Ico = serviceIcon[service.category];
  return (
    <Card interactive className="flex h-full flex-col p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`grid size-12 place-items-center rounded-2xl ${iconTone[service.category]}`}>
          <Ico className="size-6" aria-hidden />
        </span>
        <VerifiedBadge verification={service.verification} />
      </div>
      <p className="text-xs font-bold tracking-wider text-clay-600 uppercase">{service.subcategory}</p>
      <h3 className="mt-1 text-xl leading-snug font-semibold">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-bush-800">
          {service.name}
        </Link>
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{service.summary}</p>
      <dl className="mt-4 space-y-1.5 text-sm text-charcoal-700">
        {service.location && (
          <div className="flex gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
            <dd>{service.location.label}</dd>
          </div>
        )}
        {service.contact.phone && (
          <div className="flex gap-2">
            <dt className="sr-only">Phone</dt>
            <Phone className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
            <dd className="font-semibold text-ink">{service.contact.phone}</dd>
          </div>
        )}
        {service.hours && (
          <div className="flex gap-2">
            <dt className="sr-only">Hours</dt>
            <Clock className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
            <dd>{service.hours}</dd>
          </div>
        )}
      </dl>
      <div className="relative z-10 mt-auto pt-5">
        <ContactActions contact={service.contact} location={service.location} detailsHref={`/services/${service.slug}`} />
      </div>
    </Card>
  );
}
