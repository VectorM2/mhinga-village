import { cn } from "@/lib/utils";
import { Placeholder } from "./states";

export function DetailGrid({ main, aside }: { main: React.ReactNode; aside: React.ReactNode }) {
  return (
    <div className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
      <div className="min-w-0">{main}</div>
      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">{aside}</aside>
    </div>
  );
}

export function AsideCard({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl bg-white p-6 shadow-card ring-1 ring-sand-200/70", className)}>
      {title && <h2 className="mb-4 font-sans text-xs font-bold tracking-[0.14em] text-muted uppercase">{title}</h2>}
      {children}
    </div>
  );
}

export function InfoList({ items }: { items: { icon: React.ComponentType<{ className?: string }>; label: string; value?: React.ReactNode; href?: string }[] }) {
  return (
    <dl className="space-y-4">
      {items.map(({ icon: Ico, label, value, href }) => (
        <div key={label} className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sand-100 text-bush-700">
            <Ico className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="font-semibold break-words text-ink">
              {value ? (
                href ? (
                  <a href={href} className="text-bush-700 underline-offset-4 hover:underline" {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {value}
                  </a>
                ) : (
                  value
                )
              ) : (
                <Placeholder />
              )}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

export function ProseSection({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export function CheckList({ items, empty = "None listed." }: { items: string[]; empty?: string }) {
  if (!items.length) return <p className="text-muted">{empty}</p>;
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[1.0625rem] leading-relaxed text-charcoal-700">
          <span className="mt-2.5 size-2 shrink-0 rounded-full bg-amber-gold-500" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
