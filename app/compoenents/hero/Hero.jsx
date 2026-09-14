import Image from "next/image";
import styles from "./Hero.module.css";
import horseImg from "@/public/assets/horse_half.webp";
import heroBg from "@/public/assets/odyssey_hero.webp";

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
              fetchPriority="high"
              className={styles.heroBgImage}
              sizes="100vw"
            />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <p
                className={`${styles.heroSubtitle} ${styles.animReveal} ${styles.animDelay1}`}
              >
                IEDC BOOTCAMP CEC × μLEARN CHN
              </p>
              <h1
                className={`${styles.heroTitle} ${styles.animReveal} ${styles.animDelay2}`}
              >
                ODYSSEY
              </h1>
              <p
                className={`${styles.heroTagline} ${styles.animReveal} ${styles.animDelay3}`}
              >
                ENDLESS POSSIBILITIES.
                <br />
                A CREATIVE EXPEDITION FOR CURIOUS MINDS.
              </p>

              <a
                href="https://makemypass.com/event/odyssey"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.heroCtaPlaque} ${styles.animReveal} ${styles.animDelay4}`}
              >
                <div className={styles.plaqueOuter}>
                  <div className={styles.plaqueInner}>
                    <span className={styles.plaqueStar}>
                      <Image
                        src="/assets/star.webp"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className={styles.plaqueDivider} />
                    <span className={styles.plaqueText}>REGISTER NOW</span>
                    <span className={styles.plaqueArrow}>→</span>
                  </div>
                </div>
              </a>
            </div>

            <div className={styles.heroImageWrapper}>
              <div className={styles.horseHalo} aria-hidden="true" />
              <Image
                src={horseImg}
                alt="Trojan horse wooden sculpture"
                loading="eager"
                sizes="(max-width: 768px) 85vw, (max-width: 1024px) 400px, 55vw"
                className={styles.horseImage}
              />
            </div>
          </div>

          <div
            className={`${styles.journeyMarker} ${styles.animReveal} ${styles.animDelay5}`}
            aria-hidden="true"
          >
            <span className={styles.markerIndex}>01</span>
            <span className={styles.markerLine} />
            <span className={styles.markerLabel}>Begin the journey</span>
          </div>
        </section>
      </div>

      <div className={styles.heroSpacer} />
    </>
  );
}
