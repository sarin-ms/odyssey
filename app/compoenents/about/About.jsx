"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Hourglass, Users, GraduationCap, Compass } from "lucide-react";
import styles from "./About.module.css";

const STATS = [
  {
    id: "duration",
    value: "32 Hours",
    label: "Continuous innovation sprint",
    icon: <Hourglass size={18} strokeWidth={1.8} className={styles.statSvg} />,
  },
  {
    id: "members",
    value: "1–4 Members",
    label: "Flexible team size",
    icon: <Users size={18} strokeWidth={1.8} className={styles.statSvg} />,
  },
  {
    id: "participants",
    value: "150+ Participants",
    label: "Students and innovators from higher education institutions",
    icon: <GraduationCap size={18} strokeWidth={1.8} className={styles.statSvg} />,
  },
  {
    id: "theme",
    value: "Open Theme",
    label: "Build across software, hardware, AI & emerging technologies",
    icon: <Compass size={18} strokeWidth={1.8} className={styles.statSvg} />,
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const v = visible ? styles.visible : "";

  return (
    <section className={styles.aboutSection} id="about" ref={sectionRef}>
      <div className={styles.aboutInner}>
        {/* ── Left Column: The Expedition ── */}
        <div className={styles.leftCol}>
          <div className={`${styles.badgeWrapper} ${styles.fadeUp} ${v} ${styles.delay1}`}>
            <span className={styles.badgeText}>ABOUT THE EVENT</span>
            <span className={styles.badgeLine} />
          </div>

          <h2 className={`${styles.mainTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}>
            <span className={styles.titleLineOne}>The</span>
            <span className={styles.titleLineTwo}>Expedition</span>
          </h2>

          <div className={`${styles.textStack} ${styles.fadeUp} ${v} ${styles.delay3}`}>
            <p className={styles.paragraph}>
              ODYSSEY is a 32-hour innovation and development hackathon organized by IEDC BOOTCAMP CEC and 
              μLearn CHN, bringing together students, developers, innovators, and
              technology enthusiasts to build solutions to real-world problems.
            </p>

            <p className={styles.paragraph}>
              The hackathon follows a structured journey beginning with problem discovery and
              research, moving through ideation and validation, culminating in the development
              and demonstration of a functional prototype.
            </p>

            <p className={styles.paragraph}>
              Participants will explore modern technologies across AI, software, hardware, cloud,
              mobile development, and emerging technologies, with opportunities to learn through
              technical sessions, mentorship, collaborative activities, and hands-on development.
            </p>
          </div>
        </div>

        {/* ── Center / Lower Center Graphic: Circular Halo & Wooden Trojan Horse ── */}
        <div className={`${styles.centerGraphic} ${styles.fadeScale} ${v} ${styles.delay2}`}>
          <div className={styles.circleHalo} />
          <div className={styles.horseFrame}>
            <Image
              src="/horse_full.png"
              alt="Wooden Trojan horse sculpture"
              width={1122}
              height={1402}
              priority
              className={styles.horseImage}
            />
          </div>
        </div>

        {/* ── Right Column: One Theme. Unlimited Possibilities ── */}
        <div className={styles.rightCol}>
          <h2 className={`${styles.themeTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}>
            <span className={styles.themeLineOne}>One Theme.</span>
            <span className={styles.themeLineTwo}>Unlimited Possibilities</span>
          </h2>

          <div className={`${styles.textStack} ${styles.fadeUp} ${v} ${styles.delay3}`}>
            <p className={styles.paragraph}>
              ODYSSEY does not limit participants to a predefined problem statement. Teams are
              encouraged to identify meaningful real-world problems, understand the people and
              contexts affected by them, study existing solutions, and develop innovative
              approaches of their own.
            </p>

            <p className={styles.paragraph}>
              Your starting idea is not your final destination. Research, feedback, and validation
              can reshape the solution as you build.
            </p>
          </div>

          {/* Frosted Glass Stats Card */}
          <div className={`${styles.statsCard} ${styles.fadeUp} ${v} ${styles.delay4}`}>
            {STATS.map((stat) => (
              <div key={stat.id} className={styles.statItem}>
                <div className={styles.iconCircle}>{stat.icon}</div>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
