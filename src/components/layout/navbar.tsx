"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Logo } from "@/components/shared/logo";
import { Dialog, SheetContent } from "@/components/ui/dialog";
import { mainNav, type NavGroup } from "@/lib/site";
import { cn } from "@/lib/utils";
import { EmergencyButton, EmergencyNumbersList } from "./emergency";

function isActive(pathname: string, href: string) {
  const base = href.split("?")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const active = isActive(pathname, group.href) || group.children?.some((c) => isActive(pathname, c.href));

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-full px-2.5 text-[0.9375rem] font-medium transition xl:px-3.5",
          active ? "text-bush-800" : "text-charcoal-700 hover:text-ink",
          open && "bg-sand-100",
        )}
      >
        {group.label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 z-50 w-[22rem] -translate-x-1/2 pt-2">
          <ul className="animate-fade-up rounded-2xl bg-white p-2 shadow-lift ring-1 ring-sand-200 [animation-duration:0.25s]">
            {group.children!.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="block rounded-xl px-4 py-3 transition hover:bg-sand-100">
                  <span className="block font-semibold text-ink">{c.label}</span>
                  {c.description && <span className="block text-sm text-muted">{c.description}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow] duration-300",
        scrolled ? "bg-sand-50/90 shadow-[0_1px_0_rgb(0_0_0/0.06),0_8px_24px_-12px_rgb(0_0_0/0.12)] backdrop-blur-lg" : "bg-sand-50",
      )}
    >
      <a href="#main" className="sr-only z-50 rounded-full bg-bush-700 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3">
        Skip to content
      </a>
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo />

        <ul className="hidden items-center lg:flex xl:gap-0.5">
          {mainNav.map((g) =>
            g.children ? (
              <DesktopDropdown key={g.label} group={g} pathname={pathname} />
            ) : (
              <li key={g.label}>
                <Link
                  href={g.href}
                  aria-current={isActive(pathname, g.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-10 items-center rounded-full px-2.5 text-[0.9375rem] font-medium transition xl:px-3.5",
                    isActive(pathname, g.href) ? "text-bush-800 after:absolute after:inset-x-2.5 xl:after:inset-x-3.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-amber-gold-400" : "text-charcoal-700 hover:text-ink",
                  )}
                >
                  {g.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link href="/search" className="hidden size-10 place-items-center sm:grid rounded-full text-charcoal-700 transition hover:bg-sand-100 hover:text-ink" aria-label="Search">
            <Search className="size-5" aria-hidden />
          </Link>
          <EmergencyButton size="sm" className="max-[340px]:px-2.5 max-[340px]:[&>span]:sr-only" />
          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogPrimitive.Trigger className="grid size-10 place-items-center rounded-full text-ink transition hover:bg-sand-100 lg:hidden" aria-label="Open menu">
              <Menu className="size-6" aria-hidden />
            </DialogPrimitive.Trigger>
            <SheetContent aria-describedby={undefined}>
              <div className="flex h-16 items-center justify-between border-b border-sand-200 px-5">
                <DialogPrimitive.Title className="font-display text-xl font-semibold">Menu</DialogPrimitive.Title>
                <DialogPrimitive.Close className="grid size-10 place-items-center rounded-full hover:bg-sand-100" aria-label="Close menu">
                  <X className="size-6" aria-hidden />
                </DialogPrimitive.Close>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <form action="/search" role="search" className="mb-4 px-1">
                  <label htmlFor="mobile-search" className="sr-only">
                    Search Mhinga
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
                    <input id="mobile-search" name="q" type="search" placeholder="Search Mhinga…" className="h-12 w-full rounded-full border border-sand-300 bg-white pr-4 pl-12 text-base focus:border-bush-500 focus:ring-4 focus:ring-bush-100 focus:outline-none" />
                  </div>
                </form>
                <ul className="space-y-1">
                  {mainNav.map((g) => (
                    <li key={g.label}>
                      <Link
                        href={g.href}
                        className={cn(
                          "flex min-h-12 items-center rounded-xl px-4 text-lg font-semibold",
                          isActive(pathname, g.href) ? "bg-bush-50 text-bush-800" : "text-ink hover:bg-sand-100",
                        )}
                      >
                        {g.label === "Community" ? "Explore Mhinga" : g.label}
                      </Link>
                      {g.children && (
                        <ul className="mt-1 mb-2 ml-4 space-y-0.5 border-l-2 border-sand-200 pl-3">
                          {g.children
                            .filter((c) => c.href !== g.href)
                            .map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className="flex min-h-11 items-center rounded-lg px-3 text-[0.975rem] text-charcoal-700 hover:bg-sand-100 hover:text-ink">
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  <li>
                    <Link href="/contact" className="flex min-h-12 items-center rounded-xl px-4 text-lg font-semibold text-ink hover:bg-sand-100">
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="mt-6 rounded-2xl bg-clay-50 p-3 ring-1 ring-clay-100">
                  <p className="mb-2 px-1 text-sm font-bold tracking-wide text-clay-700 uppercase">Emergency</p>
                  <EmergencyNumbersList compact />
                </div>
              </div>
            </SheetContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
