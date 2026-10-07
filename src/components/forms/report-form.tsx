"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Construction, Droplets, Factory, HelpCircle, ImagePlus, Lightbulb, Trash2, Waves, X, Zap } from "lucide-react";
import { submitReport } from "@/lib/actions";
import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Field, FieldError, FormMessage, initialFormState, SubmitButton, SuccessPanel } from "./form-kit";

const categories = [
  { value: "water", label: "Water", icon: Droplets },
  { value: "electricity", label: "Electricity", icon: Zap },
  { value: "roads", label: "Roads", icon: Construction },
  { value: "waste", label: "Waste", icon: Trash2 },
  { value: "sewage", label: "Sewage", icon: Waves },
  { value: "streetlights", label: "Streetlights", icon: Lightbulb },
  { value: "infrastructure", label: "Infrastructure", icon: Factory },
  { value: "other", label: "Other", icon: HelpCircle },
];

export function ReportForm({ defaultCategory }: { defaultCategory?: string }) {
  const [state, action] = useActionState(submitReport, initialFormState);
  const [category, setCategory] = useState(defaultCategory ?? "");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.ok || state.message) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state]);
  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  if (state.ok) {
    return (
      <div ref={topRef}>
        <SuccessPanel title={state.message ?? "Report submitted successfully."} message="Thank you for helping improve services in Mhinga. Your report will be passed to the responsible office." reference={state.reference}>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex h-11 items-center rounded-full bg-white px-5 font-semibold ring-1 ring-sand-300">
              Back to home
            </Link>
            <a href="/report" className="inline-flex h-11 items-center rounded-full bg-bush-700 px-5 font-semibold text-white">
              Report another problem
            </a>
          </div>
        </SuccessPanel>
      </div>
    );
  }

  const e = state.errors ?? {};
  return (
    <form action={action} className="space-y-7" noValidate>
      <div ref={topRef} className="scroll-mt-28">
        <FormMessage state={state} />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-charcoal-800">
          What is the problem about? <span className="text-clay-600" aria-hidden>*</span>
        </legend>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {categories.map(({ value, label, icon: Ico }) => (
            <label
              key={value}
              className={cn(
                "flex min-h-20 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl bg-white p-3 text-center text-sm font-semibold ring-1 transition has-focus-visible:ring-4 has-focus-visible:ring-amber-gold-400",
                category === value ? "bg-bush-50 text-bush-800 ring-2 ring-bush-600" : "text-charcoal-700 ring-sand-300 hover:bg-sand-50",
              )}
            >
              <input type="radio" name="category" value={value} checked={category === value} onChange={() => setCategory(value)} className="sr-only" aria-describedby={e.category ? "category-error" : undefined} />
              <Ico className="size-6" aria-hidden />
              {label}
            </label>
          ))}
        </div>
        <FieldError id="category-error" error={e.category} />
      </fieldset>

      <Field id="description" label="Describe the problem" required error={e.description} hint="What is wrong, and since when? E.g. “No water since Monday morning in our section.”">
        {(a) => <Textarea name="description" {...a} />}
      </Field>

      <Field id="location" label="Where is it?" required error={e.location} hint="Section, street, or nearest school, shop, church or landmark.">
        {(a) => <Input name="location" autoComplete="off" {...a} />}
      </Field>

      <div>
        <p className="mb-1.5 text-sm font-semibold text-charcoal-800">
          Photo <span className="font-normal text-muted">(optional)</span>
        </p>
        {preview ? (
          <div className="relative w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Selected photo preview" className="max-h-56 rounded-2xl object-cover ring-1 ring-sand-300" />
            <button
              type="button"
              onClick={() => {
                if (fileRef.current) fileRef.current.value = "";
                setPreview(null);
              }}
              className="absolute top-2 right-2 grid size-9 place-items-center rounded-full bg-charcoal-900/80 text-white"
              aria-label="Remove photo"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        ) : (
          <label htmlFor="photo" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sand-300 bg-white px-4 py-8 text-center transition hover:border-bush-500 has-focus-visible:ring-4 has-focus-visible:ring-amber-gold-400">
            <ImagePlus className="size-8 text-muted" aria-hidden />
            <span className="font-semibold text-ink">Add a photo</span>
            <span className="text-sm text-muted">JPG or PNG, up to 5 MB</span>
          </label>
        )}
        <input
          ref={fileRef}
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(ev) => {
            const f = ev.target.files?.[0];
            setPreview(f ? URL.createObjectURL(f) : null);
          }}
        />
        <FieldError id="photo-error" error={e.photo} />
      </div>

      <div className="rounded-2xl bg-sand-100 p-5">
        <p className="mb-4 text-sm text-charcoal-700">
          <span className="font-semibold text-ink">Your details (optional).</span> Add them if you would like to be contacted about this report. You can also report anonymously.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Name">
            {(a) => <Input name="name" autoComplete="name" {...a} />}
          </Field>
          <Field id="contact" label="Phone or email">
            {(a) => <Input name="contact" autoComplete="tel" inputMode="email" {...a} />}
          </Field>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SubmitButton>Submit report</SubmitButton>
        <p className="text-sm text-muted">In an emergency, call 10111, 10177 or 112 instead.</p>
      </div>
    </form>
  );
}
