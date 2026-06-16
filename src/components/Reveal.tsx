"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

type Props = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Fade-and-rise on scroll into view. Reusable across every section.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
