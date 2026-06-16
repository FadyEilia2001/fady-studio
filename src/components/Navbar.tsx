"use client";

import { motion } from "framer-motion";
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
      <a href="#" className="text-xl font-black tracking-tight text-white">
        FE<span className="text-[#FF4500]">.</span>
      </a>

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

      <a
        href="#contact"
        className="flex items-center gap-2 rounded-full border border-white/60 px-5 py-2 text-xs tracking-widest font-medium text-white hover:bg-white hover:text-[#0A0F1E] transition-all duration-200"
      >
        LET&apos;S BUILD <span className="text-sm">↗</span>
      </a>
    </motion.nav>
  );
}
