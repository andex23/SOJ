-- SOJ Products Table Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

create extension if not exists "uuid-ossp";

create table products (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  price       integer not null,
  status      text not null default 'available'
              check (status in ('available', 'preorder', 'sold', 'archived')),
  date        date not null,
  description text,
  image_url   text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Auto-update updated_at on row changes
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- Row Level Security
alter table products enable row level security;

-- Public/anon can read all products
create policy "Public read" on products
  for select using (true);

-- Authenticated users (admin) can do everything
create policy "Admin full access" on products
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
