import { Clock, FileCheck2, Phone } from "lucide-react";
import { EmergencyNumbersList } from "@/components/layout/emergency";
import { ReportForm } from "@/components/forms/report-form";
import { PageHeader } from "@/components/shared/page-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Report a Problem",
  description: "Report water, electricity, road, waste, sewage, streetlight and infrastructure problems in Mhinga and get a reference number.",
  path: "/report",
});

export default async function ReportPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return (
    <>
      <PageHeader eyebrow="Report" title="Report a Problem" description="Water off? Streetlight broken? Illegal dumping? Tell us what's wrong and where — it takes about two minutes." crumbs={[{ label: "Report a Problem" }]} variant="plain" />
      <div className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14">
        <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-sand-200/70 sm:p-8">
          <ReportForm defaultCategory={category} />
        </div>
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-sand-100 p-6">
            <h2 className="mb-4 text-xl font-semibold">What happens next</h2>
            <ol className="space-y-4">
              {[
                { icon: FileCheck2, t: "You get a reference number", d: "Keep it to follow up." },
                { icon: Clock, t: "We pass it on", d: "Reports are shared with the responsible office." },
                { icon: Phone, t: "Updates", d: "If you left contact details, you may be contacted." },
              ].map(({ icon: Ico, t, d }) => (
                <li key={t} className="flex gap-3">
                  <Ico className="mt-0.5 size-5 shrink-0 text-bush-700" aria-hidden />
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="text-sm text-muted">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl bg-clay-50 p-4 ring-1 ring-clay-100">
            <p className="mb-3 px-1 text-sm font-bold tracking-wide text-clay-700 uppercase">In an emergency, call</p>
            <EmergencyNumbersList compact />
          </div>
        </aside>
      </div>
    </>
  );
}
