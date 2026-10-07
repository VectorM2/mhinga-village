"use client";

import { Archive, Ban, CheckCircle2, Eye, EyeOff, ShieldCheck, ShieldOff, Star, XCircle } from "lucide-react";
import type { AdminUser, Business, CommunityEvent, GalleryItem, NewsArticle, Notice, Opportunity, School, Service } from "@/lib/types";
import { businessCategoryMeta } from "@/data/businesses";
import { eventCategoryMeta } from "@/data/events";
import { newsCategoryMeta } from "@/data/news";
import { opportunityCategoryMeta } from "@/data/opportunities";
import { schoolTypeMeta } from "@/data/schools";
import { serviceCategoryMeta } from "@/data/services";
import { NOW } from "@/lib/clock";
import { formatDate, slugify } from "@/lib/utils";
import { ResourceManager, type RowAction } from "./resource-manager";
import { StatusBadge } from "./shell";

const opts = (m: Record<string, string | { label: string }>) => Object.entries(m).map(([value, v]) => ({ value, label: typeof v === "string" ? v : v.label }));
const today = () => new Date().toISOString().slice(0, 10);
const newId = (p: string) => `${p}-${Math.random().toString(36).slice(2, 9)}`;
const Title = ({ main, sub }: { main: string; sub?: string }) => (
  <div className="min-w-0">
    <p className="max-w-[11rem] truncate font-semibold sm:max-w-[22rem] text-ink">{main}</p>
    {sub && <p className="max-w-[11rem] truncate text-xs sm:max-w-[22rem] text-muted">{sub}</p>}
  </div>
);

/** Shared "mark verified" actions — the trust system administrators use. */
function verifyActions<T extends { verification: Service["verification"] }>(): RowAction<T>[] {
  return [
    {
      label: "Mark as verified",
      icon: ShieldCheck,
      show: (r) => r.verification.status !== "verified",
      apply: (r) => ({ ...r, verification: { ...r.verification, status: "verified", verifiedBy: "Site Owner", verifiedAt: today() } }),
      toast: "Marked as verified",
    },
    {
      label: "Remove verification",
      icon: ShieldOff,
      show: (r) => r.verification.status === "verified",
      apply: (r) => ({ ...r, verification: { ...r.verification, status: "unverified", verifiedBy: undefined, verifiedAt: undefined } }),
      toast: "Verification removed",
    },
    {
      label: "Flag: needs update",
      icon: Archive,
      show: (r) => r.verification.status !== "needs_update",
      apply: (r) => ({ ...r, verification: { ...r.verification, status: "needs_update" } }),
      toast: "Flagged for update",
    },
  ];
}

/* ---------- News ---------- */
export function NewsManager({ rows }: { rows: NewsArticle[] }) {
  return (
    <ResourceManager<NewsArticle>
      noun="Article"
      rows={rows}
      searchText={(r) => `${r.title} ${r.excerpt}`}
      filter={{ label: "Statuses", options: opts({ published: "Published", draft: "Draft", archived: "Archived" }), get: (r) => r.status }}
      columns={[
        { key: "title", label: "Title", render: (r) => <Title main={r.title} sub={r.author.name} /> },
        { key: "cat", label: "Category", render: (r) => newsCategoryMeta[r.category], hideOnMobile: true },
        { key: "date", label: "Date", render: (r) => formatDate(r.publishedAt, { day: "numeric", month: "short", year: "numeric" }), hideOnMobile: true },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "category", label: "Category", type: "select", options: opts(newsCategoryMeta), required: true },
        { name: "excerpt", label: "Excerpt", type: "textarea", required: true, hint: "One or two sentences shown on cards and in search." },
        { name: "body", label: "Body", type: "textarea", hint: "Rich-text editor to be connected with the CMS. Separate paragraphs with a blank line." },
        { name: "author", label: "Author", type: "text" },
        { name: "publishedAt", label: "Publish date", type: "date" },
        { name: "status", label: "Status", type: "select", options: opts({ draft: "Draft", published: "Published", archived: "Archived" }) },
        { name: "featured", label: "Feature on homepage", type: "checkbox" },
      ]}
      toForm={(r) => ({ title: r.title, category: r.category, excerpt: r.excerpt, body: r.body.map((b) => ("text" in b ? b.text : "items" in b ? b.items.join("\n") : "")).join("\n\n"), author: r.author.name, publishedAt: r.publishedAt.slice(0, 10), status: r.status, featured: !!r.featured })}
      fromForm={(v, e) => ({
        ...(e ?? ({ id: newId("news"), image: { src: "/images/hills-morning.svg", alt: "" } } as NewsArticle)),
        title: String(v.title),
        slug: e?.slug ?? slugify(String(v.title)),
        category: (v.category || "community") as NewsArticle["category"],
        excerpt: String(v.excerpt),
        body: String(v.body ?? "").split(/\n{2,}/).filter(Boolean).map((text) => ({ type: "paragraph" as const, text })),
        author: { name: String(v.author || "Mhinga Community Desk") },
        publishedAt: String(v.publishedAt || today()),
        status: (v.status || "draft") as NewsArticle["status"],
        featured: !!v.featured,
      })}
      actions={[
        { label: "Publish", icon: Eye, show: (r) => r.status !== "published", apply: (r) => ({ ...r, status: "published" }), toast: "Article published" },
        { label: "Unpublish", icon: EyeOff, show: (r) => r.status === "published", apply: (r) => ({ ...r, status: "draft" }), toast: "Article unpublished" },
        { label: "Archive", icon: Archive, show: (r) => r.status !== "archived", apply: (r) => ({ ...r, status: "archived" }), toast: "Article archived" },
      ]}
    />
  );
}

/* ---------- Opportunities ---------- */
export function OpportunitiesManager({ rows }: { rows: Opportunity[] }) {
  const state = (o: Opportunity) => (!o.deadline ? "open" : new Date(o.deadline) < NOW ? "closed" : "open");
  return (
    <ResourceManager<Opportunity>
      noun="Opportunity"
      rows={rows}
      searchText={(r) => `${r.title} ${r.organization}`}
      filter={{ label: "Categories", options: opts(opportunityCategoryMeta), get: (r) => r.category }}
      columns={[
        { key: "t", label: "Opportunity", render: (r) => <Title main={r.title} sub={r.organization} /> },
        { key: "c", label: "Category", render: (r) => opportunityCategoryMeta[r.category].label, hideOnMobile: true },
        { key: "d", label: "Deadline", render: (r) => (r.deadline ? formatDate(r.deadline, { day: "numeric", month: "short", year: "numeric" }) : <span className="text-muted">Rolling</span>) },
        { key: "s", label: "Status", render: (r) => <StatusBadge status={state(r)} /> },
        { key: "v", label: "Trust", render: (r) => <StatusBadge status={r.verification.status} />, hideOnMobile: true },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "organization", label: "Organisation", type: "text", required: true },
        { name: "category", label: "Category", type: "select", options: opts(opportunityCategoryMeta), required: true },
        { name: "deadline", label: "Deadline", type: "date", hint: "Leave empty for rolling opportunities." },
        { name: "applyUrl", label: "Application link", type: "url" },
        { name: "location", label: "Location", type: "text" },
        { name: "summary", label: "Summary", type: "textarea", required: true },
        { name: "eligibility", label: "Eligibility (one per line)", type: "textarea" },
        { name: "howToApply", label: "How to apply (one step per line)", type: "textarea" },
        { name: "featured", label: "Feature this opportunity", type: "checkbox" },
      ]}
      toForm={(r) => ({ title: r.title, organization: r.organization, category: r.category, deadline: r.deadline ?? "", applyUrl: r.applyUrl ?? "", location: r.location ?? "", summary: r.summary, eligibility: r.eligibility.join("\n"), howToApply: r.howToApply.join("\n"), featured: !!r.featured })}
      fromForm={(v, e) => ({
        ...(e ?? ({ id: newId("opp"), description: "", tags: [], publishedAt: today(), verification: { status: "unverified" } } as unknown as Opportunity)),
        title: String(v.title),
        slug: e?.slug ?? slugify(String(v.title)),
        organization: String(v.organization),
        category: (v.category || "job") as Opportunity["category"],
        deadline: v.deadline ? String(v.deadline) : undefined,
        applyUrl: v.applyUrl ? String(v.applyUrl) : undefined,
        location: v.location ? String(v.location) : undefined,
        summary: String(v.summary),
        description: e?.description || String(v.summary),
        eligibility: String(v.eligibility ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
        howToApply: String(v.howToApply ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
        featured: !!v.featured,
      })}
      actions={[{ label: "Toggle featured", icon: Star, apply: (r) => ({ ...r, featured: !r.featured }), toast: "Featured status changed" }, ...verifyActions<Opportunity>()]}
    />
  );
}

/* ---------- Events ---------- */
export function EventsManager({ rows }: { rows: CommunityEvent[] }) {
  return (
    <ResourceManager<CommunityEvent>
      noun="Event"
      rows={rows}
      searchText={(r) => `${r.title} ${r.venue} ${r.organizer}`}
      filter={{ label: "Categories", options: opts(eventCategoryMeta), get: (r) => r.category }}
      columns={[
        { key: "t", label: "Event", render: (r) => <Title main={r.title} sub={r.organizer} /> },
        { key: "d", label: "Date", render: (r) => formatDate(r.startsAt, { day: "numeric", month: "short", year: "numeric" }) },
        { key: "v", label: "Venue", render: (r) => <span className="text-charcoal-700">{r.venue}</span>, hideOnMobile: true },
        { key: "s", label: "Status", render: (r) => <StatusBadge status={new Date(r.startsAt) >= NOW ? "upcoming" : "past"} /> },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "category", label: "Category", type: "select", options: opts(eventCategoryMeta), required: true },
        { name: "startsAt", label: "Starts", type: "datetime-local", required: true },
        { name: "endsAt", label: "Ends", type: "datetime-local" },
        { name: "venue", label: "Venue", type: "text", required: true },
        { name: "organizer", label: "Organiser", type: "text", required: true },
        { name: "summary", label: "Summary", type: "textarea", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "isFree", label: "Free event", type: "checkbox" },
      ]}
      toForm={(r) => ({ title: r.title, category: r.category, startsAt: r.startsAt.slice(0, 16), endsAt: r.endsAt?.slice(0, 16) ?? "", venue: r.venue, organizer: r.organizer, summary: r.summary, description: r.description, isFree: !!r.isFree })}
      fromForm={(v, e) => ({
        ...(e ?? ({ id: newId("evt"), image: { src: "/images/gathering.svg", alt: "" } } as CommunityEvent)),
        title: String(v.title),
        slug: e?.slug ?? slugify(String(v.title)),
        category: (v.category || "community-meeting") as CommunityEvent["category"],
        startsAt: `${String(v.startsAt).slice(0, 16)}:00+02:00`,
        endsAt: v.endsAt ? `${String(v.endsAt).slice(0, 16)}:00+02:00` : undefined,
        venue: String(v.venue),
        organizer: String(v.organizer),
        summary: String(v.summary),
        description: String(v.description || v.summary),
        isFree: !!v.isFree,
      })}
    />
  );
}

/* ---------- Notices ---------- */
export function NoticesManager({ rows }: { rows: Notice[] }) {
  const state = (n: Notice) => (n.expiresAt && new Date(n.expiresAt) < NOW ? "expired" : "active");
  return (
    <ResourceManager<Notice>
      noun="Notice"
      rows={rows}
      searchText={(r) => `${r.title} ${r.category}`}
      filter={{ label: "Priorities", options: opts({ emergency: "Emergency", important: "Important", information: "Information", event: "Event" }), get: (r) => r.level }}
      columns={[
        { key: "t", label: "Notice", render: (r) => <Title main={r.title} sub={r.category} /> },
        { key: "p", label: "Priority", render: (r) => <StatusBadge status={r.level} /> },
        { key: "d", label: "Published", render: (r) => formatDate(r.publishedAt, { day: "numeric", month: "short" }), hideOnMobile: true },
        { key: "x", label: "Expires", render: (r) => (r.expiresAt ? formatDate(r.expiresAt, { day: "numeric", month: "short" }) : <span className="text-muted">Never</span>), hideOnMobile: true },
        { key: "s", label: "Status", render: (r) => <StatusBadge status={state(r)} /> },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "level", label: "Priority", type: "select", required: true, options: opts({ emergency: "Emergency", important: "Important", information: "Information", event: "Event" }) },
        { name: "category", label: "Category", type: "text", required: true, hint: "e.g. Water, Roads, Education" },
        { name: "expiresAt", label: "Expiration date", type: "date", hint: "Notice disappears from the site after this date." },
        { name: "summary", label: "Short description", type: "textarea", required: true },
        { name: "link", label: "Read-more link", type: "text", hint: "Internal path such as /municipal-services#water" },
      ]}
      toForm={(r) => ({ title: r.title, level: r.level, category: r.category, expiresAt: r.expiresAt ?? "", summary: r.summary, link: r.link ?? "" })}
      fromForm={(v, e) => ({
        ...(e ?? ({ id: newId("ntc"), publishedAt: today() } as Notice)),
        title: String(v.title),
        slug: e?.slug ?? slugify(String(v.title)),
        level: (v.level || "information") as Notice["level"],
        category: String(v.category),
        expiresAt: v.expiresAt ? String(v.expiresAt) : undefined,
        summary: String(v.summary),
        link: v.link ? String(v.link) : undefined,
      })}
      actions={[{ label: "Expire now", icon: XCircle, show: (r) => state(r) === "active", apply: (r) => ({ ...r, expiresAt: "2000-01-01" }), toast: "Notice expired" }]}
    />
  );
}

/* ---------- Services ---------- */
export function ServicesManager({ rows }: { rows: Service[] }) {
  return (
    <ResourceManager<Service>
      noun="Service"
      rows={rows}
      searchText={(r) => `${r.name} ${r.subcategory}`}
      filter={{ label: "Categories", options: opts(serviceCategoryMeta), get: (r) => r.category }}
      columns={[
        { key: "n", label: "Service", render: (r) => <Title main={r.name} sub={r.subcategory} /> },
        { key: "p", label: "Phone", render: (r) => r.contact.phone ?? <span className="text-muted italic">—</span>, hideOnMobile: true },
        { key: "s", label: "Scope", render: (r) => <span className="capitalize">{r.scope}</span>, hideOnMobile: true },
        { key: "v", label: "Verification", render: (r) => <StatusBadge status={r.verification.status} /> },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "category", label: "Category", type: "select", options: opts(serviceCategoryMeta), required: true },
        { name: "subcategory", label: "Sub-category", type: "text", required: true },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "hours", label: "Operating hours", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "website", label: "Website", type: "url" },
        { name: "scope", label: "Scope", type: "select", options: opts({ local: "Local", regional: "Regional", national: "National" }) },
        { name: "summary", label: "Summary", type: "textarea", required: true },
        { name: "source", label: "Source of information", type: "text", hint: "Where did this information come from? Shown to residents." },
      ]}
      toForm={(r) => ({ name: r.name, category: r.category, subcategory: r.subcategory, phone: r.contact.phone ?? "", hours: r.hours ?? "", location: r.location?.label ?? "", website: r.contact.website ?? "", scope: r.scope, summary: r.summary, source: r.verification.source ?? "" })}
      fromForm={(v, e) => ({
        ...(e ?? ({ id: newId("svc"), description: "", tags: [], verification: { status: "unverified" } } as unknown as Service)),
        name: String(v.name),
        slug: e?.slug ?? slugify(String(v.name)),
        category: (v.category || "health") as Service["category"],
        subcategory: String(v.subcategory),
        contact: { ...(e?.contact ?? {}), phone: v.phone ? String(v.phone) : undefined, website: v.website ? String(v.website) : undefined },
        hours: v.hours ? String(v.hours) : undefined,
        location: v.location ? { label: String(v.location) } : undefined,
        scope: (v.scope || "local") as Service["scope"],
        summary: String(v.summary),
        description: e?.description || String(v.summary),
        verification: { ...(e?.verification ?? { status: "unverified" }), source: v.source ? String(v.source) : undefined },
      })}
      actions={verifyActions<Service>()}
    />
  );
}

/* ---------- Schools ---------- */
export function SchoolsManager({ rows }: { rows: School[] }) {
  const typeOpts = Object.entries(schoolTypeMeta).map(([value, m]) => ({ value, label: m.label }));
  return (
    <ResourceManager<School>
      noun="School"
      rows={rows}
      searchText={(r) => r.name}
      filter={{ label: "Types", options: typeOpts, get: (r) => r.type }}
      columns={[
        { key: "n", label: "School", render: (r) => <Title main={r.name} sub={r.location?.label} /> },
        { key: "t", label: "Type", render: (r) => schoolTypeMeta[r.type].label },
        { key: "p", label: "Phone", render: (r) => r.contact.phone ?? <span className="text-muted italic">—</span>, hideOnMobile: true },
        { key: "v", label: "Verification", render: (r) => <StatusBadge status={r.verification.status} /> },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "type", label: "Type", type: "select", options: typeOpts, required: true },
        { name: "grades", label: "Grades", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "website", label: "Website", type: "url" },
        { name: "summary", label: "Summary", type: "textarea", required: true },
      ]}
      toForm={(r) => ({ name: r.name, type: r.type, grades: r.grades ?? "", location: r.location?.label ?? "", phone: r.contact.phone ?? "", website: r.contact.website ?? "", summary: r.summary })}
      fromForm={(v, e) => ({
        ...(e ?? ({ id: newId("sch"), verification: { status: "unverified" } } as School)),
        name: String(v.name),
        slug: e?.slug ?? slugify(String(v.name)),
        type: (v.type || "primary") as School["type"],
        grades: v.grades ? String(v.grades) : undefined,
        location: v.location ? { label: String(v.location) } : undefined,
        contact: { phone: v.phone ? String(v.phone) : undefined, website: v.website ? String(v.website) : undefined },
        summary: String(v.summary),
      })}
      actions={verifyActions<School>()}
    />
  );
}

/* ---------- Businesses ---------- */
export function BusinessesManager({ rows }: { rows: Business[] }) {
  return (
    <ResourceManager<Business>
      noun="Business"
      rows={rows}
      searchText={(r) => `${r.name} ${r.summary}`}
      filter={{ label: "Statuses", options: opts({ pending: "Pending", approved: "Approved", rejected: "Rejected", suspended: "Suspended" }), get: (r) => r.status }}
      columns={[
        { key: "n", label: "Business", render: (r) => <Title main={r.name} sub={businessCategoryMeta[r.category]} /> },
        { key: "p", label: "Phone", render: (r) => r.contact.phone ?? <span className="text-muted italic">—</span>, hideOnMobile: true },
        { key: "s", label: "Listing", render: (r) => <StatusBadge status={r.status} /> },
        { key: "v", label: "Trust", render: (r) => <StatusBadge status={r.verification.status} />, hideOnMobile: true },
      ]}
      fields={[
        { name: "name", label: "Business name", type: "text", required: true },
        { name: "category", label: "Category", type: "select", options: opts(businessCategoryMeta), required: true },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "whatsapp", label: "WhatsApp", type: "tel" },
        { name: "hours", label: "Opening hours", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "summary", label: "Summary", type: "textarea", required: true },
      ]}
      toForm={(r) => ({ name: r.name, category: r.category, phone: r.contact.phone ?? "", whatsapp: r.contact.whatsapp ?? "", hours: r.hours ?? "", location: r.location?.label ?? "", summary: r.summary })}
      fromForm={(v, e) => ({
        ...(e ?? ({ id: newId("biz"), status: "pending", description: "", verification: { status: "unverified" } } as unknown as Business)),
        name: String(v.name),
        slug: e?.slug ?? slugify(String(v.name)),
        category: (v.category || "retail") as Business["category"],
        contact: { ...(e?.contact ?? {}), phone: v.phone ? String(v.phone) : undefined, whatsapp: v.whatsapp ? String(v.whatsapp) : undefined },
        hours: v.hours ? String(v.hours) : undefined,
        location: v.location ? { label: String(v.location) } : undefined,
        summary: String(v.summary),
        description: e?.description || String(v.summary),
        logoInitials: String(v.name).split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
      })}
      actions={[
        { label: "Approve", icon: CheckCircle2, show: (r) => r.status !== "approved", apply: (r) => ({ ...r, status: "approved" }), toast: "Listing approved" },
        { label: "Reject", icon: XCircle, show: (r) => r.status === "pending", apply: (r) => ({ ...r, status: "rejected" }), toast: "Listing rejected", tone: "danger" },
        { label: "Suspend", icon: Ban, show: (r) => r.status === "approved", apply: (r) => ({ ...r, status: "suspended" }), toast: "Listing suspended", tone: "danger" },
        ...verifyActions<Business>(),
      ]}
    />
  );
}

/* ---------- Gallery ---------- */
export function GalleryManager({ rows }: { rows: GalleryItem[] }) {
  const cats = opts({ community: "Community", events: "Events", schools: "Schools", sports: "Sports", culture: "Culture", nature: "Nature", history: "History" });
  return (
    <ResourceManager<GalleryItem>
      noun="Photo"
      rows={rows}
      searchText={(r) => r.title}
      filter={{ label: "Categories", options: cats, get: (r) => r.category }}
      createLabel="Upload photo"
      columns={[
        {
          key: "img",
          label: "Photo",
          render: (r) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={r.image.src} alt="" className="h-12 w-16 rounded-lg object-cover ring-1 ring-sand-200" />
          ),
        },
        { key: "t", label: "Title", render: (r) => <Title main={r.title} sub={r.contributor ?? "Placeholder illustration"} /> },
        { key: "c", label: "Category", render: (r) => <span className="capitalize">{r.category}</span> },
      ]}
      fields={[
        { name: "title", label: "Caption", type: "text", required: true },
        { name: "category", label: "Category", type: "select", options: cats, required: true },
        { name: "contributor", label: "Photographer / credit", type: "text" },
        { name: "src", label: "Image URL", type: "text", hint: "With Supabase this becomes a file upload to Storage." },
      ]}
      toForm={(r) => ({ title: r.title, category: r.category, contributor: r.contributor ?? "", src: r.image.src })}
      fromForm={(v, e) => ({
        ...(e ?? ({ id: newId("g"), aspect: "landscape" } as GalleryItem)),
        title: String(v.title),
        category: (v.category || "community") as GalleryItem["category"],
        contributor: v.contributor ? String(v.contributor) : undefined,
        image: { src: String(v.src || "/images/hills-morning.svg"), alt: String(v.title) },
      })}
    />
  );
}

/* ---------- Users ---------- */
const roleLabel = { super_admin: "Super Admin", editor: "Editor", community_manager: "Community Manager" } as const;
export function UsersManager({ rows }: { rows: AdminUser[] }) {
  return (
    <ResourceManager<AdminUser>
      noun="User"
      rows={rows}
      searchText={(r) => `${r.name} ${r.email}`}
      filter={{ label: "Roles", options: opts(roleLabel), get: (r) => r.role }}
      createLabel="Invite user"
      columns={[
        { key: "n", label: "Name", render: (r) => <Title main={r.name} sub={r.email} /> },
        { key: "r", label: "Role", render: (r) => roleLabel[r.role] },
        { key: "a", label: "Last active", render: (r) => formatDate(r.lastActiveAt, { day: "numeric", month: "short" }), hideOnMobile: true },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "role", label: "Role", type: "select", options: opts(roleLabel), required: true, hint: "Super Admin: everything · Editor: content · Community Manager: notices, reports & businesses" },
      ]}
      toForm={(r) => ({ name: r.name, email: r.email, role: r.role })}
      fromForm={(v, e) => ({ ...(e ?? { id: newId("u"), lastActiveAt: new Date().toISOString() }), name: String(v.name), email: String(v.email), role: (v.role || "editor") as AdminUser["role"] })}
    />
  );
}
