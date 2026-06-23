"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import {
  TestimonialCard,
  type CardPosition,
} from "@/components/ui/testimonial-cards";

export default function Insights() {
  const t = useTranslations("Insights");
  const services = t.raw("services") as Array<{
    tag: string;
    title: string;
    excerpt: string;
    meta: string;
    outcome: string;
    image: string;
  }>;
  const [positions, setPositions] = useState<CardPosition[]>([
    "front",
    "middle",
    "back",
  ]);

  const handleShuffle = () => {
    setPositions((current) => {
      const next = [...current];
      const last = next.pop();
      if (last) next.unshift(last);
      return next;
    });
  };

  return (
    <section
      id="insights"
      className="overflow-x-clip border-t border-slate-800 bg-slate-900 px-6 py-28 text-slate-50 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ── DESKTOP layout: text left, flat 3-col cards right ── */}
        <div className="hidden lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
          {/* Left — copy */}
          <div className="sticky top-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-0.5 w-6 bg-accent" />
              <span className="eyebrow text-slate-400">{t("sectionLabel")}</span>
            </div>
            <h2 className="font-display font-black uppercase text-section text-balance text-slate-50">
              {t("heading1")}{" "}
              <span className="text-accent">{t("headingAccent")}</span>
              {t("heading2") ? ` ${t("heading2")}` : ""}
            </h2>
            <p className="mt-6 max-w-sm text-lead text-slate-300">
              {t("intro")}
            </p>
            <a
              href="#contact"
              className="mt-10 inline-flex font-display font-bold uppercase text-sm tracking-wider text-slate-300 hover:text-white items-center gap-2 transition-colors"
            >
              {t("cta")} ↗
            </a>
          </div>

          {/* Right — flat 3-col cards */}
          <div className="grid grid-cols-3 gap-4">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 backdrop-blur-sm h-full">
                  {/* Image */}
                  <div className="relative h-36 w-full shrink-0 overflow-hidden bg-slate-900">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="25vw"
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-slate-950/40 px-2.5 py-0.5 text-xs font-medium text-slate-200 backdrop-blur-md">
                      {service.tag}
                    </span>
                    <span className="absolute bottom-3 right-3 font-mono text-xs tracking-[0.2em] text-slate-400">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <p className="text-sm italic leading-relaxed text-slate-300">
                      &ldquo;{service.excerpt}&rdquo;
                    </p>
                    <span className="font-display text-lg font-bold uppercase leading-tight text-indigo-300 mt-auto">
                      {service.title}
                    </span>
                    <span className="text-xs text-slate-400">
                      {service.meta} / {service.outcome}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── MOBILE layout: text + swipeable card stack ── */}
        <div className="lg:hidden">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-0.5 w-6 bg-accent" />
              <span className="eyebrow text-slate-400">{t("sectionLabel")}</span>
            </div>
            <h2 className="font-display font-black uppercase text-section text-balance text-slate-50">
              {t("heading1")}{" "}
              <span className="text-accent">{t("headingAccent")}</span>
              {t("heading2") ? ` ${t("heading2")}` : ""}
            </h2>
            <p className="mt-6 max-w-xl text-lead text-slate-300">
              {t("intro")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#contact"
                className="font-display font-bold uppercase text-sm tracking-wider text-slate-300 hover:text-white flex items-center gap-2 transition-colors shrink-0"
              >
                {t("cta")} ↗
              </a>
              <button
                type="button"
                onClick={handleShuffle}
                className="rounded-full border border-slate-700 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:border-accent hover:text-white"
              >
                {t("shuffle")}
              </button>
            </div>
          </div>

          <Reveal className="grid min-h-[400px] place-content-center overflow-visible py-6">
            <div className="relative mx-auto h-[380px] w-[280px] sm:w-[300px]">
              {services.map((service, index) => (
                <TestimonialCard
                  key={service.title}
                  id={index + 1}
                  testimonial={service.excerpt}
                  author={service.title}
                  label={service.tag}
                  meta={`${service.meta} / ${service.outcome}`}
                  image={service.image}
                  handleShuffle={handleShuffle}
                  position={positions[index]}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
