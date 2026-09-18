"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Upload, Download, Share2, ImagePlus, Camera, X, SwitchCamera, Globe } from "lucide-react";
import styles from "./Capture.module.css";

/* ─── Frame configuration ──────────────────────────────────────────────── */

const FRAMES = {
  "Story (Solo)": {
    src: "/frames/Template 1080_1920 (Single).png",
    width: 1080,
    height: 1920,
    photo: { x: 160, y: 703, w: 760, h: 772 },
    nameY: 1545,
  },
  "Story (Team)": {
    src: "/frames/Template 1080_1920 (Double).png",
    width: 1080,
    height: 1920,
    photo: { x: 90, y: 788, w: 899, h: 641 },
    nameY: 1541,
  },
  "Post (Solo)": {
    src: "/frames/Template 1080_1350 (Single).png",
    width: 1080,
    height: 1350,
    photo: { x: 215, y: 500, w: 649, h: 627 },
    nameY: 1222,
  },
  "Post (Team)": {
    src: "/frames/Template 1080_1350 (Double).png",
    width: 1080,
    height: 1350,
    photo: { x: 90, y: 507, w: 899, h: 570 },
    nameY: 1179,
  },
};

/* ─── Helper: load an image as HTMLImageElement ────────────────────────── */

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* ─── Helper: calculate cover-fit dimensions ───────────────────────────── */

function coverFit(photoImg, region) {
  const { x, y, w, h } = region;
  const photoAspect = photoImg.width / photoImg.height;
  const regionAspect = w / h;

  if (photoAspect > regionAspect) {
    // Photo is wider — fit height, crop sides
    const drawH = h;
    const drawW = h * photoAspect;
    return { drawX: x + (w - drawW) / 2, drawY: y, drawW, drawH };
  } else {
    // Photo is taller — fit width, crop top/bottom
    const drawW = w;
    const drawH = w / photoAspect;
    return { drawX: x, drawY: y + (h - drawH) / 2, drawW, drawH };
  }
}

/* ─── Helper: composite photo + frame on canvas ───────────────────────── */

async function composite(photoDataUrl, frameKey, userName) {
  const frame = FRAMES[frameKey];
  const [photoImg, frameImg] = await Promise.all([
    loadImage(photoDataUrl),
    loadImage(frame.src),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = frame.width;
  canvas.height = frame.height;
  const ctx = canvas.getContext("2d");

  const { x, y, w, h } = frame.photo;
  const { drawX, drawY, drawW, drawH } = coverFit(photoImg, frame.photo);

  // Frames are opaque — punch out the inner region and draw photo behind
  ctx.drawImage(frameImg, 0, 0, frame.width, frame.height);

  // Clear the inner region
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.clearRect(x, y, w, h);
  ctx.restore();

  // Draw photo behind the frame
  ctx.save();
  ctx.globalCompositeOperation = "destination-over";
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(photoImg, drawX, drawY, drawW, drawH);
  ctx.restore();

  // Render user's name over the "NAME HERE" placeholder
  if (userName && userName.trim()) {
    const nameText = userName.trim().toUpperCase();
    const fontSize = Math.round(frame.width * 0.037);
    ctx.font = `700 ${fontSize}px "Inter", "Cinzel", sans-serif`;
    ctx.fillStyle = "#fffaf1";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = `${fontSize * 0.15}px`;
    ctx.fillText(nameText, frame.width / 2, frame.nameY);
  }

  return canvas;
}

/* ─── Main component ──────────────────────────────────────────────────── */

export default function CapturePage() {
  const [photo, setPhoto] = useState(null); // data URL of uploaded photo
  const [selectedFrame, setSelectedFrame] = useState("Story (Solo)");
  const [resultUrl, setResultUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState("");
  const [userName, setUserName] = useState("");
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  /* ── Show toast ────────────────────────────────────────────────── */
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }, []);

  /* ── Handle file selection ─────────────────────────────────────── */
  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
      setResultUrl(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e) => handleFile(e.target.files?.[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  /* ── Generate composited image ─────────────────────────────────── */
  const generate = useCallback(async () => {
    if (!photo) return;
    setProcessing(true);
    setResultUrl(null);

    try {
      const canvas = await composite(photo, selectedFrame, userName);
      canvasRef.current = canvas;
      setResultUrl(canvas.toDataURL("image/png"));
      setShowSharePopup(true);
    } catch (err) {
      console.error("Compositing failed:", err);
      showToast("Something went wrong. Try a different photo.");
    } finally {
      setProcessing(false);
    }
  }, [photo, selectedFrame, userName, showToast]);

  /* ── Regenerate when frame changes after photo is loaded ───────── */
  const switchFrame = useCallback(
    (key) => {
      setSelectedFrame(key);
      if (photo) {
        setTimeout(async () => {
          setProcessing(true);
          setResultUrl(null);
          try {
            const canvas = await composite(photo, key, userName);
            canvasRef.current = canvas;
            setResultUrl(canvas.toDataURL("image/png"));
            setShowSharePopup(true);
          } catch {
            showToast("Failed to generate. Please try again.");
          } finally {
            setProcessing(false);
          }
        }, 50);
      }
    },
    [photo, userName, showToast],
  );

  /* ── Download ──────────────────────────────────────────────────── */
  const handleDownload = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `odyssey-capture-${selectedFrame.replace(":", "x")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Image downloaded!");
  }, [resultUrl, selectedFrame, showToast]);

  /* ── Share (image directly via Web Share API) ──────────────────── */
  const handleShare = useCallback(async () => {
    if (!canvasRef.current) return;

    try {
      // Convert canvas to blob
      const blob = await new Promise((resolve) =>
        canvasRef.current.toBlob(resolve, "image/png"),
      );

      const file = new File(
        [blob],
        `odyssey-capture-${selectedFrame.replace(":", "x")}.png`,
        { type: "image/png" },
      );

      // Check if the browser supports sharing files
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "ODYSSEY — My Capture",
          text: "Check out my ODYSSEY moment! 🚀",
          files: [file],
        });
        showToast("Shared successfully!");
      } else if (navigator.share) {
        // Fallback: share without files (some browsers)
        // Download the image and show a message
        handleDownload();
        showToast("Image downloaded — share it manually!");
      } else {
        // No Web Share API — just download
        handleDownload();
        showToast("Image downloaded — share it from your gallery!");
      }
    } catch (err) {
      // User cancelled the share sheet — not an error
      if (err.name !== "AbortError") {
        handleDownload();
        showToast("Image downloaded — share it manually!");
      }
    }
  }, [selectedFrame, showToast, handleDownload]);

  /* ── Webcam ────────────────────────────────────────────────────── */
  const openWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      setWebcamOpen(true);
      // Attach stream to video element after state update
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    } catch (err) {
      console.error("Webcam error:", err);
      if (err.name === "NotAllowedError") {
        showToast("Camera permission denied.");
      } else if (err.name === "NotFoundError") {
        showToast("No camera found on this device.");
      } else {
        showToast("Could not access camera.");
      }
    }
  }, [facingMode, showToast]);

  const closeWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setWebcamOpen(false);
  }, []);

  const captureWebcam = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const c = document.createElement("canvas");
    c.width = video.videoWidth;
    c.height = video.videoHeight;
    c.getContext("2d").drawImage(video, 0, 0);
    setPhoto(c.toDataURL("image/png"));
    setResultUrl(null);
    closeWebcam();
  }, [closeWebcam]);

  const toggleFacingMode = useCallback(async () => {
    const next = facingMode === "user" ? "environment" : "user";
    setFacingMode(next);
    // Restart stream with new facing mode
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: next, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      showToast("Could not switch camera.");
    }
  }, [facingMode, showToast]);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  /* ── Reset ─────────────────────────────────────────────────────── */
  const handleNewPhoto = () => {
    setPhoto(null);
    setResultUrl(null);
    canvasRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <div className={styles.capturePage}>
      {/* Back to home */}
      <Link href="/" className={styles.backLink}>
        <span className={styles.backArrow}>←</span>
        Home
      </Link>

      {/* Header */}
      <header className={styles.header}>
        <div className={`${styles.badge} ${styles.animateIn}`}>
          <span className={styles.badgeLine} />
          <span className={styles.badgeText}>Capture Your Moment</span>
          <span className={styles.badgeLine} />
        </div>
        <h1 className={`${styles.title} ${styles.animateIn} ${styles.animDelay1}`}>
          Frame Your Journey
        </h1>
        <p className={`${styles.subtitle} ${styles.animateIn} ${styles.animDelay2}`}>
          Upload a photo, choose your frame, and carry the Odyssey with you.
        </p>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Frame selector — always visible */}
        <div className={`${styles.frameSelector} ${styles.animateIn} ${styles.animDelay3}`}>
          {Object.keys(FRAMES).map((key) => (
            <button
              key={key}
              type="button"
              className={`${styles.frameBtn} ${selectedFrame === key ? styles.frameBtnActive : ""}`}
              onClick={() => switchFrame(key)}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Name input */}
        <div className={`${styles.nameInputWrapper} ${styles.animateIn} ${styles.animDelay3}`}>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.nameInput}
            maxLength={30}
          />
        </div>

        {/* Upload zone — shown when no photo selected */}
        {!photo && (
          <div className={`${styles.uploadGroup} ${styles.animateIn} ${styles.animDelay3}`}>
            <div
              className={`${styles.uploadZone} ${dragOver ? styles.dragOver : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
              }}
            >
              <div className={styles.uploadIcon}>
                <Upload size={24} strokeWidth={1.8} />
              </div>
              <p className={styles.uploadLabel}>
                Drag & drop your photo here, or <strong>browse</strong>
              </p>
              <span className={styles.uploadHint}>
                Supports JPG, PNG, WebP — max 20 MB
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={onFileChange}
                tabIndex={-1}
              />
            </div>

            <div className={styles.uploadDivider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerText}>or</span>
              <span className={styles.dividerLine} />
            </div>

            <button
              type="button"
              className={styles.cameraBtn}
              onClick={openWebcam}
            >
              <Camera size={20} strokeWidth={1.8} />
              Take a Photo
            </button>
          </div>
        )}

        {/* Photo selected but not yet generated */}
        {photo && !resultUrl && !processing && (
          <div className={styles.previewWrapper}>
            <div className={styles.previewCard}>
              <img
                src={photo}
                alt="Your uploaded photo"
                className={styles.previewImage}
              />
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.downloadBtn}`}
                onClick={generate}
              >
                <ImagePlus className={styles.actionIcon} />
                Generate
              </button>
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.newPhotoBtn}`}
                onClick={handleNewPhoto}
              >
                Change Photo
              </button>
            </div>
          </div>
        )}

        {/* Processing */}
        {processing && (
          <div className={styles.previewWrapper}>
            <div className={styles.previewCard}>
              <div className={styles.previewLoading}>
                <div className={styles.spinner} />
                <span>Crafting your frame…</span>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {resultUrl && (
          <div className={styles.previewWrapper}>
            <div className={styles.previewCard}>
              <img
                src={resultUrl}
                alt="Your framed photo"
                className={styles.previewImage}
              />
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.downloadBtn}`}
                onClick={handleDownload}
              >
                <Download className={styles.actionIcon} />
                Download
              </button>
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.shareBtn}`}
                onClick={handleShare}
              >
                <Share2 className={styles.actionIcon} />
                Share
              </button>
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.newPhotoBtn}`}
                onClick={handleNewPhoto}
              >
                <Upload className={styles.actionIcon} />
                New Photo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Webcam modal */}
      {webcamOpen && (
        <div className={styles.webcamOverlay}>
          <div className={styles.webcamContainer}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={styles.webcamVideo}
            />
            <div className={styles.webcamControls}>
              <button
                type="button"
                className={styles.webcamCloseBtn}
                onClick={closeWebcam}
                aria-label="Close camera"
              >
                <X size={24} />
              </button>
              <button
                type="button"
                className={styles.webcamShutter}
                onClick={captureWebcam}
                aria-label="Take photo"
              >
                <div className={styles.shutterInner} />
              </button>
              <button
                type="button"
                className={styles.webcamFlipBtn}
                onClick={toggleFacingMode}
                aria-label="Switch camera"
              >
                <SwitchCamera size={22} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Publicly popup */}
      {showSharePopup && (
        <div className={styles.popupOverlay} onClick={() => setShowSharePopup(false)}>
          <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.popupClose}
              onClick={() => setShowSharePopup(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className={styles.popupIcon}>
              <Globe size={28} strokeWidth={1.5} />
            </div>
            <h3 className={styles.popupTitle}>Share to Gallery?</h3>
            <p className={styles.popupDesc}>
              Your framed photo will appear in the public Odyssey gallery for everyone to see.
            </p>
            <div className={styles.popupActions}>
              <button
                type="button"
                className={`${styles.popupBtn} ${styles.popupBtnPrimary}`}
                disabled={uploading}
                onClick={async () => {
                  setUploading(true);
                  try {
                    const res = await fetch("/api/gallery", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        image: resultUrl,
                        name: userName || "Anonymous",
                        frame: selectedFrame,
                      }),
                    });
                    if (res.ok) {
                      showToast("Shared to gallery!");
                    } else {
                      showToast("Upload failed. Try again.");
                    }
                  } catch {
                    showToast("Could not upload. Check your connection.");
                  } finally {
                    setUploading(false);
                    setShowSharePopup(false);
                  }
                }}
              >
                {uploading ? "Uploading…" : "Share Publicly"}
              </button>
              <button
                type="button"
                className={`${styles.popupBtn} ${styles.popupBtnSecondary}`}
                onClick={() => setShowSharePopup(false)}
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>
        {toast}
      </div>
    </div>
  );
}
