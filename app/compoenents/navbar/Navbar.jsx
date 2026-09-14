"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Organizers", href: "#organizers" },
  { label: "Prize", href: "#prize" },
  { label: "Structure", href: "#structure" },
  { label: "Schedule", href: "#schedule" },
  { label: "Partners", href: "#partners" },
  { label: "FAQ", href: "#faq" },
];

const MOBILE_QUERY = "(max-width: 900px)";

export default function Navbar() {
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      const marker = scrollTop + Math.min(window.innerHeight * 0.34, 320);
      let nextActive = "";

      for (const item of NAV_ITEMS) {
        const section = document.querySelector(item.href);
        if (section && section.offsetTop <= marker) nextActive = item.href;
      }

      setScrolled((current) => {
        const next = scrollTop > 40;
        return current === next ? current : next;
      });
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setActiveHref((current) =>
        current === nextActive ? current : nextActive,
      );
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const focusFrame = requestAnimationFrame(() => {
      menuRef.current?.querySelector("a")?.focus();
    });

    document.body.style.overflow = "hidden";

    const closeAndRestoreFocus = () => {
      setMobileOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndRestoreFocus();
        return;
      }

      if (event.key !== "Tab") return;

      const links = Array.from(menuRef.current?.querySelectorAll("a") ?? []);
      const focusable = [menuButtonRef.current, ...links].filter(Boolean);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleViewportChange = (event) => {
      if (!event.matches) setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    mobileQuery.addEventListener("change", handleViewportChange);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      mobileQuery.removeEventListener("change", handleViewportChange);
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      id="main-nav"
      aria-label="Primary navigation"
    >
      <a href="#hero" className={styles.navLogo} onClick={closeMenu}>
        ODYSSEY
      </a>

      <button
        ref={menuButtonRef}
        type="button"
        className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.open : ""}`}
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        aria-controls="primary-navigation-links"
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      <button
        type="button"
        className={`${styles.menuBackdrop} ${mobileOpen ? styles.backdropOpen : ""}`}
        onClick={() => {
          setMobileOpen(false);
          requestAnimationFrame(() => menuButtonRef.current?.focus());
        }}
        aria-label="Close navigation menu"
        tabIndex={-1}
      />

      <ul
        ref={menuRef}
        id="primary-navigation-links"
        className={`${styles.navLinks} ${mobileOpen ? styles.mobileOpen : ""}`}
      >
        {NAV_ITEMS.map((item) => {
          const active = activeHref === item.href;

          return (
            <li key={item.label}>
              <a
                href={item.href}
                className={`${styles.navLink} ${active ? styles.activeNavLink : ""}`}
                aria-current={active ? "location" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          );
        })}
        <li>
          <a
            href="https://makemypass.com/event/odyssey"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.registerBtn}
            onClick={closeMenu}
          >
            Register <span aria-hidden="true">→</span>
          </a>
        </li>
      </ul>

      <div
        className={`${styles.progressBarTrack} ${scrollProgress > 0 ? styles.progressVisible : ""}`}
        aria-hidden="true"
      >
        <div
          className={styles.progressBarFill}
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>
    </nav>
  );
}
