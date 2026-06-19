"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { localeDirection, type Locale } from "@/i18n/routing";

const SPRING = { type: "spring", stiffness: 80, damping: 18 } as const;

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  }),
};

// Reduced motion: copy is present with no rise/fade.
const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const t = useTranslations("Hero");
  const dir = localeDirection[useLocale() as Locale];
  const reduce = useReducedMotion();
  const tv = reduce ? staticVariants : textVariants;
  return (
    // Keep the hero visually LTR in both languages: the two image halves are a
    // fixed composition that must join at the center seam. Flipping the panels
    // for RTL would split the subject to opposite edges. Only the copy
    // translates here; sections below the hero flow with the page direction.
    <section dir="ltr" className="relative flex h-screen w-full overflow-hidden">
      {/* LEFT PANEL */}
      <motion.div
        initial={reduce ? false : { x: "-100%" }}
        animate={{ x: 0 }}
        transition={SPRING}
        className="relative flex h-full w-1/2 shrink-0 overflow-hidden bg-[#F0EFEA]"
      >
        <Image
          src="/assets/leftHeroImageCropped-upscaled-20260616-012444.webp"
          alt="Fady Eilia"
          fill
          priority
          sizes="50vw"
          className="object-cover object-right"
        />

        {/* Text overlay */}
        <div className="absolute inset-y-0 left-0 z-10 hidden w-[62%] flex-col justify-center px-10 pb-16 pt-24 sm:px-12 md:flex">
          {/* Tagline */}
          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={tv}
            className="mb-6"
          >
            <p className="eyebrow">{t("tagline")}</p>
            <div className="mt-3 h-[2px] w-10 bg-accent" />
          </motion.div>

          {/* Headline — the loudest type on the page. */}
          <motion.h1
            custom={0.82}
            initial="hidden"
            animate="visible"
            variants={tv}
            className="mb-7 max-w-[12ch] text-balance font-display text-hero font-black uppercase text-foreground"
          >
            {t("headlineLead")}{" "}
            <span className="text-accent">{t("headlineAccent")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={0.94}
            initial="hidden"
            animate="visible"
            variants={tv}
            className="mb-10 max-w-[34ch] text-pretty text-body text-[#4d4d4d]"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={1.06}
            initial="hidden"
            animate="visible"
            variants={tv}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-dark/50 px-7 py-4 text-xs tracking-widest font-medium uppercase text-white backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-accent/40"
            >
              {t("cta")} <span className="text-base">↗</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        initial={reduce ? false : { x: "100%" }}
        animate={{ x: 0 }}
        transition={SPRING}
        className="relative -ml-px flex h-full w-[calc(50%+1px)] shrink-0 overflow-hidden bg-dark"
      >
        <Image
          src="/assets/rightHeroImageCropped-upscaled-20260616-012529.webp"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover object-left"
        />
      </motion.div>

      {/* MOBILE HERO — full-bleed portrait (both halves) with the headline up top
          and the CTA centered over the image. Hidden on md+, where the split
          composition + desktop text overlay take over. */}
      <div
        dir={dir}
        className="absolute inset-0 z-20 flex flex-col justify-end md:hidden"
      >
        {/* Slim top scrim keeps the white logo + hamburger legible */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent"
          aria-hidden="true"
        />
        {/* Bottom scrim so the headline + CTA read over the lower image */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          aria-hidden="true"
        />

        {/* Headline + CTA grouped low, clear of the face */}
        <div className="relative z-10 flex flex-col items-center px-6 pb-20 text-center">
          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={tv}
          >
            <p className="eyebrow !text-white/85">{t("tagline")}</p>
            <h1 className="mt-3 text-balance font-display text-[clamp(2.75rem,14vw,4.5rem)] font-black uppercase leading-[0.95] text-white">
              {t("shortHeadlineLead")}{" "}
              <span className="text-accent">{t("shortHeadlineAccent")}</span>
            </h1>
          </motion.div>

          <motion.div
            custom={0.95}
            initial="hidden"
            animate="visible"
            variants={tv}
            className="mt-8"
          >
            <a
              href="#contact"
              className="inline-flex max-w-[calc(100vw-3rem)] flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/15 bg-dark/50 px-6 py-3.5 text-center text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.14em] text-white backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-accent/40"
            >
              {t("cta")} <span className="text-base leading-none">↗</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
