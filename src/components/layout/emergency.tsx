"use client";

import Link from "next/link";
import { Ambulance, Phone, ShieldAlert, Siren } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { emergencyNumbers } from "@/lib/site";
import { cn, telHref } from "@/lib/utils";

const toneIcon = { police: ShieldAlert, medical: Ambulance, general: Siren } as const;

export function EmergencyNumbersList({ compact = false }: { compact?: boolean }) {
  return (
    <ul className="space-y-3">
      {emergencyNumbers.map((n) => {
        const Ico = toneIcon[n.tone];
        return (
          <li key={n.number}>
            <a
              href={telHref(n.number)}
              className={cn(
                "group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-sand-200 transition hover:ring-clay-500 focus-visible:ring-clay-500",
                compact && "p-3",
              )}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-clay-50 text-clay-600">
                <Ico className="size-6" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-charcoal-700">{n.label}</span>
                <span className="block font-display text-3xl leading-tight font-semibold tracking-tight text-ink">{n.number}</span>
                {!compact && <span className="block text-sm text-muted">{n.description}</span>}
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-clay-600 text-white shadow-sm transition group-hover:bg-clay-700" aria-hidden>
                <Phone className="size-5" />
              </span>
              <span className="sr-only">Call {n.label} on {n.number}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function EmergencyButton({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-clay-600 font-semibold text-white shadow-sm ring-clay-600/30 transition hover:bg-clay-700 hover:ring-4",
          size === "sm" ? "h-10 px-3.5 text-sm" : "h-11 px-4 text-[0.9375rem]",
          className,
        )}
        aria-label="Emergency numbers"
      >
        <Siren className="size-4.5" aria-hidden />
        <span>Emergency</span>
      </DialogTrigger>
      <DialogContent className="bg-sand-50">
        <div className="mb-5 flex items-center gap-3 pr-8">
          <span className="relative grid size-11 place-items-center rounded-full bg-clay-600 text-white">
            <span className="absolute inset-0 animate-ping rounded-full bg-clay-500/40 motion-reduce:hidden" aria-hidden />
            <Siren className="relative size-5" aria-hidden />
          </span>
          <div>
            <DialogTitle className="text-2xl font-semibold">Emergency numbers</DialogTitle>
            <DialogDescription className="text-sm text-muted">Tap a number to call. Free from any phone.</DialogDescription>
          </div>
        </div>
        <EmergencyNumbersList />
        <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-relaxed text-charcoal-700 ring-1 ring-sand-200">
          <p className="font-semibold text-ink">When you call, say:</p>
          <p>Your name · Where you are (section, nearest school, shop or landmark) · What happened · How many people need help.</p>
        </div>
        <p className="mt-4 text-sm text-muted">
          More helplines (GBV, mental health, child protection) on the{" "}
          <Link href="/services?category=support" className="font-semibold text-bush-700 underline underline-offset-4">
            Services page
          </Link>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}
