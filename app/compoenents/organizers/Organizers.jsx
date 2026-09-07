"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Organizers.module.css";

const ORGANIZERS = [
  {
    id: "mulearn",
    name: "μLearn CHN",
    role: "Student-Driven Technology Community",
    description:
      "μLearn CHN is a student-driven technology and learning community focused on enabling students to learn, collaborate, build, and engage with the wider developer ecosystem. Through technical initiatives, workshops, community activities, and hands-on experiences, μLearn CHN encourages students to transform knowledge into practical skills and meaningful projects.",
    logo: "/assets/mulearn.png",
    logoW: 159,
    logoH: 55,
  },
  {
    id: "iedc",
    name: "IEDC BOOTCAMP CEC",
    role: "Innovation & Entrepreneurship Initiative",
    description:
      "IEDC BOOTCAMP CEC is the innovation and entrepreneurship initiative at the College of Engineering Chengannur, fostering creativity, innovation, entrepreneurship, and technology-driven problem solving among students. It provides a platform for aspiring innovators to explore ideas, develop prototypes, collaborate with peers, and take their concepts towards real-world implementation.",
    logo: "/assets/iedc.svg",
    logoW: 122,
    logoH: 73,
  },
];

export default function Organizers() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.12 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const v = visible ? styles.visible : "";

  return (
    <section
      className={styles.organizersSection}
      id="organizers"
      ref={sectionRef}
    >
      <div className={styles.organizersInner}>
        <div className={styles.header}>
          <div
            className={`${styles.badgeWrapper} ${styles.fadeUp} ${v} ${styles.delay1}`}
          >
            <span className={styles.badgeText}>THE ARCHITECTS</span>
            <span className={styles.badgeLine} />
          </div>
          <h2
            className={`${styles.sectionTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}
          >
            <span className={styles.titleLineOne}>About</span>
            <span className={styles.titleLineTwo}>Organizers</span>
          </h2>
        </div>

        <div className={styles.organizersGrid}>
          {ORGANIZERS.map((org, index) => (
            <div
              key={org.id}
              className={`${styles.organizerCard} ${styles.fadeUp} ${v} ${styles[`delay${index + 3}`]}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.logoWrapper}>
                  <Image
                    src={org.logo}
                    alt={`${org.name} logo`}
                    width={org.logoW}
                    height={org.logoH}
                    className={styles.logoImage}
                  />
                </div>
                <div className={styles.orgContent}>
                  <div className={styles.orgRole}>{org.role}</div>
                  <h3 className={styles.orgName}>{org.name}</h3>
                  <p className={styles.orgDescription}>{org.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${styles.closingMessage} ${styles.fadeUp} ${v} ${styles.delay5}`}
        >
          <h3 className={styles.closingTitle}>
            Building the Next Generation of Innovators
          </h3>
          <p className={styles.closingText}>
            Together, μLearn CHN and IEDC BOOTCAMP CEC bring students into an environment where ideas are challenged, technologies are explored, and solutions are built.
          </p>
          <p className={styles.closingHighlight}>
            ODYSSEY is where learning meets making.
          </p>
        </div>
      </div>
    </section>
  );
}
