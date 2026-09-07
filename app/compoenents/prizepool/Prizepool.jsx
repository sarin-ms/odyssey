"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Prizepool.module.css";

const InnovationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const SearchIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CodeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const LayersIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const CRITERIA = [
  {
    id: "innovation",
    title: "Innovation",
    description: "Originality, creativity, and the distinctiveness of the proposed solution.",
    icon: <InnovationIcon />,
    color: "#8b6914",
  },
  {
    id: "problem",
    title: "Problem Understanding",
    description: "Depth of research, clarity of the problem statement, and understanding of user needs.",
    icon: <SearchIcon />,
    color: "#7a5426",
  },
  {
    id: "technical",
    title: "Technical Excellence",
    description: "Quality, functionality, and effectiveness of the implementation.",
    icon: <CodeIcon />,
    color: "#3d6b3d",
  },
  {
    id: "technology",
    title: "Technology Integration",
    description: "Meaningful and effective use of Google and AI technologies.",
    icon: <LayersIcon />,
    color: "#2b7a9c",
  },
  {
    id: "ux",
    title: "User Experience",
    description: "Usability, accessibility, and how effectively the solution addresses its intended users.",
    icon: <UserIcon />,
    color: "#9c6b2b",
  },
  {
    id: "impact",
    title: "Impact & Scalability",
    description: "Potential to create meaningful real-world value and evolve beyond the hackathon prototype.",
    icon: <TrendingIcon />,
    color: "#6b4e9c",
  },
];

export default function Prizepool() {
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
    <section className={styles.prizepoolSection} id="prize" ref={sectionRef}>
      <div className={styles.prizepoolInner}>
        <div className={styles.header}>
          <div
            className={`${styles.badgeWrapper} ${styles.fadeUp} ${v} ${styles.delay1}`}
          >
            <span className={styles.badgeText}>PRIZE POOL</span>
            <span className={styles.badgeLine} />
          </div>
          <h2
            className={`${styles.sectionTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}
          >
            ₹10,000 in Prizes
          </h2>
          <p
            className={`${styles.subtitle} ${styles.fadeUp} ${v} ${styles.delay3}`}
          >
            ODYSSEY celebrates teams that demonstrate exceptional innovation, technical excellence, problem understanding, and real-world potential.
          </p>
          <p
            className={`${styles.subtitle} ${styles.fadeUp} ${v} ${styles.delay3}`}
          >
            The most outstanding solutions will be recognized at the Final Showcase, with cash prizes, special recognitions, and Google-branded merchandise awarded to deserving teams and participants.
          </p>
        </div>

        <div
          className={`${styles.criteriaSection} ${styles.fadeUp} ${v} ${styles.delay4}`}
        >
          <h3 className={styles.criteriaTitle}>What the Jury Looks For</h3>
          <div className={styles.criteriaGrid}>
            {CRITERIA.map((criterion) => (
              <div key={criterion.id} className={styles.criterionCard}>
                <div
                  className={styles.criterionIcon}
                  style={{ color: criterion.color }}
                >
                  {criterion.icon}
                </div>
                <div className={styles.criterionCardBody}>
                  <h4 className={styles.criterionTitle}>{criterion.title}</h4>
                  <p className={styles.criterionDescription}>
                    {criterion.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
