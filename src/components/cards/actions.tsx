import Link from "next/link";
import { ArrowRight, ExternalLink, Globe, MessageCircle, Navigation, Phone } from "lucide-react";
import type { ContactInfo, Place } from "@/lib/types";
import { cn, directionsHref, telHref, whatsappHref } from "@/lib/utils";

const pill =
  "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition [&_svg]:size-4 [&_svg]:shrink-0";

export function CallButton({ phone, label = "Call", className }: { phone: string; label?: string; className?: string }) {
  return (
    <a href={telHref(phone)} className={cn(pill, "bg-bush-700 text-white hover:bg-bush-800", className)} aria-label={`${label} ${phone}`}>
      <Phone aria-hidden /> {label}
    </a>
  );
}

export function ContactActions({
  contact,
  location,
  detailsHref,
  className,
}: {
  contact: ContactInfo;
  location?: Place;
  detailsHref?: string;
  className?: string;
}) {
  const hasLocation = location && !/confirm|various|nearest/i.test(location.label);
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {contact.phone && <CallButton phone={contact.phone} />}
      {contact.whatsapp && (
        <a href={whatsappHref(contact.whatsapp)} target="_blank" rel="noreferrer" className={cn(pill, "bg-[#e7f6ec] text-[#11683a] hover:bg-[#d4efdd]")}>
          <MessageCircle aria-hidden /> WhatsApp
        </a>
      )}
      {hasLocation && (
        <a href={directionsHref(location.label, location.latitude, location.longitude)} target="_blank" rel="noreferrer" className={cn(pill, "bg-sand-100 text-ink hover:bg-sand-200")}>
          <Navigation aria-hidden /> Directions
        </a>
      )}
      {contact.website && !detailsHref && (
        <a href={contact.website} target="_blank" rel="noreferrer" className={cn(pill, "bg-sand-100 text-ink hover:bg-sand-200")}>
          <Globe aria-hidden /> Website
        </a>
      )}
      {detailsHref && (
        <Link href={detailsHref} className={cn(pill, "text-bush-700 ring-1 ring-sand-300 hover:bg-sand-100")}>
          View details <ArrowRight aria-hidden />
        </Link>
      )}
    </div>
  );
}

export function ExternalButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cn(pill, "bg-bush-700 text-white hover:bg-bush-800", className)}>
      {children} <ExternalLink aria-hidden />
    </a>
  );
}
