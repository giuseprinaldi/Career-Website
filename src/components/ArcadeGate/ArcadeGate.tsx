"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useCoinSynth } from "./useCoinSynth";

// --- Tunable constants (was magic numbers scattered in the component) ---
const SNAP_RADIUS_PX = 85; // how close the coin center must get to the slot to count as inserted
const PHASE_WELCOME_MS = 600; // "CREDIT RECEIVED" -> "WELCOME"
const PHASE_PORTAL_MS = 1800; // start fading the gate out
const PHASE_GRANT_MS = 2400; // hand control to the site

export default function ArcadeGate({ onEnter }: { onEnter: () => void }) {
  const [isInserted, setIsInserted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [coinOffset, setCoinOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [screenText, setScreenText] = useState("INSERT COIN TO START");
  const [isFlashing, setIsFlashing] = useState(true);
  const [showPortal, setShowPortal] = useState(false);

  const coinRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const playCoinSound = useCoinSynth();

  // Runs the full success cinematic. Called from a successful drag-drop OR from the
  // spacebar/Enter keyboard path. Animates the coin into the slot, plays the chime, and
  // hands off to onEnter() once the sequence finishes.
  const completeInsert = useCallback(() => {
    if (isInserted) return;

    let snapX = coinOffset.x;
    let snapY = coinOffset.y;
    if (coinRef.current && slotRef.current) {
      const coinRect = coinRef.current.getBoundingClientRect();
      const slotRect = slotRef.current.getBoundingClientRect();
      const coinCenter = { x: coinRect.left + coinRect.width / 2, y: coinRect.top + coinRect.height / 2 };
      const slotCenter = { x: slotRect.left + slotRect.width / 2, y: slotRect.top + slotRect.height / 2 };
      snapX = slotCenter.x - coinCenter.x + coinOffset.x;
      snapY = slotCenter.y - coinCenter.y + coinOffset.y;
    }

    setIsInserted(true);
    setCoinOffset({ x: snapX, y: snapY });
    playCoinSound();
    setScreenText("CREDIT RECEIVED");
    setIsFlashing(false);

    // Persist the bypass immediately so closing the tab mid-cinematic still skips the gate next time.
    try {
      sessionStorage.setItem("jr_arcade_entered", "true");
    } catch {
      /* sessionStorage unavailable (private mode, etc.) — non-fatal */
    }

    setTimeout(() => {
      setScreenText("WELCOME, FRIEND");
      setIsFlashing(true);
    }, PHASE_WELCOME_MS);
    setTimeout(() => setShowPortal(true), PHASE_PORTAL_MS);
    setTimeout(() => onEnter(), PHASE_GRANT_MS);
  }, [isInserted, coinOffset, playCoinSound, onEnter]);

  // --- Drag handlers ---
  const handleStart = (clientX: number, clientY: number) => {
    if (isInserted) return;
    setIsDragging(true);
    setIsReturning(false);
    setDragStart({ x: clientX - coinOffset.x, y: clientY - coinOffset.y });
  };

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;
      setCoinOffset({ x: clientX - dragStart.x, y: clientY - dragStart.y });
    },
    [isDragging, dragStart],
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (coinRef.current && slotRef.current) {
      const coinRect = coinRef.current.getBoundingClientRect();
      const slotRect = slotRef.current.getBoundingClientRect();
      const coinCenter = { x: coinRect.left + coinRect.width / 2, y: coinRect.top + coinRect.height / 2 };
      const slotCenter = { x: slotRect.left + slotRect.width / 2, y: slotRect.top + slotRect.height / 2 };
      const distance = Math.hypot(coinCenter.x - slotCenter.x, coinCenter.y - slotCenter.y);

      if (distance < SNAP_RADIUS_PX) {
        completeInsert();
      } else {
        setIsReturning(true);
        setCoinOffset({ x: 0, y: 0 });
      }
    }
  }, [isDragging, completeInsert]);

  // Bind global move/end while dragging. Includes coinOffset-dependent callbacks in deps so
  // handleEnd never reads a stale offset (was a stale-closure bug).
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onMouseUp = () => handleEnd();
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // Spacebar / Enter inserts the coin automatically — the keyboard-accessible path.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isInserted) return;
      if (e.code === "Space" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        completeInsert();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isInserted, completeInsert]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "var(--bg-base)",
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(16, 22, 35, 0.85) 0%, var(--bg-base) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: showPortal ? 0 : 1,
        transform: showPortal ? "scale(1.15)" : "scale(1)",
        transition: "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        pointerEvents: showPortal ? "none" : "auto",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Scanline CRT overlay */}
      <div className="scanline" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          zIndex: 10,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* Header Title */}
        <div style={{ textAlign: "center" }}>
          <span className="edgy-badge" style={{ marginBottom: "10px", border: "1px solid rgba(6,182,212,0.4)", color: "var(--accent-cyan)", background: "rgba(6,182,212,0.08)" }}>
            JR // SCRUM MASTER // SYSTEM BOOT
          </span>
          <h1 style={{ fontSize: "2.3rem", fontWeight: "800", color: "#fff", letterSpacing: "-0.01em", textShadow: "0 0 30px rgba(255,255,255,0.05)" }}>
            ENTER THE CORE
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--fg-subtle)", fontFamily: "var(--font-mono)", marginTop: "4px" }}>
            INSERT THE COIN — OR JUST TAP ENTER
          </p>
          <button
            onClick={completeInsert}
            className="edgy-btn edgy-btn-primary"
            style={{ marginTop: "16px", fontSize: "0.9rem", padding: "12px 26px" }}
          >
            Enter site →
          </button>
        </div>

        {/* ARCADE CABINET */}
        <div className="cabinet-container-3d" style={{ width: "100%", height: "550px" }}>
          <div
            className="cabinet-body-3d"
            style={{
              width: "380px",
              height: "530px",
              background: "linear-gradient(180deg, #111420 0%, #06080e 100%)",
              border: "4px solid #1e293b",
              borderRadius: "24px",
              boxShadow: "0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(16, 185, 129, 0.08), inset 0 2px 5px rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px",
              overflow: "visible",
            }}
          >
            <div className="cabinet-side-decal decal-left" />
            <div className="cabinet-side-decal decal-right" />

            {/* Marquee */}
            <div
              style={{
                width: "100%",
                height: "52px",
                background: "linear-gradient(180deg, #090e1a 0%, #020408 100%)",
                border: "3px solid var(--accent-emerald)",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 15px rgba(16, 185, 129, 0.25)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50%", background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)", pointerEvents: "none" }} />
              <span
                className="glow-text"
                style={{ fontFamily: "var(--font-mono)", fontWeight: "900", letterSpacing: "0.22em", color: "var(--accent-emerald)", fontSize: "0.95rem", textShadow: "0 0 8px rgba(16, 185, 129, 0.8)" }}
              >
                RINALDI // AGILE
              </span>
              <span style={{ fontSize: "0.55rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", opacity: 0.8, letterSpacing: "0.1em" }}>
                MODEL 01 // SERVANT-LEADER
              </span>
            </div>

            {/* Speaker grilles */}
            <div style={{ width: "90%", height: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "4px 0 -4px 0", opacity: 0.6 }}>
              {[...Array(14)].map((_, i) => (
                <span key={i} style={{ width: "3px", height: "8px", background: "#1f2937", borderRadius: "1px" }} />
              ))}
            </div>

            {/* CRT bezel */}
            <div
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #1e293b 0%, #0b0f19 100%)",
                border: "3px solid #334155",
                borderTopColor: "#475569",
                borderBottomColor: "#1e293b",
                borderRadius: "14px",
                padding: "12px",
                boxShadow: "inset 0 6px 12px rgba(0,0,0,0.85), 0 4px 6px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
                margin: "8px 0",
              }}
            >
              <div className="crt-bulb-container" style={{ width: "100%", height: "100%", minHeight: "185px" }}>
                <div
                  className="crt-screen crt-bulb-glass"
                  style={{ width: "100%", height: "100%", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "0.7rem", background: "#040c08" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(16,185,129,0.45)" }}>
                    <span>PORTAL_ACTIVE: YES</span>
                    <span>LINK_LOCK: SECURE</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                    <div style={{ fontSize: "0.6rem", color: "var(--accent-cyan)", opacity: 0.7 }}>
                      DIAGNOSTIC STATUS: OK // BAUD 9600
                    </div>
                    <div
                      className={isFlashing ? "screen-flash-text" : ""}
                      style={{
                        textAlign: "center",
                        color: screenText.includes("WELCOME") ? "var(--accent-cyan)" : "var(--accent-emerald)",
                        fontSize: "0.95rem",
                        fontWeight: "900",
                        textShadow: screenText.includes("WELCOME") ? "0 0 12px rgba(6, 182, 212, 0.75)" : "0 0 12px rgba(16, 185, 129, 0.75)",
                        letterSpacing: "0.08em",
                        lineHeight: "1.4",
                      }}
                    >
                      {screenText}
                    </div>
                  </div>

                  <div style={{ color: "rgba(16,185,129,0.35)", fontSize: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>CREDITS: {isInserted ? "01" : "00"}</span>
                    <span>CORE_MEM: OK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Control panel */}
            <div
              style={{
                width: "104%",
                height: "60px",
                borderRadius: "10px",
                position: "relative",
                transform: "translateZ(12px) rotateX(-8deg)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.7), inset 0 2px 2px rgba(255,255,255,0.1)",
                zIndex: 4,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 18px",
                border: "3px solid #334155",
                borderTopColor: "#475569",
              }}
            >
              <div className="carbon-fiber-deck" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }} />
              <div className="hazard-stripes" style={{ position: "absolute", left: 0, top: 0, width: "12px", height: "100%" }} />
              <div className="hazard-stripes" style={{ position: "absolute", right: 0, top: 0, width: "12px", height: "100%" }} />

              <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "12px" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                  <div style={{ width: "36px", height: "12px", background: "#111827", borderRadius: "50%", border: "1px solid #1f2937", boxShadow: "0 2px 4px rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="joystick-shaft" style={{ transform: isDragging ? "rotate(15deg)" : "rotate(0deg)", transition: "transform 0.1s" }}>
                      <div className="joystick-ball" style={{ top: "-14px", left: "-7px" }} />
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: "0.6rem", color: "var(--fg-muted)", fontFamily: "var(--font-mono)", fontWeight: "bold", opacity: 0.8 }}>JOYSTICK</span>
              </div>

              <div style={{ display: "flex", gap: "10px", paddingRight: "12px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#000", padding: "1px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 2px rgba(255,255,255,0.1)" }}>
                  <div className="plunger-button-green" style={{ width: "18px", height: "18px", borderRadius: "50%" }} />
                </div>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#000", padding: "1px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 2px rgba(255,255,255,0.1)" }}>
                  <div className="plunger-button-cyan" style={{ width: "18px", height: "18px", borderRadius: "50%" }} />
                </div>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#000", padding: "1px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 2px rgba(255,255,255,0.1)" }}>
                  <div className="plunger-button-yellow" style={{ width: "18px", height: "18px", borderRadius: "50%" }} />
                </div>
              </div>
            </div>

            {/* Coin door */}
            <div
              style={{
                width: "160px",
                height: "105px",
                marginTop: "16px",
                borderRadius: "8px",
                border: "3px solid #11131a",
                borderTopColor: "#222533",
                borderLeftColor: "#222533",
                backgroundImage: "radial-gradient(circle, #242836 0%, #11131a 100%)",
                boxShadow: "inset 0 0 16px rgba(0,0,0,0.95), 0 4px 8px rgba(0,0,0,0.5)",
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <span style={{ position: "absolute", top: "3px", left: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "#475569", boxShadow: "1px 1px 0 rgba(255,255,255,0.1)" }} />
              <span style={{ position: "absolute", top: "3px", right: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "#475569", boxShadow: "1px 1px 0 rgba(255,255,255,0.1)" }} />
              <span style={{ position: "absolute", bottom: "3px", left: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "#475569", boxShadow: "1px 1px 0 rgba(255,255,255,0.1)" }} />
              <span style={{ position: "absolute", bottom: "3px", right: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "#475569", boxShadow: "1px 1px 0 rgba(255,255,255,0.1)" }} />

              <span style={{ position: "absolute", top: "35px", left: "-2px", width: "4px", height: "16px", background: "#334155", borderRadius: "0 2px 2px 0", border: "1px solid #11131a" }} />
              <div style={{ position: "absolute", top: "8px", right: "12px", width: "14px", height: "14px", borderRadius: "50%", background: "linear-gradient(135deg, #64748b 0%, #1e293b 100%)", border: "1px solid #475569", boxShadow: "0 1px 2px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ width: "2px", height: "6px", background: "#000", borderRadius: "1.5px" }} />
              </div>

              <div style={{ display: "flex", gap: "28px", marginTop: "2px" }}>
                {/* Active slot */}
                <div
                  ref={slotRef}
                  className="neon-border-red"
                  style={{ width: "30px", height: "46px", background: "#030408", border: "2px solid #ef4444", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "3px 0", position: "relative" }}
                >
                  <span style={{ fontSize: "0.45rem", color: "#ef4444", fontWeight: "bold", fontFamily: "var(--font-mono)", transform: "scale(0.8)" }}>25¢</span>
                  <div style={{ width: "3.5px", height: "18px", background: isInserted ? "#374151" : "#ef4444", boxShadow: isInserted ? "none" : "0 0 6px rgba(239, 68, 68, 0.8)", borderRadius: "1px", transition: "background-color 0.3s ease" }} />
                  <div style={{ width: "14px", height: "9px", background: isInserted ? "#7c2d12" : "#f97316", border: "1px solid #ea580c", borderRadius: "1px", boxShadow: isInserted ? "none" : "0 0 5px rgba(249, 115, 22, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: "0.22rem", color: "#fff", fontWeight: "bold", transform: "scale(0.75)", letterSpacing: "-0.05em" }}>PUSH</span>
                  </div>
                </div>

                {/* Decorative slot */}
                <div className="neon-border-red" style={{ width: "30px", height: "46px", background: "#030408", border: "2px solid #ef4444", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "3px 0", opacity: 0.85 }}>
                  <span style={{ fontSize: "0.45rem", color: "#ef4444", fontWeight: "bold", fontFamily: "var(--font-mono)", transform: "scale(0.8)" }}>25¢</span>
                  <div style={{ width: "3.5px", height: "18px", background: "#ef4444", boxShadow: "0 0 6px rgba(239, 68, 68, 0.8)", borderRadius: "1px" }} />
                  <div style={{ width: "14px", height: "9px", background: "#f97316", border: "1px solid #ea580c", borderRadius: "1px", boxShadow: "0 0 5px rgba(249, 115, 22, 0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "0.22rem", color: "#fff", fontWeight: "bold", transform: "scale(0.75)", letterSpacing: "-0.05em" }}>PUSH</span>
                  </div>
                </div>
              </div>

              <div style={{ width: "48px", height: "22px", background: "#070a10", border: "1px solid #2d3748", borderBottom: "none", borderRadius: "5px 5px 0 0", boxShadow: "inset 0 4px 6px rgba(0,0,0,0.9)", position: "relative", overflow: "hidden" }}>
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #374151 0%, #1f2937 100%)", borderBottom: "1px solid #4b5563", transform: "rotateX(25deg)", transformOrigin: "top center", boxShadow: "0 2px 2px rgba(0,0,0,0.5)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable coin */}
      <div
        style={{ position: "absolute", right: "8%", bottom: "18%", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", zIndex: 100 }}
      >
        <div
          ref={coinRef}
          role="button"
          tabIndex={0}
          aria-label="Insert coin to enter the site. Or press the spacebar."
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }}
          className={isDragging || isInserted ? "" : "spinning-coin-float"}
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #ffe680 0%, #f5b041 65%, #c0392b 100%)",
            border: "3px solid #ffeb99",
            boxShadow: isDragging ? "0 20px 35px rgba(245, 176, 65, 0.65), 0 0 25px rgba(245, 176, 65, 0.45)" : "0 0 25px rgba(245, 176, 65, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isInserted ? "default" : isDragging ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "none",
            transform: isInserted
              ? `translate3d(${coinOffset.x}px, ${coinOffset.y}px, 0) scale(0)`
              : `translate3d(${coinOffset.x}px, ${coinOffset.y}px, 0)`,
            transition: isReturning
              ? "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              : isInserted
                ? "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out"
                : "none",
            opacity: isInserted ? 0 : 1,
          }}
        >
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "2px dashed rgba(139, 93, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255, 230, 128, 0.1)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: "900", fontSize: "1.15rem", color: "#5c4308", textShadow: "1px 1px 0px rgba(255,255,255,0.4)" }}>JR</span>
          </div>
        </div>

        {!isInserted && (
          <div
            className="screen-flash-text"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(245, 176, 65, 0.85)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold", background: "rgba(245,176,65,0.05)", padding: "4px 8px", borderRadius: "4px", border: "1px solid rgba(245,176,65,0.2)", pointerEvents: "none" }}
          >
            <span>DRAG COIN — OR PRESS SPACE</span>
          </div>
        )}
      </div>
    </div>
  );
}
