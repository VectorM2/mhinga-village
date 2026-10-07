"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Bell,
  Briefcase,
  Building2,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  Settings,
  Store,
  TriangleAlert,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { LogoMark } from "@/components/shared/logo";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/notices", label: "Notices", icon: Megaphone },
  { href: "/admin/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/schools", label: "Schools", icon: GraduationCap },
  { href: "/admin/services", label: "Services", icon: Building2 },
  { href: "/admin/businesses", label: "Businesses", icon: Store },
  { href: "/admin/reports", label: "Reports", icon: Wrench },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavList({ pathname }: { pathname: string }) {
  return (
    <ul className="space-y-0.5">
      {adminNav.map(({ href, label, icon: Ico }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-10 items-center gap-3 rounded-xl px-3 text-[0.9375rem] font-medium transition",
                active ? "bg-white/10 text-white" : "text-sand-300 hover:bg-white/5 hover:text-white",
              )}
            >
              <Ico className={cn("size-4.5", active && "text-amber-gold-400")} aria-hidden />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5">
      <LogoMark className="size-8" />
      <span className="leading-none">
        <span className="block font-display text-lg font-semibold text-white">Mhinga</span>
        <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-sand-300 uppercase">Admin</span>
      </span>
    </Link>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-dvh bg-sand-50 lg:pl-64">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-charcoal-900 px-4 py-5 lg:flex">
        <Brand />
        <nav aria-label="Admin" className="mt-8 flex-1 overflow-y-auto">
          <NavList pathname={pathname} />
        </nav>
        <Link href="/" className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-sand-300 hover:text-white">
          <ExternalLink className="size-4" aria-hidden /> View public site
        </Link>
      </aside>

      <header className="sticky top-0 z-30 border-b border-sand-200 bg-white/90 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogPrimitive.Trigger className="grid size-10 place-items-center rounded-xl hover:bg-sand-100 lg:hidden" aria-label="Open admin menu">
                <Menu className="size-5" aria-hidden />
              </DialogPrimitive.Trigger>
              <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-charcoal-900/60" />
                <DialogPrimitive.Content aria-describedby={undefined} className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-charcoal-900 px-4 py-5">
                  <div className="flex items-center justify-between">
                    <Brand />
                    <DialogPrimitive.Title className="sr-only">Admin menu</DialogPrimitive.Title>
                    <DialogPrimitive.Close className="grid size-10 place-items-center rounded-xl text-white hover:bg-white/10" aria-label="Close menu">
                      <X className="size-5" aria-hidden />
                    </DialogPrimitive.Close>
                  </div>
                  <nav aria-label="Admin" className="mt-8 flex-1 overflow-y-auto">
                    <NavList pathname={pathname} />
                  </nav>
                </DialogPrimitive.Content>
              </DialogPrimitive.Portal>
            </Dialog>
            <span className="hidden items-center gap-1.5 rounded-full bg-amber-gold-100 px-3 py-1 text-xs font-semibold text-amber-gold-700 sm:inline-flex">
              <TriangleAlert className="size-3.5" aria-hidden /> Prototype — mock data, changes are not saved
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="relative grid size-10 place-items-center rounded-xl hover:bg-sand-100" aria-label="Notifications">
              <Bell className="size-5" aria-hidden />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-clay-600" />
            </button>
            <div className="flex items-center gap-2.5 rounded-xl py-1 pr-2 pl-1">
              <span className="grid size-9 place-items-center rounded-full bg-bush-700 text-sm font-semibold text-white">SO</span>
              <span className="hidden text-sm leading-tight sm:block">
                <span className="block font-semibold">Site Owner</span>
                <span className="text-muted">Super Admin</span>
              </span>
            </div>
          </div>
        </div>
      </header>
      <main id="main" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export function AdminPageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {description && <p className="mt-1 text-muted">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

const statusTone: Record<string, string> = {
  published: "bg-bush-50 text-bush-800 ring-bush-100",
  approved: "bg-bush-50 text-bush-800 ring-bush-100",
  verified: "bg-bush-50 text-bush-800 ring-bush-100",
  resolved: "bg-bush-50 text-bush-800 ring-bush-100",
  active: "bg-bush-50 text-bush-800 ring-bush-100",
  open: "bg-bush-50 text-bush-800 ring-bush-100",
  draft: "bg-sand-100 text-charcoal-700 ring-sand-200",
  pending: "bg-amber-gold-100 text-amber-gold-700 ring-amber-gold-100",
  submitted: "bg-amber-gold-100 text-amber-gold-700 ring-amber-gold-100",
  unverified: "bg-amber-gold-100 text-amber-gold-700 ring-amber-gold-100",
  needs_update: "bg-amber-gold-100 text-amber-gold-700 ring-amber-gold-100",
  assigned: "bg-[#e5f1f3] text-[#1f5d6b] ring-[#cfe5ea]",
  in_progress: "bg-[#e5f1f3] text-[#1f5d6b] ring-[#cfe5ea]",
  upcoming: "bg-[#e5f1f3] text-[#1f5d6b] ring-[#cfe5ea]",
  rejected: "bg-clay-50 text-clay-700 ring-clay-100",
  suspended: "bg-clay-50 text-clay-700 ring-clay-100",
  expired: "bg-sand-100 text-muted ring-sand-200",
  closed: "bg-sand-100 text-muted ring-sand-200",
  archived: "bg-sand-100 text-muted ring-sand-200",
  past: "bg-sand-100 text-muted ring-sand-200",
  emergency: "bg-clay-600 text-white ring-clay-700",
  important: "bg-amber-gold-400 text-charcoal-900 ring-amber-gold-500",
  information: "bg-bush-50 text-bush-800 ring-bush-100",
  event: "bg-bush-800 text-white ring-bush-900",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap capitalize ring-1", statusTone[status] ?? "bg-sand-100 text-charcoal-700 ring-sand-200")}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
