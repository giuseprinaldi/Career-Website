"use client";

import { useCallback } from "react";

type WindowWithWebkitAudio = Window & { webkitAudioContext?: typeof AudioContext };

// Web Audio API retro arcade chime. Returns a memoized player that builds a short-lived
// AudioContext, plays a classic 8-bit double chime, then closes the context so we don't leak
// one per coin insert (browsers cap concurrent AudioContexts).
export function useCoinSynth() {
  return useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const playTone = (freq: number, startTime: number, duration: number, type: OscillatorType = "square") => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      // Classic retro 8-bit double chime (B5 then E6)
      playTone(987.77, ctx.currentTime, 0.08);
      playTone(1318.51, ctx.currentTime + 0.08, 0.25);

      // Release the context once the longest tone has finished (~0.33s).
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 600);
    } catch (err) {
      console.warn("AudioContext blocked by browser policy or unsupported:", err);
    }
  }, []);
}
