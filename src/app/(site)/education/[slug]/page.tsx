import { notFound } from "next/navigation";
import { BookOpen, Globe, Languages, MapPin, Phone } from "lucide-react";
import { ContactActions } from "@/components/cards/actions";
import { SchoolCard } from "@/components/cards/school-card";
import { AsideCard, DetailGrid, InfoList } from "@/components/shared/detail";
import { PageHeader } from "@/components/shared/page-header";
import { Callout, VerificationNote, VerifiedBadge } from "@/components/shared/states";
import { schoolTypeMeta } from "@/data/schools";
import { getSchool, getSchools } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { telHref } from "@/lib/utils";
import Link from "next/link";

export async function generateStaticParams() {
  return (await getSchools()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = await getSchool((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.name, description: s.summary, path: `/education/${s.slug}` });
}

export default async function SchoolDetail({ params }: { params: Promise<{ slug: string }> }) {
  const school = await getSchool((await params).slug);
  if (!school) notFound();
  const related = (await getSchools()).filter((s) => s.type === school.type && s.id !== school.id).slice(0, 2);
  const meta = schoolTypeMeta[school.type];
  return (
    <>
      <PageHeader
        eyebrow={meta.plural}
        title={school.name}
        description={school.summary}
        crumbs={[{ label: "Education", href: "/education" }, { label: meta.plural, href: `/education?category=${school.type}` }, { label: school.name }]}
        variant="plain"
      >
        <VerifiedBadge verification={school.verification} />
      </PageHeader>
      <DetailGrid
        main={
          <div className="space-y-8">
            <div className="prose-mhinga">
              <p>{school.description ?? school.summary}</p>
            </div>
            {(school.type === "primary" || school.type === "secondary") && (
              <Callout title="Applying to this school">
                Admission dates and requirements are set each year. Read our guide on{" "}
                <Link href="/how-to/register-my-child-at-school" className="font-semibold underline underline-offset-4">
                  registering your child at school
                </Link>
                , then confirm dates with the school.
              </Callout>
            )}
            {school.type === "special" && (
              <Callout title="Getting support for your child">
                Speak to your child&apos;s current school about the SIAS process, or contact the education district office for guidance on placement.
              </Callout>
            )}
            <VerificationNote verification={school.verification} />
            {related.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Other {meta.plural.toLowerCase()}</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {related.map((s) => (
                    <SchoolCard key={s.id} school={s} />
                  ))}
                </div>
              </section>
            )}
          </div>
        }
        aside={
          <AsideCard title="School details">
            <InfoList
              items={[
                { icon: BookOpen, label: "Type", value: meta.label },
                { icon: BookOpen, label: "Grades", value: school.grades && !/to be confirmed/i.test(school.grades) ? school.grades : undefined },
                { icon: MapPin, label: "Location", value: school.location?.label },
                { icon: Phone, label: "Phone", value: school.contact.phone, href: school.contact.phone ? telHref(school.contact.phone) : undefined },
                { icon: Globe, label: "Website", value: school.contact.website?.replace(/^https?:\/\/(www\.)?/, ""), href: school.contact.website },
                ...(school.languages ? [{ icon: Languages, label: "Languages", value: school.languages.join(", ") }] : []),
              ]}
            />
            <ContactActions className="mt-6" contact={{ ...school.contact, website: undefined }} location={school.location} />
          </AsideCard>
        }
      />
    </>
  );
}
