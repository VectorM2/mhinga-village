import Link from "next/link";
import { Accessibility, ArrowRight, ExternalLink, HeartHandshake, ListChecks, MessagesSquare } from "lucide-react";
import { GuideCard } from "@/components/cards/misc-cards";
import { SchoolsDirectory } from "@/components/directories";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { getEducationResources, getGuides, getSchools } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Education & Learning",
  description: "Primary and secondary schools, special needs education, colleges, universities and learning resources for Mhinga families.",
  path: "/education",
});

export default async function EducationPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category }, schools, resources, guides] = await Promise.all([searchParams, getSchools(), getEducationResources(), getGuides()]);
  const eduGuides = guides.filter((g) => g.category === "education");
  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="Education & Learning"
        description="Find schools near you, support for learners with special educational needs, colleges, universities and free learning resources."
        crumbs={[{ label: "Education" }]}
        image={images.school}
      >
        <div className="flex flex-wrap gap-2">
          {[
            ["Primary", "primary"],
            ["Secondary", "secondary"],
            ["Special Needs", "special"],
            ["Tertiary", "tertiary"],
          ].map(([l, c]) => (
            <Link key={c} href={`/education?category=${c}#schools`} className="inline-flex h-10 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20">
              {l}
            </Link>
          ))}
        </div>
      </PageHeader>

      <Section id="schools" className="scroll-mt-20">
        <SectionHeading title="Schools & institutions" description="Listings marked “To be confirmed” are still being checked. Always confirm admission dates with the school." />
        <SchoolsDirectory schools={schools} initialCategory={category} />
      </Section>

      <Section tone="white" id="special-needs" aria-labelledby="sn-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-clay-50 px-3 py-1 text-sm font-semibold text-clay-700 ring-1 ring-clay-100">
              <Accessibility className="size-4" aria-hidden /> Special Needs Education
            </p>
            <h2 id="sn-title" className="text-3xl leading-tight font-semibold sm:text-4xl">
              Every child deserves to learn — in the way that works for them.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-700">
              If your child has a disability or finds learning difficult, support is available. South Africa&apos;s inclusive education policy means schools must screen, identify and support learners who need extra help — and some learners are best served at full-service or special schools.
            </p>
            <Link href="/education?category=special#schools" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-bush-700 px-6 font-semibold text-white hover:bg-bush-800">
              Find special needs schools <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ol className="space-y-3">
            {[
              { icon: MessagesSquare, title: "Talk to your child's teacher", body: "Share what you have noticed at home. Ask what the school has observed." },
              { icon: ListChecks, title: "Ask about the SIAS process", body: "Schools use Screening, Identification, Assessment and Support (SIAS) to plan support for a learner." },
              { icon: HeartHandshake, title: "Get support from the district", body: "If the school cannot meet your child's needs, the district-based support team can help with placement at a full-service or special school." },
            ].map(({ icon: Ico, title, body }, i) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-clay-600 ring-1 ring-sand-200">
                  <Ico className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-ink">
                    <span className="mr-1.5 text-clay-600">{i + 1}.</span>
                    {title}
                  </p>
                  <p className="mt-1 text-charcoal-700">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section aria-labelledby="res-title">
        <SectionHeading title="Educational resources" description="Free, trusted resources for learners, parents and teachers." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r) => (
            <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="group flex flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200/70 transition hover:-translate-y-0.5 hover:shadow-lift">
              <span className="text-xs font-bold tracking-wider text-clay-600 uppercase">{r.provider}</span>
              <span className="mt-1 text-lg leading-snug font-semibold">{r.title}</span>
              <span className="mt-1.5 flex-1 text-sm text-muted">{r.description}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bush-700">
                {r.audience} <ExternalLink className="size-3.5" aria-hidden />
              </span>
            </a>
          ))}
        </div>
        <h3 className="mt-12 mb-4 text-2xl font-semibold">Guides for parents & students</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {eduGuides.map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>
      </Section>
    </>
  );
}
