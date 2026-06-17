# Mobile Nav + Hero Redesign Spec

**Project:** Fady Eilia Portfolio (`fady-studio`)
**Date:** 2026-06-16
**Scope:** Mobile-only (`< md`, 768px) treatment of the Navbar and Hero. Desktop is unchanged.

---

## Problem

On phones the hero crams the long headline into the left panel's ~62%-of-50vw column (~116px wide), so it wraps one word per line and the subtitle overlaps the portrait — squished and unreadable. The navbar also shows the full desktop link row + CTA, which doesn't fit.

## Goals

1. Replace the mobile navbar with an **animated, full-screen hamburger menu**.
2. Rework the **mobile hero**: full-bleed portrait, headline reduced to two words **"Better Online"** moved to the top (full width, not squished), and the CTA **centered over the image**.
3. Leave the desktop experience exactly as-is.

---

## 1. Navbar — animated hamburger (mobile only)

- Below `md`: the center link row and the desktop "LET'S BUILD" CTA are hidden (`hidden md:flex`). The logo stays on the left. A **hamburger button** (`md:hidden`) appears on the right.
- The button icon **morphs hamburger → X** (two/three bars rotate+translate). It stays in the bar, above the overlay, so it doubles as the close control.
- Tapping opens a **full-screen overlay** (dark navy, `bg-dark`, slight backdrop blur):
  - Nav links render large (Barlow Condensed, uppercase) and **stagger in** top-to-bottom.
  - The language toggle and the "LET'S BUILD ↗" CTA appear below the links.
  - The bar itself goes solid-dark while open (reuse the existing `dark` state: `dark = solid || scrolled || menuOpen`).
- **Behavior:** body scroll locked while open; closes on link tap and on `Esc`; overlay sits below the bar (`z-40`) so the morphing button (in the `z-50` bar) stays interactive.
- **A11y:** button has `aria-label`, `aria-expanded`, `aria-controls`; overlay has `id`; focus moves to the first link on open and returns to the button on close; links are real anchors.
- **RTL:** menu content is centered, so layout direction is not load-bearing; labels translate normally.

## 2. Hero — "Better Online" (mobile only)

- The two image-half panels remain the **full-bleed background** on all sizes (they still join at center).
- The current left-panel text overlay becomes `hidden md:flex` (desktop only).
- A new **`md:hidden` mobile block** spans the full hero:
  - **Top:** the `APPS · AUTOMATION · RESULTS` eyebrow + a two-word headline **"Better Online"** — "Better" in ink/white, **"Online"** in the orange accent. Centered, full width.
  - **Center:** the glass "SEE MY WORK ↗" CTA, centered in the hero.
  - **Scrim:** a top-down dark gradient (for the headline) and a soft radial/contained scrim behind the CTA, so text reads across the light-left / dark-right halves.
- **Copy:** new i18n keys `Hero.shortHeadlineLead` ("Better") and `Hero.shortHeadlineAccent` ("Online") in `en.json`; Arabic equivalents in `ar.json` (placeholder, like the rest of the site copy). The eyebrow `tagline` and `cta` keys are reused.

## 3. Motion & accessibility

- Framer Motion drives the icon morph, the overlay reveal, and the link stagger.
- **`prefers-reduced-motion: reduce`** (via `useReducedMotion()`): the overlay simply crossfades, links appear without stagger/translate, and the icon swaps without rotation. No animation gates content visibility.

---

## Files

| File | Change |
|---|---|
| `src/components/Navbar.tsx` | Hamburger button + morphing icon + full-screen overlay + state/scroll-lock/a11y |
| `src/components/Hero.tsx` | `md:hidden` mobile block; gate desktop overlay to `md:flex`; scrims |
| `messages/en.json` | `Hero.shortHeadlineLead`, `Hero.shortHeadlineAccent` |
| `messages/ar.json` | same keys (Arabic placeholder) |

No new dependencies (`framer-motion` already present).

## Out of scope

- Desktop layout/typography (unchanged).
- Replacing the hero images with a single combined asset.
- Contact form behavior.
