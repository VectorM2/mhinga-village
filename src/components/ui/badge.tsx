import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5 [&_svg]:size-3.5",
  {
    variants: {
      tone: {
        neutral: "bg-sand-100 text-charcoal-700",
        green: "bg-bush-50 text-bush-800 ring-1 ring-bush-100",
        clay: "bg-clay-50 text-clay-700 ring-1 ring-clay-100",
        gold: "bg-amber-gold-100 text-amber-gold-700",
        dark: "bg-charcoal-900/80 text-white backdrop-blur",
        outline: "ring-1 ring-sand-300 text-charcoal-700 bg-white",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({ className, tone, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
