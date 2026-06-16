"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function Insights() {
  const t = useTranslations("Insights");
  const articles = t.raw("articles") as Array<{
    tag: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
  }>;

  return (
    <section
      id="insights"
      className="py-28 px-6 md:px-10 border-t border-border bg-background"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-0.5 w-6 bg-accent" />
              <span className="eyebrow">{t("sectionLabel")}</span>
            </div>

            <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-5xl md:text-7xl text-foreground">
              {t("heading1")}{" "}
              <span className="text-accent">{t("headingAccent")}</span>
              {t("heading2") ? ` ${t("heading2")}` : ""}
            </h2>
          </div>

          {/* View all button */}
          <a
            href="#"
            className="font-display font-bold uppercase text-sm tracking-wider text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors shrink-0"
          >
            {t("viewAll")} ↗
          </a>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {articles.map((article, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <a
                href="#"
                className="group flex flex-col h-full bg-card rounded-none border border-border p-7 hover:border-accent transition-colors duration-300"
              >
                {/* Tag */}
                <div>
                  <span className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                    {article.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold uppercase text-2xl text-foreground leading-tight mt-5 group-hover:text-accent transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed mt-3 text-sm grow">
                  {article.excerpt}
                </p>

                {/* Footer meta */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="eyebrow text-muted-foreground">
                      {article.date}
                    </span>
                    <span className="eyebrow text-muted-foreground">
                      {article.readTime}
                    </span>
                  </div>
                  <span className="font-display font-bold uppercase text-xs tracking-wider text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    {t("readMore")} ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
