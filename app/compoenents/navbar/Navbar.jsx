"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Prize", href: "#prize" },
  { label: "Partners", href: "#partners" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
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
        ODESSEY
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
    </nav>
  );
}
