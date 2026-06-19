"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function TrustedBy() {
  const t = useTranslations("TrustedBy");
  const logos = t.raw("logos") as string[];

  return (
    <section className="border-y border-border bg-background py-10 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <Reveal delay={0} className="shrink-0 text-center md:text-start">
          <span className="eyebrow text-muted-foreground">{t("label")}</span>
        </Reveal>

        <div className="grid w-full grid-cols-2 place-items-center gap-x-10 gap-y-6 md:flex md:w-auto md:flex-wrap md:place-items-stretch md:gap-12">
          {logos.map((name, i) => {
            const isLoneLast =
              logos.length % 2 !== 0 && i === logos.length - 1;

            return (
              <Reveal
                key={name}
                delay={0.05 * (i + 1)}
                className={
                  isLoneLast ? "col-span-2 md:col-span-1" : undefined
                }
              >
                <span className="font-display font-semibold text-lg md:text-2xl text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default select-none whitespace-nowrap">
                  {name}
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
