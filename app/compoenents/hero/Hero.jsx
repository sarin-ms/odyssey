"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import horseImg from "@/public/assets/horse_half.png";
import heroBg from "@/public/assets/odyssey_hero.png";

export default function Hero() {
  return (
    <>
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
                IEDC BOOTCAMP CEC × μLEARN CHN
              </p>
              <h1
                className={`${styles.heroTitle} ${styles.animFadeUp} ${styles.animDelay2}`}
              >
                ODYSSEY
              </h1>
              <p
                className={`${styles.heroTagline} ${styles.animFadeUp} ${styles.animDelay3}`}
              >
                ENDLESS POSSIBILITIES.
                <br />
                A CREATIVE EXPEDITION FOR CURIOUS MINDS.
              </p>

              <a
                href="#register"
                className={`${styles.heroCtaPlaque} ${styles.animFadeUp} ${styles.animDelay4}`}
              >
                <div className={styles.plaqueOuter}>
                  <div className={styles.plaqueInner}>
                    <span className={styles.plaqueStar}>
                      <img src="/assets/star.png" alt="" width={24} height={24}/>
                    </span>
                    <span className={styles.plaqueDivider} />
                    <span className={styles.plaqueText}>REGISTER NOW</span>
                    <span className={styles.plaqueArrow}>→</span>
                  </div>
                </div>
              </a>
            </div>

            <div
              className={`${styles.heroImageWrapper} ${styles.animFadeRight}`}
            >
              <div className={styles.horseHalo} />
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

      <div className={styles.heroSpacer} />
    </>
  );
}
