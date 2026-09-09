"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Structure.module.css";

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const SearchIcon = () => (
  <svg {...iconProps}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const LightbulbIcon = () => (
  <svg {...iconProps}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6M10 22h4" />
  </svg>
);

const CodeIcon = () => (
  <svg {...iconProps}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const PresentationIcon = () => (
  <svg {...iconProps}>
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
    bearing: "Observe · Research",
    description:
      "Begin with a real problem worth solving. Study its context, listen to the people affected, and chart the landscape of existing solutions.",
    icon: <SearchIcon />,
    color: "#8a5d32",
  },
  {
    id: "ideate",
    number: "02",
    title: "Ideate",
    subtitle: "Solution Design",
    bearing: "Imagine · Validate",
    description:
      "Explore possible routes, test assumptions through feedback, and turn the strongest direction into a clear plan for implementation.",
    icon: <LightbulbIcon />,
    color: "#b18431",
  },
  {
    id: "develop",
    number: "03",
    title: "Develop",
    subtitle: "Build & Iterate",
    bearing: "Build · Refine",
    description:
      "Bring the chosen route to life as a functional prototype. Test, iterate, and strengthen both the technology and the experience.",
    icon: <CodeIcon />,
    color: "#477260",
  },
  {
    id: "demonstrate",
    number: "04",
    title: "Demonstrate",
    subtitle: "Present & Pitch",
    bearing: "Show · Impact",
    description:
      "Arrive with a compelling story. Demonstrate the prototype, explain the journey, and show the real-world impact the solution can create.",
    icon: <PresentationIcon />,
    color: "#356a6a",
  },
];

const ROUTE_PATH =
  "M 165 158 C 350 42, 820 44, 1035 158 C 1150 252, 1152 430, 1035 502 C 805 622, 390 622, 165 502";

export default function Structure() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
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
      aria-labelledby="structure-title"
    >
      <div className={styles.structureInner}>
        <header className={styles.header}>
          <div
            className={`${styles.badgeWrapper} ${styles.fadeUp} ${v} ${styles.delay1}`}
          >
            <span className={styles.badgeText}>THE NAVIGATION CHART</span>
            <span className={styles.badgeLine} />
          </div>

          <h2
            id="structure-title"
            className={`${styles.sectionTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}
          >
            <span>Four Waypoints.</span>
            <span className={styles.titleAccent}>One Odyssey.</span>
          </h2>

          <p
            className={`${styles.subtitle} ${styles.fadeUp} ${v} ${styles.delay3}`}
          >
            Every team navigates the same four bearings—from a problem worth
            solving to a solution worth sharing.
          </p>
        </header>

        <div className={`${styles.chart} ${v}`}>
          <svg
            className={styles.routeMap}
            viewBox="0 0 1200 650"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className={styles.routeShadow} d={ROUTE_PATH} />
            <path
              className={styles.routeLine}
              d={ROUTE_PATH}
              pathLength="1"
            />
            <circle className={styles.routePort} cx="165" cy="158" r="7" />
            <circle className={styles.routePort} cx="1035" cy="158" r="7" />
            <circle className={styles.routePort} cx="1035" cy="502" r="7" />
            <circle className={styles.routePort} cx="165" cy="502" r="7" />
          </svg>

          <div className={styles.compassRose} aria-hidden="true">
            <span className={styles.north}>N</span>
            <span className={styles.east}>E</span>
            <span className={styles.south}>S</span>
            <span className={styles.west}>W</span>
            <span className={styles.compassDial}>
              <span className={styles.compassNeedle} />
              <span className={styles.compassCore} />
            </span>
          </div>

          {PHASES.map((phase, index) => (
            <article
              key={phase.id}
              className={`${styles.waypoint} ${styles[`waypoint${index + 1}`]} ${v}`}
              style={{ "--phase-color": phase.color }}
            >
              <div className={styles.waypointMarker} aria-hidden="true">
                <span className={styles.markerIcon}>{phase.icon}</span>
                <span className={styles.markerNumber}>{phase.number}</span>
              </div>

              <div className={styles.waypointPanel}>
                <div className={styles.waypointMeta}>
                  <span>Waypoint {phase.number}</span>
                  <span>{phase.bearing}</span>
                </div>
                <h3 className={styles.phaseTitle}>{phase.title}</h3>
                <p className={styles.phaseSubtitle}>{phase.subtitle}</p>
                <p className={styles.phaseDescription}>{phase.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`${styles.journeyKey} ${styles.fadeUp} ${v} ${styles.delay8}`}
        >
          <div className={styles.keyPoint}>
            <span className={styles.keyLabel}>Departure</span>
            <span className={styles.keyValue}>A problem worth solving</span>
          </div>
          <div className={styles.keyRoute} aria-hidden="true">
            <span>✦</span>
            <span className={styles.keyLine} />
            <span>➜</span>
          </div>
          <div className={`${styles.keyPoint} ${styles.keyPointEnd}`}>
            <span className={styles.keyLabel}>Destination</span>
            <span className={styles.keyValue}>Measurable real-world impact</span>
          </div>
        </div>
      </div>
    </section>
  );
}
