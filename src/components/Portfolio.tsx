"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import Lightbox, { type LightboxItem } from "@/components/Lightbox";
import { projects } from "@/data/projects";

const PAGE_SIZE = 6;

export default function Portfolio() {
  const t = useTranslations("Work");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const items: LightboxItem[] = projects.map((p) => ({
    slug: p.slug,
    imageUrl: p.imageUrl,
    title: t(`projects.${p.slug}.title`),
    status: p.status,
  }));

  const pageCount = Math.ceil(projects.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const visible = projects.slice(start, start + PAGE_SIZE);

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

        {/* Heading */}
        <Reveal delay={0.1} className="mb-12 max-w-3xl">
          <h2 className="font-display text-section font-black uppercase text-balance text-foreground">
            {t("heading1")}{" "}
            <span className="text-accent">{t("headingAccent")}</span>{" "}
            {t("heading2")}
          </h2>
        </Reveal>

        {/* Gallery grid — up to 6 tiles per page; each opens the lightbox */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, localIndex) => {
            const index = start + localIndex;
            return (
              <Reveal key={project.slug} delay={(localIndex % 3) * 0.08}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`${items[index].title} — ${t("openProject")}`}
                  className="group relative block aspect-[3/2] w-full overflow-hidden rounded-lg bg-card"
                >
                  <Image
                    src={project.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Bottom-only scrim — keeps the work bright and visible while
                      the title/category stay legible. No full-image tint. */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark/85 to-transparent"
                    aria-hidden="true"
                  />

                  {/* Concept badge */}
                  {project.status === "concept" && (
                    <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-dark/40 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-white backdrop-blur-sm">
                      {t("conceptTag")}
                    </span>
                  )}

                  {/* Title + category */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-5 text-start">
                    <span
                      className="font-mono text-[0.65rem] uppercase tracking-[0.2em]"
                      style={{ color: project.color }}
                    >
                      {t(`projects.${project.slug}.category`)}
                    </span>
                    <span className="font-display text-card-title font-bold uppercase leading-none text-white">
                      {items[index].title}
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Pagination — keeps the homepage to 6 projects per page */}
        {pageCount > 1 && (
          <div className="mt-12 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label={t("prevPage")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-35"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: pageCount }).map((_, p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  aria-label={`${t("page")} ${p + 1}`}
                  aria-current={p === page}
                  className={`font-mono text-sm tracking-widest transition-colors ${
                    p === page
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {String(p + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page === pageCount - 1}
              aria-label={t("nextPage")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-35"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        labels={{ close: t("close"), prev: t("prev"), next: t("next") }}
      />
    </section>
  );
}
