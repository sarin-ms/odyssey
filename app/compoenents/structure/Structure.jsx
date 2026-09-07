"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Structure.module.css";

const SearchIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const LightbulbIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const CodeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const PresentationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 3h20" />
    <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
    <path d="m7 21 5-5 5 5" />
  </svg>
);

const PHASES = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    subtitle: "Problem Identification",
    description:
      "Begin by identifying real-world problems that matter. Research the context, understand the people affected, and explore the landscape of existing solutions.",
    icon: <SearchIcon />,
    color: "#7a5426",
  },
  {
    id: "ideate",
    number: "02",
    title: "Ideate",
    subtitle: "Solution Design",
    description:
      "Brainstorm potential solutions, validate your ideas through feedback, refine your approach, and create a clear roadmap for implementation.",
    icon: <LightbulbIcon />,
    color: "#8b6914",
  },
  {
    id: "develop",
    number: "03",
    title: "Develop",
    subtitle: "Build & Iterate",
    description:
      "Bring your solution to life through hands-on development. Build a functional prototype, iterate based on testing, and refine the user experience.",
    icon: <CodeIcon />,
    color: "#3d6b3d",
  },
  {
    id: "demonstrate",
    number: "04",
    title: "Demonstrate",
    subtitle: "Present & Pitch",
    description:
      "Showcase your solution to judges and peers. Present the problem, demonstrate your prototype, and articulate the impact your solution can create.",
    icon: <PresentationIcon />,
    color: "#2b7a9c",
  },
];

export default function Structure() {
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
      className={styles.structureSection}
      id="structure"
      ref={sectionRef}
    >
      <div className={styles.structureInner}>
        <div className={styles.header}>
          <div
            className={`${styles.badgeWrapper} ${styles.fadeUp} ${v} ${styles.delay1}`}
          >
            <span className={styles.badgeText}>THE PROCESS</span>
            <span className={styles.badgeLine} />
          </div>
          <h2
            className={`${styles.sectionTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}
          >
            <span className={styles.titleLineOne}>Event</span>
            <span className={styles.titleLineTwo}>Structure</span>
          </h2>
          <p
            className={`${styles.subtitle} ${styles.fadeUp} ${v} ${styles.delay3}`}
          >
            A structured framework guiding teams from problem to solution
          </p>
        </div>

        <div className={styles.phasesContainer}>
          {PHASES.map((phase, index) => (
            <div
              key={phase.id}
              className={`${styles.phaseCard} ${styles.fadeUp} ${v} ${styles[`delay${index + 4}`]}`}
            >
              <div className={styles.phaseNumber}>{phase.number}</div>
              <div
                className={styles.phaseIcon}
                style={{ color: phase.color }}
              >
                {phase.icon}
              </div>
              <h3 className={styles.phaseTitle}>{phase.title}</h3>
              <div className={styles.phaseSubtitle}>{phase.subtitle}</div>
              <p className={styles.phaseDescription}>{phase.description}</p>
              <div
                className={styles.phaseAccent}
                style={{ background: phase.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
