import { BadgeCheck, Megaphone, Store } from "lucide-react";
import { BusinessesDirectory } from "@/components/directories";
import { BusinessForm } from "@/components/forms/other-forms";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { getBusinesses } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Support Local — Business Directory",
  description: "Discover local businesses in Mhinga: food, beauty, mechanics, builders, plumbers, electricians, tech, farming, accommodation and transport.",
  path: "/businesses",
});

export default async function BusinessesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category }, businesses] = await Promise.all([searchParams, getBusinesses()]);
  return (
    <>
      <PageHeader eyebrow="Business directory" title="Support Local" description="Discover the people who build, feed, fix and serve our community — and keep money working close to home." crumbs={[{ label: "Support Local" }]} image={images.market}>
        <a href="#add-your-business" className="inline-flex h-12 items-center gap-2 rounded-full bg-amber-gold-400 px-6 font-semibold text-charcoal-900 hover:bg-amber-gold-500">
          <Store className="size-5" aria-hidden /> Add your business
        </a>
      </PageHeader>
      <div className="container-page py-10 sm:py-14">
        <BusinessesDirectory businesses={businesses} initialCategory={category} />
      </div>
      <Section tone="white" id="add-your-business" className="scroll-mt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.16em] text-clay-600 uppercase">Free listing</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Add your business</h2>
            <p className="mt-3 text-lg text-charcoal-700">Help residents find you. Listings are free and reviewed by a community administrator before they go live.</p>
            <ul className="mt-6 space-y-4">
              {[
                { icon: Megaphone, t: "Be found", d: "Appear in the directory and in site-wide search." },
                { icon: BadgeCheck, t: "Build trust", d: "Verified listings show a Verified badge." },
                { icon: Store, t: "Manage your listing", d: "Business accounts to edit your details and logo are coming soon." },
              ].map(({ icon: Ico, t, d }) => (
                <li key={t} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-bush-50 text-bush-700">
                    <Ico className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="text-muted">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-sand-50 p-6 ring-1 ring-sand-200 sm:p-8">
            <BusinessForm />
          </div>
        </div>
      </Section>
    </>
  );
}
