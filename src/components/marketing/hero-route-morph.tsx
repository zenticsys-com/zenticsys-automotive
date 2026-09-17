"use client";

import { motion, useReducedMotion } from "motion/react";

const routePath =
  "M40 170 C140 40 260 40 360 160 C460 280 580 280 680 150 C780 20 900 40 1040 170";
const vehiclePath =
  "M40 170 C160 170 220 170 320 160 C430 150 520 60 650 60 C760 60 820 130 900 150 C950 165 1000 170 1040 170";

export function HeroRouteMorph() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className="hero-route-morph"
      viewBox="0 0 1080 320"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-route-gradient" x1="0" x2="1">
          <stop offset="0" stopColor="#ef3d23" stopOpacity="0" />
          <stop offset="0.38" stopColor="#f25a42" stopOpacity="0.72" />
          <stop offset="0.72" stopColor="#ffb14a" stopOpacity="0.56" />
          <stop offset="1" stopColor="#287f88" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={routePath}
        fill="none"
        stroke="url(#hero-route-gradient)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={
          reduceMotion
            ? { d: routePath, pathLength: 1, opacity: 0.38 }
            : {
                d: [routePath, vehiclePath, routePath],
                pathLength: [0.2, 1, 1],
                opacity: [0.2, 0.62, 0.28],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                d: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                pathLength: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              }
        }
      />
    </svg>
  );
}
