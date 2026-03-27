create table if not exists public.agent (
  id uuid not null,
  email text null,
  full_name text null,
  subscription_status text null default 'pending'::text,
  created_at timestamp with time zone null default now(),
  phone_number text null,
  constraint agent_pkey primary key (id),
  constraint agent_id_fkey foreign key (id) references auth.users (id) on delete cascade
);

alter table public.agent enable row level security;

create policy "agent read own profile"
on public.agent
for select
using (auth.uid() = id);

create policy "agent insert own profile"
on public.agent
for insert
with check (auth.uid() = id);

create policy "agent update own profile"
on public.agent
for update
using (auth.uid() = id);
