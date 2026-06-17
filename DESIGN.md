---
name: Fady Eilia Studio
description: Bilingual, bold-but-human studio portfolio — condensed display type, ember-orange accent, light/dark dual surfaces.
colors:
  ember: "#ff4d00"
  ink: "#141414"
  ink-muted: "#6b6b6b"
  paper: "#faf9f6"
  card: "#ffffff"
  hairline: "#e6e3dc"
  midnight: "#0a0f1e"
  midnight-fg: "#f5f5f5"
  midnight-muted: "#9aa0ad"
  midnight-hairline: "#ffffff1f"
typography:
  display:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5.25rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  lead:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.2em"
  arabic:
    fontFamily: "Cairo, Tahoma, sans-serif"
    letterSpacing: "0"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  pill: "9999px"
spacing:
  gutter: "24px"
  gutter-lg: "40px"
  section: "112px"
  shell: "1400px"
components:
  button-glass:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.midnight-fg}"
    rounded: "{rounded.pill}"
    padding: "16px 28px"
  button-accent:
    backgroundColor: "{colors.ember}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  card-service:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "40px"
  card-insight:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "28px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.midnight-fg}"
    rounded: "{rounded.none}"
    padding: "16px 0"
  chip-tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Fady Eilia Studio

## 1. Overview

**Creative North Star: "The Workshop Window"**

This is the storefront of a maker who happens to be technical — a window into a workshop where real things get built for real businesses. The system runs on a deliberate two-surface split: a warm, paper-toned daylight surface where the work is shown plainly, and a deep midnight surface (the hero seam, the contact and footer) where the brand turns up the volume. The split is the personality: most of the page is honest and legible, then it goes dark and confident at the moments that ask for commitment.

The voice is **bold in execution, human in tone**. Type is the loudest instrument — Barlow Condensed set black, uppercase, and packed tight, sized so the page can shout a five-word promise. The ember-orange accent (`#ff4d00`) is used like a highlighter, never like paint: one word in a headline, one rule under a label, one filled button. Everything else stays neutral so the accent keeps its punch.

This system explicitly rejects the saturated "creative studio" template (oversized centered serif, client-logo marquee as proof, an identical project grid, "we are a multidisciplinary studio"), the generic SaaS landing (gradient-blob hero, three identical feature cards, Inter, purple-to-blue, a hero-metric row), the cheap-freelancer look (stock handshakes, clip-art icons), and corporate sterility. It must read as made by one specific, tasteful human — not assembled from a theme.

**Key Characteristics:**
- Two committed surfaces — warm paper daylight + midnight-navy spotlight — never a muddy middle gray.
- Condensed, black, uppercase display type carrying the hierarchy; the page talks in headlines.
- Ember accent rationed to ≤10% of any surface; rarity is the point.
- Bilingual by design: Latin runs condensed/tracked, Arabic (Cairo) runs untracked and upright — both first-class.
- Flat by default; depth appears only as glass on floating controls and hairline tonal grids.

## 2. Colors

A warm-neutral daylight palette punctuated by a single ember accent, with a fully-specified midnight surface as its dramatic counterpart.

### Primary
- **Ember** (`#ff4d00`): The studio's one loud color. The logo period, the rule under each label, the accent word inside a headline, the filled submit button, every hover-reveal. Used on ≤10% of any surface. Note: the canonical value is `#ff4d00` (the `--accent` token); a few legacy spots hardcode `#FF4500` — those are drift, not a second accent.

### Neutral — Daylight surface
- **Paper** (`#faf9f6`): The dominant body background. A warm off-white that is *not* trying to be cream/sand — it reads as bright daylight, with warmth carried by type and accent, not by the bg.
- **Ink** (`#141414`): Near-black for all headings and primary text on paper. High contrast, never pure `#000`.
- **Ink Muted** (`#6b6b6b`): Secondary body copy, captions, metadata on paper. Holds ~5.1:1 on paper; do not lighten it further.
- **Card** (`#ffffff`): Pure white, used for the insight cards that need to lift a half-step off paper.
- **Hairline** (`#e6e3dc`): Section dividers and the `gap-px` grid lines between service cards. Structure without weight.

### Neutral — Midnight surface
- **Midnight** (`#0a0f1e`): The dark navy of the hero's right half, the contact section, the footer, and the scrolled navbar. Near-black with a cool-blue undertone.
- **Midnight Foreground** (`#f5f5f5`): Primary text and the logo on midnight.
- **Midnight Muted** (`#9aa0ad`): Secondary text on midnight (labels, body, form placeholders).
- **Midnight Hairline** (`rgba(255,255,255,0.12)`): Dividers and input underlines on the dark surface.

### Named Rules
**The Highlighter Rule.** Ember marks, it never fills areas. One accent word per headline, one rule per label, one filled button per view. If two ember elements compete for attention in the same glance, one is wrong.

**The No-Middle-Gray Rule.** Every surface commits to paper or midnight. There is no slate/charcoal half-tone background. Drama comes from the jump between the two, not from a dimmer switch.

## 3. Typography

**Display Font:** Barlow Condensed (with `system-ui, sans-serif` fallback)
**Body Font:** DM Sans (with `system-ui, sans-serif` fallback)
**Label / Mono Font:** Space Mono (with `monospace` fallback)
**Arabic Font:** Cairo (with `Tahoma, sans-serif` fallback) — drives *every* role when `:lang(ar)`, with tracking reset to `0` and uppercasing removed.

**Character:** A high-contrast pairing on the proportion axis: a tall, narrow, heavy condensed grotesque for display against a friendly, open humanist sans for reading. The condensed display lets headlines run loud and wide without overflowing; DM Sans keeps the prose warm and plain-spoken. Space Mono adds an engineering-bench note to small labels. Three families, three distinct jobs — never blurred.

### Hierarchy
- **Display** (Barlow Condensed 900, `clamp(2.5rem, 6vw, 5.25rem)`, line-height 0.95, uppercase, tracking ~-0.02em): The hero promise and every section H2. The page's primary voice.
- **Headline** (Barlow Condensed 700, `clamp(1.5rem, 3vw, 1.875rem)`, line-height 1.1, uppercase): Card titles (services, insights, projects).
- **Title** (Barlow Condensed 900, `2.5–3rem`): Stat figures and large inline numerals.
- **Lead** (DM Sans 400, `1.125rem`, line-height 1.6): Section intros and About body — the warm, human register.
- **Body** (DM Sans 400, `1rem`, line-height 1.6): Default copy. Cap measure at 65–75ch.
- **Label** (Space Mono 400, `0.7rem`, letter-spacing `0.2em`, uppercase): The `.eyebrow` — section kickers, dates, meta. Auto-untracks and de-uppercases in Arabic.

### Named Rules
**The Headline-Is-Loudest Rule.** Display type is the largest thing on any surface — including the hero, which must read as the single biggest statement on the page. No body or UI element out-scales a display heading in its own viewport.

**The One-Word-Ember Rule.** Inside a headline, exactly one word (or short phrase) takes ember. The rest is ink or midnight-foreground. The accent word is the verb or the payoff, never a connector.

**The Arabic-Is-Native Rule.** Arabic is never condensed-Latin in disguise. Cairo runs at its natural width, tracking `0`, no uppercase transform, with the layout direction flipped — but the fixed-composition hero stays LTR by design.

## 4. Elevation

Flat by default. The system conveys depth through tonal layering (paper vs. white card vs. midnight) and hairline grids, not drop shadows. Shadows appear in exactly one role: **glass**, on controls that float over imagery.

### Shadow Vocabulary
- **Glass float** (`box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.3)`): The hero and navbar CTAs only. Pairs with `backdrop-blur-md` + `backdrop-saturate-150` over the hero image. The inset highlight is what sells the glass; the outer shadow alone reads as a generic raised button.

### Named Rules
**The Glass-Is-Earned Rule.** Backdrop-blur and the glass shadow are reserved for controls genuinely floating over photography (the hero/nav CTAs). They are forbidden as decoration on flat sections — no glass cards on paper.

**The Flat-Grid Rule.** Card groups are separated by `gap-px` over a hairline background, not by shadows or heavy borders. The dividing line *is* the elevation.

## 5. Components

### Buttons
- **Shape:** Fully pill (`9999px`), uppercase, tracked, Space-Mono-adjacent weight (`font-medium`/`font-bold`).
- **Glass (primary on imagery):** Midnight-tinted translucent fill, white text, `backdrop-blur-md`, glass shadow. Hover shifts fill toward translucent ember. Used in hero + navbar.
- **Accent (primary on flat/dark):** Solid ember fill, white text. Hover drops to `ember/90`. Used for the contact submit — the page's one hard conversion.
- **Hover / Focus:** Color/fill transition 200–300ms. Focus-visible rings are currently missing and must be added (see Don'ts).

### Chips / Tags
- **Style:** Transparent fill, hairline border, ink-muted text, pill shape, `text-xs`. Used for service capability tags and insight category tags.
- **State:** Static (non-interactive metadata), no selected state.

### Cards / Containers
- **Service card:** Flat, square corners, lives in a `gap-px` hairline grid. Distinctive behavior: an ember top-rule scales in from the inline-start on hover (`scale-x-0 → 100`), title shifts to ember. No border of its own — the grid gap is the edge.
- **Insight card:** White (`#fff`) on paper, square corners (`rounded-none`), hairline border that turns ember on hover.
- **Project accordion (signature):** `rounded-lg` panels in a flex row; the hovered/focused panel grows (`flex-grow: 5` vs `1`) over 500ms, revealing description + metric. Image scales 105% on hover; a midnight gradient + project-color multiply overlay keep white text legible.

### Inputs / Fields
- **Style:** Underline only — transparent background, bottom hairline (`border-b`), no box. Generous `py-4` tap target.
- **Focus:** Underline shifts to ember; no glow. Placeholder uses midnight-muted (must clear 4.5:1 — verify).

### Navigation
- **Style:** Fixed, full-width. Transparent over the hero, transitioning to frosted midnight (`bg-[#0a0f1e]/80` + `backdrop-blur-md` + hairline bottom border) after scrolling ~80% of the viewport. Logo + links left, language toggle + CTA right.
- **Typography:** Links `text-xs`, tracked, `font-medium`; logo `font-black`. Link color adapts to the surface beneath (ink over the light hero half, white once frosted).
- **RTL:** The bar is intentionally pinned LTR (it floats over a fixed left-light/right-dark hero); only labels translate. Sub-pages pass `solid` for an always-dark readable bar.

## 6. Do's and Don'ts

### Do:
- **Do** keep the hero headline the single largest type on the page — display scale (`clamp` up to ~5.25rem), never smaller than the section H2s beneath it.
- **Do** use the `.eyebrow` (Space Mono, `0.2em` tracking, uppercase) for labels on Latin surfaces, and trust it to auto-untrack and de-uppercase in Arabic.
- **Do** ration ember to ≤10% of a surface: one accent word, one label rule, one filled button per view.
- **Do** commit every surface to paper or midnight; carry warmth through type and accent, not through the background.
- **Do** cap body and lead copy at 65–75ch and keep body ≥16px.
- **Do** add `prefers-reduced-motion` alternatives to every Framer Motion entrance, the hero spring, and `Reveal` (crossfade or instant) — it is a PRODUCT.md non-negotiable.
- **Do** reference the `--accent` token (`#ff4d00`), never a hardcoded hex.

### Don't:
- **Don't** ship the saturated **creative-studio template** — no oversized centered serif hero, no client-logo marquee as proof, no identical project grid, no "multidisciplinary studio" voice.
- **Don't** ship the **generic SaaS** look — no gradient-blob hero, no three identical icon+heading+text feature cards, no Inter/Roboto, no purple-to-blue gradient, no hero-metric template.
- **Don't** drift to the **cheap-freelancer** or **corporate-sterile** registers — no stock handshakes, clip-art icons, or gray soulless enterprise layouts.
- **Don't** overdesign — effects (glass, blur, the accordion) must earn their place; no gimmickry that slows the page or hurts readability.
- **Don't** use gradient text (`background-clip: text`), and don't add side-stripe `border-left/right` accents — the service card's ember rule is a full-width top bar, keep it that way.
- **Don't** let a second ember element compete in the same glance, and don't let any UI element out-scale the display heading in its own viewport.
- **Don't** lighten `--muted-foreground` past `#6b6b6b` on paper, or let midnight-muted placeholders drop below 4.5:1.
- **Don't** hardcode `#FF4500`; it's drift from the `#ff4d00` token.
