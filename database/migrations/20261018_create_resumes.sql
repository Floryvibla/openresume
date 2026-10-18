create extension if not exists pgcrypto;

create table if not exists resumes (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null,
  title text not null,
  resume_slug text not null unique,
  document_json jsonb not null,
  theme_key text not null default 'basic',
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resumes_owner_id_idx on resumes (owner_id);
create index if not exists resumes_updated_at_idx on resumes (updated_at desc);
