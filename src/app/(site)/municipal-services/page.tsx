import Link from "next/link";
import { ArrowRight, Construction, Droplets, Lightbulb, Trash2, Truck, Waves, Zap } from "lucide-react";
import { NoticeCard } from "@/components/cards/misc-cards";
import { ReportForm } from "@/components/forms/report-form";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { Callout } from "@/components/shared/states";
import { getActiveNotices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Water & Municipal Services",
  description: "Water interruptions, electricity outages, roads, waste collection and how to report service problems in Mhinga.",
  path: "/municipal-services",
});

const areas = [
  {
    id: "water",
    title: "Water",
    icon: Droplets,
    tone: "bg-[#e5f1f3] text-[#1f5d6b]",
    intro: "Interruptions, maintenance, infrastructure updates and water tankers.",
    items: [
      ["Water interruptions", "Planned and unplanned outages are posted as Community Notices."],
      ["Maintenance notices", "Check notices below before reporting — work may already be underway."],
      ["Infrastructure updates", "Updates on pipelines, boreholes and reservoirs will be shared here."],
      ["Tanker information", "Tanker points and times during outages — to be confirmed by the water authority."],
    ],
    report: "water",
  },
  {
    id: "electricity",
    title: "Electricity",
    icon: Zap,
    tone: "bg-amber-gold-100 text-amber-gold-700",
    intro: "Outages, faults and service information.",
    items: [
      ["Outages", "Report outages to your electricity supplier. In many rural areas this is Eskom — confirm who supplies your section."],
      ["Report faults", "Report sparking transformers or fallen lines immediately and keep away from them."],
      ["Service information", "Prepaid, meter and connection queries go to your supplier."],
    ],
    report: "electricity",
  },
  {
    id: "roads",
    title: "Roads",
    icon: Construction,
    tone: "bg-sand-100 text-charcoal-800",
    intro: "Potholes, damaged bridges, road projects and closures.",
    items: [
      ["Road problems", "Report potholes, washed-away sections and blocked drains."],
      ["Road projects", "Planned upgrades will be listed here when announced."],
      ["Closures", "Closures and detours are posted as Community Notices."],
    ],
    report: "roads",
  },
  {
    id: "waste",
    title: "Waste",
    icon: Trash2,
    tone: "bg-bush-50 text-bush-700",
    intro: "Collection information, illegal dumping and waste notices.",
    items: [
      ["Collection information", "Collection days and points — to be confirmed with the municipality."],
      ["Illegal dumping", "Report dumping sites. Never confront people who are dumping."],
      ["Waste notices", "Clean-up campaigns and changes to collection will be posted here."],
    ],
    report: "waste",
  },
];

export default async function MunicipalPage() {
  const notices = (await getActiveNotices()).filter((n) => ["Water", "Safety", "Electricity", "Roads"].includes(n.category));
  return (
    <>
      <PageHeader
        eyebrow="Municipal services"
        title="Water & Municipal Services"
        description="Service updates, maintenance notices and a simple way to report problems with water, electricity, roads and waste."
        crumbs={[{ label: "Services", href: "/services" }, { label: "Water & Municipal" }]}
        image={images.river}
      >
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="inline-flex h-10 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20">
              {a.title}
            </a>
          ))}
          <a href="#report" className="inline-flex h-10 items-center rounded-full bg-amber-gold-400 px-4 text-sm font-semibold text-charcoal-900 hover:bg-amber-gold-500">
            Report a problem
          </a>
        </div>
      </PageHeader>

      {notices.length > 0 && (
        <Section className="pb-0!">
          <SectionHeading title="Current service notices" />
          <div className="grid gap-4 lg:grid-cols-2">
            {notices.map((n) => (
              <NoticeCard key={n.id} notice={n} />
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="space-y-6">
          {areas.map(({ id, title, icon: Ico, tone, intro, items, report }) => (
            <section key={id} id={id} className="scroll-mt-24 rounded-3xl bg-white p-6 shadow-card ring-1 ring-sand-200/70 sm:p-8" aria-labelledby={`${id}-title`}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${tone}`}>
                    <Ico className="size-7" aria-hidden />
                  </span>
                  <div>
                    <h2 id={`${id}-title`} className="text-2xl font-semibold sm:text-3xl">
                      {title}
                    </h2>
                    <p className="mt-1 text-muted">{intro}</p>
                  </div>
                </div>
                <Link href={`/report?category=${report}`} className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-bush-700 px-5 text-sm font-semibold text-white hover:bg-bush-800">
                  Report a {title.toLowerCase()} problem <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {items.map(([t, d]) => (
                  <div key={t} className="rounded-2xl bg-sand-50 p-4 ring-1 ring-sand-200">
                    <dt className="font-semibold text-ink">{t}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-charcoal-700">{d}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <section id="other" className="scroll-mt-24" aria-labelledby="other-title">
            <h2 id="other-title" className="mt-6 mb-4 text-2xl font-semibold">
              Other services
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Waves, title: "Sewage & sanitation", d: "Blocked or overflowing sewage and sanitation issues.", c: "sewage" },
                { icon: Lightbulb, title: "Streetlights", d: "Broken or flickering streetlights and high-mast lights.", c: "streetlights" },
                { icon: Truck, title: "Public infrastructure", d: "Damaged community facilities, bridges and public buildings.", c: "infrastructure" },
              ].map(({ icon: Ico, title, d, c }) => (
                <Link key={c} href={`/report?category=${c}`} className="group rounded-2xl bg-white p-5 ring-1 ring-sand-200 transition hover:shadow-card">
                  <Ico className="size-7 text-clay-600" aria-hidden />
                  <p className="mt-3 font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted">{d}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-bush-700">
                    Report <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Section>

      <Section tone="white" id="report" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeading title="Report a Problem" description="Tell us what's wrong and where. You'll get a reference number to follow up." />
          <Callout tone="warning">If anyone is in danger — for example a fallen live wire or a flooded road — call 112 first.</Callout>
          <div className="mt-8">
            <ReportForm />
          </div>
        </div>
      </Section>
    </>
  );
}
