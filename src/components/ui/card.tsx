import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, interactive, ...props }: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white shadow-card ring-1 ring-sand-200/70",
        interactive && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-within:shadow-lift",
        className,
      )}
      {...props}
    />
  );
}
