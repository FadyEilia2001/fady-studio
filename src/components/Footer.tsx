"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const navLinks = [
  { key: "work", href: "#work" },
  { key: "systems", href: "#systems" },
  { key: "insights", href: "#insights" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const socials = t.raw("socials") as Array<{ label: string; href: string }>;

  return (
    <footer className="bg-dark text-dark-foreground px-6 md:px-10 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Top grid */}
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-display font-black text-4xl leading-none">
                <span className="text-dark-foreground">FE</span>
                <span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-dark-muted max-w-xs mt-5 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Col 2 — Nav */}
          <div>
            <p className="text-dark-muted font-mono text-eyebrow uppercase mb-5">
              {t("navLabel")}
            </p>
            <ul className="space-y-0">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="block py-1.5 text-dark-foreground/80 hover:text-accent transition-colors"
                  >
                    {nav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Socials */}
          <div>
            <p className="text-dark-muted font-mono text-eyebrow uppercase mb-5">
              {t("socialLabel")}
            </p>
            <ul className="space-y-0">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1.5 text-dark-foreground/80 hover:text-accent transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-muted text-sm">
            &copy; 2026 Fady Eilia.{" "}
            <span>{t("rights")}</span>
          </p>
          <p className="text-dark-muted text-sm">{t("builtWith")}</p>
          <a
            href="#"
            className="text-dark-muted hover:text-accent text-sm transition-colors"
          >
            {t("backToTop")} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
