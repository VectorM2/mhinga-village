import * as React from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-sand-300 bg-white px-4 text-base text-ink placeholder:text-muted/70 shadow-[inset_0_1px_2px_rgb(0_0_0/0.03)] transition focus:border-bush-500 focus:outline-none focus:ring-4 focus:ring-bush-100 disabled:opacity-60 aria-[invalid=true]:border-clay-500";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(field, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(field, "min-h-32 py-3 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(field, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

export function Label({ className, children, required, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn("mb-1.5 block text-sm font-semibold text-charcoal-800", className)} {...props}>
      {children}
      {required ? <span className="ml-0.5 text-clay-600" aria-hidden>*</span> : <span className="ml-1.5 font-normal text-muted">(optional)</span>}
    </label>
  );
}

export function FieldHint({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-1.5 text-sm text-muted", className)} {...props} />;
}
