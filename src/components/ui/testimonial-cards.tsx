"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export type CardPosition = "front" | "middle" | "back";

export type TestimonialCardProps = {
  handleShuffle: () => void;
  testimonial: string;
  position: CardPosition;
  id: number;
  author: string;
  image: string;
  label: string;
  meta: string;
};

const CARD_SPRING = { type: "spring", stiffness: 280, damping: 30 } as const;

function getClientX(event: MouseEvent | TouchEvent | PointerEvent) {
  if ("clientX" in event) return event.clientX;
  return event.changedTouches[0]?.clientX ?? 0;
}

function useMobileStack() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
}

function getStackMotion(
  position: CardPosition,
  mobile: boolean,
  reduce: boolean | null,
) {
  if (reduce) {
    const x = mobile
      ? position === "front"
        ? 0
        : position === "middle"
          ? 16
          : 32
      : position === "front"
        ? 0
        : position === "middle"
          ? 63
          : 126;

    return { rotate: 0, x };
  }

  if (mobile) {
    return {
      rotate: position === "front" ? -3 : position === "middle" ? 0 : 3,
      x: position === "front" ? 0 : position === "middle" ? 20 : 40,
    };
  }

  return {
    rotate: position === "front" ? -6 : position === "middle" ? 0 : 6,
    x:
      position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
  };
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
  image,
  label,
  meta,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const reduce = useReducedMotion();
  const mobile = useMobileStack();
  const isFront = position === "front";
  const stackMotion = getStackMotion(position, mobile, reduce);

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0",
      }}
      animate={stackMotion}
      drag={isFront && !reduce ? "x" : false}
      dragElastic={0.2}
      dragMomentum={false}
      dragSnapToOrigin
      dragConstraints={{ left: -240, right: 40, top: 0, bottom: 0 }}
      onDragStart={(e) => {
        dragRef.current = getClientX(e);
      }}
      onDragEnd={(e) => {
        const threshold = mobile ? 80 : 120;
        if (dragRef.current - getClientX(e) > threshold) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      whileDrag={reduce ? undefined : { scale: 1.015, rotate: -2 }}
      transition={reduce ? { duration: 0 } : CARD_SPRING}
      className={`absolute inset-0 flex select-none flex-col overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-800/25 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      aria-label={`${label}: ${author}`}
    >
      <div className="relative h-32 w-full overflow-hidden border-b-2 border-slate-700 bg-slate-900 md:h-40">
        <img
          src={image}
          alt=""
          className="pointer-events-none h-full w-full object-cover opacity-85"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/40 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md md:left-5 md:top-5">
          {label}
        </span>
        <span className="absolute bottom-4 right-4 font-mono text-xs tracking-[0.2em] text-slate-300 md:bottom-5 md:right-5">
          0{id}
        </span>
      </div>

      <div className="grid grow place-content-center space-y-4 p-5 text-center md:space-y-6 md:p-6">
        <span className="text-base italic leading-relaxed text-slate-300 md:text-lg">
          &quot;{testimonial}&quot;
        </span>
        <span className="font-display text-xl font-bold uppercase leading-tight text-indigo-300 md:text-3xl md:leading-none">
          {author}
        </span>
        <span className="text-sm font-medium text-slate-400">{meta}</span>
      </div>
    </motion.div>
  );
}
