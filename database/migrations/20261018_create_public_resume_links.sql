create extension if not exists pgcrypto;

create table if not exists public_resume_links (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references resumes(id) on delete cascade,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists public_resume_links_resume_id_idx
  on public_resume_links (resume_id);
