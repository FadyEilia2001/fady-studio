import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All locales the site supports
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",

  // Always show the locale in the URL (e.g. /en, /ar)
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

// Layout direction per locale — used to set <html dir> and pick fonts.
export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};
