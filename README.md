# fady-studio ✦ استوديو فادي إيليا

> **Bold execution. Human voice. The design is the product.**

Welcome to the codebase of my personal studio portfolio. It is built to show what custom, bespoke web design and engineering looks like for small and medium businesses.

***

## Why is this open source? ✦ ليش الكود مفتوح؟

Most portfolios are hidden behind locked repositories or built on top of the same boring, pre-cooked SaaS templates. I chose to open-source this entire studio codebase to **inspire and prompt other developers to build better, bolder things.**

Here is the thinking:

### 1. Let's kill the generic web.
The modern internet is drowning in gradient-blob heroes and identical card grids. We need more makers building custom, memorable, and expressive spaces. By showing you every line of CSS and animation config behind this site, I hope to prove that building something bespoke isn't magic—it's just a sequence of deliberate, handcrafted decisions. Take these patterns, break them, and build something that actually has a personality.

### 2. RTL is not an afterthought.
Arabic web development is too often treated as a rushed `dir="rtl"` mirror job where fonts break and layouts crumble. In this repo, English and Arabic share the exact same quality bar. I wanted to create a transparent, real-world blueprint of a production-ready, highly animated bilingual codebase so others can see how it's done right.

### 3. Open windows, better craft.
Our creative North Star is **"The Workshop Window"**—a storefront where you can see the tools, the woodchips, and the maker at work. Keeping the code open is just extending that window. You get to see the actual joinery.

*Feel free to explore, learn from, and adapt these patterns. If it inspires you to build something bold of your own, then this repository has done its job.*

***

## 🛠️ The Tech Stack

This studio is built to be fast, lightweight, and highly interactive:

- **Framework:** [Next.js (v16)](https://nextjs.org) with App Router
- **Styling:** [Tailwind CSS (v4)](https://tailwindcss.com) + Custom CSS variables (`[globals.css](file:///Users/fadyeilia/fady-studio/src/app/globals.css)`)
- **Animations:** [Framer Motion (v12)](https://www.framer.com/motion/) with full `prefers-reduced-motion` support
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app) (English & Arabic)
- **Language:** TypeScript

***

## 📐 Design Philosophy

This project implements a unique design system based on:
1. **The Workshop Window:** A dual-surface layout—a warm, paper-toned daytime surface for showcasing work and a dark, midnight-toned surface for bold actions.
2. **Typography as Art:** Barlow Condensed set to heavy weights for massive display headlines, contrasted with clean sans-serif and high-legibility Arabic fonts (Cairo).
3. **Ember Accent:** A deliberate ember-orange (`#ff4d00`) accent used as a focal pointer, never as background fill.

Read the full specifications in [DESIGN.md](file:///Users/fadyeilia/fady-studio/DESIGN.md) and the product/brand goals in [PRODUCT.md](file:///Users/fadyeilia/fady-studio/PRODUCT.md).

***

## 🚀 Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Rules of the Road

While this codebase is open source to inspire you, please **do not copy it wholesale**. The design is meant to represent my personal brand and personality. Take the layout techniques, the i18n structure, or the motion configs, but make the visual execution uniquely *yours*.
