import { notFound } from "next/navigation";
import { Clock, Globe, MapPin, Phone } from "lucide-react";
import { ContactActions } from "@/components/cards/actions";
import { ServiceCard, serviceIcon } from "@/components/cards/service-card";
import { AsideCard, DetailGrid, InfoList } from "@/components/shared/detail";
import { PageHeader } from "@/components/shared/page-header";
import { VerificationNote, VerifiedBadge } from "@/components/shared/states";
import { serviceCategoryMeta } from "@/data/services";
import { getService, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { telHref } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = await getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.name, description: s.summary, path: `/services/${s.slug}` });
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const service = await getService((await params).slug);
  if (!service) notFound();
  const related = (await getServices()).filter((s) => s.category === service.category && s.id !== service.id).slice(0, 2);
  const Ico = serviceIcon[service.category];

  return (
    <>
      <PageHeader
        eyebrow={service.subcategory}
        title={service.name}
        description={service.summary}
        crumbs={[{ label: "Services", href: "/services" }, { label: serviceCategoryMeta[service.category].label, href: `/services?category=${service.category}` }, { label: service.name }]}
        variant="plain"
      >
        <div className="flex flex-wrap items-center gap-3">
          <VerifiedBadge verification={service.verification} />
          <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-charcoal-700 ring-1 ring-sand-300 capitalize">{service.scope} service</span>
        </div>
      </PageHeader>
      <DetailGrid
        main={
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-bush-50 text-bush-700 sm:grid">
                <Ico className="size-7" aria-hidden />
              </span>
              <div className="prose-mhinga">
                <p>{service.description}</p>
              </div>
            </div>
            {service.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="Topics">
                {service.tags.map((t) => (
                  <li key={t} className="rounded-full bg-sand-100 px-3 py-1 text-sm text-charcoal-700">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            <VerificationNote verification={service.verification} />
            {related.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Related services</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {related.map((s) => (
                    <ServiceCard key={s.id} service={s} />
                  ))}
                </div>
              </section>
            )}
          </div>
        }
        aside={
          <AsideCard title="Contact & hours">
            <InfoList
              items={[
                { icon: Phone, label: "Phone", value: service.contact.phone, href: service.contact.phone ? telHref(service.contact.phone) : undefined },
                { icon: MapPin, label: "Location", value: service.location?.label ?? (service.scope === "national" ? "National service" : undefined) },
                { icon: Clock, label: "Hours", value: service.hours },
                ...(service.contact.website ? [{ icon: Globe, label: "Website", value: service.contact.website.replace(/^https?:\/\/(www\.)?/, ""), href: service.contact.website }] : []),
              ]}
            />
            <ContactActions className="mt-6" contact={{ ...service.contact, website: undefined }} location={service.location} />
          </AsideCard>
        }
      />
    </>
  );
}
