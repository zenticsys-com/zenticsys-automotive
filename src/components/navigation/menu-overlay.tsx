"use client";

import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { SiteLogo } from "@/components/layout/site-logo";
import { ScheduleCallLink } from "@/components/ui/schedule-call-link";
import { primaryNavigation, projectNavigation } from "@/lib/navigation";

const menuId = "site-menu-panel";
const premiumEase = [0.22, 1, 0.36, 1] as const;

function MenuScrollLock({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, []);

  return children;
}

const linkVariants = {
  closed: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
    transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] as const },
  },
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.32, ease: premiumEase },
  },
};

type MenuGlyphProps = {
  open: boolean;
};

function MenuGlyph({ open }: MenuGlyphProps) {
  return (
    <span className="menu-glyph" aria-hidden="true">
      <motion.span
        animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: premiumEase }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: premiumEase }}
      />
    </span>
  );
}

type MenuPanelProps = {
  onClose: () => void;
};

function MenuPanel({ onClose }: MenuPanelProps) {
  return (
    <div className="menu-panel__inner">
      <motion.div className="menu-panel__topbar" variants={linkVariants}>
        <SiteLogo onNavigate={onClose} />
        <button
          type="button"
          className="menu-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <MenuGlyph open />
        </button>
      </motion.div>

      <div className="menu-panel__content">
        <div>
          <motion.p className="menu-eyebrow" variants={linkVariants}>
            Navigate
          </motion.p>
          <nav aria-label="Primary navigation">
            <motion.ul className="menu-links" role="list">
              {primaryNavigation.map((item) => (
                <motion.li key={item.href} variants={linkVariants}>
                  <Link href={item.href} onClick={onClose}>
                    <span>{item.label}</span>
                    <ArrowUpRight aria-hidden="true" size={22} />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </div>

        <motion.div className="menu-panel__aside" variants={linkVariants}>
          <p className="menu-eyebrow">Start a project</p>
          <p className="menu-panel__prompt">
            Have an automotive product, platform, or website in motion?
          </p>
          <ScheduleCallLink onNavigate={onClose} />
          <div className="menu-panel__secondary-links">
            {projectNavigation
              .filter((item) => item.href !== "/schedule-a-call")
              .map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              ))}
          </div>
        </motion.div>
      </div>

      <motion.div className="menu-panel__footer" variants={linkVariants}>
        <a href="mailto:info@zenticsys.com">info@zenticsys.com</a>
        <span>Automotive digital products</span>
      </motion.div>
    </div>
  );
}

export function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setOpen(false);
  const duration = reduceMotion ? 0.01 : 0.56;

  const panelVariants = {
    closed: {
      opacity: 0,
      scaleX: reduceMotion ? 1 : 0.2,
      scaleY: reduceMotion ? 1 : 0.08,
      x: reduceMotion ? 0 : "34%",
      y: reduceMotion ? 0 : -12,
      borderRadius: reduceMotion ? 18 : 30,
      filter: reduceMotion ? "blur(0px)" : "blur(9px)",
      transition: {
        duration: reduceMotion ? 0.01 : 0.42,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "afterChildren" as const,
        staggerChildren: reduceMotion ? 0 : 0.025,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      borderRadius: 18,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: premiumEase,
        delayChildren: reduceMotion ? 0 : 0.12,
        staggerChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="menu-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <MenuGlyph open={open} />
      </button>

      <AnimatePresence
        initial={false}
        onExitComplete={() => triggerRef.current?.focus()}
      >
        {open ? (
          <MenuScrollLock>
            <div className="menu-motion-root">
              <motion.div
                className="menu-overlay"
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(28px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: reduceMotion ? 0.01 : 0.38 }}
                onPointerDown={closeMenu}
              />
              <FocusScope trapped loop>
                <DismissableLayer
                  asChild
                  disableOutsidePointerEvents
                  onEscapeKeyDown={closeMenu}
                  onPointerDownOutside={closeMenu}
                >
                  <motion.section
                    id={menuId}
                    className="menu-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="site-menu-title"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={panelVariants}
                  >
                    <h2 id="site-menu-title" className="visually-hidden">
                      Site navigation
                    </h2>
                    <MenuPanel onClose={closeMenu} />
                  </motion.section>
                </DismissableLayer>
              </FocusScope>
            </div>
          </MenuScrollLock>
        ) : null}
      </AnimatePresence>
    </>
  );
}
