import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Crown, HeartHandshake, Landmark, Mountain, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { Callout } from "@/components/shared/states";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Mhinga",
  description: "The story, history, culture, heritage and traditional leadership of Mhinga village in Limpopo, South Africa.",
  path: "/about",
});

/** Timeline entries: only add verified facts. Unverified periods stay as clearly-marked placeholders. */
const timeline = [
  { when: "Early history", title: "Origins of the Mhinga community", body: "The early history of Mhinga and its people is to be documented with elders, historians and the Traditional Council.", verified: false },
  { when: "20th century", title: "Growth of the village", body: "Key events — schools, churches, roads and services — to be researched and verified with the community.", verified: false },
  { when: "2016", title: "Collins Chabane Local Municipality", body: "Mhinga (Ka-Mhinga) became part of the newly established Collins Chabane Local Municipality, with its seat in Malamulele.", verified: false, source: "Public sources — to be confirmed" },
  { when: "Today", title: "Mhinga today", body: "A growing community of families, learners, farmers and entrepreneurs — and a new digital home to bring it all together.", verified: false },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="More than a place. A community." description="The story of Mhinga — its land, its people, and the future we are building together." crumbs={[{ label: "About Mhinga" }]} image={images.hero} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Our story" title="Rooted in Limpopo" className="mb-5!" />
            <div className="prose-mhinga">
              <p>Mhinga (also written Ka-Mhinga) is a village in the Vhembe District of Limpopo, South Africa, within Collins Chabane Local Municipality (Ward 31), near the Kruger National Park. Public census sources list a population of roughly ten thousand people.</p>
              <p>Beyond the numbers, Mhinga is a place of families who have shared this land for generations — of schools and churches, fields and livestock, small businesses and big dreams.</p>
              <p className="text-sm text-muted">Population and administrative details are drawn from public sources and should be confirmed.</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            <Image src={images.hills.src} alt={images.hills.alt} width={1600} height={1000} className="col-span-3 aspect-[3/4] rounded-3xl object-cover" />
            <div className="col-span-2 grid gap-3">
              <Image src={images.village.src} alt={images.village.alt} width={800} height={800} className="aspect-square rounded-3xl object-cover" />
              <Image src={images.gathering.src} alt={images.gathering.alt} width={800} height={800} className="aspect-square rounded-3xl object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="history-title">
        <SectionHeading eyebrow="History" title="Our history" description="We are documenting Mhinga's history together with elders and the community. Only verified facts will be added." />
        <ol className="relative mx-auto max-w-3xl space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[0.6rem] before:w-0.5 before:bg-sand-300 sm:before:left-1/2">
          {timeline.map((t, i) => (
            <li key={t.title} className={`relative pl-10 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right"}`}>
              <span className={`absolute top-1.5 left-0 size-5 rounded-full border-4 border-white bg-amber-gold-500 shadow ring-1 ring-sand-300 ${i % 2 ? "sm:-left-2.5" : "sm:right-[-0.65rem] sm:left-auto"}`} aria-hidden />
              <p className="text-sm font-bold tracking-wider text-clay-600 uppercase">{t.when}</p>
              <h3 className="mt-1 text-xl font-semibold">{t.title}</h3>
              <p className="mt-1 text-charcoal-700">{t.body}</p>
              {!t.verified && <p className="mt-1.5 text-xs font-semibold text-amber-gold-700">{t.source ?? "Information to be confirmed"}</p>}
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-10 max-w-3xl">
          <Callout title="Help us tell the story">
            Do you have old photographs, family histories or knowledge of Mhinga&apos;s past?{" "}
            <Link href="/contact?topic=news" className="font-semibold underline underline-offset-4">
              Share them with us
            </Link>
            .
          </Callout>
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "culture", icon: HeartHandshake, title: "Culture", body: "Music, dance, language, food and the ceremonies that bring families together. Content to be developed with the community." },
            { id: "heritage", icon: Mountain, title: "Heritage", body: "Places, stories and traditions passed down through generations. Heritage sites to be documented and verified." },
            { id: "leadership", icon: Crown, title: "Traditional Leadership", body: "The Mhinga Traditional Authority is led by Hosi Shilungwa Mhinga II, with a jurisdiction of about 20,000 hectares across 10 villages, including Mhinga 1, 2 and 3, Botsoleni, Maphophe, Ka-Matiani, Joseph, Mabililigwe, Makuleke and Nthlaveni." },
            { id: "community", icon: Users, title: "Our Community", body: "Teachers, farmers, nurses, builders, students, elders and entrepreneurs — the people who make Mhinga home." },
          ].map(({ id, icon: Ico, title, body }) => (
            <section key={id} id={id} className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-sand-200/70">
              <Ico className="size-8 text-clay-600" aria-hidden />
              <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
              <p className="mt-2 text-charcoal-700">{body}</p>
            </section>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.16em] text-amber-gold-400 uppercase">Mhinga today</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Building the future, together</h2>
            <p className="mt-4 text-lg text-sand-200">This website is an independent community project — a place to find services and opportunities, and to celebrate what makes Mhinga special.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/stories" className="inline-flex h-12 items-center gap-2 rounded-full bg-amber-gold-400 px-6 font-semibold text-charcoal-900">
                People of Mhinga <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/gallery" className="inline-flex h-12 items-center rounded-full px-6 font-semibold text-white ring-1 ring-white/30">
                Gallery
              </Link>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              { icon: Landmark, k: "Municipality", v: "Collins Chabane" },
              { icon: Mountain, k: "District", v: "Vhembe" },
              { icon: BookOpen, k: "Province", v: "Limpopo" },
              { icon: Users, k: "Ward", v: "Ward 31" },
            ].map(({ icon: Ico, k, v }) => (
              <li key={k} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <Ico className="size-6 text-amber-gold-400" aria-hidden />
                <p className="mt-4 text-sm text-sand-300">{k}</p>
                <p className="font-display text-2xl font-semibold text-white">{v}</p>
              </li>
            ))}
          </ul>
        </div>
              </Section>
    </>
  );
}
