"use client";

import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";

import { SiteLogo } from "@/components/layout/site-logo";
import { ScheduleCallLink } from "@/components/ui/schedule-call-link";
import { primaryNavigation, projectNavigation } from "@/lib/navigation";

const menuId = "site-menu-panel";

type MenuPanelProps = {
  onClose: () => void;
};

function MenuPanel({ onClose }: MenuPanelProps) {
  return (
    <div className="menu-panel__inner">
      <div className="menu-panel__topbar">
        <SiteLogo onNavigate={onClose} />
        <button
          type="button"
          className="menu-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>

      <div className="menu-panel__content">
        <div>
          <p className="menu-eyebrow">Navigate</p>
          <nav aria-label="Primary navigation">
            <ul className="menu-links" role="list">
              {primaryNavigation.map((item, index) => (
                <li key={item.href} style={{ "--menu-index": index } as React.CSSProperties}>
                  <Link href={item.href} onClick={onClose}>
                    <span>{item.label}</span>
                    <ArrowUpRight aria-hidden="true" size={22} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="menu-panel__aside">
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
        </div>
      </div>

      <div className="menu-panel__footer">
        <a href="mailto:info@zenticsys.com">info@zenticsys.com</a>
        <span>Automotive digital products</span>
      </div>
    </div>
  );
}

export function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setOpen(false);

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
        <Menu aria-hidden="true" size={20} />
      </button>

      <div
        className="menu-overlay"
        data-state={open ? "open" : "closed"}
        aria-hidden="true"
        onPointerDown={closeMenu}
      />

      {open ? (
        <RemoveScroll enabled allowPinchZoom>
          <FocusScope
            trapped
            loop
            onUnmountAutoFocus={(event) => {
              event.preventDefault();
              triggerRef.current?.focus();
            }}
          >
            <DismissableLayer
              asChild
              disableOutsidePointerEvents
              onEscapeKeyDown={closeMenu}
              onPointerDownOutside={closeMenu}
            >
              <section
                id={menuId}
                className="menu-panel"
                data-state="open"
                role="dialog"
                aria-modal="true"
                aria-labelledby="site-menu-title"
              >
                <h2 id="site-menu-title" className="visually-hidden">
                  Site navigation
                </h2>
                <MenuPanel onClose={closeMenu} />
              </section>
            </DismissableLayer>
          </FocusScope>
        </RemoveScroll>
      ) : (
        <section
          id={menuId}
          className="menu-panel"
          data-state="closed"
          aria-hidden="true"
          inert
        >
          <MenuPanel onClose={closeMenu} />
        </section>
      )}
    </>
  );
}
