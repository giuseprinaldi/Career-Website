"use client";

import React, { useState, useEffect } from "react";
import ArcadeGate from "@/components/ArcadeGate/ArcadeGate";
import DigitalTwinChat from "@/components/DigitalTwinChat/DigitalTwinChat";

const BYPASS_KEY = "jr_arcade_entered";

// Client shell: owns the arcade-gate state and wraps the (server-rendered) page sections passed
// as children. Keeps the static portfolio content as server components while the interactive
// gate + chat remain client islands.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(BYPASS_KEY) === "true") setGranted(true);
    } catch {
      /* sessionStorage unavailable — show the gate */
    }
  }, []);

  return (
    <>
      {!granted && <ArcadeGate onEnter={() => setGranted(true)} />}
      <div style={{ opacity: granted ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}>{children}</div>
      {granted && <DigitalTwinChat />}
    </>
  );
}
