import { notFound } from "next/navigation";
import { Clock, Globe, MapPin, MessageCircle, Phone, User } from "lucide-react";
import { ContactActions } from "@/components/cards/actions";
import { BusinessCard, BusinessLogo } from "@/components/cards/business-card";
import { AsideCard, DetailGrid, InfoList } from "@/components/shared/detail";
import { Breadcrumbs } from "@/components/shared/page-header";
import { Callout, SampleBadge, VerificationNote } from "@/components/shared/states";
import { businessCategoryMeta } from "@/data/businesses";
import { getBusiness, getBusinesses } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { telHref, whatsappHref } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getBusinesses()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const b = await getBusiness((await params).slug);
  if (!b) return {};
  return pageMetadata({ title: b.name, description: b.summary, path: `/businesses/${b.slug}` });
}

export default async function BusinessDetail({ params }: { params: Promise<{ slug: string }> }) {
  const b = await getBusiness((await params).slug);
  if (!b) notFound();
  const related = (await getBusinesses()).filter((x) => x.id !== b.id).slice(0, 2);
  return (
    <>
      <header className="contour-texture border-b border-sand-200 bg-sand-100">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Support Local", href: "/businesses" }, { label: businessCategoryMeta[b.category], href: `/businesses?category=${b.category}` }, { label: b.name }]} />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <BusinessLogo business={b} className="size-20 rounded-3xl text-3xl" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold tracking-wider text-clay-600 uppercase">{businessCategoryMeta[b.category]}</span>
                {b.isSample && <SampleBadge label="Sample listing" />}
              </div>
              <h1 className="mt-1 text-4xl font-semibold sm:text-5xl">{b.name}</h1>
              <p className="mt-2 text-lg text-muted">{b.summary}</p>
            </div>
          </div>
        </div>
      </header>
      <DetailGrid
        main={
          <div className="space-y-8">
            <div className="prose-mhinga">
              <p>{b.description}</p>
            </div>
            {b.services && (
              <section>
                <h2 className="mb-3 text-2xl font-semibold">Services</h2>
                <ul className="flex flex-wrap gap-2">
                  {b.services.map((s) => (
                    <li key={s} className="rounded-full bg-white px-4 py-2 font-medium ring-1 ring-sand-300">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {b.isSample && <Callout title="This is a sample listing">It shows how business profiles will look. Real listings are submitted by business owners and approved by an administrator.</Callout>}
            <VerificationNote verification={b.verification} />
            {related.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold">More local businesses</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {related.map((r) => (
                    <BusinessCard key={r.id} business={r} />
                  ))}
                </div>
              </section>
            )}
          </div>
        }
        aside={
          <AsideCard title="Contact">
            <InfoList
              items={[
                { icon: Phone, label: "Phone", value: b.contact.phone, href: b.contact.phone ? telHref(b.contact.phone) : undefined },
                { icon: MessageCircle, label: "WhatsApp", value: b.contact.whatsapp, href: b.contact.whatsapp ? whatsappHref(b.contact.whatsapp) : undefined },
                { icon: MapPin, label: "Location", value: b.location?.label },
                { icon: Clock, label: "Opening hours", value: b.hours },
                { icon: Globe, label: "Website", value: b.contact.website?.replace(/^https?:\/\/(www\.)?/, ""), href: b.contact.website },
                ...(b.owner ? [{ icon: User, label: "Owner", value: b.owner }] : []),
              ]}
            />
            <ContactActions className="mt-6" contact={b.contact} location={b.location} />
          </AsideCard>
        }
      />
    </>
  );
}
