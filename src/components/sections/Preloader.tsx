"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/easing";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (ref.current) ref.current.style.display = "none";
      return;
    }

    const counter = counterRef.current;
    const el = ref.current;
    const progress = progressRef.current;
    if (!counter || !el) return;

    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      value: 100,
      duration: 2,
      ease: "steps(20)",
      onUpdate: () => {
        const val = Math.floor(obj.value);
        counter.textContent = String(val).padStart(2, "0");
        if (progress) {
          progress.style.transform = `scaleX(${obj.value / 100})`;
        }
      },
      onComplete: () => {
        gsap.to(el, {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1,
          ease: EASE.power4,
          delay: 0.2,
          onComplete: () => {
            isVisibleRef.current = false;
            el.style.display = "none";
          },
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative text-center space-y-6">
        {/* VKS Logo */}
        <div className="text-sm font-medium uppercase tracking-[0.3em] text-accent/60">
          VKS
        </div>

        {/* Counter */}
        <span
          ref={counterRef}
          className="block text-7xl sm:text-9xl font-bold text-accent tabular-nums leading-none"
        >
          00
        </span>

        {/* Progress bar */}
        <div className="w-48 h-px bg-border mx-auto overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-accent origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
