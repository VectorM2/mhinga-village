import Link from "next/link";
import { ArrowRight, Building2, ChevronDown, FileText, Landmark, Users } from "lucide-react";
import { ApplyOnlineLink } from "@/components/shared/apply-online";
import { CheckList } from "@/components/shared/detail";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { Callout } from "@/components/shared/states";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Land & Housing",
  description: "How land applications work in Mhinga — Traditional Authority and municipal processes, documents, contacts and housing programmes.",
  path: "/land-housing",
});

const CONFIRM = "Official application requirements should be confirmed with the relevant authority.";

const faqs = [
  { q: "How do I know which process applies to me?", a: "It depends on how the land is held. Most residential land in rural villages is held communally under customary arrangements, but some land is administered by the municipality or the state. Ask the Traditional Council or the municipal housing office before you start." },
  { q: "Is there a fee?", a: "Any fees must be confirmed with the authority you apply to. Always ask for an official, written receipt for any payment." },
  { q: "What proof will I receive?", a: "Ask for written proof of allocation. In many communal areas this has historically been a letter or Permission to Occupy (PTO) certificate — confirm what is issued today." },
  { q: "Where can I get free legal advice about land?", a: "Legal Aid South Africa provides free legal help to people who qualify. University law clinics and land rights organisations can also assist." },
];

export default function LandHousingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Land & Housing"
        title="Land & Housing"
        description="How land applications work in Mhinga, the difference between traditional and municipal processes, and where to find housing support."
        crumbs={[{ label: "Services", href: "/services" }, { label: "Land & Housing" }]}
        image={images.village}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/how-to/apply-for-land" className="inline-flex h-12 items-center gap-2 rounded-full bg-amber-gold-400 px-6 font-semibold text-charcoal-900 hover:bg-amber-gold-500">
            How to apply for land <ArrowRight className="size-4" aria-hidden />
          </Link>
          <ApplyOnlineLink tone="light" />
        </div>
      </PageHeader>

      <Section>
        <Callout tone="warning" title="Please read first">
          This page explains the general process only. {CONFIRM} The details below will be updated once confirmed with the Traditional Council and the municipality.
        </Callout>

        <SectionHeading className="mt-12" title="Two different processes" description="Who you apply to depends on where the land is and how it is held." />
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              icon: Landmark,
              title: "Traditional Authority process",
              tone: "bg-amber-gold-100 text-amber-gold-700",
              body: "For customary (communal) land in the village. Residential and farming sites are usually allocated through the Traditional Council, often starting with the headman (induna) for your section.",
              points: ["Approach the induna or Traditional Council office", "Community consultation may be part of the process", "Ask for written proof of allocation"],
            },
            {
              icon: Building2,
              title: "Municipal process",
              tone: "bg-bush-50 text-bush-700",
              body: "For land administered by the municipality, township establishment areas and municipal housing programmes. Applications go through the municipal housing or planning office.",
              points: ["Contact Collins Chabane Local Municipality", "Ask about the housing needs register", "Zoning and building plans may be required"],
            },
          ].map(({ icon: Ico, title, tone, body, points }) => (
            <div key={title} className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-sand-200/70 sm:p-8">
              <span className={`grid size-14 place-items-center rounded-2xl ${tone}`}>
                <Ico className="size-7" aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-charcoal-700">{body}</p>
              <div className="mt-5">
                <CheckList items={points} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div id="who" className="scroll-mt-24">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold">
              <Users className="size-6 text-clay-600" aria-hidden /> Who can apply
            </h2>
            <CheckList items={["Members of the Mhinga community seeking a residential site (criteria to be confirmed)", "Residents applying for municipal housing programmes, where available", CONFIRM]} />
          </div>
          <div id="documents" className="scroll-mt-24">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold">
              <FileText className="size-6 text-clay-600" aria-hidden /> Required documents
            </h2>
            <CheckList items={["Certified copy of your South African ID", "Proof of residence or community membership — to be confirmed", "Marriage certificate, if applicable — to be confirmed", "Any further documents the authority requests"]} />
          </div>
        </div>

        <h2 className="mt-14 mb-6 text-2xl font-semibold">Application process (general)</h2>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Find out which process applies", "Traditional Authority or municipality."],
            ["Visit the right office", "Bring your ID and ask for the application requirements."],
            ["Apply and keep copies", "Submit forms and documents. Keep copies and receipts."],
            ["Get written confirmation", "Ask for written proof of any allocation or decision."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200">
              <span className="font-display text-4xl font-semibold text-amber-gold-500">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 text-lg font-semibold">{t}</p>
              <p className="mt-1 text-charcoal-700">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Where to apply & important contacts</h2>
            <div className="mb-4 rounded-2xl bg-bush-50 p-5 ring-1 ring-bush-100">
              <p className="font-semibold text-ink">Apply online through TAMS</p>
              <p className="mt-1 text-sm text-charcoal-700">Create a resident account on the Traditional Authority Management System to apply for a site and follow your application.</p>
              <ApplyOnlineLink className="mt-4" />
            </div>
            <ul className="space-y-3">
              {[
                ["Mhinga Traditional Authority — Hosi Shilungwa Mhinga II", "Mhinga Zone 2, near the EPCSA Mission Station · office hours to be confirmed", "/services/traditional-authority"],
                ["Collins Chabane Local Municipality — housing", "Contact details to be confirmed", "/services/collins-chabane-municipality"],
                ["Ward 31 councillor", "Contact details to be confirmed", "/services/ward-councillor"],
              ].map(([t, d, h]) => (
                <li key={t}>
                  <Link href={h} className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand-200 transition hover:shadow-card">
                    <span>
                      <span className="block font-semibold text-ink">{t}</span>
                      <span className="text-sm text-muted italic">{d}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-muted transition group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div id="housing">
            <h2 className="mb-4 text-2xl font-semibold">Housing information</h2>
            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-charcoal-700">
              <p>Government housing subsidy programmes help qualifying households get a basic house. Eligibility usually depends on income, citizenship, age or dependants, and not having owned a home before.</p>
              <p>To be considered, households are generally asked to register on the municipal housing needs register. Ask the municipal housing office how to register and which programmes are currently available in the area.</p>
              <Callout>Housing programme details for Mhinga will be published here once confirmed with the municipality. Never pay anyone to put your name on a housing list.</Callout>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2>
        <div className="max-w-3xl divide-y divide-sand-200 rounded-2xl bg-sand-50 ring-1 ring-sand-200">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-muted transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 leading-relaxed text-charcoal-700">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
