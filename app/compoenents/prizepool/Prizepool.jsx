"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Prizepool.module.css";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.65,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

const InnovationIcon = () => (
  <svg {...iconProps}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6M10 22h4" />
  </svg>
);

const SearchIcon = () => (
  <svg {...iconProps}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CodeIcon = () => (
  <svg {...iconProps}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const LayersIcon = () => (
  <svg {...iconProps}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const UserIcon = () => (
  <svg {...iconProps}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TrendingIcon = () => (
  <svg {...iconProps}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrophyIcon = () => (
  <svg {...iconProps}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M9 17h6" />
  </svg>
);

const StarIcon = () => (
  <svg {...iconProps}>
    <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </svg>
);

const GiftIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="9" width="18" height="12" rx="1" />
    <path d="M12 9v12M3 13h18M7.5 9C5.8 9 5 8.1 5 7s.9-2 2-2c2.2 0 5 4 5 4M16.5 9C18.2 9 19 8.1 19 7s-.9-2-2-2c-2.2 0-5 4-5 4" />
  </svg>
);

const CRITERIA = [
  {
    id: "innovation",
    title: "Innovation",
    description:
      "Originality, creativity, and the distinctiveness of the proposed solution.",
    icon: <InnovationIcon />,
    color: "#a27424",
  },
  {
    id: "problem",
    title: "Problem Understanding",
    description:
      "Depth of research, clarity of the problem statement, and understanding of user needs.",
    icon: <SearchIcon />,
    color: "#356a6a",
  },
  {
    id: "technical",
    title: "Technical Excellence",
    description:
      "Quality, functionality, and effectiveness of the implementation.",
    icon: <CodeIcon />,
    color: "#8a5a2d",
  },
  {
    id: "technology",
    title: "Technology Integration",
    description:
      "Meaningful and effective use of Google and AI technologies.",
    icon: <LayersIcon />,
    color: "#477260",
  },
  {
    id: "ux",
    title: "User Experience",
    description:
      "Usability, accessibility, and how effectively the solution addresses its intended users.",
    icon: <UserIcon />,
    color: "#a27424",
  },
  {
    id: "impact",
    title: "Impact & Scalability",
    description:
      "Potential to create meaningful real-world value and evolve beyond the hackathon prototype.",
    icon: <TrendingIcon />,
    color: "#356a6a",
  },
];

const AWARDS = [
  { label: "Cash prizes", icon: <TrophyIcon /> },
  { label: "Special recognitions", icon: <StarIcon /> },
  { label: "Google merchandise", icon: <GiftIcon /> },
];

export default function Prizepool() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`${styles.prizepoolSection} ${visible ? styles.visible : ""}`}
      id="prize"
      ref={sectionRef}
      aria-labelledby="prize-title"
    >
      <div className={styles.prizepoolInner}>
        <div className={styles.bountyFrame}>
          <header className={styles.treasuryPanel}>
            <div className={styles.treasuryContent}>
              <p className={styles.destinationKicker}>THE FINAL DESTINATION</p>

              <span className={styles.postmark} aria-hidden="true">
                <span className={styles.postmarkSeal}>
                  <span>ODYSSEY</span>
                  <small>2026</small>
                </span>
                <span className={styles.postmarkLines}>
                  <i />
                  <i />
                  <i />
                </span>
              </span>

              <div className={styles.amountComposition}>
                <h2
                  className={styles.prizeAmount}
                  id="prize-title"
                  aria-label="10,000 Indian rupees in prizes"
                >
                  <span className={styles.currency} aria-hidden="true">
                    ₹
                  </span>
                  <span className={styles.amount} aria-hidden="true">
                    10,000
                  </span>
                  <span className={styles.amountLabel} aria-hidden="true">
                    IN PRIZES
                  </span>
                </h2>

                <span className={styles.handwritten} aria-hidden="true">
                  Arrive
                  <br />
                  at the
                  <br />
                  Final Showcase
                </span>
              </div>

              <span className={styles.amountRule} aria-hidden="true" />

              <p className={styles.leadCopy}>
                ODYSSEY celebrates teams that demonstrate exceptional
                innovation, technical excellence, problem understanding, and
                real-world potential.
              </p>

              <p className={styles.supportingCopy}>
                The most outstanding solutions will be recognized at the Final
                Showcase, with cash prizes, special recognitions, and
                Google-branded merchandise awarded to deserving teams and
                participants.
              </p>

              <ul className={styles.awardKinds} aria-label="Types of awards">
                {AWARDS.map((award) => (
                  <li key={award.label}>
                    <span className={styles.awardIcon} aria-hidden="true">
                      {award.icon}
                    </span>
                    <span>{award.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.coastalLandscape} aria-hidden="true">
              <span className={styles.landscapeCaption}>
                IDEAS TODAY.
                <br />A BRIGHTER TOMORROW.
              </span>
            </div>
          </header>

          <section
            className={styles.ledgerPanel}
            aria-labelledby="criteria-title"
          >
            <header className={styles.ledgerHeader}>
              <div>
                <span className={styles.ledgerKicker}>JURY’S COMPASS</span>
                <h3 className={styles.criteriaTitle} id="criteria-title">
                  Six Winning Bearings
                </h3>
              </div>

              <span className={styles.ledgerCount} aria-hidden="true">
                <strong>06</strong>
                charted marks
              </span>
            </header>

            <ol className={styles.criteriaLedger}>
              {CRITERIA.map((criterion, index) => (
                <li
                  className={styles.ledgerRow}
                  key={criterion.id}
                  style={{
                    "--criterion-color": criterion.color,
                    "--row-delay": `${240 + index * 80}ms`,
                  }}
                >
                  <span className={styles.bearingNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.criterionIcon} aria-hidden="true">
                    {criterion.icon}
                  </span>

                  <div className={styles.criterionCopy}>
                    <h4 className={styles.criterionTitle}>
                      {criterion.title}
                    </h4>
                    <p className={styles.criterionDescription}>
                      {criterion.description}
                    </p>
                  </div>

                  <span className={styles.rowArrow} aria-hidden="true">
                    →
                  </span>
                </li>
              ))}
            </ol>

            <div className={styles.ledgerNote}>
              <span aria-hidden="true" />
              <p>
                Every bearing matters. The strongest solutions bring all six
                into alignment.
              </p>
              <span aria-hidden="true" />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
