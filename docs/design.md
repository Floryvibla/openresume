# Open Resume Design System

## Purpose

This document extracts a usable design system from the provided visual references and defines the UI direction for the product. Implementation planning lives in `docs/plan.md`. Technical boundaries live in `docs/architecture.md`.

## Design Intent

The reference uses a calm, premium, editorial visual language. The interface should feel clean, quiet, and deliberate. It should avoid loud gradients, aggressive contrast blocks, and decorative clutter.

Core tone:

- clean
- minimal
- soft
- editorial
- premium
- nature-inspired
- highly legible

## Visual Traits Extracted From the Reference

- Off-white and warm neutral surfaces
- Olive and moss green as the main brand accent
- Very low shadow usage
- Rounded rectangles with soft corners
- Thin borders instead of heavy depth
- Large calm spacing
- Serif and sans-serif pairing with strong hierarchy
- Soft textured backgrounds used sparingly
- Quiet motion, not flashy motion

## Brand Palette

These tokens should be defined in `src/app/globals.css` and consumed through semantic classes.

### Core colors

- `--background`: `#f6f3ea`
- `--foreground`: `#22211d`
- `--card`: `#fbf8f1`
- `--card-foreground`: `#26241f`
- `--muted`: `#ebe6d8`
- `--muted-foreground`: `#6e695f`
- `--border`: `#d9d1bf`
- `--primary`: `#6f8d1f`
- `--primary-foreground`: `#f8f7f2`
- `--accent`: `#879e44`
- `--accent-foreground`: `#1f2412`
- `--secondary`: `#dfe6c7`
- `--secondary-foreground`: `#34401a`

### Status colors

- `--success`: `#6f8d1f`
- `--warning`: `#a47d26`
- `--destructive`: `#b24b3c`

## Typography Direction

Use a restrained typography system with one sans-serif family for interface text and one serif family for emphasis areas only.

### Usage

- Sans-serif: UI, forms, buttons, labels, supporting text
- Serif: hero headline accent, editorial callouts, optional resume section headings

### Hierarchy

- `display`: bold, tight line-height, used sparingly
- `heading`: strong but not oversized
- `title`: medium emphasis
- `body`: regular, highly readable
- `caption`: muted support text

### Tone rules

- No gradient text
- No oversized uppercase blocks
- Avoid cramped line-height
- Prefer short, calm copy blocks

## Spacing System

Base the layout on an 8px rhythm.

- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-5`: 20px
- `space-6`: 24px
- `space-8`: 32px
- `space-10`: 40px
- `space-12`: 48px
- `space-16`: 64px

Use more whitespace than decoration.

## Radius and Borders

- Small controls: `rounded-md`
- Cards and panels: `rounded-xl` or `rounded-2xl`
- Hero or large framed blocks: `rounded-3xl`
- Border weight should stay thin and subtle

Do not rely on shadow to define component structure.

## Elevation

- Default: no shadow
- Hover: very subtle contrast change or border emphasis
- Dialog or overlay: minimal shadow only when needed for separation

## Component Direction

### Buttons

- Solid primary button in olive green
- Secondary button in neutral surface with border
- Loading state with spinner inside the button
- Hover should feel restrained, mostly through opacity or border contrast

### Inputs

- Quiet surfaces
- Thin border
- Strong focus ring using semantic accent color
- No glossy effects

### Cards

- Flat appearance
- Soft corners
- Border-first styling
- Minimal internal decoration

### Sidebar

- Use shadcn sidebar if a sidebar is needed
- Keep it light and structural, not heavy or dark

### Resume Preview

- White or very light neutral paper effect
- Very simple section hierarchy
- Zero decorative noise that hurts ATS readability

## Motion

Motion should support clarity, never become the visual focus.

- Button pending state: spinner
- Hover transitions: 150ms to 200ms
- Section reveal: subtle fade or translate
- Avoid bouncing, elastic, and exaggerated motion

## UX Rules

- Loading must always be visible on async actions
- Buttons must disable during pending state
- Empty states should use calm explanatory copy
- Mobile-first layout is mandatory
- Keep forms short and easy to scan

## Layout Guidelines

### Landing page

- Strong hero with logo and single import CTA
- Clean supporting sections
- Minimal card count
- Large breathing room

### Dashboard

- Clear split between editor and preview
- Avoid visual overload
- Keep tools secondary to the resume itself

### Public share page

- Resume stays the hero
- Branding remains subtle

## Texture Guidance

The reference includes painterly texture and soft landscape imagery. For Open Resume, this should be translated carefully:

- Use texture only in branding or hero surfaces
- Do not apply texture inside the ATS resume document
- Do not let texture reduce contrast or legibility

## Anti-Patterns

- Heavy shadows
- Bright neon colors
- Large blur effects
- Excessive badges
- Nested cards inside cards
- Too many accent colors
- `use client` everywhere just to animate simple UI

## Implementation Rules

- All colors must come from semantic tokens in `globals.css`
- Tailwind classes should consume those tokens, not raw hex values in components
- Use shadcn as the base UI library
- Interactivity should be minimal and polished
- Every loading interaction should have a spinner or equivalent feedback
