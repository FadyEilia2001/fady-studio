"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function Services() {
  const t = useTranslations("Services");
  const items = t.raw("items") as Array<{
    number: string;
    title: string;
    description: string;
    tags: string[];
  }>;

  return (
    <section
      id="systems"
      className="py-28 px-6 md:px-10 border-t border-border bg-background"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <Reveal delay={0} className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block h-0.5 w-6 bg-accent" />
            <span className="eyebrow">{t("sectionLabel")}</span>
          </div>

          {/* Heading + Intro row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="font-display font-black uppercase text-section text-balance text-foreground max-w-4xl">
              {t("heading1")}{" "}
              <span className="text-accent">{t("headingAccent")}</span>{" "}
              {t("heading2")}
            </h2>
            <p className="text-lead text-pretty text-muted-foreground max-w-md md:pb-2">
              {t("intro")}
            </p>
          </div>
        </Reveal>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-border mt-16 rounded-sm overflow-hidden">
          {items.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.1}>
              <div className="group relative bg-background p-8 md:p-10 h-full flex flex-col overflow-hidden">
                {/* Top accent bar */}
                <span
                  className="absolute top-0 start-0 end-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-start"
                  aria-hidden="true"
                />

                {/* Number */}
                <span className="font-display text-5xl text-accent/30 mb-6 select-none leading-none">
                  {item.number}
                </span>

                {/* Title */}
                <h3 className="font-display font-bold uppercase text-card-title text-foreground mb-4 group-hover:text-accent transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
