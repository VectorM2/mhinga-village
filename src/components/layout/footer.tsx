import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { emergencyNumbers, footerNav, siteConfig } from "@/lib/site";
import { telHref } from "@/lib/utils";

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-xs font-bold tracking-[0.16em] text-amber-gold-400 uppercase">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sand-200 transition hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal-900 text-sand-200">
      <svg aria-hidden className="absolute inset-x-0 top-0 h-16 w-full text-sand-50" viewBox="0 0 1440 64" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 0h1440v18c-160 30-320 44-480 30S640 4 480 10 160 52 0 40Z" />
      </svg>
      <div className="container-page pt-24 pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo inverted />
            <p className="mt-4 font-display text-xl text-white">{siteConfig.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand-300">
              A community-run digital hub connecting the people of Mhinga with local services, opportunities and one another.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-sand-300">
              <MapPin className="size-4 text-amber-gold-400" aria-hidden /> {siteConfig.location}
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm">
              <Mail className="size-4 text-amber-gold-400" aria-hidden />
              <Link href="/contact" className="hover:text-white hover:underline">
                Contact us
              </Link>
            </p>
          </div>
          <FooterList title="Explore" links={footerNav.explore} />
          <FooterList title="Community" links={footerNav.community} />
          <div>
            <h2 className="mb-4 font-sans text-xs font-bold tracking-[0.16em] text-amber-gold-400 uppercase">Emergency</h2>
            <ul className="space-y-2">
              {emergencyNumbers.map((n) => (
                <li key={n.number}>
                  <a href={telHref(n.number)} className="group flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 transition hover:bg-white/10">
                    <span className="text-sm">{n.label.replace(" (SAPS)", "").replace(" (any network)", "")}</span>
                    <span className="inline-flex items-center gap-2 font-display text-xl font-semibold text-white">
                      <Phone className="size-4 text-clay-500" aria-hidden />
                      {n.number}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-sand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Mhinga. All rights reserved.</p>
          <p className="max-w-xl sm:text-right">
            {siteConfig.isOfficial
              ? "Official community website."
              : "Independent community website. Not operated by a government department, municipality or traditional authority. Always confirm official information with the relevant office."}
          </p>
        </div>
      </div>
    </footer>
  );
}
