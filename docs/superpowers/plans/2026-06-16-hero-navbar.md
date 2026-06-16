# Hero & Navbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a split-panel animated hero and fixed navbar for Fady Eilia's portfolio using Framer Motion spring animations.

**Architecture:** Two React components (`Navbar`, `Hero`) composed in `page.tsx`. The Hero mounts two panels that spring in from opposite sides simultaneously, then stagger in left-side text. The Navbar starts transparent and fades in after panels land, then gains a frosted dark background on scroll.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, Framer Motion, TypeScript

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/components/Navbar.tsx` | Create | Fixed nav: logo, links, CTA, scroll + entrance animation |
| `src/components/Hero.tsx` | Create | Split panel hero with Framer Motion slide + text stagger |
| `src/app/page.tsx` | Modify | Replace boilerplate with `<Navbar />` + `<Hero />` |
| `src/app/globals.css` | Modify | Add `overflow-x: hidden` to prevent horizontal scrollbar during animation |

---

## Task 1: Install Framer Motion

**Files:**
- Modify: `package.json` (via pnpm)

- [ ] **Step 1: Install the package**

```bash
cd /Users/fadyeilia/fady-studio && pnpm add framer-motion
```

Expected output: `+ framer-motion <version>` with no errors.

- [ ] **Step 2: Verify it installed**

```bash
cat /Users/fadyeilia/fady-studio/package.json | grep framer
```

Expected: `"framer-motion": "^X.X.X"` appears in dependencies.

- [ ] **Step 3: Commit**

```bash
cd /Users/fadyeilia/fady-studio && git add package.json pnpm-lock.yaml && git commit -m "chore: add framer-motion"
```

---

## Task 2: Fix global CSS — prevent horizontal scroll during animation

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Read current globals.css**

```bash
cat /Users/fadyeilia/fady-studio/src/app/globals.css
```

- [ ] **Step 2: Add overflow-x hidden to body**

Open `src/app/globals.css` and add at the top (before any existing rules):

```css
html,
body {
  overflow-x: hidden;
}
```

This prevents the horizontal scrollbar from appearing when panels are off-screen at `x: -100vw` / `x: 100vw` before the animation fires.

- [ ] **Step 3: Commit**

```bash
cd /Users/fadyeilia/fady-studio && git add src/app/globals.css && git commit -m "fix: prevent horizontal scroll during hero animation"
```

---

## Task 3: Create the Navbar component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/Navbar.tsx` with this content:

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "WORK", href: "#work" },
  { label: "SYSTEMS", href: "#systems" },
  { label: "INSIGHTS", href: "#insights" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[#0A0F1E]/80 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <a href="#" className="text-xl font-black tracking-tight text-white">
        FE<span className="text-[#FF4500]">.</span>
      </a>

      {/* Nav Links */}
      <ul className="flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-xs tracking-widest font-medium text-white/80 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="flex items-center gap-2 rounded-full border border-white/60 px-5 py-2 text-xs tracking-widest font-medium text-white hover:bg-white hover:text-[#0A0F1E] transition-all duration-200"
      >
        LET&apos;S BUILD <span className="text-sm">↗</span>
      </a>
    </motion.nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/fadyeilia/fady-studio && git add src/components/Navbar.tsx && git commit -m "feat: add Navbar component with scroll-aware bg and entrance animation"
```

---

## Task 4: Create the Hero component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/Hero.tsx` with this content:

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SPRING = { type: "spring", stiffness: 80, damping: 18 } as const;

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full overflow-hidden">
      {/* LEFT PANEL */}
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={SPRING}
        className="relative flex w-1/2 overflow-hidden bg-[#F0EFEA]"
      >
        <Image
          src="/assets/darkHeroLeft-upscaled-20260615-223244.webp"
          alt="Fady Eilia"
          fill
          priority
          className="object-cover object-right"
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 pb-16 pt-24">
          {/* Tagline */}
          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-6"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-medium text-[#1A1A1A]">
              APPS. AUTOMATION. RESULTS.
            </p>
            <div className="mt-2 h-[2px] w-8 bg-[#FF4500]" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={0.82}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-6 text-5xl font-black uppercase leading-[1.05] tracking-tight text-[#1A1A1A] xl:text-6xl"
          >
            I BUILD THINGS THAT MAKE YOUR BUSINESS{" "}
            <span className="text-[#FF4500]">WORK HARDER.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={0.94}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-10 max-w-xs text-sm leading-relaxed text-[#666666]"
          >
            From phone apps to website automation — I help you reach more
            customers and build a reputation that sticks.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={1.06}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-3 rounded-none bg-[#1A1A1A] px-7 py-4 text-xs tracking-widest font-medium uppercase text-white hover:bg-[#FF4500] transition-colors duration-300"
            >
              SEE MY WORK <span className="text-base">↗</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={SPRING}
        className="relative flex w-1/2 overflow-hidden bg-[#0A0F1E]"
      >
        <Image
          src="/assets/darkHeroRight-upscaled-20260615-223839.webp"
          alt=""
          fill
          priority
          className="object-cover object-left"
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/fadyeilia/fady-studio && git add src/components/Hero.tsx && git commit -m "feat: add Hero component with split panel Framer Motion animation"
```

---

## Task 5: Wire up page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx content**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/fadyeilia/fady-studio && git add src/app/page.tsx && git commit -m "feat: compose Navbar and Hero on home page"
```

---

## Task 6: Run and verify in browser

**Files:** none

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/fadyeilia/fady-studio && pnpm dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Verify the following checklist**

- [ ] Both panels slide in simultaneously from opposite sides
- [ ] The person in the image appears seamlessly joined at the center
- [ ] There is no horizontal scrollbar at any point during the animation
- [ ] Text on the left staggerers in after panels land (tagline → headline → subtitle → CTA)
- [ ] Navbar is invisible during animation, fades in at ~0.8s
- [ ] Scrolling past the hero makes the navbar background turn dark/frosted
- [ ] "LET'S BUILD →" button border/hover works
- [ ] "SEE MY WORK →" CTA hover turns orange

- [ ] **Step 3: Fix any visual issues, then commit**

```bash
cd /Users/fadyeilia/fady-studio && git add -A && git commit -m "fix: visual polish after browser verification"
```

---

## Self-Review Notes

- All delays are consistent with the spec (0.7s text start, 0.8s navbar)
- `overflow-hidden` is set on both panels AND `overflow-x: hidden` on body — double protection against scrollbar flash
- `"use client"` directive on both components (required for Framer Motion + `useEffect`)
- Images use Next.js `<Image>` with `fill` + `priority` for optimal LCP
- No placeholder text or TBD items remain
- Orange accent `#FF4500` used consistently across logo dot, tagline bar, headline word, CTA hover
