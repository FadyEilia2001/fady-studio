"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function TrustedBy() {
  const t = useTranslations("TrustedBy");
  const logos = t.raw("logos") as string[];

  return (
    <section className="border-y border-border bg-background py-8 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <Reveal delay={0} className="shrink-0">
          <span className="eyebrow text-muted-foreground">{t("label")}</span>
        </Reveal>

        <div className="flex flex-wrap gap-8 md:gap-12">
          {logos.map((name, i) => (
            <Reveal key={name} delay={0.05 * (i + 1)}>
              <span className="font-display font-semibold text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default select-none">
                {name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
