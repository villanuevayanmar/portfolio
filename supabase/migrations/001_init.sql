-- ============================================================================
-- Portfolio database schema
-- Run this entire file in the Supabase Dashboard -> SQL Editor -> New query.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. page_views : anonymous visitor tracking
--    Anyone (anon) may INSERT a visit. Only the service_role (admin dashboard)
--    may SELECT. This keeps analytics private while allowing public tracking.
-- ---------------------------------------------------------------------------
create table if not exists public.page_views (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  path       text        not null,
  user_agent text,
  country    text,
  region     text,
  city       text,
  referrer   text
);

alter table public.page_views enable row level security;

drop policy if exists "anon can insert page_views" on public.page_views;
create policy "anon can insert page_views"
  on public.page_views
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "service role can read page_views" on public.page_views;
create policy "service role can read page_views"
  on public.page_views
  for select
  to service_role
  using (true);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx       on public.page_views (path);

-- ---------------------------------------------------------------------------
-- 2. contact_messages : stores messages from the contact form
--    Anyone may INSERT. Only service_role (admin dashboard) may SELECT/UPDATE.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text        not null,
  email      text        not null,
  subject    text,
  message    text        not null,
  is_read    boolean     not null default false
);

alter table public.contact_messages enable row level security;

drop policy if exists "anon can insert contact_messages" on public.contact_messages;
create policy "anon can insert contact_messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "service role can read contact_messages" on public.contact_messages;
create policy "service role can read contact_messages"
  on public.contact_messages
  for select
  to service_role
  using (true);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
