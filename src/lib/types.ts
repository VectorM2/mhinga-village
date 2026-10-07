/**
 * Domain model for the Mhinga platform.
 * Every entity mirrors a table in supabase/schema.sql so the mock data in
 * src/data can be swapped for database rows without touching the UI.
 */

export type ID = string;
export type ISODate = string; // "2026-10-07" or full ISO timestamp

/** Trust & verification — every piece of public information carries this. */
export type VerificationStatus = "verified" | "unverified" | "needs_update";

export interface Verification {
  status: VerificationStatus;
  /** Who verified it (admin display name) — only set when status === "verified" */
  verifiedBy?: string;
  verifiedAt?: ISODate;
  /** Where the information came from, e.g. "Department of Basic Education listing" */
  source?: string;
  sourceUrl?: string;
}

export type PublishStatus = "draft" | "published" | "archived";

export interface ImageAsset {
  src: string;
  alt: string;
  /** Photographer / owner credit once real photography is supplied */
  credit?: string;
}

export interface ContactInfo {
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
}

export interface Place {
  /** Human-readable location, e.g. "Mhinga, near the main road" */
  label: string;
  latitude?: number;
  longitude?: number;
}

/* ---------- Services ---------- */

export type ServiceCategory =
  | "health"
  | "emergency"
  | "support"
  | "government"
  | "municipal"
  | "safety";

export interface Service {
  id: ID;
  slug: string;
  name: string;
  category: ServiceCategory;
  subcategory: string;
  summary: string;
  description: string;
  location?: Place;
  contact: ContactInfo;
  hours?: string;
  /** National services (SASSA, GBV line…) vs local facilities */
  scope: "local" | "regional" | "national";
  tags: string[];
  verification: Verification;
}

/* ---------- Education ---------- */

export type SchoolType = "primary" | "secondary" | "special" | "tertiary" | "early-childhood";

export interface School {
  id: ID;
  slug: string;
  name: string;
  type: SchoolType;
  summary: string;
  description?: string;
  location?: Place;
  contact: ContactInfo;
  grades?: string;
  languages?: string[];
  image?: ImageAsset;
  verification: Verification;
}

export interface EducationResource {
  id: ID;
  title: string;
  description: string;
  url: string;
  audience: string;
  provider: string;
}

/* ---------- Opportunities ---------- */

export type OpportunityCategory =
  | "bursary"
  | "scholarship"
  | "job"
  | "learnership"
  | "internship"
  | "youth-programme"
  | "government"
  | "entrepreneurship"
  | "training"
  | "agriculture";

export interface Opportunity {
  id: ID;
  slug: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  summary: string;
  description: string;
  eligibility: string[];
  howToApply: string[];
  /** ISO date. Undefined = rolling / check official site. */
  deadline?: ISODate;
  deadlineNote?: string;
  applyUrl?: string;
  location?: string;
  tags: string[];
  featured?: boolean;
  publishedAt: ISODate;
  isSample?: boolean;
  verification: Verification;
}

/* ---------- News ---------- */

export type NewsCategory =
  | "community"
  | "education"
  | "health"
  | "youth"
  | "infrastructure"
  | "opportunities"
  | "agriculture"
  | "culture"
  | "events";

export interface Author {
  name: string;
  role?: string;
}

export interface NewsArticle {
  id: ID;
  slug: string;
  title: string;
  excerpt: string;
  /** Simple block content so it can later come from a rich-text CMS */
  body: ContentBlock[];
  category: NewsCategory;
  image: ImageAsset;
  author: Author;
  publishedAt: ISODate;
  status: PublishStatus;
  featured?: boolean;
  /** Sample content is labelled on the page until replaced */
  isSample?: boolean;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone: "info" | "warning"; text: string };

/* ---------- Notices ---------- */

export type NoticeLevel = "emergency" | "important" | "information" | "event";

export interface Notice {
  id: ID;
  slug: string;
  title: string;
  summary: string;
  body?: string;
  level: NoticeLevel;
  category: string;
  areas?: string[];
  publishedAt: ISODate;
  expiresAt?: ISODate;
  link?: string;
  isSample?: boolean;
}

/* ---------- Events ---------- */

export type EventCategory =
  | "community-meeting"
  | "sports"
  | "school"
  | "cultural"
  | "youth"
  | "workshop"
  | "faith"
  | "clean-up";

export interface CommunityEvent {
  id: ID;
  slug: string;
  title: string;
  category: EventCategory;
  summary: string;
  description: string;
  startsAt: ISODate;
  endsAt?: ISODate;
  venue: string;
  organizer: string;
  contact?: ContactInfo;
  image: ImageAsset;
  isFree?: boolean;
  isSample?: boolean;
}

/* ---------- How-to guides ---------- */

export interface HowToGuide {
  id: ID;
  slug: string;
  title: string;
  question: string;
  category: "land" | "education" | "municipal" | "social" | "health" | "safety" | "employment" | "identity";
  icon: string;
  overview: string;
  whoCanApply: string[];
  requirements: string[];
  documents: string[];
  steps: { title: string; detail: string }[];
  whereToApply: string[];
  contacts: { label: string; value: string; href?: string }[];
  officialLinks: { label: string; url: string }[];
  faqs: { q: string; a: string }[];
  updatedAt: ISODate;
  verification: Verification;
}

/* ---------- Businesses ---------- */

export type BusinessCategory =
  | "food"
  | "beauty"
  | "mechanics"
  | "construction"
  | "plumbing"
  | "electrical"
  | "technology"
  | "agriculture"
  | "accommodation"
  | "retail"
  | "professional"
  | "transport";

export type ListingStatus = "pending" | "approved" | "rejected" | "suspended";

export interface Business {
  id: ID;
  slug: string;
  name: string;
  category: BusinessCategory;
  summary: string;
  description: string;
  location?: Place;
  contact: ContactInfo;
  hours?: string;
  services?: string[];
  owner?: string;
  logoInitials: string;
  image?: ImageAsset;
  status: ListingStatus;
  isSample?: boolean;
  verification: Verification;
}

/* ---------- Explore (directory / map) ---------- */

export type PlaceCategory =
  | "schools"
  | "clinics"
  | "police"
  | "government"
  | "halls"
  | "churches"
  | "shops"
  | "restaurants"
  | "businesses"
  | "sports"
  | "atms"
  | "taxi"
  | "landmarks";

export interface DirectoryPlace {
  id: ID;
  name: string;
  category: PlaceCategory;
  description: string;
  location: Place;
  href?: string;
  verification: Verification;
}

/* ---------- Stories & gallery ---------- */

export interface Story {
  id: ID;
  slug: string;
  name: string;
  role: string;
  headline: string;
  excerpt: string;
  body: ContentBlock[];
  image: ImageAsset;
  tags: string[];
  publishedAt: ISODate;
  isSample?: boolean;
}

export type GalleryCategory = "community" | "events" | "schools" | "sports" | "culture" | "nature" | "history";

export interface GalleryItem {
  id: ID;
  title: string;
  category: GalleryCategory;
  image: ImageAsset;
  /** Used to vary the masonry rhythm */
  aspect: "portrait" | "landscape" | "square";
  takenAt?: ISODate;
  contributor?: string;
}

/* ---------- Reports ---------- */

export type ReportCategory =
  | "water"
  | "electricity"
  | "roads"
  | "waste"
  | "sewage"
  | "streetlights"
  | "infrastructure"
  | "other";

export type ReportStatus = "submitted" | "assigned" | "in_progress" | "resolved";

export interface ServiceReport {
  id: ID;
  reference: string;
  category: ReportCategory;
  description: string;
  location: string;
  reporterName?: string;
  reporterContact?: string;
  photoUrl?: string;
  status: ReportStatus;
  assignedTo?: string;
  internalNotes: { author: string; at: ISODate; text: string }[];
  createdAt: ISODate;
}

/* ---------- Admin ---------- */

export type AdminRole = "super_admin" | "editor" | "community_manager";

export interface AdminUser {
  id: ID;
  name: string;
  email: string;
  role: AdminRole;
  lastActiveAt: ISODate;
}

/* ---------- Search ---------- */

export type SearchKind =
  | "service"
  | "school"
  | "business"
  | "article"
  | "opportunity"
  | "event"
  | "guide"
  | "place";

export interface SearchResult {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  meta?: string;
}
