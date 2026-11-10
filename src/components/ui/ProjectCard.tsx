"use client";

import { useRef, useCallback, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectPlaceholder({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, #0c0c0c 0%, ${project.color}08 50%, #0c0c0c 100%)`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${project.color}40 1px, transparent 1px), linear-gradient(90deg, ${project.color}40 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20"
        style={{ background: project.color }}
      />

      {/* Browser mockup */}
      <div className="relative w-[70%] max-w-[280px]">
        <div className="rounded-lg border border-white/[0.06] bg-[#111113]/90 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="ml-2 flex-1 h-3.5 rounded bg-white/[0.04]" />
          </div>

          {/* Content area */}
          <div className="p-3 space-y-2">
            {/* Header bar */}
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded"
                style={{ background: `${project.color}30` }}
              />
              <div className="h-2 rounded-full bg-white/[0.06] w-24" />
              <div className="ml-auto flex gap-1">
                <div className="w-4 h-4 rounded bg-white/[0.04]" />
                <div className="w-4 h-4 rounded bg-white/[0.04]" />
              </div>
            </div>

            {/* Fake content blocks */}
            <div className="space-y-1.5 pt-1">
              <div className="h-1.5 rounded-full bg-white/[0.05] w-full" />
              <div className="h-1.5 rounded-full bg-white/[0.04] w-4/5" />
              <div className="h-1.5 rounded-full bg-white/[0.03] w-3/5" />
            </div>

            {/* Image placeholder */}
            <div
              className="h-12 rounded mt-2"
              style={{
                background: `linear-gradient(135deg, ${project.color}12, ${project.color}05)`,
              }}
            />

            {/* Bottom elements */}
            <div className="flex gap-1.5 pt-1">
              <div
                className="h-4 rounded flex-1"
                style={{ background: `${project.color}15` }}
              />
              <div className="h-4 rounded w-12 bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current = { x: y * -8, y: x * 8 };
    el.style.transform = `perspective(1000px) rotateX(${tiltRef.current.x}deg) rotateY(${tiltRef.current.y}deg)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    isHoveredRef.current = true;
    el.style.boxShadow = `0 0 40px ${project.color}30, 0 20px 60px rgba(0,0,0,0.4)`;
  }, [project.color]);

  const handleFocus = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.boxShadow = `0 0 40px ${project.color}30, 0 20px 60px rgba(0,0,0,0.4)`;
  }, [project.color]);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    tiltRef.current = { x: 0, y: 0 };
    isHoveredRef.current = false;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
  }, []);

  const handleBlur = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
  }, []);

  const isLarge = index === 0;
  const hasImage = project.image && !imgError;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group/card ${isLarge ? "md:col-span-2" : ""}`}
      aria-label={`View project: ${project.title}`}
    >
      <div
        ref={cardRef}
        className="project-card group relative rounded-2xl bg-bg-card border border-border overflow-hidden transition-all duration-500 hover:border-border-strong focus-visible:border-accent/50 focus-visible:shadow-[0_0_30px_rgba(245,158,11,0.15)] focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          transition: "transform 0.15s ease-out, border-color 0.5s ease, box-shadow 0.3s ease",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Thumbnail area */}
        <div className={`relative overflow-hidden ${isLarge ? "aspect-[16/7]" : "aspect-[16/10]"}`}>
          {hasImage ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:-translate-y-1 group-focus-visible:scale-105 group-focus-visible:-translate-y-1"
              onError={() => setImgError(true)}
            />
          ) : (
            <ProjectPlaceholder project={project} />
          )}

          {/* Featured badge + subtle color overlay for first card */}
          {isLarge && (
            <>
              <div className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent bg-bg/70 backdrop-blur-sm rounded-full border border-accent/20">
                Featured
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${project.color}08, transparent 60%)` }}
              />
            </>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top gradient line — visible on hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
          />

          {/* View indicator */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-bg/50 backdrop-blur-sm">
              <ArrowUpRight
                size={16}
                className="text-text transition-all duration-300 group-hover:rotate-45 group-focus-visible:rotate-45"
              />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-text group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <ArrowUpRight
                size={16}
                className="text-text-muted group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-bg-elevated text-text-secondary border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
