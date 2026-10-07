import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  id,
  tone = "default",
  ...rest
}: React.HTMLAttributes<HTMLElement> & { tone?: "default" | "white" | "sand" | "dark" | "green" }) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-20",
        tone === "white" && "bg-white",
        tone === "sand" && "bg-sand-100",
        tone === "dark" && "bg-charcoal-900 text-white",
        tone === "green" && "bg-bush-800 text-white",
        className,
      )}
      {...rest}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  inverted = false,
  as: As = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  inverted?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-10",
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className={cn("mb-2 text-xs font-bold tracking-[0.16em] uppercase", inverted ? "text-amber-gold-400" : "text-clay-600")}>
            {eyebrow}
          </p>
        )}
        <As className={cn("text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl", inverted ? "text-white" : "text-ink")}>{title}</As>
        {description && <p className={cn("mt-3 text-base leading-relaxed text-pretty sm:text-lg", inverted ? "text-sand-200" : "text-muted")}>{description}</p>}
      </div>
      {action && align === "left" && (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold",
            inverted ? "text-amber-gold-400" : "text-bush-700",
          )}
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  );
}
