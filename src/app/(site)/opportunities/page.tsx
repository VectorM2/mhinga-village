import { ShieldAlert } from "lucide-react";
import { OpportunitiesDirectory } from "@/components/directories";
import { PageHeader } from "@/components/shared/page-header";
import { getOpportunities } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Bursaries & Opportunities",
  description: "Bursaries, scholarships, jobs, learnerships, internships, youth programmes and business support for the people of Mhinga.",
  path: "/opportunities",
});

export default async function OpportunitiesPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const [{ category, q }, opportunities] = await Promise.all([searchParams, getOpportunities()]);
  return (
    <>
      <PageHeader
        eyebrow="Opportunities"
        title="Opportunities for our people"
        description="Bursaries, learnerships, jobs, internships and programmes — each with who can apply, deadlines and clear steps."
        crumbs={[{ label: "Opportunities" }]}
        image={images.gathering}
      />
      <div className="container-page py-10 sm:py-14">
        <div className="mb-8 flex gap-3 rounded-2xl bg-clay-50 p-4 ring-1 ring-clay-100 sm:items-center">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-clay-600 sm:mt-0" aria-hidden />
          <p className="text-sm text-charcoal-800">
            <span className="font-semibold">Stay safe:</span> genuine bursaries, jobs and learnerships never ask you to pay to apply. Always apply through the official website.
          </p>
        </div>
        <OpportunitiesDirectory opportunities={opportunities} initialCategory={category} initialQuery={q} />
      </div>
    </>
  );
}
