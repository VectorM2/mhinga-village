"use client";

import { CheckCircle2, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import type { FormState } from "@/lib/actions";
import { cn } from "@/lib/utils";

export const initialFormState: FormState = { ok: false };

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className={cn("w-full sm:w-auto", className)}>
      {pending && <Loader2 className="animate-spin" aria-hidden />}
      {pending ? "Sending…" : children}
    </Button>
  );
}

export function FieldError({ error, id }: { error?: string; id: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-clay-700">
      {error}
    </p>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  if (!state.message || state.ok) return null;
  return (
    <p role="alert" className="rounded-xl bg-clay-50 px-4 py-3 text-sm font-medium text-clay-700 ring-1 ring-clay-100">
      {state.message}
    </p>
  );
}

export function SuccessPanel({ title, message, reference, children }: { title: string; message?: string; reference?: string; children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  return (
    <div role="status" className="animate-fade-up rounded-3xl bg-bush-50 p-6 text-center ring-1 ring-bush-100 sm:p-10">
      <span className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-bush-700 text-white">
        <CheckCircle2 className="size-8" aria-hidden />
      </span>
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      {message && <p className="mx-auto mt-2 max-w-md text-charcoal-700">{message}</p>}
      {reference && (
        <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-white p-5 ring-1 ring-bush-100">
          <p className="text-sm font-medium text-muted">Reference number</p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-wide text-ink">{reference}</p>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bush-700"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(reference);
                setCopied(true);
              } catch {
                /* ignore */
              }
            }}
          >
            <Copy className="size-4" aria-hidden /> {copied ? "Copied" : "Copy reference"}
          </button>
          <p className="mt-3 text-xs text-muted">Keep this number to follow up on your submission.</p>
        </div>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

/** Accessible field wrapper: wires label, hint and error ids. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (a11y: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string; required?: boolean }) => React.ReactNode;
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-charcoal-800">
        {label}
        {required ? (
          <span className="ml-0.5 text-clay-600" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-muted">(optional)</span>
        )}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, required })}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}
