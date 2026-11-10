"use client";

import { createContext, useContext, useRef } from "react";
import type { RefObject } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LENIS_LERP } from "@/lib/constants";

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const l = new Lenis({
      lerp: LENIS_LERP,
      touchMultiplier: 1.5,
    });

    lenisRef.current = l;

    l.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      l.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.config({ ignoreMobileResize: true });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      l.destroy();
      lenisRef.current = null;
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
