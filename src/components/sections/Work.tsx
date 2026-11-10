"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/easing";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";

export default function Work() {
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const cards = grid.querySelectorAll(".project-card");
    const tweens: gsap.core.Tween[] = [];

    cards.forEach((card, i) => {
      tweens.push(
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: i * 0.12,
            ease: EASE.expo,
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        )
      );
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <SectionWrapper id="work" className="py-24 sm:py-32 lg:py-40">
      <div className="space-y-16">
        <div className="space-y-4">
          <ScrollReveal>
            <Eyebrow>Work</Eyebrow>
          </ScrollReveal>
          <TextReveal
            text="Selected Projects"
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]"
          />
        </div>

        <ul
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 list-none"
          role="list"
          aria-label="Featured projects"
        >
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
