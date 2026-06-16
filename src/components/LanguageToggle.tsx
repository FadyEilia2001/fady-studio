"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useTransition } from "react";

/**
 * Glass pill that switches the active locale while preserving the current
 * path. Reusable anywhere in the site — drop `<LanguageToggle />` in.
 */
export default function LanguageToggle() {
  const t = useTranslations("LanguageToggle");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    // `pathname` here is locale-agnostic; the router re-applies the new locale.
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      aria-label={t("label")}
      className="flex items-center gap-1 rounded-full border border-white/30 bg-white/10 p-1 text-xs font-medium tracking-widest text-white backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          disabled={isPending}
          onClick={() => switchTo(loc)}
          aria-current={loc === locale}
          className={`rounded-full px-2.5 py-1 transition-colors duration-200 ${
            loc === locale
              ? "bg-white text-[#0A0F1E]"
              : "text-white/70 hover:text-white"
          }`}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
