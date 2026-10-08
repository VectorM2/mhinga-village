import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ExternalLink, Phone } from "lucide-react";
import { GuideCard } from "@/components/cards/misc-cards";
import { ShareButtons } from "@/components/shared/client";
import { ApplyOnlineLink } from "@/components/shared/apply-online";
import { CheckList, ProseSection } from "@/components/shared/detail";
import { Icon } from "@/components/shared/icon";
import { Breadcrumbs } from "@/components/shared/page-header";
import { Placeholder, VerificationNote, VerifiedBadge } from "@/components/shared/states";
import { getGuide, getGuides } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getGuides()).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = await getGuide((await params).slug);
  if (!g) return {};
  return pageMetadata({ title: g.title, description: g.overview.slice(0, 155), path: `/how-to/${g.slug}` });
}

const sections = [
  ["overview", "Overview"],
  ["who", "Who can apply"],
  ["requirements", "Requirements"],
  ["documents", "Documents required"],
  ["steps", "Step-by-step process"],
  ["where", "Where to apply"],
  ["contacts", "Contact information"],
  ["links", "Official links"],
  ["faq", "Frequently asked questions"],
] as const;

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = await getGuide((await params).slug);
  if (!guide) notFound();
  const others = (await getGuides()).filter((g) => g.id !== guide.id && g.category === guide.category).slice(0, 3);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header className="contour-texture border-b border-sand-200 bg-sand-100">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "How do I…?", href: "/how-to" }, { label: guide.question }]} />
          <div className="flex items-start gap-4">
            <span className="hidden size-16 shrink-0 place-items-center rounded-2xl bg-bush-700 text-white sm:grid">
              <Icon name={guide.icon} className="size-8" />
            </span>
            <div>
              <h1 className="text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl">{guide.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
                <VerifiedBadge verification={guide.verification} />
                <span>Last updated {formatDate(guide.updatedAt)}</span>
              </div>
              {guide.slug === "apply-for-land" && <ApplyOnlineLink className="mt-6" />}
            </div>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-bold tracking-[0.14em] text-muted uppercase">On this page</p>
            <ol className="space-y-1 border-l-2 border-sand-200">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-sm text-charcoal-700 hover:border-bush-600 hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="max-w-3xl min-w-0 space-y-12">
          <ProseSection id="overview" title="Overview">
            <p className="text-lg leading-relaxed text-charcoal-700">{guide.overview}</p>
          </ProseSection>
          <ProseSection id="who" title="Who can apply">
            <CheckList items={guide.whoCanApply} />
          </ProseSection>
          <ProseSection id="requirements" title="Requirements">
            <CheckList items={guide.requirements} empty="No special requirements." />
          </ProseSection>
          <ProseSection id="documents" title="Documents required">
            {guide.documents.length ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {guide.documents.map((d) => (
                  <li key={d} className="flex items-start gap-3 rounded-xl bg-white p-3.5 ring-1 ring-sand-200">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border-2 border-bush-600" aria-hidden />
                    <span className="text-charcoal-800">{d}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No documents are needed.</p>
            )}
          </ProseSection>
          <ProseSection id="steps" title="Step-by-step process">
            <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[1.1rem] before:w-0.5 before:bg-sand-300">
              {guide.steps.map((s, i) => (
                <li key={s.title} className="relative flex gap-5">
                  <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-bush-700 font-display font-semibold text-white ring-4 ring-sand-50">{i + 1}</span>
                  <div className="pt-1">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-charcoal-700">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ProseSection>
          <ProseSection id="where" title="Where to apply">
            <CheckList items={guide.whereToApply} empty="See the steps above." />
            {guide.slug === "apply-for-land" && <ApplyOnlineLink className="mt-5" />}
          </ProseSection>
          <ProseSection id="contacts" title="Contact information">
            {guide.contacts.length ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {guide.contacts.map((c) => (
                  <li key={c.label} className="rounded-2xl bg-white p-4 ring-1 ring-sand-200">
                    <p className="text-sm text-muted">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-0.5 inline-flex items-center gap-2 text-lg font-semibold text-bush-700 hover:underline">
                        {c.href.startsWith("tel:") && <Phone className="size-4" aria-hidden />}
                        {c.value}
                      </a>
                    ) : /to be confirmed/i.test(c.value) ? (
                      <p className="mt-0.5">
                        <Placeholder />
                      </p>
                    ) : (
                      <p className="mt-0.5 text-lg font-semibold">{c.value}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">See official links below.</p>
            )}
          </ProseSection>
          <ProseSection id="links" title="Official links">
            {guide.officialLinks.length ? (
              <ul className="space-y-2">
                {guide.officialLinks.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-bush-700 underline-offset-4 hover:underline">
                      {l.label} <ExternalLink className="size-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <Placeholder>Official links to be added once confirmed.</Placeholder>
              </p>
            )}
          </ProseSection>
          <ProseSection id="faq" title="Frequently asked questions">
            <div className="divide-y divide-sand-200 rounded-2xl bg-white ring-1 ring-sand-200">
              {guide.faqs.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="size-5 shrink-0 text-muted transition group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="mt-3 leading-relaxed text-charcoal-700">{f.a}</p>
                </details>
              ))}
            </div>
          </ProseSection>
          <VerificationNote verification={guide.verification} />
          <ShareButtons title={guide.title} path={`/how-to/${guide.slug}`} />
          {others.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold">Related guides</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {others.map((g) => (
                  <GuideCard key={g.id} guide={g} />
                ))}
              </div>
            </section>
          )}
          <p className="text-sm text-muted">
            Something wrong or out of date?{" "}
            <Link href="/contact?topic=correction" className="font-semibold text-bush-700 underline underline-offset-4">
              Let us know
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
