"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SPRING = { type: "spring", stiffness: 80, damping: 18 } as const;

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full overflow-hidden">
      {/* LEFT PANEL */}
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={SPRING}
        className="relative flex w-1/2 overflow-hidden bg-[#F0EFEA]"
      >
        <Image
          src="/assets/darkHeroLeft-upscaled-20260615-223244.webp"
          alt="Fady Eilia"
          fill
          priority
          className="object-cover object-right"
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 pb-16 pt-24">
          {/* Tagline */}
          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-6"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-medium text-[#1A1A1A]">
              APPS. AUTOMATION. RESULTS.
            </p>
            <div className="mt-2 h-[2px] w-8 bg-[#FF4500]" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={0.82}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-6 text-5xl font-black uppercase leading-[1.05] tracking-tight text-[#1A1A1A] xl:text-6xl"
          >
            I BUILD THINGS THAT MAKE YOUR BUSINESS{" "}
            <span className="text-[#FF4500]">WORK HARDER.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={0.94}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-10 max-w-xs text-sm leading-relaxed text-[#666666]"
          >
            From phone apps to website automation — I help you reach more
            customers and build a reputation that sticks.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={1.06}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-3 rounded-none bg-[#1A1A1A] px-7 py-4 text-xs tracking-widest font-medium uppercase text-white hover:bg-[#FF4500] transition-colors duration-300"
            >
              SEE MY WORK <span className="text-base">↗</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={SPRING}
        className="relative flex w-1/2 overflow-hidden bg-[#0A0F1E]"
      >
        <Image
          src="/assets/darkHeroRight-upscaled-20260615-223839.webp"
          alt=""
          fill
          priority
          className="object-cover object-left"
        />
      </motion.div>
    </section>
  );
}
