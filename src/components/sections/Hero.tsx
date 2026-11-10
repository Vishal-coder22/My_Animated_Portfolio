"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/easing";
import { HERO_ANIM_DELAY } from "@/lib/constants";
import { ArrowDown } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

const marqueeItems = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI",
  "Apache Kafka", "Docker", "pytest", "Three.js", "GSAP",
  "React", "Next.js", "TypeScript", "Python", "FastAPI",
  "Apache Kafka", "Docker", "pytest", "Three.js", "GSAP",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mousePos.current = { x, y };
    if (blob1Ref.current) {
      blob1Ref.current.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
    }
    if (blob2Ref.current) {
      blob2Ref.current.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        ".hero-role, .hero-word, .hero-bio, .hero-cta, .hero-image, .hero-deco, .hero-marquee, .scroll-indicator",
        { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", clipPath: "none" }
      );
      return;
    }

    const tl = gsap.timeline({ delay: HERO_ANIM_DELAY });

    // 1. Role label — fade + slide from left (0.4s)
    tl.fromTo(
      ".hero-role",
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.4, ease: EASE.power4 }
    );

    // 2. Headline — word-by-word, y + blur resolve (0.6s, stagger 0.06)
    tl.fromTo(
      ".hero-word",
      { opacity: 0, y: 20, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.06, ease: EASE.power4 },
      "-=0.15"
    );

    // 3. Bio — simple fade + y: 10 (0.4s)
    tl.fromTo(
      ".hero-bio",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: EASE.power4 },
      "-=0.2"
    );

    // 4. CTAs — scale 0.95 + fade, staggered (0.35s each, 0.08 stagger)
    tl.fromTo(
      ".hero-cta",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.35, stagger: 0.08, ease: EASE.power4 },
      "-=0.15"
    );

    // 5. Portrait — clip-path wipe from bottom (0.8s) — START with headline
    tl.fromTo(
      ".hero-image",
      { clipPath: "inset(100% 0 0 0)", opacity: 0 },
      { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 0.8, ease: EASE.power4 },
      "-=0.6"
    );

    // 6. Decorative shapes — simple fade (0.4s)
    tl.fromTo(
      ".hero-deco",
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: EASE.power2 },
      "-=0.3"
    );

    // 7. Marquee — fade in (0.4s)
    tl.fromTo(
      ".hero-marquee",
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: EASE.power2 },
      "-=0.2"
    );

    const scrollIndicator = ref.current?.querySelector(".scroll-indicator");
    let scrollTween: gsap.core.Tween | null = null;
    if (scrollIndicator) {
      scrollTween = gsap.fromTo(
        scrollIndicator,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: EASE.power2,
          repeat: -1,
          yoyo: true,
          delay: HERO_ANIM_DELAY,
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        }
      );
    }

    return () => {
      tl.kill();
      scrollTween?.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Mouse-reactive background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={blob1Ref}
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full opacity-60 pointer-events-none mix-blend-screen will-change-[transform]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)",
            top: "20%",
            left: "15%",
            filter: "blur(40px)",
          }}
        />
        <div
          ref={blob2Ref}
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] transition-transform duration-700 ease-out will-change-[transform]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
            bottom: "15%",
            right: "15%",
          }}
        />
      </div>

      {/* Main content — asymmetric split layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 py-16 lg:py-0">
        {/* Left column — text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Role label */}
          <div className="hero-role opacity-0 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-accent border border-accent/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Full-Stack &amp; AI Developer
            </span>
          </div>

          {/* Headline — word-by-word blur resolve */}
          <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.92] tracking-[-0.03em] mb-6">
            <span className="block">
              {"Built to Move".split(" ").map((word, i) => [
                <span key={i} className="hero-word inline-block">
                  {word}
                </span>,
                " ",
              ])}
            </span>
            <span className="block">
              {"Trained to Think".split(" ").map((word, i) => [
                <span key={i} className="hero-word inline-block text-gradient">
                  {word}
                </span>,
                " ",
              ])}
            </span>
          </h1>

          {/* Name */}
          <div className="hero-bio opacity-0 mb-3">
            <p className="text-xl sm:text-2xl font-semibold tracking-[-0.01em]">
              Vishal Kumar Sharma
            </p>
          </div>

          {/* Bio */}
          <div className="hero-bio opacity-0 overflow-hidden mb-10">
            <TextReveal
              text="Third-year CS student building full-stack apps and ML pipelines."
              as="p"
              className="text-lg sm:text-xl text-text-secondary max-w-lg mx-auto lg:mx-0"
              splitBy="words"
              delay={1.2}
              duration={0.8}
            />
          </div>

          {/* Dual CTAs */}
          <div className="hero-buttons opacity-0 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#work"
              className="hero-cta group relative px-8 py-3.5 font-medium text-sm tracking-wide rounded-full bg-accent text-bg hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300 text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="hero-cta group px-8 py-3.5 font-medium text-sm tracking-wide rounded-full border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 text-center"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>

        {/* Right column — portrait + decorative elements */}
        <div className="hero-image opacity-0 relative flex-shrink-0 w-full max-w-sm lg:max-w-md">
          {/* Decorative floating elements */}
          <div className="hero-deco opacity-0 absolute -top-4 -right-4 w-16 h-16 rounded-lg border border-accent/20 backdrop-blur-sm bg-accent/5 hidden lg:block" />
          <div className="hero-deco opacity-0 absolute -bottom-4 -left-4 w-20 h-20 rounded-full border border-accent/10 backdrop-blur-sm bg-accent/5 hidden lg:block" />

          {/* Portrait image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(245,158,11,0.12)]">
            <img
              src="/images/hero-portrait.jpg"
              alt="Vishal Kumar Sharma portrait"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Marquee strip — below the split layout */}
      <div className="hero-marquee opacity-0 relative z-10 w-full max-w-7xl mx-auto overflow-hidden py-4 border-y border-border/50" aria-hidden="true">
        <div className="flex whitespace-nowrap marquee-track">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="flex items-center mx-6 text-sm text-text-muted font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mr-4" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
            Scroll
          </span>
          <ArrowDown size={14} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}