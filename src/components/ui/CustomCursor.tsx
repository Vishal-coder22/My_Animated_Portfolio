"use client";

import { useEffect, useRef, useCallback } from "react";
import { CURSOR_LERP } from "@/lib/constants";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const showLabel = useRef(false);
  const isVisible = useRef(false);
  const trailRef = useRef<HTMLDivElement>(null);
  const trailPositions = useRef<{ x: number; y: number }[]>([]);
  const TRAIL_LENGTH = 5;
  const rafId = useRef<number>(0);

  const lerp = useCallback((a: number, b: number, t: number) => {
    return a + (b - a) * t;
  }, []);

  useEffect(() => {
    const isTouchDevice = navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!isVisible.current) isVisible.current = true;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest(".magnetic-element");

      isHovering.current = !!isInteractive;

      const isProjectCard = target.closest(".project-card");
      showLabel.current = !!isProjectCard;
    };

    const handleMouseDown = () => { isClicking.current = true; };
    const handleMouseUp = () => { isClicking.current = false; };
    const handleMouseEnter = () => { isVisible.current = true; };
    const handleMouseLeave = () => { isVisible.current = false; };

    const animate = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      const label = labelRef.current;

      if (ring && dot) {
        ringPos.current.x = lerp(ringPos.current.x, pos.current.x, CURSOR_LERP);
        ringPos.current.y = lerp(ringPos.current.y, pos.current.y, CURSOR_LERP);

        const ringScale = isClicking.current ? 0.7 : 1;
        const ringWidth = showLabel.current ? 80 : isHovering.current ? 64 : 40;
        const ringHeight = showLabel.current ? 32 : isHovering.current ? 64 : 40;

        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
        ring.style.opacity = isVisible.current ? "1" : "0";
        ring.style.transform = `translate(-50%, -50%) scale(${ringScale})`;
        ring.style.width = `${ringWidth}px`;
        ring.style.height = `${ringHeight}px`;
        ring.style.borderColor = isHovering.current || showLabel.current
          ? "var(--color-accent)"
          : "rgba(255, 255, 255, 0.2)";
        ring.style.background = isHovering.current || showLabel.current
          ? "rgba(245, 158, 11, 0.08)"
          : "transparent";

        const dotScale = isClicking.current ? 0.5 : isHovering.current ? 1.5 : 1;
        dot.style.left = `${pos.current.x}px`;
        dot.style.top = `${pos.current.y}px`;
        dot.style.opacity = isVisible.current ? "1" : "0";
        dot.style.transform = `translate(-50%, -50%) scale(${dotScale})`;
        dot.style.background = isHovering.current
          ? "var(--color-accent)"
          : "#F5F5F5";

        if (label) {
          label.style.opacity = showLabel.current && isVisible.current ? "1" : "0";
        }

        // Trail
        if (isVisible.current) {
          trailPositions.current.unshift({ x: pos.current.x, y: pos.current.y });
          if (trailPositions.current.length > TRAIL_LENGTH) {
            trailPositions.current.pop();
          }
          const trailEl = trailRef.current;
          if (trailEl) {
            const dots = trailEl.children;
            for (let i = 0; i < dots.length; i++) {
              const dot = dots[i] as HTMLDivElement;
              const p = trailPositions.current[i];
              if (p) {
                dot.style.left = `${p.x}px`;
                dot.style.top = `${p.y}px`;
                dot.style.opacity = `${0.3 - i * 0.06}`;
                dot.style.transform = `translate(-50%, -50%) scale(${1 - i * 0.15})`;
              } else {
                dot.style.opacity = "0";
              }
            }
          }
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [lerp]);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] rounded-full border-[1.5px] border-accent flex items-center justify-center will-change-[transform]"
        style={{
          transform: "translate(-50%, -50%)",
          width: 40,
          height: 40,
          transition: "width 0.35s cubic-bezier(0.23, 1, 0.32, 1), height 0.35s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s ease, background 0.3s ease",
        }}
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="text-[9px] font-semibold uppercase tracking-widest text-accent opacity-0 transition-opacity duration-300 whitespace-nowrap select-none"
        >
          View
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-accent mix-blend-difference will-change-[transform]"
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      />
      <div ref={trailRef} className="fixed pointer-events-none z-[9997]" aria-hidden="true">
        {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
            style={{
              transform: "translate(-50%, -50%)",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </>
  );
}
