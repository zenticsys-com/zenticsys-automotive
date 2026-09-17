"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionReveal({
  children,
  className = "",
  delay = 0,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    if (bounds.top > window.innerHeight * 0.92) {
      setEnhanced(true);
    }
  }, [reduceMotion]);

  const shouldPrepare = enhanced && !inView;

  return (
    <motion.div
      ref={ref}
      className={`motion-reveal ${className}`.trim()}
      initial={false}
      animate={
        shouldPrepare
          ? { opacity: 0, y: 24, filter: "blur(7px)" }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.72,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-motion-state={shouldPrepare ? "prepared" : "visible"}
    >
      {children}
    </motion.div>
  );
}
