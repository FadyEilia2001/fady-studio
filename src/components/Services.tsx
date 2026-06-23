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
        <Reveal delay={0} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block h-0.5 w-6 bg-accent" />
            <span className="eyebrow">{t("sectionLabel")}</span>
          </div>
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

        <div className="divide-y divide-border">
          {items.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.1}>
              <div className="group flex flex-col md:flex-row md:items-start gap-6 md:gap-16 py-10 md:py-12">
                {/* Number */}
                <span className="font-display text-5xl md:text-7xl text-accent/25 leading-none shrink-0 select-none w-20">
                  {item.number}
                </span>

                {/* Title + description */}
                <div className="flex-1">
                  <h3 className="font-display font-black uppercase text-section text-foreground mb-4 group-hover:text-accent transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-lead text-muted-foreground leading-relaxed mb-6 max-w-[52ch]">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
