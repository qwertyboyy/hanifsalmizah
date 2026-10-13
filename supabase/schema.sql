-- Jalankan file ini di Supabase SQL Editor sebelum seed.sql.
begin;
create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.portfolio_admins enable row level security;
revoke all on public.portfolio_admins from anon, authenticated;
grant select on public.portfolio_admins to authenticated;
drop policy if exists "Admin reads own membership" on public.portfolio_admins;
create policy "Admin reads own membership" on public.portfolio_admins
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_portfolio_admin()
returns boolean language sql stable security invoker set search_path = ''
as $$ select exists (select 1 from public.portfolio_admins where user_id = (select auth.uid())); $$;
revoke all on function public.is_portfolio_admin() from public, anon;
grant execute on function public.is_portfolio_admin() to authenticated;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 1 and 160),
  category text not null check (length(trim(category)) between 1 and 80),
  description text not null check (length(trim(description)) between 1 and 3000),
  contribution text not null check (length(trim(contribution)) between 1 and 3000),
  image text not null check (length(image) between 1 and 2048 and (image ~* '^https?://' or image ~ '^[A-Za-z0-9_.-]+$')),
  link text check (link is null or (length(link) <= 2048 and link ~* '^https?://')),
  stack text[] not null check (cardinality(stack) between 1 and 30),
  published boolean not null default false,
  sort_order integer not null default 0 check (sort_order between 0 and 100000),
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
revoke all on public.projects from anon, authenticated;
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
drop policy if exists "Visitors read published projects" on public.projects;
create policy "Visitors read published projects" on public.projects
  for select to anon, authenticated using (published = true);
drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects" on public.projects
  for all to authenticated using ((select public.is_portfolio_admin()))
  with check ((select public.is_portfolio_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-images', 'project-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "Admins upload project images" on storage.objects;
create policy "Admins upload project images" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'project-images' and (select public.is_portfolio_admin())
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
drop policy if exists "Admins read project image metadata" on storage.objects;
create policy "Admins read project image metadata" on storage.objects
  for select to authenticated using (bucket_id = 'project-images' and (select public.is_portfolio_admin()));
drop policy if exists "Admins delete own project images" on storage.objects;
create policy "Admins delete own project images" on storage.objects
  for delete to authenticated using (
    bucket_id = 'project-images' and (select public.is_portfolio_admin())
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
commit;
