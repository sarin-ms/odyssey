"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Schedule.module.css";

/* ── Inline icons (no icon library) ── */
const ico = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const AnchorIcon = () => (
  <svg {...ico}>
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v13M5 11H2.5M21.5 11H19" />
    <path d="M5 15c.8 3.4 3.2 5 7 5s6.2-1.6 7-5" />
    <path d="m5 15-2.5 2M19 15l2.5 2" />
  </svg>
);

const HelmIcon = () => (
  <svg {...ico}>
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2.2 2.2M16.8 16.8 19 19M19 5l-2.2 2.2M7.2 16.8 5 19" />
  </svg>
);

const SearchIcon = () => (
  <svg {...ico}>
    <circle cx="11" cy="11" r="7.5" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const CoffeeIcon = () => (
  <svg {...ico}>
    <path d="M4 8h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
    <path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" />
    <path d="M5 21h12" />
  </svg>
);

const ClipboardIcon = () => (
  <svg {...ico}>
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <path d="M9 4V3h6v1" />
    <path d="m9.5 12.5 2 2 3.5-4" />
  </svg>
);

const PaletteIcon = () => (
  <svg {...ico}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="9.5" r="1.1" />
    <circle cx="15" cy="9.5" r="1.1" />
    <circle cx="9.5" cy="15" r="1.1" />
  </svg>
);

const MicIcon = () => (
  <svg {...ico}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21" />
  </svg>
);

const TimerIcon = () => (
  <svg {...ico}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9.5V13l2.5 1.5" />
    <path d="M9 2h6" />
  </svg>
);

const PulseIcon = () => (
  <svg {...ico}>
    <path d="M2 12h4l2.5-6 3.5 12 3-6h7" />
  </svg>
);

const CodeIcon = () => (
  <svg {...ico}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CompassIcon = () => (
  <svg {...ico}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5" />
  </svg>
);

const MoonIcon = () => (
  <svg {...ico}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
  </svg>
);

const SlidersIcon = () => (
  <svg {...ico}>
    <path d="M5 20v-7M5 9V4M12 20v-9M12 7V4M19 20v-4M19 12V4" />
    <circle cx="5" cy="11" r="1.6" />
    <circle cx="12" cy="9" r="1.6" />
    <circle cx="19" cy="14" r="1.6" />
  </svg>
);

const MonitorIcon = () => (
  <svg {...ico}>
    <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
    <path d="M9 20.5h6M12 16.5v4" />
  </svg>
);

const FlagIcon = () => (
  <svg {...ico}>
    <path d="M5 21V4" />
    <path d="M5 5h11l-1.5 4L16 13H5z" />
  </svg>
);

const BLOCKS = [
  {
    num: "01",
    span: "9:00 – 10:30 AM",
    title: "Cast Off",
    icon: <AnchorIcon />,
    day: "Day 1",
    dayDate: "19 Sept 2026",
    items: [
      "Registration",
      "Inauguration + Google keynote",
      "Navigation tools: Gemini, AI Studio, Antigravity, Pomelli",
    ],
  },
  {
    num: "02",
    span: "10:30 – 11:00 AM",
    title: "Captain’s Briefing",
    icon: <HelmIcon />,
    items: ["Crew muster", "Open theme reveal", "Crew stations setup"],
  },
  {
    num: "03",
    span: "11:00 AM – 12:30 PM",
    title: "Chart the Unknown",
    icon: <SearchIcon />,
    items: ["Problem discovery", "Port 1 — Course plotted"],
  },
  {
    num: "04",
    span: "12:30 – 1:30 PM",
    title: "Galley Break",
    icon: <CoffeeIcon />,
    items: ["Lunch", "Crew mixer"],
  },
  {
    num: "05",
    span: "1:30 – 2:45 PM",
    title: "Course Clearance",
    icon: <ClipboardIcon />,
    items: [
      "Feasibility & market study",
      "Port 2 — Captain’s clearance briefing",
    ],
  },
  {
    num: "06",
    span: "2:45 – 3:50 PM",
    title: "Raise the Colors",
    icon: <PaletteIcon />,
    items: [
      "Build with Google Pomelli + AI tools",
      "Port 3 — Colors & crest reveal",
    ],
  },
  {
    num: "07",
    span: "3:50 – 4:30 PM",
    title: "Signal the Fleet",
    icon: <MicIcon />,
    items: ["Port 4", "Rotating mock-media stations"],
  },
  {
    num: "08",
    span: "4:30 – 6:00 PM",
    title: "First Passage",
    icon: <TimerIcon />,
    items: [
      "Port 5 — Pitch rehearsal",
      "Set sail — funding pitch",
      "Closes Phase 1",
    ],
  },
  {
    num: "09",
    span: "6:00 – 9:00 PM",
    title: "Shore Leave",
    icon: <PulseIcon />,
    items: ["Physical activity circuit", "Culturals + dinner"],
  },
  {
    num: "10",
    span: "9:00 PM – 1:00 AM",
    title: "Open Waters",
    icon: <CodeIcon />,
    items: ["Build phase kickoff", "Build sprint 1"],
  },
  {
    num: "11",
    span: "1:00 – 2:30 AM",
    title: "Course Check",
    icon: <CompassIcon />,
    day: "Day 2",
    dayDate: "20 Sept 2026",
    items: [
      "Waypoint 1 — Course check",
      "Build sprint (short)",
      "Comms check — midnight icebreaker",
    ],
  },
  {
    num: "12",
    span: "2:30 – 9:00 AM",
    title: "Night Watch",
    icon: <MoonIcon />,
    items: [
      "Build sprint 2 — main stretch",
      "Breakfast",
      "Waypoint 2 — First contact",
    ],
  },
  {
    num: "13",
    span: "9:00 AM – 1:00 PM",
    title: "Final Bearing",
    icon: <SlidersIcon />,
    items: ["Build sprint 3 — iterate & polish", "Lunch"],
  },
  {
    num: "14",
    span: "1:00 – 2:00 PM",
    title: "Harbor Approach",
    icon: <MonitorIcon />,
    items: ["Waypoint 3 — Harbor sighted", "Final polish & rehearsal"],
  },
  {
    num: "15",
    span: "2:00 – 5:00 PM",
    title: "Homecoming",
    icon: <FlagIcon />,
    items: [
      "Final demos + judging",
      "Homecoming showcase",
      "Closing ceremony",
    ],
  },
];

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const VoyageShip = () => (
  <svg viewBox="0 0 72 52" aria-hidden="true" focusable="false">
    <path className={styles.shipWake} d="M3 47c8-4 14 4 22 0s14 4 22 0 14 4 22 0" />
    <path className={styles.shipMast} d="M36 5v31" />
    <path className={styles.shipSailMain} d="M33 8 12 33h21Z" />
    <path className={styles.shipSailRear} d="m39 12 18 21H39Z" />
    <path className={styles.shipHull} d="M7 35h58l-9 10H18Z" />
    <path className={styles.shipTrim} d="M15 39h43" />
  </svg>
);

export default function Schedule() {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const progressTrackRef = useRef(null);

  const [metrics, setMetrics] = useState({ scrollLen: 0, stageH: 0 });
  const [pinned, setPinned] = useState(false);
  const [visible, setVisible] = useState(false);

  const renderVoyageProgress = useCallback((value) => {
    const progress = clamp(value, 0, 1);

    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${progress})`;
    }

    if (progressTrackRef.current) {
      progressTrackRef.current.style.setProperty(
        "--voyage-progress",
        `${(progress * 100).toFixed(3)}%`,
      );
    }
  }, []);

  useEffect(() => {
    const ok = window.matchMedia(
      "(min-width: 1100px) and (min-height: 680px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    const sync = () => setPinned(ok.matches);
    sync();

    ok.addEventListener("change", sync);
    return () => ok.removeEventListener("change", sync);
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const view = viewportRef.current;
    const stage = stageRef.current;
    if (!track || !view || !stage) return;

    const next = {
      scrollLen: Math.max(0, track.scrollWidth - view.clientWidth),
      stageH: stage.offsetHeight,
    };

    setMetrics((prev) =>
      prev.scrollLen === next.scrollLen && prev.stageH === next.stageH
        ? prev
        : next,
    );
  }, []);

  useEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [measure, pinned]);


  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      if (pinned) {
        const wrap = wrapperRef.current;
        if (!wrap) return;


        const travel = wrap.offsetHeight - metrics.stageH;
        const progress =
          travel > 0
            ? clamp(-wrap.getBoundingClientRect().top / travel, 0, 1)
            : 0;

        track.style.transform = `translate3d(${-(progress * metrics.scrollLen)}px, 0, 0)`;
        renderVoyageProgress(progress);
        return;
      }

      track.style.transform = "";
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const progress = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;
      renderVoyageProgress(progress);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const scrollTarget = pinned ? window : viewport;
    update();
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, metrics.scrollLen, metrics.stageH, renderVoyageProgress]);

  /* Entrance animation with a readable fallback and one-shot cleanup. */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const v = visible ? styles.visible : "";

  return (
    <section
      className={styles.scheduleWrapper}
      id="schedule"
      ref={wrapperRef}
      style={
        pinned && metrics.stageH > 0
          ? { height: `${metrics.stageH + metrics.scrollLen}px` }
          : undefined
      }
      aria-label="Odyssey event voyage schedule"
    >
      <div
        className={`${styles.stage} ${pinned ? styles.stagePinned : ""}`}
        ref={stageRef}
      >
        <div className={styles.header}>
          <div
            className={`${styles.badgeWrapper} ${styles.fadeUp} ${v} ${styles.delay1}`}
          >
            <span className={styles.badgeText}>VOYAGE ITINERARY</span>
            <span className={styles.badgeLine} />
          </div>

          <h2
            className={`${styles.sectionTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}
          >
            The 32-Hour Odyssey
          </h2>

          <p
            className={`${styles.subtitle} ${styles.fadeUp} ${v} ${styles.delay3}`}
          >
            Fifteen ports of call. One voyage from first idea to final showcase.
          </p>

          <p
            className={`${styles.scrollHint} ${styles.fadeUp} ${v} ${styles.delay3}`}
            id="schedule-instructions"
          >
            {pinned
              ? "Keep scrolling to chart the full voyage"
              : "Swipe or scroll sideways to explore all 15 stops"}
            <span aria-hidden="true">→</span>
          </p>
        </div>

        {/* Overflow mode is driven by the pinned state, not a media query, so
            CSS and the transform logic can never disagree. */}
        <div
          className={`${styles.viewport} ${
            pinned ? styles.viewportPinned : styles.viewportFree
          }`}
          ref={viewportRef}
          tabIndex={pinned ? undefined : 0}
          aria-label={pinned ? undefined : "Scrollable voyage timeline"}
          aria-describedby="schedule-instructions"
        >
          <ol className={`${styles.track} ${v}`} ref={trackRef}>
            {BLOCKS.map((block, i) => {
              const onTop = i % 2 === 0;

              return (
                <li
                  key={block.num}
                  className={`${styles.col} ${block.day ? styles.colDayStart : ""} ${
                    onTop ? styles.colTop : styles.colBottom
                  }`}
                >
                  {/* Fixed-height lane in every column so the route stays
                      aligned across columns, badge or not. */}
                  <div className={styles.dayLane}>
                    {block.day && (
                      <span className={styles.dayMark}>
                        <span className={styles.dayMarkLabel}>
                          {block.day}
                        </span>
                        <span className={styles.dayMarkDate}>
                          {block.dayDate}
                        </span>
                      </span>
                    )}
                  </div>

                  <div className={styles.cellTop}>
                    {onTop && <BlockCard block={block} place="top" />}
                  </div>

                  <div className={styles.cellAxis}>
                    <span className={styles.axisLine} aria-hidden="true" />
                    <span className={styles.span}>{block.span}</span>
                    <span
                      className={styles.node}
                      aria-label={`Voyage stop ${block.num}`}
                    >
                      {block.num}
                    </span>
                  </div>

                  <div className={styles.cellBottom}>
                    {!onTop && <BlockCard block={block} place="bottom" />}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          className={`${styles.voyageProgress} ${v}`}
          aria-hidden="true"
        >
          <div className={styles.progressLabels}>
            <span>Departure</span>
            <span>Final showcase</span>
          </div>
          <div className={styles.progressTrack} ref={progressTrackRef}>
            <span className={styles.progressFill} ref={progressRef} />
            <span className={styles.shipMarker}>
              <VoyageShip />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlockCard({ block, place }) {
  const head = (
    <div className={styles.cardHead}>
      <span className={styles.cardIcon}>{block.icon}</span>
      <div className={styles.cardHeading}>
        <span className={styles.logLabel}>Voyage log {block.num}</span>
        <h3 className={styles.cardTitle}>{block.title}</h3>
      </div>
    </div>
  );

  const body = (
    <div className={styles.cardBody}>
      <ul className={styles.bullets}>
        {block.items.map((item) => (
          <li key={item} className={styles.bullet}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  /* Keep the heading first in the DOM; CSS places it on the outer edge. */
  return (
    <div
      className={`${styles.card} ${place === "bottom" ? styles.cardBottom : ""}`}
      data-stop={block.num}
    >
      {head}
      {body}
    </div>
  );
}
