import Link from "next/link";
import { cn } from "@/lib/utils";

/** Mark: two hills meeting under a rising sun — reads as a soft "M". */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden>
      <rect width="40" height="40" rx="12" className="fill-bush-700" />
      <circle cx="20" cy="17" r="6" className="fill-amber-gold-400" />
      <path d="M4 33 C10 20 15 18 20 27 C25 18 30 20 36 33 Z" className="fill-sand-50" />
      <path d="M4 33 C10 24 15 23 20 30 C25 23 30 24 36 33 Z" className="fill-bush-200" opacity="0.55" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)} aria-label="Mhinga — home">
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-3" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.45rem] font-semibold tracking-tight", inverted ? "text-white" : "text-ink")}>Mhinga</span>
        <span className={cn("mt-0.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase", inverted ? "text-sand-200" : "text-muted")}>
          Limpopo
        </span>
      </span>
    </Link>
  );
}
