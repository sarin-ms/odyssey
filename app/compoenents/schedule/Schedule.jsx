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

const RocketIcon = () => (
  <svg {...ico}>
    <path d="M4.5 16.5c-1.5 1.5-1.5 3.5 0 5s3.5 1.5 5 0L15 16l-2-2-8.5 2.5z" />
    <path d="M12 15l-3-3 8-8a2 2 0 0 1 3 3l-8 8z" />
    <circle cx="18.5" cy="5.5" r="1.2" />
  </svg>
);

const RadarIcon = () => (
  <svg {...ico}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 12l6-4.5" />
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
    title: "Launch Window",
    icon: <RocketIcon />,
    day: "Day 1",
    dayDate: "19 Sept 2026",
    items: [
      "Registration",
      "Inauguration + Google keynote",
      "Tools: Gemini, AI Studio, Antigravity, Pomelli",
    ],
  },
  {
    num: "02",
    span: "10:30 – 11:00 AM",
    title: "Mission Briefing",
    icon: <RadarIcon />,
    items: ["Crew sync", "Open theme reveal", "Mission Control setup"],
  },
  {
    num: "03",
    span: "11:00 AM – 12:30 PM",
    title: "Recon",
    icon: <SearchIcon />,
    items: ["Problem discovery", "Checkpoint 1 — Trajectory Lock"],
  },
  {
    num: "04",
    span: "12:30 – 1:30 PM",
    title: "Refuel",
    icon: <CoffeeIcon />,
    items: ["Lunch", "Crew mixer"],
  },
  {
    num: "05",
    span: "1:30 – 2:45 PM",
    title: "Clearance",
    icon: <ClipboardIcon />,
    items: [
      "Feasibility & market study",
      "Checkpoint 2 — Launch Clearance Briefing",
    ],
  },
  {
    num: "06",
    span: "2:45 – 3:50 PM",
    title: "Identity Sprint",
    icon: <PaletteIcon />,
    items: [
      "Build with Google Pomelli + AI tools",
      "Checkpoint 3 — Callsign & Insignia Reveal",
    ],
  },
  {
    num: "07",
    span: "3:50 – 4:30 PM",
    title: "Press Briefing",
    icon: <MicIcon />,
    items: ["Checkpoint 4", "Rotating mock-media stations"],
  },
  {
    num: "08",
    span: "4:30 – 6:00 PM",
    title: "Final Countdown",
    icon: <TimerIcon />,
    items: [
      "Checkpoint 5 — pitch rehearsal",
      "Go for Launch — funding pitch",
      "Closes Phase 1",
    ],
  },
  {
    num: "09",
    span: "6:00 – 9:00 PM",
    title: "Planetfall",
    icon: <PulseIcon />,
    items: ["Physical activity circuit", "Culturals + dinner"],
  },
  {
    num: "10",
    span: "9:00 PM – 1:00 AM",
    title: "The Journey Begins",
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
      "Waypoint 1 — Course Check",
      "Build sprint (short)",
      "Comms check — midnight icebreaker",
    ],
  },
  {
    num: "12",
    span: "2:30 – 9:00 AM",
    title: "Overnight Stretch",
    icon: <MoonIcon />,
    items: [
      "Build sprint 2 — main stretch",
      "Breakfast",
      "Waypoint 2 — First Contact",
    ],
  },
  {
    num: "13",
    span: "9:00 AM – 1:00 PM",
    title: "Final Approach",
    icon: <SlidersIcon />,
    items: ["Build sprint 3 — iterate & polish", "Lunch"],
  },
  {
    num: "14",
    span: "1:00 – 2:00 PM",
    title: "Demo Prep",
    icon: <MonitorIcon />,
    items: ["Waypoint 3 — Landfall", "Final polish & rehearsal"],
  },
  {
    num: "15",
    span: "2:00 – 5:00 PM",
    title: "Landing Day",
    icon: <FlagIcon />,
    items: [
      "Final demos + judging",
      "Landing Day Showcase",
      "Closing ceremony",
    ],
  },
];

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export default function Schedule() {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  /* scrollLen — horizontal distance the track must travel, in px.
     stageH   — measured height of the pinned stage. Measured rather than
                assumed from window.innerHeight: on mobile the URL bar
                collapsing changes innerHeight mid-scroll, which would
                desync the travel. The stage is sized in svh so it stays put. */
  const [metrics, setMetrics] = useState({ scrollLen: 0, stageH: 0 });
  // Pinning applies on every screen size; only reduced-motion opts out.
  const [pinned, setPinned] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Decide whether to pin. Needs a minimum viewport height, otherwise the
     pinned stage has too little room for the cards (e.g. landscape phones). */
  useEffect(() => {
    const ok = window.matchMedia(
      "(min-height: 480px) and (prefers-reduced-motion: no-preference)",
    );

    const sync = () => setPinned(ok.matches);
    sync();

    ok.addEventListener("change", sync);
    return () => ok.removeEventListener("change", sync);
  }, []);

  /* Measure track overflow and stage height. */
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

  /* Map vertical scroll through the tall wrapper onto horizontal track travel. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!pinned) {
      track.style.transform = "";
      if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const wrap = wrapperRef.current;
      if (!wrap || !track) return;

      // Travel equals scrollLen by construction (wrapper = stageH + scrollLen),
      // so the last card lands exactly as the section releases.
      const travel = wrap.offsetHeight - metrics.stageH;
      const progress =
        travel > 0 ? clamp(-wrap.getBoundingClientRect().top / travel, 0, 1) : 0;

      track.style.transform = `translate3d(${-(progress * metrics.scrollLen)}px, 0, 0)`;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, metrics.scrollLen, metrics.stageH]);

  /* Entrance animation. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.05 },
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
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
      aria-label="Event schedule"
    >
      <div
        className={`${styles.stage} ${pinned ? styles.stagePinned : ""}`}
        ref={stageRef}
      >
        <div className={styles.header}>
          <div
            className={`${styles.badgeWrapper} ${styles.fadeUp} ${v} ${styles.delay1}`}
          >
            <span className={styles.badgeText}>SCHEDULE</span>
            <span className={styles.badgeLine} />
          </div>

          <h2
            className={`${styles.sectionTitle} ${styles.fadeUp} ${v} ${styles.delay2}`}
          >
            The 32-Hour Journey
          </h2>

          <p
            className={`${styles.subtitle} ${styles.fadeUp} ${v} ${styles.delay3}`}
          >
            Every phase builds towards the next.
          </p>
        </div>

        {/* Overflow mode is driven by the pinned state, not a media query, so
            CSS and the transform logic can never disagree. */}
        <div
          className={`${styles.viewport} ${
            pinned ? styles.viewportPinned : styles.viewportFree
          }`}
          ref={viewportRef}
        >
          <ol className={styles.track} ref={trackRef}>
            {BLOCKS.map((block, i) => {
              const onTop = i % 2 === 0;

              return (
                <li
                  key={block.num}
                  className={`${styles.col} ${block.day ? styles.colDayStart : ""} ${
                    onTop ? styles.colTop : styles.colBottom
                  }`}
                >
                  {/* Fixed-height lane in every column so the axis row stays
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
                    <span className={styles.node}>{block.num}</span>
                  </div>

                  <div className={styles.cellBottom}>
                    {!onTop && <BlockCard block={block} place="bottom" />}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progressFill} ref={progressRef} />
        </div>
      </div>
    </section>
  );
}

function BlockCard({ block, place }) {
  const head = (
    <div className={styles.cardHead}>
      <span className={styles.cardIcon}>{block.icon}</span>
      <h4 className={styles.cardTitle}>{block.title}</h4>
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

  /* Header band goes on the outer edge so the body faces the axis. */
  return (
    <div className={styles.card}>
      {place === "top" ? (
        <>
          {head}
          {body}
        </>
      ) : (
        <>
          {body}
          {head}
        </>
      )}
    </div>
  );
}
