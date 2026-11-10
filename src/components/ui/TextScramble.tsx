"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#_";

function getRandomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function TextScramble({
  text,
  className,
  duration = 1500,
  delay = 0,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevTextRef = useRef("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      if (el.textContent !== text) {
        el.textContent = text;
      }
      return;
    }

    const oldText = prevTextRef.current;
    const newText = text;
    prevTextRef.current = text;

    if (oldText === newText) return;

    const length = Math.max(oldText.length, newText.length);
    const totalFrames = Math.floor(duration / 16);
    const queue: {
      from: string;
      to: string;
      start: number;
      end: number;
      char?: string;
    }[] = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * (totalFrames * 0.4));
      const end = start + Math.floor(Math.random() * (totalFrames * 0.6));
      queue.push({ from, to, start, end });
    }

    let frame = 0;
    let rafId = 0;
    let cancelled = false;

    const animate = () => {
      if (cancelled) return;

      while (el.firstChild) el.removeChild(el.firstChild);

      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          el.appendChild(document.createTextNode(to));
        } else if (frame >= start) {
          if (!queue[i].char || Math.random() < 0.28) {
            queue[i].char = getRandomChar();
          }
          const span = document.createElement("span");
          span.className = "text-accent";
          span.textContent = queue[i].char!;
          el.appendChild(span);
        } else {
          el.appendChild(document.createTextNode(from));
        }
      }

      if (complete < queue.length) {
        frame++;
        rafId = requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [text, duration, delay]);

  return (
    <span className={cn("inline-block relative", className)}>
      <span ref={ref} aria-hidden="true" className="inline-block">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
