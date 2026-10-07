"use client";

import { useActionState } from "react";
import { ImagePlus } from "lucide-react";
import { submitBusiness, submitContact, submitPhoto } from "@/lib/actions";
import { businessCategoryMeta } from "@/data/businesses";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Field, FieldError, FormMessage, initialFormState, SubmitButton, SuccessPanel } from "./form-kit";

function Consent({ name = "consent", children, error }: { name?: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal-700">
        <input type="checkbox" name={name} className="mt-0.5 size-5 shrink-0 rounded accent-bush-700" aria-describedby={error ? `${name}-error` : undefined} />
        <span>{children}</span>
      </label>
      <FieldError id={`${name}-error`} error={error} />
    </div>
  );
}

export function BusinessForm() {
  const [state, action] = useActionState(submitBusiness, initialFormState);
  if (state.ok) return <SuccessPanel title="Listing received" message={state.message} reference={state.reference} />;
  const e = state.errors ?? {};
  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="biz-name" label="Business name" required error={e.name}>
          {(a) => <Input name="name" {...a} />}
        </Field>
        <Field id="biz-category" label="Category" required error={e.category}>
          {(a) => (
            <Select name="category" defaultValue="" {...a}>
              <option value="" disabled>
                Choose a category
              </option>
              {Object.entries(businessCategoryMeta).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </div>
      <Field id="biz-description" label="What do you offer?" required error={e.description}>
        {(a) => <Textarea name="description" className="min-h-24" {...a} />}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="biz-phone" label="Phone number" required error={e.phone}>
          {(a) => <Input name="phone" type="tel" autoComplete="tel" {...a} />}
        </Field>
        <Field id="biz-whatsapp" label="WhatsApp number">
          {(a) => <Input name="whatsapp" type="tel" {...a} />}
        </Field>
        <Field id="biz-location" label="Location" hint="Section or nearest landmark">
          {(a) => <Input name="location" {...a} />}
        </Field>
        <Field id="biz-hours" label="Opening hours">
          {(a) => <Input name="hours" placeholder="e.g. Mon–Sat 08:00–17:00" {...a} />}
        </Field>
      </div>
      <Field id="biz-website" label="Website or Facebook page">
        {(a) => <Input name="website" type="url" placeholder="https://" {...a} />}
      </Field>
      <Consent error={e.consent}>I own or manage this business and agree that these details may be shown publicly on this website.</Consent>
      <SubmitButton>Submit listing</SubmitButton>
      <p className="text-sm text-muted">Listing is free. Listings are reviewed before they are published.</p>
    </form>
  );
}

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [state, action] = useActionState(submitContact, initialFormState);
  if (state.ok) return <SuccessPanel title="Thank you" message={state.message} />;
  const e = state.errors ?? {};
  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label="Your name" required error={e.name}>
          {(a) => <Input name="name" autoComplete="name" {...a} />}
        </Field>
        <Field id="c-contact" label="Phone or email" required error={e.contact}>
          {(a) => <Input name="contact" autoComplete="email" {...a} />}
        </Field>
      </div>
      <Field id="c-topic" label="What is this about?">
        {(a) => (
          <Select name="topic" defaultValue={defaultTopic ?? "general"} {...a}>
            <option value="general">General question</option>
            <option value="correction">Correct or confirm information</option>
            <option value="news">Share news or a story</option>
            <option value="event">Submit an event</option>
            <option value="opportunity">Share an opportunity</option>
            <option value="partnership">Partnership or volunteering</option>
          </Select>
        )}
      </Field>
      <Field id="c-message" label="Message" required error={e.message}>
        {(a) => <Textarea name="message" {...a} />}
      </Field>
      <SubmitButton>Send message</SubmitButton>
    </form>
  );
}

export function SharePhotoDialog() {
  const [state, action] = useActionState(submitPhoto, initialFormState);
  const e = state.errors ?? {};
  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-12 items-center gap-2 rounded-full bg-amber-gold-400 px-6 font-semibold text-charcoal-900 transition hover:bg-amber-gold-500">
        <ImagePlus className="size-5" aria-hidden /> Share a photo
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl font-semibold">Share a photo of Mhinga</DialogTitle>
        <DialogDescription className="mt-1 mb-5 text-muted">Photos are reviewed before they appear in the gallery.</DialogDescription>
        {state.ok ? (
          <SuccessPanel title="Photo received" message={state.message} />
        ) : (
          <form action={action} className="space-y-4" noValidate>
            <Field id="p-photo" label="Photo" required error={e.photo}>
              {(a) => <input type="file" name="photo" accept="image/*" className="block w-full text-sm file:mr-3 file:h-10 file:rounded-full file:border-0 file:bg-sand-100 file:px-4 file:font-semibold" {...a} />}
            </Field>
            <Field id="p-title" label="Caption">
              {(a) => <Input name="title" {...a} />}
            </Field>
            <Field id="p-category" label="Category">
              {(a) => (
                <Select name="category" defaultValue="community" {...a}>
                  {["community", "events", "schools", "sports", "culture", "nature", "history"].map((c) => (
                    <option key={c} value={c}>
                      {c[0].toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
            <Field id="p-name" label="Your name (for credit)">
              {(a) => <Input name="name" {...a} />}
            </Field>
            <Consent error={e.consent}>I took this photo or have permission to share it, and anyone clearly shown has agreed.</Consent>
            <SubmitButton className="w-full!">Upload photo</SubmitButton>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
