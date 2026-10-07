import { notFound } from "next/navigation";
import { Building, CalendarClock, ExternalLink, MapPin, Tag } from "lucide-react";
import { DeadlineChip, OpportunityCard } from "@/components/cards/opportunity-card";
import { ShareButtons } from "@/components/shared/client";
import { AsideCard, CheckList, DetailGrid, InfoList, ProseSection } from "@/components/shared/detail";
import { PageHeader } from "@/components/shared/page-header";
import { Callout, SampleBadge, VerificationNote } from "@/components/shared/states";
import { opportunityCategoryMeta } from "@/data/opportunities";
import { getOpportunities, getOpportunity } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getOpportunities()).map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const o = await getOpportunity((await params).slug);
  if (!o) return {};
  return pageMetadata({ title: o.title, description: o.summary, path: `/opportunities/${o.slug}` });
}

export default async function OpportunityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const o = await getOpportunity((await params).slug);
  if (!o) notFound();
  const meta = opportunityCategoryMeta[o.category];
  const related = (await getOpportunities()).filter((x) => x.id !== o.id && (x.category === o.category || x.tags.some((t) => o.tags.includes(t)))).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={meta.label}
        title={o.title}
        description={o.summary}
        crumbs={[{ label: "Opportunities", href: "/opportunities" }, { label: meta.plural, href: `/opportunities?category=${o.category}` }, { label: o.title }]}
        variant="plain"
      >
        <div className="flex flex-wrap items-center gap-2">
          <DeadlineChip opportunity={o} />
          {o.isSample && <SampleBadge label="Sample listing" />}
        </div>
      </PageHeader>
      <DetailGrid
        main={
          <div className="space-y-10">
            <div className="prose-mhinga">
              <p>{o.description}</p>
            </div>
            <ProseSection title="Who can apply">
              <CheckList items={o.eligibility} />
            </ProseSection>
            <ProseSection id="how-to-apply" title="How to apply">
              <ol className="space-y-4">
                {o.howToApply.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-bush-700 font-display font-semibold text-white">{i + 1}</span>
                    <p className="pt-1 text-[1.0625rem] leading-relaxed text-charcoal-700">{step}</p>
                  </li>
                ))}
              </ol>
            </ProseSection>
            <Callout tone="warning" title="Never pay to apply">
              Real opportunities don&apos;t charge application fees. If someone asks you for money, report it to the organisation and the police.
            </Callout>
            <VerificationNote verification={o.verification} />
            <ShareButtons title={o.title} path={`/opportunities/${o.slug}`} />
            {related.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Similar opportunities</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {related.slice(0, 2).map((r) => (
                    <OpportunityCard key={r.id} opportunity={r} />
                  ))}
                </div>
              </section>
            )}
          </div>
        }
        aside={
          <AsideCard title="At a glance">
            <InfoList
              items={[
                { icon: Building, label: "Organisation", value: o.organization },
                { icon: Tag, label: "Category", value: meta.label },
                { icon: CalendarClock, label: "Deadline", value: o.deadline ? formatDate(o.deadline) : o.deadlineNote },
                { icon: MapPin, label: "Location", value: o.location },
              ]}
            />
            {o.applyUrl ? (
              <a href={o.applyUrl} target="_blank" rel="noreferrer" className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-bush-700 font-semibold text-white hover:bg-bush-800">
                Apply on the official site <ExternalLink className="size-4" aria-hidden />
              </a>
            ) : (
              <a href="#how-to-apply" className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-bush-700 font-semibold text-white hover:bg-bush-800">
                See how to apply
              </a>
            )}
          </AsideCard>
        }
      />
    </>
  );
}
