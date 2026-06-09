"use client";

import React, { useState } from "react";

export interface GalleryImage {
  src: string;
  label: string;
}

// Small client-side image gallery: a large active image plus a row of clickable thumbnails.
// Used inside the (server) Portfolio section for projects with multiple screenshots.
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={current.src}
        alt={`${current.label} screenshot`}
        style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border-subtle)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", display: "block" }}
      />

      <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
        {images.map((img, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-label={`View ${img.label}`}
              aria-current={isActive}
              style={{
                padding: 0,
                border: `2px solid ${isActive ? "var(--accent-emerald)" : "var(--border-subtle)"}`,
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "pointer",
                background: "none",
                opacity: isActive ? 1 : 0.6,
                transition: "opacity var(--transition-fast), border-color var(--transition-fast)",
                lineHeight: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt="" style={{ width: "72px", height: "44px", objectFit: "cover", objectPosition: "top left", display: "block" }} />
            </button>
          );
        })}
      </div>

      <span style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.08em", color: "var(--accent-cyan)" }}>
        {active + 1} / {images.length} · {current.label}
      </span>
    </div>
  );
}
