"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const hasImage = project.image && !imgError;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      el.querySelectorAll(".detail-reveal"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div ref={ref}>
      <SectionWrapper className="py-8">
        <Link
          href="/#work"
          aria-label="Go back to work section"
          className="inline-flex items-center gap-2 p-2 -ml-2 text-sm text-text-secondary hover:text-accent transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
      </SectionWrapper>

      <SectionWrapper className="py-8 sm:py-16">
        <div className="space-y-16">
          <div className="detail-reveal space-y-6">
            <Eyebrow>{project.category}</Eyebrow>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em]">
              {project.title}
            </h1>

            <p className="text-lg text-text-secondary max-w-3xl">
              {project.description}
            </p>
          </div>

          <div className="detail-reveal">
            <div
              className="relative aspect-[16/9] sm:aspect-[16/8] rounded-2xl border border-border overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
              }}
            >
              {hasImage ? (
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="text-8xl font-bold opacity-10"
                    style={{ color: project.color }}
                  >
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {project.videoUrl && (
            <div className="detail-reveal">
              <h3 className="text-xl font-semibold mb-4">Demo Video</h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
                <iframe
                  src={project.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`${project.title} demo video`}
                />
              </div>
            </div>
          )}

          <div className="detail-reveal grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-semibold">About this project</h3>
              <p className="text-text-secondary leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-medium uppercase tracking-widest text-text-muted mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-bg-card text-text-secondary border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="detail-reveal pt-16 border-t border-border">
            <h3 className="text-sm font-medium uppercase tracking-widest text-text-muted mb-8">
              Next Project
            </h3>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group block p-8 rounded-2xl bg-bg-card border border-border hover:border-border-strong transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-text group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </h4>
                  <p className="text-text-secondary">
                    {nextProject.description}
                  </p>
                </div>
                <ArrowUpRight
                  size={24}
                  className="text-text-muted group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
