import Link from "next/link";
import { ArrowRight, Building, CalendarClock, CheckCircle2, ExternalLink, RefreshCw } from "lucide-react";
import type { Opportunity } from "@/lib/types";
import { opportunityCategoryMeta } from "@/data/opportunities";
import { Card } from "@/components/ui/card";
import { SampleBadge } from "@/components/shared/states";
import { cn, daysUntil, formatDate } from "@/lib/utils";
import { NOW } from "@/lib/clock";

export function DeadlineChip({ opportunity, now = NOW }: { opportunity: Opportunity; now?: Date }) {
  if (!opportunity.deadline) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-charcoal-700 ring-1 ring-sand-200">
        <RefreshCw className="size-3.5" aria-hidden /> {opportunity.deadlineNote ?? "Ongoing"}
      </span>
    );
  }
  const days = daysUntil(opportunity.deadline, now);
  const closed = days < 0;
  const soon = !closed && days <= 14;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        closed ? "bg-sand-200 text-muted line-through" : soon ? "bg-clay-50 text-clay-700 ring-1 ring-clay-100" : "bg-bush-50 text-bush-800",
      )}
    >
      <CalendarClock className="size-3.5" aria-hidden />
      {closed ? "Closed" : `Closes ${formatDate(opportunity.deadline, { day: "numeric", month: "short" })}`}
      {soon && <span className="font-bold">· {days === 0 ? "today" : `${days} day${days === 1 ? "" : "s"} left`}</span>}
    </span>
  );
}

export function OpportunityCard({ opportunity, now = NOW }: { opportunity: Opportunity; now?: Date }) {
  const o = opportunity;
  return (
    <Card interactive className="flex h-full flex-col p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-charcoal-900 px-2.5 py-1 text-xs font-semibold text-amber-gold-400">{opportunityCategoryMeta[o.category].label}</span>
        <DeadlineChip opportunity={o} now={now} />
        {o.isSample && <SampleBadge />}
      </div>
      <h3 className="text-xl leading-snug font-semibold">
        <Link href={`/opportunities/${o.slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-bush-800">
          {o.title}
        </Link>
      </h3>
      <p className="mt-1 inline-flex items-start gap-1.5 text-sm text-charcoal-700">
        <Building className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden /> {o.organization}
      </p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{o.summary}</p>
      {o.eligibility[0] && (
        <p className="mt-3 flex gap-2 text-sm text-charcoal-700">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-bush-600" aria-hidden />
          <span>
            <span className="sr-only">Eligibility: </span>
            {o.eligibility[0]}
          </span>
        </p>
      )}
      <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-5">
        <Link href={`/opportunities/${o.slug}`} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-bush-700 px-4 text-sm font-semibold text-white transition hover:bg-bush-800">
          How to apply <ArrowRight className="size-4" aria-hidden />
        </Link>
        {o.applyUrl && (
          <a href={o.applyUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-bush-700 ring-1 ring-sand-300 transition hover:bg-sand-100">
            Official site <ExternalLink className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </Card>
  );
}
