import { ExternalLink } from "lucide-react";
import { tamsRegisterUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sends a resident to TAMS to create an account — from there they can
 * apply for land online. TAMS is a separate site, so this opens in a new tab.
 */
export function ApplyOnlineLink({ className, tone = "green" }: { className?: string; tone?: "green" | "light" }) {
  return (
    <a
      href={tamsRegisterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold transition",
        tone === "green" ? "bg-bush-700 text-white hover:bg-bush-800" : "bg-white text-charcoal-900 ring-1 ring-sand-300 hover:bg-sand-100",
        className,
      )}
    >
      Apply for land online <ExternalLink className="size-4" aria-hidden />
      <span className="sr-only">(opens TAMS in a new tab)</span>
    </a>
  );
}
