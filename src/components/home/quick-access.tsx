import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Droplets, GraduationCap, HeartPulse, House, MapPinned, Siren, Wallet } from "lucide-react";

const items = [
  { title: "Health & Clinics", description: "Clinics, hospitals and helplines", href: "/services?category=health", icon: HeartPulse, tone: "bg-bush-50 text-bush-700" },
  { title: "Education", description: "Schools, special needs and colleges", href: "/education", icon: GraduationCap, tone: "bg-amber-gold-100 text-amber-gold-700" },
  { title: "Bursaries & Opportunities", description: "Funding, scholarships and grants", href: "/opportunities?category=bursary", icon: Wallet, tone: "bg-clay-50 text-clay-700" },
  { title: "Land & Housing", description: "How land applications work", href: "/land-housing", icon: House, tone: "bg-sand-100 text-charcoal-800" },
  { title: "Water & Municipal", description: "Outages, reports and services", href: "/municipal-services", icon: Droplets, tone: "bg-[#e5f1f3] text-[#1f5d6b]" },
  { title: "Emergency Contacts", description: "Police, ambulance and helplines", href: "/contact#emergency", icon: Siren, tone: "bg-clay-600 text-white" },
  { title: "Jobs & Learnerships", description: "Work, internships and training", href: "/opportunities?category=learnership", icon: BriefcaseBusiness, tone: "bg-charcoal-900 text-amber-gold-400" },
  { title: "Places & Services", description: "Find what's near you", href: "/explore", icon: MapPinned, tone: "bg-bush-700 text-white" },
];

export function QuickAccess() {
  return (
    <section aria-labelledby="quick-title" className="relative z-10 -mt-20 pb-6 sm:-mt-24">
      <div className="container-page">
        <div className="rounded-[2rem] bg-white p-5 shadow-lift ring-1 ring-sand-200 sm:p-8">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="quick-title" className="text-2xl font-semibold sm:text-3xl">
              How can we help?
            </h2>
            <p className="text-sm text-muted">Choose what you&apos;re looking for</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {items.map(({ title, description, href, icon: Ico, tone }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="group relative flex h-full flex-col gap-3 rounded-2xl bg-sand-50 p-4 ring-1 ring-sand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lift hover:ring-sand-300 sm:p-5"
                >
                  <span className={`grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105 sm:size-14 ${tone}`}>
                    <Ico className="size-6 sm:size-7" aria-hidden />
                  </span>
                  <span>
                    <span className="block leading-snug font-semibold text-ink sm:text-lg">{title}</span>
                    <span className="mt-1 block text-[0.8rem] leading-snug text-muted sm:text-sm">{description}</span>
                  </span>
                  <ArrowUpRight className="absolute top-4 right-4 size-5 text-muted opacity-0 transition group-hover:opacity-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
