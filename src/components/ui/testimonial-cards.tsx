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

function getClientX(event: MouseEvent | TouchEvent | PointerEvent) {
  if ("clientX" in event) return event.clientX;
  return event.changedTouches[0]?.clientX ?? 0;
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
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0",
      }}
      animate={
        reduce
          ? {
              rotate: "0deg",
              x: position === "front" ? "0%" : position === "middle" ? "18%" : "36%",
            }
          : {
              rotate:
                position === "front"
                  ? "-6deg"
                  : position === "middle"
                    ? "0deg"
                    : "6deg",
              x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
            }
      }
      drag={isFront && !reduce}
      dragElastic={0.35}
      dragListener={isFront && !reduce}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={(e) => {
        dragRef.current = getClientX(e);
      }}
      onDragEnd={(e) => {
        if (dragRef.current - getClientX(e) > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: reduce ? 0 : 0.35 }}
      className={`absolute left-0 top-0 flex h-[450px] w-[350px] select-none flex-col overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-800/25 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      aria-label={`${label}: ${author}`}
    >
      <div className="relative h-40 w-full overflow-hidden border-b-2 border-slate-700 bg-slate-900">
        <img
          src={image}
          alt=""
          className="pointer-events-none h-full w-full object-cover opacity-85"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/40 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
          {label}
        </span>
        <span className="absolute bottom-5 right-5 font-mono text-xs tracking-[0.2em] text-slate-300">
          0{id}
        </span>
      </div>

      <div className="grid grow place-content-center space-y-6 p-6 text-center">
        <span className="text-lg italic leading-relaxed text-slate-300">
          &quot;{testimonial}&quot;
        </span>
        <span className="font-display text-3xl font-bold uppercase leading-none text-indigo-300">
          {author}
        </span>
        <span className="text-sm font-medium text-slate-400">{meta}</span>
      </div>
    </motion.div>
  );
}
