"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/easing";
import { navLinks } from "@/lib/nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && ref.current) {
        const focusable = linksRef.current.filter(Boolean);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;

      gsap.set(el, { display: "flex" });
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: EASE.power2 }
      );

      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 0.03, scale: 1, duration: 0.8, ease: EASE.power4, delay: 0.1 }
        );
      }

      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 50, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.08,
          ease: EASE.expo,
          delay: 0.15,
          onComplete: () => {
            linksRef.current[0]?.focus();
          },
        }
      );

      document.addEventListener("keydown", handleKeyDown);
    } else {
      gsap.to(linksRef.current, {
        opacity: 0,
        y: -30,
        filter: "blur(4px)",
        duration: 0.35,
        stagger: 0.04,
        ease: EASE.power2,
      });

      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: EASE.power2,
        onComplete: () => {
          gsap.set(el, { display: "none" });
          previousFocus.current?.focus();
        },
      });

      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-40 flex-col items-center justify-center bg-bg/80 backdrop-blur-2xl md:hidden"
      style={{ display: "none" }}
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <span className="text-[20vw] font-bold text-text leading-none select-none">
          VKS
        </span>
      </div>

      <nav className="relative flex flex-col items-center gap-6">
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            ref={(el) => {
              if (el) linksRef.current[i] = el;
            }}
            href={link.href}
            onClick={onClose}
            className="group flex items-center gap-4"
            tabIndex={isOpen ? 0 : -1}
          >
            <span className="text-[10px] font-mono text-accent/50 group-hover:text-accent transition-colors">
              {link.num}
            </span>
            <span className="text-4xl sm:text-5xl font-bold text-text group-hover:text-accent transition-colors duration-300">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
