"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/lib/nav";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        setScrolled(scrollY > 50);
        const total = document.documentElement.scrollHeight - vh;
        setScrollProgress(total > 0 ? scrollY / total : 0);

        let current = navLinks[0].id;

        for (const link of navLinks) {
          const el = document.getElementById(link.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + scrollY;
          if (top <= scrollY + vh * 0.4) {
            current = link.id;
          }
        }

        if (scrollY + vh >= document.documentElement.scrollHeight - 50) {
          current = navLinks[navLinks.length - 1].id;
        }

        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div
        className="nav-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5",
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
        style={{ transition: "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), padding 0.3s ease" }}
      >
        <nav
          className={cn(
            "mx-auto w-max rounded-full px-2 py-1 transition-all duration-300",
            scrolled
              ? "bg-bg/80 backdrop-blur-xl border border-border shadow-lg"
              : "bg-transparent"
          )}
        >
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm rounded-full transition-all duration-300 relative",
                    activeSection === link.id
                      ? "text-accent"
                      : "text-text-secondary hover:text-text"
                  )}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
