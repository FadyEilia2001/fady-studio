"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      className="py-28 px-6 md:px-10 bg-dark text-dark-foreground"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left Column */}
          <div>
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block h-0.5 w-6 bg-accent" />
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-dark-muted">
                  {t("sectionLabel")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-5xl md:text-7xl">
                {t("heading1")}{" "}
                <span className="text-accent">{t("headingAccent")}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-dark-muted text-lg max-w-md mt-6">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-10">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-dark-muted mb-2">
                  {t("emailLabel")}
                </p>
                <a
                  href={`mailto:${t("email")}`}
                  className="font-display text-2xl md:text-3xl text-dark-foreground hover:text-accent transition-colors"
                >
                  {t("email")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column */}
          <Reveal delay={0.2}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="border border-dark-border rounded-lg p-8 bg-white/[0.03]"
            >
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder={t("formName")}
                  className="w-full bg-transparent border-b border-dark-border py-4 text-dark-foreground placeholder:text-dark-muted focus:border-accent outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder={t("formEmail")}
                  className="w-full bg-transparent border-b border-dark-border py-4 text-dark-foreground placeholder:text-dark-muted focus:border-accent outline-none transition-colors"
                />
                <textarea
                  rows={5}
                  placeholder={t("formMessage")}
                  className="w-full bg-transparent border-b border-dark-border py-4 text-dark-foreground placeholder:text-dark-muted focus:border-accent outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-accent text-white font-display font-bold uppercase tracking-widest py-4 hover:bg-accent/90 transition-colors"
              >
                {t("formSubmit")}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
