-- =====================================================================
-- Mhinga community platform — Supabase / PostgreSQL schema
-- Mirrors src/lib/types.ts. Run in the Supabase SQL editor.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------- Enums ----------
create type admin_role as enum ('super_admin', 'editor', 'community_manager');
create type verification_status as enum ('verified', 'unverified', 'needs_update');
create type publish_status as enum ('draft', 'published', 'archived');
create type listing_status as enum ('pending', 'approved', 'rejected', 'suspended');
create type notice_level as enum ('emergency', 'important', 'information', 'event');
create type report_status as enum ('submitted', 'assigned', 'in_progress', 'resolved');

-- ---------- Admin profiles (linked to auth.users) ----------
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  role admin_role not null default 'editor',
  created_at timestamptz not null default now()
);

create or replace function is_admin(roles admin_role[] default array['super_admin','editor','community_manager']::admin_role[])
returns boolean language sql stable security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and role = any(roles));
$$;

-- ---------- Shared verification columns (added to each content table) ----------
-- verification_status, verified_by, verified_at, source, source_url

-- ---------- Services ----------
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,          -- health | emergency | support | government | municipal | safety
  subcategory text not null,
  summary text not null,
  description text not null default '',
  location_label text, latitude double precision, longitude double precision,
  phone text, whatsapp text, email text, website text,
  hours text,
  scope text not null default 'local',
  tags text[] not null default '{}',
  verification_status verification_status not null default 'unverified',
  verified_by uuid references profiles, verified_at timestamptz, source text, source_url text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

-- ---------- Schools ----------
create table schools (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  type text not null,              -- early-childhood | primary | secondary | special | tertiary
  summary text not null,
  description text,
  location_label text, latitude double precision, longitude double precision,
  phone text, email text, website text,
  grades text, languages text[],
  image_url text,
  verification_status verification_status not null default 'unverified',
  verified_by uuid references profiles, verified_at timestamptz, source text, source_url text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

-- ---------- Opportunities ----------
create table opportunities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  organization text not null,
  category text not null,
  summary text not null,
  description text not null default '',
  eligibility text[] not null default '{}',
  how_to_apply text[] not null default '{}',
  deadline date, deadline_note text,
  apply_url text, location text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  status publish_status not null default 'published',
  verification_status verification_status not null default 'unverified',
  verified_by uuid references profiles, verified_at timestamptz, source text, source_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

-- ---------- News ----------
create table news (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  body jsonb not null default '[]',   -- ContentBlock[]
  category text not null,
  image_url text, image_alt text,
  author_name text not null,
  author_id uuid references profiles,
  status publish_status not null default 'draft',
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

-- ---------- Notices ----------
create table notices (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body text,
  level notice_level not null default 'information',
  category text not null,
  areas text[],
  link text,
  published_at timestamptz not null default now(),
  expires_at timestamptz,
  created_by uuid references profiles
);

-- ---------- Events ----------
create table events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  summary text not null,
  description text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz,
  venue text not null,
  organizer text not null,
  phone text, email text,
  image_url text,
  is_free boolean not null default true,
  status publish_status not null default 'published',
  created_at timestamptz not null default now()
);

-- ---------- How-to guides ----------
create table how_to_guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  question text not null,
  category text not null,
  icon text not null default 'landmark',
  content jsonb not null,  -- overview, whoCanApply, requirements, documents, steps, whereToApply, contacts, officialLinks, faqs
  verification_status verification_status not null default 'unverified',
  verified_by uuid references profiles, verified_at timestamptz, source text, source_url text,
  updated_at timestamptz not null default now()
);

-- ---------- Businesses ----------
create table businesses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  owner_id uuid references auth.users,         -- business accounts (future)
  name text not null,
  category text not null,
  summary text not null,
  description text not null default '',
  services text[] not null default '{}',
  location_label text, latitude double precision, longitude double precision,
  phone text, whatsapp text, email text, website text,
  hours text,
  logo_url text, image_url text,
  status listing_status not null default 'pending',
  verification_status verification_status not null default 'unverified',
  verified_by uuid references profiles, verified_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

-- ---------- Directory places ----------
create table places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null default '',
  location_label text not null, latitude double precision, longitude double precision,
  href text,
  verification_status verification_status not null default 'unverified'
);

-- ---------- Stories & gallery ----------
create table stories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null, role text not null,
  headline text not null, excerpt text not null,
  body jsonb not null default '[]',
  image_url text, tags text[] not null default '{}',
  consent_recorded boolean not null default false,
  status publish_status not null default 'draft',
  published_at timestamptz
);

create table gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_path text not null,          -- Supabase Storage path in bucket "gallery"
  aspect text not null default 'landscape',
  contributor text,
  status listing_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- ---------- Service reports ----------
create table service_reports (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  category text not null,
  description text not null,
  location text not null,
  reporter_name text, reporter_contact text,
  photo_path text,                   -- bucket "report-photos"
  status report_status not null default 'submitted',
  assigned_to text,
  created_at timestamptz not null default now()
);

create table report_notes (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references service_reports on delete cascade,
  author_id uuid references profiles,
  body text not null,
  created_at timestamptz not null default now()
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, contact text not null, topic text, message text not null,
  created_at timestamptz not null default now()
);

create table site_settings (
  key text primary key,
  value jsonb not null
);

-- =====================================================================
-- Row Level Security
-- Public: read published / approved / active content.
-- Public: insert reports, business applications, contact messages, photos.
-- Admins: full access according to role.
-- =====================================================================
alter table services enable row level security;
alter table schools enable row level security;
alter table opportunities enable row level security;
alter table news enable row level security;
alter table notices enable row level security;
alter table events enable row level security;
alter table how_to_guides enable row level security;
alter table businesses enable row level security;
alter table places enable row level security;
alter table stories enable row level security;
alter table gallery_items enable row level security;
alter table service_reports enable row level security;
alter table report_notes enable row level security;
alter table contact_messages enable row level security;
alter table profiles enable row level security;

create policy "public read" on services for select using (true);
create policy "public read" on schools for select using (true);
create policy "public read" on how_to_guides for select using (true);
create policy "public read" on places for select using (true);
create policy "public read published" on opportunities for select using (status = 'published');
create policy "public read published" on news for select using (status = 'published');
create policy "public read published" on events for select using (status = 'published');
create policy "public read published" on stories for select using (status = 'published');
create policy "public read active" on notices for select using (expires_at is null or expires_at > now());
create policy "public read approved" on businesses for select using (status = 'approved');
create policy "public read approved" on gallery_items for select using (status = 'approved');

create policy "public submit" on service_reports for insert with check (status = 'submitted');
create policy "public submit" on businesses for insert with check (status = 'pending');
create policy "public submit" on gallery_items for insert with check (status = 'pending');
create policy "public submit" on contact_messages for insert with check (true);

-- Editors manage content; community managers handle notices, reports and businesses.
create policy "editors manage" on news for all using (is_admin(array['super_admin','editor']::admin_role[]));
create policy "editors manage" on opportunities for all using (is_admin(array['super_admin','editor']::admin_role[]));
create policy "editors manage" on events for all using (is_admin());
create policy "editors manage" on stories for all using (is_admin(array['super_admin','editor']::admin_role[]));
create policy "editors manage" on how_to_guides for all using (is_admin(array['super_admin','editor']::admin_role[]));
create policy "editors manage" on services for all using (is_admin());
create policy "editors manage" on schools for all using (is_admin());
create policy "editors manage" on places for all using (is_admin());
create policy "managers manage" on notices for all using (is_admin());
create policy "managers manage" on businesses for all using (is_admin(array['super_admin','community_manager']::admin_role[]));
create policy "managers manage" on gallery_items for all using (is_admin());
create policy "managers manage" on service_reports for all using (is_admin(array['super_admin','community_manager']::admin_role[]));
create policy "managers manage" on report_notes for all using (is_admin(array['super_admin','community_manager']::admin_role[]));
create policy "admins read" on contact_messages for select using (is_admin());
create policy "self read" on profiles for select using (id = auth.uid() or is_admin(array['super_admin']::admin_role[]));
create policy "super admin manage" on profiles for all using (is_admin(array['super_admin']::admin_role[]));

-- Storage buckets (create in dashboard or via API): "gallery" (public), "report-photos" (private), "business-logos" (public)

-- Full-text search across content (used by /search when connected)
create or replace function search_content(q text)
returns table (kind text, id uuid, title text, description text, slug text)
language sql stable as $$
  select 'service', id, name, summary, slug from services where to_tsvector('english', name || ' ' || summary) @@ plainto_tsquery('english', q)
  union all select 'school', id, name, summary, slug from schools where to_tsvector('english', name || ' ' || summary) @@ plainto_tsquery('english', q)
  union all select 'opportunity', id, title, summary, slug from opportunities where status = 'published' and to_tsvector('english', title || ' ' || summary || ' ' || organization) @@ plainto_tsquery('english', q)
  union all select 'article', id, title, excerpt, slug from news where status = 'published' and to_tsvector('english', title || ' ' || excerpt) @@ plainto_tsquery('english', q)
  union all select 'event', id, title, summary, slug from events where status = 'published' and to_tsvector('english', title || ' ' || summary) @@ plainto_tsquery('english', q)
  union all select 'business', id, name, summary, slug from businesses where status = 'approved' and to_tsvector('english', name || ' ' || summary) @@ plainto_tsquery('english', q)
  union all select 'guide', id, title, question, slug from how_to_guides where to_tsvector('english', title || ' ' || question) @@ plainto_tsquery('english', q);
$$;
