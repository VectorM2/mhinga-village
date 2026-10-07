import Link from "next/link";
import { ArrowRight, Droplets, FileQuestion, House } from "lucide-react";
import { ServicesDirectory } from "@/components/directories";
import { PageHeader } from "@/components/shared/page-header";
import { getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Community Services",
  description: "Clinics, hospitals, helplines, social grants, government offices and municipal services for Mhinga, Limpopo.",
  path: "/services",
});

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category }, services] = await Promise.all([searchParams, getServices()]);
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Community Services"
        description="Find important services, facilities and contacts available in and around Mhinga — from clinics and helplines to grants and government offices."
        crumbs={[{ label: "Services" }]}
        image={images.hills}
      />
      <div className="container-page py-10 sm:py-14">
        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {[
            { href: "/municipal-services", label: "Water & municipal services", icon: Droplets },
            { href: "/land-housing", label: "Land & housing", icon: House },
            { href: "/how-to", label: "Step-by-step guides", icon: FileQuestion },
          ].map(({ href, label, icon: Ico }) => (
            <Link key={href} href={href} className="group flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-sand-200 transition hover:shadow-card">
              <span className="grid size-11 place-items-center rounded-xl bg-sand-100 text-bush-700">
                <Ico className="size-5" aria-hidden />
              </span>
              <span className="flex-1 font-semibold">{label}</span>
              <ArrowRight className="size-4 text-muted transition group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
        </div>
        <ServicesDirectory services={services} initialCategory={category} />
      </div>
    </>
  );
}
