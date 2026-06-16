# Hero & Navbar Design Spec

**Project:** Fady Eilia Portfolio (`fady-studio`)
**Date:** 2026-06-16
**Scope:** Navbar + Hero section only

---

## Overview

Build a full-viewport hero section and fixed navbar for Fady Eilia's portfolio site. The hero uses two pre-split images that animate in from opposite sides (Framer Motion spring), meeting at center to reveal the full portrait. Text content fades in staggered after panels land.

---

## Navbar

### Layout
- Fixed position, full width, `z-50`, sits above hero
- Three zones: logo left · links center · CTA right

### Logo
- Text: **FE.**
- Style: bold, uppercase — the period is orange (`#FF4500` or close to the concept accent)

### Nav Links
- Labels: WORK · SYSTEMS · INSIGHTS · ABOUT · CONTACT
- Spaced horizontally, uppercase, medium weight
- No active state needed for now (single-page)

### CTA Button
- Text: **LET'S BUILD →**
- Style: pill-shaped, outlined (border + transparent fill), white text
- Hover: fill white, text dark

### Behavior
- On load: fully transparent (opacity 0), fades in at ~0.8s delay (after hero panels land)
- On scroll past hero height: background transitions to frosted dark (`backdrop-blur`, semi-transparent dark)
- Links are anchor links (`#work`, `#about`, etc.) for now — no routing needed

---

## Hero Section

### Layout
- Full viewport: `100vw × 100vh`
- Two panels side by side, each exactly `50vw`
- No gap between panels — the join is where the two halves of the person meet

### Left Panel
- Background: inherits the image's white/gray tone (no extra background color needed)
- Image: `/assets/darkHeroLeft-upscaled-20260615-223244.webp`
  - `object-cover`, fills the panel, anchored right (so the person stays at the join)
- Text overlay (positioned bottom-left quadrant):
  - Tagline: `APPS. AUTOMATION. RESULTS.` — small caps, orange underline bar beneath
  - Headline: `I BUILD THINGS THAT MAKE YOUR BUSINESS WORK HARDER.` — large bold, black; **WORK HARDER.** in orange
  - Subtitle: `From phone apps to website automation — I help you reach more customers and build a reputation that sticks.` — small, gray
  - CTA button: `SEE MY WORK →` — dark filled pill, white text

### Right Panel
- Background: dark navy (`#0A0F1E` or match image)
- Image: `/assets/darkHeroRight-upscaled-20260615-223839.webp`
  - `object-cover`, fills the panel, anchored left (person stays at the join)
- No additional text overlay — service icons and labels are baked into the image

### Animation (Framer Motion — Option A: Simultaneous Slam)

**Panel entrance:**
- Left panel: `x: "-100vw"` → `x: 0`
- Right panel: `x: "100vw"` → `x: 0`
- Both fire simultaneously on mount
- Spring config: `{ stiffness: 80, damping: 18 }` — firm landing with subtle bounce
- `overflow: hidden` on each panel to clip during slide

**Text entrance (left panel only, after panels land):**
Staggered fade-up sequence, starts at ~0.7s:
1. Tagline: `delay: 0.7s`
2. Headline: `delay: 0.82s`
3. Subtitle: `delay: 0.94s`
4. CTA: `delay: 1.06s`

Each text element: `y: 20 → 0`, `opacity: 0 → 1`, `duration: 0.5s`, `ease: easeOut`

**Navbar entrance:**
- `opacity: 0 → 1`, `delay: 0.8s`, `duration: 0.4s`

---

## Copy

| Element | Text |
|---|---|
| Logo | FE. |
| Tagline | APPS. AUTOMATION. RESULTS. |
| Headline line 1 | I BUILD THINGS THAT MAKE YOUR BUSINESS |
| Headline line 2 (orange) | WORK HARDER. |
| Subtitle | From phone apps to website automation — I help you reach more customers and build a reputation that sticks. |
| CTA | SEE MY WORK → |
| Navbar CTA | LET'S BUILD → |

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| Orange accent | `#FF4500` | Logo dot, tagline underline, headline word, CTA hover |
| Dark navy | `#0A0F1E` | Right panel bg, navbar scroll bg |
| Off-white | `#F5F5F5` | Left panel bg fallback |
| Body text | `#1A1A1A` | Headline, nav links |
| Muted text | `#666666` | Subtitle |

---

## Typography

- Font: **Geist Sans** (already installed via `next/font/google` in layout.tsx)
- Tagline: `text-xs tracking-widest uppercase`
- Headline: `text-5xl font-black leading-tight uppercase` (responsive: `text-7xl` on xl)
- Subtitle: `text-base font-normal`
- Nav links: `text-sm tracking-widest uppercase font-medium`

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `src/components/Navbar.tsx` | Create | Fixed nav with logo, links, CTA, scroll behavior |
| `src/components/Hero.tsx` | Create | Split panel hero with Framer Motion animations |
| `src/app/page.tsx` | Modify | Replace boilerplate, compose Navbar + Hero |
| `src/app/globals.css` | Modify | Add any global resets needed (overflow-x hidden) |

---

## Dependencies to Install

- `framer-motion` — animation library

---

## Out of Scope

- Mobile/responsive layout (desktop-first for now)
- Dark mode toggle
- Sections below the hero (WORK, ABOUT, etc.)
- CTA link destinations (placeholder `#` for now)
