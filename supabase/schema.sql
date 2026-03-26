create table if not exists public.estate (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  price numeric,
  area numeric,
  bed integer,
  bath numeric,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.estate enable row level security;

create policy "public read estates"
on public.estate
for select
using (true);

create policy "public insert estates"
on public.estate
for insert
with check (true);

create policy "authenticated delete estates"
on public.estate
for delete
using (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('estate-images', 'estate-images', true)
on conflict (id) do nothing;

create policy "public read estate images"
on storage.objects
for select
using (bucket_id = 'estate-images');

create policy "public upload estate images"
on storage.objects
for insert
with check (bucket_id = 'estate-images');
