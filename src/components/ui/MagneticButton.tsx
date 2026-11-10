"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  as = "button",
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      el.style.transform = `translate(${distX * strength}px, ${distY * strength}px)`;
      el.style.transition = "transform 0.15s ease-out";
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
  }, []);

  const Tag = as === "a" ? "a" : "button";

  return (
    <Tag
      ref={ref as any}
      className={cn("magnetic-element inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={as === "a" ? href : undefined}
      target={as === "a" ? target : undefined}
      rel={as === "a" ? rel : undefined}
      type={as === "a" ? undefined : "button"}
    >
      {children}
    </Tag>
  );
}
