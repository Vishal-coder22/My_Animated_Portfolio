"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/easing";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";

const experiences = [
  {
    role: "B.Tech Computer Engineering",
    company: "Bharati Vidyapeeth Deemed University, Pune",
    period: "Expected 2028",
    description:
      "Academic performance: 9.3/10 (First Year), 8.0/10 (Second Year). Coursework: Data Structures & Algorithms, OOP, DBMS, Computer Networks, Web Development.",
  },
  {
    role: "Team Lead & Developer",
    company: "Smart India Hackathon 2024",
    period: "2024",
    description:
      "Led an AI-based traffic-management system; cleared the college-level round.",
  },
  {
    role: "Developer",
    company: "Smart India Hackathon 2025",
    period: "2025",
    description:
      "Krishisamadhanam agricultural AI platform (6-member team, frontend + AI crop analysis); cleared the college-level round.",
  },
  {
    role: "Team Lead",
    company: "Nexus AI Hackathon 2026",
    period: "2026",
    description:
      "Led a 2-member team building a conversational agentic AI platform for enterprise workflow automation.",
  },
  {
    role: "Full MERN Stack Web Development",
    company: "Apna College",
    period: "2026",
    description: "Certification covering the MERN stack (MongoDB, Express, React, Node.js).",
  },
];

export default function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const items = timeline.querySelectorAll(".timeline-item");
    const line = timeline.querySelector(".timeline-line");
    const tweens: gsap.core.Tween[] = [];

    if (line) {
      tweens.push(
        gsap.fromTo(
          line,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "none",
            scrollTrigger: {
              trigger: timeline,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 1,
            },
          }
        )
      );
    }

    tweens.push(
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: EASE.expo,
          scrollTrigger: {
            trigger: timeline,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      )
    );

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <SectionWrapper id="education" className="py-24 sm:py-32 lg:py-40">
      <div className="space-y-16">
        <div className="space-y-4">
          <ScrollReveal>
            <Eyebrow>Education</Eyebrow>
          </ScrollReveal>
          <TextReveal
            text="My Journey So Far"
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Timeline — left column */}
          <ol
            ref={timelineRef}
            className="lg:col-span-3 relative pl-8 space-y-12 list-none"
            role="list"
            aria-label="Education and hackathons timeline"
          >
            <div className="timeline-line absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/25 to-accent/5" />

            {experiences.map((exp, i) => (
              <li
                key={i}
                className="timeline-item relative space-y-3 group"
              >
                <div className="absolute -left-8 top-1.5 w-[22px] h-[22px] rounded-full border-2 border-accent/50 bg-bg flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                  <div className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-300" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h3 className="text-lg font-semibold text-text group-hover:text-accent transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <span className="text-lg font-medium text-accent">
                    {exp.company}
                  </span>
                </div>

                <p className="text-xs uppercase tracking-widest text-text-muted">
                  {exp.period}
                </p>

                <p className="text-text-secondary leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </li>
            ))}
          </ol>

          {/* Portrait — right column, sticky */}
          <div className="lg:col-span-2 hidden lg:block">
            <ScrollReveal direction="right" delay={0.3}>
              <div className="sticky top-28">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border relative">
                  <img
                    src="/images/experience-portrait.jpg"
                    alt="Vishal Kumar Sharma — casual portrait"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-[60px]" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
