"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

export default function Portfolio() {
  const t = useTranslations("Work");
  const [active, setActive] = useState(0);

  return (
    <section
      id="work"
      className="border-t border-border bg-background py-28 px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Eyebrow */}
        <Reveal className="mb-6 flex items-center gap-3">
          <span className="inline-block h-0.5 w-6 bg-accent" />
          <span className="eyebrow">{t("sectionLabel")}</span>
        </Reveal>

        {/* Heading row */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-foreground md:text-7xl">
              {t("heading1")}{" "}
              <span className="text-accent">{t("headingAccent")}</span>{" "}
              {t("heading2")}
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              href="/work"
              className="flex shrink-0 items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("viewAll")} <span>↗</span>
            </Link>
          </Reveal>
        </div>

        {/* Accordion gallery */}
        <Reveal delay={0.15}>
          <div className="flex h-auto flex-col gap-2 md:h-[560px] md:flex-row">
            {projects.map((project, i) => {
              const isActive = active === i;
              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  style={{ flexGrow: isActive ? 5 : 1 }}
                  className="group relative h-72 overflow-hidden rounded-lg transition-[flex-grow] duration-500 ease-out md:h-full"
                >
                  {/* Image */}
                  <Image
                    src={project.imageUrl}
                    alt={t(`projects.${project.slug}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Color + dark overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to top, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.45) 45%, rgba(10,15,30,0.15) 100%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply transition-opacity duration-500"
                    style={{
                      background: project.color,
                      opacity: isActive ? 0.15 : 0.35,
                    }}
                  />

                  {/* Year — top corner */}
                  <span className="absolute top-5 left-5 font-mono text-xs tracking-widest text-white/70">
                    {project.year}
                  </span>

                  {/* Content — bottom */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-8">
                    <span
                      className="font-mono text-[0.65rem] uppercase tracking-[0.2em]"
                      style={{ color: project.color }}
                    >
                      {t(`projects.${project.slug}.category`)}
                    </span>
                    <h3 className="font-display text-2xl font-bold uppercase leading-none text-white md:text-3xl">
                      {t(`projects.${project.slug}.title`)}
                    </h3>

                    {/* Details revealed when active */}
                    <div
                      className="grid transition-all duration-500"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-md pt-2 text-sm leading-relaxed text-white/80">
                          {t(`projects.${project.slug}.description`)}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          <span className="font-display text-lg font-bold text-white">
                            {t(`projects.${project.slug}.metric`)}
                          </span>
                          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-white/70">
                            {t("caseStudy")} ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>

        {/* Count strip */}
        <Reveal
          delay={0.2}
          className="mt-6 flex items-center justify-between border-t border-border pt-4"
        >
          <p className="eyebrow opacity-50">{t("hoverHint")}</p>
          <p className="eyebrow opacity-50">
            {t("projectsCount", { count: projects.length })}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
