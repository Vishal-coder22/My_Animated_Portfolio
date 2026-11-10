"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/easing";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Vite", "Tailwind CSS", "GSAP", "Three.js", "WebGL"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Flask", "FastAPI", "REST APIs"],
  },
  {
    title: "Data & Streaming",
    skills: ["MongoDB", "SQLite", "Apache Kafka"],
  },
  {
    title: "Machine Learning & AI",
    skills: [
      "scikit-learn",
      "Pandas",
      "Isolation Forest",
      "K-Means",
      "Apriori",
      "Naive Bayes",
      "LLMs (Gemini API)",
      "Prompt Engineering",
      "AI Agents",
    ],
  },
  {
    title: "Testing",
    skills: ["pytest", "Playwright (unit & E2E testing)"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Docker", "Linux"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const categories = container.querySelectorAll(".skill-category");
    const tweens: gsap.core.Tween[] = [];

    categories.forEach((category, catIndex) => {
      const items = category.querySelectorAll(".skill-item");
      tweens.push(
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            delay: catIndex * 0.12,
            ease: EASE.power4,
            scrollTrigger: {
              trigger: category,
              start: "top 88%",
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
    <SectionWrapper id="skills" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)" }}
        />
      </div>
      <div className="relative space-y-16">
        <div className="space-y-4">
          <ScrollReveal>
            <Eyebrow>Skills</Eyebrow>
          </ScrollReveal>
          <TextReveal
            text="My Technical Arsenal"
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]"
          />
        </div>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-category space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="skill-item group flex items-center gap-3 py-2.5 px-3.5 rounded-xl bg-bg-card/50 border border-border/50 hover:border-accent/20 hover:bg-bg-card transition-all duration-300 cursor-default hover:-translate-y-0.5"
                    style={{ transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)" }}
                  >
                    <div                     className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent transition-colors group-hover:shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    <span className="text-text-secondary group-hover:text-text transition-colors text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
