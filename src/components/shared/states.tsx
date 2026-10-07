import Link from "next/link";
import { ArrowRight, Info, SearchX, ShieldCheck, TriangleAlert } from "lucide-react";
import type { Verification } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------- Empty ---------- */

export function EmptyState({
  title = "Nothing here yet",
  description = "Check back soon.",
  action,
  icon: IconCmp = SearchX,
  className,
}: {
  title?: string;
  description?: string;
  action?: { label: string; href: string };
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center rounded-3xl border-2 border-dashed border-sand-300 bg-white/60 px-6 py-14 text-center", className)}>
      <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-sand-100 text-muted">
        <IconCmp className="size-7" />
      </div>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-muted">{description}</p>
      {action && (
        <Link href={action.href} className="mt-5 inline-flex items-center gap-1.5 font-semibold text-bush-700 hover:underline">
          {action.label} <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}

/* ---------- Skeletons ---------- */

export function CardSkeleton({ withImage = true }: { withImage?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white p-0 ring-1 ring-sand-200" aria-hidden>
      {withImage && <Skeleton className="aspect-[16/10] rounded-none" />}
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6, withImage = true }: { count?: number; withImage?: boolean }) {
  return (
    <div role="status" aria-label="Loading" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} withImage={withImage} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function PageSkeleton({ cards = 6, withImage = true }: { cards?: number; withImage?: boolean }) {
  return (
    <div>
      <div className="border-b border-sand-200 bg-sand-100">
        <div className="container-page space-y-4 py-14">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-2/3 max-w-xl" />
          <Skeleton className="h-5 w-full max-w-lg" />
        </div>
      </div>
      <div className="container-page py-12">
        <GridSkeleton count={cards} withImage={withImage} />
      </div>
    </div>
  );
}

/* ---------- Trust & verification ---------- */

export function VerifiedBadge({ verification, className }: { verification: Verification; className?: string }) {
  if (verification.status === "verified") {
    return (
      <span
        className={cn("inline-flex items-center gap-1 rounded-full bg-bush-50 px-2 py-0.5 text-xs font-semibold text-bush-700 ring-1 ring-bush-100", className)}
        title={verification.verifiedAt ? `Verified ${formatDate(verification.verifiedAt)}` : "Verified"}
      >
        <ShieldCheck className="size-3.5" aria-hidden /> Verified
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-amber-gold-100 px-2 py-0.5 text-xs font-semibold text-amber-gold-700", className)}>
      <Info className="size-3.5" aria-hidden /> {verification.status === "needs_update" ? "Needs update" : "To be confirmed"}
    </span>
  );
}

export function VerificationNote({ verification }: { verification: Verification }) {
  const verified = verification.status === "verified";
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-2xl p-4 text-sm leading-relaxed",
        verified ? "bg-bush-50 text-bush-900 ring-1 ring-bush-100" : "bg-amber-gold-100/60 text-charcoal-800 ring-1 ring-amber-gold-100",
      )}
    >
      {verified ? <ShieldCheck className="mt-0.5 size-5 shrink-0 text-bush-700" aria-hidden /> : <Info className="mt-0.5 size-5 shrink-0 text-amber-gold-700" aria-hidden />}
      <div>
        <p className="font-semibold">{verified ? "Verified information" : "Information to be confirmed"}</p>
        <p className="mt-0.5">
          {verified
            ? `Checked by ${verification.verifiedBy ?? "an administrator"}${verification.verifiedAt ? ` on ${formatDate(verification.verifiedAt)}` : ""}.`
            : "Some details on this page have not yet been confirmed. Please check with the relevant office before relying on them."}
          {verification.source && <span className="mt-1 block text-muted">Source: {verification.sourceUrl ? <a className="underline" href={verification.sourceUrl} target="_blank" rel="noreferrer">{verification.source}</a> : verification.source}</span>}
        </p>
        <Link href="/contact?topic=correction" className="mt-2 inline-block font-semibold underline underline-offset-4">
          Suggest a correction
        </Link>
      </div>
    </aside>
  );
}

export function SampleBadge({ className, label = "Sample" }: { className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-charcoal-900/5 px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide text-charcoal-700 uppercase ring-1 ring-charcoal-900/10", className)} title="Sample content — to be replaced with real information">
      {label}
    </span>
  );
}

export function Placeholder({ children = "Information to be confirmed" }: { children?: React.ReactNode }) {
  return <span className="text-muted italic">{children}</span>;
}

export function Callout({ tone = "info", title, children }: { tone?: "info" | "warning"; title?: string; children: React.ReactNode }) {
  const Ico = tone === "warning" ? TriangleAlert : Info;
  return (
    <div className={cn("flex gap-3 rounded-2xl p-4 sm:p-5", tone === "warning" ? "bg-clay-50 ring-1 ring-clay-100" : "bg-bush-50 ring-1 ring-bush-100")}>
      <Ico className={cn("mt-0.5 size-5 shrink-0", tone === "warning" ? "text-clay-600" : "text-bush-700")} aria-hidden />
      <div className="text-[0.95rem] leading-relaxed text-charcoal-800">
        {title && <p className="mb-0.5 font-semibold text-ink">{title}</p>}
        {children}
      </div>
    </div>
  );
}
