"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // `solid` forces the dark, readable bar on sub-pages that have no hero behind
  // the bar. On the home page it stays transparent until scrolled past the hero.
  const dark = solid || scrolled;

  return (
    <motion.nav
      // Keep the bar physically LTR: it sits over a fixed hero (light on the
      // left, dark on the right), so positions must not flip in Arabic — only
      // the labels translate. Sections below the hero flow with the page dir.
      dir="ltr"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: solid ? 0 : 0.8, duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        dark
          ? "backdrop-blur-md bg-[#0A0F1E]/80 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      {/* Left group: logo + links (over the light side of the hero) */}
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className={`text-xl font-black tracking-tight transition-colors duration-300 ${
            dark ? "text-white" : "text-[#1A1A1A]"
          }`}
        >
          FE<span className="text-[#FF4500]">.</span>
        </Link>

        <ul className="flex items-center gap-8">
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

      {/* Right group: language toggle + CTA (over the dark side of the hero) */}
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs tracking-widest font-medium text-white backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-200 hover:bg-white/20"
        >
          {t("cta")} <span className="text-sm">↗</span>
        </a>
      </div>
    </motion.nav>
  );
}
