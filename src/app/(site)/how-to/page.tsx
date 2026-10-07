import { GuideCard } from "@/components/cards/misc-cards";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { getGuides } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import type { HowToGuide } from "@/lib/types";

export const metadata = pageMetadata({
  title: "How do I…?",
  description: "Step-by-step guides for Mhinga residents: applying for land, bursaries, NSFAS, SASSA, IDs, school registration, reporting problems and more.",
  path: "/how-to",
});

const groups: { title: string; categories: HowToGuide["category"][] }[] = [
  { title: "Education & funding", categories: ["education"] },
  { title: "Land, water & municipal services", categories: ["land", "municipal"] },
  { title: "Grants, IDs & health", categories: ["social", "identity", "health"] },
  { title: "Safety & work", categories: ["safety", "employment"] },
];

export default async function HowToPage() {
  const guides = await getGuides();
  return (
    <>
      <PageHeader
        eyebrow="Knowledge hub"
        title="How do I…?"
        description="Clear, step-by-step answers to everyday questions — who can apply, what to bring, where to go and who to contact."
        crumbs={[{ label: "How do I…?" }]}
        variant="plain"
      />
      <Section className="pt-10!">
        <div className="space-y-12">
          {groups.map((g) => {
            const list = guides.filter((x) => g.categories.includes(x.category));
            if (!list.length) return null;
            return (
              <section key={g.title} aria-labelledby={g.title}>
                <h2 id={g.title} className="mb-4 text-2xl font-semibold">
                  {g.title}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((x) => (
                    <GuideCard key={x.id} guide={x} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Section>
    </>
  );
}
