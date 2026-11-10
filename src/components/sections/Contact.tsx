"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";
import TextScramble from "@/components/ui/TextScramble";
import { socialLinks } from "@/lib/social";

function EmailReveal() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <a
      href="mailto:637vishalsharma@gmail.com"
      className="inline-block text-text-muted font-mono text-sm hover:text-accent focus-visible:text-accent transition-colors"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onFocus={() => setIsRevealed(true)}
      onBlur={() => setIsRevealed(false)}
    >
      {isRevealed ? (
        "637vishalsharma@gmail.com"
      ) : (
        <TextScramble text="637vishalsharma@gmail.com" duration={800} />
      )}
    </a>
  );
}

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="py-24 sm:py-32 lg:py-40">
      <div className="relative">
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] pointer-events-none rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text + CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <ScrollReveal>
                <Eyebrow>Contact</Eyebrow>
              </ScrollReveal>
              <TextReveal
                text="Let's Build Something Together"
                as="h2"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em]"
              />
            </div>

            <ScrollReveal delay={0.2}>
              <p className="text-text-secondary text-lg max-w-xl leading-relaxed">
                Have a project in mind or just want to chat? I&apos;m always open to
                new opportunities and interesting conversations.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <MagneticButton strength={0.15} as="a" href="mailto:637vishalsharma@gmail.com">
                <span className="gradient-border-btn inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-accent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  <span>Get In Touch</span>
                  <ArrowUpRight size={18} />
                </span>
              </MagneticButton>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <div className="pt-2">
                <EmailReveal />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex items-center gap-6 pt-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <MagneticButton key={link.href} strength={0.2} as="a" href={link.href} target="_blank" rel="noopener noreferrer">
                      <span
                        className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                        aria-label={link.label}
                      >
                        <Icon />
                        <span className="hidden sm:inline">{link.label}</span>
                      </span>
                    </MagneticButton>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Portrait */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border">
                <img
                  src="/images/contact-portrait.jpg"
                  alt="Vishal Kumar Sharma — by the sea"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent/10 rounded-full blur-[80px]" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
