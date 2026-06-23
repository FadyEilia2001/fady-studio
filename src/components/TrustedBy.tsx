"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function TrustedBy() {
  const t = useTranslations("TrustedBy");

  return (
    <section className="border-y border-border bg-background py-10 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <p className="text-center font-display text-lg md:text-xl text-muted-foreground">
            {t("trust")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
