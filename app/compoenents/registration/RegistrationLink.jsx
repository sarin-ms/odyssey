"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RegistrationLink.module.css";

const REGISTRATION_URL = "https://makemypass.com/event/odyssey";
const REGISTRATION_OPENS_AT = Date.parse("2026-09-15T20:00:00+05:30");
const NOTICE_DURATION = 3600;

function LockIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="10" width="14" height="11" rx="2.5" />
      <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
      <path d="M12 14.5v2.5" />
    </svg>
  );
}

export default function RegistrationLink({
  children,
  className = "",
  onClick,
  title,
  ...props
}) {
  const [locked, setLocked] = useState(true);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const noticeTimerRef = useRef(null);

  useEffect(() => {
    const remaining = REGISTRATION_OPENS_AT - Date.now();

    if (remaining <= 0) {
      const frame = requestAnimationFrame(() => setLocked(false));
      return () => cancelAnimationFrame(frame);
    }

    const timer = window.setTimeout(() => setLocked(false), remaining + 50);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(
    () => () => {
      if (noticeTimerRef.current) {
        window.clearTimeout(noticeTimerRef.current);
      }
    },
    [],
  );

  const showLockedNotice = () => {
    setNoticeVisible(true);

    if (noticeTimerRef.current) {
      window.clearTimeout(noticeTimerRef.current);
    }

    noticeTimerRef.current = window.setTimeout(
      () => setNoticeVisible(false),
      NOTICE_DURATION,
    );
  };

  const handleClick = (event) => {
    if (Date.now() < REGISTRATION_OPENS_AT) {
      event.preventDefault();
      setLocked(true);
      showLockedNotice();
    } else {
      setLocked(false);
    }

    onClick?.(event);
  };

  return (
    <>
      <a
        {...props}
        href={REGISTRATION_URL}
        className={`${styles.registrationLink} ${
          locked ? styles.locked : ""
        } ${className}`.trim()}
        onClick={handleClick}
        aria-disabled={locked || undefined}
        title={
          locked
            ? "Registration opens on 15 September at 6:00 PM IST"
            : title
        }
      >
        {children}
      </a>

      {noticeVisible && (
        <span className={styles.notice} role="alert">
          <span className={styles.noticeIcon} aria-hidden="true">
            <LockIcon />
          </span>
          <span className={styles.noticeCopy}>
            <strong>Registration not started yet</strong>
            <small>Opens 15 September at 6:00 PM IST</small>
          </span>
        </span>
      )}
    </>
  );
}
