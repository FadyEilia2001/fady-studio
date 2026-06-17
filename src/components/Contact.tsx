"use client";

import Script from "next/script";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
    Cal?: unknown;
  }
}

function CalFloatingPopup() {
  return (
    <Script
      id="cal-floating-popup"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function (C, A, L) {
            let p = function (a, ar) { a.q.push(ar); };
            let d = C.document;
            C.Cal = C.Cal || function () {
              let cal = C.Cal;
              let ar = arguments;
              if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                d.head.appendChild(d.createElement("script")).src = A;
                cal.loaded = true;
              }
              if (ar[0] === L) {
                const api = function () { p(api, arguments); };
                const namespace = ar[1];
                api.q = api.q || [];
                if (typeof namespace === "string") {
                  cal.ns[namespace] = cal.ns[namespace] || api;
                  p(cal.ns[namespace], ar);
                  p(cal, ["initNamespace", namespace]);
                } else p(cal, ar);
                return;
              }
              p(cal, ar);
            };
          })(window, "https://app.cal.com/embed/embed.js", "init");

          Cal("init", "15min", { origin: "https://app.cal.com" });
          Cal.config = Cal.config || {};
          Cal.config.forwardQueryParams = true;
          Cal.ns["15min"]("floatingButton", {
            calLink: "fady-eilia-yc2jcd/15min",
            config: {
              layout: "month_view",
              useSlotsViewOnSmallScreen: "true"
            }
          });
          Cal.ns["15min"]("ui", {
            hideEventTypeDetails: false,
            layout: "month_view"
          });
        `,
      }}
    />
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-7 w-7 shrink-0 fill-current"
    >
      <path d="M16.02 3.2A12.7 12.7 0 0 0 5.05 22.3L3.2 29l6.86-1.8a12.68 12.68 0 0 0 5.96 1.52h.01A12.76 12.76 0 0 0 28.8 15.98 12.77 12.77 0 0 0 16.02 3.2Zm0 23.34h-.01a10.55 10.55 0 0 1-5.38-1.47l-.39-.23-4.07 1.07 1.09-3.97-.26-.41a10.51 10.51 0 1 1 9.02 5.01Zm5.77-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.68.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.18.21-.32.32-.53.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.32-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export default function Contact() {
  const t = useTranslations("Contact");
  const tallySrc = t("tallySrc");
  const [tallyLoaded, setTallyLoaded] = useState(false);

  return (
    <section
      id="contact"
      className="py-28 px-6 md:px-10 bg-dark text-dark-foreground"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left Column */}
          <div>
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block h-0.5 w-6 bg-accent" />
                <span className="font-mono text-eyebrow uppercase text-dark-muted">
                  {t("sectionLabel")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display font-black uppercase text-section text-balance">
                {t("heading1")}{" "}
                <span className="text-accent">{t("headingAccent")}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lead text-pretty text-dark-muted max-w-md mt-6">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-10">
              <div className="space-y-7">
                <a
                  href={t("bookingHref")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-accent px-7 py-4 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-foreground"
                >
                  {t("bookingCta")} ↗
                </a>

                <div className="grid gap-6">
                  <div>
                    <p className="font-mono text-eyebrow uppercase text-dark-muted mb-2">
                      {t("emailLabel")}
                    </p>
                    <a
                      href={`mailto:${t("email")}`}
                      className="font-display text-card-title text-dark-foreground hover:text-accent transition-colors"
                    >
                      {t("email")}
                    </a>
                  </div>

                  <div>
                    <p className="font-mono text-eyebrow uppercase text-dark-muted mb-2">
                      {t("whatsappLabel")}
                    </p>
                    <a
                      href={t("whatsappHref")}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 font-display text-card-title text-dark-foreground hover:text-accent transition-colors"
                    >
                      <WhatsAppIcon />
                      {t("whatsappCta")}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-lg border border-dark-border bg-white/[0.03] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-5">
              <Script
                src="https://tally.so/widgets/embed.js"
                strategy="afterInteractive"
                onLoad={() => window.Tally?.loadEmbeds()}
              />
              {!tallyLoaded ? (
                <div className="absolute inset-3 grid place-items-center rounded-md bg-dark/80 text-center text-dark-muted sm:inset-5">
                  <p className="font-mono text-eyebrow uppercase">
                    {t("formLoading")}
                  </p>
                </div>
              ) : null}
              <iframe
                key={tallySrc}
                src={tallySrc}
                data-tally-src={tallySrc}
                loading="lazy"
                width="100%"
                height="838"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title={t("formTitle")}
                onLoad={() => setTallyLoaded(true)}
                className="block w-full rounded-md bg-transparent"
              />
            </div>
          </Reveal>
        </div>
      </div>
      <CalFloatingPopup />
    </section>
  );
}
