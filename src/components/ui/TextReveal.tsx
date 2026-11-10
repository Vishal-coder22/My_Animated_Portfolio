"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/easing";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  duration?: number;
  splitBy?: "chars" | "words";
}

export default function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  duration = 0.6,
  splitBy = "chars",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const spans = el.querySelectorAll<HTMLElement>(
      splitBy === "chars" ? ".char" : ".word"
    );

    gsap.set(spans, { opacity: 0, y: 25, rotateX: -50, filter: "blur(4px)" });

    const tween = gsap.to(spans, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      duration,
      delay,
      stagger: splitBy === "chars" ? 0.015 : 0.08,
      ease: EASE.power4,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
    };
  }, [delay, duration, splitBy, text]);

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("overflow-hidden pb-1", className)}>
      <Tag className="flex flex-wrap text-balance" style={{ transformStyle: "preserve-3d" }}>
        {splitBy === "chars"
          ? text.split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{ perspective: "400px" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))
          : words.map((word, i) => (
              <span
                key={i}
                className="word inline-block mr-[0.25em]"
                style={{ perspective: "400px" }}
              >
                {word}
              </span>
            ))}
      </Tag>
    </div>
  );
}
