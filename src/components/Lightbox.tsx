"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type LightboxItem = {
  slug: string;
  imageUrl: string;
  title: string;
  status: "live" | "concept";
};

type Props = {
  items: LightboxItem[];
  /** Active item index, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  labels: { close: string; prev: string; next: string };
};

/**
 * Full-screen image lightbox. One picture per project; arrows / ← → keys move
 * between projects, Esc or a backdrop click closes. Rendered through a portal so
 * it escapes the gallery's stacking context, with a focus trap and scroll lock.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
  labels,
}: Props) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  // Client-only flag (SSR-safe, no setState-in-effect) so the portal never
  // references `document` on the server.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const open = index !== null;
  const count = items.length;

  const go = useCallback(
    (dir: number) => {
      if (index === null || count === 0) return;
      onIndexChange((index + dir + count) % count);
    },
    [index, count, onIndexChange],
  );

  // While open: lock scroll, wire keyboard (Esc / arrows / Tab-trap), focus in.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const f = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(
      () => dialogRef.current?.querySelector<HTMLElement>("button")?.focus(),
      60,
    );
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, go, onClose]);

  if (!isClient) return null;

  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.1 : 0.25, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-dark/95 px-4 py-16 backdrop-blur-xl sm:px-16"
        >
          {/* Close */}
          <button
            type="button"
            aria-label={labels.close}
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-dark/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Prev / Next (hidden when only one item) */}
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label={labels.prev}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-dark/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white sm:left-5"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={labels.next}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-dark/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white sm:right-5"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Image + title — re-mounts per project for a soft crossfade */}
          <motion.figure
            key={item.slug}
            initial={reduce ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-5xl flex-col items-center gap-5"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-black/40">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 92vw, 1024px"
                className="object-contain"
              />
            </div>
            <figcaption className="flex items-center gap-4">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-dark-foreground md:text-3xl">
                {item.title}
              </h2>
              {count > 1 && (
                <span className="font-mono text-xs tracking-widest text-dark-muted">
                  {index! + 1} / {count}
                </span>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
