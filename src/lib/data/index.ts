/**
 * Data-access layer.
 *
 * Every page reads content through these async functions — never by importing
 * from /src/data directly. Today they resolve mock data; when Supabase is
 * connected, replace each body with a query (see src/lib/supabase/README.md),
 * e.g.
 *
 *   export async function getNews() {
 *     const { data } = await supabase.from("news").select("*")
 *       .eq("status", "published").order("published_at", { ascending: false });
 *     return data.map(mapNewsRow);
 *   }
 *
 * Signatures stay the same, so no component has to change.
 */
import "server-only";

import { businesses } from "@/data/businesses";
import { adminUsers, gallery, places, reports, stories } from "@/data/community";
import { events } from "@/data/events";
import { howToGuides } from "@/data/howTo";
import { news } from "@/data/news";
import { notices } from "@/data/notices";
import { opportunities } from "@/data/opportunities";
import { educationResources, schools } from "@/data/schools";
import { services } from "@/data/services";
import type { SearchResult } from "@/lib/types";

import { NOW } from "@/lib/clock";
export { NOW };

const byDateDesc = <T>(get: (x: T) => string) => (a: T, b: T) => get(b).localeCompare(get(a));

/* ---------- Notices ---------- */
export async function getActiveNotices() {
  return notices
    .filter((n) => !n.expiresAt || new Date(n.expiresAt) >= NOW)
    .sort((a, b) => levelRank[a.level] - levelRank[b.level] || b.publishedAt.localeCompare(a.publishedAt));
}
export async function getAllNotices() {
  return [...notices].sort(byDateDesc((n) => n.publishedAt));
}
const levelRank = { emergency: 0, important: 1, event: 2, information: 3 } as const;

/* ---------- Services ---------- */
export async function getServices() {
  return services;
}
export async function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}

/* ---------- Schools ---------- */
export async function getSchools() {
  return schools;
}
export async function getSchool(slug: string) {
  return schools.find((s) => s.slug === slug) ?? null;
}
export async function getEducationResources() {
  return educationResources;
}

/* ---------- Opportunities ---------- */
export async function getOpportunities() {
  // Open first (soonest deadline), then rolling, then closed
  return [...opportunities].sort((a, b) => {
    const rank = (o: typeof a) => (o.deadline ? (new Date(o.deadline) < NOW ? 2 : 0) : 1);
    return rank(a) - rank(b) || (a.deadline ?? "").localeCompare(b.deadline ?? "");
  });
}
export async function getOpportunity(slug: string) {
  return opportunities.find((o) => o.slug === slug) ?? null;
}

/* ---------- News ---------- */
export async function getNews() {
  return news.filter((n) => n.status === "published").sort(byDateDesc((n) => n.publishedAt));
}
export async function getArticle(slug: string) {
  return news.find((n) => n.slug === slug && n.status === "published") ?? null;
}
export async function getAllNewsForAdmin() {
  return [...news].sort(byDateDesc((n) => n.publishedAt));
}

/* ---------- Events ---------- */
export async function getUpcomingEvents() {
  return events.filter((e) => new Date(e.endsAt ?? e.startsAt) >= NOW).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
export async function getEvents() {
  return [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
export async function getEvent(slug: string) {
  return events.find((e) => e.slug === slug) ?? null;
}

/* ---------- How-to ---------- */
export async function getGuides() {
  return howToGuides;
}
export async function getGuide(slug: string) {
  return howToGuides.find((g) => g.slug === slug) ?? null;
}

/* ---------- Businesses ---------- */
export async function getBusinesses() {
  return businesses.filter((b) => b.status === "approved");
}
export async function getAllBusinessesForAdmin() {
  return businesses;
}
export async function getBusiness(slug: string) {
  return businesses.find((b) => b.slug === slug && b.status === "approved") ?? null;
}

/* ---------- Community ---------- */
export async function getPlaces() {
  return places;
}
export async function getStories() {
  return [...stories].sort(byDateDesc((s) => s.publishedAt));
}
export async function getStory(slug: string) {
  return stories.find((s) => s.slug === slug) ?? null;
}
export async function getGallery() {
  return gallery;
}
export async function getReports() {
  return [...reports].sort(byDateDesc((r) => r.createdAt));
}
export async function getAdminUsers() {
  return adminUsers;
}

/* ---------- Search ---------- */

/**
 * Builds a flat search index. With Supabase, replace this with a Postgres
 * full-text search RPC (see supabase/schema.sql → search_content()).
 */
export async function getSearchIndex(): Promise<SearchResult[]> {
  return [
    ...services.map((s) => ({ id: s.id, kind: "service" as const, title: s.name, description: s.summary, href: `/services/${s.slug}`, meta: s.subcategory })),
    ...schools.map((s) => ({ id: s.id, kind: "school" as const, title: s.name, description: s.summary, href: `/education/${s.slug}`, meta: s.type })),
    ...businesses.filter((b) => b.status === "approved").map((b) => ({ id: b.id, kind: "business" as const, title: b.name, description: b.summary, href: `/businesses/${b.slug}`, meta: b.category })),
    ...news.filter((n) => n.status === "published").map((n) => ({ id: n.id, kind: "article" as const, title: n.title, description: n.excerpt, href: `/news/${n.slug}`, meta: n.category })),
    ...opportunities.map((o) => ({ id: o.id, kind: "opportunity" as const, title: o.title, description: o.summary, href: `/opportunities/${o.slug}`, meta: o.organization })),
    ...events.map((e) => ({ id: e.id, kind: "event" as const, title: e.title, description: e.summary, href: `/events/${e.slug}`, meta: e.venue })),
    ...howToGuides.map((g) => ({ id: g.id, kind: "guide" as const, title: g.title, description: g.overview, href: `/how-to/${g.slug}`, meta: "Guide" })),
  ];
}

/* ---------- Admin stats ---------- */
export async function getDashboardStats() {
  const active = await getActiveNotices();
  return {
    news: news.length,
    notices: active.length,
    opportunities: opportunities.length,
    events: events.length,
    businesses: businesses.length,
    pendingBusinesses: businesses.filter((b) => b.status === "pending").length,
    reports: reports.length,
    openReports: reports.filter((r) => r.status !== "resolved").length,
    unverified:
      services.filter((s) => s.verification.status !== "verified").length +
      schools.filter((s) => s.verification.status !== "verified").length,
  };
}
