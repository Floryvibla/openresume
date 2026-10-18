# Open Resume Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an open-source platform that imports LinkedIn profile data, generates an ATS-friendly resume, allows anonymous download, and gives logged-in users editing and share-link features.

**Architecture:** Use Next.js App Router for UI and API routes, PostgreSQL for persistence, and `@florydev/linkedin-api-voyager` only on the server side for LinkedIn import. Store the resume document as typed JSON, keep a feature-first structure, and keep files below 200 lines with `use client` only where interactivity is required.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, PostgreSQL, SWR, axios, usehooks-ts, linkedin-api-voyager.

---

## Product Scope

### Reference documents

- Architecture: `docs/architecture.md`
- Design system: `docs/design.md`

### MVP user flows

1. Visitor opens landing page and sees value proposition.
2. Visitor pastes LinkedIn profile URL or public identifier.
3. Backend imports `profile`, `about`, `experience`, `skills`, `education`, and `certifications`.
4. System normalizes imported data into an internal resume document.
5. Visitor reviews generated ATS resume and downloads PDF without login.
6. Logged-in user can save, edit, change theme color, and publish a shareable link.

### MVP assumptions

- Use **import by LinkedIn URL/public identifier** as the main entry flow.
- `linkedin-api-voyager` runs only in route handlers or server utilities.
- LinkedIn cookies stay on the server and are provided through environment variables.
- ATS optimization in MVP comes from clean structure and formatting, not AI rewriting.

### Non-goals for v1

- Official LinkedIn OAuth.
- AI-generated bullet rewriting.
- Multiple advanced templates.
- Analytics dashboard.
- Complex drag-and-drop builder.

## File Structure Map

### App routes

- `src/app/page.tsx` - landing page.
- `src/app/resume/page.tsx` - anonymous generated resume preview.
- `src/app/dashboard/page.tsx` - logged-in resume management.
- `src/app/resume/[resume-slug]/page.tsx` - public shared resume page.
- `src/app/api/linkedin/import/route.ts` - import endpoint.
- `src/app/api/resumes/route.ts` - create and list resumes.
- `src/app/api/resumes/[resume-id]/route.ts` - update resume.
- `src/app/api/resumes/[resume-id]/share/route.ts` - publish or unpublish share link.
- `src/app/api/resumes/[resume-id]/pdf/route.ts` - PDF export.

### Domain and integrations

- `src/features/linkedin/server/linkedin-client.ts` - Voyager initialization.
- `src/features/linkedin/server/import-profile.ts` - LinkedIn fetch orchestration.
- `src/features/linkedin/server/map-linkedin-to-resume.ts` - normalize LinkedIn data.
- `src/features/resume/types/resume-document.ts` - typed internal resume schema.
- `src/features/resume/server/resume-repository.ts` - database access.
- `src/features/resume/server/share-resume.ts` - share link logic.
- `src/features/resume/server/export-resume-pdf.ts` - PDF generation logic.
- `src/features/resume/ui/resume-preview.tsx` - ATS preview shell.
- `src/features/resume/ui/resume-editor-form.tsx` - editing UI.
- `src/features/resume/ui/theme-color-picker.tsx` - theme selection.
- `src/features/resume/hooks/use-resume.ts` - SWR client hooks.
- `src/lib/axios.ts` - axios instance.
- `src/lib/db.ts` - PostgreSQL pool and query helpers.
- `src/lib/env.ts` - environment validation.
- `src/lib/utils.ts` - shared utils.

### Database

- `database/migrations/20261018_create_resumes.sql`
- `database/migrations/20261018_create_public_resume_links.sql`

### Docs

- `README.md` - setup and import instructions.
- `docs/plan.md` - execution plan.
- `docs/architecture.md` - technical decisions and boundaries.
- `docs/design.md` - design system extracted from the visual reference.

## Design Direction

- Follow `docs/design.md` as the source of truth for color, spacing, motion, and component tone.
- Use the provided logo as the primary brand mark on landing, auth, and editor header.
- Keep the visual style clean, minimal, soft, and ATS-oriented.
- Define semantic tokens in `src/app/globals.css` and avoid raw color classes in components.
- Prefer shadcn primitives: `button`, `card`, `input`, `form`, `dialog`, `dropdown-menu`, `sheet`, `tabs`, `badge`, `separator`, `sidebar`.
- Avoid heavy shadows and decorative noise.

## Delivery Plan

### Task 1: Foundation and project setup

**Files:**

- Modify: `package.json`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `components.json`
- Create: `src/lib/utils.ts`
- Create: `src/lib/env.ts`

- [ ] Install required dependencies with `pnpm`.
      Run: `pnpm add pg @florydev/linkedin-api-voyager axios swr usehooks-ts zod`
- [ ] Install UI and quality dependencies.
      Run: `pnpm dlx shadcn@latest init` then `pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- [ ] Configure global tokens in `src/app/globals.css` using `docs/design.md` for background, foreground, muted, primary, border, card, and accent.
- [ ] Update metadata in `src/app/layout.tsx` for Open Resume branding.
- [ ] Add environment parsing in `src/lib/env.ts` for PostgreSQL and LinkedIn cookies.
- [ ] Validate setup.
      Run: `pnpm lint`

### Task 2: Landing page and product entry flow

**Files:**

- Modify: `src/app/page.tsx`
- Create: `src/features/marketing/ui/hero-section.tsx`
- Create: `src/features/marketing/ui/import-form.tsx`
- Create: `src/features/marketing/ui/feature-grid.tsx`
- Create: `src/features/marketing/ui/logo-mark.tsx`

- [ ] Build landing sections for hero, feature summary, trust copy, and CTA.
- [ ] Add a form that accepts LinkedIn URL or `publicIdentifier`.
- [ ] Use shadcn `input`, `button`, `card`, and `separator` components only.
- [ ] Keep the import form separate from page layout logic.
- [ ] Add a clear CTA split:
  - anonymous: generate and download
  - logged-in: save and edit
- [ ] Validate layout.
      Run: `pnpm lint`

### Task 3: PostgreSQL persistence model

**Files:**

- Create: `src/lib/db.ts`
- Create: `database/migrations/20261018_create_resumes.sql`
- Create: `database/migrations/20261018_create_public_resume_links.sql`

- [ ] Create tables:
  - `resumes`
  - `public_resume_links`
- [ ] Store resume content as typed JSON for MVP simplicity.
- [ ] Add ownership fields, timestamps, and publish status.
- [ ] Index by `owner_id`, `resume_slug`, and `updated_at`.
- [ ] Keep public reads restricted to published shared links through application queries.
- [ ] Validate schema and app compile.
      Run: `pnpm lint && pnpm build`

### Task 4: LinkedIn import backend

**Files:**

- Create: `src/app/api/linkedin/import/route.ts`
- Create: `src/features/linkedin/server/linkedin-client.ts`
- Create: `src/features/linkedin/server/import-profile.ts`
- Create: `src/features/linkedin/server/linkedin-errors.ts`

- [ ] Initialize Voyager once on the server using `LINKEDIN_JSESSIONID` and `LINKEDIN_LI_AT`.
- [ ] Fetch:
  - mini profile
  - about
  - experiences
  - skills
  - education
  - certifications
- [ ] Accept URL or `publicIdentifier` and normalize input before fetching.
- [ ] Return typed errors for invalid profile, expired session, and LinkedIn rate limits.
- [ ] Never expose LinkedIn cookies to client code.
- [ ] Add endpoint validation with `zod`.
- [ ] Validate endpoint behavior.
      Run: `pnpm lint && pnpm build`

### Task 5: Resume document schema and ATS renderer

**Files:**

- Create: `src/features/resume/types/resume-document.ts`
- Create: `src/features/linkedin/server/map-linkedin-to-resume.ts`
- Create: `src/features/resume/ui/resume-preview.tsx`
- Create: `src/features/resume/ui/resume-header.tsx`
- Create: `src/features/resume/ui/resume-section.tsx`
- Create: `src/app/resume/page.tsx`

- [ ] Define a single typed resume document shape with:
  - basics
  - summary
  - experiences
  - skills
  - education
  - certifications
  - theme
- [ ] Map LinkedIn payloads to this internal schema.
- [ ] Render a clean ATS-first preview with simple typography and no decorative noise.
- [ ] Keep each section component focused and under 200 lines.
- [ ] Ensure anonymous users can preview the generated resume before download.
- [ ] Validate rendering.
      Run: `pnpm lint && pnpm build`

### Task 6: Resume editor for logged-in users

**Files:**

- Create: `src/app/dashboard/page.tsx`
- Create: `src/app/api/resumes/route.ts`
- Create: `src/app/api/resumes/[resume-id]/route.ts`
- Create: `src/features/resume/server/resume-repository.ts`
- Create: `src/features/resume/ui/resume-editor-form.tsx`
- Create: `src/features/resume/ui/theme-color-picker.tsx`
- Create: `src/features/resume/hooks/use-resume.ts`
- Create: `src/lib/axios.ts`

- [ ] Create authenticated CRUD endpoints for resumes.
- [ ] Use `axios` in the client wrapper and `SWR` for data synchronization.
- [ ] Let users edit summary, experiences, skills, education, and theme color.
- [ ] Limit theme editing to semantic token values defined in `docs/design.md`, not arbitrary inline colors.
- [ ] Keep editor state separate from preview state.
- [ ] Show preview and editor side by side on desktop and stacked on mobile.
- [ ] Use `use client` only inside interactive form and controls, never in `page.tsx`.
- [ ] Validate save flow.
      Run: `pnpm lint && pnpm build`

### Task 7: Shareable resume links and anonymous download

**Files:**

- Create: `src/app/resume/[resume-slug]/page.tsx`
- Create: `src/app/api/resumes/[resume-id]/share/route.ts`
- Create: `src/app/api/resumes/[resume-id]/pdf/route.ts`
- Create: `src/features/resume/server/share-resume.ts`
- Create: `src/features/resume/server/export-resume-pdf.ts`
- Create: `src/features/resume/ui/share-resume-dialog.tsx`

- [ ] Generate public slugs for published resumes.
- [ ] Allow owner to publish and unpublish a share link.
- [ ] Create a public read page using the shared slug.
- [ ] Add PDF export endpoint for anonymous and authenticated flows.
- [ ] Keep exported layout aligned with ATS preview.
- [ ] Validate share and export flows.
      Run: `pnpm lint && pnpm build`

### Task 8: Testing, hardening, and docs

**Files:**

- Create: `src/features/linkedin/server/import-profile.test.ts`
- Create: `src/features/linkedin/server/map-linkedin-to-resume.test.ts`
- Create: `src/features/resume/server/share-resume.test.ts`
- Modify: `README.md`

- [ ] Add unit tests for normalization and share-link generation.
- [ ] Mock Voyager responses so tests do not require live LinkedIn calls.
- [ ] Document required environment variables in `README.md`.
- [ ] Document the import limitations and that Voyager is not official OAuth.
- [ ] Document how anonymous download differs from logged-in persistence.
- [ ] Confirm `docs/architecture.md` and `docs/design.md` are still consistent with implementation decisions.
- [ ] Validate final quality gate.
      Run: `pnpm lint && pnpm build && pnpm vitest run`

## Open Questions Before Execution

1. Should imported data come only from public profile URL, or should we later support user-provided LinkedIn session cookies?
2. Which PDF strategy should be used: HTML-to-PDF on the server or print-friendly browser export?
3. Should public links be indexed by search engines or blocked with `noindex` by default?
4. Will theme customization in MVP be one accent color only, or multiple predefined themes?
5. Should user accounts be part of MVP now, or can persistence start with local anonymous sessions plus share links?

## Recommended MVP Order

1. Task 1
2. Task 2
3. Task 4
4. Task 5
5. Task 3
6. Task 6
7. Task 7
8. Task 8

This order gets anonymous value first, then persistence and sharing.
