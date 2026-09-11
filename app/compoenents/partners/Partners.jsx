"use client";

import { useRef } from "react";
import Image from "next/image";
import useRevealOnScroll from "@/app/hooks/useRevealOnScroll";
import styles from "./Partners.module.css";

const ORGANIZER_LOGOS = [
  
  {
    src: "/assets/iedc.svg",
    alt: "IEDC BOOTCAMP CEC logo",
    label: "IEDC BOOTCAMP CEC",
    w: 122,
    h: 73,
  },
  {
    src: "/assets/mulearn.webp",
    alt: "μLearn CHN logo",
    label: "μLearn CHN",
    w: 159,
    h: 55,
  },
];

const GOOGLE_LOGO = {
  src: "/assets/google.webp",
  alt: "Google for Developers logo",
  label: "Google for Developers",
  w: 1376,
  h: 204,
};

export default function Partners() {
  const sectionRef = useRef(null);
  const visible = useRevealOnScroll(sectionRef);

  const v = visible ? styles.visible : "";

  return (
    <section className={styles.partnersSection} id="partners" ref={sectionRef}>
      <div className={styles.partnersInner}>
        <div className={styles.header}>
          <div
            className={`${styles.badgeWrapper} ${styles.fadeUp} ${v} ${styles.delay1}`}
          >
            <span className={styles.badgeText}>PARTNERS</span>
            <span className={styles.badgeLine} />
          </div>
          <h2
            className={`${styles.sectionTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}
          >
            <span className={styles.titleLineOne}>Powered by Google.</span>
            <span className={styles.titleLineTwo}>Driven by Innovation.</span>
          </h2>
        </div>

        <div
          className={`${styles.partnersGrid} ${styles.fadeUp} ${v} ${styles.delay4}`}
        >
          <div className={styles.partnerCategory}>
            <h3 className={styles.categoryTitle}>Organizers</h3>
            <div className={styles.logoRow}>
              {ORGANIZER_LOGOS.map((logo) => (
                <div key={logo.label} className={styles.logoCard}>
                  <div className={styles.logoPlaque}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.w}
                      height={logo.h}
                      className={styles.logoImage}
                    />
                  </div>
                  <p className={styles.logoLabel}>{logo.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.partnerCategory}>
            <h3 className={styles.categoryTitle}>Technology Partner</h3>
            <div className={styles.logoRow}>
              <div className={`${styles.logoCard} ${styles.logoCardWide}`}>
                <div className={`${styles.logoPlaque} ${styles.logoPlaqueDark}`}>
                  <Image
                    src={GOOGLE_LOGO.src}
                    alt={GOOGLE_LOGO.alt}
                    width={GOOGLE_LOGO.w}
                    height={GOOGLE_LOGO.h}
                    className={`${styles.logoImage} ${styles.logoImageWide}`}
                  />
                </div>
                <p className={styles.logoLabel}>{GOOGLE_LOGO.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
