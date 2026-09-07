"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Organizers", href: "#organizers" },
  { label: "Prize", href: "#prize" },
  { label: "Structure", href: "#structure" },
  { label: "Schedule", href: "#schedule" },
  { label: "Partners", href: "#partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      id="main-nav"
    >
      <a href="#" className={styles.navLogo}>
        ODYSSEY
      </a>

      <ul
        className={`${styles.navLinks} ${
          mobileOpen ? styles.mobileOpen : ""
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={styles.navLink}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#register" className={styles.registerBtn}>
            Register →
          </a>
        </li>
      </ul>

      <button
        className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.open : ""}`}
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      {/* Scroll Progress Bar along bottom of Navbar */}
      <div
        className={`${styles.progressBarTrack} ${
          scrollProgress > 0 ? styles.progressVisible : ""
        }`}
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
