"use client";

import { useState } from "react";
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
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
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

            <div className="mt-10 flex flex-wrap items-center gap-5">
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

          <Reveal className="grid min-h-[400px] place-content-center overflow-visible py-6 md:min-h-[520px] md:py-8">
            <div className="relative mx-auto h-[380px] w-[min(100%,280px)] sm:w-[300px] md:-ml-[175px] md:mx-0 md:h-[450px] md:w-[350px]">
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
