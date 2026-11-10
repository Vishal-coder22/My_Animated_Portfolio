"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import Preloader from "@/components/sections/Preloader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

const AuroraHexGrid = dynamic(
  () => import("@/components/background/AuroraHexGrid"),
  { ssr: false }
);

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full py-4" aria-hidden="true">
      <hr className="w-full border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 transition-all duration-700",
          active
            ? "bg-accent opacity-100 scale-100"
            : "bg-border opacity-0 scale-50"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="relative">
        <AuroraHexGrid />
        <div className="relative z-10">
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Work />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Contact />
        </div>
      </div>
    </>
  );
}
