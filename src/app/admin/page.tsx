import Link from "next/link";
import { ArrowRight, Briefcase, CalendarDays, Megaphone, Newspaper, ShieldAlert, Store, Wrench } from "lucide-react";
import { AdminPageHeader, StatusBadge } from "@/components/admin/shell";
import { StatCard } from "@/components/shared/content";
import { getAllBusinessesForAdmin, getDashboardStats, getOpportunities, getReports, getSchools, getServices, NOW } from "@/lib/data";
import { daysUntil, formatDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  const [stats, reports, businesses, opps, services, schools] = await Promise.all([getDashboardStats(), getReports(), getAllBusinessesForAdmin(), getOpportunities(), getServices(), getSchools()]);
  const byCategory = Object.entries(
    reports.reduce<Record<string, number>>((acc, r) => ((acc[r.category] = (acc[r.category] ?? 0) + 1), acc), {}),
  ).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...byCategory.map(([, n]) => n));
  const deadlines = opps.filter((o) => o.deadline && daysUntil(o.deadline, NOW) >= 0).slice(0, 4);
  const toVerify = [...services.map((s) => ({ name: s.name, href: "/admin/services", status: s.verification.status })), ...schools.map((s) => ({ name: s.name, href: "/admin/schools", status: s.verification.status }))]
    .filter((x) => x.status !== "verified")
    .slice(0, 6);

  return (
    <>
      <AdminPageHeader title="Dashboard" description={`Overview for ${formatDate(NOW.toISOString(), { weekday: "long", day: "numeric", month: "long" })}`} />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total News" value={stats.news} icon={<Newspaper aria-hidden />} />
        <StatCard label="Active Notices" value={stats.notices} icon={<Megaphone aria-hidden />} />
        <StatCard label="Opportunities" value={stats.opportunities} icon={<Briefcase aria-hidden />} />
        <StatCard label="Events" value={stats.events} icon={<CalendarDays aria-hidden />} />
        <StatCard label="Businesses" value={stats.businesses} hint={`${stats.pendingBusinesses} awaiting approval`} icon={<Store aria-hidden />} />
        <StatCard label="Service Reports" value={stats.reports} hint={`${stats.openReports} open`} icon={<Wrench aria-hidden />} />
      </div>

      <div className="mt-6 grid grid-cols-1 items-start gap-5 xl:grid-cols-3 [&>*]:min-w-0">
        <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-sans text-lg font-semibold">Latest service reports</h2>
            <Link href="/admin/reports" className="inline-flex items-center gap-1 text-sm font-semibold text-bush-700">
              View all <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-sand-100">
            {reports.slice(0, 5).map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-3">
                <span className="w-28 shrink-0 font-mono text-xs font-semibold sm:w-32">{r.reference}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-charcoal-800">{r.description}</span>
                <span className="hidden text-xs text-muted capitalize sm:block">{r.category}</span>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200">
          <h2 className="mb-4 font-sans text-lg font-semibold">Reports by category</h2>
          <ul className="space-y-3">
            {byCategory.map(([cat, n]) => (
              <li key={cat}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="capitalize">{cat}</span>
                  <span className="font-semibold">{n}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-sand-100">
                  <div className="h-full rounded-full bg-bush-600" style={{ width: `${(n / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-sans text-lg font-semibold">Businesses awaiting approval</h2>
            <Link href="/admin/businesses" className="text-sm font-semibold text-bush-700">
              Review
            </Link>
          </div>
          <ul className="space-y-2">
            {businesses
              .filter((b) => b.status === "pending")
              .map((b) => (
                <li key={b.id} className="flex items-center justify-between rounded-xl bg-sand-50 p-3 text-sm ring-1 ring-sand-200">
                  <span className="font-semibold">{b.name}</span>
                  <StatusBadge status={b.status} />
                </li>
              ))}
            {!businesses.some((b) => b.status === "pending") && <li className="text-sm text-muted">Nothing waiting. 🎉</li>}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200">
          <h2 className="mb-4 font-sans text-lg font-semibold">Upcoming deadlines</h2>
          <ul className="space-y-2">
            {deadlines.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate">{o.title}</span>
                <span className="shrink-0 font-semibold text-clay-700">{daysUntil(o.deadline!, NOW)}d</span>
              </li>
            ))}
            {!deadlines.length && <li className="text-sm text-muted">No dated deadlines.</li>}
          </ul>
        </section>

        <section className="rounded-2xl bg-amber-gold-100/60 p-5 ring-1 ring-amber-gold-100">
          <h2 className="mb-1 flex items-center gap-2 font-sans text-lg font-semibold">
            <ShieldAlert className="size-5 text-amber-gold-700" aria-hidden /> Needs verification
          </h2>
          <p className="mb-4 text-sm text-charcoal-700">{stats.unverified} service and school listings are not yet verified.</p>
          <ul className="space-y-1.5">
            {toVerify.map((x) => (
              <li key={x.name}>
                <Link href={x.href} className="flex items-center justify-between gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm hover:bg-white">
                  <span className="truncate">{x.name}</span>
                  <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
