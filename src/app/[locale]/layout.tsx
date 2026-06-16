import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, Space_Mono, Cairo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, localeDirection, type Locale } from "@/i18n/routing";
import "../globals.css";

// Display font — condensed, bold, used for headings.
const barlow = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
});

// Body font.
const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

// Mono font — used for eyebrow labels and metadata.
const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Arabic-capable font, applied for every role when the locale is Arabic.
const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Fady Eilia",
  description: "Apps, automation, and experiences that drive growth.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const dir = localeDirection[locale as Locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${barlow.variable} ${dmSans.variable} ${spaceMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
