import { Bird, Carrot, Droplet, GraduationCap, HandCoins, PiggyBank, ShoppingBasket, Sprout } from "lucide-react";
import { NewsCard } from "@/components/cards/news-card";
import { OpportunityCard } from "@/components/cards/opportunity-card";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { Callout, EmptyState } from "@/components/shared/states";
import { getNews, getOpportunities } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Agriculture",
  description: "Farming resources, training, livestock, poultry, vegetable farming, markets and agricultural opportunities for Mhinga farmers.",
  path: "/agriculture",
});

const topics = [
  { id: "vegetables", icon: Carrot, title: "Vegetable farming", body: "Prepare soil with compost, plant for the season, and use mulch and trench beds to save water." },
  { id: "livestock", icon: PiggyBank, title: "Livestock", body: "Cattle, goats and pigs need clean water, vaccination and good grazing management. Speak to a state veterinarian or animal health technician about vaccinations." },
  { id: "poultry", icon: Bird, title: "Poultry", body: "Broilers and layers can be started small. Good housing, clean water and biosecurity reduce losses." },
  { id: "water", icon: Droplet, title: "Water-wise farming", body: "Rainwater harvesting, drip irrigation and planting drought-tolerant crops help during dry seasons." },
  { id: "markets", icon: ShoppingBasket, title: "Markets", body: "Sell to neighbours, local shops, schools and markets. List your farm in Support Local so buyers can find you." },
  { id: "training", icon: GraduationCap, title: "Training", body: "Extension officers, agricultural colleges and NGOs offer practical training. Training days are posted in Events." },
];

export default async function AgriculturePage() {
  const [opps, news] = await Promise.all([getOpportunities(), getNews()]);
  const agriOpps = opps.filter((o) => o.category === "agriculture" || o.tags.includes("farming"));
  const agriNews = news.filter((n) => n.category === "agriculture");
  return (
    <>
      <PageHeader eyebrow="Agriculture" title="Growing Mhinga" description="Resources, support and opportunities for farmers, gardeners and anyone who works the land." crumbs={[{ label: "Agriculture" }]} image={images.fields} />

      <Section>
        <SectionHeading title="Farming resources" description="Practical starting points. For advice suited to your land, speak to the agricultural extension officer for the area." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map(({ id, icon: Ico, title, body }) => (
            <div key={id} id={id} className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-sand-200/70">
              <span className="grid size-12 place-items-center rounded-2xl bg-bush-50 text-bush-700">
                <Ico className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-charcoal-700">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="green">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <HandCoins className="size-10 text-amber-gold-400" aria-hidden />
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Grants, support & opportunities</h2>
            <p className="mt-3 text-lg text-sand-200">Government and partner programmes support small-scale and emerging farmers with inputs, infrastructure, training and market access.</p>
            <Callout>
              <span className="text-charcoal-800">Programmes change each year. Ask your local agricultural office which programmes are open and how to register as a farmer.</span>
            </Callout>
          </div>
          <div className="grid gap-5 text-ink sm:grid-cols-2">
            {agriOpps.length ? agriOpps.map((o) => <OpportunityCard key={o.id} opportunity={o} />) : <EmptyState title="No current opportunities found." description="Check back soon for new opportunities." />}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Agricultural news" action={{ label: "More news", href: "/news?category=agriculture" }} />
        {agriNews.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agriNews.map((n) => (
              <NewsCard key={n.id} article={n} />
            ))}
          </div>
        ) : (
          <EmptyState icon={Sprout} title="No agricultural news yet" description="Farming news and tips will appear here." />
        )}
      </Section>
    </>
  );
}
