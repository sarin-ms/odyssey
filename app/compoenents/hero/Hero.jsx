"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import horseImg from "@/public/assets/horse_half.png";
import heroBg from "@/public/assets/odyssey_hero.png";

export default function Hero() {
  return (
    <>
      {/* Fixed hero that stays behind everything */}
      <div className={styles.heroWrapper}>
        <section className={styles.heroSection} id="hero">
          <div className={styles.heroBg}>
            <Image
              src={heroBg}
              alt="Desert landscape with mountains and sun"
              fill
              priority
              className={styles.heroBgImage}
              sizes="100vw"
            />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <p
                className={`${styles.heroSubtitle} ${styles.animFadeUp} ${styles.animDelay1}`}
              >
                μLEARN CHN × IEDC BOOTCAMP CEC
              </p>
              <h1
                className={`${styles.heroTitle} ${styles.animFadeUp} ${styles.animDelay2}`}
              >
                ODESSEY
              </h1>
              <p
                className={`${styles.heroTagline} ${styles.animFadeUp} ${styles.animDelay3}`}
              >
                Endless Possibilities.
                <br />
                A Creative Expedition for Curious Minds.
              </p>
              <a
                href="#register"
                className={`${styles.heroCta} ${styles.animFadeUp} ${styles.animDelay4}`}
              >
                Register Now <span className={styles.ctaArrow}>→</span>
              </a>
            </div>

            <div className={`${styles.heroImageWrapper} ${styles.animFadeRight}`}>
              <Image
                src={horseImg}
                alt="Trojan horse wooden sculpture"
                priority
                className={styles.horseImage}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Spacer takes up the hero's space in document flow */}
      <div className={styles.heroSpacer} />
    </>
  );
}
