"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function About() {
  const t = useTranslations("About");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;

  return (
    <section
      id="about"
      className="py-28 px-6 md:px-10 border-t border-border bg-background"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — Portrait */}
          <Reveal delay={0} className="relative">
            {/* Accent offset square behind image */}
            <div
              className="absolute -bottom-3 -end-3 w-24 h-24 bg-accent opacity-90 rounded-sm z-0"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-card border-b-4 border-accent z-10">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
                alt="Fady Eilia"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          {/* Right — Content */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block h-0.5 w-6 bg-accent" />
                <span className="eyebrow">{t("sectionLabel")}</span>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.2}>
              <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-4xl md:text-6xl text-foreground mb-8">
                {t("heading1")}{" "}
                <span className="text-accent">{t("headingAccent")}</span>
              </h2>
            </Reveal>

            {/* Body paragraphs */}
            <Reveal delay={0.3}>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                {t("body1")}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t("body2")}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Stats row — full width below */}
        <Reveal delay={0.5}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="font-display font-black text-4xl md:text-5xl text-foreground">
                  {stat.value}
                </span>
                <span className="eyebrow mt-2 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
