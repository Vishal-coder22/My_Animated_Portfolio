"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/easing";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    let tween: gsap.core.Tween | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasAnimated.current = true;
          const obj = { value: 0 };
          tween = gsap.to(obj, {
            value: target,
            duration: 2,
            ease: EASE.power4,
            onUpdate: () => {
              if (el) el.textContent = String(Math.floor(obj.value));
            },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [target]);

  return (
    <>
      <span ref={ref} aria-hidden="true">0</span>
      <span className="sr-only">{label}: {target}</span>
    </>
  );
}

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current = { x: y * -6, y: x * 6 };
    el.style.transform = `perspective(800px) rotateX(${tiltRef.current.x}deg) rotateY(${tiltRef.current.y}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    tiltRef.current = { x: 0, y: 0 };
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return (
    <SectionWrapper id="about" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-0 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)" }}
        />
      </div>
      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-3 space-y-8">
          <ScrollReveal>
            <Eyebrow>About</Eyebrow>
          </ScrollReveal>

          <TextReveal
            text="I build digital experiences that feel alive."
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em]"
            splitBy="words"
          />

          <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
            <ScrollReveal delay={0.1}>
              <p>
                I&apos;m a third-year Computer Engineering student (expected
                2028) based in Pune — building full-stack applications with
                React, Next.js, and TypeScript, and machine-learning pipelines
                with Python, FastAPI, scikit-learn, and Apache Kafka.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                I also share what I learn — AI concepts, tech knowledge, and my
                own projects — on Instagram. I just started this year, and
                posting is my way of learning out loud.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p>
                My landing pages speak in different voices — a restaurant, a
                creative agency, a cafe, a luxury real-estate brand — each
                built for its own audience. And everything I ship comes tested:
                145+ passing pytest and Playwright tests across my projects.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p>
                Hackathon team lead twice; cleared the college-level Smart
                India Hackathon round twice. Next goal: becoming an AI
                engineer — testing new AI tools, learning AI concepts and new
                technologies, and building projects with AI-assisted
                development.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ScrollReveal direction="right" delay={0.2}>
            <div
              ref={cardRef}
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
                transition: "transform 0.15s ease-out",
              }}
            >
              <div className="aspect-[4/5] rounded-2xl bg-bg-card border border-border overflow-hidden relative">
                <img
                  src="/images/about-portrait.jpg"
                  alt="Vishal Kumar Sharma — portrait"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <div className="grid grid-cols-1 gap-4 text-center">
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-accent leading-none mb-1">
                        <AnimatedCounter target={6} label="Projects" />
                      </div>
                      <p className="text-text-secondary text-[10px] uppercase tracking-[0.15em] font-medium">
                        Projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent/15 rounded-full blur-[80px]" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
