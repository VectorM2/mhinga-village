import Link from "next/link";
import { ArrowRight, Building2, Landmark, Mail, MessageCircle, Users } from "lucide-react";
import { EmergencyNumbersList } from "@/components/layout/emergency";
import { ContactForm } from "@/components/forms/other-forms";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { telHref } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact the Mhinga community website, find useful offices, the municipality, traditional authority and emergency numbers.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const [{ topic }, services] = await Promise.all([searchParams, getServices()]);
  const helplines = services.filter((s) => s.category === "support" || s.slug === "sassa");
  const socials = Object.entries(siteConfig.social).filter(([, v]) => v);
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" description="Questions, corrections, news tips or partnership ideas — we'd love to hear from you." crumbs={[{ label: "Contact" }]} variant="plain" />
      <Section className="pt-10!">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_1fr]">
          <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-sand-200/70 sm:p-8">
            <h2 className="mb-1 text-2xl font-semibold">Send us a message</h2>
            <p className="mb-6 text-muted">For website questions, corrections and contributions. This is not an emergency or government service line.</p>
            <ContactForm defaultTopic={topic} />
          </div>
          <div className="space-y-5">
            <div id="emergency" className="scroll-mt-24 rounded-3xl bg-clay-50 p-4 ring-1 ring-clay-100 sm:p-5">
              <h2 className="mb-3 px-1 text-xl font-semibold text-clay-700">Emergency numbers</h2>
              <EmergencyNumbersList compact />
            </div>
            <div className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
              <h2 className="mb-4 text-xl font-semibold">Website team</h2>
              <p className="flex items-center gap-2 text-charcoal-700">
                <Mail className="size-5 text-bush-700" aria-hidden />
                <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-bush-700 hover:underline">
                  {siteConfig.contactEmail}
                </a>
              </p>
              <div className="mt-4">
                <p className="text-sm text-muted">Social media</p>
                {socials.length ? (
                  <ul className="mt-2 flex gap-3">
                    {socials.map(([k, v]) => (
                      <li key={k}>
                        <a href={v} className="font-semibold capitalize text-bush-700 hover:underline">
                          {k}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted italic">
                    <MessageCircle className="size-4" aria-hidden /> Social channels coming soon
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="white">
        <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Useful offices</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Building2, t: "Collins Chabane Local Municipality", d: "Municipal services, housing and roads. Seat: Malamulele.", h: "/services/collins-chabane-municipality" },
            { icon: Landmark, t: "Mhinga Traditional Authority", d: "Traditional leadership and customary land matters.", h: "/services/traditional-authority" },
            { icon: Users, t: "Ward councillor", d: "Your elected representative on the municipal council.", h: "/services/ward-councillor" },
          ].map(({ icon: Ico, t, d, h }) => (
            <Link key={h} href={h} className="group rounded-3xl bg-sand-50 p-6 ring-1 ring-sand-200 transition hover:shadow-card">
              <Ico className="size-8 text-clay-600" aria-hidden />
              <p className="mt-4 text-lg font-semibold">{t}</p>
              <p className="mt-1 text-charcoal-700">{d}</p>
              <p className="mt-2 text-sm text-muted italic">Contact details to be confirmed</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bush-700">
                View details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <h2 className="mt-14 mb-6 text-2xl font-semibold sm:text-3xl">National helplines</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {helplines.map((s) => (
            <li key={s.id} className="rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200">
              <p className="text-sm text-muted">{s.subcategory}</p>
              <p className="font-semibold">{s.name}</p>
              {s.contact.phone && (
                <a href={telHref(s.contact.phone)} className="mt-2 inline-block font-display text-2xl font-semibold text-bush-700 hover:underline">
                  {s.contact.phone}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
