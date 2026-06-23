"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

const NAV_KEYS = [
  { key: "work", href: "#work" },
  { key: "systems", href: "#systems" },
  { key: "insights", href: "#insights" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: lock body scroll, wire Esc-to-close, and
  // move focus into the overlay. Cleanup restores everything on close.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(
      () => firstLinkRef.current?.focus(),
      60,
    );
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  // `dark` forces the dark, readable bar: on sub-pages (`solid`), once scrolled
  // past the hero, or whenever the mobile menu overlay is open.
  const dark = solid || scrolled || menuOpen;

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduce
        ? { duration: 0.15 }
        : {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.07,
            delayChildren: 0.12,
          },
    },
    exit: { opacity: 0, transition: { duration: reduce ? 0.1 : 0.25 } },
  };
  const itemVariants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <motion.nav
        // Keep the bar physically LTR: it sits over a fixed hero (light on the
        // left, dark on the right), so positions must not flip in Arabic — only
        // the labels translate.
        dir="ltr"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: solid ? 0 : 0.8,
          duration: 0.4,
          ease: "easeOut",
        }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 sm:px-8 sm:py-5 ${
          dark
            ? "backdrop-blur-md bg-dark/80 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        {/* Left group: logo + (desktop) links */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`text-xl font-black tracking-tight transition-colors duration-300 ${
              // On mobile the hero has a dark top scrim, so the logo stays white;
              // on desktop (no scrim) it's ink over the light hero half.
              dark ? "text-white" : "text-white md:text-[#1A1A1A]"
            }`}
          >
            FE<span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_KEYS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-xs tracking-widest font-medium transition-colors duration-200 ${
                    dark
                      ? "text-white/80 hover:text-white"
                      : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                  }`}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right group (desktop): language toggle + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs tracking-widest font-medium text-white backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-200 hover:bg-white/20"
          >
            {t("cta")} <span className="text-sm">↗</span>
          </a>
        </div>

        {/* Hamburger (mobile) — morphs to an X. Sits in the z-50 bar, above the
            z-40 overlay, so it doubles as the close control. Bars stay white:
            this corner always sits over the hero's dark right half or the dark bar. */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative -mr-1 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 top-1/2 h-0.5 w-6 rounded-full bg-white"
              style={{ originX: 0.5, originY: 0.5 }}
              animate={{ y: menuOpen ? 0 : -4, rotate: menuOpen ? 45 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-0.5 w-6 rounded-full bg-white"
              style={{ originX: 0.5, originY: 0.5 }}
              animate={{ y: menuOpen ? 0 : 4, rotate: menuOpen ? -45 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </button>
      </motion.nav>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-12 bg-dark/98 px-8 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col items-center gap-5">
                {NAV_KEYS.map((link, i) => (
                  <motion.li key={link.href} variants={itemVariants}>
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={closeMenu}
                      className="font-display text-4xl font-black uppercase tracking-tight text-dark-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {t(link.key)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-6"
            >
              <LanguageToggle />
              <a
                href="#contact"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-accent/90"
              >
                {t("cta")} <span>↗</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
