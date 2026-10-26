-- Admin allow-list: only users listed here can write content.
create table public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admins enable row level security;
create or replace function public.is_admin() returns boolean
  language sql stable security definer set search_path = public
  as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;
create policy "admins read own row" on public.admins for select using (user_id = auth.uid());

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  summary text, description text, category text, tools text[] default '{}',
  thumbnail_url text, cover_url text, gallery_urls text[] default '{}',
  business_problem text, dataset_info text, methodology text, data_cleaning text,
  techniques text, key_findings text, implications text, limitations text, deliverables text,
  github_url text, live_url text, related_files jsonb default '[]',
  status text not null default 'draft' check (status in ('draft','published','archived')),
  featured boolean not null default false,
  sort_order int not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.profile (id int primary key default 1 check (id = 1), headline text, intro text, about text, avatar_url text, resume_url text, email text);
create table public.skills (id uuid primary key default gen_random_uuid(), group_name text not null, name text not null, sort_order int default 0);
create table public.education (id uuid primary key default gen_random_uuid(), title text not null, institution text, period text, kind text default 'education', sort_order int default 0);
create table public.social_links (id uuid primary key default gen_random_uuid(), label text not null, url text not null, sort_order int default 0);

alter table public.projects enable row level security;
alter table public.profile enable row level security;
alter table public.skills enable row level security;
alter table public.education enable row level security;
alter table public.social_links enable row level security;

create policy "public reads published projects" on public.projects for select using (status = 'published');
create policy "admin reads all projects" on public.projects for select using (public.is_admin());
create policy "admin writes projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
do $$ declare t text; begin
  foreach t in array array['profile','skills','education','social_links'] loop
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format('create policy "admin write" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop; end $$;

-- Storage: one public bucket (images, resume, published deliverables). Limits enforced by the bucket itself.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('public-assets','public-assets',true,10485760,
   array['image/jpeg','image/png','image/webp','application/pdf','text/csv',
         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         'application/vnd.openxmlformats-officedocument.presentationml.presentation'])
on conflict (id) do nothing;
create policy "admin uploads" on storage.objects for insert with check (bucket_id = 'public-assets' and public.is_admin());
create policy "admin updates" on storage.objects for update using (bucket_id = 'public-assets' and public.is_admin());
create policy "admin deletes" on storage.objects for delete using (bucket_id = 'public-assets' and public.is_admin());
