"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function TrustedBy() {
  const t = useTranslations("TrustedBy");
  const clients = t.raw("clients") as string[];

  return (
    <section className="border-y border-border bg-background py-12 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="eyebrow text-muted-foreground">{t("label")}</span>
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
            {clients.map((name, i) => (
              <span key={name} className="flex items-center gap-6">
                <span className="font-display font-black uppercase text-2xl md:text-4xl text-foreground">
                  {name}
                </span>
                {i < clients.length - 1 && (
                  <span className="hidden md:inline-block h-px w-8 bg-accent shrink-0" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{t("suffix")}</p>
        </Reveal>
      </div>
    </section>
  );
}
