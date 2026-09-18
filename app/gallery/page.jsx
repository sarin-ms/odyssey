"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Gallery.module.css";

export default function GalleryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setEntries(Array.isArray(data) ? data : []);
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.galleryPage}>
      {/* Back to home */}
      <Link href="/" className={styles.backLink}>
        <span className={styles.backArrow}>←</span>
        Home
      </Link>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.badgeLine} />
          <span className={styles.badgeText}>Odyssey Community</span>
          <span className={styles.badgeLine} />
        </div>
        <h1 className={styles.title}>Gallery</h1>
        <p className={styles.subtitle}>
          Photos shared by the Odyssey community. Capture yours at{" "}
          <Link href="/capture" className={styles.captureLink}>
            /capture
          </Link>
        </p>
      </header>

      {/* Gallery grid */}
      {loading ? (
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>Loading gallery…</p>
        </div>
      ) : entries.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No photos shared yet.</p>
          <p className={styles.emptyHint}>
            Be the first!{" "}
            <Link href="/capture" className={styles.captureLink}>
              Capture your moment →
            </Link>
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={styles.card}
              onClick={() => setSelectedImage(entry)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={entry.imageUrl}
                  alt={`Photo by ${entry.name}`}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{entry.name}</span>
                <span className={styles.cardFrame}>{entry.frame}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-label="Image preview"
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={`Photo by ${selectedImage.name}`}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxInfo}>
              <span className={styles.lightboxName}>{selectedImage.name}</span>
              <span className={styles.lightboxFrame}>
                {selectedImage.frame}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
