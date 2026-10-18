# Open Resume Architecture

## Purpose

This document defines the technical architecture for Open Resume and acts as the source of truth for code organization decisions. The execution sequence lives in `docs/plan.md`. The visual system lives in `docs/design.md`.

## Principles

- Follow Next.js 16 App Router conventions.
- `page.tsx`, `layout.tsx`, `loading.tsx`, and route handlers stay server-first.
- Never put `use client` in `page.tsx`.
- Add `use client` only to components that need events, browser APIs, local state, or client hooks.
- Organize by feature, not by generic layer dumping.
- Keep files short, focused, and below 200 lines.
- Prefer composition and reuse over duplication.
- Keep UI separate from domain logic and external integrations.
- Use typed JSON for the resume document to reduce schema friction in the MVP.

## System Overview

Open Resume has four main flows:

1. Import LinkedIn data on the server.
2. Normalize imported data into a typed resume document.
3. Render the resume for preview, editing, sharing, and PDF output.
4. Persist saved resumes and public links in PostgreSQL.

## Runtime Boundaries

### Server-only responsibilities

- LinkedIn Voyager client initialization
- Input validation
- Profile import orchestration
- Resume normalization
- PostgreSQL access
- Slug generation
- PDF generation
- Public resume read rules

### Client-only responsibilities

- Import form interactions
- Editor form state
- Theme picker interactions
- Optimistic updates with SWR
- Loading states, disabled buttons, and feedback

## Directory Strategy

```text
src/
  app/
    api/
    dashboard/
    resume/
  features/
    auth/
    linkedin/
      server/
    marketing/
      ui/
    resume/
      hooks/
      server/
      types/
      ui/
  lib/
```

## App Router Rules

- Pages assemble data and compose features.
- Interactive UI lives in leaf components under `features/*/ui`.
- Route handlers own HTTP concerns and call feature-level server functions.
- Shared helpers stay in `src/lib`.
- A feature should expose small, obvious entry points instead of deep cross-feature imports.

## Data Model

### Table: `resumes`

- `id`
- `owner_id`
- `title`
- `resume_slug`
- `document_json`
- `theme_key`
- `is_public`
- `created_at`
- `updated_at`

### Table: `public_resume_links`

- `id`
- `resume_id`
- `slug`
- `is_active`
- `created_at`
- `updated_at`

## JSON Document Shape

The `document_json` field should store a typed structure close to the UI model:

- `basics`
- `summary`
- `experiences`
- `skills`
- `education`
- `certifications`
- `theme`

This keeps the MVP flexible while the product shape is still evolving.

## Feature Responsibilities

### `features/linkedin`

- Read LinkedIn profile input
- Call Voyager
- Normalize errors
- Return a raw import payload

### `features/resume`

- Define the resume schema
- Map raw LinkedIn data into the internal document
- Persist and read resumes
- Render preview sections
- Manage theme selection
- Handle share links and PDF export

### `features/marketing`

- Landing hero
- Product messaging
- Import entry point
- Public trust and feature framing

## Data Access Rules

- Use PostgreSQL through a single `src/lib/db.ts`.
- Keep SQL close to the feature repository functions that own the use case.
- Avoid spreading query strings across UI files.
- Store the main resume body as JSON, but keep searchable fields like `owner_id`, `slug`, and timestamps as normal columns.

## UX and Loading Rules

- Every user-triggered async action must show a visible loading state.
- Primary buttons should display spinner feedback while pending.
- Import, save, publish, and export actions must disable duplicate submission.
- Empty states should be explicit and calm, never noisy.

## Design Boundaries

- Follow `docs/design.md`.
- No heavy card shadows.
- Minimal borders, soft contrast, and clear spacing.
- Motion should be subtle and purposeful.
- ATS resume output must stay visually simple even if the dashboard has richer UI polish.

## Risks

- Voyager depends on valid LinkedIn session cookies.
- LinkedIn may throttle or invalidate a session.
- JSON persistence is flexible but requires strong TypeScript typing to stay maintainable.
- Public share links need careful control so unpublished resumes are never exposed.

## Implementation Notes

- Start with anonymous import and download first.
- Add persistence and sharing after the rendering pipeline is stable.
- Keep authentication decoupled from the resume domain so it can change later without rewriting resume logic.
